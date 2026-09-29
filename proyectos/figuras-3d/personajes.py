"""Diego, Fanny y Tris como figuras imprimibles, fieles a las láminas de fieltro.

Proporciones de muñeco de fieltro (cabeza ~40 % de la altura), sacadas de la
lámina de la prepa (los dos de pie, de frente) y del retrato (caras y Tris).
Todo en mm; la cara superior de la base está en z = 0 y miran hacia -Y.

Uso: python3 personajes.py [diego|fanny|tris|base|todos] [--h 0.12]
"""
import argparse
import math
from pathlib import Path

import numpy as np

import sdf
from sdf import (Prim, capsule, cylinder_z, ellipse_ring, ellipsoid, frame, intersect, local, normalize,
                 round_box, round_cone, sphere, text_prim, torus, with_fn)

ROOT = Path(__file__).resolve().parent
FONT = str(ROOT.parent / "video-aniversario" / "assets" / "fonts" / "Fredoka.ttf")
rng = np.random.default_rng(20241020)

# ── paleta (para la guía de pintura y las vistas previas) ───────────────
PALETTE = {
    "piel": (236, 196, 160), "mejillas": (236, 170, 150), "pelo_d": (48, 34, 28), "pelo_f": (44, 58, 128),
    "cejas_d": (40, 28, 24), "cejas_f": (40, 52, 110), "ojos": (24, 22, 26), "lentes": (205, 170, 96),
    "arete": (212, 176, 90), "piercing": (235, 235, 238), "boca": (120, 40, 44), "dientes": (250, 248, 240),
    "sueter": (0, 0, 0), "puño": (0, 0, 0), "jeans": (72, 106, 160), "tenis_d": (128, 98, 80), "suela": (244, 242, 236),
    "agujetas": (250, 250, 250), "saco": (34, 34, 38), "vestido": (92, 132, 186), "calceta": (240, 240, 236),
    "tenis_f": (150, 128, 112), "nariz_f": (230, 150, 140), "pelaje": (246, 243, 236), "nariz_t": (190, 128, 120),
    "lengua": (232, 118, 132), "collar": (200, 40, 52), "base": (206, 176, 136), "puntadas": (170, 60, 60),
    "letras": (150, 56, 56),
}
STRIPES = [(214, 64, 70), (238, 136, 60), (240, 200, 70), (104, 176, 90), (70, 140, 200), (132, 92, 170), (214, 96, 150)]


def surf_y(hc, rad, x, z):
    """y de la superficie frontal de un elipsoide de cabeza en (x, z)."""
    t = 1 - ((x - hc[0]) / rad[0]) ** 2 - ((z - hc[2]) / rad[2]) ** 2
    return hc[1] - rad[1] * math.sqrt(max(t, 0.0))


def surf_n(hc, rad, p):
    g = np.array([(p[0] - hc[0]) / rad[0] ** 2, (p[1] - hc[1]) / rad[1] ** 2, (p[2] - hc[2]) / rad[2] ** 2])
    return normalize(g)


def on_face(hc, rad, x, z, lift=0.0):
    p = np.array([x, surf_y(hc, rad, x, z), z])
    return p + surf_n(hc, rad, p) * lift


def conformal_ring(face, c, n, R, w, t0, t1):
    """Aro que se ciñe a la cara (armazón de lentes): anillo alrededor del eje n, entre las
    distancias t0 y t1 de la superficie de la cara."""
    F = frame(n)

    def f(X, Y, Z):
        x, y, _ = local(X, Y, Z, c, F)
        ring = np.abs(np.sqrt(x * x + y * y) - R) - w
        fd = face(X, Y, Z)
        shell = np.abs(fd - (t0 + t1) / 2) - (t1 - t0) / 2
        return np.maximum(ring, shell)
    m = R + w + 2.5
    return Prim(f, np.asarray(c) - m, np.asarray(c) + m)


def chain(F, pts, radii, k=0.3, mat=None):
    for a, b, ra, rb in zip(pts[:-1], pts[1:], radii[:-1], radii[1:]):
        F.add(round_cone(a, b, ra, rb), k, mat)


def smile2d(cx, cz, w, h, lift):
    """Boca sonriente en el plano XZ: dentro de un círculo bajo y fuera de uno alto (esquinas arriba)."""
    rA = (w * w + h * h) / (2 * h)            # círculo de abajo: ancho w, profundidad h
    cA = (cx, cz + rA - h)
    rB = rA * 2.1
    cB = (cx, cz + rB - lift)

    def g(X, Z):
        dA = np.sqrt((X - cA[0]) ** 2 + (Z - cA[1]) ** 2) - rA
        dB = rB - np.sqrt((X - cB[0]) ** 2 + (Z - cB[1]) ** 2)
        return np.maximum(dA, dB)
    return g


def face_features(F, hc, rad, s, *, eye_dx, eye_z, eye_r, brow, brow_r, brow_mat, mouth, rim_R, lashes=False):
    """Ojos de botón, lentes redondos, cejas, boca con dientes y mejillas."""
    face = ellipsoid(hc, rad)
    for sx in (-1, 1):
        # mejilla apenas abultada
        pc = on_face(hc, rad, sx * eye_dx * 1.45, eye_z - 5.2 * s, -1.6 * s)
        F.add(sphere(pc, 2.3 * s), 1.6 * s, "mejillas")
    # boca: se talla y se le ponen dientes arriba
    mcx, mcz, mw, mh, mlift = mouth
    g = smile2d(mcx, mcz, mw, mh, mlift)
    depth = 1.0 * s
    carve = Prim(lambda X, Y, Z: np.maximum(g(X, Z), -face(X, Y, Z) - depth),
                 np.array([mcx - mw - 1, hc[1] - rad[1] - 1, mcz - mh - 1]), np.array([mcx + mw + 1, hc[1] - rad[1] + 6, mcz + 3]))
    F.cut(carve, 0.25 * s, "boca")
    tz = mcz - mh * 0.42
    teeth = Prim(lambda X, Y, Z: np.maximum(np.maximum(g(X, Z) + 0.12 * s, tz - Z),
                                            np.maximum(face(X, Y, Z) + depth * 0.95, -(face(X, Y, Z) + 0.32 * s))),
                 carve.lo, carve.hi)
    F.add(teeth, 0.12 * s, "dientes")
    for sx in (-1, 1):
        ec = on_face(hc, rad, sx * eye_dx, eye_z, -eye_r * 0.52)
        F.add(sphere(ec, eye_r), 0.2 * s, "ojos")
        # armazón que se ciñe a la cara
        rc = on_face(hc, rad, sx * (eye_dx + 0.1 * s), eye_z + 0.1 * s)
        F.add(conformal_ring(face, rc, surf_n(hc, rad, rc), rim_R, 0.42 * s, -0.25 * s, 0.72 * s), 0.12 * s, "lentes")
        # patita hacia la oreja
        a = on_face(hc, rad, sx * (eye_dx + rim_R + 0.1 * s), eye_z + 0.4 * s, 0.25 * s)
        b = np.array([sx * rad[0] * 0.98, hc[1] + 1.0 * s, eye_z + 0.2 * s])
        F.add(capsule(a, b, 0.4 * s), 0.1 * s, "lentes")
        # ceja
        pts = [on_face(hc, rad, sx * bx, bz, 0.15 * s) for bx, bz in brow]
        chain(F, pts, [brow_r * 0.8, brow_r, brow_r * 0.8], 0.2 * s, brow_mat)
        if lashes:
            ec2 = on_face(hc, rad, sx * eye_dx, eye_z)
            for ang in (35, 58, 80):
                a_ = math.radians(ang)
                p0 = on_face(hc, rad, sx * (eye_dx + math.cos(a_) * eye_r * 0.95), eye_z + math.sin(a_) * eye_r * 0.95, 0.1 * s)
                p1 = on_face(hc, rad, sx * (eye_dx + math.cos(a_) * eye_r * 1.9), eye_z + math.sin(a_) * eye_r * 1.75, 0.15 * s)
                F.add(capsule(p0, p1, 0.24 * s), 0.08 * s, "ojos")
    # puente de los lentes
    l = on_face(hc, rad, -(eye_dx - rim_R + 0.35 * s), eye_z + 0.6 * s, 0.35 * s)
    r = on_face(hc, rad, (eye_dx - rim_R + 0.35 * s), eye_z + 0.6 * s, 0.35 * s)
    mid = (l + r) / 2 + np.array([0, -0.9 * s, 0.25 * s])
    chain(F, [l, mid, r], [0.4 * s, 0.4 * s, 0.4 * s], 0.1 * s, "lentes")


def knit(d, X, Y, Z, cx, cy, period=0.95, amp=0.11, stripe=2.4, z0=0.0, groove=0.14):
    """Tejido de suéter: costillas verticales + surcos entre franjas (guía para pintar)."""
    th = np.arctan2(Y - cy, X - cx)
    rib = amp * (0.5 + 0.5 * np.cos(th * (2 * math.pi * 7.0 / period)))
    ph = np.mod((Z - z0) / stripe, 1.0)
    g = groove * np.exp(-((ph - 0.5) / 0.06) ** 2)
    return d + rib + g


def shoe(F, x, s, upper, laces=True):
    F.add(round_box((x, -1.3 * s, 0.65 * s), (2.75 * s, 4.9 * s, 0.65 * s), 0.55 * s), 0, "suela")
    F.add(round_box((x, -1.0 * s, 2.1 * s), (2.45 * s, 4.4 * s, 1.95 * s), 1.6 * s), 0.5 * s, upper)
    F.add(ellipsoid((x, -4.2 * s, 1.9 * s), (2.3 * s, 2.0 * s, 1.55 * s)), 0.8 * s, upper)
    if laces:
        for i, yy in enumerate((-3.4, -2.3, -1.2)):
            zz = 3.45 * s + 0.25 * s * i
            F.add(capsule((x - 1.0 * s, yy * s, zz), (x + 1.0 * s, yy * s, zz), 0.32 * s), 0.1 * s, "agujetas")


def base(F, R, name, stitches=True, cy=0.0, text_in=4.3):
    F.add(cylinder_z((0, cy, -1.6), R, 1.6, 0.9), 0, "base")
    if stitches:  # puntadas de fieltro alrededor
        n = int(2 * math.pi * (R - 1.7) / 1.5)
        for i in range(n):
            a = 2 * math.pi * i / n
            p = np.array([math.cos(a) * (R - 1.7), cy + math.sin(a) * (R - 1.7), 0.02])
            t = np.array([-math.sin(a), math.cos(a), 0.0])
            F.cut(capsule(p - t * 0.42, p + t * 0.42, 0.26), 0.05, "puntadas")
    if name:
        F.cut(text_prim(name, FONT, 2.6, (0, cy - (R - text_in), 0.0), "xy", depth=1.0), 0.05, "letras")


# ── Diego ────────────────────────────────────────────────────────────────
def diego(F, s=1.0):
    X = lambda v: np.asarray(v, float) * s  # noqa: E731
    base(F, 16.0 * s, "DIEGO")
    for sx in (-1, 1):
        shoe(F, sx * 4.7 * s, s, "tenis_d")
        F.add(round_cone(X((sx * 4.45, -0.2, 4.2)), X((sx * 4.2, 0.1, 18.0)), 2.85 * s, 3.7 * s), 0.8 * s, "jeans")
        F.add(torus(X((sx * 4.45, -0.25, 5.3)), (0, 0, 1), 2.95 * s, 0.8 * s), 0.3 * s, "jeans")  # dobladillo
    F.add(ellipsoid(X((0, 0.2, 19.3)), X((8.2, 5.8, 4.3))), 2.0 * s, "jeans")
    # suéter tejido con franjas (cae recto, como el de la lámina)
    tor = round_box(X((0, 0.3, 30.6)), X((9.3, 6.7, 9.8)), 5.4 * s)
    F.add(with_fn(tor, lambda d, X_, Y_, Z_: knit(d, X_, Y_, Z_, 0, 0.3 * s, 0.95 * s, 0.1 * s, 2.35 * s, 20.8 * s, 0.13 * s)), 1.0 * s, "sueter")
    F.add(with_fn(ellipse_ring(X((0, 0.3, 21.3)), 8.6 * s, 6.1 * s, 1.1 * s),
                  lambda d, X_, Y_, Z_: d + 0.16 * s * (0.5 + 0.5 * np.cos(np.arctan2(Y_, X_) * 60))), 0.8 * s, "puño")
    F.add(with_fn(ellipse_ring(X((0, 0.2, 40.6)), 4.0 * s, 3.7 * s, 1.05 * s),
                  lambda d, X_, Y_, Z_: d + 0.14 * s * (0.5 + 0.5 * np.cos(np.arctan2(Y_, X_) * 36))), 0.4 * s, "puño")
    F.add(capsule(X((0, 0.3, 39.0)), X((0, 0.3, 43.0)), 3.1 * s), 0.6 * s, "piel")
    # brazos: el derecho (x-) cuelga; el izquierdo (x+) se estira hacia Fanny
    arms = {-1: [(-8.4, 0.3, 37.4), (-10.4, 0.7, 31.0), (-11.0, -0.2, 25.0)],
            1: [(8.4, 0.3, 37.4), (11.2, 0.4, 31.4), (15.0, -1.6, 26.6)]}
    for sx, (sh, el, wr) in arms.items():
        sh, el, wr = X(sh), X(el), X(wr)
        stripes = lambda d, X_, Y_, Z_: d + 0.12 * s * np.exp(-((np.mod((Z_ - 20.8 * s) / (2.35 * s), 1) - 0.5) / 0.07) ** 2)  # noqa: E731
        F.add(with_fn(round_cone(sh, el, 2.85 * s, 2.55 * s), stripes), 0.9 * s, "sueter")
        F.add(with_fn(round_cone(el, wr, 2.55 * s, 2.3 * s), stripes), 0.5 * s, "sueter")
        d = normalize(wr - el)
        F.add(torus(wr - d * 0.2 * s, d, 2.05 * s, 0.74 * s), 0.3 * s, "puño")
        hcn = wr + d * 2.5 * s
        F.add(ellipsoid(hcn, (2.1 * s, 1.8 * s, 2.6 * s), frame(d, (0, -1, 0))), 0.5 * s, "piel")
        thumb_dir = normalize(np.cross(d, (0, 0, 1)) * (-sx) + np.array([0, -0.8, 0]))
        F.add(capsule(hcn - d * 0.6 * s + thumb_dir * 1.3 * s, hcn + d * 0.4 * s + thumb_dir * 2.2 * s, 0.78 * s), 0.4 * s, "piel")
    # cabeza
    hc = X((0, -0.3, 53.4))
    rad = X((11.6, 10.8, 12.5))
    F.add(ellipsoid(hc, rad), 1.2 * s, "piel")
    for sx in (-1, 1):
        F.add(ellipsoid(X((sx * 11.2, 0.6, 52.4)), X((1.5, 2.1, 2.7))), 0.5 * s, "piel")
    face_features(F, hc, rad, s, eye_dx=4.8 * s, eye_z=54.9 * s, eye_r=1.5 * s,
                  brow=[(2.0 * s, 60.3 * s), (4.9 * s, 61.0 * s), (7.7 * s, 60.5 * s)], brow_r=0.95 * s, brow_mat="cejas_d",
                  mouth=(0.0, 48.4 * s, 5.0 * s, 2.9 * s, 0.9 * s), rim_R=4.6 * s)
    # nariz grande y el piercing
    F.add(ellipsoid(on_face(hc, rad, 0, 51.6 * s, 0.6 * s), X((2.45, 2.3, 2.85))), 1.2 * s, "piel")
    F.add(sphere(on_face(hc, rad, 1.65 * s, 50.8 * s, 2.45 * s), 0.46 * s), 0.1 * s, "piercing")
    diego_hair(F, hc, rad, s)


def diego_hair(F, hc, rad, s):
    """Melena de rizos de estambre hasta los hombros: un volumen base cubierto de mechones."""
    def window(X_, Y_, Z_):  # la cara queda despejada
        return np.maximum((np.sqrt((X_ / (10.2 * s)) ** 2 + ((Z_ - 51.8 * s) / (11.6 * s)) ** 2) - 1) * 9 * s, Y_ + 2.0 * s)

    def in_window(p, m=0.0):
        return p[1] < -1.0 * s and (p[0] / (10.2 * s + m)) ** 2 + ((p[2] - 51.8 * s) / (11.6 * s + m)) ** 2 < 1.0

    cap_c, cap_r = hc + np.array([0, 1.3, 2.2]) * s, np.array([12.9, 12.4, 13.5]) * s
    bell_c, bell_r = hc + np.array([0, 2.6, -4.8]) * s, np.array([14.2, 11.6, 9.0]) * s
    for c, r in ((cap_c, cap_r), (bell_c, bell_r)):
        F.add(with_fn(ellipsoid(c, r), lambda d, X_, Y_, Z_: np.maximum(d, -window(X_, Y_, Z_))), 1.6 * s, "pelo_d")

    def surf(d):
        """Punto en la superficie del volumen de pelo en la dirección d (desde el centro de la cabeza)."""
        best = None
        for c, r in ((cap_c, cap_r), (bell_c, bell_r)):
            # intersección del rayo hc + t d con el elipsoide
            o = (hc - c) / r
            v = d / r
            A, B, C = v @ v, 2 * o @ v, o @ o - 1
            disc = B * B - 4 * A * C
            if disc < 0:
                continue
            t = (-B + math.sqrt(disc)) / (2 * A)
            if best is None or t > best:
                best = t
        return hc + d * best

    def lock(pts, r0):
        n = len(pts)
        for i in range(n - 1):
            a, b = pts[i], pts[i + 1]
            if in_window(a, 0.3 * s) or in_window(b, 0.3 * s):
                continue
            t0, t1 = i / (n - 1), (i + 1) / (n - 1)
            ra = r0 * (1 - 0.25 * t0) * (1 + 0.07 * math.sin(i * 2.3))
            rb = r0 * (1 - 0.25 * t1) * (1 + 0.07 * math.sin((i + 1) * 2.3))
            F.add(round_cone(a, b, ra, rb), 0.4 * s, "pelo_d")

    # mechones que bajan pegados al volumen: de la coronilla hasta los hombros, ondulados
    n_az = 34
    for j in range(n_az):
        for row in range(3):
            az = math.radians(-150 + 300 * (j + 0.5 * (row % 2) + rng.uniform(-0.25, 0.25)) / n_az)  # 0 = atrás
            el0 = math.radians(62 - row * 22 + rng.uniform(-6, 6))
            pts = []
            phase, amp = rng.uniform(0, 6.28), rng.uniform(0.35, 0.7) * s
            stop = rng.uniform(39.0, 43.5) * s
            steps = 14
            for i in range(steps + 1):
                t = i / steps
                el = el0 - t * math.radians(100)
                d = np.array([math.sin(az) * math.cos(el), math.cos(az) * math.cos(el), math.sin(el)])
                p = surf(d)
                nrm = normalize(p - hc)
                side = normalize(np.cross(nrm, (0, 0, 1))) if abs(nrm[2]) < 0.97 else np.array([1.0, 0, 0])
                p = p + side * amp * math.sin(t * 9 + phase) + nrm * (0.55 * s + 0.35 * amp * math.cos(t * 9 + phase))
                if p[2] < stop:
                    break
                pts.append(p)
            if len(pts) > 2:
                # la punta se suelta un poco del volumen: cae libre y hacia afuera
                tip = pts[-1] + normalize(np.array([pts[-1][0] - hc[0], pts[-1][1] - hc[1], 0])) * 0.8 * s + np.array([0, 0, -1.6 * s])
                lock(pts + [tip], rng.uniform(1.12, 1.38) * s)
    # copete: rizos que barren la frente hacia su izquierda sin tapar los ojos
    for i in range(9):
        x0 = (-8.5 + i * 2.1) * s
        p0 = surf(normalize(np.array([x0 / (10 * s), -0.55, 0.9])))
        pts = [p0 + np.array([t * 5.5 * s, -0.8 * s * math.sin(t * 3), -t * 2.2 * s + 0.6 * s * math.sin(t * 6 + i)]) for t in np.linspace(0, 1, 8)]
        lock(pts, 1.1 * s)


# ── Fanny ────────────────────────────────────────────────────────────────
def hair_tex(d, X, Y, Z, hc, s, amp=0.14, period=0.95, ztop=58.0):
    """Mechones de estambre: surcos que siguen la caída del pelo (hacia abajo; en la
    coronilla, hacia los lados desde la raya)."""
    th = np.arctan2(Y - hc[1], X - hc[0])
    u_side = th * 11.0 * s
    u_top = Y
    w = np.clip((Z - ztop * s) / (3.0 * s), 0, 1)
    g_side = 0.5 + 0.5 * np.cos(2 * math.pi * u_side / (period * s))
    g_top = 0.5 + 0.5 * np.cos(2 * math.pi * u_top / (period * s))
    return d + amp * s * ((1 - w) * g_side + w * g_top)


def fanny(F, s=1.0):
    X = lambda v: np.asarray(v, float) * s  # noqa: E731
    base(F, 15.5 * s, "FANNY")
    for sx in (-1, 1):
        shoe(F, sx * 4.0 * s, s * 0.92, "tenis_f")
        F.add(round_cone(X((sx * 3.9, -0.3, 3.6)), X((sx * 3.65, 0.0, 16.8)), 2.1 * s, 2.45 * s), 0.6 * s, "piel")
        F.add(with_fn(ellipse_ring(X((sx * 3.9, -0.3, 4.4)), 2.2 * s, 2.2 * s, 0.9 * s),
                      lambda d, X_, Y_, Z_: d + 0.1 * s * (0.5 + 0.5 * np.cos(np.arctan2(Y_ + 0.3 * s, X_ - sx * 3.9 * s) * 22))), 0.3 * s, "calceta")
    # falda de mezclilla (jumper) acampanada, con dobladillo y puntadas
    z0, z1 = 15.2 * s, 26.8 * s

    def skirt(X_, Y_, Z_):
        t = np.clip((Z_ - z0) / (z1 - z0), 0, 1)
        a_, b_ = (8.9 - 2.5 * t) * s, (6.7 - 1.8 * t) * s
        k = np.sqrt((X_ / a_) ** 2 + ((Y_ - 0.3 * s) / b_) ** 2)
        return np.maximum((k - 1) * np.minimum(a_, b_) * 0.9, np.maximum(z0 - Z_, Z_ - z1))
    F.add(sdf.Prim(skirt, X((-9.5, -7, 14.5)), X((9.5, 7.6, 27.5))), 0.8 * s, "vestido")
    F.add(ellipse_ring(X((0, 0.3, 15.7)), 8.75 * s, 6.55 * s, 0.6 * s), 0.3 * s, "vestido")
    n = 64
    for i in range(n):  # puntadas del dobladillo
        ang = 2 * math.pi * i / n
        p = np.array([math.cos(ang) * 8.62 * s, 0.3 * s + math.sin(ang) * 6.47 * s, 16.9 * s])
        tng = np.array([-math.sin(ang) * 8.6, math.cos(ang) * 6.5, 0]); tng = normalize(tng)
        F.cut(capsule(p - tng * 0.35 * s, p + tng * 0.35 * s, 0.2 * s), 0.05 * s, "puntadas")
    F.add(round_box(X((0, 0.3, 31.9)), X((6.9, 5.1, 6.4)), 4.2 * s), 1.2 * s, "vestido")
    # peto con costura punteada
    F.add(round_box(X((0, -4.75, 34.0)), X((3.4, 0.45, 3.1)), 0.7 * s), 0.3 * s, "vestido")
    for i in range(22):
        t = i / 22 * 4
        side = int(t)
        f_ = t - side
        pts = [(-2.8, 36.5), (2.8, 36.5), (2.8, 31.6), (-2.8, 31.6), (-2.8, 36.5)]
        (xa, za), (xb, zb) = pts[side], pts[side + 1]
        p = X((xa + (xb - xa) * f_, -5.25, za + (zb - za) * f_))
        F.cut(sphere(p, 0.2 * s), 0.04 * s, "puntadas")
    # saco negro abierto al frente, con solapas
    def wopen(Z_):
        return (3.4 + 0.06 * (Z_ / s - 24.0)) * s
    jb = round_box(X((0, 0.45, 31.6)), X((7.7, 5.8, 7.5)), 4.7 * s)
    F.add(with_fn(jb, lambda d, X_, Y_, Z_: np.maximum(d, -np.maximum(np.abs(X_) - wopen(Z_), Y_ + 2.2 * s))), 1.0 * s, "saco")
    for sx in (-1, 1):
        F.add(round_cone(X((sx * 3.55, -5.2, 24.6)), X((sx * 4.25, -5.0, 37.2)), 0.55 * s, 0.75 * s), 0.35 * s, "saco")
    F.add(ellipse_ring(X((0, 0.9, 39.2)), 4.3 * s, 3.9 * s, 0.95 * s), 0.5 * s, "saco")
    F.add(capsule(X((0, 0.3, 37.6)), X((0, 0.3, 41.6)), 2.75 * s), 0.6 * s, "piel")
    arms = {-1: [(-7.4, 0.4, 36.6), (-9.9, 0.3, 30.6), (-13.8, -1.4, 26.0)],
            1: [(7.4, 0.4, 36.6), (9.5, 0.6, 30.2), (10.1, -0.2, 24.6)]}
    for sx, (sh, el, wr) in arms.items():
        sh, el, wr = X(sh), X(el), X(wr)
        F.add(round_cone(sh, el, 2.55 * s, 2.3 * s), 0.9 * s, "saco")
        F.add(round_cone(el, wr, 2.3 * s, 2.12 * s), 0.5 * s, "saco")
        d = normalize(wr - el)
        F.add(torus(wr - d * 0.25 * s, d, 1.85 * s, 0.55 * s), 0.25 * s, "saco")
        hcn = wr + d * 2.3 * s
        F.add(ellipsoid(hcn, (1.9 * s, 1.6 * s, 2.4 * s), frame(d, (0, -1, 0))), 0.5 * s, "piel")
        thumb_dir = normalize(np.cross(d, (0, 0, 1)) * (-sx) + np.array([0, -0.8, 0]))
        F.add(capsule(hcn - d * 0.55 * s + thumb_dir * 1.2 * s, hcn + d * 0.35 * s + thumb_dir * 2.0 * s, 0.7 * s), 0.4 * s, "piel")
    # cabeza
    hc = X((0, -0.2, 51.6))
    rad = X((11.0, 10.3, 11.9))
    F.add(ellipsoid(hc, rad), 1.2 * s, "piel")
    for sx in (-1, 1):
        F.add(ellipsoid(X((sx * 10.7, 0.5, 50.8)), X((1.4, 1.9, 2.5))), 0.5 * s, "piel")
        F.add(torus(X((sx * 11.05, 0.45, 47.0)), (1, 0, 0), 1.35 * s, 0.38 * s), 0.1 * s, "arete")
    face_features(F, hc, rad, s, eye_dx=4.5 * s, eye_z=52.8 * s, eye_r=1.52 * s,
                  brow=[(1.9 * s, 57.2 * s), (4.5 * s, 58.1 * s), (7.0 * s, 57.5 * s)], brow_r=0.62 * s, brow_mat="cejas_f",
                  mouth=(0.0, 46.9 * s, 4.3 * s, 2.5 * s, 0.8 * s), rim_R=4.45 * s, lashes=True)
    F.add(sphere(on_face(hc, rad, 0, 49.9 * s, 0.95 * s), 2.05 * s), 1.0 * s, "nariz_f")
    fanny_hair(F, hc, rad, s)


def fanny_hair(F, hc, rad, s):
    """Pelo largo y lacio de estambre azul, raya en medio, detrás de las orejas."""
    def window(X_, Y_, Z_):
        return np.maximum((np.sqrt((X_ / (9.3 * s)) ** 2 + ((Z_ - 49.9 * s) / (11.1 * s)) ** 2) - 1) * 9 * s, Y_ + 1.2 * s)
    tex = lambda d, X_, Y_, Z_: hair_tex(np.maximum(d, -window(X_, Y_, Z_)), X_, Y_, Z_, hc, s)  # noqa: E731
    F.add(with_fn(ellipsoid(hc + np.array([0, 1.1, 1.5]) * s, np.array([11.9, 11.5, 12.8]) * s), tex, 0.3 * s), 1.4 * s, "pelo_f")

    def curtain(X_, Y_, Z_):
        """Cortina lacia: rodea la cabeza por los lados y atrás y cae hasta media espalda;
        arriba va detrás de las orejas y abajo pasa por delante de los hombros."""
        th = np.arctan2(Y_ - 2.2 * s, X_)
        zb = (30.8 + 0.7 * np.sin(th * 9.0) + 0.4 * np.sin(th * 23.0)) * s   # puntas disparejas
        k = np.sqrt((X_ / (11.7 * s)) ** 2 + ((Y_ - 2.3 * s) / (9.3 * s)) ** 2)
        d = np.maximum((k - 1) * 9.3 * s, np.maximum(zb - Z_, Z_ - 53.5 * s))
        front_a = np.maximum(np.abs(X_) - 8.7 * s, Y_ - 1.6 * s)
        front_b = np.maximum(45.4 * s - Z_, Y_ - 1.9 * s)
        return np.maximum(d, -np.minimum(front_a, front_b))
    F.add(with_fn(sdf.Prim(curtain, np.array([-12.5, -8, 29.5]) * s, np.array([12.5, 12.5, 54.5]) * s), tex, 0.3 * s), 1.6 * s, "pelo_f")
    # raya en medio
    part = [np.array([0, -8.9, 60.4]), np.array([0, -4.5, 63.3]), np.array([0, 1.2, 64.5]), np.array([0, 6.5, 63.0])]
    for a_, b_ in zip(part[:-1], part[1:]):
        F.cut(capsule(a_ * s, b_ * s, 0.42 * s), 0.25 * s, "pelo_f")


# ── Tris ─────────────────────────────────────────────────────────────────
def heart_prim(c, size, thick, n=(0, -1, 0)):
    """Corazón (SDF 2D de iq) extruido; la punta hacia abajo."""
    F_ = frame(n, (0, 0, 1))

    def f(X, Y, Z):
        x, y, z = local(X, Y, Z, np.asarray(c, float), F_)
        px, py = np.abs(x) / size, y / size + 0.55
        d1 = np.sqrt((px - 0.25) ** 2 + (py - 0.75) ** 2) - math.sqrt(2) / 4
        m = 0.5 * np.maximum(px + py, 0)
        d2 = np.sqrt(np.minimum(px ** 2 + (py - 1) ** 2, (px - m) ** 2 + (py - m) ** 2)) * np.sign(px - py)
        d2d = np.where(py + px > 1, d1, d2) * size
        return np.maximum(d2d, np.abs(z) - thick / 2)
    m = size * 1.3
    return Prim(f, np.asarray(c) - m, np.asarray(c) + m)


def tris(F, s=1.0):
    X = lambda v: np.asarray(v, float) * s  # noqa: E731
    base(F, 13.5 * s, "TRIS", cy=-0.3 * s, text_in=4.6)
    head_c, head_r = X((0, -1.6, 21.8)), X((6.9, 6.3, 6.5))
    forms = [
        ellipsoid(X((0, 1.6, 9.2)), X((6.0, 6.6, 7.0))),                      # pecho y cuerpo
        ellipsoid(X((0, -0.6, 15.6)), X((4.6, 4.6, 4.2))),                    # cuello
        ellipsoid(head_c, head_r),                                             # cabeza
        ellipsoid(X((0, -6.5, 19.7)), X((3.1, 2.9, 2.5))),                    # hocico
        ellipsoid(X((0, 8.6, 7.8)), X((2.4, 2.4, 2.5))),                      # colita pompón
    ]
    for sx in (-1, 1):
        forms += [
            ellipsoid(X((sx * 4.4, 3.6, 5.0)), X((3.3, 4.4, 4.1))),           # ancas
            capsule(X((sx * 2.5, -2.9, 1.3)), X((sx * 2.7, -1.7, 9.6)), 1.85 * s),   # patas de adelante
            ellipsoid(X((sx * 2.5, -4.2, 1.3)), X((1.85, 2.4, 1.35))),        # patitas
            ellipsoid(X((sx * 5.7, -1.0, 1.3)), X((1.8, 2.6, 1.3))),          # patas de atrás
            ellipsoid(X((sx * 6.6, -0.8, 18.6)), X((2.3, 2.7, 5.0)), frame((sx * 0.25, 0.1, 1.0))),  # orejas colgando
        ]
    for f_ in forms:
        F.add(f_, 1.3 * s, "pelaje")
    # rizos: miles de bolitas sobre la superficie (pelo de bichón)
    eyes = [np.array([sx * 2.7 * s, surf_y(head_c, head_r, sx * 2.7 * s, 22.9 * s), 22.9 * s]) for sx in (-1, 1)]
    nose = X((0, -9.55, 20.7))
    lo, hi = X((-10, -11, 0.2)), X((10, 11.5, 29.5))
    i0 = np.floor((lo - F.lo) / F.h).astype(int)
    i1 = np.ceil((hi - F.lo) / F.h).astype(int)
    sub = F.D[i0[0]:i1[0], i0[1]:i1[1], i0[2]:i1[2]]
    band = np.argwhere(np.abs(sub) < 0.55 * F.h)
    P = (band + i0) * F.h + F.lo
    P = P[rng.permutation(len(P))]
    cell = 0.95 * s
    seen, pts = set(), []
    for p in P:
        key = tuple(np.floor(p / cell).astype(int))
        if key in seen:
            continue
        seen.add(key)
        pts.append(p)
    pts = np.array(pts)
    e = 0.3 * s
    grads = np.stack([F.sample(pts + np.array([e, 0, 0])) - F.sample(pts - np.array([e, 0, 0])),
                      F.sample(pts + np.array([0, e, 0])) - F.sample(pts - np.array([0, e, 0])),
                      F.sample(pts + np.array([0, 0, e])) - F.sample(pts - np.array([0, 0, e]))], 1)
    nrm = grads / (np.linalg.norm(grads, axis=1, keepdims=True) + 1e-9)
    n_curls = 0
    for p, n_ in zip(pts, nrm):
        if p[2] < 0.9 * s:
            continue
        if min(np.linalg.norm(p - e_) for e_ in eyes) < 2.0 * s or np.linalg.norm(p - nose) < 2.0 * s:
            continue
        on_muzzle = p[1] < -6.0 * s and 16.5 * s < p[2] < 22.5 * s and abs(p[0]) < 3.6 * s
        if on_muzzle and p[2] < 18.8 * s and abs(p[0]) < 1.6 * s:
            continue  # la boca y la lengua
        r = rng.uniform(0.55, 0.7) * s if on_muzzle else rng.uniform(0.8, 1.2) * s
        F.add(sphere(p + n_ * r * 0.35, r), 0.45 * s, "pelaje")
        n_curls += 1
    # cara
    for e_ in eyes:
        n_ = surf_n(head_c, head_r, e_)
        F.cut(sphere(e_ + n_ * 1.4 * s, 1.75 * s), 0.6 * s, "pelaje")
        F.add(sphere(e_ + n_ * 0.35 * s, 1.15 * s), 0.15 * s, "ojos")
    F.add(ellipsoid(nose, X((1.3, 0.95, 0.95))), 0.3 * s, "nariz_t")
    F.cut(capsule(X((-1.3, -9.3, 18.7)), X((1.3, -9.3, 18.7)), 0.35 * s), 0.2 * s, "boca")
    F.add(ellipsoid(X((0.3, -8.9, 17.5)), X((0.95, 0.7, 1.35)), frame((0, -0.5, 1.0))), 0.25 * s, "lengua")
    # collar rojo con su placa de corazón
    F.add(ellipse_ring(X((0, -0.8, 15.2)), 5.7 * s, 5.5 * s, 0.72 * s), 0.3 * s, "collar")
    F.add(capsule(X((0, -6.35, 14.6)), X((0, -6.5, 13.9)), 0.4 * s), 0.1 * s, "collar")
    F.add(heart_prim(X((0, -6.7, 12.5)), 2.1 * s, 0.9 * s), 0.15 * s, "collar")
    return n_curls


# ── base para exhibirlos juntos ─────────────────────────────────────────
# centros de las bases redondas en la base grande (mm). Diego y Fanny quedan con
# las manos casi tocándose (~1.4 mm, para que cada figura entre derecho en su hueco) y Tris al frente.
POS = {"diego": (-19.2, 6.0), "fanny": (19.2, 6.0), "tris": (0.0, -23.4)}
DISC = {"diego": (16.0, 0.0), "fanny": (15.5, 0.0), "tris": (13.5, -0.3)}   # (radio, y del centro en la figura)
STAND_H = 5.0


def stand(F):
    cx, cy, a_, b_, n = 0.0, -7.5, 41.5, 34.5, 2.6

    def plate(X, Y, Z):
        k = (np.abs((X - cx) / a_) ** n + np.abs((Y - cy) / b_) ** n) ** (1 / n)
        dr = (k - 1) * min(a_, b_) + 1.4
        dz = np.abs(Z + STAND_H / 2) - STAND_H / 2 + 1.4
        return np.minimum(np.maximum(dr, dz), 0) + np.sqrt(np.maximum(dr, 0) ** 2 + np.maximum(dz, 0) ** 2) - 1.4
    F.add(Prim(plate, np.array([cx - a_, cy - b_, -STAND_H]), np.array([cx + a_, cy + b_, 0])), 0, "base")
    for name, (x, y) in POS.items():
        R, _ = DISC[name]
        F.cut(cylinder_z((x, y, 0.0), R + 0.3, 1.9, 0.0), 0.2, "base")
    # puntadas de fieltro alrededor
    m = 150
    for i in range(m):
        t = 2 * math.pi * i / m
        c, s_ = math.cos(t), math.sin(t)
        r = 1 / ((abs(c / (a_ - 2.6)) ** n + abs(s_ / (b_ - 2.6)) ** n) ** (1 / n))
        p = np.array([cx + r * c, cy + r * s_, 0.02])
        tn = normalize(np.array([-s_ * (a_ - 2.6), c * (b_ - 2.6), 0]))
        F.cut(capsule(p - tn * 0.45, p + tn * 0.45, 0.28), 0.05, "puntadas")
    # corazón grabado entre los dos, detrás de las manos
    F.cut(heart_prim((0, 16.5, 0.0), 3.4, 1.2, (0, 0, 1)), 0.1, "letras")
    # letras alrededor, grabadas en el canto (siguen la curva)
    shell = lambda X, Y, Z: np.abs(plate(X, Y, Z) + 0.2) - 0.6  # noqa: E731
    front = text_prim("Fanny & Diego · 2 años", FONT, 2.7, (0, cy - b_ + 8, -STAND_H / 2), "xz", depth=20)
    back = text_prim("20·10·2024  —  20·10·2026", FONT, 2.4, (0, cy + b_ - 8, -STAND_H / 2), "xz", depth=20, flip=True)
    for t_ in (front, back):
        F.cut(Prim(lambda X, Y, Z, t_=t_: np.maximum(t_(X, Y, Z), shell(X, Y, Z)), t_.lo, t_.hi), 0.05, "letras")


FIGS = {"diego": (diego, (-27, -18, -3.5), (27, 18, 76)),
        "fanny": (fanny, (-24, -17, -3.5), (24, 17, 69)),
        "tris": (tris, (-15, -14.5, -3.5), (15, 16, 31)),
        "base": (stand, (-43, -43, -5.5), (43, 28, 0.6))}

def build(name, h):
    global rng
    rng = np.random.default_rng({"diego": 2410, "fanny": 2010, "tris": 2024, "base": 2026}[name])  # mismo resultado siempre
    fn, lo, hi = FIGS[name]
    F = sdf.Field(lo, hi, h)
    fn(F)
    return F


def colorize(F, mesh):
    lab = F.labels_at(mesh.vertices)
    C = np.zeros((len(mesh.vertices), 3))
    for i, m in enumerate(F.mats):
        if m == "-":
            continue
        sel = lab == i
        if m in ("sueter", "puño"):
            z = mesh.vertices[sel, 2]
            k = np.floor((z - 20.8) / 2.35).astype(int) % len(STRIPES)
            C[sel] = np.array(STRIPES)[k]
        else:
            C[sel] = PALETTE.get(m, (200, 200, 200))
    return C


if __name__ == "__main__":
    import time
    ap = argparse.ArgumentParser()
    ap.add_argument("fig", default="diego")
    ap.add_argument("--h", type=float, default=0.2)
    ap.add_argument("--faces", type=int, default=0)
    a = ap.parse_args()
    t0 = time.time()
    F = build(a.fig, a.h)
    print(f"campo {F.n} en {time.time() - t0:.1f}s")
    m = F.mesh()
    print(f"malla {len(m.faces)} caras, cerrada={m.is_watertight} en {time.time() - t0:.1f}s")
    import pickle
    C = colorize(F, m)
    pickle.dump((m, C), open(f"/tmp/{a.fig}_{a.h}.pkl", "wb"))
