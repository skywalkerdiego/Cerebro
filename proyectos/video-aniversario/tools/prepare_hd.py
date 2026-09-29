"""Versión HD (3x) de cada escena que usa el motor.

hd = 60 % Real-ESRGAN (nitidez, sin bloques JPEG) + 40 % Lanczos del original
(conserva la fibra del fieltro, que ESRGAN tiende a "planchar"). Se guarda
como JPEG q92 para que el repo no pese de más.

Uso: python3 tools/prepare_hd.py [ids...]
Entrada: assets/scenes/raw/<id>.png + assets/scenes/x4/<id>.png
Salida:  assets/scenes/hd/<id>.jpg
"""
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
RAW, X4, HD = (ROOT / "assets" / "scenes" / d for d in ("raw", "x4", "hd"))
SCALE, ESRGAN_MIX = 3, 0.6


def main(ids):
    HD.mkdir(parents=True, exist_ok=True)
    ids = ids or sorted(p.stem for p in X4.glob("*.png"))
    for pid in ids:
        raw = Image.open(RAW / f"{pid}.png").convert("RGB")
        size = (raw.width * SCALE, raw.height * SCALE)
        lan = raw.resize(size, Image.LANCZOS)
        es = Image.open(X4 / f"{pid}.png").convert("RGB").resize(size, Image.LANCZOS)
        Image.blend(lan, es, ESRGAN_MIX).save(HD / f"{pid}.jpg", quality=92, subsampling=0)
        print("hd", pid, size)


if __name__ == "__main__":
    main(sys.argv[1:])
