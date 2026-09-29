"""Safari: el de la gorra ahora es Diego (en la lámina original salían dos Fannys).

Diego lo notó en el episodio: en la lámina del safari los dos personajes
tenían la cara y el pelo azul de Fanny, así que él no salía. Con solo
recolorear el pelo seguía pareciendo Fanny, así que se hace un trasplante
de cabeza con arte que ya existe:

- La cabeza de Diego sale de la lámina del CAFÉ, donde tiene casi la misma
  pose que el de la gorra: inclinado hacia Fanny (~16°), ojos cerrados de
  gusto, lentes redondos y sonrisa. Se alinea por los dos lentes (escala,
  giro y posición), así que la cara cae exactamente donde estaba la otra.
- Se recorta con una silueta a mano (pelo + cara + cuello) y se excluye la
  luz de la ventana que se asoma entre los rizos.
- Fanny, las manos y la cámara quedan DELANTE (máscaras de oclusión), así
  que siguen mejilla con mejilla.
- El color se iguala en Lab con la piel del personaje original (misma luz
  del safari) y se le quita el arete que traía.

Se aplica a hd/safari.jpg (y raw/safari.png se deriva de ahí). Los
originales se guardan una sola vez como *_original.* para poder repetir el
arreglo o deshacerlo.

Uso: python3 tools/fix_safari_diego.py
"""
import shutil
from pathlib import Path

import cv2
import numpy as np

ROOT = Path(__file__).resolve().parent.parent
SC = ROOT / "assets" / "scenes"

# todo en px de lámina raw (café 347x391, safari 703x476)
CAFE_LENSES = ((100.0, 190.0), (150.0, 176.0))   # centros de los lentes de Diego en el café
SAFARI_LENSES = ((174.0, 221.0), (220.0, 207.0))  # centros de los lentes del de la gorra en el safari
GROW = 1.1   # Diego un poquito más grande que el personaje original (y así su pelo tapa toda la gorra)
NUDGE = (5.0, -1.0)  # y un pelín hacia Fanny, para que las mejillas se toquen
# silueta de la cabeza de Diego en el café (pelo, cara y el cuello del suéter)
CAFE_HEAD = np.array([[16, 118], [30, 96], [52, 82], [78, 74], [104, 70], [125, 80], [138, 91], [148, 105],
                      [156, 119], [162, 133], [163, 145], [160, 152], [162, 160], [164, 170], [163, 185],
                      [158, 197], [150, 206], [140, 214], [130, 226], [118, 240], [96, 250], [70, 256],
                      [44, 258], [24, 250], [14, 222], [12, 170]], np.float32)
CAFE_SKIN = [(80, 202, 98, 218), (132, 196, 152, 210)]  # mejillas (x0, y0, x1, y1)
SAFARI_SKIN = [(140, 228, 156, 246), (196, 222, 214, 234)]
# lo que queda delante de Diego en el safari
FANNY = np.array([[250, 138], [262, 126], [300, 118], [340, 122], [368, 142], [380, 330], [252, 330],
                  [246, 262], [244, 222], [245, 200], [249, 184], [250, 160]], np.float32)
CAP_GAP = np.array([[205, 112], [255, 112], [255, 262], [205, 262]], np.float32)
OLD_CAP = np.array([[96, 112], [252, 112], [252, 206], [96, 206]], np.float32)  # donde estaba la gorra
HANDS = np.array([[197, 262], [204, 253], [232, 255], [262, 259], [300, 261], [323, 265], [326, 330],
                  [195, 330]], np.float32)


def similarity(src, dst, grow=1.0):
    (a1, a2), (b1, b2) = np.array(src), np.array(dst)
    va, vb = a2 - a1, b2 - b1
    s = np.linalg.norm(vb) / np.linalg.norm(va) * grow
    ang = np.arctan2(vb[1], vb[0]) - np.arctan2(va[1], va[0])
    c, n = s * np.cos(ang), s * np.sin(ang)
    ma, mb = (a1 + a2) / 2, (b1 + b2) / 2
    M = np.array([[c, -n, 0], [n, c, 0]], np.float64)
    M[:, 2] = mb - M[:, :2] @ ma
    return M


def poly_mask(shape, pts, k, feather):
    m = np.zeros(shape[:2], np.float32)
    cv2.fillPoly(m, [np.round(pts * k).astype(np.int32)], 1.0)
    return cv2.GaussianBlur(m, (0, 0), feather * k) if feather else m


def lab_stats(img, boxes, k):
    lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB).astype(np.float32)
    px = np.concatenate([lab[int(y0 * k):int(y1 * k), int(x0 * k):int(x1 * k)].reshape(-1, 3) for x0, y0, x1, y1 in boxes])
    return px.mean(0), px.std(0) + 1e-3


def main():
    hd = SC / "hd" / "safari.jpg"
    raw = SC / "raw" / "safari.png"
    for p in (hd, raw):
        orig = p.with_name(p.stem + "_original" + p.suffix)
        if not orig.exists():
            shutil.copy2(p, orig)
    base = cv2.imread(str(hd.with_name("safari_original.jpg")))
    cafe = cv2.imread(str(SC / "hd" / "cafe.jpg"))
    k = base.shape[1] / 703            # px de HD por px de lámina (3)
    kc = cafe.shape[1] / 347
    M = similarity(CAFE_LENSES, SAFARI_LENSES, GROW)   # café raw -> safari raw
    M[:, 2] += NUDGE
    # a píxeles HD: x_s = k * M @ [x_c / kc, 1]
    Mh = M.copy()
    Mh[:, :2] *= k / kc
    Mh[:, 2] *= k
    H, W = base.shape[:2]
    # silueta: el contorno de su pelo y su cara, sin la luz de ventana entre los rizos
    sil = poly_mask(cafe.shape, CAFE_HEAD, kc, 0)
    hsv = cv2.cvtColor(cafe, cv2.COLOR_BGR2HSV)
    xs = np.arange(cafe.shape[1])[None, :] / kc
    ys_c = np.arange(cafe.shape[0])[:, None] / kc
    window = ((hsv[..., 2] > 200) & (hsv[..., 1] < 110) & (xs > 145) & (ys_c < 160)) | \
             ((hsv[..., 2] > 185) & (hsv[..., 1] < 140) & (xs > 148) & (ys_c >= 160) & (ys_c < 206)) | \
             ((hsv[..., 2] > 195) & (hsv[..., 1] < 120) & (ys_c < 96))  # ventana arriba de su pelo
    window = window.astype(np.uint8)
    window = cv2.dilate(window, np.ones((3, 3), np.uint8)).astype(np.float32)
    sil *= 1 - window
    sil = cv2.GaussianBlur(sil, (0, 0), 0.9 * kc)
    head = cv2.warpAffine(cafe, Mh, (W, H), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REFLECT)
    msk = cv2.warpAffine(sil, Mh, (W, H), flags=cv2.INTER_LINEAR)
    # Fanny, las manos y la cámara van delante
    front = np.maximum(poly_mask(base.shape, FANNY, k, 0.9), poly_mask(base.shape, HANDS, k, 0.9))
    msk *= 1 - front
    # color: la piel de Diego con la luz del safari (transferencia en Lab)
    ms, ss = lab_stats(head, [tuple(np.r_[M @ [x0, y0, 1], M @ [x1, y1, 1]]) for x0, y0, x1, y1 in CAFE_SKIN], k)
    mt, st = lab_stats(base, SAFARI_SKIN, k)
    lab = cv2.cvtColor(head, cv2.COLOR_BGR2LAB).astype(np.float32)
    lab = (lab - ms) * np.clip(st / ss, 0.7, 1.4) + mt
    head = cv2.cvtColor(np.clip(lab, 0, 255).astype(np.uint8), cv2.COLOR_LAB2BGR)
    # un poco de nitidez para igualar el grano del safari
    blur = cv2.GaussianBlur(head, (0, 0), 1.2)
    head = cv2.addWeighted(head, 1.35, blur, -0.35, 0)
    # debajo de los bordes suaves del pelo de Diego no debe quedar verde de la visera
    bh0 = cv2.cvtColor(base, cv2.COLOR_BGR2HSV)
    cap0 = (bh0[..., 0] > 18) & (bh0[..., 0] < 90) & (bh0[..., 1] > 70) & (poly_mask(base.shape, OLD_CAP, k, 0) > 0.5)
    cap0 = cv2.dilate(cap0.astype(np.uint8) * 255, np.ones((7, 7), np.uint8))
    under = cv2.inpaint(base, cap0, int(6 * k), cv2.INPAINT_TELEA)
    out = under.astype(np.float32) * (1 - msk[..., None]) + head.astype(np.float32) * msk[..., None]
    out = np.clip(out, 0, 255).astype(np.uint8)
    # lo que queda de la gorra y del hueco entre las cabezas:
    #   - arriba, donde no hay Fanny: el cielo que se ve por la ventana del coche
    #   - junto a Fanny (mejilla con mejilla): se rellena suave con lo que lo rodea (piel/pelo)
    fan = poly_mask(base.shape, FANNY, k, 0) > 0.5
    zone = poly_mask(base.shape, CAP_GAP, k, 0) > 0.5
    bh = cv2.cvtColor(base, cv2.COLOR_BGR2HSV)
    old_cap = (bh[..., 0] > 18) & (bh[..., 0] < 90) & (bh[..., 1] > 70) & (poly_mask(base.shape, OLD_CAP, k, 0) > 0.5)
    old_cap = cv2.dilate(old_cap.astype(np.uint8), np.ones((7, 7), np.uint8)) > 0
    sky_row = base[int(104 * k)].astype(np.float32)
    res = out.astype(np.float32)
    hole = np.zeros((H, W), np.uint8)
    for y in range(int(108 * k), int(262 * k)):
        xs_f = np.nonzero(fan[y, int(225 * k):int(270 * k)])[0]
        xf = int(225 * k) + xs_f[0] if xs_f.size else None
        for x in range(int(150 * k), int(262 * k)):
            if fan[y, x] or msk[y, x] > 0.92:
                continue
            near = xf is not None and x > xf - 16 * k and zone[y, x]
            if not (old_cap[y, x] or near):
                continue
            if xf is None:
                a = 1 - msk[y, x] / 0.92
                res[y, x] = res[y, x] * (1 - a) + sky_row[x] * (1 - 0.08 * (y - 108 * k) / (60 * k)) * a
            elif msk[y, x] < 0.5:
                hole[y, x] = 255
    out = np.clip(res, 0, 255).astype(np.uint8)
    out = cv2.inpaint(out, cv2.dilate(hole, np.ones((3, 3), np.uint8)), int(5 * k), cv2.INPAINT_TELEA)
    cv2.imwrite(str(hd), out, [cv2.IMWRITE_JPEG_QUALITY, 95])
    small = cv2.resize(out, (703, 476), interpolation=cv2.INTER_AREA)
    cv2.imwrite(str(raw), small)
    lens = [tuple(np.round(M @ [x, y, 1], 1)) for x, y in CAFE_LENSES]
    mouth = tuple(np.round(M @ [121, 211, 1], 1))
    print(f"safari: cabeza de Diego (del café) en su lugar · lentes en {lens} · boca en {mouth} · escala {np.linalg.norm(M[:, 0]):.3f}")


if __name__ == "__main__":
    main()
