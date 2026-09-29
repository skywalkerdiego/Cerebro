"""Genera los STL finales, las vistas previas y la guía de pintura.

Uso: python3 export.py [diego fanny tris base] [--h 0.1]
Salidas: stl/<nombre>.stl, previews/<nombre>_*.jpg, previews/familia.jpg
"""
import argparse
import json
import pickle
import time
from pathlib import Path

import numpy as np
from PIL import Image

import personajes as P
import sdf
from render import render, sheet

ROOT = Path(__file__).resolve().parent
TARGET = {"diego": 450_000, "fanny": 420_000, "tris": 380_000, "base": 260_000}
TITLE = {"diego": "Diego", "fanny": "Fanny", "tris": "Tris", "base": "Base para los tres"}


def build(name, h):
    t0 = time.time()
    F = P.build(name, h)
    dense = F.mesh()
    raw_faces = len(dense.faces)
    m, n_parts, dropped = sdf.finish(dense, 0.011 if name == "diego" else 0.008)
    # vistas previas con la malla densa (triángulos parejos, colores nítidos)
    dense = sorted(dense.split(only_watertight=False), key=lambda p: -len(p.faces))[0]
    C = P.colorize(F, dense)
    info = {"caras_marching": raw_faces, "caras": len(m.faces), "cerrada": bool(m.is_watertight),
            "piezas": n_parts, "huecos_y_astillas_quitados": dropped, "volumen_cm3": round(float(m.volume) / 1000, 2),
            "medidas_mm": [round(float(x), 1) for x in (m.bounds[1] - m.bounds[0])], "seg": round(time.time() - t0, 1)}
    return m, (dense, C), info


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("figs", nargs="*", default=["diego", "fanny", "tris", "base"])
    ap.add_argument("--h", type=float, default=0.1)
    a = ap.parse_args()
    (ROOT / "stl").mkdir(exist_ok=True)
    (ROOT / "previews").mkdir(exist_ok=True)
    report = {}
    for name in a.figs:
        h = a.h * 1.5 if name == "base" else a.h
        m, (dense, C), info = build(name, h)
        m.export(ROOT / "stl" / f"{name}.stl")
        info["stl_mb"] = round((ROOT / "stl" / f"{name}.stl").stat().st_size / 1e6, 1)
        pickle.dump((dense, C), open(f"/tmp/final_{name}.pkl", "wb"))
        ims = [render(dense, C, az, 12, 900) for az in (0, 40, 180)] + [render(dense, None, az, 12, 900) for az in (0, -40, 180)]
        Image.fromarray(sheet(ims, 3)).save(ROOT / "previews" / f"{name}.jpg", quality=88)
        report[name] = info
        print(name, info, flush=True)
    rp = ROOT / "previews" / "reporte.json"
    old = json.loads(rp.read_text()) if rp.exists() else {}
    old.update(report)
    rp.write_text(json.dumps(old, indent=1, ensure_ascii=False))


if __name__ == "__main__":
    main()
