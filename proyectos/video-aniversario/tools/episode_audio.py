"""Audio del episodio: voces de balbuceo, efectos, música original y la canción.

Entrada: episodio/episode.json (tools/build_episode.py) + la canción analizada
Salida:  episodio/audio/episodio_mezcla.wav

- VOCES: balbuceo tierno tipo Animal Crossing, pero cada sílaba lleva la
  vocal real del guion (síntesis por formantes a/e/i/o/u), su consonante de
  ataque (golpe, siseo, nasal) y la entonación de la frase (las preguntas
  suben al final). Diego más grave, Fanny más aguda, el loro raspa, Tris
  ladra. Así "¿Sabes qué día es hoy?" SUENA a esa frase sin decir palabras.
- MÚSICA PARTE A: tema original a 100 BPM sobre la misma rejilla que usa
  el motor (cajita musical en el café, tema de la serie en la entrada,
  banda escolar en la prepa que se corta con el ¡CRASH!, ternura en
  Amoshit, motor y radio en el coche).
- CANCIÓN: entra en el clic del estéreo. Baja unos dB solo cuando alguien
  habla (sidechain suave), nunca se comprime.
- CRÉDITOS: el tema en cajita musical.

Uso: python3 tools/episode_audio.py [cancion.wav]
"""
import json
import sys
from pathlib import Path

import numpy as np
import soundfile as sf
from scipy.ndimage import minimum_filter1d, uniform_filter1d
from scipy.signal import butter, fftconvolve, sosfilt, resample_poly

sys.path.insert(0, str(Path(__file__).resolve().parent))
import compose_scratch as cs  # noqa: E402  (instrumentos de fieltro: glock, piano, pad, bajo, batería)

ROOT = Path(__file__).resolve().parent.parent
SR = cs.SR
rng = np.random.default_rng(2410)
mtof = cs.mtof

FORMANTS = {  # F1, F2, F3 (Hz) y anchos de banda
    "a": ([800, 1250, 2650], [90, 110, 160]),
    "e": ([480, 1900, 2600], [70, 110, 160]),
    "i": ([310, 2300, 3000], [60, 120, 180]),
    "o": ([520, 900, 2500], [80, 100, 160]),
    "u": ([340, 780, 2400], [70, 100, 160]),
    "m": ([260, 1100, 2500], [60, 200, 250]),
}


def bp(x, lo, hi, order=2):
    return sosfilt(butter(order, [lo, min(hi, SR / 2 - 100)], "bandpass", fs=SR, output="sos"), x)


def hp(x, f, order=2):
    return sosfilt(butter(order, f, "highpass", fs=SR, output="sos"), x)


def lp(x, f, order=2):
    return sosfilt(butter(order, f, "lowpass", fs=SR, output="sos"), x)


def lufs(x):
    """Sonoridad integrada aproximada (BS.1770: ponderación K + compuertas)."""
    x = np.atleast_2d(x.T).T if x.ndim == 1 else x
    if x.ndim == 1:
        x = x[:, None]
    k = hp(x.T, 60).T
    k = k + 0.58 * hp(k.T, 1500).T
    blk, hop = int(0.4 * SR), int(0.1 * SR)
    if k.shape[0] < blk:
        return -99.0
    idx = np.arange(0, k.shape[0] - blk, hop)
    p2 = np.cumsum(np.concatenate([[0], (k ** 2).sum(1)]))
    pw = (p2[idx + blk] - p2[idx]) / blk
    L = -0.691 + 10 * np.log10(pw + 1e-12)
    g = pw[L > -70]
    if not g.size:
        return -99.0
    rel = -0.691 + 10 * np.log10(g.mean()) - 10
    g = pw[(L > -70) & (L > rel)]
    return float(-0.691 + 10 * np.log10(g.mean()))


def limiter(x, ceil_db=-1.5, look=0.012):
    """Limitador con anticipación: gana los dB que faltan sin recortar picos."""
    c = 10 ** (ceil_db / 20)
    pk = np.abs(x).max(1)
    r = np.minimum(1.0, c / np.maximum(pk, 1e-9))
    L = int(look * SR)
    g = minimum_filter1d(r, 2 * L + 1)
    g = uniform_filter1d(g, L)
    g = minimum_filter1d(g, 3)
    return x * g[:, None]


def level(x, target):
    lu = lufs(x)
    return x * 10 ** ((target - lu) / 20) if lu > -90 else x


# ── voces ────────────────────────────────────────────────────────────────
def syllable(ev):
    """Una sílaba: ataque consonántico + vocal por formantes con glissando."""
    vo = ev["voice"]
    d = float(ev["d"])
    f0 = float(ev["f0"])
    fk = vo.get("formant", 1.0)
    voiced = max(0.07, d * 0.78)
    n = int((voiced + 0.04) * SR)
    t = np.arange(n) / SR
    shout = ev["kind"] == "shout"
    # contorno de tono dentro de la sílaba: arranca un poco arriba y cae; vibrato leve
    glide = 1.06 - 0.09 * np.clip(t / voiced, 0, 1)
    vib = 1 + 0.012 * np.sin(2 * np.pi * 6.2 * t)
    jit = 1 + vo.get("rasp", 0) * 0.04 * rng.standard_normal(n).cumsum() / np.sqrt(np.arange(1, n + 1))
    f = f0 * glide * vib * jit
    ph = 2 * np.pi * np.cumsum(f) / SR
    F, B = FORMANTS.get(ev["v"], FORMANTS["a"])
    F = [x * fk for x in F]
    y = np.zeros(n)
    tilt = 1.0 if shout else 1.35
    for k in range(1, 40):
        fh = k * f0
        if fh > 7000:
            break
        a = 0.0
        for Fi, Bi, gi in zip(F, B, (1.0, 0.7, 0.35)):
            a += gi / (1 + ((fh - Fi) / (Bi * 1.6)) ** 2)
        a *= k ** -tilt * 3 + 0.02
        y += a * np.sin(k * ph)
    env = np.minimum(1, t / 0.012) * np.clip((voiced + 0.03 - t) / 0.035, 0, 1)
    env *= 0.85 + 0.15 * np.exp(-t / 0.05)  # pequeño acento al inicio
    y *= env
    if vo.get("rasp"):
        y *= 1 + vo["rasp"] * 0.6 * np.sin(2 * np.pi * 78 * t)
        y += vo["rasp"] * 0.08 * bp(rng.standard_normal(n), 1500, 5000) * env
    br = vo.get("breath", 0.05)
    y += br * bp(rng.standard_normal(n), F[1] * 0.8, F[2] * 1.3) * env
    # ataque consonántico
    on = ev.get("on", "none")
    pre = np.zeros(0)
    if on == "plos":
        m = int(0.012 * SR)
        pre = bp(rng.standard_normal(m), 1800, 5500) * np.exp(-np.arange(m) / (0.003 * SR)) * 0.35
    elif on == "fric":
        m = int(0.045 * SR)
        pre = hp(rng.standard_normal(m), 4200) * np.sin(np.pi * np.arange(m) / m) * 0.12
    elif on == "nasal":
        y[: int(0.03 * SR)] *= 0.55
    out = np.concatenate([pre, y]) if pre.size else y
    peak = np.abs(out).max() or 1
    return out / peak * (0.9 if shout else 0.72) * (0.7 + 0.3 * ev["amp"]), -pre.size / SR


def bark(ev):
    n = int(0.17 * SR)
    t = np.arange(n) / SR
    f = ev["voice"].get("f0", 520) * (1.1 - 0.35 * t / 0.17)
    ph = 2 * np.pi * np.cumsum(f) / SR
    y = sum((1 / k) * np.sin(k * ph) for k in range(1, 12))
    y = bp(y, 500, 4200) + 0.35 * bp(rng.standard_normal(n), 900, 3000)
    env = np.minimum(1, t / 0.005) * np.exp(-t / 0.06)
    y = y * env
    return y / (np.abs(y).max() or 1) * 0.8, 0.0


# ── efectos ──────────────────────────────────────────────────────────────
def sfx(name):
    if name == "tin":  # ¡tin! de caricatura (la mirada de Fanny)
        a, b = cs.glock(mtof(93), 0.4, 0.6), cs.glock(mtof(100), 0.4, 0.25)
        return a[: min(a.size, b.size)] + b[: min(a.size, b.size)]
    if name == "crash":
        t = np.arange(int(2.6 * SR)) / SR
        x = bp(rng.standard_normal(t.size), 2500, 12000) * np.exp(-t / 0.75)
        metal = sum(np.sin(2 * np.pi * f * t + rng.uniform(0, 6)) * np.exp(-t / 0.9) for f in (3150, 4270, 5510, 6870, 8120)) * 0.05
        hit = bp(rng.standard_normal(t.size), 200, 1200) * np.exp(-t / 0.03) * 0.6
        return (x + metal + hit) * 0.9
    if name == "click":
        t = np.arange(int(0.08 * SR)) / SR
        return (np.sin(2 * np.pi * 1600 * t) * np.exp(-t / 0.004) + 0.5 * hp(rng.standard_normal(t.size), 3000) * np.exp(-t / 0.002)) * 0.5
    if name == "whoosh":
        n = int(0.55 * SR)
        x = rng.standard_normal(n)
        out = np.zeros(n)
        for i in range(20):
            a, b = i * n // 20, (i + 1) * n // 20
            fc = 300 * (14 ** (np.sin(np.pi * i / 20)))
            out[a:b] = bp(x[max(a - 1500, 0):b], fc * 0.6, fc * 1.6)[-(b - a):]
        return out * np.sin(np.pi * np.arange(n) / n) ** 2 * 0.5
    if name == "arpa":  # glissando de recuerdo
        notes = [62, 66, 69, 74, 78, 81, 86, 90, 93, 98]
        n = int(2.5 * SR)
        y = np.zeros(n)
        for i, m in enumerate(notes):
            s = cs.glock(mtof(m), 0.3, 0.22 + 0.02 * i)
            a = int(i * 0.075 * SR)
            y[a:a + s.size] += s[: n - a]
        return y
    if name == "zap":  # cambio de canal de la tele
        t = np.arange(int(0.3 * SR)) / SR
        buzz = np.sign(np.sin(2 * np.pi * 120 * t)) * 0.15 + bp(rng.standard_normal(t.size), 800, 6000) * 0.4
        return buzz * np.exp(-t / 0.12) * 0.6
    if name == "grillos":  # silencio incómodo
        n = int(1.8 * SR)
        t = np.arange(n) / SR
        y = np.zeros(n)
        for c in (0.0, 0.55, 1.1):
            m = (t >= c) & (t < c + 0.3)
            tt = t[m] - c
            y[m] += np.sin(2 * np.pi * 4600 * tt) * (np.sin(2 * np.pi * 32 * tt) > 0.2) * np.sin(np.pi * tt / 0.3) * 0.14
        return y
    if name == "clink":
        t = np.arange(int(0.9 * SR)) / SR
        return sum(np.sin(2 * np.pi * f * t) * np.exp(-t / d) * a for f, d, a in ((2830, 0.35, 0.4), (4150, 0.22, 0.3), (6320, 0.15, 0.2), (8900, 0.08, 0.1))) * np.minimum(1, t / 0.001)
    if name == "shutter":
        n = int(0.25 * SR)
        y = np.zeros(n)
        for c in (0, 0.07):
            a = int(c * SR)
            m = int(0.02 * SR)
            y[a:a + m] += hp(rng.standard_normal(m), 2000) * np.exp(-np.arange(m) / (0.003 * SR)) * 0.6
        return y
    if name == "pop":
        t = np.arange(int(0.4 * SR)) / SR
        return (lp(rng.standard_normal(t.size), 3000) * np.exp(-t / 0.02) * 0.8 + np.sin(2 * np.pi * 90 * t) * np.exp(-t / 0.06) * 0.5)
    if name == "campanita":
        y = np.zeros(int(3 * SR))
        for i, m in enumerate([86, 90, 93, 98]):
            s = cs.glock(mtof(m), 0.6, 0.3)
            a = int(i * 0.16 * SR)
            y[a:a + s.size] += s[: y.size - a]
        return y
    raise KeyError(name)


# ── música de la parte A (rejilla de 100 BPM desde t=0) ──────────────────
BPM_A = 100
BEAT = 60 / BPM_A
BAR = 4 * BEAT
PROG = ["D", "Bm", "G", "A"]
CH = {"D": [62, 66, 69], "Bm": [59, 62, 66], "G": [55, 59, 62], "A": [57, 61, 64], "Em": [55, 59, 64]}
ROOT_N = {"D": 38, "Bm": 35, "G": 43, "A": 45, "Em": 40}
THEME = [  # tema de la serie: 3 compases (beat, dur, midi)
    [(0.5, .5, 74), (1, .5, 78), (1.5, .5, 81), (2, 1, 86), (3, .5, 85), (3.5, .5, 83)],
    [(0, 1, 81), (1, .5, 78), (1.5, .5, 79), (2, 1, 81), (3, 1, 76)],
    [(0, .5, 78), (.5, .5, 79), (1, .5, 81), (1.5, .5, 83), (2, 2, 86)],
]


class Mix:
    def __init__(self, dur):
        self.n = int((dur + 4) * SR)
        self.bus = {k: np.zeros(self.n) for k in ("voz", "musica", "sfx", "cancionL", "cancionR")}
        self.verb = np.zeros(self.n)

    def add(self, bus, at, sig, gain=1.0, verb=0.0):
        i = int(round(at * SR))
        if i < 0:
            sig = sig[-i:]
            i = 0
        j = min(i + sig.size, self.n)
        if j > i:
            self.bus[bus][i:j] += sig[: j - i] * gain
            if verb:
                self.verb[i:j] += sig[: j - i] * gain * verb


def music_segment(mx, kind, a, b, crash_t=None, fx_t=None):
    bars_start = int(np.floor(a / BAR + 1e-6))
    bars_end = int(np.ceil(b / BAR - 1e-6))
    G = lambda s: mx.add("musica", *s[:2], gain=s[2], verb=s[3] if len(s) > 3 else 0.3)  # noqa: E731

    def inside(t):
        return a - 1e-6 <= t < b - 0.05

    for bi in range(bars_start, bars_end):
        t0 = bi * BAR
        chord = PROG[bi % 4]
        if kind == "cajita":  # cajita musical muy suave
            for i in range(8):
                tt = t0 + i * BEAT / 2
                if inside(tt):
                    m = CH[chord][[0, 1, 2, 1, 2, 0, 1, 2][i]] + 12
                    G((tt, cs.glock(mtof(m + 12), BEAT / 2, 0.16 if i % 2 else 0.22), 1.0, 0.45))
            if inside(t0):
                for m in CH[chord]:
                    G((t0, cs.pad(mtof(m), BAR, 0.05), 1.0, 0.4))
        elif kind == "tema":
            k = bi - bars_start
            if k < len(THEME):
                for beat, dur, m in THEME[k]:
                    tt = t0 + beat * BEAT
                    if inside(tt):
                        G((tt, cs.glock(mtof(m), dur * BEAT, 0.5), 1.0, 0.35))
                        G((tt, cs.felt_piano(mtof(m - 12), dur * BEAT, 0.22), 1.0, 0.25))
                chord = ["D", "G", "D"][k] if k < 3 else "D"
                for beat in ((0, 1.5, 2, 3) if k < 2 else (0, 2)):
                    for j, m in enumerate(CH[chord]):
                        G((t0 + beat * BEAT + j * 0.01, cs.felt_piano(mtof(m), BEAT * (2 if k == 2 and beat == 2 else 0.9), 0.2), 1.0, 0.25))
                G((t0, cs.bass(mtof(ROOT_N[chord]), BEAT * 1.5, 0.35), 1.0, 0.05))
                G((t0 + 2 * BEAT, cs.bass(mtof(ROOT_N[chord] + (5 if k == 1 else 0)), BEAT * 1.5, 0.35), 1.0, 0.05))
                if k < 2:
                    for beat in (0, 2):
                        G((t0 + beat * BEAT, cs.kick(0.5), 1.0, 0.05))
                    for beat in (1, 3):
                        G((t0 + beat * BEAT, cs.snare(0.35), 1.0, 0.1))
                    for i in range(8):
                        G((t0 + i * BEAT / 2, cs.shaker(0.18), 1.0, 0.05))
                else:
                    G((t0, cs.kick(0.5), 1.0, 0.05))
                    G((t0 + 2 * BEAT, cs.soft_crash(0.25), 1.0, 0.3))
                    G((t0 + 2 * BEAT, cs.kick(0.55), 1.0, 0.05))
        elif kind == "banda":  # banda de la clase de música: marimba, platillos y tarola
            riff = [74, 78, 81, 78, 83, 81, 78, 76]
            for i in range(8):
                tt = t0 + i * BEAT / 2
                live = crash_t is None or tt < crash_t - 0.02
                if inside(tt) and live:
                    m = riff[i] - (0 if chord in ("D", "Bm") else 2)
                    G((tt, cs.glock(mtof(m - 12), BEAT / 2, 0.3) * np.exp(-np.arange(int((BEAT / 2 + 2.2) * SR)) / SR / 0.35)[: int((BEAT / 2 + 2.2) * SR)], 1.0, 0.2))
                    G((tt, cs.shaker(0.16), 1.0, 0.05))
            for beat in range(4):
                tt = t0 + beat * BEAT
                live = crash_t is None or tt < crash_t - 0.02
                if not (inside(tt) and live):
                    continue
                if beat in (0, 2):
                    G((tt, cs.kick(0.45), 1.0, 0.05))
                    G((tt, sfx("crash")[: int(0.5 * SR)] * np.exp(-np.arange(int(0.5 * SR)) / SR / 0.12) * 0.25, 1.0, 0.2))
                else:
                    G((tt, cs.snare(0.3), 1.0, 0.1))
                if beat == 0:
                    G((tt, cs.bass(mtof(ROOT_N[chord]), BEAT * 1.8, 0.3), 1.0, 0.05))
            # después del ¡crash!: silencio de un tiempo y luego ternura
            if crash_t is not None and t0 + BAR > crash_t + BEAT:
                ts = max(t0, crash_t + 2 * BEAT)
                if inside(ts):
                    for m in CH[chord]:
                        G((ts, cs.pad(mtof(m), t0 + BAR - ts, 0.06), 1.0, 0.4))
                    for i, m in enumerate([CH[chord][2] + 12, CH[chord][1] + 12]):
                        tt = ts + i * BEAT * 1.5
                        if inside(tt):
                            G((tt, cs.glock(mtof(m + 12), BEAT, 0.14), 1.0, 0.5))
        elif kind == "hilo":
            chord = ["D", "Bm", "G", "A"][(bi - bars_start) % 4]
            if inside(t0):
                for m in CH[chord]:
                    G((t0, cs.pad(mtof(m), BAR, 0.07), 1.0, 0.45))
            for i, beat in enumerate((0, 1.5, 3)):
                tt = t0 + beat * BEAT
                if inside(tt):
                    G((tt, cs.glock(mtof(CH[chord][i % 3] + 24), BEAT, 0.18), 1.0, 0.5))
        elif kind == "cajita_creditos":
            k = bi - bars_start
            ph = THEME[k % 3] if k < 6 else []
            for beat, dur, m in ph:
                tt = t0 + beat * BEAT
                if inside(tt):
                    G((tt, cs.glock(mtof(m + 12), dur * BEAT, 0.3), 1.0, 0.5))
            chord = ["D", "G", "D", "Bm", "G", "A", "D", "D"][k % 8]
            if inside(t0):
                for j, m in enumerate(CH[chord]):
                    G((t0 + j * 0.05, cs.felt_piano(mtof(m), BAR * 0.95, 0.12), 1.0, 0.4))
                G((t0, cs.pad(mtof(CH[chord][0]), BAR, 0.04), 1.0, 0.4))
    if kind == "radio":  # motor del coche y estática de radio
        n = int((b - a) * SR)
        eng = lp(rng.standard_normal(n).cumsum() * 0.002, 140) * 1.2
        eng *= 1 + 0.15 * np.sin(2 * np.pi * 7 * np.arange(n) / SR)
        stat = bp(rng.standard_normal(n), 1500, 5000) * 0.03
        fade = np.minimum(1, np.arange(n) / (0.3 * SR))
        mx.add("musica", a, (eng + stat) * fade, 1.0)


def main():
    ep = json.loads((ROOT / "episodio" / "episode.json").read_text())
    song_path = Path(sys.argv[1]) if len(sys.argv) > 1 else None
    if song_path is None:
        src = ep["song"]["source"]
        song_path = ROOT / "assets" / "audio" / ("scratch_score.wav" if src == "scratch_score.wav" else "song.wav")
    dur = ep["duration"]
    mx = Mix(dur)
    A = ep["audio"]

    # voces
    for ev in A["voices"]:
        if ev.get("bark"):
            sig, off = bark(ev)
        else:
            sig, off = syllable(ev)
        pan_gain = 0.9 if ev["who"] in ("diego", "fanny") else 0.8
        mx.add("voz", ev["t"] + off, sig, pan_gain, verb=0.08)

    # efectos
    SFX_GAIN = {"crash": 0.8, "tin": 0.6, "click": 0.7, "whoosh": 0.55, "arpa": 0.5, "zap": 0.45, "grillos": 0.9,
                "clink": 0.7, "shutter": 0.8, "pop": 0.7, "campanita": 0.5}
    crash_t = next((x["t"] for x in A["sfx"] if x["name"] == "crash"), None)
    for x in A["sfx"]:
        mx.add("sfx", x["t"], sfx(x["name"]), SFX_GAIN.get(x["name"], 0.6), verb=0.2)

    # música original: cada tramo a su nivel (debajo del diálogo, arriba en la entrada)
    MUS_LUFS = {"cajita": -27, "tema": -17, "banda": -22, "hilo": -26, "radio": -31, "cajita_creditos": -19}
    for mu in A["music"]:
        keep_b, keep_v = mx.bus["musica"], mx.verb
        mx.bus["musica"], mx.verb = np.zeros(mx.n), np.zeros(mx.n)
        music_segment(mx, mu["kind"], mu["start"], mu["end"], crash_t=crash_t)
        a, b = int(mu["start"] * SR), int(mu["end"] * SR)
        lu = lufs(mx.bus["musica"][a:b])
        g = 10 ** ((MUS_LUFS.get(mu["kind"], -24) - lu) / 20) if lu > -90 else 1.0
        keep_b += mx.bus["musica"] * g
        keep_v += mx.verb * g
        mx.bus["musica"], mx.verb = keep_b, keep_v
    # la canción
    song, ssr = sf.read(str(song_path), always_2d=True)
    if song.shape[1] == 1:
        song = np.repeat(song, 2, 1)
    if ssr != SR:
        song = resample_poly(song, SR, ssr, axis=0)
    mx.add("cancionL", ep["song"]["start"], song[:, 0], 1.0)
    mx.add("cancionR", ep["song"]["start"], song[:, 1], 1.0)

    # sidechain suave: la música y la canción bajan cuando alguien habla
    v = np.abs(mx.bus["voz"])
    win = int(0.03 * SR)
    env = np.convolve(v, np.ones(win) / win, mode="same")
    env = env / (env.max() or 1)
    act = np.clip(env / 0.08, 0, 1)
    # ataque rápido, suelta lento
    k_rel = np.exp(-1 / (0.35 * SR))
    sm = np.zeros_like(act)
    acc = 0.0
    for i in range(0, act.size, 64):
        target = act[i]
        acc = target if target > acc else acc * (k_rel ** 64) + target * (1 - k_rel ** 64)
        sm[i:i + 64] = acc
    duck_song = 10 ** (-5.0 * sm / 20)
    duck_mus = 10 ** (-7.0 * sm / 20)

    # niveles: la canción manda en la parte B; las voces se entienden encima
    gv = 10 ** ((-18.0 - lufs(mx.bus["voz"])) / 20)
    song_st = np.stack([mx.bus["cancionL"], mx.bus["cancionR"]], 1)
    gs = 10 ** ((-15.0 - lufs(song_st)) / 20)
    musica = mx.bus["musica"] * duck_mus
    cancion_l = mx.bus["cancionL"] * duck_song * gs
    cancion_r = mx.bus["cancionR"] * duck_song * gs
    voz = mx.bus["voz"] * gv
    sfxb = np.tanh(mx.bus["sfx"] * gv * 1.2) / 1.2   # los golpes no se disparan
    mx.verb = mx.verb.copy()
    ir_l, ir_r = cs.reverb_ir(1.8)
    wet_l = fftconvolve(mx.verb * 0.6, ir_l)[: mx.n]
    wet_r = fftconvolve(mx.verb * 0.6, ir_r)[: mx.n]
    dry = voz + sfxb + musica
    # la canción ya viene mezclada: pasa limpia, en estéreo si lo era
    L = dry + wet_l + cancion_l
    R = dry + wet_r + cancion_r
    mix = np.stack([L, R], 1)[: int(dur * SR)]
    mix = hp(mix.T, 30).T
    fade = np.clip((mix.shape[0] - np.arange(mix.shape[0])) / (1.0 * SR), 0, 1)
    mix *= fade[:, None]
    # a -14 LUFS (estándar de redes) con limitador suave para los golpes
    mix *= 10 ** ((-14.0 - lufs(mix)) / 20)
    for _ in range(3):
        mix = limiter(mix)
        mix *= 10 ** ((-14.0 - lufs(mix)) / 20)
    mix = limiter(mix, -1.2)
    print(f"  sonoridad: {lufs(mix):.1f} LUFS (voces {lufs(voz):.1f}, canción {lufs(np.stack([cancion_l, cancion_r], 1)):.1f}), pico {20 * np.log10(np.abs(mix).max()):.1f} dBFS")
    outp = ROOT / "episodio" / "audio" / "episodio_mezcla.wav"
    outp.parent.mkdir(parents=True, exist_ok=True)
    sf.write(str(outp), mix.astype(np.float32), SR, subtype="PCM_16")
    print(f"{outp}  {mix.shape[0] / SR:.1f}s  (canción desde {ep['song']['start']:.2f}s: {song_path.name})")


if __name__ == "__main__":
    main()
