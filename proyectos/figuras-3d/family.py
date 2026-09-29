"""Los tres en su base: imagen principal de vista previa (previews/familia.jpg)."""
import pickle

import numpy as np
import trimesh
from PIL import Image

import personajes as P
from render import render, sheet

meshes, colors = [], []
for name in ("base", "diego", "fanny", "tris"):
    m, C = pickle.load(open(f"/tmp/final_{name}.pkl", "rb"))
    m = m.copy()
    if name != "base":
        x, y = P.POS[name]
        R, cy = P.DISC[name]
        m.apply_translation([x, y - cy, -1.9 + 3.2])   # la base redonda entra 1.9 mm en su hueco
    meshes.append(m)
    colors.append(C)
M = trimesh.util.concatenate(meshes)
C = np.concatenate(colors)
ims = [render(M, C, az, el, 1200, fov=22, margin=1.02) for az, el in ((0, 14), (28, 18))]
ims += [render(M, None, az, el, 1200, fov=22, margin=1.02) for az, el in ((-28, 18), (180, 16))]
Image.fromarray(sheet(ims, 2)).save("previews/familia.jpg", quality=90)
Image.fromarray(ims[1]).save("previews/familia_color.jpg", quality=92)
# ¿se tocan las manos? distancia mínima entre Diego y Fanny ya colocados
from scipy.spatial import cKDTree
d = cKDTree(meshes[1].vertices).query(meshes[2].vertices)[0]
print("separación mínima Diego–Fanny:", round(float(d.min()), 2), "mm")
# al meterlas derecho hacia abajo no deben chocar: separación en planta (XY) de lo que está arriba de las bases
hi_d = meshes[1].vertices[meshes[1].vertices[:, 2] > 5]
hi_f = meshes[2].vertices[meshes[2].vertices[:, 2] > 5]
dxy = cKDTree(hi_d[:, :2]).query(hi_f[:, :2])[0]
print("separación en planta (para insertarlas):", round(float(dxy.min()), 2), "mm")
