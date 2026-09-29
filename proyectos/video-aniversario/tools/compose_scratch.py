"""Pista temporal ORIGINAL ("scratch score") para cuando no está la canción real.

La canción que Diego mandó (mp4 vertical, ~65 s) no llegó a la sesión. Para no
entregar un video mudo ni con tiempos inventados, esta pieza original de
~67 s tiene la forma de una canción pop (intro / verso / coro / break /
build / clímax / outro) y se analiza con el MISMO analizador que la canción
real (tools/analyze_audio.py): el video nunca lee esta partitura, solo lo que
el análisis detecta en el audio.

Instrumentación "de fieltro": glockenspiel tipo cajita musical (guiño al
xilófono de la escena de la prepa, donde se conocieron en clase de música),
piano suave con martillo de fieltro, pad cálido, bajo redondo y percusión
apagada. 120 BPM, Re mayor.

Uso: python3 tools/compose_scratch.py [salida.wav]
"""
import sys
from pathlib import Path

import numpy as np
from scipy.signal import fftconvolve, butter, sosfilt

SR = 44100
BPM = 120
BEAT = 60 / BPM
BAR = 4 * BEAT
rng = np.random.default_rng(20241020)  # 20/10/2024: el día que empezó todo

# ── forma ────────────────────────────────────────────────────────────────
SECTIONS = [  # (nombre, compases)
    ("intro", 4), ("verso", 8), ("coro", 8), ("break", 2),
    ("build", 4), ("climax", 4), ("outro", 3),
]
CHORDS = (
    ["D", "A/C#", "Bm", "G"]
    + ["D", "A", "Bm", "G", "D", "A", "G", "A"]
    + ["G", "A", "F#m", "Bm", "G", "A", "D", "D"]
    + ["Bm", "G"]
    + ["Em", "F#m", "G", "A"]
    + ["D", "A/C#", "Bm", "G"]
    + ["G", "A", "D"]
)
PAD_VOICING = {
    "D": [57, 62, 66, 69], "A": [57, 61, 64, 69], "A/C#": [57, 61, 64, 69],
    "Bm": [59, 62, 66, 71], "G": [55, 59, 62, 67], "F#m": [57, 61, 66, 69],
    "Em": [55, 59, 64, 67],
}
BASS = {"D": 38, "A": 45, "A/C#": 37, "Bm": 35, "G": 43, "F#m": 42, "Em": 40}

# melodía del glockenspiel: compás -> [(tiempo, duración, midi)]
INTRO_MOTIF = [
    [(0, 1, 81), (1, .5, 78), (1.5, .5, 81), (2, 1.5, 86), (3.5, .5, 85)],
    [(0, 1, 83), (1, 1, 81), (2, 2, 76)],
    [(0, 1, 78), (1, .5, 74), (1.5, .5, 78), (2, 1.5, 83), (3.5, .5, 81)],
    [(0, 1, 79), (1, 1, 78), (2, 1, 76), (3, 1, 73)],
]
VERSE = [
    [(0, .5, 74), (.5, .5, 78), (1, 1, 81), (2.5, .5, 78), (3, 1, 76)],
    [(0, 1.5, 73), (1.5, .5, 76), (2, 2, 81)],
    [(0, .5, 74), (.5, .5, 78), (1, 1, 83), (2.5, .5, 81), (3, 1, 78)],
    [(0, 2, 79), (2, 1, 78), (3, 1, 76)],
    [(0, .5, 74), (.5, .5, 78), (1, 1, 81), (2.5, .5, 86), (3, 1, 85)],
    [(0, 1.5, 83), (1.5, .5, 81), (2, 2, 76)],
    [(0, 1, 79), (1, 1, 83), (2, 1, 81), (3, 1, 79)],
    [(0, 2, 76), (2, .5, 73), (2.5, .5, 76), (3, 1, 81)],
]
CHORUS = [
    [(0, 1.5, 86), (1.5, .5, 83), (2, 1, 86), (3, 1, 88)],
    [(0, 1.5, 88), (1.5, .5, 85), (2, 2, 81)],
    [(0, 1.5, 85), (1.5, .5, 81), (2, 1, 85), (3, 1, 86)],
    [(0, 2, 90), (2, 1, 88), (3, 1, 86)],
    [(0, 1.5, 86), (1.5, .5, 83), (2, 1, 86), (3, 1, 88)],
    [(0, 1.5, 88), (1.5, .5, 90), (2, 1, 88), (3, 1, 85)],
    [(0, 3, 86), (3, .5, 85), (3.5, .5, 83)],
    [(0, 2, 81), (2, 2, 78)],
]
BREAK = [
    [(0, 1, 78), (1, 1, 74), (2, 2, 71)],
    [(0, 1, 79), (1, 1, 78), (2, 2, 76)],
]
BUILD = [
    [(i * .5, .5, n) for i, n in enumerate([76, 79, 83, 79, 76, 79, 83, 86])],
    [(i * .5, .5, n) for i, n in enumerate([78, 81, 85, 81, 78, 81, 85, 88])],
    [(i * .5, .5, n) for i, n in enumerate([79, 83, 86, 83, 79, 83, 86, 90])],
    [(i * .5, .5, n) for i, n in enumerate([81, 85, 88, 85, 81, 85])]
    + [(3 + i * .25, .25, n) for i, n in enumerate([86, 88, 90, 93])],
]
OUTRO = [
    [(0, 1, 79), (1, 1, 78), (2, 2, 76)],
    [(0, 1, 76), (1, 1, 78), (2, 2, 73)],
    [(0, 6, 74), (2, 4, 86)],
]
MELODY = INTRO_MOTIF + VERSE + CHORUS + BREAK + BUILD + INTRO_MOTIF + OUTRO


def mtof(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def section_of_bar(b):
    acc = 0
    for name, n in SECTIONS:
        if b < acc + n:
            return name, b - acc
        acc += n
    return "tail", 0


# ── instrumentos ─────────────────────────────────────────────────────────
def glock(f, dur, vel):
    """Barra libre: parciales inarmónicos 1 / 2.756 / 5.404 / 8.933."""
    length = dur + 2.2
    t = np.arange(int(length * SR)) / SR
    pitch_k = np.clip(880 / f, 0.35, 1.6)
    parts = [(1.0, 1.0, 1.7), (2.756, .32, .45), (5.404, .10, .16), (8.933, .04, .07)]
    y = sum(a * np.sin(2 * np.pi * f * r * t + rng.uniform(0, 6)) * np.exp(-t / (tau * pitch_k))
            for r, a, tau in parts)
    click = rng.normal(0, 1, t.size) * np.exp(-t / .003) * .25
    y = (y + click) * np.minimum(1, t / .002)
    return y * vel


def felt_piano(f, dur, vel):
    """Piano con martillo de fieltro: armónicos suaves que se apagan rápido."""
    length = dur + 1.4
    t = np.arange(int(length * SR)) / SR
    y = np.zeros_like(t)
    for h in range(1, 10):
        fh = f * h * (1 + 0.0004 * h * h)
        if fh > 9000:
            break
        a = (1 / h ** 1.6) * np.exp(-h / 5)
        y += a * np.sin(2 * np.pi * fh * t) * np.exp(-t * (1.1 + .9 * h))
    release = np.clip((length - t) / .25, 0, 1)
    return y * np.minimum(1, t / .004) * release * vel


def _saw_table(nh=24, size=2048):
    ph = np.arange(size) / size
    return sum((np.exp(-h / 5) / h) * np.sin(2 * np.pi * h * ph) for h in range(1, nh + 1))


SAW = _saw_table()


def pad(f, dur, vel, attack=.5, release=.8):
    length = dur + release
    n = int(length * SR)
    t = np.arange(n) / SR
    y = np.zeros(n)
    for cents in (-7, 0, 7):
        ff = f * 2 ** (cents / 1200)
        phase = (ff * t + rng.uniform()) % 1.0
        y += np.interp(phase * SAW.size, np.arange(SAW.size), SAW)
    env = np.minimum(1, t / attack) * np.clip((length - t) / release, 0, 1)
    trem = 1 + .06 * np.sin(2 * np.pi * .23 * t)
    return y * env * trem * vel / 3


def bass(f, dur, vel):
    t = np.arange(int((dur + .3) * SR)) / SR
    y = np.sin(2 * np.pi * f * t) + .25 * np.sin(4 * np.pi * f * t) + .08 * np.sin(6 * np.pi * f * t)
    env = np.minimum(1, t / .01) * np.exp(-t / (dur * .9 + .2)) * np.clip((dur + .3 - t) / .12, 0, 1)
    return y * env * vel


def kick(vel):
    t = np.arange(int(.45 * SR)) / SR
    f = 44 + 90 * np.exp(-t / .035)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-t / .16) * vel


def snare(vel):
    """Clap/tarola apagada: ruido filtrado + cuerpo."""
    t = np.arange(int(.35 * SR)) / SR
    noise = sosfilt(butter(2, [900, 6000], "bandpass", fs=SR, output="sos"), rng.normal(0, 1, t.size))
    body = np.sin(2 * np.pi * 185 * t) * np.exp(-t / .05)
    return (noise * np.exp(-t / .07) * .7 + body * .35) * vel


def shaker(vel):
    t = np.arange(int(.09 * SR)) / SR
    noise = sosfilt(butter(2, 7000, "highpass", fs=SR, output="sos"), rng.normal(0, 1, t.size))
    return noise * np.minimum(1, t / .012) * np.exp(-t / .025) * vel


def swell(length, vel):
    """Barrido de ruido que abre (subida hacia el clímax)."""
    n = int(length * SR)
    t = np.arange(n) / SR
    x = rng.normal(0, 1, n)
    out = np.zeros(n)
    chunks = 24
    for i in range(chunks):
        a, b = i * n // chunks, (i + 1) * n // chunks
        fc = 400 * (12 ** (i / chunks))
        seg = sosfilt(butter(2, min(fc, 16000), "lowpass", fs=SR, output="sos"), x[max(a - 2000, 0):b])
        out[a:b] = seg[-(b - a):]
    return out * (t / length) ** 2 * vel


def soft_crash(vel):
    t = np.arange(int(3.5 * SR)) / SR
    noise = sosfilt(butter(2, [2500, 11000], "bandpass", fs=SR, output="sos"), rng.normal(0, 1, t.size))
    return noise * np.minimum(1, t / .02) * np.exp(-t / 1.1) * vel


# ── mezcla ───────────────────────────────────────────────────────────────
class Bus:
    def __init__(self, n, pan=0.0, verb=0.2):
        self.buf = np.zeros(n)
        self.pan, self.verb = pan, verb

    def add(self, at, sig):
        i = int(round(at * SR))
        j = min(i + sig.size, self.buf.size)
        if j > i:
            self.buf[i:j] += sig[: j - i]


def reverb_ir(seconds=2.4):
    n = int(seconds * SR)
    t = np.arange(n) / SR
    irs = []
    for _ in range(2):
        x = rng.normal(0, 1, n) * np.exp(-t / .55)
        x = sosfilt(butter(1, 5500, "lowpass", fs=SR, output="sos"), x)
        x[: int(.018 * SR)] = 0  # pre-delay
        irs.append(x / np.sqrt((x ** 2).sum()))
    return irs


def compose():
    total_bars = sum(n for _, n in SECTIONS)
    length = total_bars * BAR + 2.6
    n = int(length * SR)
    buses = {
        "glock": Bus(n, .18, .38), "piano": Bus(n, -.22, .28), "pad": Bus(n, 0, .35),
        "bass": Bus(n, 0, .05), "drums": Bus(n, 0, .10), "fx": Bus(n, 0, .30),
    }
    level = {  # intensidad por sección: la dinámica ES la forma de la canción
        "intro": dict(glock=.30, piano=0, pad=.07, bass=0, drums=0),
        "verso": dict(glock=.30, piano=.26, pad=.10, bass=.28, drums=.42),
        "coro": dict(glock=.45, piano=.38, pad=.15, bass=.40, drums=.78),
        "break": dict(glock=.30, piano=0, pad=.08, bass=0, drums=.30),
        "build": dict(glock=.36, piano=.30, pad=.14, bass=.32, drums=.55),
        "climax": dict(glock=.55, piano=.45, pad=.20, bass=.46, drums=1.0),
        "outro": dict(glock=.32, piano=.18, pad=.08, bass=.18, drums=.25),
    }
    for b, chord in enumerate(CHORDS):
        t0 = b * BAR
        sec, k = section_of_bar(b)
        L = level[sec]
        # melodía (en el clímax se dobla a la octava)
        for beat, dur, m in MELODY[b]:
            v = L["glock"] * (1.0 if beat % 1 == 0 else .8)
            buses["glock"].add(t0 + beat * BEAT, glock(mtof(m), dur * BEAT, v))
            if sec == "climax":
                buses["glock"].add(t0 + beat * BEAT, glock(mtof(m + 12), dur * BEAT, v * .35))
                buses["piano"].add(t0 + beat * BEAT, felt_piano(mtof(m - 12), dur * BEAT, .22))
        # pad
        if L["pad"]:
            dur = BAR * (1.5 if sec == "outro" and k == 2 else 1)
            for m in PAD_VOICING[chord]:
                buses["pad"].add(t0, pad(mtof(m), dur, L["pad"]))
        # piano: arpegio en el verso, acordes en coro/clímax
        if L["piano"]:
            notes = PAD_VOICING[chord]
            if sec in ("verso", "build", "outro"):
                patt = [0, 2, 1, 3, 2, 1, 3, 2]
                for i, p in enumerate(patt):
                    buses["piano"].add(t0 + i * BEAT / 2, felt_piano(mtof(notes[p]), BEAT, L["piano"] * .55))
            else:
                for beat in (0, 1.5, 2, 3, 3.5):
                    for j, m in enumerate(notes):
                        buses["piano"].add(t0 + beat * BEAT + j * .012,
                                           felt_piano(mtof(m), BEAT * .9, L["piano"] * .32))
        # bajo
        if L["bass"]:
            f = mtof(BASS[chord])
            hits = [(0, 1.5), (1.5, .5), (2, 1.5), (3.5, .5)] if sec in ("coro", "climax") else [(0, 2), (2, 2)]
            for beat, d in hits:
                buses["bass"].add(t0 + beat * BEAT, bass(f, d * BEAT, L["bass"]))
        # batería
        D = L["drums"]
        if not D:
            continue
        drum = buses["drums"]
        if sec == "break":  # latido
            drum.add(t0, kick(D * .8))
            drum.add(t0 + .28, kick(D * .5))
            drum.add(t0 + 2 * BEAT, kick(D * .8))
            drum.add(t0 + 2 * BEAT + .28, kick(D * .5))
            continue
        if sec == "verso":
            for beat in (0, 2):
                drum.add(t0 + beat * BEAT, kick(D))
            drum.add(t0 + 3 * BEAT, snare(D * .35))
            for i in range(8):
                drum.add(t0 + i * BEAT / 2, shaker(D * (.35 if i % 2 else .2)))
        elif sec in ("coro", "climax"):
            for beat in (0, 1.5, 2):
                drum.add(t0 + beat * BEAT, kick(D))
            for beat in (1, 3):
                drum.add(t0 + beat * BEAT, snare(D * .7))
            for i in range(16):
                drum.add(t0 + i * BEAT / 4, shaker(D * (.32 if i % 4 == 2 else .14)))
        elif sec == "build":
            step = BEAT if k < 2 else BEAT / 2
            for i in range(int(BAR / step)):
                drum.add(t0 + i * step, kick(D * (.7 + .3 * k / 3)))
            if k == 3:
                for i in range(16):
                    drum.add(t0 + i * BEAT / 4, snare(D * (.15 + .6 * i / 15)))
            for i in range(8):
                drum.add(t0 + i * BEAT / 2, shaker(D * .3))
        elif sec == "outro" and k < 2:
            drum.add(t0, kick(D))
    # efectos: subida al clímax y platillo suave en el golpe
    climax_t = sum(n for s, n in SECTIONS[:5]) * BAR
    chorus_t = sum(n for s, n in SECTIONS[:2]) * BAR
    buses["fx"].add(climax_t - 2 * BAR, swell(2 * BAR, .16))
    buses["fx"].add(climax_t, soft_crash(.30))
    buses["fx"].add(chorus_t - BAR, swell(BAR, .07))
    buses["fx"].add(chorus_t, soft_crash(.16))

    # render estéreo + reverb
    ir_l, ir_r = reverb_ir()
    dry = np.zeros((n, 2))
    send = np.zeros(n)
    for bus in buses.values():
        l, r = np.cos((bus.pan + 1) * np.pi / 4), np.sin((bus.pan + 1) * np.pi / 4)
        dry[:, 0] += bus.buf * l * 1.41
        dry[:, 1] += bus.buf * r * 1.41
        send += bus.buf * bus.verb
    wet = np.stack([fftconvolve(send, ir_l)[:n], fftconvolve(send, ir_r)[:n]], 1) * 1.1
    mix = dry + wet
    mix = sosfilt(butter(2, 28, "highpass", fs=SR, output="sos"), mix, axis=0)
    mix /= np.abs(mix).max()
    mix = np.tanh(mix * 1.1) / np.tanh(1.1)  # saturación de cinta suave
    fade = np.clip((n - np.arange(n)) / (1.2 * SR), 0, 1) ** 2
    mix *= fade[:, None]
    return (mix * .89).astype(np.float32)


def main():
    out = Path(sys.argv[1] if len(sys.argv) > 1 else
               Path(__file__).resolve().parent.parent / "assets" / "audio" / "scratch_score.wav")
    out.parent.mkdir(parents=True, exist_ok=True)
    import soundfile as sf
    audio = compose()
    sf.write(str(out), audio, SR, subtype="PCM_16")
    print(f"{out}  {audio.shape[0] / SR:.2f}s")


if __name__ == "__main__":
    main()
