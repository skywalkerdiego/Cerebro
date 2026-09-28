"""Decide cuánto dura cada escena y dónde van los cortes, a partir de la canción.

Entrada: assets/audio/analysis.json (tools/analyze_audio.py) + scenes.json
Salida:  engine/timeline.js  (window.TIMELINE para el motor)
         beat_sheet.md       (tabla escena–tiempo–movimiento, regenerada)

Reglas (programación dinámica sobre los tiempos fuertes candidatos):
- La escena con "anchor": "climax" (el puente, letrero "2 años juntos")
  arranca EXACTAMENTE en el clímax detectado; el retrato final cierra.
- Antes del clímax, los cortes solo caen en tiempos 1 de compás (o en el
  tiempo 3, con una pequeña penalización), y se premia cortar justo en un
  cambio de sección de la canción.
- Duración objetivo de cada escena = peso × largo de plano ideal según la
  energía (energía alta = planos más cortos), normalizado al tramo.
- Cada escena tiene una energía preferida (una escena tranquila como el café
  no debería caer en el coro); la diferencia con la energía real cuesta.
"""
import json
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parent.parent
L_MAX, L_MIN = 6.0, 3.4  # largo de plano ideal (s) con energía 0 y 1


def load():
    an = json.loads((ROOT / "assets" / "audio" / "analysis.json").read_text())
    sc = json.loads((ROOT / "scenes.json").read_text())
    return an, sc


def energy_fn(an):
    t = np.arange(len(an["env30"])) / 30
    e = np.array(an["env30"])
    return lambda a, b: float(e[(t >= a) & (t < b)].mean()) if b > a + 1e-3 else 0.0


def allocate(an, scenes, t0, t1, e_of):
    """Reparte `scenes` en [t0, t1) con cortes en candidatos musicales (DP)."""
    beats = np.array(an["beats"])
    down = set(np.round(an["downbeats"], 3))
    bar = 4 * 60 / an["bpm"]
    cands = []  # (tiempo, costo_extra)
    for i, b in enumerate(beats):
        if not (t0 + 0.9 * bar <= b <= t1 - 0.9 * bar):
            continue
        if round(b, 3) in down:
            cands.append((b, 0.0))
        elif i >= 2 and round(beats[i - 2], 3) in down:  # tiempo 3
            cands.append((b, 0.4))
    sec_starts = [s["start"] for s in an["sections"]]
    pts = [(t0, 0.0)] + cands + [(t1, 0.0)]
    n, m = len(scenes), len(pts)

    def sec_bonus(t):
        d = min(abs(t - s) for s in sec_starts)
        return -2.5 if d < 0.08 else 0.0

    span = t1 - t0
    raw = [s["weight"] * (L_MAX - (L_MAX - L_MIN) * s["energy"]) for s in scenes]
    k = span / sum(raw)
    target = [r * k for r in raw]
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
                if d < 0.95 * bar or d > 4.2 * bar:
                    continue
                e = e_of(tq, tj)
                cost = 6 * ((d - target[i - 1]) / target[i - 1]) ** 2
                cost += 3 * abs(e - s["energy"])
                cost += cj + (sec_bonus(tj) if j != m - 1 else 0)
                # fin de acto en cambio de sección: premio extra
                nxt = scenes[i] if i < n else None
                if nxt and nxt["act"] != s["act"] and sec_bonus(tj) < 0:
                    cost -= 2.0
                c = best[i - 1, q] + cost
                if c < best[i, j]:
                    best[i, j], prev[i, j] = c, q
    if best[n, m - 1] >= INF:
        raise SystemExit("No se pudo repartir las escenas en el tramo; revisa pesos/duración.")
    cuts, j = [], m - 1
    for i in range(n, 0, -1):
        q = prev[i, j]
        cuts.append((pts[q][0], pts[j][0]))
        j = q
    return list(reversed(cuts))


def main():
    an, sc = load()
    scenes = sc["scenes"]
    e_of = energy_fn(an)
    dur = an["duration"]
    climax = an["climax"]
    ai = next(i for i, s in enumerate(scenes) if s.get("anchor") == "climax")
    pre, post = scenes[:ai], scenes[ai:]
    spans = allocate(an, pre, 0.0, climax, e_of)
    # tras el clímax: el puente cubre la sección del clímax, el retrato el resto
    sec = next((s for s in an["sections"] if abs(s["start"] - climax) < 0.1), None)
    bar = 4 * 60 / an["bpm"]
    p_end = sec["end"] if sec else climax + 4 * bar
    p_end = min(max(p_end, climax + 3 * bar), dur - 3 * bar)
    spans += [(climax, p_end), (p_end, dur)]

    beat = 60 / an["bpm"]
    out = []
    for s, (a, b) in zip(scenes, spans):
        e = e_of(a, b)
        # transición: 1 beat si hay energía, 2 si está tranquilo; el puente es corte seco
        tdur = {"flash": 0.0, "none": 0.0}.get(s["transition"], beat * (1 if e > 0.55 else 2))
        out.append({**{k: v for k, v in s.items() if not k.startswith("why")},
                    "start": round(a, 3), "end": round(b, 3), "tdur": round(tdur, 3),
                    "energyReal": round(e, 3)})
    tl = {
        "duration": dur, "bpm": an["bpm"], "beats": an["beats"], "downbeats": an["downbeats"],
        "climax": climax, "env30": an["env30"], "sections": an["sections"],
        "titles": sc["titles"], "acts": sc["acts"], "scenes": out, "source": an["source"],
    }
    (ROOT / "engine").mkdir(exist_ok=True)
    (ROOT / "engine" / "timeline.js").write_text(
        "// generado por tools/build_timeline.py — no editar a mano\nwindow.TIMELINE = "
        + json.dumps(tl, ensure_ascii=False) + ";\n")
    write_beat_sheet(an, sc, out)
    for s in out:
        print(f"{s['id']:9s} {s['start']:6.2f} → {s['end']:6.2f}  ({s['end'] - s['start']:4.2f}s)  "
              f"energía {s['energyReal']:.2f}  entra: {s['transition']}")


def fmt(t):
    return f"{int(t // 60)}:{t % 60:05.2f}"


def write_beat_sheet(an, sc, out):
    why = {s["id"]: s for s in sc["scenes"]}
    acts = sc["acts"]
    lines = [
        "# Beat sheet — escena · tiempo · movimiento",
        "",
        "> **Generado** por `tools/build_timeline.py` a partir de "
        f"`{an['source']}` (tempo {an['bpm']:.1f} BPM, {len(an['beats'])} beats, "
        f"clímax detectado en **{fmt(an['climax'])}**). Si cambia la canción, "
        "este archivo se regenera solo — no editar a mano. Las razones creativas "
        "vienen de `scenes.json`.",
        "",
        "## Estructura detectada de la canción",
        "",
        "| Sección | Inicio | Fin | Compases | Energía |",
        "|---|---|---|---|---|",
    ]
    for i, s in enumerate(an["sections"]):
        mark = " ← **clímax**" if abs(s["start"] - an["climax"]) < 0.1 else ""
        lines.append(f"| {i + 1} | {fmt(s['start'])} | {fmt(s['end'])} | {s['bars']} | "
                     f"{s['energy']:.2f} ({s['level']}){mark} |")
    lines += ["", "## Escenas", "",
              "| # | Acto | Escena | Entra | Sale | Dura | Energía | Transición de entrada | Cámara |",
              "|---|---|---|---|---|---|---|---|---|"]
    for i, s in enumerate(out):
        w = why[s["id"]]
        act = acts.get(str(s["act"]), "Título")
        cam = w.get("why_cam", "Tarjeta de título bordada sobre el tablero de fieltro.")
        tr = s["transition"] + (f" — {w['why_transition']}" if w.get("why_transition") else "")
        lines.append(f"| {i + 1} | {act} | **{s['id']}** | {fmt(s['start'])} | {fmt(s['end'])} | "
                     f"{s['end'] - s['start']:.2f}s | {s['energyReal']:.2f} | {tr} | {cam} |")
    lines += ["", "Formato: `m:ss.cc`. Los cortes caen en tiempo 1 de compás (o tiempo 3); "
              "las transiciones duran 1 beat en tramos intensos y 2 en tramos tranquilos.", ""]
    (ROOT / "beat_sheet.md").write_text("\n".join(lines))


if __name__ == "__main__":
    main()
