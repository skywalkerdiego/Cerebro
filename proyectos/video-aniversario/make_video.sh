#!/usr/bin/env bash
# Video de aniversario, de punta a punta, con UN comando.
#
#   ./make_video.sh ruta/a/la/cancion.mp4     <- con la canción real (mp4, m4a, mp3…)
#   ./make_video.sh                            <- con la pista temporal original
#
# 1) analiza la canción (solo el AUDIO: ffmpeg -vn, el video de origen nunca se usa)
# 2) decide duraciones y cortes (engine/timeline.js + beat_sheet.md)
# 3) animatic rápido (baja calidad) -> out/animatic_9x16.mp4
# 4) render final 9:16 y 16:9      -> out/aniversario_9x16.mp4, out/aniversario_16x9.mp4
#    (+ versiones para compartir de < 30 MB: out/*_compartir.mp4)
#
# Requisitos: python3 (numpy, scipy, librosa, opencv-python-headless, pillow,
# soundfile), node + playwright (Chromium) y ffmpeg. Los assets de escena ya
# vienen en el repo; para regenerarlos desde las láminas: tools/prepare_assets.sh
set -euo pipefail
cd "$(dirname "$0")"

SONG="${1:-assets/audio/scratch_score.wav}"
python3 tools/analyze_audio.py "$SONG"
python3 tools/build_timeline.py

if [[ "$SONG" == *.wav ]]; then AUDIO="$SONG"; else AUDIO="assets/audio/song.wav"; fi
export NODE_PATH="${NODE_PATH:-$(npm root -g)}"

node tools/render.cjs --format 9x16 --q draft --fps 15 --audio "$AUDIO" --out out/animatic_9x16.mp4
node tools/render.cjs --format 9x16 --q final --fps 30 --audio "$AUDIO" --out out/aniversario_9x16.mp4
node tools/render.cjs --format 16x9 --q final --fps 30 --audio "$AUDIO" --out out/aniversario_16x9.mp4

# versiones para compartir (< 30 MB, misma resolución, x264 a dos pasadas)
for f in aniversario_9x16 aniversario_16x9; do
  ffmpeg -hide_banner -loglevel error -y -i out/$f.mp4 -c:v libx264 -preset slow -b:v 2900k -pass 1 -passlogfile out/.pass_$f -an -f mp4 /dev/null
  ffmpeg -hide_banner -loglevel error -y -i out/$f.mp4 -c:v libx264 -preset slow -b:v 2900k -pass 2 -passlogfile out/.pass_$f \
    -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart out/${f}_compartir.mp4
  rm -f out/.pass_$f*
done

# verificación: 1 pista de video (nuestros cuadros) + 1 de audio, nada más
for f in out/aniversario_9x16.mp4 out/aniversario_16x9.mp4; do
  python3 tools/verify_video.py "$f" "$AUDIO"
done
