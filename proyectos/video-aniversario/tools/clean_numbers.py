"""Borra los números de galería ("17", "2", "11"…) de la esquina inferior izquierda.

Venían encimados en los collages; no son parte del arte. Método (trasplante
de parche, tipo inpainting por ejemplares):
1. caja = bounding box de los píxeles casi blancos de la esquina, con margen
   (cubre también la sombrita oscura que traen los números);
2. se busca en toda la imagen, con cv2.matchTemplate enmascarado, el parche
   cuyo "anillo" de alrededor se parezca más al anillo alrededor de la caja;
3. se copia el interior de ese parche y se funde con bordes difuminados.

Uso: python3 tools/clean_numbers.py   (reescribe assets/scenes/raw/<id>.png;
correr después de split_panels.py)
"""
from pathlib import Path

import cv2
import numpy as np

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / "assets" / "scenes" / "raw"

# id -> tamaño de la zona donde buscar el número (ancho, alto) desde la esquina
CORNERS = {
    "safari": (62, 52), "aviario": (45, 52), "puente": (45, 52), "cocina": (62, 52),
    "snoopy": (58, 48), "cafe": (58, 52), "karaoke": (62, 52), "pelicula": (64, 54),
}
PAD, RING = 5, 7
SEARCH = 140  # radio (px) de búsqueda del donante: cerca = mismo color/luz


def glyph_box(img, cw, ch):
    h, w = img.shape[:2]
    region = img[h - ch:h, 0:cw]
    ys, xs = np.nonzero(region.min(axis=2) > 175)
    x0, x1 = xs.min() - PAD, xs.max() + PAD + 1
    y0, y1 = ys.min() + h - ch - PAD, ys.max() + h - ch + PAD + 1
    return max(x0, 0), max(y0, 0), min(x1, w), min(y1, h)


def clean(pid, cw, ch):
    path = RAW / f"{pid}.png"
    img = cv2.imread(str(path))
    h, w = img.shape[:2]
    x0, y0, x1, y1 = glyph_box(img, cw, ch)

    # plantilla = caja + anillo (recortado al borde de la imagen)
    tx0, ty0 = max(x0 - RING, 0), max(y0 - RING, 0)
    tx1, ty1 = min(x1 + RING, w), min(y1 + RING, h)
    tmpl = img[ty0:ty1, tx0:tx1].astype(np.float32)
    mask = np.ones(tmpl.shape, np.float32)
    mask[y0 - ty0:y1 - ty0, x0 - tx0:x1 - tx0] = 0

    res = cv2.matchTemplate(img.astype(np.float32), tmpl, cv2.TM_SQDIFF, mask=mask)
    th, tw = tmpl.shape[:2]
    # solo donantes cercanos, y nunca encimados con la zona del número
    allowed = np.zeros(res.shape, bool)
    allowed[max(ty0 - SEARCH, 0):ty0 + SEARCH, max(tx0 - SEARCH, 0):tx0 + SEARCH] = True
    allowed[max(ty0 - th, 0):ty1, max(tx0 - tw, 0):tx1] = False
    res = np.where(allowed & np.isfinite(res), res, np.inf)
    _, _, loc, _ = cv2.minMaxLoc(res)
    dx, dy = loc[0] - tx0, loc[1] - ty0

    donor = img[ty0 + dy:ty1 + dy, tx0 + dx:tx1 + dx].astype(np.float32)
    # alfa: 1 dentro de la caja, bajando suave hacia el anillo
    alpha = 1 - mask[..., 0]
    alpha = cv2.GaussianBlur(alpha, (0, 0), 2.2)
    alpha = np.clip(alpha * 1.8, 0, 1)[..., None]
    patch = img[ty0:ty1, tx0:tx1].astype(np.float32)
    img[ty0:ty1, tx0:tx1] = (donor * alpha + patch * (1 - alpha)).astype(np.uint8)
    cv2.imwrite(str(path), img)
    return (x0, y0, x1, y1), (dx, dy)


def main():
    for pid, (cw, ch) in CORNERS.items():
        box, shift = clean(pid, cw, ch)
        print(f"limpio {pid:9s} caja={box} donante desplazado={shift}")


if __name__ == "__main__":
    main()
