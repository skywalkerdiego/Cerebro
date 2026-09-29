"""Hoja de referencia con cuadrícula para anotar los rigs (coordenadas en px de raw/).

Uso: python3 tools/grid_view.py <id> [x0 y0 x1 y1] [--scale 3] [--step 10] [-o salida.png]
"""
import argparse
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("id")
    ap.add_argument("box", nargs="*", type=int)
    ap.add_argument("--scale", type=float, default=2)
    ap.add_argument("--step", type=int, default=25)
    ap.add_argument("-o", default=None)
    a = ap.parse_args()
    im = Image.open(ROOT / "assets" / "scenes" / "raw" / f"{a.id}.png").convert("RGB")
    x0, y0, x1, y1 = a.box if len(a.box) == 4 else (0, 0, im.width, im.height)
    crop = im.crop((x0, y0, x1, y1))
    s = a.scale
    crop = crop.resize((int(crop.width * s), int(crop.height * s)), Image.LANCZOS)
    d = ImageDraw.Draw(crop)
    step = a.step
    for x in range((x0 // step + 1) * step, x1, step):
        X = (x - x0) * s
        strong = x % (step * 4) == 0
        d.line([(X, 0), (X, crop.height)], fill=(255, 255, 0) if strong else (0, 255, 255), width=1)
        d.text((X + 2, 2), str(x), fill=(255, 255, 0))
    for y in range((y0 // step + 1) * step, y1, step):
        Y = (y - y0) * s
        strong = y % (step * 4) == 0
        d.line([(0, Y), (crop.width, Y)], fill=(255, 255, 0) if strong else (0, 255, 255), width=1)
        d.text((2, Y + 2), str(y), fill=(255, 255, 0))
    out = a.o or f"/tmp/grid_{a.id}.png"
    crop.save(out)
    print(out, crop.size)


if __name__ == "__main__":
    main()
