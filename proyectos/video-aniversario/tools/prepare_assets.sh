#!/usr/bin/env bash
# Regenera TODOS los assets de escena a partir de las 4 láminas originales
# (assets/source/). Solo hace falta si cambian las láminas: el resultado ya
# está en el repo (raw/, hd/, depth/, layers/).
#
# Modelos (descargar una vez):
#   Real-ESRGAN ncnn : https://github.com/xinntao/Real-ESRGAN/releases/download/v0.2.5.0/realesrgan-ncnn-vulkan-20220424-ubuntu.zip
#                      -> descomprimir en /opt/models/esrgan  (usa models/realesrgan-x4plus.*)
#   Depth Anything V2: https://github.com/fabio-sim/Depth-Anything-ONNX/releases/download/v2.0.0/depth_anything_v2_vits.onnx
#                      -> /opt/models/depth_anything_v2_vits.onnx
# pip: numpy pillow opencv-python-headless ncnn onnxruntime
set -euo pipefail
cd "$(dirname "$0")/.."
python3 tools/split_panels.py      # 4 láminas -> 14 escenas (raw/)
python3 tools/clean_numbers.py     # borra los números de galería de las esquinas
python3 tools/upscale.py           # Real-ESRGAN x4 en CPU (x4/, ~25 min, no se versiona)
python3 tools/prepare_hd.py        # mezcla 60 % ESRGAN + 40 % Lanczos a 3x (hd/)
python3 tools/depth.py             # mapas de profundidad (depth/)
python3 tools/layers.py            # planos de parallax (layers/)
