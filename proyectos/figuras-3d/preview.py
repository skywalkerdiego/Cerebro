"""Hojas de vistas previas de una figura ya generada (pickle de /tmp)."""
import pickle
import sys

import numpy as np
from PIL import Image

from render import render, sheet

name = sys.argv[1]
out = sys.argv[2]
mode = sys.argv[3] if len(sys.argv) > 3 else "views"
m, C = pickle.load(open(name, "rb"))
if mode == "views":
    ims = [render(m, C, az, 10, 700) for az in (0, 35, 90, 180)] + [render(m, None, az, 10, 700) for az in (0, -35, -90, 150)]
    Image.fromarray(sheet(ims, 4)).save(out, quality=90)
elif mode == "face":
    V = m.vertices
    top = V[:, 2].max()
    ctr = np.array([0, V[:, 1].min() + 6, top - 18])
    ims = [render(m, C, az, 6, 800, center=ctr, radius=16, fov=26) for az in (0, 30)] + \
          [render(m, None, az, 6, 800, center=ctr, radius=16, fov=26) for az in (0, -30)]
    Image.fromarray(sheet(ims, 4)).save(out, quality=90)
print(out)
