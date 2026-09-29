"""Separa las 4 láminas originales en las 14 escenas individuales.

Las coordenadas salen de detectar las líneas blancas separadoras de cada
collage (ver `detect_separators`). Se recorta 2 px hacia adentro de cada
separador para que no se cuele el blanco del collage, y 1 px del borde
derecho (las láminas traen una columna clara de compresión).

Uso: python3 tools/split_panels.py
Salida: assets/scenes/raw/<id>.png
"""
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "source"
OUT = ROOT / "assets" / "scenes" / "raw"

# id -> (lámina, (x0, y0, x1, y1)) en coordenadas de la lámina, x1/y1 exclusivos
PANELS = {
    "prepa":     ("lamina-2-prepa-a-tacos", (0, 0, 703, 300)),
    "amoshit":   ("lamina-2-prepa-a-tacos", (0, 309, 703, 610)),
    "coche":     ("lamina-2-prepa-a-tacos", (0, 617, 703, 917)),
    "vinilos":   ("lamina-2-prepa-a-tacos", (0, 924, 703, 1224)),
    "tacos":     ("lamina-2-prepa-a-tacos", (0, 1231, 703, 1527)),
    "safari":    ("lamina-3-bioparque", (0, 0, 703, 476)),
    "aviario":   ("lamina-3-bioparque", (0, 485, 703, 999)),
    "puente":    ("lamina-3-bioparque", (0, 1008, 703, 1527)),
    "cocina":    ("lamina-4-casa", (0, 0, 703, 357)),
    "snoopy":    ("lamina-4-casa", (0, 365, 348, 756)),
    "cafe":      ("lamina-4-casa", (356, 365, 703, 756)),
    "karaoke":   ("lamina-4-casa", (0, 764, 703, 1224)),
    "pelicula":  ("lamina-4-casa", (0, 1232, 703, 1527)),
    "retrato":   ("lamina-1-retrato-final", (0, 0, 704, 1530)),
}


def detect_separators(path, thresh=225, frac=0.9):
    """Devuelve los rangos de filas casi-blancas (separadores del collage)."""
    im = np.asarray(Image.open(path).convert("RGB")).astype(float)
    rows = (im.min(axis=2) > thresh).mean(axis=1)
    runs, start = [], None
    for y, v in enumerate(rows):
        if v > frac and start is None:
            start = y
        elif v <= frac and start is not None:
            runs.append((start, y - 1))
            start = None
    return runs


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for pid, (sheet, box) in PANELS.items():
        im = Image.open(SRC / f"{sheet}.jpg").convert("RGB")
        crop = im.crop(box)
        crop.save(OUT / f"{pid}.png")
        print(f"{pid:10s} {crop.size}")


if __name__ == "__main__":
    main()
