"""Mapas de profundidad (Depth Anything V2 small, ONNX, CPU) para el parallax.

Solo sirven para separar planos (fondo / medio / frente) de las escenas con
más profundidad; no alteran el arte.

Modelo: depth_anything_v2_vits.onnx de
github.com/fabio-sim/Depth-Anything-ONNX (release v2.0.0).

Uso: python3 tools/depth.py [--model /opt/models/depth_anything_v2_vits.onnx] [ids...]
Salida: assets/scenes/depth/<id>.png  (16 bits, cerca = claro)
"""
import argparse
from pathlib import Path

import cv2
import numpy as np
import onnxruntime as ort

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / "assets" / "scenes" / "raw"
OUT = ROOT / "assets" / "scenes" / "depth"
N = 518
MEAN = np.array([0.485, 0.456, 0.406], np.float32)
STD = np.array([0.229, 0.224, 0.225], np.float32)


def infer(sess, img_bgr):
    h, w = img_bgr.shape[:2]
    rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB).astype(np.float32) / 255
    x = cv2.resize(rgb, (N, N), interpolation=cv2.INTER_CUBIC)
    x = ((x - MEAN) / STD).transpose(2, 0, 1)[None]
    d = sess.run(None, {sess.get_inputs()[0].name: x})[0][0]
    d = cv2.resize(d, (w, h), interpolation=cv2.INTER_CUBIC)
    d = (d - d.min()) / (d.max() - d.min() + 1e-9)
    return d


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--model", default="/opt/models/depth_anything_v2_vits.onnx")
    ap.add_argument("ids", nargs="*")
    a = ap.parse_args()
    OUT.mkdir(parents=True, exist_ok=True)
    sess = ort.InferenceSession(a.model, providers=["CPUExecutionProvider"])
    ids = a.ids or sorted(p.stem for p in RAW.glob("*.png"))
    for pid in ids:
        d = infer(sess, cv2.imread(str(RAW / f"{pid}.png")))
        cv2.imwrite(str(OUT / f"{pid}.png"), (d * 65535).astype(np.uint16))
        print("profundidad", pid)


if __name__ == "__main__":
    main()
