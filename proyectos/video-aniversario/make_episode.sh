#!/usr/bin/env bash
# Episodio «Dos años» (Fanny & Diego — la serie, T2·E24), de punta a punta con UN comando.
#
#   ./make_episode.sh ruta/a/la/cancion.mp4    <- con la canción real (mp4, m4a, mp3…)
#   ./make_episode.sh                           <- con la pista temporal original
#
# 1) analiza la canción (solo el AUDIO: ffmpeg -vn; el video de origen nunca se usa)
# 2) arma la línea de tiempo: parte A con el diálogo, parte B sobre la canción,
#    el puente "2 años juntos" en el clímax (episodio/episode.json + episode.js)
# 3) audio: voces de balbuceo, efectos, música original y la canción
#    (episodio/audio/episodio_mezcla.wav)
# 4) render 16:9 y 9:16 -> out/episodio_16x9.mp4, out/episodio_9x16.mp4
#    (+ versiones para compartir de < 30 MB: out/episodio_*_compartir.mp4)
#
# Para cambiar un diálogo: edita episodio/guion.json y vuelve a correr esto.
set -euo pipefail
cd "$(dirname "$0")"

SONG="${1:-assets/audio/scratch_score.wav}"
python3 tools/analyze_audio.py "$SONG"
python3 tools/build_episode.py
if [[ "$SONG" == *.wav ]]; then AUDIO_IN="$SONG"; else AUDIO_IN="assets/audio/song.wav"; fi
python3 tools/episode_audio.py "$AUDIO_IN"

MIX=episodio/audio/episodio_mezcla.wav
export NODE_PATH="${NODE_PATH:-$(npm root -g)}"
node tools/render.cjs --page episodio/index.html --format 16x9 --q final --fps 30 --audio "$MIX" --out out/episodio_16x9.mp4
node tools/render.cjs --page episodio/index.html --format 9x16 --q final --fps 30 --audio "$MIX" --out out/episodio_9x16.mp4

# versiones para compartir (< 30 MB, misma resolución, x264 a dos pasadas)
for f in episodio_16x9 episodio_9x16; do
  ffmpeg -hide_banner -loglevel error -y -i out/$f.mp4 -c:v libx264 -preset slow -b:v 1500k -pass 1 -passlogfile out/.pass_$f -an -f mp4 /dev/null
  ffmpeg -hide_banner -loglevel error -y -i out/$f.mp4 -c:v libx264 -preset slow -b:v 1500k -pass 2 -passlogfile out/.pass_$f \
    -pix_fmt yuv420p -c:a aac -b:a 160k -movflags +faststart out/${f}_compartir.mp4
  rm -f out/.pass_$f*
done

# verificación: 1 pista de video (nuestros cuadros) + 1 de audio (la mezcla), nada más
for f in out/episodio_16x9.mp4 out/episodio_9x16.mp4; do
  python3 tools/verify_video.py "$f" "$MIX"
done
