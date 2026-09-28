"""Separa en planos (fondo / medio / frente) las escenas con parallax.

Como un diorama de stop-motion con cristales multiplano: cada plano es un
recorte del MISMO arte (nada se redibuja). La máscara sale del mapa de
profundidad, se afina contra los bordes reales de la imagen con un filtro
guiado, y lo que queda "detrás" de cada recorte se rellena (inpainting) solo
lo necesario para que la cámara pueda asomarse unos píxeles.

Uso: python3 tools/layers.py [ids...]      (requiere hd/ y depth/)
Salida: assets/scenes/layers/<id>_<plano>.webp (+ <id>_preview.jpg para revisar)
"""
import sys
from pathlib import Path

import cv2
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SC = ROOT / "assets" / "scenes"
OUT = SC / "layers"

# Cada plano: nombre, rango de profundidad [lo, hi) con suavizado, y una
# región opcional (fracciones x0, y0, x1, y1) fuera de la cual no aplica.
# Los planos se listan de lejos a cerca; el primero es el fondo completo.
CONFIG = {
    "safari": [
        ("fondo", None),
        # coche y jirafa en el MISMO plano: separarlos por profundidad parte el
        # techo del coche (comparten zona con la cabeza de la jirafa)
        ("frente", dict(lo=0.34, region=[(0.0, 0.0, 0.64, 1.0), (0.58, 0.37, 0.765, 1.0)],
                        extra=dict(lo=0.20, region=[(0.60, 0.0, 1.0, 0.37), (0.765, 0.0, 1.0, 1.0)]))),
    ],
    "aviario": [
        ("fondo", None),
        ("pareja", dict(lo=0.30)),
        ("plantas", dict(lo=0.70, region=[(0.0, 0.62, 1.0, 1.0)],
                         extra=dict(lo=0.50, region=[(0.0, 0.0, 0.24, 0.5), (0.74, 0.0, 1.0, 0.5)]))),
    ],
    "puente": [
        ("fondo", None),
        ("puente", dict(lo=0.24)),
    ],
    "coche": [
        ("fondo", None),
        ("coche", dict(lo=0.44, region=[(0.2, 0.0, 0.76, 0.97)])),
    ],
    "retrato": [
        ("fondo", None),
        ("sala", dict(lo=0.2)),
    ],
}
SOFT = 0.03  # ancho del suavizado en unidades de profundidad


def box(x, r):
    return cv2.boxFilter(x, -1, (2 * r + 1, 2 * r + 1))


def guided(I, p, r=10, eps=1e-3):
    mI, mp = box(I, r), box(p, r)
    a = (box(I * p, r) - mI * mp) / (box(I * I, r) - mI * mI + eps)
    b = mp - a * mI
    return np.clip(box(a, r) * I + box(b, r), 0, 1)


def band(d, lo=None, hi=None, region=None, extra=None):
    m = np.ones_like(d)
    if lo is not None:
        m *= np.clip((d - lo) / SOFT + 0.5, 0, 1)
    if hi is not None:
        m *= np.clip((hi - d) / SOFT + 0.5, 0, 1)
    if region is not None:  # unión de rectángulos (fracciones x0, y0, x1, y1)
        h, w = d.shape
        r = np.zeros_like(d)
        for x0, y0, x1, y1 in region:
            r[int(y0 * h):int(y1 * h), int(x0 * w):int(x1 * w)] = 1
        r = cv2.GaussianBlur(r, (0, 0), 0.012 * w)
        m *= r
    if extra:
        m = np.maximum(m, band(d, **extra))
    return m


def inpaint_behind(img, hole, scale=4):
    """Rellena la zona tapada (rápido, a 1/scale) — solo se ve cerca del borde."""
    h, w = hole.shape
    small = cv2.resize(img, (w // scale, h // scale), interpolation=cv2.INTER_AREA)
    hs = cv2.resize(hole, (w // scale, h // scale), interpolation=cv2.INTER_AREA)
    hs = (cv2.dilate((hs > 0.35).astype(np.uint8), np.ones((9, 9), np.uint8)) > 0).astype(np.uint8)
    fill = cv2.inpaint(small, hs, 9, cv2.INPAINT_TELEA)
    fill = cv2.resize(fill, (w, h), interpolation=cv2.INTER_CUBIC)
    fill = cv2.GaussianBlur(fill, (0, 0), 3)
    # solo se rellena donde el plano de enfrente de verdad tapa (alfa > 0.35),
    # más un margen para que no quede el contorno del recorte; en las costuras
    # suaves (superficies continuas) el fondo conserva sus píxeles originales
    hard = cv2.dilate((hole > 0.35).astype(np.uint8), np.ones((w // 260, w // 260), np.uint8))
    a = cv2.GaussianBlur(hard.astype(np.float32), (0, 0), 2)[..., None]
    return (fill * a + img * (1 - a)).astype(np.uint8)


def process(pid):
    img = cv2.imread(str(SC / "hd" / f"{pid}.jpg"))
    h, w = img.shape[:2]
    d = cv2.imread(str(SC / "depth" / f"{pid}.png"), -1).astype(np.float32) / 65535
    d = cv2.resize(d, (w, h), interpolation=cv2.INTER_CUBIC)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY).astype(np.float32) / 255
    planes = CONFIG[pid]
    masks = []
    for name, spec in planes[1:]:
        m = band(d, **spec)
        m = guided(gray, m, r=max(4, w // 400), eps=2e-3)
        m = np.clip((m - 0.5) * 1.6 + 0.5, 0, 1)  # bordes un poco más firmes
        # donde la profundidad es claramente de este plano, el alfa es 1 aunque el
        # filtro guiado dude (p. ej. madera clara contra cielo claro: misma luminancia)
        sure = dict(spec, lo=spec["lo"] + 0.05)
        if "extra" in sure:
            sure["extra"] = dict(sure["extra"], lo=sure["extra"]["lo"] + 0.05)
        m = np.maximum(m, band(d, **sure))
        masks.append(m)
    # alfas finales: cada plano tapa a los de atrás
    OUT.mkdir(parents=True, exist_ok=True)
    nearer = np.zeros((h, w), np.float32)
    outs = []
    for idx in range(len(planes) - 1, -1, -1):
        name = planes[idx][0]
        if idx == 0:
            alpha = np.ones((h, w), np.float32)
        else:
            alpha = masks[idx - 1]
        # lo tapado por planos más cercanos se rellena; el alfa del plano se
        # extiende un poco bajo el plano de enfrente para que no haya huecos
        hole = np.clip(nearer, 0, 1)
        rgb = inpaint_behind(img, hole) if hole.max() > 0 else img
        if idx > 0:
            # lo propio = su máscara menos lo que ya es de planos más cercanos;
            # más una franja bajo el borde del plano de enfrente (sin huecos)
            own = alpha * (1 - np.clip(hole * 1.6, 0, 1))
            grow = cv2.dilate(own, np.ones((1 + w // 120, 1 + w // 120), np.uint8))
            alpha = np.maximum(own, np.minimum(grow, cv2.GaussianBlur(hole, (0, 0), 2)))
        rgba = np.dstack([rgb, (alpha * 255).astype(np.uint8)])
        # WebP con alfa (q92): ~10x más ligero que PNG y visualmente igual
        Image.fromarray(cv2.cvtColor(rgba, cv2.COLOR_BGRA2RGBA)).save(
            OUT / f"{pid}_{idx}_{name}.webp", "WEBP", quality=92, method=6)
        outs.append((name, rgba))
        nearer = np.maximum(nearer, masks[idx - 1] if idx > 0 else 0)
    # hoja de revisión: cada plano sobre magenta
    tiles = []
    for name, rgba in reversed(outs):
        a = rgba[..., 3:4] / 255
        bgc = np.zeros_like(rgba[..., :3])
        bgc[:] = (180, 0, 200)
        t = (rgba[..., :3] * a + bgc * (1 - a)).astype(np.uint8)
        tiles.append(cv2.resize(t, (w // 4, h // 4)))
    cv2.imwrite(str(OUT / f"{pid}_preview.jpg"), np.hstack(tiles))
    print("planos", pid, [n for n, _ in planes])


def main(ids):
    for pid in ids or CONFIG:
        process(pid)


if __name__ == "__main__":
    main(sys.argv[1:])
