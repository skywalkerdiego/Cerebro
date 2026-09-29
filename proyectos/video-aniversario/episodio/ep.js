/* Motor del episodio «Dos años»: las láminas de fieltro se vuelven títeres.
 *
 * Cada escena es la imagen original entera sobre una malla densa (WebGL2).
 * Los "handles" de episodio/rigs.json deforman la malla localmente (cabezas
 * que giran, cuerpos que respiran, mandíbulas que hablan, tarros que
 * brindan), sin recortes ni redibujos: es la misma lámina, animada.
 * Encima van los detalles de fieltro: párpados que parpadean, bocas que se
 * abren, sonrojos, globos de diálogo cosidos, efectos y tarjetas.
 *
 *   window.ready   -> promesa: fuentes, texturas y mallas listas
 *   window.seek(t) -> dibuja el cuadro del segundo t (determinista)
 *
 * URL: format=16x9|9x16, q=draft (media resolución)
 * Datos: window.EP (episodio/episode.js, generado) y window.RIGS.
 */
"use strict";
(function () {
  const EP = window.EP, RIGS = window.RIGS;
  const Q = new URLSearchParams(location.search);
  const V = Q.get("format") === "9x16";
  const W = V ? 1080 : 1920, H = V ? 1920 : 1080;
  const RS = Q.get("q") === "draft" ? 0.5 : 1;
  // escenario: pantalla completa en 16:9; pantalla de tele 4:3 en 9:16
  const ST = V ? { x: 80, y: 560, w: 920, h: 690 } : { x: 0, y: 0, w: 1920, h: 1080 };
  const SW = Math.round(ST.w * RS), SH = Math.round(ST.h * RS);
  const cvs = document.getElementById("c");
  cvs.width = Math.round(W * RS); cvs.height = Math.round(H * RS);
  const out = cvs.getContext("2d");
  const FS = ST.h * 0.052;  // tamaño de letra de los globos

  // ── utilidades ───────────────────────────────────────────────────────
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const lerp = (a, b, t) => a + (b - a) * t;
  const hash = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const strHash = (s) => { let h = 7; for (const c of s) h = (h * 31 + c.charCodeAt(0)) % 100003; return h; };
  const q12 = (t) => Math.floor(t * 12 + 1e-6) / 12;
  const DEG = Math.PI / 180;
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const rgba = (c, a = 1) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`;
  const mixC = (a, b, t) => [0, 1, 2].map((i) => lerp(a[i], b[i], t));
  const mk = (w, h) => { const c = document.createElement("canvas"); c.width = Math.max(1, Math.ceil(w)); c.height = Math.max(1, Math.ceil(h)); return c; };
  const COL = {
    thread: "#b3263a", threadHi: "#e0525f", cream: "#f6ecd6", creamDark: "#dccaa6", ink: "#3a2618",
    teal: "#2f8f8a", mustard: "#e3a52b", pink: "#e0708a", purple: "#7a5aa8", green: "#5f9a4a",
    orange: "#e0763a", sky: "#6fa7d6", red: "#c8323c", plum: "#3a2940",
  };
  const FELT = [COL.teal, COL.mustard, COL.pink, COL.purple, COL.green, COL.orange, COL.sky, COL.red];

  // ── resortes en forma cerrada ────────────────────────────────────────
  function spring(t, zeta, omega) {
    if (t <= 0) return 0;
    if (zeta < 1) {
      const wd = omega * Math.sqrt(1 - zeta * zeta);
      return 1 - Math.exp(-zeta * omega * t) * (Math.cos(wd * t) + ((zeta * omega) / wd) * Math.sin(wd * t));
    }
    return 1 - Math.exp(-omega * t) * (1 + omega * t);
  }
  const crossK = (z) => { const s = Math.sqrt(1 - z * z); return (Math.PI - Math.atan(s / z)) / s; };
  const landing = (t, tLand, zeta) => spring(t, zeta, crossK(zeta) / Math.max(tLand, 1e-3));
  function impulse(t, zeta = 0.3, omega = 22) {
    if (t < 0) return 0;
    const wd = omega * Math.sqrt(1 - zeta * zeta);
    return Math.exp(-zeta * omega * t) * Math.sin(wd * t);
  }
  const settle = (u, dur) => spring(u, 1, 4.8 / Math.max(dur, 0.08));   // llega en ~dur y se asienta

  // ── rejilla musical ──────────────────────────────────────────────────
  const BEATS = EP.beats, DOWNS = EP.downbeats;
  function idxBefore(arr, t) {
    let lo = 0, hi = arr.length - 1, r = -1;
    while (lo <= hi) { const m = (lo + hi) >> 1; if (arr[m] <= t) { r = m; lo = m + 1; } else hi = m - 1; }
    return r;
  }
  function pulse(t, arr, zeta = 0.35, omega = 20, win = 1.0, every = 1, offset = 0) {
    let s = 0;
    for (let i = idxBefore(arr, t - offset); i >= 0 && t - offset - arr[i] < win; i--) if (i % every === 0) s += impulse(t - offset - arr[i], zeta, omega);
    return s;
  }
  const beatLen = (t) => { const i = clamp(idxBefore(BEATS, t), 0, BEATS.length - 2); return BEATS[i + 1] - BEATS[i]; };
  const beatPhase = (t) => { const i = idxBefore(BEATS, t); if (i < 0) return 0; return i + clamp((t - BEATS[i]) / beatLen(t)); };

  // ── recursos ─────────────────────────────────────────────────────────
  const IMG = {};
  function loadImage(key, src) {
    return new Promise((res, rej) => {
      const im = new Image();
      im.onload = () => { IMG[key] = im; (im.decode ? im.decode() : Promise.resolve()).then(res, res); };
      im.onerror = () => rej(new Error("no cargó " + src));
      im.src = src;
    });
  }
  let FIBER, GRAIN = [], VIGNETTE, YARN, TVBACK, TVFRONT, BOARD = {};
  function buildFibers() {
    const N = 512, c = mk(N, N), g = c.getContext("2d"), r = mulberry32(7);
    for (let i = 0; i < 6500; i++) {
      const x = r() * N, y = r() * N, a = r() * Math.PI * 2, L = 3 + r() * 13, b = (r() - 0.5) * 6;
      g.strokeStyle = r() < 0.5 ? `rgba(255,255,255,${0.04 + r() * 0.07})` : `rgba(0,0,0,${0.05 + r() * 0.08})`;
      g.lineWidth = 0.5 + r() * 1.1;
      for (const ox of [-N, 0, N]) for (const oy of [-N, 0, N]) {
        const X = x + ox, Y = y + oy;
        if (X < -20 || X > N + 20 || Y < -20 || Y > N + 20) continue;
        const x2 = X + Math.cos(a) * L, y2 = Y + Math.sin(a) * L;
        g.beginPath(); g.moveTo(X, Y); g.quadraticCurveTo((X + x2) / 2 + b, (Y + y2) / 2 - b, x2, y2); g.stroke();
      }
    }
    return c;
  }
  function buildGrain() {
    const outs = [];
    for (let k = 0; k < 3; k++) {
      const c = mk(W / 2, H / 2), g = c.getContext("2d"), d = g.createImageData(c.width, c.height), r = mulberry32(100 + k);
      for (let i = 0; i < d.data.length; i += 4) { const v = 128 + (r() - 0.5) * 70; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255; }
      g.putImageData(d, 0, 0); outs.push(c);
    }
    return outs;
  }
  function buildVignette(w, h, a = 0.5) {
    const c = mk(w, h), g = c.getContext("2d");
    const gr = g.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.38, w / 2, h / 2, Math.hypot(w, h) * 0.6);
    gr.addColorStop(0, "rgba(0,0,0,0)"); gr.addColorStop(1, `rgba(0,0,0,${a})`);
    g.fillStyle = gr; g.fillRect(0, 0, w, h); return c;
  }
  function buildYarn() {
    const c = mk(12, 12), g = c.getContext("2d");
    g.strokeStyle = "rgba(255,255,255,0.35)"; g.lineWidth = 2.2;
    for (const o of [-12, 0, 12]) { g.beginPath(); g.moveTo(o, 12); g.lineTo(o + 12, 0); g.stroke(); }
    g.strokeStyle = "rgba(0,0,0,0.25)"; g.lineWidth = 1.2;
    for (const o of [-6, 6, 18]) { g.beginPath(); g.moveTo(o, 12); g.lineTo(o + 12, 0); g.stroke(); }
    return c;
  }
  function roundRect(g, x, y, w, h, r, begin = true) {
    r = Math.min(r, w / 2, h / 2);
    if (begin) g.beginPath();
    g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r);
    g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath();
  }
  // tablero de fieltro acolchado (fondo de tarjetas y del 9:16)
  function buildBoard(w, h, base, seed) {
    const c = mk(w, h), g = c.getContext("2d"), r = mulberry32(seed);
    g.fillStyle = base; g.fillRect(0, 0, w, h);
    g.fillStyle = g.createPattern(FIBER, "repeat"); g.fillRect(0, 0, w, h);
    const cols = Math.max(2, Math.round(w / 420)), rows = Math.max(2, Math.round(h / 420));
    const P = [];
    for (let j = 0; j <= rows; j++) {
      P[j] = [];
      for (let i = 0; i <= cols; i++) {
        const jx = i > 0 && i < cols ? (r() - 0.5) * (w / cols) * 0.35 : 0, jy = j > 0 && j < rows ? (r() - 0.5) * (h / rows) * 0.35 : 0;
        P[j][i] = [(i * w) / cols + jx, (j * h) / rows + jy];
      }
    }
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const q = [P[j][i], P[j][i + 1], P[j + 1][i + 1], P[j + 1][i]], v = r() - 0.5;
      g.fillStyle = v > 0 ? `rgba(255,255,255,${v * 0.1})` : `rgba(0,0,0,${-v * 0.14})`;
      g.beginPath(); q.forEach((p, k) => (k ? g.lineTo(...p) : g.moveTo(...p))); g.closePath(); g.fill();
    }
    const seam = (a, b) => {
      g.setLineDash([]); g.lineWidth = 5; g.strokeStyle = "rgba(0,0,0,0.22)";
      g.beginPath(); g.moveTo(...a); g.lineTo(...b); g.stroke();
      const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L;
      g.setLineDash([9, 9]); g.lineWidth = 2.2; g.strokeStyle = "rgba(255,240,220,0.16)";
      for (const s of [-9, 9]) { g.beginPath(); g.moveTo(a[0] + nx * s, a[1] + ny * s); g.lineTo(b[0] + nx * s, b[1] + ny * s); g.stroke(); }
    };
    for (let j = 1; j < rows; j++) for (let i = 0; i < cols; i++) seam(P[j][i], P[j][i + 1]);
    for (let j = 0; j < rows; j++) for (let i = 1; i < cols; i++) seam(P[j][i], P[j + 1][i]);
    g.setLineDash([]);
    g.drawImage(buildVignette(w, h, 0.45), 0, 0);
    return c;
  }

  // ── tipografía de fieltro (del motor v1) ─────────────────────────────
  const TXT = new Map();
  function feltText(o) {
    const key = JSON.stringify(o);
    if (TXT.has(key)) return TXT.get(key);
    const { text, size, colors, thread = COL.cream, family = "Fredoka", weight = 600, spacing = 0.03, seed = 1, v = 0 } = o;
    const r = mulberry32(seed * 131 + v * 7);
    const font = `${weight} ${size}px ${family}`;
    const m = mk(8, 8).getContext("2d"); m.font = font;
    const chars = [...text];
    const adv = chars.map((ch) => m.measureText(ch).width + size * spacing);
    const textW = adv.reduce((a, b) => a + b, 0) - size * spacing;
    const pad = Math.ceil(size * 0.4), cw = textW + pad * 2, ch = size * 1.5 + pad * 2, base = pad + size * 1.05;
    const place = []; let x = pad;
    chars.forEach((c, i) => { place.push({ c, x, w: m.measureText(c).width, rot: (r() - 0.5) * 0.08, dy: (r() - 0.5) * size * 0.05, col: colors[i % colors.length] }); x += adv[i]; });
    const each = (g, fn) => place.forEach((p) => { if (p.c === " ") return; g.save(); g.translate(p.x + p.w / 2, base + p.dy); g.rotate(p.rot); g.translate(-p.w / 2, 0); g.font = font; fn(g, p); g.restore(); });
    const G = mk(cw, ch), g = G.getContext("2d");
    each(g, (gg, p) => { gg.fillStyle = p.col; gg.fillText(p.c, 0, 0); });
    g.globalCompositeOperation = "source-atop";
    g.fillStyle = g.createPattern(FIBER, "repeat"); g.fillRect(0, 0, cw, ch);
    const gr = g.createLinearGradient(0, base - size * 0.85, 0, base + size * 0.15);
    gr.addColorStop(0, "rgba(255,255,255,0.20)"); gr.addColorStop(0.5, "rgba(255,255,255,0)"); gr.addColorStop(1, "rgba(0,0,0,0.22)");
    g.fillStyle = gr; g.fillRect(0, 0, cw, ch);
    g.globalCompositeOperation = "source-over";
    const inset = size * 0.075, tw = Math.max(1.3, size * 0.03);
    const A = mk(cw, ch), a = A.getContext("2d");
    each(a, (gg, p) => { gg.fillStyle = "#000"; gg.fillText(p.c, 0, 0); });
    const B = mk(cw, ch), b = B.getContext("2d");
    each(b, (gg, p) => {
      gg.setLineDash([size * 0.085, size * 0.06]); gg.lineDashOffset = v * size * 0.03;
      gg.lineCap = "round"; gg.lineJoin = "round"; gg.strokeStyle = thread; gg.lineWidth = 2 * (inset + tw); gg.strokeText(p.c, 0, 0);
    });
    a.globalCompositeOperation = "source-in"; a.drawImage(B, 0, 0);
    a.globalCompositeOperation = "destination-out";
    each(a, (gg, p) => { gg.lineJoin = "round"; gg.lineWidth = 2 * inset; gg.strokeStyle = "#000"; gg.strokeText(p.c, 0, 0); });
    g.save(); g.globalAlpha = 0.5; g.filter = "brightness(0)"; g.drawImage(A, size * 0.01, size * 0.016); g.restore();
    g.drawImage(A, 0, 0);
    const F = mk(cw, ch), f = F.getContext("2d");
    f.save(); f.filter = "brightness(0.5)"; f.drawImage(G, 0, size * 0.035); f.restore();
    f.save(); f.shadowColor = "rgba(0,0,0,0.45)"; f.shadowBlur = size * 0.09; f.shadowOffsetY = size * 0.06; f.drawImage(G, 0, 0); f.restore();
    F.meta = { pad, base, textW, place };
    TXT.set(key, F);
    return F;
  }
  function threadText(o) {
    const key = "T" + JSON.stringify(o);
    if (TXT.has(key)) return TXT.get(key);
    const { text, size, color = COL.cream, family = "Dancing", weight = 700 } = o;
    const font = `${weight} ${size}px ${family}`;
    const m = mk(8, 8).getContext("2d"); m.font = font;
    const tw = m.measureText(text).width, pad = size * 0.5;
    const C = mk(tw + pad * 2, size * 1.6 + pad * 2), g = C.getContext("2d");
    const base = pad + size * 1.1;
    g.font = font; g.fillStyle = color; g.fillText(text, pad, base);
    g.globalCompositeOperation = "source-atop";
    const pat = g.createPattern(YARN, "repeat"); pat.setTransform(new DOMMatrix().scale(size / 60));
    g.fillStyle = pat; g.fillRect(0, 0, C.width, C.height);
    const F = mk(C.width, C.height), f = F.getContext("2d");
    f.shadowColor = "rgba(0,0,0,0.5)"; f.shadowBlur = size * 0.12; f.shadowOffsetY = size * 0.06;
    f.drawImage(C, 0, 0);
    F.meta = { pad, base, textW: tw };
    TXT.set(key, F);
    return F;
  }
  function feltTag(o) {
    const key = "G" + JSON.stringify(o);
    if (TXT.has(key)) return TXT.get(key);
    const { text, size, bg, fg = COL.ink, family = "Fredoka", weight = 600 } = o;
    const font = `${weight} ${size}px ${family}`;
    const m = mk(8, 8).getContext("2d"); m.font = font;
    const tw = m.measureText(text).width;
    const w = tw + size * 1.6, h = size * 1.95, pad = size * 0.5;
    const C = mk(w + pad * 2, h + pad * 2), g = C.getContext("2d");
    g.translate(pad, pad);
    roundRect(g, 0, 0, w, h, h * 0.28); g.fillStyle = bg; g.fill();
    g.save(); g.clip(); g.fillStyle = g.createPattern(FIBER, "repeat"); g.fillRect(0, 0, w, h); g.restore();
    g.setLineDash([size * 0.3, size * 0.22]); g.lineWidth = Math.max(1.5, size * 0.07); g.strokeStyle = COL.thread;
    roundRect(g, size * 0.22, size * 0.22, w - size * 0.44, h - size * 0.44, h * 0.2); g.stroke();
    g.setLineDash([]);
    g.textAlign = "center"; g.textBaseline = "middle"; g.font = font; g.fillStyle = fg;
    g.fillText(text, w / 2, h / 2 + size * 0.05);
    const F = mk(C.width, C.height), f = F.getContext("2d");
    f.shadowColor = "rgba(0,0,0,0.45)"; f.shadowBlur = size * 0.3; f.shadowOffsetY = size * 0.14; f.drawImage(C, 0, 0);
    F.meta = { w, h, pad };
    TXT.set(key, F);
    return F;
  }
  // texto de fieltro con letras que caen y rebotan (aparición en tShow)
  function drawFeltWord(g, o, x, y, tShow, t, opts = {}) {
    const v = Math.floor(t * 12) % 3;
    const F = feltText({ ...o, v });
    const { pad, base, place, textW } = F.meta;
    const x0 = x - textW / 2 - pad, y0 = y - base + o.size * 0.36;
    const stagger = opts.stagger ?? 0.055;
    place.forEach((p, i) => {
      if (p.c === " ") return;
      const u = t - (tShow + i * stagger);
      if (u <= -0.3) return;
      const s = landing(u + 0.3, 0.3, 0.55);
      const lx = x0 + p.x - o.size * 0.12, lw = p.w + o.size * 0.24;
      g.save();
      g.globalAlpha *= clamp(u / 0.12 + 2.5);
      g.translate(lx + lw / 2, y0 + base);
      g.translate(0, -(1 - s) * o.size * 1.4);
      g.rotate((1 - s) * (hash(i + (o.seed || 1)) - 0.5) * 0.9);
      g.drawImage(F, lx - x0, 0, lw, F.height, -lw / 2, -base, lw, F.height);
      g.restore();
    });
  }
  function drawSewn(g, o, x, y, t0, t, dur = 0.9) {
    const F = threadText(o);
    const { pad, base, textW } = F.meta;
    const p = clamp((t - t0) / dur);
    if (p <= 0) return;
    const pp = spring(p * dur, 1, 6 / dur) / spring(dur, 1, 6 / dur);
    const x0 = x - textW / 2 - pad, y0 = y - base + o.size * 0.35;
    const cut = pad + textW * pp + o.size * 0.2;
    g.drawImage(F, 0, 0, cut, F.height, x0, y0, cut, F.height);
    if (p < 1) {
      const nx = x0 + cut, ny = y0 + base - o.size * 0.3;
      g.save(); g.translate(nx, ny); g.rotate(-0.6 + Math.sin(t * 30) * 0.08);
      const L = o.size * 1.2;
      const gr = g.createLinearGradient(0, 0, L, 0); gr.addColorStop(0, "#fafafa"); gr.addColorStop(1, "#8d8f96");
      g.fillStyle = gr; g.beginPath(); g.moveTo(0, 0); g.lineTo(L, -o.size * 0.05); g.lineTo(L, o.size * 0.05); g.closePath(); g.fill();
      g.strokeStyle = COL.thread; g.lineWidth = 2; g.beginPath(); g.moveTo(L * 0.92, 0);
      g.quadraticCurveTo(L * 1.3, o.size * 0.5, L * 0.6, o.size * 0.8); g.stroke();
      g.restore();
    }
  }
  function heartPath(g, s) {
    g.beginPath(); g.moveTo(0, s * 0.35);
    g.bezierCurveTo(-s * 0.9, -s * 0.25, -s * 0.35, -s * 0.9, 0, -s * 0.38);
    g.bezierCurveTo(s * 0.35, -s * 0.9, s * 0.9, -s * 0.25, 0, s * 0.35); g.closePath();
  }
  function feltHeart(g, s, col) {
    heartPath(g, s); g.fillStyle = col; g.fill();
    g.save(); g.clip(); g.fillStyle = g.createPattern(FIBER, "repeat"); g.fillRect(-s, -s, 2 * s, 2 * s); g.restore();
    g.strokeStyle = "rgba(255,245,230,0.65)"; g.lineWidth = s * 0.06; g.setLineDash([s * 0.13, s * 0.1]);
    g.save(); g.scale(0.72, 0.72); g.translate(0, s * 0.02); heartPath(g, s); g.restore(); g.stroke(); g.setLineDash([]);
  }
  function noteShape(g, s, col, flag) {
    g.fillStyle = col; g.strokeStyle = "rgba(0,0,0,0.35)"; g.lineWidth = s * 0.06;
    g.save(); g.rotate(-0.35); g.beginPath(); g.ellipse(0, 0, s * 0.34, s * 0.25, 0, 0, Math.PI * 2); g.fill(); g.stroke(); g.restore();
    g.fillRect(s * 0.26, -s * 1.05, s * 0.1, s * 1.05);
    if (flag) { g.beginPath(); g.moveTo(s * 0.36, -s * 1.05); g.quadraticCurveTo(s * 0.8, -s * 0.8, s * 0.62, -s * 0.4); g.quadraticCurveTo(s * 0.62, -s * 0.72, s * 0.36, -s * 0.72); g.fill(); }
    g.setLineDash([s * 0.08, s * 0.07]); g.strokeStyle = "rgba(255,245,230,0.7)"; g.lineWidth = s * 0.035;
    g.beginPath(); g.ellipse(0, 0, s * 0.2, s * 0.13, -0.35, 0, Math.PI * 2); g.stroke(); g.setLineDash([]);
  }
  function leafPath(g, s) { g.beginPath(); g.moveTo(-s, 0); g.quadraticCurveTo(0, -s * 0.55, s, 0); g.quadraticCurveTo(0, s * 0.55, -s, 0); g.closePath(); }
  function glow(g, x, y, r, col, a) {
    if (r <= 0 || a <= 0) return;
    const gr = g.createRadialGradient(x, y, 0, x, y, r);
    gr.addColorStop(0, rgba(col, a)); gr.addColorStop(1, rgba(col, 0));
    g.fillStyle = gr; g.fillRect(x - r, y - r, r * 2, r * 2);
  }

  // ── WebGL2: la lámina como malla deformable ──────────────────────────
  const MAXH = 24;
  const glc = mk(SW, SH);
  const gl = glc.getContext("webgl2", { preserveDrawingBuffer: true, premultipliedAlpha: false, antialias: true, alpha: false });
  if (!gl) throw new Error("WebGL2 no disponible");
  const VS = `#version 300 es
  precision highp float;
  in vec2 a_uv;
  uniform vec2 u_raw; uniform vec3 u_cam; uniform vec2 u_stage; uniform vec2 u_shift;
  uniform int u_n;
  uniform vec4 u_A[${MAXH}]; uniform vec4 u_B[${MAXH}]; uniform vec4 u_C[${MAXH}]; uniform vec4 u_D[${MAXH}]; uniform vec4 u_E[${MAXH}];
  // compuerta (u_E): 1 = solo debajo de y, 2 = solo a la izquierda de x, 3 = solo a la derecha de x
  float gate(vec4 E, vec2 p) {
    if (E.x < 0.5) return 1.;
    if (E.x < 1.5) return smoothstep(E.y - E.z, E.y + E.z, p.y);
    if (E.x < 2.5) return 1. - smoothstep(E.y - E.z, E.y + E.z, p.x);
    return smoothstep(E.y - E.z, E.y + E.z, p.x);
  }
  out vec2 v_uv;
  float segDist(vec2 p, vec2 a, vec2 b) { vec2 ab = b - a; float h = clamp(dot(p - a, ab) / dot(ab, ab), 0., 1.); return length(p - a - ab * h); }
  void main() {
    vec2 p = a_uv * u_raw;
    vec2 d = vec2(0.);
    for (int i = 0; i < ${MAXH}; i++) {
      if (i >= u_n) break;
      vec4 A = u_A[i], B = u_B[i], C = u_C[i], D = u_D[i];
      float dist = B.z < -9999. ? length(p - A.xy) : segDist(p, A.xy, B.zw);
      float w = (1. - smoothstep(A.z, A.w, dist)) * gate(u_E[i], p);
      if (w <= 0.) continue;
      vec2 q = (p - B.xy) * vec2(1. + C.y, 1. + C.z);
      float cs = cos(C.x), sn = sin(C.x);
      q = vec2(cs * q.x - sn * q.y, sn * q.x + cs * q.y) + B.xy + D.xy;
      d += w * (q - p);
    }
    vec2 sp = (p + d - u_cam.xy) * u_cam.z + 0.5 * u_stage + u_shift;
    gl_Position = vec4(sp.x / u_stage.x * 2. - 1., 1. - sp.y / u_stage.y * 2., 0., 1.);
    v_uv = a_uv;
  }`;
  const FSH = `#version 300 es
  precision highp float;
  in vec2 v_uv; uniform sampler2D u_tex; uniform float u_past; uniform float u_bright; out vec4 o;
  void main() {
    vec3 c = texture(u_tex, v_uv).rgb;
    float l = dot(c, vec3(.299, .587, .114));
    vec3 sep = vec3(l * 1.06 + .05, l * .98 + .035, l * .84 + .02);
    c = mix(c, mix(c, sep, .5) * .9 + .07, u_past);
    o = vec4(c * u_bright, 1.);
  }`;
  function compile(type, src) {
    const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  }
  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VS)); gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FSH));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
  gl.useProgram(prog);
  const U = {};
  for (const n of ["u_raw", "u_cam", "u_stage", "u_shift", "u_n", "u_A", "u_B", "u_C", "u_D", "u_E", "u_tex", "u_past", "u_bright"]) U[n] = gl.getUniformLocation(prog, n);
  const aUV = gl.getAttribLocation(prog, "a_uv");
  gl.uniform2f(U.u_stage, ST.w, ST.h);
  gl.uniform1i(U.u_tex, 0);

  function makeGrid(cols, rows) {
    const vao = gl.createVertexArray(); gl.bindVertexArray(vao);
    const v = new Float32Array((cols + 1) * (rows + 1) * 2);
    let k = 0;
    for (let j = 0; j <= rows; j++) for (let i = 0; i <= cols; i++) { v[k++] = i / cols; v[k++] = j / rows; }
    const idx = new Uint32Array(cols * rows * 6);
    k = 0;
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const a = j * (cols + 1) + i, b = a + 1, c = a + cols + 1, d = c + 1;
      idx[k++] = a; idx[k++] = b; idx[k++] = c; idx[k++] = b; idx[k++] = d; idx[k++] = c;
    }
    const vb = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, vb); gl.bufferData(gl.ARRAY_BUFFER, v, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(aUV); gl.vertexAttribPointer(aUV, 2, gl.FLOAT, false, 0, 0);
    const ib = gl.createBuffer(); gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, idx, gl.STATIC_DRAW);
    gl.bindVertexArray(null);
    return { vao, n: idx.length };
  }
  function texFrom(src, mip = true) {
    const t = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, t);
    gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, gl.NONE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src);
    if (mip) gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, mip ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    const ext = gl.getExtension("EXT_texture_filter_anisotropic");
    if (ext && mip) gl.texParameterf(gl.TEXTURE_2D, ext.TEXTURE_MAX_ANISOTROPY_EXT, 4);
    return t;
  }

  // ── escenas: textura, malla, rig ─────────────────────────────────────
  const SCN = {};
  const CELL = RS < 1 ? 3 : 2;  // px de lámina por celda de malla
  function prepScene(id) {
    const rig = RIGS[id], im = IMG[id];
    const [rw, rh] = rig.raw;
    const k = im.naturalWidth / rw;
    const S = { id, rig, rw, rh, k, tex: texFrom(im), grid: makeGrid(Math.ceil(rw / CELL), Math.ceil(rh / CELL)) };
    // fondo desenfocado para cuando el encuadre no llena (pillarbox / letterbox)
    const b = mk(Math.round(rw / 3), Math.round(rh / 3)), bg = b.getContext("2d");
    bg.filter = "blur(5px) saturate(0.9)"; bg.drawImage(im, -8, -8, b.width + 16, b.height + 16);
    S.blur = texFrom(b, false);
    // lista fija de handles -> uniformes estáticos
    // parpadeo: cada ojo es un handle que se aplasta verticalmente (el ojo de botón se vuelve una rayita)
    (rig.eyes || []).forEach((e, i) => {
      const R = Math.max(e.rx, e.ry);
      rig.handles["eye" + i] = { type: "scale", c: e.c, r0: R * 1.15, r1: R * 2.3, pivot: e.c, blink: e.who };
    });
    S.hnames = Object.keys(rig.handles);
    S.A = new Float32Array(MAXH * 4); S.B = new Float32Array(MAXH * 4); S.E = new Float32Array(MAXH * 4);
    // mandíbulas: solo se mueve lo que está debajo de la línea de la boca (labio de abajo y barbilla)
    for (const ch of Object.values(rig.chars || {})) {
      if (!ch.jaw || !rig.handles[ch.jaw] || rig.handles[ch.jaw].gate) continue;
      const jh = rig.handles[ch.jaw], hr = rig.handles[ch.head] ? rig.handles[ch.head].r0 : 20;
      const mw = ch.mouth ? ch.mouth.w : hr * 0.78, y0 = ch.mouth ? ch.mouth.c[1] : jh.c[1];
      rig.handles[ch.jaw] = { type: "move", c: [jh.c[0], y0 + mw * 0.25], r0: mw * 0.45, r1: mw * 0.95, gate: { axis: "y>", at: y0 - mw * 0.02, soft: Math.max(0.8, mw * 0.06) } };
    }
    S.hnames.forEach((n, i) => {
      const h = rig.handles[n];
      const c = h.seg ? h.seg[0] : h.c, piv = h.pivot || (h.seg ? h.seg[0] : h.c);
      S.A.set([c[0], c[1], h.r0, h.r1], i * 4);
      S.B.set([piv[0], piv[1], h.seg ? h.seg[1][0] : -1e5, h.seg ? h.seg[1][1] : -1e5], i * 4);
      if (h.gate) S.E.set([{ "y>": 1, "x<": 2, "x>": 3 }[h.gate.axis] || 0, h.gate.at, h.gate.soft || 1.5, 0], i * 4);
    });
    // colores muestreados (piel alrededor de los ojos, boca) para párpados y bocas
    const sc = mk(im.naturalWidth, im.naturalHeight), sg = sc.getContext("2d", { willReadFrequently: true });
    sg.drawImage(im, 0, 0);
    const px = (x, y) => { const d = sg.getImageData(Math.round(x * k), Math.round(y * k), 1, 1).data; return [d[0], d[1], d[2]]; };
    const median = (arr) => [0, 1, 2].map((c) => arr.map((a) => a[c]).sort((p, q) => p - q)[arr.length >> 1]);
    S.eyes = (rig.eyes || []).map((e) => {
      const pts = [[-1.8, 0], [1.8, 0], [0, 2.0], [0, -2.0], [-1.3, 1.5], [1.3, 1.5], [0, 2.6]].map(([a, b2]) => px(e.c[0] + a * e.rx, e.c[1] + b2 * e.ry));
      return { ...e, skin: median(pts) };
    });
    S.mouths = {};
    for (const [who, ch] of Object.entries(rig.chars || {})) {
      if (!ch.mouth) continue;
      const m = ch.mouth, samples = [];
      for (let dx = -0.3; dx <= 0.3; dx += 0.15) for (let dy = -2; dy <= 2; dy++) samples.push(px(m.c[0] + dx * m.w, m.c[1] + dy));
      samples.sort((p, q) => p[0] + p[1] + p[2] - (q[0] + q[1] + q[2]));
      const dark = samples[1];
      S.mouths[who] = { ...m, dark, skin: px(m.c[0], m.c[1] + m.w * 0.55) };
    }
    SCN[id] = S;
  }

  // ── rig en tiempo t: idle + loops + habla + acciones ─────────────────
  const CHAR_OF = (h) => h.split("_")[0];
  function envAct(a, t) {
    const u = t - a.t, dur = a.dur ?? 0.6;
    switch (a.env) {
      case "hold": return settle(u, 0.28) - settle(u - dur, 0.32);
      case "stay": return settle(u, dur);
      case "osc": return u < 0 || u > dur ? 0 : Math.sin((2 * Math.PI * (a.n || 2) * u) / dur) * Math.pow(Math.sin((Math.PI * u) / dur), 0.6);
      case "pulse": return impulse(u, 0.28, 17) * 1.35;
      default: return 0;
    }
  }
  function speaking(seq, who, t) {  // apertura de boca 0..1 (a 12 fps, como stop-motion)
    const tq = q12(t);
    let o = 0;
    for (const ln of seq.items.lines) {
      if (tq < ln.t0 - 0.05 || tq > ln.t0 + ln.speech + 0.1) continue;
      const mine = ln.who === who || (ln.who === "ambos" && (who === "diego" || who === "fanny"));
      if (!mine || ln.kind === "think" || ln.kind === "silent") continue;
      for (const s of ln.syl) {
        const u = tq - (ln.t0 + s.t0);
        if (u >= 0 && u < s.d) o = Math.max(o, Math.pow(Math.sin((Math.PI * u) / s.d), 0.6) * s.amp);
      }
    }
    return o;
  }
  function rigState(seq, S, t) {
    const rig = S.rig, P = {};
    for (const n of S.hnames) P[n] = { rot: 0, sx: 0, sy: 0, dx: 0, dy: 0 };
    const add = (n, o, k = 1) => { const p = P[n]; if (!p) return; p.rot += (o.rot || 0) * k; p.sx += ((o.sx || 0) + (o.s || 0)) * k; p.sy += ((o.sy || 0) + (o.s || 0)) * k; p.dx += (o.dx || 0) * k; p.dy += (o.dy || 0) * k; };
    const talk = {};
    for (const [who, ch] of Object.entries(rig.chars || {})) {
      const ph = hash(strHash(who + S.id));
      if (ch.body && P[ch.body]) {
        const b = Math.sin(2 * Math.PI * (t / 3.3 + ph));
        if (rig.handles[ch.body].type === "rot") add(ch.body, { rot: 0.6 * b });
        else add(ch.body, { sy: 0.011 * b, sx: 0.004 * b });
      }
      const o = speaking(seq, who, t);
      talk[who] = o;
      if (ch.head && P[ch.head]) {
        const sway = 0.8 * Math.sin(2 * Math.PI * (t / 4.7 + ph)) + 0.35 * Math.sin(2 * Math.PI * (t / 2.1 + ph * 3));
        add(ch.head, { rot: sway + (who === "diego" ? 1 : -1) * 1.6 * o, dy: -0.6 * o });
      }
      if (ch.jaw && P[ch.jaw]) add(ch.jaw, { dy: (ch.jawAmp || 3) * 1.1 * o });
    }
    for (const L of rig.loops || []) {
      if (!P[L.h]) continue;
      if (L.kind === "beat") {
        const k = clamp(pulse(t, BEATS, 0.4, 16, 0.9, L.every || 1, (L.offset || 0) * beatLen(t)), -1, 1.4);
        add(L.h, L, k);
      } else if (L.kind === "sin") {
        const per = L.beats ? L.beats * beatLen(t) : L.period || 2;
        const ph = L.beats ? (beatPhase(t) / L.beats) * 2 * Math.PI : (2 * Math.PI * t) / per;
        add(L.h, L, Math.sin(ph + (L.phase || 0)));
      } else if (L.kind === "circle") {
        const a = (2 * Math.PI * t) / (L.period || 1.2);
        add(L.h, { dx: L.r * Math.cos(a), dy: L.r * Math.sin(a) });
      }
    }
    for (const n of S.hnames) { const h = rig.handles[n]; if (h.blink) P[n].sy -= 0.93 * blinkAmount(h.blink + S.id.length, t); }
    const clinkT = (seq.items.lines.find((l) => l.clink) || {}).t0;
    for (const a of seq.items.acts) {
      if (!P[a.h]) continue;
      if (a.env === "clink") {  // los tarros bajan un poquito y suben juntos justo en el "¡Salud!"
        const tc = clinkT ?? a.t + 2, u = t - tc;
        const pre = u > -0.45 && u < 0 ? Math.sin((Math.PI * (u + 0.45)) / 0.45) : 0;
        add(a.h, { dy: a.dy, rot: a.rot || 0 }, 0.35 * pre - 1.4 * impulse(u, 0.3, 13));
        continue;
      }
      add(a.h, a, envAct(a, t));
    }
    return { P, talk };
  }
  function uniformsFor(S, P) {
    const C = new Float32Array(MAXH * 4), D = new Float32Array(MAXH * 4);
    S.hnames.forEach((n, i) => { const p = P[n]; C.set([p.rot * DEG, p.sx, p.sy, 0], i * 4); D.set([p.dx, p.dy, 0, 0], i * 4); });
    return { C, D };
  }
  // la misma deformación en JS (para anclar globos, párpados, bocas y efectos)
  function warp(S, P, x, y) {
    let dx = 0, dy = 0;
    S.hnames.forEach((n, i) => {
      const A = S.A, B = S.B, o = i * 4;
      let dist;
      if (B[o + 2] < -9999) dist = Math.hypot(x - A[o], y - A[o + 1]);
      else {
        const ax = A[o], ay = A[o + 1], bx = B[o + 2], by = B[o + 3], abx = bx - ax, aby = by - ay;
        const h = clamp(((x - ax) * abx + (y - ay) * aby) / (abx * abx + aby * aby));
        dist = Math.hypot(x - ax - abx * h, y - ay - aby * h);
      }
      const r0 = A[o + 2], r1 = A[o + 3];
      const e = clamp((dist - r0) / (r1 - r0));
      let w = 1 - e * e * (3 - 2 * e);
      const E = S.E, ga = E[o];
      if (ga > 0.5) {
        const v = ga < 1.5 ? y : x, g0 = clamp((v - (E[o + 1] - E[o + 2])) / (2 * E[o + 2] || 1));
        const gs = g0 * g0 * (3 - 2 * g0);
        w *= ga > 1.5 && ga < 2.5 ? 1 - gs : gs;
      }
      if (w <= 0) return;
      const p = P[n], px = B[o], py = B[o + 1];
      let qx = (x - px) * (1 + p.sx), qy = (y - py) * (1 + p.sy);
      const cs = Math.cos(p.rot * DEG), sn = Math.sin(p.rot * DEG);
      const rx = cs * qx - sn * qy + px + p.dx, ry = sn * qx + cs * qy + py + p.dy;
      dx += w * (rx - x); dy += w * (ry - y);
    });
    return [x + dx, y + dy];
  }
  // giro local (para orientar párpados/bocas con la cabeza)
  function localRot(S, P, x, y) {
    const a = warp(S, P, x - 3, y), b = warp(S, P, x + 3, y);
    return Math.atan2(b[1] - a[1], b[0] - a[0]);
  }

  // ── cámara ───────────────────────────────────────────────────────────
  function frameCam(S, f) {
    const fit = (V && f.fit9) || f.fit || "cover", z = (V && f.z9) || f.z || 1;
    const base = fit === "contain" ? Math.min(ST.w / S.rw, ST.h / S.rh) : Math.max(ST.w / S.rw, ST.h / S.rh);
    const s = base * z;
    let cx = f.x * S.rw, cy = f.y * S.rh;
    const hw = ST.w / 2 / s, hh = ST.h / 2 / s;
    cx = S.rw >= 2 * hw ? clamp(cx, hw, S.rw - hw) : S.rw / 2;
    cy = S.rh >= 2 * hh ? clamp(cy, hh, S.rh - hh) : S.rh / 2;
    return { cx, cy, ls: Math.log(s) };
  }
  function camAt(seq, S, t) {
    const frames = S.rig.frames, cams = seq.items.cams;
    const F = (name) => frameCam(S, typeof name === "string" ? frames[name] || frames.wide || Object.values(frames)[0] : name);
    let cur = F(cams.length ? cams[0].frame : "wide");
    let from = cur, to = cur, tm = seq.start, dur = 0.01, lastCut = seq.start;
    const evalMove = (tt) => { const p = settle(tt - tm, dur); return { cx: lerp(from.cx, to.cx, p), cy: lerp(from.cy, to.cy, p), ls: lerp(from.ls, to.ls, p) }; };
    for (const e of cams) {
      if (e.t > t) break;
      const target = F(e.frame);
      if (e.cut) { from = to = target; tm = e.t; dur = 0.01; lastCut = e.t; }
      else { from = evalMove(e.t); to = target; tm = e.t; dur = e.move; }
    }
    const c = evalMove(t);
    // vida: un push-in muy lento desde el último corte y un pulso de mano casi imperceptible
    const push = 1 + 0.025 * (1 - Math.exp(-(t - lastCut) / 6));
    const s = Math.exp(c.ls) * push;
    const hx = (Math.sin(t * 0.63) + 0.5 * Math.sin(t * 1.37 + 1)) * 0.9 / s, hy = (Math.sin(t * 0.51 + 2) + 0.5 * Math.sin(t * 1.19)) * 0.7 / s;
    return { cx: c.cx + hx, cy: c.cy + hy, s };
  }

  // ── efectos de escena ────────────────────────────────────────────────
  // v: vista de la lámina en coordenadas de escenario; map(nx, ny) lámina normalizada -> escenario
  const FX = {
    polvo_luz(g, f, t, v) {
      g.save(); g.globalCompositeOperation = "lighter";
      for (let i = 0; i < 30; i++) {
        const x = v.x0 + v.w * ((((hash(i) + Math.sin(t * 0.21 + i) * 0.03 + t * 0.004 * (hash(i * 5) - 0.5)) % 1) + 1) % 1);
        const y = v.y0 + v.h * ((((hash(i * 2.3) - t * 0.012 * (0.5 + hash(i * 9))) % 1) + 1) % 1);
        const tw = 0.5 + 0.5 * Math.sin(t * (1 + hash(i * 4) * 2) + i * 3);
        glow(g, x, y, v.w * (0.002 + 0.004 * hash(i * 6.1)) * 3, [255, 232, 190], 0.3 * tw);
      }
      g.restore();
    },
    vapor(g, f, t, v, S) {  // vapor que sube de las tazas (hilitos suaves)
      const pts = (S.rig.props && S.rig.props.steam) || [];
      g.save(); g.globalCompositeOperation = "screen";
      pts.forEach(([x, y], k) => {
        for (let i = 0; i < 9; i++) {
          const P = 3.2, age = (t + hash(i * 3 + k * 11) * P) % P, life = age / P;
          const wx = Math.sin(age * 1.7 + i * 0.9 + k) * 6 * life + Math.sin(t * 0.8 + k) * 2;
          const p = v.at(x + wx, y - life * 85);
          const r = v.s * (5 + 10 * life);
          const a = 0.16 * Math.sin(Math.PI * Math.pow(life, 0.7));
          const gr = g.createRadialGradient(p[0], p[1], 0, p[0], p[1], r);
          gr.addColorStop(0, `rgba(255,246,232,${a})`); gr.addColorStop(1, "rgba(255,246,232,0)");
          g.fillStyle = gr; g.fillRect(p[0] - r, p[1] - r, 2 * r, 2 * r);
        }
      });
      g.restore();
    },
    corazones(g, f, t, v, S) {  // corazoncitos de fieltro que suben entre los dos
      const age0 = t - f.t;
      if (age0 < 0) return;
      const tq = q12(t);
      const cx = S.rw * 0.535, cy = S.rh * 0.7;
      for (let i = 0; i < 9; i++) {
        const st = i * 0.28, age = q12(tq - f.t) - st;
        if (age < 0 || age > 2.4) continue;
        const life = age / 2.4;
        const p = v.at(cx + (hash(i * 7) - 0.5) * S.rw * 0.07 + Math.sin(age * 3 + i) * 4, cy - life * S.rh * 0.3);
        const sz = v.s * S.rw * 0.03 * (0.8 + 0.5 * hash(i)) * landing(age, 0.25, 0.5);
        g.save(); g.translate(p[0], p[1]); g.rotate(Math.sin(age * 4 + i) * 0.25); g.globalAlpha = clamp((1 - life) * 2.5);
        feltHeart(g, sz, [COL.red, COL.pink, "#f39aa8"][i % 3]); g.restore();
      }
    },
    impacto(g, f, t, v, S) {  // ¡CRASH!: estrella de fieltro y líneas de golpe
      const age = q12(t) - f.t;
      if (age < 0 || age > 0.7) return;
      const h = S.rig.handles.cym_top, p = v.at(h.c[0] + 22, h.c[1] - 18);
      const k = landing(age, 0.08, 0.5), R = v.s * 26 * k, fade = clamp(1 - (age - 0.3) / 0.3);
      g.save(); g.translate(p[0], p[1]); g.globalAlpha = fade;
      g.fillStyle = COL.mustard; g.strokeStyle = COL.thread; g.lineWidth = v.s * 2;
      g.beginPath();
      for (let i = 0; i < 16; i++) { const a = (i * Math.PI) / 8, rr = i % 2 ? R * 0.45 : R * (0.9 + 0.2 * hash(i)); g.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); }
      g.closePath(); g.fill(); g.setLineDash([v.s * 4, v.s * 3]); g.stroke(); g.setLineDash([]);
      g.strokeStyle = "rgba(255,248,230,0.9)"; g.lineWidth = v.s * 3; g.lineCap = "round";
      for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4 + 0.3; g.beginPath(); g.moveTo(Math.cos(a) * R * 1.15, Math.sin(a) * R * 1.15); g.lineTo(Math.cos(a) * R * 1.6, Math.sin(a) * R * 1.6); g.stroke(); }
      g.restore();
    },
    hilo_brillo(g, f, t, v, S) {  // un brillo que viaja por el hilo rojo de ella a él
      const age = t - f.t;
      if (age < 0 || age > f.dur) return;
      const path = [[572, 150], [480, 138], [390, 140], [290, 150], [170, 128]];
      const u = clamp(age / f.dur);
      const seg = u * (path.length - 1), i = Math.min(path.length - 2, Math.floor(seg)), w = seg - i;
      const x = lerp(path[i][0], path[i + 1][0], w), y = lerp(path[i][1], path[i + 1][1], w);
      const p = v.at(x, y);
      g.save(); g.globalCompositeOperation = "lighter";
      glow(g, p[0], p[1], v.s * 30, [255, 120, 130], 0.55 * Math.sin(Math.PI * u));
      glow(g, p[0], p[1], v.s * 9, [255, 235, 220], 0.9 * Math.sin(Math.PI * u));
      g.restore();
    },
    viento(g, f, t, v) {
      g.save(); g.lineCap = "round";
      for (let i = 0; i < 8; i++) {
        const ph = (t * (1.1 + hash(i) * 0.8) + hash(i * 3)) % 1;
        const x = v.x0 + v.w * (1.25 - ph * 1.6), y = v.y0 + v.h * (0.55 + 0.4 * hash(i * 7));
        g.strokeStyle = `rgba(255,245,225,${0.16 * Math.sin(Math.PI * ph)})`; g.lineWidth = v.w * 0.0035;
        g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + v.w * 0.08, y - v.w * 0.01, x + v.w * 0.17, y); g.stroke();
      }
      g.restore();
    },
    notas(g, f, t, v) {
      const tq = q12(t), N = 8, P = 3.2;
      for (let i = 0; i < N; i++) {
        const age = (tq + hash(i) * P) % P, life = age / P;
        const side = i % 2 ? 1 : -1;
        const x = ST.w / 2 + side * ST.w * (0.36 + 0.08 * hash(i * 3.1)) + Math.sin(age * 2.2 + i) * ST.w * 0.02;
        const y = ST.h * (0.95 - life * 0.9);
        const sz = ST.h * 0.055 * (0.8 + 0.4 * hash(i * 7.7));
        g.save(); g.globalAlpha = Math.pow(Math.sin(Math.PI * life), 0.5) * 0.9;
        g.translate(x, y); g.rotate(Math.sin(age * 3 + i) * 0.28 + side * 0.1);
        noteShape(g, sz, FELT[(i * 3) % FELT.length], i % 3 !== 0); g.restore();
      }
    },
    salud(g, f, t, v, S) {
      const age = q12(t) - f.t;
      const m = S.rig.handles.mugs;
      const o = v.at(m.c[0], m.c[1] - 50);
      if (age < 0 || age > 1.6) return;
      for (let i = 0; i < 10; i++) {
        const a = -Math.PI * (0.2 + 0.6 * hash(i * 2.7)), sp = v.w * (0.1 + 0.12 * hash(i * 5.3));
        const x = o[0] + Math.cos(a) * sp * age, y = o[1] + Math.sin(a) * sp * age + 0.5 * v.h * 2.4 * age * age;
        const r = v.w * (0.008 + 0.008 * hash(i)) * (1 - 0.5 * age / 1.6);
        g.save(); g.translate(x, y); g.rotate(age * 4 + i); g.globalAlpha *= clamp(1.4 - age);
        g.fillStyle = i % 4 ? "#fbf3df" : "#f3cf74"; g.beginPath(); g.ellipse(0, 0, r, r * 0.86, 0, 0, Math.PI * 2); g.fill();
        g.strokeStyle = "rgba(180,140,90,0.7)"; g.lineWidth = r * 0.14; g.setLineDash([r * 0.3, r * 0.25]);
        g.beginPath(); g.ellipse(0, 0, r * 0.62, r * 0.52, 0, 0, Math.PI * 2); g.stroke(); g.setLineDash([]);
        g.restore();
      }
      const st = spring(age, 0.5, 16) * (1 - clamp(age / 0.5));
      g.save(); g.translate(o[0], o[1]); g.globalCompositeOperation = "lighter";
      g.fillStyle = `rgba(255,248,220,${0.9 * (1 - clamp(age / 0.5))})`;
      const R = v.w * 0.07 * st;
      g.beginPath();
      for (let k = 0; k < 8; k++) { const rr = k % 2 ? R * 0.22 : R; const aa = (k * Math.PI) / 4; g.lineTo(Math.cos(aa) * rr, Math.sin(aa) * rr); }
      g.closePath(); g.fill(); g.restore();
    },
    reflectores(g, f, t, v) {
      const lamps = [[0.2, 0.09, [255, 80, 80]], [0.32, 0.09, [90, 140, 255]], [0.7, 0.09, [255, 80, 80]], [0.83, 0.09, [255, 220, 90]]];
      const bp = pulse(t, BEATS, 0.45, 16, 0.6);
      g.save(); g.globalCompositeOperation = "screen";
      lamps.forEach(([lx, ly, col], k) => {
        const p = v.map(lx, ly), tx = v.map(0.5 + 0.16 * Math.sin(t * 1.15 + k * 1.7), 0.9);
        const half = v.w * 0.11, inten = 0.16 + 0.14 * clamp(bp, 0, 1.2);
        const gr = g.createLinearGradient(p[0], p[1], tx[0], tx[1]);
        gr.addColorStop(0, rgba(col, inten * 1.6)); gr.addColorStop(1, rgba(col, 0));
        g.fillStyle = gr; g.beginPath(); g.moveTo(p[0], p[1]); g.lineTo(tx[0] - half, tx[1]); g.lineTo(tx[0] + half, tx[1]); g.closePath(); g.fill();
        glow(g, p[0], p[1], v.w * 0.07, col, 0.35 + 0.3 * clamp(bp, 0, 1));
      });
      g.restore();
    },
    tele(g, f, t, v) {
      const p = v.map(0.29, 0.5);
      const fl = 0.7 + 0.3 * hash(Math.floor(t * 12)) + 0.08 * Math.sin(t * 23);
      g.save(); g.globalCompositeOperation = "screen";
      glow(g, p[0], p[1], v.w * 0.55, [150, 180, 255], 0.16 * fl);
      glow(g, p[0], p[1], v.w * 0.16, [220, 230, 255], 0.14 * fl);
      g.restore();
    },
    luciernagas(g, f, t, v) {
      g.save(); g.globalCompositeOperation = "lighter";
      for (let i = 0; i < 14; i++) {
        const x = v.x0 + v.w * (0.1 + 0.8 * hash(i * 1.7) + 0.06 * Math.sin(t * (0.3 + hash(i) * 0.4) + i));
        const y = v.y0 + v.h * (0.15 + 0.65 * hash(i * 4.1) + 0.05 * Math.sin(t * (0.25 + hash(i * 2) * 0.3) + i * 2));
        const b = Math.pow(Math.max(0, Math.sin(t * (1.2 + hash(i * 3) * 1.5) + i * 5)), 2);
        glow(g, x, y, v.w * 0.03, [255, 214, 120], 0.5 * b);
        glow(g, x, y, v.w * 0.006, [255, 250, 220], 0.9 * b);
      }
      g.restore();
    },
    flash(g, f, t, v, S) {
      const age = t - f.t;
      if (age < 0 || age > 0.8) return;
      const h = S.rig.handles.camera, p = h ? v.at(h.c[0], h.c[1]) : v.map(0.37, 0.6);
      g.save(); g.globalCompositeOperation = "lighter";
      glow(g, p[0], p[1], v.w * 0.5, [255, 255, 255], 0.9 * Math.exp(-age * 9));
      g.fillStyle = `rgba(255,255,255,${0.5 * Math.exp(-age * 14)})`; g.fillRect(0, 0, ST.w, ST.h);
      g.restore();
    },
    hojas(g, f, t, v) {
      const tq = q12(t), P = 5, cols = [[95, 154, 74], [70, 130, 70], [140, 180, 80], [224, 112, 138], [230, 150, 60]];
      for (let i = 0; i < 9; i++) {
        const age = (tq + hash(i * 2) * P) % P, life = age / P;
        const hx = hash(i * 1.3), side = i % 2 ? 0.02 + 0.2 * hx : 0.78 + 0.2 * hx;
        const x = ST.w * side + Math.sin(age * 1.6 + i) * ST.w * 0.03;
        const y = v.y0 + v.h * (-0.08 + life * 1.16);
        const sz = v.w * 0.016 * (0.8 + 0.5 * hash(i * 9));
        g.save(); g.translate(x, y); g.rotate(age * 1.8 + i); g.scale(1, 0.6 + 0.4 * Math.sin(age * 3 + i));
        g.globalAlpha *= Math.min(1, Math.sin(Math.PI * life) * 3);
        leafPath(g, sz); g.fillStyle = rgba(cols[i % cols.length]); g.fill();
        g.strokeStyle = "rgba(255,255,230,0.45)"; g.lineWidth = sz * 0.1; g.setLineDash([sz * 0.25, sz * 0.2]);
        g.beginPath(); g.moveTo(-sz * 0.8, 0); g.lineTo(sz * 0.8, 0); g.stroke(); g.setLineDash([]);
        g.restore();
      }
    },
    confeti(g, f, t, v) {
      const age = q12(t) - f.t;
      if (age < 0) return;
      const o = [ST.w * 0.5, ST.h * 0.12];
      const piece = (i, x, y, rot, sz, a) => {
        g.save(); g.translate(x, y); g.rotate(rot); g.globalAlpha *= a;
        g.fillStyle = FELT[i % FELT.length];
        const kind = i % 3;
        if (kind === 0) { heartPath(g, sz); g.fill(); }
        else if (kind === 1) { g.beginPath(); g.arc(0, 0, sz * 0.45, 0, Math.PI * 2); g.fill(); }
        else g.fillRect(-sz * 0.5, -sz * 0.25, sz, sz * 0.5);
        g.restore();
      };
      const kd = 1.6, gg = ST.h * 0.9;
      for (let i = 0; i < 70; i++) {
        const a = -Math.PI / 2 + (hash(i * 3.3) - 0.5) * 2.6, sp = ST.w * (0.5 + 0.9 * hash(i * 1.9));
        const e = (1 - Math.exp(-kd * age)) / kd;
        const x = o[0] + Math.cos(a) * sp * e + Math.sin(age * 2 + i) * ST.w * 0.02;
        const y = o[1] + Math.sin(a) * sp * e + (gg / kd) * (age - e);
        if (y > ST.h + 40) continue;
        piece(i, x, y, age * (2 + hash(i) * 3) + i, ST.w * (0.014 + 0.012 * hash(i * 7)), 1);
      }
      const P = 4.2;
      for (let i = 0; i < 22; i++) {
        const ag = (age + hash(i * 5) * P) % P, life = ag / P;
        const x = ST.w * hash(i * 2.1) + Math.sin(ag * 1.4 + i) * ST.w * 0.03;
        const y = ST.h * (-0.05 + life * 1.1);
        piece(i + 3, x, y, ag * 2 + i, ST.w * 0.012, clamp(age - 0.6));
      }
    },
    sol_letrero(g, f, t, v) {
      const p = v.map(0.5, 0.075);
      const bp = clamp(pulse(t, DOWNS, 0.5, 9, 1.6), 0, 1.2);
      const burst = Math.exp(-Math.max(0, t - f.t) * 1.5);
      g.save(); g.globalCompositeOperation = "screen";
      glow(g, p[0], p[1], v.w * (0.16 + 0.1 * burst), [255, 220, 130], 0.3 + 0.2 * bp + 0.3 * burst);
      g.translate(p[0], p[1]); g.rotate(t * 0.15);
      for (let k = 0; k < 12; k++) {
        g.rotate(Math.PI / 6);
        const L = v.w * (0.1 + 0.06 * bp + 0.12 * burst);
        const gr = g.createLinearGradient(0, 0, L, 0); gr.addColorStop(0, "rgba(255,230,160,0.35)"); gr.addColorStop(1, "rgba(255,230,160,0)");
        g.fillStyle = gr; g.beginPath(); g.moveTo(0, -v.w * 0.006); g.lineTo(L, 0); g.lineTo(0, v.w * 0.006); g.fill();
      }
      g.restore();
    },
  };
  const FX_UNDER = new Set(["polvo_luz", "tele", "reflectores", "sol_letrero"]);  // debajo de los globos y de lo demás

  // ── detalles de títere: párpados, bocas, sonrojo ─────────────────────
  const BLINKS = {};
  function blinkAmount(who, t) {  // 0 abierto .. 1 cerrado, a 12 fps
    if (!BLINKS[who]) {
      const arr = []; let x = 0.8 + hash(strHash(who)) * 2, k = 0;
      while (x < EP.duration + 5) { arr.push(x); x += 2.4 + 2.6 * hash(strHash(who) + k++ * 7.3); if (hash(k * 3.1) < 0.18) { arr.push(x - 0.3); } }
      BLINKS[who] = arr.sort((a, b) => a - b);
    }
    const tq = q12(t), arr = BLINKS[who];
    const i = idxBefore(arr, tq);
    if (i < 0) return 0;
    const f = Math.round((tq - arr[i]) * 12);
    return [0.6, 1, 0.9, 0.35][f] ?? 0;
  }
  function drawLids(g, S, P, cam, t, seqChars) {
    for (const e of S.eyes) {
      const c = blinkAmount(e.who + S.id.length, t);
      if (c <= 0) continue;
      const [x, y] = warp(S, P, e.c[0], e.c[1]);
      const sp = toStage(cam, x, y), a = localRot(S, P, e.c[0], e.c[1]);
      const rx = e.rx * cam.s * 1.28, ry = e.ry * cam.s * 1.3;
      g.save(); g.translate(sp[0], sp[1]); g.rotate(a);
      g.beginPath(); g.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2); g.clip();
      const edge = -ry + 2 * ry * c;
      const gr = g.createLinearGradient(0, -ry, 0, edge);
      gr.addColorStop(0, rgba(mixC(e.skin, [255, 240, 225], 0.08))); gr.addColorStop(1, rgba(mixC(e.skin, [60, 30, 20], 0.12)));
      g.fillStyle = gr;
      g.beginPath(); g.moveTo(-rx, -ry - 2); g.lineTo(rx, -ry - 2); g.lineTo(rx, edge); g.quadraticCurveTo(0, edge + ry * 0.35 * c, -rx, edge); g.closePath(); g.fill();
      g.strokeStyle = "rgba(40,20,15,0.85)"; g.lineWidth = Math.max(1.2, cam.s * 0.9); g.lineCap = "round";
      g.beginPath(); g.moveTo(-rx * 0.85, edge); g.quadraticCurveTo(0, edge + ry * 0.35 * c, rx * 0.85, edge); g.stroke();
      g.restore();
    }
  }
  function drawMouths(g, S, P, cam, talk) {
    for (const [who, m] of Object.entries(S.mouths)) {
      const o = talk[who] || 0;
      if (o < 0.08) continue;
      const [x, y] = warp(S, P, m.c[0], m.c[1]);
      const sp = toStage(cam, x, y), a = localRot(S, P, m.c[0], m.c[1]);
      const w = m.w * cam.s * (0.8 + 0.1 * o), h = m.w * cam.s * 0.42 * o;
      g.save(); g.translate(sp[0], sp[1]); g.rotate(a + (m.tilt || 0) * DEG);
      // boca de fieltro: arriba sigue la sonrisa, abajo se abre redonda
      const top = -w * 0.05;
      g.beginPath();
      g.moveTo(-w / 2, top - w * 0.06);
      g.quadraticCurveTo(0, top + w * 0.08, w / 2, top - w * 0.06);
      g.quadraticCurveTo(w * 0.42, top + h, 0, top + h * 1.05);
      g.quadraticCurveTo(-w * 0.42, top + h, -w / 2, top - w * 0.06);
      g.closePath();
      g.fillStyle = rgba(mixC(m.dark, [40, 10, 12], 0.55)); g.fill();
      g.save(); g.clip();
      g.fillStyle = "rgba(205,95,100,0.9)"; g.beginPath(); g.ellipse(0, top + h * 1.0, w * 0.26, h * 0.45, 0, 0, Math.PI * 2); g.fill();
      g.restore();
      g.strokeStyle = rgba(mixC(m.skin, [90, 40, 30], 0.35), 0.9); g.lineWidth = Math.max(1, cam.s * 0.7); g.stroke();
      g.restore();
    }
  }
  function drawBlush(g, S, P, cam, seq, t) {
    for (const b of seq.items.blush) {
      const u = t - b.t;
      if (u < 0 || u > b.dur + 0.6) continue;
      const k = settle(u, 0.5) * (1 - settle(u - b.dur, 0.5));
      const ch = S.rig.chars[b.who];
      let cheeks = ch && ch.cheeks, r = ch && ch.cheekR;
      if (!cheeks) {
        const ey = S.eyes.filter((e) => e.who === b.who);
        if (!ey.length) continue;
        const mx = ey.reduce((a2, e) => a2 + e.c[0], 0) / ey.length;
        cheeks = ey.map((e) => [e.c[0] + Math.sign(e.c[0] - mx) * e.rx * 1.1, e.c[1] + e.ry * 3.3]);
        r = ey[0].rx * 1.4;
      }
      for (const [cx, cy] of cheeks) {
        const [x, y] = warp(S, P, cx, cy), sp = toStage(cam, x, y), R = r * cam.s;
        g.save(); g.globalAlpha = 0.6 * k;
        const gr = g.createRadialGradient(sp[0], sp[1], 0, sp[0], sp[1], R);
        gr.addColorStop(0, "rgba(235,80,95,0.85)"); gr.addColorStop(0.6, "rgba(235,90,105,0.45)"); gr.addColorStop(1, "rgba(235,90,105,0)");
        g.fillStyle = gr; g.beginPath(); g.ellipse(sp[0], sp[1], R, R * 0.7, 0, 0, Math.PI * 2); g.fill();
        g.restore();
      }
    }
  }
  const toStage = (cam, x, y) => [(x - cam.cx) * cam.s + ST.w / 2 + (cam.shx || 0), (y - cam.cy) * cam.s + ST.h / 2 + (cam.shy || 0)];

  // ── globos de diálogo de fieltro ─────────────────────────────────────
  const MEAS = mk(8, 8).getContext("2d");
  function wrapText(text, font, maxW) {
    MEAS.font = font;
    const words = text.split(" "), lines = [];
    let cur = "";
    for (const w of words) {
      const test = cur ? cur + " " + w : w;
      if (MEAS.measureText(test).width > maxW && cur) { lines.push(cur); cur = w; } else cur = test;
    }
    if (cur) lines.push(cur);
    return lines;
  }
  function revealCount(ln, t) {
    if (ln.kind === "sing") return ln.text.length;
    if (ln.kind === "silent") return ln.text.length;
    if (ln.kind === "think") return Math.floor(ln.text.length * clamp((t - ln.t0) / Math.min(1.0, 0.04 * ln.text.length + 0.3)));
    let n = 0;
    for (const s of ln.syl) if (t >= ln.t0 + s.t0) n = s.c1 ?? ln.text.length;
    if (t >= ln.t0 + ln.speech) n = ln.text.length;
    // arrastra la puntuación de apertura (¿ ¡) y la que sigue a la última sílaba visible
    while (n < ln.text.length && /[¿¡]/.test(ln.text[n]) && n === 0) n++;
    return n;
  }
  function bubbleShape(g, kind, x, y, w, h, tail, wob) {
    const r = Math.min(h * 0.5, FS * 0.9);
    if (kind === "think") {
      g.beginPath();
      const n = Math.max(7, Math.round((w + h) / (FS * 0.75)));
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2, cx = x + w / 2 + Math.cos(a) * w * 0.52, cy = y + h / 2 + Math.sin(a) * h * 0.56;
        g.moveTo(cx + FS * 0.62, cy); g.arc(cx, cy, FS * (0.55 + 0.12 * hash(i + wob)), 0, Math.PI * 2);
      }
      roundRect(g, x + w * 0.04, y + h * 0.05, w * 0.92, h * 0.9, r, false);
      return;
    }
    if (kind === "squawk" || kind === "shout") {
      const n = kind === "squawk" ? 22 : 18, cx = x + w / 2, cy = y + h / 2;
      g.beginPath();
      for (let i = 0; i <= n * 2; i++) {
        const a = (i / (n * 2)) * Math.PI * 2, spike = i % 2 ? 1 : (kind === "squawk" ? 1.22 : 1.12) + 0.05 * hash(i + wob);
        const ex = Math.cos(a) * (w / 2 + FS * 0.35) * (i % 2 ? 1 : spike), ey = Math.sin(a) * (h / 2 + FS * 0.35) * (i % 2 ? 1 : spike);
        i ? g.lineTo(cx + ex, cy + ey) : g.moveTo(cx + ex, cy + ey);
      }
      g.closePath();
      if (tail) { g.moveTo(tail.b0[0], tail.b0[1]); g.lineTo(tail.tip[0], tail.tip[1]); g.lineTo(tail.b1[0], tail.b1[1]); g.closePath(); }
      return;
    }
    roundRect(g, x, y, w, h, r);
    if (tail) {
      g.moveTo(tail.b0[0], tail.b0[1]);
      g.quadraticCurveTo(tail.c[0], tail.c[1], tail.tip[0], tail.tip[1]);
      g.quadraticCurveTo(tail.c2[0], tail.c2[1], tail.b1[0], tail.b1[1]);
      g.closePath();
    }
  }
  function drawBubble(g, ln, head, mouth, t, others, faces) {
    const u = t - ln.t0, end = ln.bubble_end;
    if (u < -0.05 || t > end + 0.2) return null;
    const kind = ln.kind;
    const big = kind === "shout" || kind === "squawk";
    const fs = FS * (big ? 1.1 : kind === "sing" ? 1.3 : kind === "silent" ? 1.35 : 1);
    const font = `600 ${fs}px Fredoka`;
    const lines = wrapText(ln.text, font, ST.w * (V ? 0.5 : 0.34));
    MEAS.font = font;
    const tw = Math.max(...lines.map((l) => MEAS.measureText(l).width));
    const lh = fs * 1.18, padX = fs * 0.75, padY = fs * 0.5;
    const w = tw + padX * 2, h = lines.length * lh + padY * 2;
    // pop con resorte al entrar, se encoge al salir
    const kin = landing(u + 0.04, 0.2, 0.45), kout = 1 - clamp((t - end) / 0.18);
    const sc = (0.55 + 0.45 * kin) * (0.7 + 0.3 * kout), alpha = clamp(u / 0.06 + 0.3) * kout;
    if (alpha <= 0) return null;
    // posición: se prueban varios lugares y gana el que no tapa caras ni otros globos
    const m = fs * 0.5, ex = big ? fs * 0.45 : 0;
    const fit = (x, y) => [clamp(x, m + ex, ST.w - m - ex - w), clamp(y, m + ex, ST.h - m - ex - h)];
    const cands = [];
    for (const off of [0, 0.3, -0.3, 0.6, -0.6, 0.95, -0.95]) cands.push(fit(head[0] - w / 2 + off * w, head[1] - h - fs * 0.7));
    cands.push(fit(mouth[0] + fs * 2.2, mouth[1] - h - fs * 0.6), fit(mouth[0] - fs * 2.2 - w, mouth[1] - h - fs * 0.6));
    cands.push(fit(mouth[0] + fs * 2.4, mouth[1] - h / 2), fit(mouth[0] - fs * 2.4 - w, mouth[1] - h / 2));
    const over = (x, y, c) => {  // fracción del círculo c tapada por la caja
      const ix = Math.max(0, Math.min(x + w, c[0] + c[2]) - Math.max(x, c[0] - c[2]));
      const iy = Math.max(0, Math.min(y + h, c[1] + c[2]) - Math.max(y, c[1] - c[2]));
      return (ix * iy) / (4 * c[2] * c[2]);
    };
    let best = null, bs = 1e9;
    for (const [x, y] of cands) {
      let sc = 0;
      for (const f of faces) sc += 14 * over(x, y, f);
      if (mouth[0] > x - fs * 0.3 && mouth[0] < x + w + fs * 0.3 && mouth[1] > y - fs * 0.3 && mouth[1] < y + h + fs * 0.6) sc += 8;
      for (const o of others) {
        const ix = Math.max(0, Math.min(x + w, o.x + o.w) - Math.max(x, o.x)), iy = Math.max(0, Math.min(y + h, o.y + o.h) - Math.max(y, o.y));
        sc += 12 * (ix * iy) / (w * h);
      }
      sc += Math.hypot(x + w / 2 - head[0], y + h - (head[1] - fs * 0.7)) / ST.h * 3;
      if (sc < bs) { bs = sc; best = [x, y]; }
    }
    let [bx, by] = best;
    const wob = Math.floor(t * 12) % 3;
    const cx = bx + w / 2, cy = by + h / 2;
    // colita: sale del borde más cercano y apunta a la boca, sin llegar a taparla
    let tail = null, px = cx, py = by + h;
    if (kind !== "sing") {
      const below = mouth[1] > by + h * 0.6;
      if (below) { px = clamp(mouth[0], bx + fs * 0.9, bx + w - fs * 0.9); py = by + h - 2; }
      else { px = mouth[0] > cx ? bx + w - 2 : bx + 2; py = clamp(mouth[1], by + fs * 0.6, by + h - fs * 0.6); }
      const dx = mouth[0] - px, dy = mouth[1] - py, L = Math.hypot(dx, dy) || 1;
      const len = clamp(L - fs * 1.2, fs * 0.45, fs * 1.25);
      const tip = [px + (dx / L) * len, py + (dy / L) * len];
      const nx = -dy / L, ny = dx / L, tw2 = fs * 0.42;
      const b0 = below ? [px - tw2, py] : [px, py - tw2], b1 = below ? [px + tw2, py] : [px, py + tw2];
      const mid = [(px + tip[0]) / 2, (py + tip[1]) / 2];
      tail = { b0, b1, tip, c: [mid[0] + nx * tw2 * 0.5, mid[1] + ny * tw2 * 0.5], c2: [mid[0] + nx * tw2 * 0.2, mid[1] + ny * tw2 * 0.2], below };
    }
    const ax = tail ? tail.tip[0] : cx, ay = tail ? tail.tip[1] : by + h;
    g.save(); g.globalAlpha = alpha;
    g.translate(ax, ay); g.scale(sc, sc); g.translate(-ax, -ay);
    const box = { x: bx, y: by, w, h };
    const fill = kind === "squawk" ? "#f5d56b" : kind === "think" ? "#eef3f8" : COL.cream;
    if (kind === "sing") {
      // notas: sin globo, notas de fieltro que brincan sobre sus cabezas
      const n = 3;
      for (let i = 0; i < n; i++) {
        const b = pulse(t, BEATS, 0.4, 14, 0.8) * 0.25;
        const x = head[0] + (i - 1) * fs * 1.5, y = head[1] - fs * 0.6 - Math.abs(Math.sin(t * 3 + i)) * fs * 0.6 - b * fs;
        g.save(); g.translate(x, y); g.rotate(Math.sin(t * 4 + i) * 0.25); noteShape(g, fs * 1.1, FELT[(i * 3 + 1) % FELT.length], i !== 1); g.restore();
      }
      g.restore();
      return box;
    }
    if (kind === "think") {  // burbujitas hacia la cabeza
      for (let i = 0; i < 3; i++) {
        const k = (i + 1) / 4, x = lerp(head[0], cx, 1 - k), y = lerp(head[1], by + h, 1 - k) + fs * 0.2;
        g.save(); g.shadowColor = "rgba(0,0,0,0.3)"; g.shadowBlur = fs * 0.25; g.shadowOffsetY = fs * 0.1;
        g.fillStyle = fill; g.beginPath(); g.arc(x, y, fs * (0.12 + 0.12 * (1 - k)), 0, Math.PI * 2); g.fill(); g.restore();
      }
    }
    g.save();
    g.shadowColor = "rgba(0,0,0,0.38)"; g.shadowBlur = fs * 0.45; g.shadowOffsetY = fs * 0.18;
    bubbleShape(g, kind, bx, by, w, h, kind === "think" ? null : tail, wob); g.fillStyle = fill; g.fill("nonzero");
    g.restore();
    g.save(); bubbleShape(g, kind, bx, by, w, h, kind === "think" ? null : tail, wob); g.clip("nonzero");
    g.globalAlpha = alpha * 0.8; g.fillStyle = g.createPattern(FIBER, "repeat"); g.fillRect(bx - fs * 2, by - fs * 2, w + fs * 4, h + fs * 6);
    g.restore();
    // puntadas
    if (kind !== "think") {
      g.save(); g.setLineDash([fs * 0.28, fs * 0.2]); g.lineDashOffset = wob * fs * 0.05;
      g.strokeStyle = kind === "squawk" ? "#c0561d" : COL.thread; g.lineWidth = Math.max(1.5, fs * 0.07);
      const ins = fs * 0.22;
      if (kind === "shout" || kind === "squawk") roundRect(g, bx + ins, by + ins, w - 2 * ins, h - 2 * ins, fs * 0.3);
      else roundRect(g, bx + ins, by + ins, w - 2 * ins, h - 2 * ins, Math.min(h * 0.5, FS * 0.9) - ins * 0.6);
      g.stroke(); g.restore();
    }
    // texto con aparición por sílaba
    let n = revealCount(ln, t);
    g.font = font; g.textAlign = "left"; g.textBaseline = "middle"; g.fillStyle = COL.ink;
    let k = 0;
    lines.forEach((l, i) => {
      const lw = MEAS.measureText(l).width, x = cx - lw / 2, y = by + padY + lh * (i + 0.5) + fs * 0.04;
      const vis = l.slice(0, Math.max(0, n - k));
      g.fillText(vis, x, y);
      k += l.length + 1;
    });
    g.restore();
    return box;
  }

  // ── una escena en el escenario ───────────────────────────────────────
  function sceneView(S, cam) {
    const x0 = (0 - cam.cx) * cam.s + ST.w / 2 + (cam.shx || 0), y0 = (0 - cam.cy) * cam.s + ST.h / 2 + (cam.shy || 0);
    return { x0, y0, w: S.rw * cam.s, h: S.rh * cam.s, s: cam.s, map: (nx, ny) => [x0 + nx * S.rw * cam.s, y0 + ny * S.rh * cam.s], at: (x, y) => toStage(cam, x, y) };
  }
  const PAST = new Set(["prepa", "amoshit"]);
  function drawScene(g, seq, t) {
    const S = SCN[seq.scene];
    const cam = camAt(seq, S, t);
    // sacudida del ¡crash!
    for (const f of seq.items.fx) if (f.kind === "impacto") { const u = t - f.t; if (u > 0 && u < 0.6) { cam.shx = 14 * Math.exp(-u * 7) * Math.sin(u * 70); cam.shy = 9 * Math.exp(-u * 7) * Math.cos(u * 55); } }
    const { P, talk } = rigState(seq, S, t);
    const { C, D } = uniformsFor(S, P);
    const past = PAST.has(seq.id) ? 1 : 0;
    gl.viewport(0, 0, SW, SH);
    gl.clearColor(0.05, 0.04, 0.06, 1); gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(U.u_past, past);
    gl.uniform2f(U.u_shift, cam.shx || 0, cam.shy || 0);
    // fondo desenfocado (solo se ve si el encuadre no llena)
    const bs = Math.max(ST.w / S.rw, ST.h / S.rh) * 1.1;
    gl.uniform2f(U.u_raw, S.rw, S.rh); gl.uniform3f(U.u_cam, S.rw / 2, S.rh / 2, bs); gl.uniform1i(U.u_n, 0); gl.uniform1f(U.u_bright, 0.72);
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, S.blur);
    if (!S.quad) S.quad = makeGrid(1, 1);
    gl.bindVertexArray(S.quad.vao); gl.drawElements(gl.TRIANGLES, S.quad.n, gl.UNSIGNED_INT, 0);
    // la lámina deformada
    gl.uniform3f(U.u_cam, cam.cx, cam.cy, cam.s); gl.uniform1i(U.u_n, S.hnames.length); gl.uniform1f(U.u_bright, 1);
    gl.uniform4fv(U.u_A, S.A); gl.uniform4fv(U.u_B, S.B); gl.uniform4fv(U.u_C, C); gl.uniform4fv(U.u_D, D); gl.uniform4fv(U.u_E, S.E);
    gl.bindTexture(gl.TEXTURE_2D, S.tex);
    gl.bindVertexArray(S.grid.vao); gl.drawElements(gl.TRIANGLES, S.grid.n, gl.UNSIGNED_INT, 0);
    gl.bindVertexArray(null);
    g.drawImage(glc, 0, 0, ST.w, ST.h);
    // títere: párpados, bocas, sonrojo
    drawMouths(g, S, P, cam, talk);
    drawBlush(g, S, P, cam, seq, t);
    const v = sceneView(S, cam);
    const fxOn = (f) => { const end = f.dur === "scene" ? seq.end + 2 : f.t + (f.dur || 1.5) + 1.6; return t >= f.t - 0.01 && t <= end; };
    for (const f of seq.items.fx) if (FX_UNDER.has(f.kind) && fxOn(f) && FX[f.kind]) FX[f.kind](g, f, t, v, S);
    for (const f of seq.items.fx) if (!FX_UNDER.has(f.kind) && fxOn(f) && FX[f.kind]) FX[f.kind](g, f, t, v, S);
    if (past) {  // mirada al pasado: bordes crema suaves
      const gr = g.createRadialGradient(ST.w / 2, ST.h / 2, ST.h * 0.45, ST.w / 2, ST.h / 2, Math.hypot(ST.w, ST.h) * 0.55);
      gr.addColorStop(0, "rgba(250,238,215,0)"); gr.addColorStop(1, "rgba(250,238,215,0.42)");
      g.fillStyle = gr; g.fillRect(0, 0, ST.w, ST.h);
    }
    // globos (las caras de todos, para no taparlas)
    const boxes = [];
    const faces = Object.entries(S.rig.chars || {}).filter(([k, ch]) => k !== "ambos" && ch.head && S.rig.handles[ch.head]).map(([, ch]) => {
      const hh = S.rig.handles[ch.head], c0 = warp(S, P, hh.c[0], hh.c[1]), sp = toStage(cam, c0[0], c0[1]);
      return [sp[0], sp[1], hh.r0 * cam.s * 1.05];
    });
    for (const ln of seq.items.lines) {
      if (t < ln.t0 - 0.05 || t > ln.bubble_end + 0.2) continue;
      const whos = ln.who === "ambos" && !S.rig.chars.ambos ? ["diego", "fanny"] : [ln.who];
      const chs = whos.map((w2) => S.rig.chars[w2]).filter(Boolean);
      if (!chs.length) continue;
      const avg = (pts) => [pts.reduce((a, p) => a + p[0], 0) / pts.length, pts.reduce((a, p) => a + p[1], 0) / pts.length];
      const head = avg(chs.map((ch) => toStage(cam, ...warp(S, P, ch.bubble[0], ch.bubble[1]))));
      const mouth = avg(chs.map((ch) => {
        const mp = ch.mouth ? ch.mouth.c : ch.jaw ? S.rig.handles[ch.jaw].c : S.rig.handles[ch.head].c;
        return toStage(cam, ...warp(S, P, mp[0], mp[1]));
      }));
      const b = drawBubble(g, ln, head, mouth, t, boxes, faces);
      if (b) boxes.push(b);
    }
    // rótulo de flashback ("Hace un buen rato…")
    if (seq.slug) {
      const u = t - seq.start - 0.5;
      if (u > 0 && u < 3.4) {
        const F = feltTag({ text: seq.slug, size: ST.h * 0.045, bg: COL.cream, family: "Dancing", weight: 700 });
        const k = landing(u, 0.35, 0.5), ko = 1 - settle(u - 2.9, 0.3);
        g.save(); g.globalAlpha = clamp(u / 0.1) * clamp(ko);
        g.translate(ST.w * 0.04 + F.width / 2, ST.h * 0.9 - F.height / 2 + (1 - k) * ST.h * 0.2); g.rotate(-0.04 + (1 - k) * 0.2);
        g.drawImage(F, -F.width / 2, -F.height / 2); g.restore();
      }
    }
    // "Continuará…" con iris de caricatura
    for (const cd of seq.items.cards) if (cd.kind === "continuara" && t >= cd.t) drawContinuara(g, t - cd.t, seq, S, cam, P);
  }

  function drawContinuara(g, u, seq, S, cam, P) {
    const [fx, fy] = warp(S, P, 372, 640);  // entre las caras
    const c = toStage(cam, fx, fy);
    const R0 = Math.hypot(ST.w, ST.h), R1 = ST.h * 0.34;
    const k = settle(u - 0.2, 1.4);
    const R = lerp(R0, R1, k);
    g.save();
    g.fillStyle = "#1c1320";
    g.beginPath(); g.rect(0, 0, ST.w, ST.h); g.arc(c[0], c[1], R, 0, Math.PI * 2, true); g.fill("evenodd");
    g.strokeStyle = COL.thread; g.lineWidth = ST.h * 0.006; g.setLineDash([ST.h * 0.02, ST.h * 0.014]);
    g.beginPath(); g.arc(c[0], c[1], R + ST.h * 0.012, 0, Math.PI * 2); g.stroke(); g.setLineDash([]);
    g.restore();
    drawSewn(g, { text: "Continuará…", size: ST.h * 0.085 }, ST.w / 2, ST.h * 0.88, 0.9, u, 1.2);
  }

  // ── tarjetas: título y créditos ──────────────────────────────────────
  const beatA = 60 / EP.theme_bpm;
  function portrait(g, who, x, y, r, t0, t, label) {
    const src = { diego: [262, 545, 150], fanny: [487, 575, 140], tris: [375, 1015, 185], snoopy: [205, 1110, 130], changuito: [78, 600, 105], pinguino: [70, 330, 90] }[who];
    if (!src) return;
    const im = IMG.retrato, k = im.naturalWidth / RIGS.retrato.raw[0];
    const u = t - t0;
    if (u < 0) return;
    const s = landing(u, 0.3, 0.45);
    g.save(); g.translate(x, y + Math.sin(t * 2 + x) * r * 0.03); g.scale(s, s); g.rotate(Math.sin(t * 1.3 + x) * 0.03);
    g.shadowColor = "rgba(0,0,0,0.45)"; g.shadowBlur = r * 0.25; g.shadowOffsetY = r * 0.1;
    g.fillStyle = COL.cream; g.beginPath(); g.arc(0, 0, r * 1.12, 0, Math.PI * 2); g.fill();
    g.shadowColor = "transparent";
    g.save(); g.beginPath(); g.arc(0, 0, r, 0, Math.PI * 2); g.clip();
    g.drawImage(im, (src[0] - src[2]) * k, (src[1] - src[2]) * k, src[2] * 2 * k, src[2] * 2 * k, -r, -r, 2 * r, 2 * r);
    g.restore();
    g.setLineDash([r * 0.12, r * 0.09]); g.strokeStyle = COL.thread; g.lineWidth = r * 0.04;
    g.beginPath(); g.arc(0, 0, r * 1.06, 0, Math.PI * 2); g.stroke(); g.setLineDash([]);
    if (label) {
      const F = feltTag({ text: label, size: r * 0.28, bg: COL.mustard });
      g.drawImage(F, -F.width / 2, r * 0.82);
    }
    g.restore();
  }
  function drawTitle(g, seq, t) {
    if (!BOARD.title) BOARD.title = buildBoard(ST.w, ST.h, "#24545a", 21);
    g.drawImage(BOARD.title, 0, 0);
    const t0 = seq.start, u = t - t0;
    const sz = ST.h * 0.15;
    const b = (k) => t0 + k * beatA;
    drawFeltWord(g, { text: "Fanny", size: sz, colors: [COL.pink, COL.mustard, COL.sky, COL.orange, COL.purple], seed: 3 }, ST.w * 0.5 - sz * 2.35, ST.h * 0.25, b(0.5), t);
    drawFeltWord(g, { text: "&", size: sz * 0.9, colors: [COL.red], seed: 4 }, ST.w * 0.5, ST.h * 0.25, b(1.5), t);
    drawFeltWord(g, { text: "Diego", size: sz, colors: [COL.teal, COL.green, COL.mustard, COL.orange, COL.sky], thread: COL.cream, seed: 5 }, ST.w * 0.5 + sz * 2.35, ST.h * 0.25, b(2), t);
    drawSewn(g, { text: "— la serie —", size: ST.h * 0.06 }, ST.w / 2, ST.h * 0.4, b(3), t, 0.9);
    const pr = ST.h * 0.12;
    portrait(g, "fanny", ST.w * 0.5 - pr * 2.9, ST.h * 0.59, pr, b(4), t, "Fanny");
    portrait(g, "diego", ST.w * 0.5, ST.h * 0.57, pr, b(5), t, "Diego");
    portrait(g, "tris", ST.w * 0.5 + pr * 2.9, ST.h * 0.59, pr, b(6), t, "Tris");
    const F = feltTag({ text: `Temporada ${EP.meta.season} · Capítulo ${EP.meta.episode} · «${EP.meta.episode_title}»`, size: ST.h * 0.038, bg: COL.cream });
    const k = landing(t - b(8), 0.3, 0.5);
    if (t > b(8) - 0.3) { g.save(); g.globalAlpha = clamp((t - b(8)) / 0.1 + 1); g.drawImage(F, ST.w / 2 - F.width / 2, ST.h * 0.87 - F.height / 2 + (1 - k) * ST.h * 0.2); g.restore(); }
    // corazones que laten a tiempo
    for (let i = 0; i < 6; i++) {
      const x = ST.w * (0.08 + 0.84 * (i / 5)), y = ST.h * (i % 2 ? 0.08 : 0.95);
      const bt = pulse(t, BEATS, 0.4, 14, 0.8);
      g.save(); g.translate(x, y); g.scale(1 + 0.12 * bt, 1 + 0.12 * bt); feltHeart(g, ST.h * 0.03, FELT[(i * 3) % FELT.length]); g.restore();
    }
  }
  function drawCredits(g, seq, t) {
    if (!BOARD.credits) BOARD.credits = buildBoard(ST.w, ST.h, "#3a2940", 33);
    g.drawImage(BOARD.credits, 0, 0);
    const cards = seq.cards;
    let i = cards.length - 1;
    while (i > 0 && t < cards[i].t) i--;
    const c = cards[i], u = t - c.t;
    const kin = landing(u, 0.35, 0.5), kout = i < cards.length - 1 ? 1 - settle(u - (c.dur - 0.35), 0.25) : 1;
    g.save(); g.globalAlpha = clamp(u / 0.12) * clamp(kout);
    g.translate(0, (1 - kin) * ST.h * 0.08);
    const ports = c.portraits || [];
    const hasP = ports.length > 0;
    const pr = ST.h * 0.11;
    ports.forEach((p, k) => portrait(g, p, ST.w / 2 + (k - (ports.length - 1) / 2) * pr * 2.8, ST.h * 0.3, pr, c.t + 0.1 + k * 0.15, t, null));
    const L = c.lines, big = (s) => !s.startsWith("~");
    let y = hasP ? ST.h * 0.58 : ST.h * (0.5 - 0.06 * L.length);
    L.forEach((s, k) => {
      const isBig = big(s);
      s = s.replace(/^~/, "");
      if (isBig) {
        drawFeltWord(g, { text: s, size: ST.h * (c.final ? 0.1 : 0.085), colors: [COL.cream, COL.mustard, COL.pink], thread: COL.thread, seed: 9 + k }, ST.w / 2, y, c.t + 0.15 + k * 0.2, t, { stagger: 0.03 });
        y += ST.h * 0.13;
      } else {
        drawSewn(g, { text: s, size: ST.h * 0.05 }, ST.w / 2, y, c.t + 0.1 + k * 0.2, t, 0.7);
        y += ST.h * 0.085;
      }
    });
    if (c.final) {
      for (let j = 0; j < 12; j++) {
        const a = (j / 12) * Math.PI * 2 + t * 0.2, R = ST.h * 0.4;
        g.save(); g.translate(ST.w / 2 + Math.cos(a) * R * 1.4, ST.h * 0.5 + Math.sin(a) * R * 0.95);
        const bt = pulse(t, BEATS, 0.4, 14, 0.8);
        g.scale(1 + 0.15 * bt, 1 + 0.15 * bt); feltHeart(g, ST.h * 0.028, FELT[j % FELT.length]); g.restore();
      }
    }
    g.restore();
  }

  // ── composición ──────────────────────────────────────────────────────
  const SEQ = EP.seqs;
  const stageA = mk(SW, SH), stageB = mk(SW, SH);
  const gA = stageA.getContext("2d"), gB = stageB.getContext("2d");
  const WHIP = mk(SW, SH);
  function renderSeq(g, seq, t) {
    g.setTransform(RS, 0, 0, RS, 0, 0);
    g.globalAlpha = 1; g.globalCompositeOperation = "source-over";
    if (seq.kind === "card") { if (seq.card === "title") drawTitle(g, seq, t); else drawCredits(g, seq, t); }
    else drawScene(g, seq, t);
  }
  function seqAt(t) { for (let i = SEQ.length - 1; i >= 0; i--) if (t >= SEQ[i].start) return i; return 0; }
  function composite(t) {
    const i = seqAt(t), B = SEQ[i], A = SEQ[i - 1];
    const tr = B.transition, u = t - B.start, p = tr.dur > 0 ? clamp(u / tr.dur) : 1;
    const g = out;
    g.setTransform(RS, 0, 0, RS, 0, 0);
    const put = (c, alpha = 1, dx = 0) => { g.save(); g.globalAlpha = alpha; g.drawImage(c, ST.x + dx, ST.y, ST.w, ST.h); g.restore(); };
    if (!A || p >= 1) { renderSeq(gB, B, t); put(stageB); }
    else if (tr.type === "fade") { renderSeq(gA, A, t); renderSeq(gB, B, t); put(stageA); put(stageB, settle(u, tr.dur)); }
    else if (tr.type === "dip") {
      if (p < 0.5) { renderSeq(gA, A, t); put(stageA); } else { renderSeq(gB, B, t); put(stageB); }
      g.save(); g.fillStyle = "#1c1320"; g.globalAlpha = 1 - Math.abs(p - 0.5) * 2; g.fillRect(ST.x, ST.y, ST.w, ST.h); g.restore();
    } else if (tr.type === "whip") {  // barrido con desenfoque de movimiento real (promedio de sub-cuadros)
      const e0 = settle(u - 1 / 30, tr.dur * 0.8), e1 = settle(u, tr.dur * 0.8);
      renderSeq(gA, A, t); renderSeq(gB, B, t);
      const T = WHIP.getContext("2d");
      T.setTransform(1, 0, 0, 1, 0, 0); T.globalCompositeOperation = "source-over"; T.globalAlpha = 1;
      T.fillStyle = "#000"; T.fillRect(0, 0, SW, SH);
      T.globalCompositeOperation = "lighter";
      const N = 10;
      for (let k = 0; k < N; k++) {
        const e = lerp(e0, e1, (k + 0.5) / N);
        T.globalAlpha = 1 / N;
        T.drawImage(stageA, -e * SW * 1.02, 0);
        T.drawImage(stageB, (1 - e) * SW * 1.02, 0);
      }
      put(WHIP);
    } else if (tr.type === "flashback") {  // ondas de recuerdo y un destello crema
      renderSeq(gA, A, t); renderSeq(gB, B, t);
      const src = p < 0.5 ? stageA : stageB, amp = Math.sin(Math.PI * p) * ST.w * 0.03;
      const bands = 96, bh = ST.h / bands;
      for (let k = 0; k < bands; k++) {
        const dx = Math.sin(k * 0.55 + u * 14) * amp;
        g.drawImage(src, 0, k * bh * RS, SW, bh * RS + 1, ST.x + dx, ST.y + k * bh, ST.w, bh + 1);
      }
      g.save(); g.fillStyle = "#faeed7"; g.globalAlpha = Math.pow(Math.sin(Math.PI * p), 3) * 0.6; g.fillRect(ST.x, ST.y, ST.w, ST.h); g.restore();
    } else if (tr.type === "tv") {  // la pantalla de la tele crece y se vuelve la aventura
      renderSeq(gA, A, t); renderSeq(gB, B, t); put(stageA);
      const e = settle(u, tr.dur * 0.85);
      let x0 = ST.w * 0.2, y0 = ST.h * 0.32, w0 = ST.w * 0.2, h0 = ST.h * 0.28;
      const SA = A.scene && SCN[A.scene], scr = SA && SA.rig.props && SA.rig.props.tv_screen;
      if (scr) {  // el rectángulo real de la pantalla, visto por la cámara de la escena anterior
        const cam = camAt(A, SA, t), p0 = toStage(cam, scr[0], scr[1]), p1 = toStage(cam, scr[2], scr[3]);
        x0 = p0[0]; y0 = p0[1]; w0 = p1[0] - p0[0]; h0 = p1[1] - p0[1];
      }
      const x = lerp(x0, 0, e), y = lerp(y0, 0, e), w = lerp(w0, ST.w, e), h = lerp(h0, ST.h, e);
      g.save(); roundRect(g, ST.x + x, ST.y + y, w, h, (1 - e) * Math.min(w0, h0) * 0.12); g.clip();
      // la aventura aparece "dentro" de la tele: al principio encuadrada en la pantalla
      g.drawImage(stageB, ST.x + x, ST.y + y, w, h);
      g.fillStyle = `rgba(190,215,255,${0.35 * (1 - e)})`; g.fillRect(ST.x + x, ST.y + y, w, h);
      g.restore();
    } else { renderSeq(gB, B, t); put(stageB); }
    // fundido desde negro al abrir
    if (t < 0.8) { g.save(); g.fillStyle = "#000"; g.globalAlpha = 1 - settle(t, 0.8); g.fillRect(ST.x, ST.y, ST.w, ST.h); g.restore(); }
    // flash del clímax
    if (B.transition.type === "flash" && u >= 0 && u < 0.9) { g.save(); g.fillStyle = "#fff"; g.globalAlpha = 0.9 * Math.exp(-u * 5); g.fillRect(ST.x, ST.y, ST.w, ST.h); g.restore(); }
    // fin: fundido a negro
    if (t > EP.duration - 1.0) { g.save(); g.fillStyle = "#000"; g.globalAlpha = settle(t - (EP.duration - 1.0), 0.9); g.fillRect(0, 0, W, H); g.restore(); }
  }

  // 9:16: la tele de fieltro
  function buildTV() {
    const back = mk(W * RS, H * RS), g = back.getContext("2d");
    g.setTransform(RS, 0, 0, RS, 0, 0);
    g.drawImage(buildBoard(W, H, "#5a3a4a", 5), 0, 0);
    // mesa
    g.fillStyle = "#6b4630"; roundRect(g, -20, 1480, W + 40, 520, 30); g.fill();
    g.save(); roundRect(g, -20, 1480, W + 40, 520, 30); g.clip(); g.fillStyle = g.createPattern(FIBER, "repeat"); g.fillRect(0, 1480, W, 520);
    g.fillStyle = "rgba(0,0,0,0.25)"; g.fillRect(0, 1480, W, 26); g.restore();
    // antenas
    g.lineCap = "round"; g.strokeStyle = "#3b3438"; g.lineWidth = 10;
    for (const [x2, y2] of [[330, 250], [760, 230]]) { g.beginPath(); g.moveTo(540, 470); g.lineTo(x2, y2); g.stroke(); g.fillStyle = COL.red; g.beginPath(); g.arc(x2, y2, 18, 0, Math.PI * 2); g.fill(); }
    g.fillStyle = "#3b3438"; g.beginPath(); g.ellipse(540, 475, 70, 34, 0, 0, Math.PI * 2); g.fill();
    // cuerpo de la tele (fieltro mostaza con costuras)
    const bx = 30, by = 470, bw = 1020, bh = 1010;
    g.save(); g.shadowColor = "rgba(0,0,0,0.5)"; g.shadowBlur = 50; g.shadowOffsetY = 24;
    g.fillStyle = "#c98a2b"; roundRect(g, bx, by, bw, bh, 70); g.fill(); g.restore();
    g.save(); roundRect(g, bx, by, bw, bh, 70); g.clip(); g.fillStyle = g.createPattern(FIBER, "repeat"); g.fillRect(bx, by, bw, bh);
    const gr = g.createLinearGradient(0, by, 0, by + bh); gr.addColorStop(0, "rgba(255,255,255,0.12)"); gr.addColorStop(1, "rgba(0,0,0,0.2)");
    g.fillStyle = gr; g.fillRect(bx, by, bw, bh); g.restore();
    g.setLineDash([16, 12]); g.lineWidth = 4; g.strokeStyle = COL.thread; roundRect(g, bx + 18, by + 18, bw - 36, bh - 36, 56); g.stroke(); g.setLineDash([]);
    // marco de la pantalla
    g.fillStyle = "#2a2226"; roundRect(g, ST.x - 22, ST.y - 22, ST.w + 44, ST.h + 44, 48); g.fill();
    // panel de perillas
    const py = ST.y + ST.h + 40;
    g.fillStyle = "#a86f22"; roundRect(g, 80, py, 920, 150, 30); g.fill();
    g.save(); roundRect(g, 80, py, 920, 150, 30); g.clip(); g.fillStyle = g.createPattern(FIBER, "repeat"); g.fillRect(80, py, 920, 150); g.restore();
    for (let i = 0; i < 7; i++) { g.fillStyle = "rgba(40,25,15,0.55)"; roundRect(g, 120, py + 22 + i * 17, 340, 8, 4); g.fill(); }
    for (const [x, c] of [[760, COL.cream], [900, COL.cream]]) {
      g.save(); g.shadowColor = "rgba(0,0,0,0.4)"; g.shadowBlur = 10; g.shadowOffsetY = 5;
      g.fillStyle = c; g.beginPath(); g.arc(x, py + 75, 46, 0, Math.PI * 2); g.fill(); g.restore();
      g.strokeStyle = COL.thread; g.lineWidth = 3; g.setLineDash([8, 6]); g.beginPath(); g.arc(x, py + 75, 36, 0, Math.PI * 2); g.stroke(); g.setLineDash([]);
    }
    // patas
    g.fillStyle = "#3b3438"; for (const x of [150, 890]) { roundRect(g, x, 1470, 40, 60, 10); g.fill(); }
    // utilería de fieltro sobre la mesa: dos tazas (las del café) y el carrete de hilo rojo
    const felt = (fn, col) => { g.save(); fn(); g.fillStyle = col; g.fill(); g.clip(); g.fillStyle = g.createPattern(FIBER, "repeat"); g.fillRect(0, 1400, W, 520); g.restore(); };
    const mug = (x, y, col) => {
      g.save(); g.shadowColor = "rgba(0,0,0,0.4)"; g.shadowBlur = 16; g.shadowOffsetY = 8;
      g.strokeStyle = col; g.lineWidth = 14; g.beginPath(); g.ellipse(x + 62, y + 52, 22, 26, 0, -Math.PI / 2, Math.PI / 2); g.stroke();
      felt(() => roundRect(g, x - 40, y, 100, 110, 22), col);
      g.restore();
      g.fillStyle = "rgba(60,30,20,0.85)"; g.beginPath(); g.ellipse(x + 10, y + 8, 46, 11, 0, 0, Math.PI * 2); g.fill();
      g.setLineDash([9, 7]); g.strokeStyle = "rgba(255,245,230,0.6)"; g.lineWidth = 2.5; roundRect(g, x - 30, y + 22, 80, 78, 16); g.stroke(); g.setLineDash([]);
    };
    mug(88, 1605, "#7fa6c9"); mug(196, 1632, "#c0564a");
    // carrete
    const sx = 985, sy = 1600;
    g.save(); g.shadowColor = "rgba(0,0,0,0.4)"; g.shadowBlur = 16; g.shadowOffsetY = 8;
    felt(() => roundRect(g, sx - 70, sy, 140, 24, 10), "#c9a57a");
    felt(() => roundRect(g, sx - 70, sy + 106, 140, 24, 10), "#c9a57a");
    g.restore();
    g.fillStyle = COL.thread; g.fillRect(sx - 55, sy + 24, 110, 82);
    g.strokeStyle = "rgba(0,0,0,0.25)"; g.lineWidth = 2;
    for (let yy = sy + 30; yy < sy + 104; yy += 7) { g.beginPath(); g.moveTo(sx - 55, yy); g.lineTo(sx + 55, yy + 3); g.stroke(); }
    g.strokeStyle = COL.thread; g.lineWidth = 5; g.lineCap = "round";
    g.beginPath(); g.moveTo(sx + 50, sy + 90); g.bezierCurveTo(sx + 140, sy + 150, sx + 20, sy + 230, sx - 150, sy + 210); g.bezierCurveTo(sx - 260, sy + 200, sx - 300, sy + 260, sx - 380, sy + 250); g.stroke();
    // logo arriba
    TVBACK = back;
    const front = mk(W * RS, H * RS), f = front.getContext("2d");
    f.setTransform(RS, 0, 0, RS, 0, 0);
    // vidrio: viñeta de tubo y reflejo
    f.save(); roundRect(f, ST.x, ST.y, ST.w, ST.h, 36); f.clip();
    const vg = f.createRadialGradient(ST.x + ST.w / 2, ST.y + ST.h / 2, ST.h * 0.3, ST.x + ST.w / 2, ST.y + ST.h / 2, ST.w * 0.72);
    vg.addColorStop(0, "rgba(0,0,0,0)"); vg.addColorStop(1, "rgba(0,0,0,0.55)"); f.fillStyle = vg; f.fillRect(ST.x, ST.y, ST.w, ST.h);
    const rg = f.createLinearGradient(ST.x, ST.y, ST.x + ST.w * 0.6, ST.y + ST.h * 0.5);
    rg.addColorStop(0, "rgba(255,255,255,0.10)"); rg.addColorStop(0.5, "rgba(255,255,255,0.03)"); rg.addColorStop(0.51, "rgba(255,255,255,0)");
    f.fillStyle = rg; f.fillRect(ST.x, ST.y, ST.w, ST.h);
    f.restore();
    // esquinas redondeadas del tubo
    f.fillStyle = "#2a2226"; f.beginPath(); f.rect(ST.x - 4, ST.y - 4, ST.w + 8, ST.h + 8); roundRect(f, ST.x, ST.y, ST.w, ST.h, 36, false); f.fill("evenodd");
    TVFRONT = front;
  }
  function drawTVChrome(t) {
    const g = out;
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.drawImage(TVFRONT, 0, 0);
    g.setTransform(RS, 0, 0, RS, 0, 0);
    // logo de la serie arriba y etiqueta del capítulo abajo
    drawFeltWord(g, { text: "Fanny & Diego", size: 104, colors: [COL.pink, COL.mustard, COL.sky, COL.cream, COL.orange, COL.green], seed: 12 }, W / 2, 135, 0.3, t, { stagger: 0.04 });
    const F = feltTag({ text: `T${EP.meta.season} · Capítulo ${EP.meta.episode} · «${EP.meta.episode_title}»`, size: 40, bg: COL.cream });
    g.drawImage(F, W / 2 - F.width / 2, 1575);
    // mientras suena nuestra canción, una etiqueta de "ahora suena" que brinca a tiempo
    const su = t - EP.song.start, se = EP.song.end - t;
    if (su > 0 && se > -0.5) {
      const N = feltTag({ text: "♪  nuestra canción  ♪", size: 38, bg: COL.pink, fg: "#fff8ee" });
      const k = landing(su, 0.35, 0.5) * (1 - settle(-se, 0.4));
      const bt2 = clamp(pulse(t, BEATS, 0.4, 16, 0.6), -0.3, 1);
      g.save(); g.globalAlpha = clamp(k * 1.5);
      g.translate(W / 2, 1760 + (1 - k) * 60); g.rotate(-0.025 + 0.01 * Math.sin(t * 2)); g.scale(1 + 0.035 * bt2, 1 + 0.035 * bt2);
      g.drawImage(N, -N.width / 2, -N.height / 2); g.restore();
    }
    // luz de encendido que late a tiempo
    const bt = clamp(pulse(t, BEATS, 0.4, 14, 0.8), 0, 1);
    glow(g, 180, ST.y + ST.h + 115, 26 + 8 * bt, [255, 80, 80], 0.6 + 0.3 * bt);
  }

  function seek(t) {
    t = clamp(t, 0, EP.duration);
    out.setTransform(1, 0, 0, 1, 0, 0);
    if (V) out.drawImage(TVBACK, 0, 0); else { out.fillStyle = "#000"; out.fillRect(0, 0, cvs.width, cvs.height); }
    composite(t);
    out.setTransform(RS, 0, 0, RS, 0, 0);
    // grano de película a 12 fps y viñeta
    out.save(); out.beginPath(); out.rect(ST.x, ST.y, ST.w, ST.h); out.clip();
    out.globalCompositeOperation = "overlay"; out.globalAlpha = 0.07;
    out.drawImage(GRAIN[Math.floor(t * 12) % 3], ST.x, ST.y, ST.w, ST.h);
    out.globalCompositeOperation = "source-over"; out.globalAlpha = 1;
    if (!V) out.drawImage(VIGNETTE, 0, 0, W, H);
    out.restore();
    if (V) drawTVChrome(t);
  }

  async function init() {
    await Promise.all([document.fonts.load("600 40px Fredoka"), document.fonts.load("700 40px Dancing")]);
    const scenes = [...new Set(SEQ.filter((s) => s.scene).map((s) => s.scene).concat(["retrato"]))];
    await Promise.all(scenes.map((id) => loadImage(id, `../assets/scenes/hd/${id}.jpg`)));
    FIBER = buildFibers(); GRAIN = buildGrain(); VIGNETTE = buildVignette(W, H, 0.42); YARN = buildYarn();
    scenes.forEach(prepScene);
    if (V) buildTV();
    // precalienta cachés de texto
    seek(0);
  }
  window.DURATION = EP.duration;
  window.seek = seek;
  window.ready = init();
})();
