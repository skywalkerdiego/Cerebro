/* Motor "felt world": compone las 14 láminas como capas sobre un tablero de
 * fieltro y dibuja CUALQUIER instante con seek(t). Todo es determinista (sin
 * reloj ni azar libre): el mismo t siempre da el mismo cuadro, así que se
 * puede renderizar en paralelo y fuera de orden.
 *
 *   window.ready  -> promesa: fuentes, imágenes y texturas listas
 *   window.seek(t)-> dibuja el cuadro del segundo t
 *
 * Parámetros de URL: format=9x16|16x9, q=draft (media resolución, animatic)
 * Datos: window.TIMELINE (engine/timeline.js, generado desde la canción).
 */
"use strict";
(function () {
  const TL = window.TIMELINE;
  const Q = new URLSearchParams(location.search);
  const V = Q.get("format") !== "16x9";          // vertical 9:16 (formato nativo de la canción)
  const W = V ? 1080 : 1920, H = V ? 1920 : 1080;
  const RS = Q.get("q") === "draft" ? 0.5 : 1;   // escala de render
  const cvs = document.getElementById("c");
  cvs.width = Math.round(W * RS); cvs.height = Math.round(H * RS);
  const ctx = cvs.getContext("2d");
  const BEAT = 60 / TL.bpm, BAR = 4 * BEAT;
  const SC = TL.scenes;
  SC.forEach((s, i) => { s.i = i; s.cam = V ? s.cam9 : s.cam16; });

  // ── paleta (ver style_guide.md) ───────────────────────────────────────
  const COL = {
    thread: "#b3263a",      // hilo rojo (el de "Amoshit"): cose todos los parches
    threadHi: "#e0525f",
    cream: "#f3e7cf",       // fieltro crema de las etiquetas / marco
    creamDark: "#d9c6a3",
    ink: "#3a2618",
    teal: "#2f8f8a", mustard: "#e3a52b", pink: "#e0708a", purple: "#7a5aa8",
    green: "#5f9a4a", orange: "#e0763a", sky: "#6fa7d6", red: "#c8323c",
  };
  const FELT = [COL.teal, COL.mustard, COL.pink, COL.purple, COL.green, COL.orange, COL.sky, COL.red];

  // ── utilidades ───────────────────────────────────────────────────────
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const lerp = (a, b, t) => a + (b - a) * t;
  const hash = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const q12 = (t) => Math.floor(t * 12) / 12;   // "a dos por cuadro": lo de fieltro se mueve a 12 fps
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const hex = (c) => { const n = parseInt(c.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
  const rgba = (c, a = 1) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`;
  const mixC = (a, b, t) => [0, 1, 2].map((i) => lerp(a[i], b[i], t));
  const mk = (w, h) => { const c = document.createElement("canvas"); c.width = Math.max(1, Math.ceil(w)); c.height = Math.max(1, Math.ceil(h)); return c; };

  // ── resortes en forma cerrada (nada de easing genérico) ───────────────
  // respuesta al escalón de un oscilador amortiguado: 0 -> 1, velocidad inicial 0
  function spring(t, zeta, omega) {
    if (t <= 0) return 0;
    if (zeta < 1) {
      const wd = omega * Math.sqrt(1 - zeta * zeta);
      return 1 - Math.exp(-zeta * omega * t) * (Math.cos(wd * t) + ((zeta * omega) / wd) * Math.sin(wd * t));
    }
    return 1 - Math.exp(-omega * t) * (1 + omega * t);
  }
  // ω·t del primer cruce por 1 de un resorte subamortiguado
  const crossK = (z) => { const s = Math.sqrt(1 - z * z); return (Math.PI - Math.atan(s / z)) / s; };
  // resorte que llega (cruza 1) exactamente en tLand -> el "aterrizaje" cae en el beat
  const landing = (t, tLand, zeta) => spring(t, zeta, crossK(zeta) / Math.max(tLand, 1e-3));
  // dolly: resorte críticamente amortiguado persiguiendo un objetivo que avanza
  // a velocidad constante -> arranca orgánico y sigue de largo por el corte
  function dolly(t, D, omega) {
    const f = (u) => u - 2 / omega + (2 / omega + u) * Math.exp(-omega * u);
    return t <= 0 ? 0 : f(Math.min(t, D * 1.6)) / f(D);
  }
  // respuesta al impulso (un "golpe" que rebota y se apaga): para los beats
  function impulse(t, zeta = 0.3, omega = 22) {
    if (t < 0) return 0;
    const wd = omega * Math.sqrt(1 - zeta * zeta);
    return Math.exp(-zeta * omega * t) * Math.sin(wd * t);
  }

  // ── música ───────────────────────────────────────────────────────────
  function idxBefore(arr, t) {
    let lo = 0, hi = arr.length - 1, r = -1;
    while (lo <= hi) { const m = (lo + hi) >> 1; if (arr[m] <= t) { r = m; lo = m + 1; } else hi = m - 1; }
    return r;
  }
  function pulse(t, arr, zeta = 0.35, omega = 20, win = 1.0) {
    let s = 0;
    for (let i = idxBefore(arr, t); i >= 0 && t - arr[i] < win; i--) s += impulse(t - arr[i], zeta, omega);
    return s;
  }
  const energy = (t) => TL.env30[clamp(Math.round(t * 30), 0, TL.env30.length - 1)];
  function nearest(arr, t) { let b = arr[0]; for (const x of arr) if (Math.abs(x - t) < Math.abs(b - t)) b = x; return b; }
  const downIn = (a, b, frac) => nearest(TL.downbeats.filter((d) => d >= a && d <= b).concat([lerp(a, b, frac)]), lerp(a, b, frac));

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

  let FIBER, QUILT, GRAIN = [], VIGNETTE, YARN, PROPS = [];
  function buildFibers() {  // textura de fibras de fieltro (se repite sin costuras)
    const N = 512, c = mk(N, N), g = c.getContext("2d"), r = mulberry32(7);
    for (let i = 0; i < 6500; i++) {
      const x = r() * N, y = r() * N, a = r() * Math.PI * 2, L = 3 + r() * 13, b = (r() - 0.5) * 6;
      const light = r() < 0.5;
      g.strokeStyle = light ? `rgba(255,255,255,${0.04 + r() * 0.07})` : `rgba(0,0,0,${0.05 + r() * 0.08})`;
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
  function buildQuilt() {  // sombreado del tablero: parches irregulares con costuras
    const c = mk(W, H), g = c.getContext("2d"), r = mulberry32(11);
    const cols = V ? 3 : 5, rows = V ? 5 : 3;
    const P = [];
    for (let j = 0; j <= rows; j++) {
      P[j] = [];
      for (let i = 0; i <= cols; i++) {
        const jx = i > 0 && i < cols ? (r() - 0.5) * (W / cols) * 0.35 : 0;
        const jy = j > 0 && j < rows ? (r() - 0.5) * (H / rows) * 0.35 : 0;
        P[j][i] = [(i * W) / cols + jx, (j * H) / rows + jy];
      }
    }
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const q = [P[j][i], P[j][i + 1], P[j + 1][i + 1], P[j + 1][i]];
      const v = r() - 0.5;
      g.fillStyle = v > 0 ? `rgba(255,255,255,${v * 0.1})` : `rgba(0,0,0,${-v * 0.14})`;
      g.beginPath(); q.forEach((p, k) => (k ? g.lineTo(...p) : g.moveTo(...p))); g.closePath(); g.fill();
    }
    const seam = (a, b) => {
      g.setLineDash([]); g.lineWidth = 5; g.strokeStyle = "rgba(0,0,0,0.22)";
      g.beginPath(); g.moveTo(...a); g.lineTo(...b); g.stroke();
      g.lineWidth = 1.5; g.strokeStyle = "rgba(255,255,255,0.07)";
      g.beginPath(); g.moveTo(a[0] + 2, a[1] + 2); g.lineTo(b[0] + 2, b[1] + 2); g.stroke();
      // puntadas a ambos lados de la costura
      const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L;
      g.setLineDash([9, 9]); g.lineWidth = 2.2; g.strokeStyle = "rgba(255,240,220,0.16)";
      for (const s of [-9, 9]) { g.beginPath(); g.moveTo(a[0] + nx * s, a[1] + ny * s); g.lineTo(b[0] + nx * s, b[1] + ny * s); g.stroke(); }
    };
    for (let j = 0; j <= rows; j++) for (let i = 0; i < cols; i++) if (j > 0 && j < rows) seam(P[j][i], P[j][i + 1]);
    for (let j = 0; j < rows; j++) for (let i = 1; i < cols; i++) seam(P[j][i], P[j + 1][i]);
    return c;
  }
  function buildGrain() {
    const out = [];
    for (let k = 0; k < 3; k++) {
      const c = mk(W / 2, H / 2), g = c.getContext("2d"), d = g.createImageData(c.width, c.height), r = mulberry32(100 + k);
      for (let i = 0; i < d.data.length; i += 4) { const v = 128 + (r() - 0.5) * 70; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255; }
      g.putImageData(d, 0, 0); out.push(c);
    }
    return out;
  }
  function buildVignette() {
    const c = mk(W, H), g = c.getContext("2d");
    const gr = g.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.35, W / 2, H / 2, Math.hypot(W, H) * 0.62);
    gr.addColorStop(0, "rgba(0,0,0,0)"); gr.addColorStop(1, "rgba(0,0,0,0.55)");
    g.fillStyle = gr; g.fillRect(0, 0, W, H); return c;
  }
  function buildYarn() {  // hilo torcido: diagonales claras/oscuras
    const c = mk(12, 12), g = c.getContext("2d");
    g.strokeStyle = "rgba(255,255,255,0.35)"; g.lineWidth = 2.2;
    for (const o of [-12, 0, 12]) { g.beginPath(); g.moveTo(o, 12); g.lineTo(o + 12, 0); g.stroke(); }
    g.strokeStyle = "rgba(0,0,0,0.25)"; g.lineWidth = 1.2;
    for (const o of [-6, 6, 18]) { g.beginPath(); g.moveTo(o, 12); g.lineTo(o + 12, 0); g.stroke(); }
    return c;
  }

  // ── tipografía de fieltro cosido ─────────────────────────────────────
  // letras recortadas en fieltro (con fibra, volumen y grosor) y puntadas de
  // hilo a unos milímetros del borde, como el letrero "PREPA 9" y el de
  // "2 AÑOS JUNTOS". Se cachean; las variantes (v) dan el "hervor" de stop-motion.
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
    chars.forEach((c, i) => {
      place.push({ c, x, w: m.measureText(c).width, rot: (r() - 0.5) * 0.08, dy: (r() - 0.5) * size * 0.05, col: colors[i % colors.length] });
      x += adv[i];
    });
    const each = (g, fn) => place.forEach((p) => { if (p.c === " ") return; g.save(); g.translate(p.x + p.w / 2, base + p.dy); g.rotate(p.rot); g.translate(-p.w / 2, 0); g.font = font; fn(g, p); g.restore(); });
    const G = mk(cw, ch), g = G.getContext("2d");
    each(g, (gg, p) => { gg.fillStyle = p.col; gg.fillText(p.c, 0, 0); });
    g.globalCompositeOperation = "source-atop";
    g.fillStyle = g.createPattern(FIBER, "repeat"); g.fillRect(0, 0, cw, ch);
    const gr = g.createLinearGradient(0, base - size * 0.85, 0, base + size * 0.15);
    gr.addColorStop(0, "rgba(255,255,255,0.20)"); gr.addColorStop(0.5, "rgba(255,255,255,0)"); gr.addColorStop(1, "rgba(0,0,0,0.22)");
    g.fillStyle = gr; g.fillRect(0, 0, cw, ch);
    g.globalCompositeOperation = "source-over";
    // puntadas: banda punteada [inset, inset+hilo] hacia adentro del contorno
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
    // grosor del fieltro + sombra
    const F = mk(cw, ch), f = F.getContext("2d");
    f.save(); f.filter = "brightness(0.5)"; f.drawImage(G, 0, size * 0.035); f.restore();
    f.save(); f.shadowColor = "rgba(0,0,0,0.45)"; f.shadowBlur = size * 0.09; f.shadowOffsetY = size * 0.06; f.drawImage(G, 0, 0); f.restore();
    F.meta = { pad, base, textW, place };
    TXT.set(key, F);
    return F;
  }
  // texto "de hilo" (cursiva cosida): subtítulos y pies de escena
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
  // etiqueta de fieltro con puntadas (para los actos)
  function feltTag(o) {
    const key = "G" + JSON.stringify(o);
    if (TXT.has(key)) return TXT.get(key);
    const { text, num, size, bg } = o;
    const font = `600 ${size}px Fredoka`;
    const m = mk(8, 8).getContext("2d"); m.font = font;
    const tw = m.measureText(text).width, nw = num ? size * 1.5 : 0;
    const w = tw + nw + size * 1.6, h = size * 1.95, pad = size * 0.5;
    const C = mk(w + pad * 2, h + pad * 2), g = C.getContext("2d");
    g.translate(pad, pad);
    roundRect(g, 0, 0, w, h, h * 0.28); g.fillStyle = bg; g.fill();
    g.save(); g.clip(); g.fillStyle = g.createPattern(FIBER, "repeat"); g.fillRect(0, 0, w, h); g.restore();
    g.setLineDash([size * 0.3, size * 0.22]); g.lineWidth = Math.max(1.5, size * 0.07); g.strokeStyle = COL.thread;
    roundRect(g, size * 0.22, size * 0.22, w - size * 0.44, h - size * 0.44, h * 0.2); g.stroke();
    g.setLineDash([]);
    if (num) {  // circulito con el número del acto
      g.fillStyle = COL.thread; g.beginPath(); g.arc(size * 0.55 + nw / 2, h / 2, size * 0.62, 0, Math.PI * 2); g.fill();
      g.fillStyle = COL.cream; g.font = `700 ${size * 0.8}px Fredoka`; g.textAlign = "center"; g.textBaseline = "middle";
      g.fillText(num, size * 0.55 + nw / 2, h / 2 + size * 0.04);
    }
    g.textAlign = "left"; g.textBaseline = "middle"; g.font = font; g.fillStyle = COL.ink;
    g.fillText(text, size * 0.8 + nw, h / 2 + size * 0.05);
    const F = mk(C.width, C.height), f = F.getContext("2d");
    f.shadowColor = "rgba(0,0,0,0.45)"; f.shadowBlur = size * 0.3; f.shadowOffsetY = size * 0.14; f.drawImage(C, 0, 0);
    F.meta = { w, h, pad };
    TXT.set(key, F);
    return F;
  }
  function roundRect(g, x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r);
    g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath();
  }
  // dibuja un texto cacheado centrado en (x, y) con aparición letra por letra
  function drawFeltWord(o, x, y, tShow, t, opts = {}) {
    const v = Math.floor(t * 12) % 3;  // hervor de puntadas a 12 fps
    const F = feltText({ ...o, v });
    const { pad, base, place, textW } = F.meta;
    const x0 = x - textW / 2 - pad, y0 = y - base + o.size * 0.36;
    const stagger = opts.stagger ?? 0.055;
    place.forEach((p, i) => {
      if (p.c === " ") return;
      const u = t - (tShow + i * stagger);
      if (u <= -0.6) return;
      const s = landing(u + 0.3, 0.3, 0.55);  // cada letra cae y rebota
      const lx = x0 + p.x - o.size * 0.12, lw = p.w + o.size * 0.24;
      ctx.save();
      ctx.globalAlpha *= clamp(u / 0.12 + 2.5);
      ctx.translate(lx + lw / 2, y0 + base);
      ctx.translate(0, -(1 - s) * o.size * 1.4);
      ctx.rotate((1 - s) * (hash(i + o.seed) - 0.5) * 0.9);
      ctx.drawImage(F, lx - x0, 0, lw, F.height, -lw / 2, -base, lw, F.height);
      ctx.restore();
    });
  }
  // pie de escena "cosido": se revela de izquierda a derecha con una aguja
  function drawSewn(o, x, y, t0, t, dur = 0.9) {
    const F = threadText(o);
    const { pad, base, textW } = F.meta;
    const p = clamp((t - t0) / dur);
    if (p <= 0) return;
    const pp = spring(p * dur, 1, 6 / dur) / spring(dur, 1, 6 / dur);  // la aguja arranca y frena con resorte
    const x0 = x - textW / 2 - pad, y0 = y - base + o.size * 0.35;
    const cut = pad + textW * pp + o.size * 0.2;
    ctx.drawImage(F, 0, 0, cut, F.height, x0, y0, cut, F.height);
    if (p < 1) {  // aguja
      const nx = x0 + cut, ny = y0 + base - o.size * 0.3;
      ctx.save(); ctx.translate(nx, ny); ctx.rotate(-0.6 + Math.sin(t * 30) * 0.08);
      const L = o.size * 1.2;
      const gr = ctx.createLinearGradient(0, 0, L, 0); gr.addColorStop(0, "#fafafa"); gr.addColorStop(1, "#8d8f96");
      ctx.fillStyle = gr; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(L, -o.size * 0.05); ctx.lineTo(L, o.size * 0.05); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = COL.thread; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(L * 0.92, 0);
      ctx.quadraticCurveTo(L * 1.3, o.size * 0.5, L * 0.6, o.size * 0.8); ctx.stroke();
      ctx.restore();
    }
  }

  // ── cámara ───────────────────────────────────────────────────────────
  const pre = (s) => (s ? TR_PRE(s) : 0);
  function camAt(s, t) {
    const c = s.cam;
    const nx = SC[s.i + 1];
    const t0 = s.start - pre(s), t1 = s.end + (nx ? TR_POST(nx) + 0.2 : 0);
    const D = Math.max(0.5, t1 - t0), u = t - t0;
    let p;
    if (c.mode === "settle") p = spring(u, (c.spring && c.spring.zeta) || 0.95, 7.2 / D);
    else p = dolly(u, D, 3.0);
    return {
      x: lerp(c.from.x, c.to.x, p), y: lerp(c.from.y, c.to.y, p),
      z: Math.exp(lerp(Math.log(c.from.z), Math.log(c.to.z), p)),
      c0: { x: (c.from.x + c.to.x) / 2, y: (c.from.y + c.to.y) / 2, z: Math.sqrt(c.from.z * c.to.z) },
    };
  }
  // ventana de la imagen (en px de la imagen) para un aspecto y una cámara
  function srcRect(iw, ih, aspect, cam, clampIt = true) {
    let ww, wh;
    if (iw / ih > aspect) { wh = ih; ww = ih * aspect; } else { ww = iw; wh = iw / aspect; }
    ww /= cam.z; wh /= cam.z;
    let cx = cam.x * iw, cy = cam.y * ih;
    if (clampIt) { cx = clamp(cx, ww / 2, iw - ww / 2); cy = clamp(cy, wh / 2, ih - wh / 2); }
    return { sx: cx - ww / 2, sy: cy - wh / 2, sw: ww, sh: wh };
  }

  // ── layout del parche (tarjeta) según formato ─────────────────────────
  const MAT = V ? 18 : 16;
  function baseRect(s) {
    const a = s.cam.aspect;
    if (s.id === "retrato") {
      if (V) { const w = 880, h = w / a; return { x: (W - w) / 2, y: 118, w, h }; }
      const h = 880, w = h * a; return { x: W * 0.31 - w / 2, y: (H - h) / 2, w, h };
    }
    if (V) { const w = 968, h = w / a; return { x: (W - w) / 2, y: 930 - h / 2, w, h }; }
    let h = 880, w = h * a; if (w > 1640) { w = 1640; h = w / a; }
    return { x: (W - w) / 2, y: (H - h) / 2 - 6, w, h };
  }

  // sombra suave del parche (cacheada por tamaño)
  const SHADOW = new Map();
  function cardShadow(w, h) {
    const k = `${Math.round(w / 8)}x${Math.round(h / 8)}`;
    if (SHADOW.has(k)) return SHADOW.get(k);
    const b = 60, c = mk(w + b * 2, h + b * 2), g = c.getContext("2d");
    g.shadowColor = "rgba(0,0,0,0.55)"; g.shadowBlur = 38; g.shadowOffsetY = 18;
    g.fillStyle = "#000"; roundRect(g, b, b, w, h, 30); g.fill();
    g.globalCompositeOperation = "destination-out"; roundRect(g, b, b, w, h, 30); g.fill();
    if (SHADOW.size > 40) SHADOW.clear();
    SHADOW.set(k, c); return c;
  }

  // ── contenido de una escena dentro de su parche ──────────────────────
  function drawContent(s, t, w, h) {
    const cam = camAt(s, t);
    const aspect = w / h;
    const x0 = -w / 2, y0 = -h / 2;
    let base;
    if (s.layers) {
      const im0 = IMG[s.layers[0].src];
      base = srcRect(im0.width, im0.height, aspect, cam, true);
      const bc = { x: base.sx + base.sw / 2, y: base.sy + base.sh / 2 };
      const c0 = srcRect(im0.width, im0.height, aspect, { ...cam.c0 }, true);
      const cc = { x: c0.sx + c0.sw / 2, y: c0.sy + c0.sh / 2 };
      s.layers.forEach((L, li) => {
        const im = IMG[L.src];
        const zk = Math.pow(cam.z / cam.c0.z, L.p);          // los planos cercanos "crecen" más
        const sw = base.sw / zk, sh = base.sh / zk;
        let cx = bc.x + (bc.x - cc.x) * L.p, cy = bc.y + (bc.y - cc.y) * L.p;
        let oy = 0;
        if (s.fx && s.fx.includes("bache") && li === s.layers.length - 1) {
          oy = -Math.abs(pulse(t, TL.beats, 0.35, 24, 0.6)) * sh * 0.012;  // el coche brinca con cada beat
        }
        cx = clamp(cx, sw / 2, im.width - sw / 2); cy = clamp(cy + oy, sh / 2, im.height - sh / 2);
        ctx.drawImage(im, cx - sw / 2, cy - sh / 2, sw, sh, x0, y0, w, h);
      });
      base = srcRect(im0.width, im0.height, aspect, cam, true);
    } else {
      const im = IMG[s.id];
      base = srcRect(im.width, im.height, aspect, cam, true);
      ctx.drawImage(im, base.sx, base.sy, base.sw, base.sh, x0, y0, w, h);
    }
    const im = s.layers ? IMG[s.layers[0].src] : IMG[s.id];
    const k = w / base.sw;
    return {
      x0, y0, w, h, k,
      map: (ix, iy) => ({ x: x0 + (ix * im.width - base.sx) * k, y: y0 + (iy * im.height - base.sy) * k }),
    };
  }

  // ── efectos (partículas y luz) coherentes con el mundo de fieltro ─────
  function noteShape(g, s, col, flag) {
    g.fillStyle = col; g.strokeStyle = "rgba(0,0,0,0.35)"; g.lineWidth = s * 0.06;
    g.save(); g.rotate(-0.35); g.beginPath(); g.ellipse(0, 0, s * 0.34, s * 0.25, 0, 0, Math.PI * 2); g.fill(); g.stroke(); g.restore();
    g.fillRect(s * 0.26, -s * 1.05, s * 0.1, s * 1.05);
    if (flag) { g.beginPath(); g.moveTo(s * 0.36, -s * 1.05); g.quadraticCurveTo(s * 0.8, -s * 0.8, s * 0.62, -s * 0.4); g.quadraticCurveTo(s * 0.62, -s * 0.72, s * 0.36, -s * 0.72); g.fill(); }
    g.setLineDash([s * 0.08, s * 0.07]); g.strokeStyle = "rgba(255,245,230,0.7)"; g.lineWidth = s * 0.035;
    g.beginPath(); g.ellipse(0, 0, s * 0.2, s * 0.13, -0.35, 0, Math.PI * 2); g.stroke(); g.setLineDash([]);
  }
  function heartPath(g, s) {
    g.beginPath(); g.moveTo(0, s * 0.35);
    g.bezierCurveTo(-s * 0.9, -s * 0.25, -s * 0.35, -s * 0.9, 0, -s * 0.38);
    g.bezierCurveTo(s * 0.35, -s * 0.9, s * 0.9, -s * 0.25, 0, s * 0.35); g.closePath();
  }
  function leafPath(g, s) {
    g.beginPath(); g.moveTo(-s, 0); g.quadraticCurveTo(0, -s * 0.55, s, 0); g.quadraticCurveTo(0, s * 0.55, -s, 0); g.closePath();
  }
  function glow(x, y, r, col, a) {
    const gr = ctx.createRadialGradient(x, y, 0, x, y, r);
    gr.addColorStop(0, rgba(col, a)); gr.addColorStop(1, rgba(col, 0));
    ctx.fillStyle = gr; ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }

  const FX = {
    pelusa(s, t, v) { FX.polvo_luz(s, t, v, 26, [255, 236, 210], 0.5); },
    polvo_luz(s, t, v, N = 34, col = [255, 232, 190], amp = 0.65) {
      ctx.save(); ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < N; i++) {
        const x = v.x0 + v.w * ((hash(i) + Math.sin(t * 0.21 + i) * 0.03 + t * 0.004 * (hash(i * 5) - 0.5)) % 1 + 1) % 1;
        const y = v.y0 + v.h * (((hash(i * 2.3) - t * 0.012 * (0.5 + hash(i * 9))) % 1) + 1) % 1;
        const tw = 0.5 + 0.5 * Math.sin(t * (1 + hash(i * 4) * 2) + i * 3);
        const r = v.w * (0.002 + 0.004 * hash(i * 6.1));
        glow(x, y, r * 3, col, amp * tw * 0.5);
      }
      ctx.restore();
    },
    rayos(s, t, v) {
      const o = v.map(0.62, -0.05);
      ctx.save(); ctx.globalCompositeOperation = "screen";
      for (let k = 0; k < 4; k++) {
        const a = 1.95 + k * 0.16 + Math.sin(t * 0.4 + k * 1.3) * 0.04, spread = 0.05 + 0.02 * hash(k);
        const L = v.h * 1.4;
        const gr = ctx.createLinearGradient(o.x, o.y, o.x + Math.cos(a) * L, o.y + Math.sin(a) * L);
        const al = 0.10 + 0.05 * Math.sin(t * 0.7 + k);
        gr.addColorStop(0, `rgba(255,228,170,${al})`); gr.addColorStop(1, "rgba(255,228,170,0)");
        ctx.fillStyle = gr; ctx.beginPath(); ctx.moveTo(o.x, o.y);
        ctx.lineTo(o.x + Math.cos(a - spread) * L, o.y + Math.sin(a - spread) * L);
        ctx.lineTo(o.x + Math.cos(a + spread) * L, o.y + Math.sin(a + spread) * L); ctx.closePath(); ctx.fill();
      }
      ctx.restore();
    },
    sol(s, t, v) {
      const p = v.map(0.19, 0.3);
      ctx.save(); ctx.globalCompositeOperation = "screen";
      const br = 1 + 0.06 * Math.sin(t * 1.3) + 0.05 * pulse(t, TL.downbeats, 0.5, 10, 1.2);
      glow(p.x, p.y, v.w * 0.42 * br, [255, 196, 120], 0.38);
      glow(p.x, p.y, v.w * 0.12 * br, [255, 240, 200], 0.5);
      const cx = v.x0 + v.w / 2, cy = v.y0 + v.h / 2;  // fantasmas de lente
      [0.55, 0.9, 1.25].forEach((f, k) => glow(lerp(p.x, cx, f * 2), lerp(p.y, cy, f * 2), v.w * (0.03 + k * 0.02), [255, 210, 150], 0.14));
      ctx.restore();
    },
    viento(s, t, v) {
      ctx.save(); ctx.lineCap = "round";
      for (let i = 0; i < 8; i++) {
        const ph = (t * (1.1 + hash(i) * 0.8) + hash(i * 3)) % 1;
        const x = v.x0 + v.w * (1.25 - ph * 1.6), y = v.y0 + v.h * (0.12 + 0.7 * hash(i * 7));
        ctx.strokeStyle = `rgba(255,245,225,${0.22 * Math.sin(Math.PI * ph)})`; ctx.lineWidth = v.w * 0.004;
        ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + v.w * 0.08, y - v.w * 0.01, x + v.w * 0.17, y); ctx.stroke();
      }
      ctx.restore();
    },
    salud(s, t, v) {  // el choque de tarros cae en un tiempo fuerte: espuma de fieltro
      const tc = downIn(s.start + BEAT, s.end - BEAT, 0.42);
      const age = q12(t) - tc;
      const o = v.map(0.5, 0.2);
      if (age >= 0 && age < 1.6) {
        for (let i = 0; i < 10; i++) {  // gotas de espuma de fieltro (con borde y puntada)
          const a = -Math.PI * (0.34 + 0.32 * hash(i * 2.7)), sp = v.w * (0.16 + 0.2 * hash(i * 5.3));
          const x = o.x + Math.cos(a) * sp * age, y = o.y + Math.sin(a) * sp * age + 0.5 * v.h * 2.4 * age * age;
          const r = v.w * (0.009 + 0.009 * hash(i)) * (1 - 0.5 * age / 1.6);
          ctx.save(); ctx.translate(x, y); ctx.rotate(age * 4 + i); ctx.globalAlpha *= clamp(1.4 - age);
          ctx.fillStyle = "rgba(90,60,30,0.35)"; ctx.beginPath(); ctx.ellipse(r * 0.12, r * 0.18, r, r * 0.86, 0, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = i % 4 ? "#fbf3df" : "#f3cf74"; ctx.beginPath(); ctx.ellipse(0, 0, r, r * 0.86, 0, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = "rgba(180,140,90,0.7)"; ctx.lineWidth = r * 0.14; ctx.setLineDash([r * 0.3, r * 0.25]);
          ctx.beginPath(); ctx.ellipse(0, 0, r * 0.62, r * 0.52, 0, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
          ctx.restore();
        }
        const st = spring(age, 0.5, 16) * (1 - clamp(age / 0.5));  // destello en estrella
        ctx.save(); ctx.translate(o.x, o.y); ctx.globalCompositeOperation = "lighter";
        ctx.fillStyle = `rgba(255,248,220,${0.9 * (1 - clamp(age / 0.5))})`;
        const R = v.w * 0.09 * st;
        ctx.beginPath();
        for (let k = 0; k < 8; k++) { const rr = k % 2 ? R * 0.22 : R; const aa = (k * Math.PI) / 4; ctx.lineTo(Math.cos(aa) * rr, Math.sin(aa) * rr); }
        ctx.closePath(); ctx.fill(); ctx.restore();
      }
    },
    reflectores(s, t, v) {
      const lamps = [[0.2, 0.09, [255, 80, 80]], [0.32, 0.09, [90, 140, 255]], [0.7, 0.09, [255, 80, 80]], [0.83, 0.09, [255, 220, 90]]];
      const bp = pulse(t, TL.beats, 0.45, 16, 0.6);
      ctx.save(); ctx.globalCompositeOperation = "screen";
      lamps.forEach(([lx, ly, col], k) => {
        const p = v.map(lx, ly);
        const tx = v.map(0.5 + 0.16 * Math.sin(t * 1.15 + k * 1.7), 0.9);
        const half = v.w * 0.11;
        const inten = 0.16 + 0.14 * clamp(bp, 0, 1.2);
        const gr = ctx.createLinearGradient(p.x, p.y, tx.x, tx.y);
        gr.addColorStop(0, rgba(col, inten * 1.6)); gr.addColorStop(1, rgba(col, 0));
        ctx.fillStyle = gr; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(tx.x - half, tx.y); ctx.lineTo(tx.x + half, tx.y); ctx.closePath(); ctx.fill();
        glow(p.x, p.y, v.w * 0.07, col, 0.35 + 0.3 * clamp(bp, 0, 1));
      });
      ctx.restore();
    },
    tele(s, t, v) {
      const p = v.map(0.29, 0.5);
      const fl = 0.7 + 0.3 * hash(Math.floor(t * 12)) + 0.08 * Math.sin(t * 23);
      ctx.save(); ctx.globalCompositeOperation = "screen";
      glow(p.x, p.y, v.w * 0.55, [150, 180, 255], 0.16 * fl);
      glow(p.x, p.y, v.w * 0.16, [220, 230, 255], 0.14 * fl);
      ctx.restore();
    },
    luciernagas(s, t, v) {
      ctx.save(); ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < 16; i++) {
        const x = v.x0 + v.w * (0.1 + 0.8 * hash(i * 1.7) + 0.06 * Math.sin(t * (0.3 + hash(i) * 0.4) + i));
        const y = v.y0 + v.h * (0.15 + 0.65 * hash(i * 4.1) + 0.05 * Math.sin(t * (0.25 + hash(i * 2) * 0.3) + i * 2));
        const b = Math.pow(Math.max(0, Math.sin(t * (1.2 + hash(i * 3) * 1.5) + i * 5)), 2);
        glow(x, y, v.w * 0.03, [255, 214, 120], 0.55 * b);
        glow(x, y, v.w * 0.006, [255, 250, 220], 0.9 * b);
      }
      ctx.restore();
    },
    flash(s, t, v) {  // el flash de su cámara, en un tiempo fuerte
      const tf = downIn(s.start + BEAT, s.end - BEAT, 0.55);
      const age = t - tf;
      if (age < 0 || age > 0.8) return;
      const p = v.map(0.31, 0.4);
      ctx.save(); ctx.globalCompositeOperation = "lighter";
      glow(p.x, p.y, v.w * 0.5, [255, 255, 255], 0.9 * Math.exp(-age * 9));
      ctx.fillStyle = `rgba(255,255,255,${0.45 * Math.exp(-age * 14)})`; ctx.fillRect(v.x0, v.y0, v.w, v.h);
      ctx.restore();
    },
    hojas(s, t, v) {
      const tq = q12(t), P = 5, cols = [[95, 154, 74], [70, 130, 70], [140, 180, 80], [224, 112, 138], [230, 150, 60]];
      for (let i = 0; i < 16; i++) {
        const age = (tq + hash(i * 2) * P) % P, life = age / P;
        const x = v.x0 + v.w * hash(i * 1.3) + Math.sin(age * 1.6 + i) * v.w * 0.05;
        const y = v.y0 + v.h * (-0.08 + life * 1.16);
        const sz = v.w * 0.018 * (0.8 + 0.5 * hash(i * 9));
        ctx.save(); ctx.translate(x, y); ctx.rotate(age * 1.8 + i); ctx.scale(1, 0.6 + 0.4 * Math.sin(age * 3 + i));
        ctx.globalAlpha *= Math.min(1, Math.sin(Math.PI * life) * 3);
        leafPath(ctx, sz); ctx.fillStyle = rgba(cols[i % cols.length]); ctx.fill();
        ctx.strokeStyle = "rgba(255,255,230,0.45)"; ctx.lineWidth = sz * 0.1; ctx.setLineDash([sz * 0.25, sz * 0.2]);
        ctx.beginPath(); ctx.moveTo(-sz * 0.8, 0); ctx.lineTo(sz * 0.8, 0); ctx.stroke(); ctx.setLineDash([]);
        ctx.restore();
      }
    },
    confeti(s, t, v) {  // estalla EN el golpe del clímax
      const t0 = s.start, age = q12(t) - t0;
      if (age < 0) return;
      const o = v.map(0.5, 0.16);
      const cols = FELT;
      const drawPiece = (i, x, y, rot, sz, a) => {
        ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.globalAlpha *= a;
        ctx.fillStyle = cols[i % cols.length];
        const kind = i % 3;
        if (kind === 0) { heartPath(ctx, sz); ctx.fill(); }
        else if (kind === 1) { ctx.beginPath(); ctx.arc(0, 0, sz * 0.45, 0, Math.PI * 2); ctx.fill(); }
        else { ctx.fillRect(-sz * 0.5, -sz * 0.25, sz, sz * 0.5); }
        ctx.strokeStyle = "rgba(255,245,230,0.55)"; ctx.lineWidth = sz * 0.07; ctx.setLineDash([sz * 0.14, sz * 0.12]);
        if (kind === 0) { ctx.save(); ctx.scale(0.7, 0.7); heartPath(ctx, sz); ctx.restore(); ctx.stroke(); }
        ctx.setLineDash([]); ctx.restore();
      };
      // estallido: balística con arrastre (forma cerrada)
      const kd = 1.6, g = v.h * 0.9;
      for (let i = 0; i < 70; i++) {
        const a = -Math.PI / 2 + (hash(i * 3.3) - 0.5) * 2.6, sp = v.w * (0.6 + 1.1 * hash(i * 1.9));
        const e = (1 - Math.exp(-kd * age)) / kd;
        const x = o.x + Math.cos(a) * sp * e + Math.sin(age * 2 + i) * v.w * 0.02;
        const y = o.y + Math.sin(a) * sp * e + (g / kd) * (age - e);
        if (y > v.y0 + v.h + 40) continue;
        drawPiece(i, x, y, age * (2 + hash(i) * 3) + i, v.w * (0.018 + 0.016 * hash(i * 7)), 1);
      }
      // llovizna continua de confeti
      const P = 4.2;
      for (let i = 0; i < 22; i++) {
        const ag = (age + hash(i * 5) * P) % P, life = ag / P;
        if (age < hash(i * 5) * P * 0.2) continue;
        const x = v.x0 + v.w * hash(i * 2.1) + Math.sin(ag * 1.4 + i) * v.w * 0.04;
        const y = v.y0 + v.h * (-0.05 + life * 1.1);
        drawPiece(i + 3, x, y, ag * 2 + i, v.w * 0.016, clamp(age - 0.6));
      }
    },
    sol_letrero(s, t, v) {
      const p = v.map(0.5, 0.055);
      const bp = clamp(pulse(t, TL.downbeats, 0.5, 9, 1.6), 0, 1.2);
      const burst = Math.exp(-Math.max(0, t - s.start) * 1.5);
      ctx.save(); ctx.globalCompositeOperation = "screen";
      glow(p.x, p.y, v.w * (0.16 + 0.1 * burst), [255, 220, 130], 0.35 + 0.25 * bp + 0.3 * burst);
      ctx.translate(p.x, p.y); ctx.rotate(t * 0.15);
      for (let k = 0; k < 12; k++) {
        ctx.rotate(Math.PI / 6);
        const L = v.w * (0.1 + 0.06 * bp + 0.12 * burst);
        const gr = ctx.createLinearGradient(0, 0, L, 0); gr.addColorStop(0, "rgba(255,230,160,0.35)"); gr.addColorStop(1, "rgba(255,230,160,0)");
        ctx.fillStyle = gr; ctx.beginPath(); ctx.moveTo(0, -v.w * 0.006); ctx.lineTo(L, 0); ctx.lineTo(0, v.w * 0.006); ctx.fill();
      }
      ctx.restore();
    },
  };

  // efectos que se salen del parche (se dibujan sin recorte, encima del marco)
  const FX_OUT = {
    notas(s, t, v) {  // notas de fieltro que brotan por los costados y suben al tablero
      const tq = q12(t), N = 10, P = 3.4, e = energy(t);
      const bb = pulse(t, TL.beats, 0.4, 18, 0.5);
      for (let i = 0; i < N; i++) {
        const age = (tq + hash(i) * P) % P, life = age / P;
        const side = i % 2 ? 1 : -1;
        const x = side * v.w * (0.44 + 0.1 * hash(i * 3.1)) + Math.sin(age * 2.2 + i) * v.w * 0.03 + side * life * v.w * 0.06;
        const y = v.h * (0.35 - life * 1.05);
        const sz = v.w * 0.06 * (0.8 + 0.4 * hash(i * 7.7)) * (1 + 0.16 * bb * (0.5 + e));
        ctx.save(); ctx.globalAlpha *= Math.pow(Math.sin(Math.PI * life), 0.5) * 0.95;
        ctx.translate(x, y); ctx.rotate(Math.sin(age * 3 + i) * 0.28 + side * 0.1);
        noteShape(ctx, sz, FELT[(i * 3) % FELT.length], i % 3 !== 0); ctx.restore();
      }
    },
  };

  // ── un parche completo: sombra, marco de fieltro, contenido, puntadas ──
  function drawCard(s, t, r, o = {}) {
    // r: {x,y,w,h}; o: {dx,dy,rot,scale,sx,alpha,dark}
    const w = r.w, h = r.h;
    ctx.save();
    ctx.globalAlpha *= o.alpha ?? 1;
    ctx.translate(r.x + w / 2 + (o.dx || 0), r.y + h / 2 + (o.dy || 0));
    ctx.rotate(o.rot || 0);
    const sc = o.scale ?? 1;
    ctx.scale(sc * (o.sx ?? 1), sc * (o.sy ?? 1));
    const sh = cardShadow(w + MAT * 2, h + MAT * 2);
    ctx.drawImage(sh, -w / 2 - MAT - 60, -h / 2 - MAT - 60);
    roundRect(ctx, -w / 2 - MAT, -h / 2 - MAT, w + 2 * MAT, h + 2 * MAT, 30);
    ctx.fillStyle = COL.cream; ctx.fill();
    ctx.save(); ctx.clip(); ctx.fillStyle = ctx.createPattern(FIBER, "repeat"); ctx.fillRect(-w / 2 - MAT, -h / 2 - MAT, w + 2 * MAT, h + 2 * MAT); ctx.restore();
    ctx.save();
    roundRect(ctx, -w / 2, -h / 2, w, h, 16); ctx.clip();
    ctx.fillStyle = "#1a1418"; ctx.fillRect(-w / 2, -h / 2, w, h);
    const view = drawContent(s, t, w, h);
    (s.fx || []).forEach((f) => FX[f] && FX[f](s, t, view));
    // sombra interior: el parche está cosido "hacia adentro"
    const ig = ctx.createLinearGradient(0, -h / 2, 0, -h / 2 + 26);
    ig.addColorStop(0, "rgba(0,0,0,0.35)"); ig.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = ig; ctx.fillRect(-w / 2, -h / 2, w, 26);
    if (o.dark) { ctx.fillStyle = `rgba(10,6,14,${o.dark})`; ctx.fillRect(-w / 2, -h / 2, w, h); }
    ctx.restore();
    // puntadas de hilo rojo sobre el marco
    const dash = [12, 9], off = (Math.floor(t * 12) % 3) * 0.6;
    ctx.lineWidth = 3.4; ctx.setLineDash(dash); ctx.lineDashOffset = off;
    ctx.strokeStyle = "rgba(60,20,20,0.35)";
    roundRect(ctx, -w / 2 - MAT / 2 + 0.8, -h / 2 - MAT / 2 + 1.4, w + MAT, h + MAT, 24); ctx.stroke();
    ctx.strokeStyle = COL.thread;
    roundRect(ctx, -w / 2 - MAT / 2, -h / 2 - MAT / 2, w + MAT, h + MAT, 24); ctx.stroke();
    ctx.setLineDash([]);
    (s.fx || []).forEach((f) => FX_OUT[f] && FX_OUT[f](s, t, view));
    // pie de escena cosido (viaja con su parche)
    if (s.caption && !o.noCaption) {
      if (V) drawSewn({ text: s.caption, size: 64, color: COL.cream }, 0, h / 2 + MAT + 92, s.start + 0.35, t);
      else {
        const F = threadText({ text: s.caption, size: 46, color: COL.ink });
        const tw = F.meta.textW + 70, th = 84;
        const lx = w / 2 - tw * 0.55, ly = h / 2 - th * 0.35;
        ctx.save(); ctx.translate(lx, ly); ctx.rotate(0.035);
        const pop = landing(t - s.start - 0.2 + 0.25, 0.25, 0.6);
        ctx.scale(pop, pop);
        ctx.fillStyle = "rgba(0,0,0,0.35)"; roundRect(ctx, -tw / 2 + 3, -th / 2 + 7, tw, th, 16); ctx.fill();
        ctx.fillStyle = COL.cream; roundRect(ctx, -tw / 2, -th / 2, tw, th, 16); ctx.fill();
        ctx.setLineDash([9, 7]); ctx.strokeStyle = COL.thread; ctx.lineWidth = 2.6; roundRect(ctx, -tw / 2 + 9, -th / 2 + 9, tw - 18, th - 18, 10); ctx.stroke(); ctx.setLineDash([]);
        ctx.restore();
        drawSewn({ text: s.caption, size: 46, color: COL.ink }, lx, ly + 4, s.start + 0.4, t, 0.8);
      }
    }
    ctx.restore();
    return view;
  }

  // ── transiciones ─────────────────────────────────────────────────────
  // pre = cuánto antes del corte empieza; post = cuánto dura después
  function TR_PRE(s) {
    const d = s.tdur || 0;
    return { drop: d, slide: d, flip: d * 0.5, whip: d * 0.6, fade: d * 0.5, darken: d * 0.5, grow: d, flash: 0, none: 0 }[s.transition] ?? 0;
  }
  function TR_POST(s) {
    const d = s.tdur || 0;
    return { drop: 0.35, slide: 0.35, flip: d * 0.5, whip: d * 0.4, fade: d * 0.5, darken: d * 0.5, grow: 0.3, flash: 0.45, none: 0 }[s.transition] ?? 0;
  }
  function beatTilt(s, t) {  // el parche "respira" con los tiempos fuertes cuando hay energía
    const e = energy(t);
    return 1 + 0.007 * e * e * pulse(t, TL.downbeats, 0.4, 14, 1.0);
  }
  function drawSolo(s, t, o = {}) {
    if (s.id === "titulo") return drawTitle(t, o);
    const r = baseRect(s);
    return drawCard(s, t, r, { scale: beatTilt(s, t), ...o });
  }
  function drawTransition(A, B, t) {
    const tau = t - B.start, P = TR_PRE(B), Po = TR_POST(B);
    const u = tau + P;  // tiempo desde que empieza la transición
    const rB = B.id === "titulo" ? null : baseRect(B);
    switch (B.transition) {
      case "drop": {
        const l = landing(u, P, 0.55);
        const fadeA = clamp(tau / Po);
        drawSolo(A, t, { alpha: 1 - fadeA, dark: 0.35 * clamp(u / P), scale: 1 - 0.03 * clamp(u / P) });
        drawCard(B, t, rB, { dy: -(1 - l) * H * 0.85, rot: (1 - l) * -0.07 });
        break;
      }
      case "slide": {
        const l = landing(u, P, 0.72), D = W * 1.12;
        const vA = drawSolo(A, t, { dx: -l * D, rot: l * -0.03 });
        drawCard(B, t, rB, { dx: (1 - l) * D, rot: (1 - l) * 0.05 });
        // el hilo rojo que une un parche con el siguiente
        const rA = A.id === "titulo" ? { x: W / 2, y: H / 2, w: 0, h: 0 } : baseRect(A);
        const ax = rA.x + rA.w + MAT - l * D, ay = rA.y + rA.h * 0.5;
        const bx = rB.x - MAT + (1 - l) * D, by = rB.y + rB.h * 0.5;
        if (tau < Po) {
          ctx.save(); ctx.globalAlpha = 1 - clamp(tau / Po);
          ctx.strokeStyle = COL.thread; ctx.lineWidth = 5; ctx.lineCap = "round";
          ctx.beginPath(); ctx.moveTo(ax, ay); ctx.quadraticCurveTo((ax + bx) / 2, Math.max(ay, by) + 60 * (1 - clamp(u / P)), bx, by); ctx.stroke();
          ctx.strokeStyle = COL.threadHi; ctx.lineWidth = 1.6; ctx.setLineDash([6, 8]); ctx.stroke(); ctx.setLineDash([]);
          ctx.restore();
        }
        break;
      }
      case "flip": {
        const q = spring(u, 1, 5.6 / (P + Po)), a = q * Math.PI;
        if (a < Math.PI / 2) drawSolo(A, t, { sx: Math.max(0.001, Math.cos(a)), dark: Math.sin(a) * 0.45, scale: 1 + 0.04 * Math.sin(a) });
        else drawCard(B, t, rB, { sx: Math.max(0.001, -Math.cos(a)), dark: Math.sin(a) * 0.45, scale: 1 + 0.04 * Math.sin(a) });
        break;
      }
      case "whip": {
        const T = P + Po, om = 7.5 / T, s1 = spring(u, 1, om), D = W * 1.25;
        const vel = (spring(u + 0.01, 1, om) - spring(u - 0.01, 1, om)) / 0.02 * D;
        const blur = Math.min(260, Math.abs(vel) / 30 * 0.9), n = 6;
        const pass = (fn) => { for (let k = n - 1; k >= 0; k--) { ctx.save(); ctx.globalAlpha = k === 0 ? 1 : 1 / (k + 1); fn((k / (n - 1) - 0.5) * blur); ctx.restore(); } };
        pass((off) => drawSolo(A, t, { dx: -s1 * D + off, noCaption: true }));
        pass((off) => drawCard(B, t, rB, { dx: (1 - s1) * D + off, noCaption: true }));
        const sp = clamp(Math.abs(vel) / (D * 2.2));  // estelas de hilo
        ctx.save(); ctx.lineCap = "round";
        for (let i = 0; i < 12; i++) {
          const y = H * (0.08 + 0.84 * hash(i * 3.7)), x = W * hash(i * 1.3 + Math.floor(t * 12));
          ctx.strokeStyle = rgba(hex(FELT[i % FELT.length]), 0.55 * sp); ctx.lineWidth = 3 + 4 * hash(i);
          ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - W * 0.35 * sp, y); ctx.stroke();
        }
        ctx.restore();
        break;
      }
      case "fade": {
        const q = spring(u, 1, 5.8 / (P + Po));
        drawSolo(A, t, { alpha: 1 - clamp((q - 0.45) * 2.2) });
        drawCard(B, t, rB, { alpha: q, scale: 1.02 - 0.02 * q });
        break;
      }
      case "darken": {
        const q = spring(u, 1, 5.8 / (P + Po));
        if (q < 0.5) drawSolo(A, t); else drawCard(B, t, rB);
        ctx.fillStyle = `rgba(8,6,12,${0.93 * (1 - Math.abs(2 * q - 1))})`; ctx.fillRect(0, 0, W, H);
        break;
      }
      case "grow": {  // la pantalla de la tele se vuelve la siguiente escena
        const vA = drawSolo(A, t, { dark: 0.45 * clamp(u / P) });
        const rA = baseRect(A), aCam = vA ? vA.map(0.29, 0.5) : { x: 0, y: 0 };
        const ox = rA.x + rA.w / 2 + aCam.x, oy = rA.y + rA.h / 2 + aCam.y;
        const l = landing(u, P, 0.75), s0 = 0.12;
        const sc = lerp(s0, 1, l);
        const cx = lerp(ox, rB.x + rB.w / 2, l), cy = lerp(oy, rB.y + rB.h / 2, l);
        drawCard(B, t, rB, { dx: cx - (rB.x + rB.w / 2), dy: cy - (rB.y + rB.h / 2), scale: sc, alpha: clamp(u / (P * 0.3)) });
        break;
      }
      case "flash": {
        const k = 1 + 0.06 * (1 - spring(tau, 0.45, 13));
        drawCard(B, t, rB, { scale: k * beatTilt(B, t) });
        ctx.fillStyle = `rgba(255,250,240,${0.92 * Math.exp(-Math.max(0, tau) * 5.5)})`; ctx.fillRect(0, 0, W, H);
        break;
      }
      default: drawSolo(B, t);
    }
  }

  // ── tablero, títulos, etiqueta de acto ────────────────────────────────
  function boardColorAt(t) {
    const i = sceneAt(t), s = SC[i], n = SC[i + 1];
    if (n && t > n.start - TR_PRE(n) - 0.3) {
      const q = spring(t - (n.start - TR_PRE(n) - 0.3), 1, 5);
      return mixC(hex(s.board), hex(n.board), q);
    }
    return hex(s.board);
  }
  function drawBoard(t) {
    const c = boardColorAt(t);
    ctx.fillStyle = rgba(c); ctx.fillRect(0, 0, W, H);
    ctx.drawImage(QUILT, 0, 0);
    ctx.save(); ctx.fillStyle = ctx.createPattern(FIBER, "repeat"); ctx.globalAlpha = 0.9; ctx.fillRect(0, 0, W, H); ctx.restore();
    if (V) {  // utilería de costura en los márgenes; se retira para el texto final
      const r = SC.find((x) => x.id === "retrato");
      const away = r ? spring(t - (r.start - 0.6), 1, 6) : 0;
      if (away < 0.999) {
        ctx.save(); ctx.globalAlpha = 1 - away; ctx.translate(0, away * 160);
        ctx.drawImage(PROPS[Math.floor(t * 12) % 3], 0, 0); ctx.restore();
      }
    }
  }
  function buildProps(v) {
    const c = mk(W, H), g = c.getContext("2d"), r = mulberry32(300 + v);
    const button = (x, y, R, col, rot) => {
      g.save(); g.translate(x, y); g.rotate(rot + (r() - 0.5) * 0.04);
      g.fillStyle = "rgba(0,0,0,0.35)"; g.beginPath(); g.arc(R * 0.08, R * 0.16, R, 0, Math.PI * 2); g.fill();
      g.fillStyle = col; g.beginPath(); g.arc(0, 0, R, 0, Math.PI * 2); g.fill();
      g.strokeStyle = "rgba(0,0,0,0.18)"; g.lineWidth = R * 0.12; g.beginPath(); g.arc(0, 0, R * 0.78, 0, Math.PI * 2); g.stroke();
      g.fillStyle = "rgba(255,255,255,0.18)"; g.beginPath(); g.arc(-R * 0.3, -R * 0.35, R * 0.35, 0, Math.PI * 2); g.fill();
      const hs = R * 0.26;
      g.fillStyle = "rgba(0,0,0,0.45)";
      for (const [hx, hy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { g.beginPath(); g.arc(hx * hs, hy * hs, R * 0.11, 0, Math.PI * 2); g.fill(); }
      g.strokeStyle = COL.thread; g.lineWidth = R * 0.1; g.lineCap = "round";
      g.beginPath(); g.moveTo(-hs, -hs); g.lineTo(hs, hs); g.moveTo(hs, -hs); g.lineTo(-hs, hs); g.stroke();
      g.restore();
    };
    const spool = (x, y, s, rot) => {
      g.save(); g.translate(x, y); g.rotate(rot + (r() - 0.5) * 0.03);
      g.fillStyle = "rgba(0,0,0,0.35)"; roundRect(g, -s * 0.5 + 6, -s * 0.75 + 10, s, s * 1.5, s * 0.12); g.fill();
      g.fillStyle = "#b98a58"; roundRect(g, -s * 0.5, -s * 0.75, s, s * 0.2, s * 0.08); g.fill(); roundRect(g, -s * 0.5, s * 0.55, s, s * 0.2, s * 0.08); g.fill();
      g.fillStyle = COL.thread; g.fillRect(-s * 0.4, -s * 0.56, s * 0.8, s * 1.12);
      g.strokeStyle = "rgba(255,255,255,0.22)"; g.lineWidth = 2;
      for (let k = 0; k < 14; k++) { const yy = -s * 0.52 + k * s * 0.078; g.beginPath(); g.moveTo(-s * 0.4, yy); g.lineTo(s * 0.4, yy + s * 0.03); g.stroke(); }
      g.strokeStyle = COL.thread; g.lineWidth = 3.5; g.beginPath(); g.moveTo(s * 0.4, s * 0.2);  // el hilo suelto
      g.bezierCurveTo(s * 1.4, s * 0.6, s * 1.0, s * 1.5, s * 2.4, s * 1.2); g.stroke();
      g.restore();
    };
    button(110, 1745, 38, COL.mustard, 0.3);
    button(205, 1830, 26, COL.teal, 1.1);
    spool(920, 1760, 70, 0.18);
    button(810, 1860, 22, COL.pink, 0.6);
    button(975, 140, 30, COL.sky, 0.9);
    button(92, 118, 22, COL.orange, 0.2);
    return c;
  }
  function wordLandTimes(t0, n) {  // palabras del título aterrizan en beats
    const bs = TL.beats.filter((b) => b >= t0 + 0.4);
    return Array.from({ length: n }, (_, k) => bs[Math.min(bs.length - 1, k)] ?? t0 + k * 0.5);
  }
  function drawTitle(t, o = {}) {
    const T = TL.titles, s = SC[0], n = SC[1];
    const out = n ? spring(t - (n.start - TR_PRE(n) - 0.15), 1, 9) : 0;  // se va hacia arriba
    ctx.save();
    ctx.globalAlpha *= (o.alpha ?? 1) * (1 - out * 0.9);
    ctx.translate(0, -out * H * 0.3);
    const land = wordLandTimes(s.start, 3);
    const cols = [[COL.pink, COL.mustard, COL.teal, COL.orange, COL.sky], [COL.cream], [COL.teal, COL.green, COL.mustard, COL.purple, COL.pink]];
    if (V) {
      const ys = [690, 865, 1040], sz = [200, 120, 200];
      T.names_stack.forEach((w, k) => drawFeltWord({ text: w, size: sz[k], colors: cols[k], seed: 10 + k }, W / 2, ys[k], land[k] - 0.3, t));
      drawSewn({ text: T.subtitle, size: 76, color: COL.cream }, W / 2, 1235, land[2] + 0.2, t, 0.9);
      drawHeart(W / 2, 1500, 120, land[2] + 0.5, t);
      ctx.save(); ctx.globalAlpha *= clamp((t - land[2] - 0.8) / 0.5);
      ctx.font = "500 36px Fredoka"; ctx.fillStyle = "rgba(243,231,207,0.85)"; ctx.textAlign = "center"; ctx.fillText(T.dates, W / 2, 1345);
      ctx.restore();
    } else {
      const parts = T.names.split(" & ");
      drawHeart(W / 2, 330, 64, land[2] + 0.5, t);
      drawFeltWord({ text: parts[0], size: 170, colors: cols[0], seed: 10 }, W * 0.3, 540, land[0] - 0.3, t);
      drawFeltWord({ text: "&", size: 120, colors: cols[1], seed: 11 }, W * 0.5, 540, land[1] - 0.3, t);
      drawFeltWord({ text: parts[1], size: 170, colors: cols[2], seed: 12 }, W * 0.7, 540, land[2] - 0.3, t);
      drawSewn({ text: T.subtitle, size: 70, color: COL.cream }, W / 2, 720, land[2] + 0.2, t, 0.9);
      ctx.save(); ctx.globalAlpha *= clamp((t - land[2] - 0.8) / 0.5);
      ctx.font = "500 34px Fredoka"; ctx.fillStyle = "rgba(243,231,207,0.85)"; ctx.textAlign = "center"; ctx.fillText(T.dates, W / 2, 830);
      ctx.restore();
    }
    ctx.restore();
    return null;
  }
  // corazón de fieltro rojo: el hilo lo va cosiendo y luego late con los tiempos fuertes
  function drawHeart(x, y, s, t0, t) {
    const u = t - t0;
    if (u <= 0) return;
    const pop = landing(u, 0.28, 0.5);
    const beat = 1 + 0.06 * pulse(t, TL.downbeats, 0.35, 12, 1.0);
    ctx.save(); ctx.translate(x, y); ctx.scale(pop * beat, pop * beat); ctx.rotate(-0.05);
    ctx.save(); ctx.translate(s * 0.05, s * 0.12); heartPath(ctx, s); ctx.fillStyle = "rgba(0,0,0,0.35)"; ctx.fill(); ctx.restore();
    heartPath(ctx, s); ctx.fillStyle = COL.red; ctx.fill();
    ctx.save(); ctx.clip(); ctx.fillStyle = ctx.createPattern(FIBER, "repeat"); ctx.fillRect(-s, -s, s * 2, s * 2);
    const g = ctx.createLinearGradient(0, -s * 0.8, 0, s * 0.4); g.addColorStop(0, "rgba(255,255,255,0.22)"); g.addColorStop(1, "rgba(0,0,0,0.2)");
    ctx.fillStyle = g; ctx.fillRect(-s, -s, s * 2, s * 2); ctx.restore();
    // puntadas crema que se van cosiendo alrededor
    ctx.save(); ctx.scale(0.78, 0.78); heartPath(ctx, s);
    const L = s * 5.2, sew = clamp((u - 0.15) / 0.9);
    ctx.setLineDash([s * 0.12, s * 0.09]); ctx.lineWidth = s * 0.045; ctx.strokeStyle = COL.cream;
    ctx.save(); ctx.beginPath(); ctx.rect(-s, -s, s * 2, s * 2 * 0 + (s * 2) * sew); ctx.clip(); heartPath(ctx, s); ctx.stroke(); ctx.restore();
    ctx.restore();
    ctx.restore();
  }
  const ROMAN = { 1: "I", 2: "II", 3: "III", 4: "IV" };
  function drawActTag(t) {
    const i = sceneAt(t), s = SC[i];
    // el acto "vigente": si ya arrancó la transición al siguiente acto, se cambia
    const n = SC[i + 1];
    let act = s.act, first = SC.find((x) => x.act === act), tIn = first ? first.start - TR_PRE(first) : 0;
    let leaving = 0;
    if (n && n.act !== act && t > n.start - TR_PRE(n) - 0.25) leaving = spring(t - (n.start - TR_PRE(n) - 0.25), 1, 12);
    if (n && n.id === "retrato" && t > n.start - TR_PRE(n) - 0.2) leaving = Math.max(leaving, spring(t - (n.start - TR_PRE(n) - 0.2), 1, 10));
    if (!act || s.id === "retrato") return;
    const txt = TL.acts[String(act)];
    const size = V ? 40 : 28;
    const F = feltTag({ text: txt, num: ROMAN[act], size, bg: COL.cream });
    const r = baseRect(s);
    const land = landing(t - tIn, 0.45, 0.55);
    ctx.save();
    if (V) {
      const x = W / 2, y = r.y - MAT - 88;
      ctx.translate(x, y - (1 - land) * 260 - leaving * 300); ctx.rotate(-0.025 + (1 - land) * 0.2);
    } else {
      ctx.translate(r.x + 120, r.y - 8 - (1 - land) * 200 - leaving * 220); ctx.rotate(-0.05 + (1 - land) * 0.2);
    }
    ctx.globalAlpha *= 1 - leaving;
    ctx.drawImage(F, -F.width / 2, -F.height / 2);
    ctx.restore();
  }
  function drawFinale(t) {
    const s = SC.find((x) => x.id === "retrato");
    if (!s || t < s.start) return;
    const T = TL.titles;
    const tIn = s.start + BAR * 0.75;
    const cols = [[COL.pink, COL.mustard, COL.teal, COL.orange, COL.sky], [COL.teal, COL.mustard, COL.pink, COL.purple, COL.green, COL.orange, COL.sky, COL.red]];
    if (V) {
      const r = baseRect(s), y0 = r.y + r.h + MAT;
      drawFeltWord({ text: T.end_big.join(" "), size: 96, colors: cols[1], seed: 40 }, W / 2, y0 + 118, tIn, t, { stagger: 0.045 });
      drawSewn({ text: T.end_small, size: 58, color: COL.cream }, W / 2, y0 + 228, tIn + BAR * 0.9, t, 1.1);
      ctx.save(); ctx.globalAlpha *= clamp((t - tIn - BAR * 1.5) / 0.6);
      ctx.font = "500 32px Fredoka"; ctx.fillStyle = "rgba(243,231,207,0.8)"; ctx.textAlign = "center"; ctx.fillText(T.end_sign, W / 2, y0 + 300);
      ctx.restore();
    } else {
      const x = W * 0.69;
      drawFeltWord({ text: T.end_big[0], size: 150, colors: cols[0], seed: 40 }, x, 350, tIn, t, { stagger: 0.06 });
      drawFeltWord({ text: T.end_big[1], size: 130, colors: cols[1], seed: 41 }, x, 520, tIn + 0.35, t, { stagger: 0.045 });
      drawSewn({ text: T.end_small, size: 60, color: COL.cream }, x, 680, tIn + BAR * 0.9, t, 1.1);
      ctx.save(); ctx.globalAlpha *= clamp((t - tIn - BAR * 1.5) / 0.6);
      ctx.font = "500 32px Fredoka"; ctx.fillStyle = "rgba(243,231,207,0.8)"; ctx.textAlign = "center"; ctx.fillText(T.end_sign, x, 790);
      ctx.restore();
    }
  }

  // ── cuadro completo ──────────────────────────────────────────────────
  function sceneAt(t) { for (let i = SC.length - 1; i >= 0; i--) if (t >= SC[i].start) return i; return 0; }
  function seek(t) {
    t = clamp(t, 0, TL.duration);
    ctx.setTransform(RS, 0, 0, RS, 0, 0);
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = "source-over"; ctx.filter = "none";
    ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = "high";
    drawBoard(t);
    const i = sceneAt(t), cur = SC[i], nxt = SC[i + 1], prv = SC[i - 1];
    // leve "gate weave" de stop-motion (medio pixel, a 12 fps)
    const wv = Math.floor(t * 12);
    ctx.save(); ctx.translate((hash(wv) - 0.5) * 0.9, (hash(wv + 99) - 0.5) * 0.9);
    if (nxt && t >= nxt.start - TR_PRE(nxt)) drawTransition(cur, nxt, t);
    else if (prv && t < cur.start + TR_POST(cur)) drawTransition(prv, cur, t);
    else drawSolo(cur, t);
    drawActTag(t);
    drawFinale(t);
    ctx.restore();
    // grano de fieltro/película + viñeta + fundido final
    ctx.save(); ctx.globalCompositeOperation = "soft-light"; ctx.globalAlpha = 0.24;
    ctx.drawImage(GRAIN[Math.floor(t * 12) % 3], 0, 0, W, H); ctx.restore();
    ctx.drawImage(VIGNETTE, 0, 0);
    const endFade = clamp((t - (TL.duration - 1.6)) / 1.5);
    if (endFade > 0) { ctx.fillStyle = `rgba(8,5,10,${endFade})`; ctx.fillRect(0, 0, W, H); }
    const startFade = 1 - clamp(t / 0.6);
    if (startFade > 0) { ctx.fillStyle = `rgba(8,5,10,${startFade})`; ctx.fillRect(0, 0, W, H); }
  }

  window.ready = (async () => {
    await Promise.all([
      document.fonts.load("600 80px Fredoka"), document.fonts.load("700 80px Fredoka"),
      document.fonts.load("500 40px Fredoka"), document.fonts.load("700 60px Dancing"),
    ]);
    const jobs = [];
    const base = "../assets/scenes/";
    SC.forEach((s) => {
      if (s.id === "titulo") return;
      if (s.layers) s.layers.forEach((L) => jobs.push(loadImage(L.src, base + "layers/" + L.src + ".webp")));
      else jobs.push(loadImage(s.id, base + "hd/" + s.id + ".jpg"));
    });
    await Promise.all(jobs);
    FIBER = buildFibers(); QUILT = buildQuilt(); PROPS = [0, 1, 2].map(buildProps); GRAIN = buildGrain(); VIGNETTE = buildVignette(); YARN = buildYarn();
    seek(0);
    return true;
  })();
  window.seek = seek;
  window.DURATION = TL.duration;
  window.FORMAT = V ? "9x16" : "16x9";
})();
