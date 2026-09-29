"""Escala x4 las escenas con Real-ESRGAN (x4plus) corriendo en CPU vía ncnn.

Las láminas llegaron a ~700 px de ancho; el video sale a 1080/1920 px y la
cámara hace push-ins, así que se necesita resolución extra. Real-ESRGAN
x4plus además limpia los artefactos JPEG del collage y reconstruye la fibra
del fieltro de forma creíble. NO cambia el dibujo: es el mismo arte con más
píxeles.

Modelo: realesrgan-x4plus.param/.bin del zip oficial
realesrgan-ncnn-vulkan-20220424-ubuntu (github.com/xinntao/Real-ESRGAN).

Uso: python3 tools/upscale.py [--models /opt/models/esrgan/models] [ids...]
Salida: assets/scenes/x4/<id>.png  (y se reduce a x2 para el motor: assets/scenes/hd/)
"""
import argparse
import sys
import time
from pathlib import Path

import ncnn
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / "assets" / "scenes" / "raw"
X4 = ROOT / "assets" / "scenes" / "x4"

TILE, PAD, SCALE = 160, 12, 4


def load_net(models_dir, threads):
    net = ncnn.Net()
    net.opt.use_vulkan_compute = False
    net.opt.num_threads = threads
    net.load_param(str(Path(models_dir) / "realesrgan-x4plus.param"))
    net.load_model(str(Path(models_dir) / "realesrgan-x4plus.bin"))
    return net


def run_tile(net, tile):
    """tile: HxWx3 float32 en [0,1] -> (4H)x(4W)x3."""
    h, w, _ = tile.shape
    chw = np.ascontiguousarray(tile.transpose(2, 0, 1))
    ex = net.create_extractor()
    ex.input("data", ncnn.Mat(chw))
    _, out = ex.extract("output")
    return np.array(out).transpose(1, 2, 0)[: h * SCALE, : w * SCALE]


def upscale(net, img):
    arr = np.asarray(img.convert("RGB")).astype(np.float32) / 255.0
    h, w, _ = arr.shape
    out = np.zeros((h * SCALE, w * SCALE, 3), np.float32)
    for y in range(0, h, TILE):
        for x in range(0, w, TILE):
            y0, x0 = max(y - PAD, 0), max(x - PAD, 0)
            y1, x1 = min(y + TILE + PAD, h), min(x + TILE + PAD, w)
            res = run_tile(net, arr[y0:y1, x0:x1])
            ty, tx = (y - y0) * SCALE, (x - x0) * SCALE
            th = (min(y + TILE, h) - y) * SCALE
            tw = (min(x + TILE, w) - x) * SCALE
            out[y * SCALE:y * SCALE + th, x * SCALE:x * SCALE + tw] = res[ty:ty + th, tx:tx + tw]
    return Image.fromarray((np.clip(out, 0, 1) * 255 + 0.5).astype(np.uint8))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--models", default="/opt/models/esrgan/models")
    ap.add_argument("--threads", type=int, default=4)
    ap.add_argument("ids", nargs="*")
    a = ap.parse_args()
    X4.mkdir(parents=True, exist_ok=True)
    net = load_net(a.models, a.threads)
    ids = a.ids or sorted(p.stem for p in RAW.glob("*.png"))
    for pid in ids:
        t = time.time()
        im = Image.open(RAW / f"{pid}.png")
        up = upscale(net, im)
        up.save(X4 / f"{pid}.png", optimize=False, compress_level=3)
        print(f"{pid:10s} {im.size} -> {up.size}  {time.time() - t:.0f}s", flush=True)


if __name__ == "__main__":
    sys.exit(main())
