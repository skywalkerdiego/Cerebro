"""Analiza la canción: tempo, beats, compases, energía, secciones y clímax.

Acepta audio o VIDEO. Si le pasas el mp4 de la canción, primero extrae SOLO
la pista de audio con ffmpeg (-vn): el video de origen nunca se usa.

Salida (assets/audio/analysis.json):
  duration, bpm, beats[], downbeats[], bars[{t, energy}],
  sections[{start, end, energy, level}], climax, env30[] (energía a 30 fps)

Uso:
  python3 tools/analyze_audio.py ruta/a/cancion.mp4
  python3 tools/analyze_audio.py assets/audio/scratch_score.wav
"""
import json
import subprocess
import sys
from pathlib import Path

import librosa
import numpy as np
from scipy.ndimage import gaussian_filter1d, uniform_filter1d
from scipy.signal import find_peaks

ROOT = Path(__file__).resolve().parent.parent
AUDIO = ROOT / "assets" / "audio"
SR = 22050
HOP = 512


def extract_audio(src: Path) -> Path:
    """mp4/mov/lo-que-sea -> assets/audio/song.wav (solo audio, -vn)."""
    if src.suffix.lower() == ".wav":
        return src
    out = AUDIO / "song.wav"
    AUDIO.mkdir(parents=True, exist_ok=True)
    subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", str(src),
                    "-vn", "-ac", "2", "-ar", "44100", "-c:a", "pcm_s16le", str(out)], check=True)
    return out


ONSET_LATENCY = 0.03  # s; sesgo del detector de onsets medido con la pista de prueba (33-42 ms)


def refine_grid(onset_env, sr, beats_t, beats_f, bpm, duration):
    """Si la canción va a tempo fijo (grabada a click), una rejilla constante
    ajustada fino (±4 %, pasos de 0.02 BPM, todas las fases) es más precisa
    que el seguimiento dinámico. Se compara contra los beats del seguimiento
    dinámico sobre la misma envolvente suavizada y se queda con la rejilla si
    alinea al menos 90 % igual de bien (canciones con tempo que se mueve se
    quedan con el seguimiento dinámico)."""
    env = gaussian_filter1d(onset_env / (onset_env.max() + 1e-9), 1.0)
    env_t = librosa.frames_to_time(np.arange(env.size), sr=sr, hop_length=HOP)

    def score(ts):
        return float(np.interp(ts, env_t, env).mean())

    dp_score = score(beats_t)
    best = (-1, None, bpm)
    for cand in np.arange(bpm * 0.96, bpm * 1.04, 0.02):
        period = 60 / cand
        for ph in np.linspace(0, period, 64, endpoint=False):
            ts = np.arange(ph, duration - 0.05, period)
            sc = score(ts)
            if sc > best[0]:
                best = (sc, ts, cand)
    if best[0] >= 0.90 * dp_score:
        ts, bpm, mode = best[1], best[2], "rejilla fija"
    else:
        ts, mode = beats_t, "seguimiento dinámico"
    # tempos dobles/mitades: se prefiere el rango 70-160 BPM
    ts = np.clip(ts - ONSET_LATENCY, 0, None)
    frames = librosa.time_to_frames(ts, sr=sr, hop_length=HOP)
    return ts, frames, float(bpm), mode


def downbeat_phase(y, beats_f, sr):
    """Fase (0-3) del tiempo 1: donde hay más golpe grave + cambio armónico."""
    lo = librosa.onset.onset_strength(y=y, sr=sr, hop_length=HOP, fmax=200, n_mels=32)
    chroma = librosa.feature.chroma_cqt(y=y, sr=sr, hop_length=HOP)
    # pad=False: la columna j es el intervalo que EMPIEZA en el beat j
    csync = librosa.util.sync(chroma, beats_f, aggregate=np.median, pad=False)
    change = np.r_[0, np.linalg.norm(np.diff(csync, axis=1), axis=0), 0]
    accent = lo[np.clip(beats_f, 0, lo.size - 1)]
    accent = accent / (accent.max() + 1e-9) + 0.7 * change[: accent.size] / (change.max() + 1e-9)
    scores = [accent[p::4].mean() for p in range(4)]
    return int(np.argmax(scores))


def novelty_boundaries(y, sr, beats_f, beats_t, bar_idx):
    """Fronteras de sección: novedad (kernel de tablero) sobre features por beat."""
    chroma = librosa.feature.chroma_cqt(y=y, sr=sr, hop_length=HOP)
    mfcc = librosa.feature.mfcc(y=y, sr=sr, hop_length=HOP, n_mfcc=13)
    rms = librosa.feature.rms(y=y, hop_length=HOP)
    feats = []
    for f in (chroma, mfcc[1:], rms):
        s = librosa.util.sync(f, beats_f, aggregate=np.mean, pad=False)
        s = np.hstack([s, s[:, -1:]])  # una columna por beat
        s = (s - s.mean(axis=1, keepdims=True)) / (s.std(axis=1, keepdims=True) + 1e-9)
        feats.append(s)
    X = np.vstack(feats)
    X = X / (np.linalg.norm(X, axis=0, keepdims=True) + 1e-9)
    S = X.T @ X
    k = 8  # medio kernel = 8 beats (2 compases)
    g = np.outer(np.r_[-np.ones(k), np.ones(k)], np.r_[-np.ones(k), np.ones(k)])  # +1 en bloques diagonales
    win = np.hanning(2 * k + 2)[1:-1]
    g *= np.outer(win, win)
    n = S.shape[0]
    Sp = np.pad(S, k, mode="edge")
    nov = np.array([(Sp[i:i + 2 * k, i:i + 2 * k] * g).sum() for i in range(n)])
    nov = np.maximum(nov, 0)
    nov /= nov.max() + 1e-9
    return nov


def analyze(path: Path):
    wav = extract_audio(path)
    y, sr = librosa.load(str(wav), sr=SR, mono=True)
    duration = len(y) / sr

    onset_env = librosa.onset.onset_strength(y=y, sr=sr, hop_length=HOP, aggregate=np.median)
    tempo, beats_f = librosa.beat.beat_track(onset_envelope=onset_env, sr=sr, hop_length=HOP,
                                             tightness=120, trim=False)
    bpm = float(np.atleast_1d(tempo)[0])
    beats_t = librosa.frames_to_time(beats_f, sr=sr, hop_length=HOP)
    beats_t, beats_f, bpm, beat_mode = refine_grid(onset_env, sr, beats_t, beats_f, bpm, duration)

    phase = downbeat_phase(y, beats_f, sr)
    downbeats = beats_t[phase::4]

    # energía: RMS en dB por compás, normalizada 0-1 (percentiles 5-95)
    rms = librosa.feature.rms(y=y, hop_length=HOP)[0]
    rms_t = librosa.frames_to_time(np.arange(rms.size), sr=sr, hop_length=HOP)
    db = 20 * np.log10(rms + 1e-6)
    lo, hi = np.percentile(db[db > db.max() - 60], [5, 95])
    en = np.clip((db - lo) / (hi - lo + 1e-9), 0, 1)
    bar_edges = np.r_[downbeats, duration]
    if downbeats[0] > 0.25:
        bar_edges = np.r_[0.0, bar_edges]
    bars = []
    for a, b in zip(bar_edges[:-1], bar_edges[1:]):
        m = (rms_t >= a) & (rms_t < b)
        bars.append({"t": round(float(a), 3), "energy": round(float(en[m].mean() if m.any() else 0), 3)})

    # secciones: novedad espectral + saltos de energía, alineadas a compás
    nov = novelty_boundaries(y, sr, beats_f, beats_t, None)
    bar_e = np.array([b["energy"] for b in bars])
    bar_t = np.array([b["t"] for b in bars])
    # novedad por compás = máx de la novedad de sus beats
    nov_bar = np.zeros(len(bars))
    for i, t in enumerate(bar_t):
        idx = np.nonzero(np.abs(beats_t - t) < 60 / bpm * 0.6)[0]
        nov_bar[i] = nov[idx].max() if idx.size else 0
    # salto de energía: media de los 2 compases siguientes vs los 2 anteriores
    jump = np.array([abs(bar_e[i:i + 2].mean() - bar_e[max(i - 2, 0):i].mean()) if i else 0
                     for i in range(len(bar_e))])
    jump = np.maximum(jump - 0.5 * np.maximum(np.r_[jump[1:], 0], np.r_[0, jump[:-1]]), 0)  # afilar picos
    jump /= jump.max() + 1e-9
    score = 0.5 * nov_bar + 0.5 * jump
    if "--debug" in sys.argv:
        for i in range(len(bars)):
            print(f"    compás {i:2d} t={bar_t[i]:6.2f} e={bar_e[i]:.2f} nov={nov_bar[i]:.2f} salto={jump[i]:.2f} → {score[i]:.2f}")
    peaks, _ = find_peaks(score, height=0.3, distance=2)
    starts = sorted(set([0] + [int(p) for p in peaks if p > 0]))

    def mean_e(a, b):
        return float(bar_e[a:b].mean()) if b > a else 0.0

    # fusionar secciones vecinas con energía parecida y frontera débil
    merged = True
    while merged and len(starts) > 1:
        merged = False
        for i in range(1, len(starts)):
            a0 = starts[i - 1]
            a1 = starts[i]
            a2 = starts[i + 1] if i + 1 < len(starts) else len(bars)
            if abs(mean_e(a0, a1) - mean_e(a1, a2)) < 0.15 and score[a1] < 0.6:
                starts.pop(i)
                merged = True
                break

    # clímax: la racha más larga/intensa de compases >= 85 % de la energía
    # máxima, en el último 65 % de la canción; el clímax es su primer compás
    lo_bar = int(np.searchsorted(bar_t, duration * 0.35))
    hi_bar = int(np.searchsorted(bar_t, duration - 6))
    peak_e = bar_e[lo_bar:hi_bar].max()
    best, best_sum, i = lo_bar, -1.0, lo_bar
    while i < hi_bar:
        if bar_e[i] >= 0.85 * peak_e:
            j = i
            while j < hi_bar and bar_e[j] >= 0.85 * peak_e * 0.92:
                j += 1
            if bar_e[i:j].sum() > best_sum:
                best, best_sum = i, float(bar_e[i:j].sum())
            i = j
        else:
            i += 1
    climax_bar = best
    # el clímax también es frontera de sección (mueve una frontera vecina o crea una)
    near = [s0 for s0 in starts if abs(s0 - climax_bar) <= 1 and s0 != 0]
    for s0 in near:
        starts.remove(s0)
    starts = sorted(set(starts + [climax_bar]))
    climax = float(bar_t[climax_bar])

    sections = []
    for i, s0 in enumerate(starts):
        e = starts[i + 1] if i + 1 < len(starts) else len(bars)
        t0 = bar_t[s0]
        t1 = bar_t[e] if e < len(bars) else duration
        sections.append({"start": round(float(t0), 3), "end": round(float(t1), 3),
                         "bars": int(e - s0), "energy": round(mean_e(s0, e), 3)})
    ens = np.array([x["energy"] for x in sections])
    q1, q2 = np.percentile(ens, [33, 66]) if len(ens) > 2 else (0.33, 0.66)
    for x in sections:
        x["level"] = "alta" if x["energy"] >= q2 else ("media" if x["energy"] >= q1 else "baja")

    # energía a 30 fps para micro-movimiento reactivo
    t30 = np.arange(0, duration, 1 / 30)
    env30 = np.interp(t30, rms_t, uniform_filter1d(en, 9))

    return {
        "source": str(path.name),
        "duration": round(duration, 3),
        "bpm": round(bpm, 2),
        "beat_mode": beat_mode,
        "beats": [round(float(t), 3) for t in beats_t],
        "downbeats": [round(float(t), 3) for t in downbeats],
        "bars": bars,
        "sections": sections,
        "climax": round(float(climax), 3),
        "env30": [round(float(v), 3) for v in env30],
    }


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        return 1
    res = analyze(Path(sys.argv[1]))
    AUDIO.mkdir(parents=True, exist_ok=True)
    out = AUDIO / "analysis.json"
    out.write_text(json.dumps(res, indent=1))
    print(f"fuente {res['source']}  duración {res['duration']}s  tempo {res['bpm']} BPM ({res['beat_mode']})  "
          f"beats {len(res['beats'])}  compases {len(res['bars'])}")
    for s in res["sections"]:
        print(f"  sección {s['start']:6.2f}–{s['end']:6.2f}s  {s['bars']:2d} compases  "
              f"energía {s['energy']:.2f} ({s['level']})")
    print(f"  clímax en {res['climax']}s")
    return 0


if __name__ == "__main__":
    sys.exit(main())
