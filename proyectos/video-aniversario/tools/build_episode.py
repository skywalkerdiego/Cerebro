"""Arma la línea de tiempo del episodio a partir del guion y de la canción.

Entrada: episodio/guion.json, episodio/rigs.json, assets/audio/analysis.json
Salida:  episodio/episode.json (lo leen el motor y tools/episode_audio.py)
         episodio/episode.js   (window.EP = ..., para el motor)

- PARTE A: cada secuencia dura lo que dura su diálogo; las secuencias se
  alinean a medios compases de un tema a 100 BPM (la música original de la
  parte A se compone encima de esa rejilla, así los cambios caen a tiempo).
- "mark: song" (el clic del estéreo en el coche) fija dónde arranca la
  canción. Desde ahí la rejilla es la de la canción analizada.
- PARTE B: programación dinámica sobre los tiempos fuertes de la canción
  (igual que el video v1), pero cada escena tiene un mínimo duro: lo que
  dura su diálogo con la rejilla real. El puente ("2 años juntos") arranca
  EXACTAMENTE en el clímax detectado.
- Créditos: rejilla propia de 100 BPM (cajita musical) al terminar.
"""
import json
import re
import unicodedata
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parent.parent
EP = ROOT / "episodio"

TRANS_DUR = {"cut": 0.0, "none": 0.0, "flash": 0.0, "fade": 0.6, "whip": 0.45,
             "flashback": 1.3, "dip": 0.8, "tv": 1.1}
TRANS_SFX = {"whip": "whoosh", "flashback": "arpa", "tv": "zap"}
GAP = 0.32          # silencio entre líneas
PUNCT_PAUSE = {",": 0.16, ";": 0.2, ":": 0.2, "…": 0.38, ".": 0.3, "!": 0.26, "?": 0.26}


# ── sílabas en español (aproximado, suficiente para el balbuceo) ──────────
STRONG = set("aeoáéóíú")   # í/ú acentuadas rompen diptongo (dí-a)
VOW = set("aeiouáéíóúü")
INSEP = {"pr", "br", "tr", "dr", "cr", "kr", "gr", "fr", "pl", "bl", "cl", "kl", "gl", "fl", "ch", "ll", "rr"}
OPEN = {"a": 1.0, "o": 0.85, "e": 0.75, "u": 0.55, "i": 0.5, "m": 0.2}


def base_vowel(ch):
    return unicodedata.normalize("NFD", ch)[0]


def word_syllables(w):
    """Devuelve [(i0, i1, vocal, ataque, tónica)] con índices dentro de la palabra."""
    lw = w.lower()
    n = len(lw)
    isv = []
    for i, ch in enumerate(lw):
        v = ch in VOW
        if ch == "u" and i > 0 and lw[i - 1] in "qg" and i + 1 < n and lw[i + 1] in "eiéí":
            v = False  # "que", "gui": u muda
        if ch == "y" and (i == n - 1) and i > 0 and lw[i - 1] in VOW:
            v = True   # "hoy", "muy"
        if ch == "y" and n == 1:
            v = True   # la conjunción "y"
        isv.append(v)
    # núcleos: grupos de vocales, partidos en hiato
    nuclei = []
    i = 0
    while i < n:
        if not isv[i]:
            i += 1
            continue
        j = i
        while j + 1 < n and isv[j + 1]:
            j += 1
        start = i
        for k in range(i + 1, j + 1):
            a, b = lw[k - 1], lw[k]
            if (a in STRONG and b in STRONG) or b in "íú" or a in "íú":
                nuclei.append((start, k - 1))
                start = k
        nuclei.append((start, j))
        i = j + 1
    if not nuclei:  # "Mmm", "Shh": un zumbido
        return [(0, n, "m", "m", True)]
    # fronteras entre núcleos
    bounds = [0]
    for (a0, a1), (b0, b1) in zip(nuclei, nuclei[1:]):
        cons = lw[a1 + 1:b0]
        L = len(cons)
        if L == 0:
            cut = b0
        elif L == 1:
            cut = b0 - 1
        elif L == 2:
            cut = b0 - 2 if cons in INSEP else b0 - 1
        elif L == 3:
            cut = b0 - 2 if cons[1:] in INSEP else b0 - 1
        else:
            cut = a1 + 3
        bounds.append(cut)
    bounds.append(n)
    # acento
    acc = [k for k, (a, b) in enumerate(nuclei) if any(c in "áéíóú" for c in lw[a:b + 1])]
    if acc:
        stress = acc[0]
    elif len(nuclei) == 1:
        stress = 0
    else:
        stress = len(nuclei) - 2 if lw[-1] in "aeiouns" else len(nuclei) - 1
    out = []
    for k, (a, b) in enumerate(nuclei):
        i0, i1 = bounds[k], bounds[k + 1]
        # vocal dominante del núcleo (la fuerte)
        core = lw[a:b + 1]
        v = next((c for c in core if c in STRONG), core[0])
        v = base_vowel(v)
        v = "i" if v == "y" else v
        onset = lw[i0:a]
        out.append((i0, i1, v, onset, k == stress))
    return out


def onset_class(on):
    if not on:
        return "none"
    c = on[0]
    if on.startswith("ch"):
        return "fric"
    if c in "ptkcqbdg":
        return "plos"
    if c in "sfzjx":
        return "fric"
    if c in "mnñ":
        return "nasal"
    return "liq"


def tokenize(text):
    return [(m.start(), m.group()) for m in re.finditer(r"[A-Za-zÁÉÍÓÚáéíóúÑñÜü']+|[^A-Za-zÁÉÍÓÚáéíóúÑñÜü']", text)]


def plan_line(text, voice, kind):
    """Sílabas con tiempos relativos, tono y apertura de boca."""
    toks = tokenize(text)
    rate = voice.get("rate", 4.8)
    slot = 1.0 / rate
    syl = []
    t = 0.0
    is_q = "?" in text
    is_ex = "!" in text or kind == "shout"
    for ti, (pos, tok) in enumerate(toks):
        if re.match(r"[A-Za-zÁÉÍÓÚáéíóúÑñÜü']", tok):
            for (i0, i1, v, on, st) in word_syllables(tok.replace("'", "")):
                d = slot * (1.18 if st else 1.0)
                if v == "m":
                    d = 0.55
                syl.append({"t0": t, "d": d, "v": v, "on": onset_class(on), "stress": st,
                            "c1": pos + i1})
                t += d
        else:
            if tok in PUNCT_PAUSE and ti < len(toks) - 1 and any(re.match(r"[A-Za-zÁÉÍÓÚáéíóúÑñÜü]", x) for _, x in toks[ti + 1:]):
                t += PUNCT_PAUSE[tok]
            elif tok == " ":
                t += 0.035
    if syl:
        syl[-1]["d"] *= 1.35  # alargamiento final de frase
    n = len(syl)
    f0 = voice.get("f0", 220) * (1.1 if is_ex else 1.0)
    spread = voice.get("spread", 0.25)
    for k, s in enumerate(syl):
        u = k / max(1, n - 1)
        f = f0 * (1 + 0.1 * (0.5 - u))                  # declinación
        if s["stress"]:
            f *= 1 + 0.12 * spread / 0.25
        if is_q and k >= n - 2:
            f *= 1.16 if k == n - 2 else 1.32         # pregunta: sube al final
        if is_ex and k == 0:
            f *= 1.1
        f *= 1 + spread * 0.18 * (np.sin(k * 12.9898 + len(text)) * 0.5)
        s["f0"] = round(float(f), 1)
        s["amp"] = OPEN.get(s["v"], 0.7) * (1.0 if s["stress"] else 0.82)
    speech = (syl[-1]["t0"] + syl[-1]["d"]) if syl else 0.0
    return syl, speech


def read_time(text):
    return 0.95 + 0.055 * len(text)


# ── rejillas ───────────────────────────────────────────────────────────────
class Grid:
    def __init__(self, beats, downbeats):
        self.beats = np.asarray(beats, float)
        self.down = np.asarray(downbeats, float)

    def next(self, t, which="beat", tol=0.03):
        arr = self.beats if which == "beat" else self.down
        k = np.searchsorted(arr, t - tol)
        return float(arr[k]) if k < len(arr) else t

    def beat_len(self, t):
        k = int(np.clip(np.searchsorted(self.beats, t), 1, len(self.beats) - 1))
        return float(self.beats[k] - self.beats[k - 1])


def tempo_grid(t0, t1, bpm):
    b = 60.0 / bpm
    beats = list(np.arange(t0, t1 + 1e-6, b))
    return beats, beats[::4]


# ── maquetación de eventos ─────────────────────────────────────────────────
def layout(events, t_start, grid, cast, scene_end_hint=None):
    """Recorre los eventos con un cursor. Devuelve (items, fin_natural)."""
    it = {"cams": [], "acts": [], "fx": [], "lines": [], "sfx": [], "blush": [], "cards": [], "marks": []}
    c = t_start
    for ev in events:
        if "snap" in ev:
            c = grid.next(c, ev["snap"])
        at = c + ev.get("at", 0.0)
        if "cam" in ev:
            e = {"t": round(at, 3), "frame": ev["cam"]}
            if ev.get("cut"):
                e["cut"] = True
            else:
                e["move"] = ev.get("move", 1.0)
            it["cams"].append(e)
        elif "act" in ev:
            a = {k: v for k, v in ev.items() if k not in ("act", "at")}
            a["h"] = ev["act"]
            a["t"] = round(at, 3)
            if a.get("env") == "clink":
                a["dur"] = a.get("dur", 0.0)
            it["acts"].append(a)
        elif "fx" in ev:
            it["fx"].append({"kind": ev["fx"], "t": round(at, 3), "dur": ev.get("dur", 1.5)})
        elif "sfx" in ev:
            it["sfx"].append({"name": ev["sfx"], "t": round(at, 3)})
        elif "blush" in ev:
            it["blush"].append({"who": ev["blush"], "t": round(at, 3), "dur": ev.get("dur", 2.0)})
        elif "card" in ev:
            it["cards"].append({"kind": ev["card"], "t": round(at, 3)})
        elif "mark" in ev:
            it["marks"].append({"kind": ev["mark"], "t": round(at, 3)})
        elif "wait" in ev:
            c += ev["wait"]
        elif "say" in ev:
            who, text, kind = ev["say"], ev["text"], ev.get("kind", "say")
            voice = cast[who]["voice"]
            line = {"who": who, "text": text, "kind": kind, "t0": round(at, 3)}
            if kind == "sing":
                n = ev.get("beats", 4)
                b0 = grid.next(at, "beat")
                beats = [b0]
                for _ in range(n):
                    beats.append(grid.next(beats[-1] + 0.05, "beat"))
                line["t0"] = round(b0, 3)
                line["syl"] = [{"t0": round(b - b0, 3), "d": round(0.8 * (beats[i + 1] - b), 3), "v": "a", "amp": 1.0 if i % 2 == 0 else 0.75}
                               for i, b in enumerate(beats[:-1])]
                speech = beats[-1] - b0
                at = b0
            elif kind in ("silent", "think"):
                line["syl"] = []
                speech = max(0.9, read_time(text) * (0.9 if kind == "think" else 0.5)) + ev.get("hold", 0.0)
                if kind == "think":
                    speech = read_time(text) + 0.2
            elif kind == "bark":
                line["syl"] = [{"t0": 0.0, "d": 0.16, "v": "a", "amp": 1.0, "bark": 1}, {"t0": 0.24, "d": 0.2, "v": "a", "amp": 1.0, "bark": 1}]
                speech = 0.5
            else:
                syl, speech = plan_line(text, voice, kind)
                line["syl"] = [{k: (round(v, 3) if isinstance(v, float) else v) for k, v in s.items()} for s in syl]
            line["speech"] = round(speech, 3)
            hold = max(0.35, read_time(text) - speech) if kind not in ("think", "silent") else 0.3
            line["bubble_end"] = round(at + speech + hold + ev.get("hold", 0.0), 3)
            if ev.get("clink"):
                line["clink"] = True
            it["lines"].append(line)
            c = at + speech + GAP + (ev.get("hold", 0.0) if kind not in ("silent",) else 0.0)
    # los globos no se quedan encima de la línea siguiente de la misma escena
    L = it["lines"]
    for a, b in zip(L, L[1:]):
        a["bubble_end"] = round(max(a["t0"] + a["speech"] + 0.3, min(a["bubble_end"], b["t0"] + 0.35)), 3)
    return it, c


def merge_items(a, b):
    for k in a:
        a[k] += b[k]
    return a


# ── parte B: reparto sobre la canción ─────────────────────────────────────
def allocate(scenes, t0, t1, grid, an_off, cast, e_of, sec_starts, first_start_fixed=True):
    beats = grid.beats
    down = set(np.round(grid.down, 3))
    bar = 4 * float(np.median(np.diff(beats)))
    cands = [(t0, 0.0)]
    for i, b in enumerate(beats):
        if not (t0 + 0.8 * bar <= b <= t1 - 0.8 * bar):
            continue
        if round(b, 3) in down:
            cands.append((b, 0.0))
        elif i >= 2 and round(beats[i - 2], 3) in down:
            cands.append((b, 0.45))
    cands.append((t1, 0.0))
    pts = cands
    n, m = len(scenes), len(pts)
    # mínimo duro: lo que dura el diálogo si la escena arranca en pts[q]
    need = np.zeros((n, m))
    for i, s in enumerate(scenes):
        for q in range(m):
            _, end = layout(s["events"], pts[q][0], grid, cast)
            need[i, q] = end - pts[q][0] + 0.25
    span = t1 - t0
    raw = [max(s["weight"] * 5.0, need[i].min()) for i, s in enumerate(scenes)]
    k = span / sum(raw)
    target = [r * k for r in raw]

    def sec_bonus(t):
        d = min(abs(t - s) for s in sec_starts) if sec_starts else 9
        return -2.0 if d < 0.08 else 0.0

    INF = 1e18
    best = np.full((n + 1, m), INF)
    prev = np.zeros((n + 1, m), int)
    best[0, 0] = 0
    for i in range(1, n + 1):
        s = scenes[i - 1]
        for j in range(1, m):
            if i == n and j != m - 1:
                continue
            tj, cj = pts[j]
            for q in range(j):
                if best[i - 1, q] >= INF:
                    continue
                tq = pts[q][0]
                d = tj - tq
                short = need[i - 1, q] - d
                cost = 8 * ((d - target[i - 1]) / target[i - 1]) ** 2
                if short > 0:
                    cost += 60 + 40 * short  # no cabe el diálogo: casi prohibido
                cost += 2.5 * abs(e_of(tq, tj) - s["energy"])
                cost += cj + (sec_bonus(tj) if j != m - 1 else 0)
                c = best[i - 1, q] + cost
                if c < best[i, j]:
                    best[i, j], prev[i, j] = c, q
    cuts, j = [], m - 1
    for i in range(n, 0, -1):
        q = prev[i, j]
        cuts.append((pts[q][0], pts[j][0]))
        j = q
    cuts = list(reversed(cuts))
    for s, (a, b), i in zip(scenes, cuts, range(n)):
        _, end = layout(s["events"], a, grid, cast)
        if end > b + 0.05:
            print(f"  ⚠️  {s['id']}: el diálogo ({end - a:.2f}s) no cabe en {b - a:.2f}s")
    return cuts


def main():
    g = json.loads((EP / "guion.json").read_text())
    rigs = json.loads((EP / "rigs.json").read_text())
    an = json.loads((ROOT / "assets" / "audio" / "analysis.json").read_text())
    cast = g["cast"]
    bpm_a = g["meta"]["theme_bpm"]
    beat_a = 60.0 / bpm_a

    seqs = []
    T = 0.0
    beatsA, downA = tempo_grid(0, 400, bpm_a)
    gridA = Grid(beatsA, downA)
    song_start = None
    for s in g["partA"]:
        tr = s.get("transition", "cut")
        seq = {"id": s["id"], "start": round(T, 3), "transition": {"type": tr, "dur": TRANS_DUR[tr]},
               "music": s.get("music")}
        if s.get("slug"):
            seq["slug"] = s["slug"]
        if "card" in s:
            seq.update({"kind": "card", "card": s["card"]})
            T += s["bars"] * 4 * beat_a
            seq["items"] = {"cams": [], "acts": [], "fx": [], "lines": [], "sfx": [], "blush": [], "cards": [], "marks": []}
        else:
            seq.update({"kind": "scene", "scene": s["scene"]})
            items, end = layout(s["events"], T, gridA, cast)
            mk = [m for m in items["marks"] if m["kind"] == "song"]
            if mk:
                song_start = mk[0]["t"]
                T = song_start
            else:
                # termina en el siguiente medio compás del tema (+ un respiro)
                T = gridA.next(end + 0.25, "beat")
                k = round(T / beat_a)
                if k % 2:
                    T += beat_a
            seq["items"] = items
        seq["end"] = round(T, 3)
        seqs.append(seq)
    assert song_start is not None, "falta mark: song en la parte A"

    # rejilla de la canción, en tiempo del episodio
    off = song_start
    song_beats = [b + off for b in an["beats"]]
    song_down = [d + off for d in an["downbeats"]]
    song_end = off + an["duration"]
    climax = off + an["climax"]
    gridS = Grid(song_beats, song_down)
    env = np.array(an["env30"])
    te = np.arange(len(env)) / 30 + off

    def e_of(a, b):
        sel = (te >= a) & (te < b)
        return float(env[sel].mean()) if sel.any() else 0.0

    sec_starts = [sct["start"] + off for sct in an["sections"]]
    B = g["partB"]
    ai = next(i for i, s in enumerate(B) if s.get("anchor") == "climax")
    pre, post = B[:ai], B[ai:]
    cuts = allocate(pre, song_start, climax, gridS, off, cast, e_of, sec_starts)
    # tras el clímax: el puente cubre la sección del clímax; el epílogo lo que queda
    bar = 4 * 60.0 / an["bpm"]
    sec = next((x for x in an["sections"] if abs(x["start"] + off - climax) < 0.1), None)
    p_end = (sec["end"] + off) if sec else climax + 4 * bar
    _, need_p = layout(post[0]["events"], climax, gridS, cast)
    p_end = max(p_end, gridS.next(need_p + 0.3, "downbeat"))
    _, need_e = layout(post[1]["events"], p_end, gridS, cast)
    e_end = max(song_end - 0.6, need_e + 4.2)  # "Continuará…" necesita su iris y su pausa
    cuts += [(climax, p_end), (p_end, e_end)]

    for s, (a, b) in zip(B, cuts):
        items, end = layout(s["events"], a, gridS, cast)
        # en la canción, los cortes de cámara internos caen en el tiempo más cercano hacia adelante
        for cm in items["cams"]:
            if cm.get("cut") and cm["t"] > a + 0.05:
                nb = gridS.next(cm["t"], "beat", tol=0.0)
                if nb - cm["t"] < 0.3:
                    cm["t"] = round(nb, 3)
        tr = s.get("transition", "cut")
        if s.get("continues"):
            prev = seqs[-1]
            merge_items(prev["items"], items)
            prev["end"] = round(b, 3)
            prev["partB"] = {"from": round(a, 3)}
            continue
        seq = {"id": s["id"], "kind": "scene", "scene": s["scene"], "start": round(a, 3), "end": round(b, 3),
               "transition": {"type": tr, "dur": TRANS_DUR[tr]}, "items": items, "energy": round(e_of(a, b), 3)}
        if s.get("anchor"):
            seq["anchor"] = s["anchor"]
        seqs.append(seq)

    # créditos: rejilla propia (cajita musical) justo al terminar el epílogo
    cstart = seqs[-1]["end"]
    cr = g["credits"]
    cards = []
    t = cstart
    for c in cr["cards"]:
        bars = 2 if c.get("final") else 1
        cards.append({**c, "t": round(t, 3), "dur": round(bars * 4 * beat_a, 3)})
        t += bars * 4 * beat_a
    t += 1.2  # cola: la última nota de la cajita
    seqs.append({"id": "creditos", "kind": "card", "card": "credits", "start": round(cstart, 3), "end": round(t, 3),
                 "transition": {"type": "dip", "dur": TRANS_DUR["dip"]}, "music": cr["music"], "cards": cards,
                 "items": {"cams": [], "acts": [], "fx": [], "lines": [], "sfx": [], "blush": [], "cards": [], "marks": []}})
    duration = round(t, 3)

    # rejilla unificada (para los loops que van a tiempo)
    beatsC, downC = tempo_grid(cstart, duration + 2, bpm_a)
    beats = [b for b in beatsA if b < song_start] + [b for b in song_beats if b < cstart] + beatsC
    downs = [d for d in downA if d < song_start] + [d for d in song_down if d < cstart] + downC

    # audio: voces, efectos, música
    voices, sfx, music = [], [], []
    for sq in seqs:
        for ln in sq["items"]["lines"]:
            v = cast[ln["who"]]["voice"]
            whos = v["of"] if v.get("kind") == "duet" else [ln["who"]]
            if ln["kind"] in ("silent", "think", "sing"):
                continue
            for k, w in enumerate(whos):
                vw = cast[w]["voice"]
                for s in ln["syl"]:
                    voices.append({"who": w, "t": round(ln["t0"] + s["t0"] + 0.012 * k, 3), "d": s["d"],
                                   "f0": s.get("f0", vw.get("f0", 400)) * (1 if len(whos) == 1 else vw["f0"] / cast[whos[0]]["voice"]["f0"] if k else 1),
                                   "v": s["v"], "on": s.get("on", "none"), "amp": s["amp"], "kind": ln["kind"],
                                   "bark": s.get("bark", 0), "voice": vw})
        for x in sq["items"]["sfx"]:
            sfx.append(x)
        if sq["transition"]["type"] in TRANS_SFX:
            sfx.append({"name": TRANS_SFX[sq["transition"]["type"]], "t": round(sq["start"] - 0.05, 3)})
        for cd in sq["items"]["cards"]:
            if cd["kind"] == "continuara":
                sfx.append({"name": "campanita", "t": cd["t"]})
        if sq.get("music"):
            music.append({"kind": sq["music"], "start": sq["start"], "end": sq["end"] if sq["id"] != "coche_a" else song_start})
    # la música de la parte A llega hasta el clic del estéreo
    for mu in music:
        if mu["kind"] == "radio":
            mu["end"] = round(song_start, 3)

    out = {
        "duration": duration,
        "song": {"start": round(song_start, 3), "end": round(song_end, 3), "climax": round(climax, 3),
                 "bpm": an["bpm"], "source": an["source"], "dur": an["duration"]},
        "theme_bpm": bpm_a,
        "beats": [round(b, 3) for b in beats],
        "downbeats": [round(d, 3) for d in downs],
        "seqs": seqs,
        "meta": g["meta"],
        "cast": {k: {"name": v["name"]} for k, v in cast.items()},
        "audio": {"voices": voices, "sfx": sorted(sfx, key=lambda x: x["t"]), "music": music},
    }
    (EP / "episode.json").write_text(json.dumps(out, ensure_ascii=False, indent=1))
    (EP / "episode.js").write_text("// GENERADO por tools/build_episode.py — no editar a mano\nwindow.EP = "
                                   + json.dumps(out, ensure_ascii=False, separators=(",", ":")) + ";\nwindow.RIGS = "
                                   + json.dumps(rigs, ensure_ascii=False, separators=(",", ":")) + ";\n")
    print(f"episodio: {duration:.1f}s  (canción {song_start:.2f}→{song_end:.2f}, clímax {climax:.2f})")
    for sq in seqs:
        nl = len(sq["items"]["lines"])
        print(f"  {sq['start']:7.2f} → {sq['end']:7.2f}  {sq['end'] - sq['start']:5.2f}s  {sq['id']:<10} "
              f"{sq['transition']['type']:<9} líneas={nl}")


if __name__ == "__main__":
    main()
