"""Verifica un video final: exactamente 1 pista de video (nuestros cuadros) y
1 de audio, formato y duración esperados. Además compara el audio del video
contra la canción analizada: si la correlación es alta, el sonido es el de la
canción; y como el video solo tiene la pista que renderizamos, el video de
origen no puede estar dentro.

Uso: python3 tools/verify_video.py out/aniversario_9x16.mp4 [assets/audio/song.wav]
"""
import re
import subprocess
import sys

import numpy as np


def streams(path):
    r = subprocess.run(["ffmpeg", "-hide_banner", "-i", path], capture_output=True, text=True)
    info = r.stderr
    vids = re.findall(r"Stream #\d+:\d+.*?: Video: (\w+).*?, (\d{3,5})x(\d{3,5}).*?(\d+(?:\.\d+)?) fps", info)
    auds = re.findall(r"Stream #\d+:\d+.*?: Audio: (\w+).*?, (\d+) Hz", info)
    dur = re.search(r"Duration: (\d+):(\d+):([\d.]+)", info)
    d = int(dur[1]) * 3600 + int(dur[2]) * 60 + float(dur[3]) if dur else None
    return vids, auds, d


def pcm(path, sr=8000):
    raw = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", path, "-vn", "-ac", "1", "-ar", str(sr),
                          "-f", "s16le", "-"], capture_output=True).stdout
    return np.frombuffer(raw, np.int16).astype(np.float32)


def main():
    video = sys.argv[1]
    vids, auds, d = streams(video)
    print(f"{video}: duración {d:.2f}s")
    for v in vids:
        print(f"  video  {v[0]} {v[1]}x{v[2]} @ {v[3]} fps")
    for a in auds:
        print(f"  audio  {a[0]} {a[1]} Hz")
    ok = len(vids) == 1 and len(auds) == 1
    if len(sys.argv) > 2:
        a, b = pcm(video), pcm(sys.argv[2])
        n = min(len(a), len(b))
        env = lambda x: np.abs(x[:n]).reshape(-1, 80).mean(1)  # envolvente a 100 Hz
        ea, eb = env(a[: n - n % 80]), env(b[: n - n % 80])
        c = float(np.corrcoef(ea, eb)[0, 1])
        print(f"  correlación de envolvente con {sys.argv[2]}: {c:.3f}")
        ok = ok and c > 0.9
    print("  OK: 1 video + 1 audio (el de la canción)" if ok else "  REVISAR")
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
