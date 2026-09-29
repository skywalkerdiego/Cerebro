"""Mini motor de modelado por campos de distancia (SDF) para figuras imprimibles.

Todo en milímetros. Z hacia arriba, la figura mira hacia -Y (hacia quien la ve),
+X es la derecha de quien la ve. La cara superior de la base está en z = 0.

    F = Field(lo, hi, h)                 # rejilla de voxeles de lado h (mm)
    F.add(prim, k=0.8, mat="piel")       # unión suave (k = radio de fusión)
    F.cut(prim, k=0.3, mat="boca")       # resta suave (lo tallado toma ese material)
    mesh = F.mesh()                      # marching cubes -> trimesh con color por material

Cada primitiva sabe su caja envolvente, así que solo se evalúa en su vecindad:
se pueden sumar miles de rizos o mechones sin recorrer toda la rejilla.
"""
import numpy as np

EPS = 1e-9


def normalize(v):
    v = np.asarray(v, float)
    return v / (np.linalg.norm(v) + EPS)


def frame(n, up=(0, 0, 1)):
    """Base ortonormal (u, v, n) con n como eje z local."""
    n = normalize(n)
    up = np.asarray(up, float)
    if abs(np.dot(up, n)) > 0.95:
        up = np.array([1.0, 0, 0])
    u = normalize(np.cross(up, n))
    v = np.cross(n, u)
    return np.stack([u, v, n], 1)  # columnas


class Prim:
    def __init__(self, fn, lo, hi):
        self.fn, self.lo, self.hi = fn, np.asarray(lo, float), np.asarray(hi, float)

    def __call__(self, X, Y, Z):
        return self.fn(X, Y, Z)


def local(X, Y, Z, c, R):
    """Coordenadas locales (R: columnas = ejes locales en mundo)."""
    dx, dy, dz = X - c[0], Y - c[1], Z - c[2]
    return (dx * R[0, 0] + dy * R[1, 0] + dz * R[2, 0],
            dx * R[0, 1] + dy * R[1, 1] + dz * R[2, 1],
            dx * R[0, 2] + dy * R[1, 2] + dz * R[2, 2])


def sphere(c, r):
    c = np.asarray(c, float)
    return Prim(lambda X, Y, Z: np.sqrt((X - c[0]) ** 2 + (Y - c[1]) ** 2 + (Z - c[2]) ** 2) - r, c - r, c + r)


def ellipsoid(c, rad, R=None):
    c, rad = np.asarray(c, float), np.asarray(rad, float)
    R = np.eye(3) if R is None else np.asarray(R, float)

    def f(X, Y, Z):
        x, y, z = local(X, Y, Z, c, R)
        k0 = np.sqrt((x / rad[0]) ** 2 + (y / rad[1]) ** 2 + (z / rad[2]) ** 2)
        k1 = np.sqrt((x / rad[0] ** 2) ** 2 + (y / rad[1] ** 2) ** 2 + (z / rad[2] ** 2) ** 2)
        return k0 * (k0 - 1.0) / (k1 + EPS)
    m = rad.max()
    return Prim(f, c - m, c + m)


def round_cone(a, b, ra, rb):
    """Cápsula cónica de a (radio ra) a b (radio rb) — SDF exacto de iq."""
    a, b = np.asarray(a, float), np.asarray(b, float)
    ba = b - a
    l2 = ba @ ba
    rr = ra - rb
    a2 = l2 - rr * rr
    il2 = 1.0 / l2

    def f(X, Y, Z):
        pax, pay, paz = X - a[0], Y - a[1], Z - a[2]
        y = pax * ba[0] + pay * ba[1] + paz * ba[2]
        z = y - l2
        qx = pax * l2 - ba[0] * y
        qy = pay * l2 - ba[1] * y
        qz = paz * l2 - ba[2] * y
        x2 = qx * qx + qy * qy + qz * qz
        y2 = y * y * l2
        z2 = z * z * l2
        k = np.sign(rr) * rr * rr * x2
        out = np.where(np.sign(z) * a2 * z2 > k, np.sqrt(x2 + z2) * il2 - rb,
                       np.where(np.sign(y) * a2 * y2 < k, np.sqrt(x2 + y2) * il2 - ra,
                                (np.sqrt(x2 * a2 * il2) + y * rr) * il2 - ra))
        return out
    m = max(ra, rb)
    return Prim(f, np.minimum(a, b) - m, np.maximum(a, b) + m)


def capsule(a, b, r):
    return round_cone(a, b, r, r) if np.linalg.norm(np.subtract(b, a)) > 1e-6 else sphere(a, r)


def round_box(c, half, r, R=None):
    c, half = np.asarray(c, float), np.asarray(half, float)
    R = np.eye(3) if R is None else np.asarray(R, float)

    def f(X, Y, Z):
        x, y, z = local(X, Y, Z, c, R)
        qx, qy, qz = np.abs(x) - half[0] + r, np.abs(y) - half[1] + r, np.abs(z) - half[2] + r
        outside = np.sqrt(np.maximum(qx, 0) ** 2 + np.maximum(qy, 0) ** 2 + np.maximum(qz, 0) ** 2)
        return outside + np.minimum(np.maximum(qx, np.maximum(qy, qz)), 0) - r
    m = np.linalg.norm(half)
    return Prim(f, c - m, c + m)


def torus(c, n, R_major, r_minor):
    c = np.asarray(c, float)
    F = frame(n)

    def f(X, Y, Z):
        x, y, z = local(X, Y, Z, c, F)
        q = np.sqrt(x * x + y * y) - R_major
        return np.sqrt(q * q + z * z) - r_minor
    m = R_major + r_minor
    return Prim(f, c - m, c + m)


def ellipse_ring(c, a, b, r_minor, zscale=1.0):
    """Anillo alrededor de una elipse horizontal (semiejes a, b) — para puños, cuellos, collares."""
    c = np.asarray(c, float)

    def f(X, Y, Z):
        x, y, z = X - c[0], Y - c[1], (Z - c[2]) / zscale
        k = np.sqrt((x / a) ** 2 + (y / b) ** 2) + EPS
        de = (k - 1.0) * min(a, b)  # distancia aproximada a la elipse en el plano
        return np.sqrt(de * de + z * z) - r_minor
    m = max(a, b) + r_minor
    return Prim(f, c - np.array([m, m, r_minor * zscale]), c + np.array([m, m, r_minor * zscale]))


def cylinder_z(c, r, hh, round_r=0.0):
    c = np.asarray(c, float)

    def f(X, Y, Z):
        dr = np.sqrt((X - c[0]) ** 2 + (Y - c[1]) ** 2) - r + round_r
        dz = np.abs(Z - c[2]) - hh + round_r
        return np.minimum(np.maximum(dr, dz), 0) + np.sqrt(np.maximum(dr, 0) ** 2 + np.maximum(dz, 0) ** 2) - round_r
    return Prim(f, c - np.array([r, r, hh]), c + np.array([r, r, hh]))


def with_fn(prim, g, pad=0.0):
    """Primitiva modificada: d' = g(d, X, Y, Z) (texturas, cortes)."""
    return Prim(lambda X, Y, Z: g(prim(X, Y, Z), X, Y, Z), prim.lo - pad, prim.hi + pad)


def intersect(p, q):
    lo, hi = np.maximum(p.lo, q.lo), np.minimum(p.hi, q.hi)
    return Prim(lambda X, Y, Z: np.maximum(p(X, Y, Z), q(X, Y, Z)), lo, hi)


def text_prim(text, font, height, center, plane="xy", depth=1.0, flip=False, px=40):
    """Texto extruido. plane='xy': letras en el plano XY (grabado en tapa); 'xz': en el plano XZ."""
    from PIL import Image, ImageDraw, ImageFont
    from scipy.ndimage import distance_transform_edt
    f = ImageFont.truetype(font, px)
    bb = f.getbbox(text)
    w, h = bb[2] - bb[0] + 20, bb[3] - bb[1] + 20
    im = Image.new("L", (w, h), 0)
    ImageDraw.Draw(im).text((10 - bb[0], 10 - bb[1]), text, font=f, fill=255)
    a = np.array(im) > 127
    sd = (distance_transform_edt(~a) - distance_transform_edt(a)).astype(np.float32)
    s = height / (bb[3] - bb[1])  # mm por px
    sd *= s
    W, H = w * s, h * s
    c = np.asarray(center, float)
    from scipy.ndimage import map_coordinates

    def f(X, Y, Z):
        if plane == "xy":
            u, v, t = X - c[0], Y - c[1], Z - c[2]
            u = -u if flip else u
            col, row = (u + W / 2) / s, (-v + H / 2) / s
        else:
            u, v, t = X - c[0], Z - c[2], Y - c[1]
            u = -u if flip else u
            col, row = (u + W / 2) / s, (-v + H / 2) / s
        shp = np.broadcast(col, row, t).shape
        col, row, t = np.broadcast_to(col, shp), np.broadcast_to(row, shp), np.broadcast_to(t, shp)
        d2 = map_coordinates(sd, [row.ravel(), col.ravel()], order=1, mode="constant", cval=float(sd.max())).reshape(shp)
        return np.maximum(d2, np.abs(t) - depth / 2)
    if plane == "xy":
        lo, hi = c - [W / 2, H / 2, depth / 2], c + [W / 2, H / 2, depth / 2]
    else:
        lo, hi = c - [W / 2, depth / 2, H / 2], c + [W / 2, depth / 2, H / 2]
    return Prim(f, lo, hi)


class Field:
    def __init__(self, lo, hi, h):
        self.lo = np.asarray(lo, float)
        self.h = float(h)
        self.n = (np.ceil((np.asarray(hi, float) - self.lo) / h).astype(int) + 1)
        self.D = np.full(self.n, 50.0, np.float32)
        self.L = np.zeros(self.n, np.uint8)
        self.mats = ["-"]
        self.axes = [self.lo[i] + np.arange(self.n[i]) * h for i in range(3)]

    def mat_id(self, name):
        if name is None:
            return 0
        if name not in self.mats:
            self.mats.append(name)
        return self.mats.index(name)

    def _block(self, lo, hi):
        i0 = np.clip(np.floor((lo - self.lo) / self.h).astype(int), 0, self.n)
        i1 = np.clip(np.ceil((hi - self.lo) / self.h).astype(int) + 1, 0, self.n)
        if np.any(i1 <= i0):
            return None
        sl = tuple(slice(a, b) for a, b in zip(i0, i1))
        X = self.axes[0][sl[0]][:, None, None]
        Y = self.axes[1][sl[1]][None, :, None]
        Z = self.axes[2][sl[2]][None, None, :]
        return sl, X, Y, Z

    def add(self, p, k=0.0, mat=None):
        pad = k + 2 * self.h
        b = self._block(p.lo - pad, p.hi + pad)
        if b is None:
            return
        sl, X, Y, Z = b
        d = np.broadcast_to(p(X, Y, Z), self.D[sl].shape).astype(np.float32)
        a = self.D[sl]
        m = self.mat_id(mat)
        if m:
            self.L[sl] = np.where(d < a, m, self.L[sl])
        if k > 0:
            hh = np.maximum(k - np.abs(a - d), 0) / k
            self.D[sl] = np.minimum(a, d) - hh * hh * k * 0.25
        else:
            self.D[sl] = np.minimum(a, d)

    def cut(self, p, k=0.0, mat=None):
        pad = k + 2 * self.h
        b = self._block(p.lo - pad, p.hi + pad)
        if b is None:
            return
        sl, X, Y, Z = b
        d = np.broadcast_to(p(X, Y, Z), self.D[sl].shape).astype(np.float32)
        a = self.D[sl]
        m = self.mat_id(mat)
        if m:
            self.L[sl] = np.where((-d > a - 0.6 * self.h) & (d < 3 * self.h), m, self.L[sl])
        if k > 0:
            hh = np.maximum(k - np.abs(a + d), 0) / k
            self.D[sl] = np.maximum(a, -d) + hh * hh * k * 0.25
        else:
            self.D[sl] = np.maximum(a, -d)

    def sample(self, P):
        """SDF actual en puntos P (N,3), interpolación trilineal."""
        from scipy.ndimage import map_coordinates
        idx = ((np.asarray(P) - self.lo) / self.h).T
        return map_coordinates(self.D, idx, order=1, mode="nearest")

    def mesh(self):
        import trimesh
        from skimage.measure import marching_cubes
        D = np.where(np.abs(self.D) < 1e-4, np.float32(1e-4), self.D)   # sin ceros exactos: evita aristas no-manifold
        v, f, n, _ = marching_cubes(D, 0.0, spacing=(self.h,) * 3, allow_degenerate=False)
        v += self.lo
        m = trimesh.Trimesh(v, f, process=True)
        return m

    def labels_at(self, V):
        """Material más cercano para cada vértice (voxel del lado de adentro)."""
        idx = np.round((V - self.lo) / self.h).astype(int)
        idx = np.clip(idx, 0, self.n - 1)
        return self.L[idx[:, 0], idx[:, 1], idx[:, 2]]


def finish(mesh, tol=0.008):
    """Deja la pieza sólida principal (quita burbujas internas y astillas) y reduce
    triángulos con manifold3d, que conserva la malla cerrada (tolerancia en mm)."""
    import manifold3d as mf
    import trimesh
    parts = sorted(mesh.split(only_watertight=False), key=lambda p: -len(p.faces))
    keep = [p for p in parts if p.volume > 1.0]          # volumen negativo = hueco interno
    dropped = [round(float(p.volume), 3) for p in parts if p.volume <= 1.0]
    mesh = trimesh.util.concatenate(keep) if len(keep) > 1 else keep[0]
    M = mf.Manifold(mf.Mesh(vert_properties=np.asarray(mesh.vertices, np.float32),
                            tri_verts=np.asarray(mesh.faces, np.uint32)))
    if tol:
        M = M.simplify(tol)
    comps = M.decompose()                      # burbujitas que quedaron pegadas por un punto
    if len(comps) > 1:
        dropped += [round(c.volume(), 4) for c in comps if c.volume() <= 1.0]
        M = mf.Manifold.compose([c for c in comps if c.volume() > 1.0])
    mm = M.to_mesh()
    # sin "process": trimesh borraría triángulos degenerados (válidos en manifold) y abriría hoyos
    out = trimesh.Trimesh(np.asarray(mm.vert_properties)[:, :3], np.asarray(mm.tri_verts), process=False)
    return out, len(keep), dropped
