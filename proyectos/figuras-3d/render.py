"""Vistas previas de las figuras: rasterizador con z-buffer (numba), sombreado suave.

render(mesh, colors, azim, elev, size) -> imagen RGB (numpy uint8)
colors: (N,3) por vértice en 0..255, o None para "resina gris".
azim = 0 es de frente; positivo gira la cámara hacia la derecha de quien mira.
"""
import numpy as np
from numba import njit


@njit(cache=True)
def _raster(P, N, C, F, W, H, zbuf, img, L1, L2, Hv, amb, spec_k):
    for t in range(F.shape[0]):
        i0, i1, i2 = F[t, 0], F[t, 1], F[t, 2]
        x0, y0, z0 = P[i0, 0], P[i0, 1], P[i0, 2]
        x1, y1, z1 = P[i1, 0], P[i1, 1], P[i1, 2]
        x2, y2, z2 = P[i2, 0], P[i2, 1], P[i2, 2]
        area = (x1 - x0) * (y2 - y0) - (x2 - x0) * (y1 - y0)
        if abs(area) < 1e-12:
            continue
        xmin = max(int(min(x0, min(x1, x2))), 0)
        xmax = min(int(max(x0, max(x1, x2))) + 1, W - 1)
        ymin = max(int(min(y0, min(y1, y2))), 0)
        ymax = min(int(max(y0, max(y1, y2))) + 1, H - 1)
        inv = 1.0 / area
        for py in range(ymin, ymax + 1):
            for px in range(xmin, xmax + 1):
                fx, fy = px + 0.5, py + 0.5
                w0 = ((x1 - fx) * (y2 - fy) - (x2 - fx) * (y1 - fy)) * inv
                w1 = ((x2 - fx) * (y0 - fy) - (x0 - fx) * (y2 - fy)) * inv
                w2 = 1.0 - w0 - w1
                if w0 < 0 or w1 < 0 or w2 < 0:
                    continue
                z = w0 * z0 + w1 * z1 + w2 * z2
                if z >= zbuf[py, px]:
                    continue
                zbuf[py, px] = z
                nx = w0 * N[i0, 0] + w1 * N[i1, 0] + w2 * N[i2, 0]
                ny = w0 * N[i0, 1] + w1 * N[i1, 1] + w2 * N[i2, 1]
                nz = w0 * N[i0, 2] + w1 * N[i1, 2] + w2 * N[i2, 2]
                ln = (nx * nx + ny * ny + nz * nz) ** 0.5 + 1e-9
                nx, ny, nz = nx / ln, ny / ln, nz / ln
                if nz > 0:  # normal alejándose de la cámara (interior visto por borde): voltéala
                    nx, ny, nz = -nx, -ny, -nz
                d1 = max(nx * L1[0] + ny * L1[1] + nz * L1[2], 0.0)
                d2 = max(nx * L2[0] + ny * L2[1] + nz * L2[2], 0.0)
                s = max(nx * Hv[0] + ny * Hv[1] + nz * Hv[2], 0.0) ** 28 * spec_k
                rim = (1.0 - abs(nz)) ** 3 * 0.22
                sh = amb + 0.70 * d1 + 0.30 * d2 + rim
                for c in range(3):
                    col = w0 * C[i0, c] + w1 * C[i1, c] + w2 * C[i2, c]
                    img[py, px, c] = min(col * sh + s * 255.0, 255.0)


def camera(ctr, rad, azim, elev, fov, margin):
    a, e = np.radians(azim), np.radians(elev)
    d = np.array([np.sin(a) * np.cos(e), -np.cos(a) * np.cos(e), np.sin(e)])  # del centro a la cámara
    fwd = -d
    right = np.cross(fwd, [0, 0, 1.0])
    right /= np.linalg.norm(right)
    up = np.cross(right, fwd)
    dist = rad * margin / np.tan(np.radians(fov / 2))
    return ctr + d * dist, right, up, fwd


def render(mesh, colors=None, azim=0.0, elev=12.0, size=900, fov=24.0, margin=1.08, bg=(246, 242, 236),
           center=None, radius=None):
    V = np.asarray(mesh.vertices, np.float64)
    Fc = np.asarray(mesh.faces, np.int64)
    Nv = np.asarray(mesh.vertex_normals, np.float64)
    if colors is None:
        colors = np.tile(np.array([[200.0, 198.0, 194.0]]), (len(V), 1))
    C = np.asarray(colors, np.float64)
    ctr = (V.min(0) + V.max(0)) / 2 if center is None else np.asarray(center, float)
    rad = np.linalg.norm(V - ctr, axis=1).max() if radius is None else radius
    cam, right, up, fwd = camera(ctr, rad, azim, elev, fov, margin)
    rel = V - cam
    xc, yc, zc = rel @ right, rel @ up, rel @ fwd
    f = (size / 2) / np.tan(np.radians(fov / 2))
    P = np.stack([size / 2 + f * xc / zc, size / 2 - f * yc / zc, zc], 1)
    Nc = np.stack([Nv @ right, Nv @ up, Nv @ fwd], 1)   # x derecha, y arriba, z hacia adentro
    Nc[:, 1] *= -1                                      # y de pantalla va hacia abajo
    L1 = np.array([-0.5, -0.6, -0.62]); L1 /= np.linalg.norm(L1)   # luz principal: arriba a la izquierda, al frente
    L2 = np.array([0.75, -0.15, -0.64]); L2 /= np.linalg.norm(L2)  # relleno desde la derecha
    Hv = L1 + np.array([0, 0, -1.0]); Hv /= np.linalg.norm(Hv)
    zbuf = np.full((size, size), np.inf)
    img = np.zeros((size, size, 3))
    img[:] = bg
    _raster(P, Nc, C, Fc, size, size, zbuf, img, L1, L2, Hv, 0.2, 0.32)
    return img.astype(np.uint8)


def sheet(images, cols):
    h, w = images[0].shape[:2]
    rows = (len(images) + cols - 1) // cols
    out = np.full((rows * h, cols * w, 3), 246, np.uint8)
    for i, im in enumerate(images):
        out[(i // cols) * h:(i // cols + 1) * h, (i % cols) * w:(i % cols + 1) * w] = im
    return out
