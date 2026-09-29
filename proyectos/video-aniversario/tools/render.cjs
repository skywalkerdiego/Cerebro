/* Render cuadro por cuadro con Playwright (Chromium headless) + ffmpeg.
 *
 *   node tools/render.cjs --format 9x16 --q final --out out/video_9x16.mp4
 *   node tools/render.cjs --format 16x9 --q draft --fps 15 --out out/animatic_16x9.mp4
 *   node tools/render.cjs --format 9x16 --stills 4.5,12,30 --outdir out/stills
 *   node tools/render.cjs --page episodio/index.html --format 16x9 --from 0 --to 13 --audio a.wav --out out/prueba.mp4
 *
 * Levanta un servidor estático local (así el canvas no queda "contaminado"
 * por imágenes file://), abre N pestañas en paralelo, cada una llama
 * seek(t) + toDataURL para su tramo de cuadros, y al final ffmpeg une los
 * cuadros con el AUDIO (nunca con el video de origen).
 *
 * Requiere playwright (global: NODE_PATH=$(npm root -g)) y ffmpeg en el PATH.
 */
const http = require("http");
const fs = require("fs");
const path = require("path");
const { execFileSync, spawnSync } = require("child_process");
const { chromium } = require("playwright");

const ROOT = path.resolve(__dirname, "..");
const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, arr) => (a.startsWith("--") ? acc.concat([[a.slice(2), arr[i + 1]]]) : acc), [])
);
const FORMAT = args.format || "9x16";
const QUAL = args.q || "final";
const FPS = parseFloat(args.fps || "30");
const WORKERS = parseInt(args.workers || "4", 10);
const AUDIO = args.audio || null;
const PAGE = args.page || "engine/index.html";   // v1 (tablero) o episodio/index.html
const FROM = parseFloat(args.from || "0");
const TO = args.to ? parseFloat(args.to) : null;

function serve() {
  const types = { ".html": "text/html", ".js": "text/javascript", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".ttf": "font/ttf", ".wav": "audio/wav", ".json": "application/json" };
  const srv = http.createServer((req, res) => {
    const p = path.join(ROOT, decodeURIComponent(req.url.split("?")[0]));
    if (!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { "Content-Type": types[path.extname(p)] || "application/octet-stream" });
    fs.createReadStream(p).pipe(res);
  });
  return new Promise((r) => srv.listen(0, "127.0.0.1", () => r(srv)));
}

async function openPage(browser, port) {
  const scale = QUAL === "draft" ? 0.5 : 1;
  const [w, h] = FORMAT === "16x9" ? [1920, 1080] : [1080, 1920];
  const page = await browser.newPage({ viewport: { width: Math.round(w * scale), height: Math.round(h * scale) } });
  page.on("pageerror", (e) => console.error("[página]", e.message));
  page.on("console", (m) => { if (m.type() === "error") console.error("[consola]", m.text()); });
  await page.goto(`http://127.0.0.1:${port}/${PAGE}?format=${FORMAT}&q=${QUAL}`);
  await page.evaluate(() => window.ready);
  return page;
}

async function grab(page, t, type) {
  const url = await page.evaluate(([t, type]) => { window.seek(t); return document.getElementById("c").toDataURL(type, 0.95); }, [t, type]);
  return Buffer.from(url.split(",")[1], "base64");
}

async function main() {
  const srv = await serve();
  const port = srv.address().port;
  const browser = await chromium.launch({ args: ["--force-color-profile=srgb", "--font-render-hinting=none", "--disable-lcd-text"] });
  try {
    if (args.stills) {
      const outdir = path.resolve(args.outdir || path.join(ROOT, "out", "stills"));
      fs.mkdirSync(outdir, { recursive: true });
      const page = await openPage(browser, port);
      for (const s of args.stills.split(",")) {
        const t = parseFloat(s);
        const buf = await grab(page, t, "image/png");
        const f = path.join(outdir, `${FORMAT}_${t.toFixed(2).padStart(6, "0")}.png`);
        fs.writeFileSync(f, buf);
        console.log(f);
      }
      return;
    }
    const page0 = await openPage(browser, port);
    const duration = await page0.evaluate(() => window.DURATION);
    const n = Math.floor(((TO ?? duration) - FROM) * FPS);
    const frames = path.join(ROOT, "out", `frames_${FORMAT}_${QUAL}`);
    fs.rmSync(frames, { recursive: true, force: true });
    fs.mkdirSync(frames, { recursive: true });
    const pages = [page0];
    for (let k = 1; k < WORKERS; k++) pages.push(await openPage(browser, port));
    let done = 0, next = 0;
    const t0 = Date.now();
    await Promise.all(pages.map(async (pg) => {
      while (true) {
        const i = next++;
        if (i >= n) break;
        const buf = await grab(pg, FROM + i / FPS, "image/jpeg");
        fs.writeFileSync(path.join(frames, `${String(i).padStart(5, "0")}.jpg`), buf);
        done++;
        if (done % 100 === 0) {
          const el = (Date.now() - t0) / 1000;
          console.log(`  ${done}/${n} cuadros  ${(done / el).toFixed(1)} fps  ~${((n - done) / (done / el)).toFixed(0)}s restantes`);
        }
      }
    }));
    console.log(`cuadros listos en ${((Date.now() - t0) / 1000).toFixed(0)}s`);
    encode(frames, n);
  } finally {
    await browser.close();
    srv.close();
  }
}

function loudnessGain(audio) {
  // ganancia lineal (sin compresión) para llegar a -14 LUFS sin pasar de -1 dBTP
  const r = spawnSync("ffmpeg", ["-hide_banner", "-nostats", "-i", audio, "-af", "ebur128=peak=true", "-f", "null", "-"], { encoding: "utf8" });
  const txt = r.stderr;
  const I = parseFloat(txt.match(/Integrated loudness:\s*\n\s*I:\s*(-?[\d.]+)/)[1]);
  const TP = parseFloat(txt.match(/True peak:\s*\n\s*Peak:\s*(-?[\d.]+)/)[1]);
  const gain = Math.min(-14 - I, -1.0 - TP);
  console.log(`audio: ${I} LUFS, pico ${TP} dBTP -> ganancia ${gain.toFixed(2)} dB`);
  return gain;
}

function encode(frames, n) {
  const out = path.resolve(args.out || path.join(ROOT, "out", `video_${FORMAT}.mp4`));
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const audio = AUDIO || path.join(ROOT, "assets", "audio", "song.wav");
  // CRF 20: visualmente limpio a 1080p y el archivo queda compartible (~40-60 MB)
  const crf = args.crf || (QUAL === "draft" ? "26" : "20");
  const preset = QUAL === "draft" ? "veryfast" : "slow";
  const a = ["-hide_banner", "-loglevel", "error", "-y", "-framerate", String(FPS), "-i", path.join(frames, "%05d.jpg")];
  if (fs.existsSync(audio)) {
    const g = loudnessGain(audio);
    // -map 0:v (cuadros) + -map 1:a (solo el audio) -> el video de origen nunca entra
    if (FROM > 0) a.push("-ss", String(FROM));
    a.push("-i", audio, "-map", "0:v:0", "-map", "1:a:0", "-af", `volume=${g.toFixed(2)}dB`, "-c:a", "aac", "-b:a", "256k", "-ar", "48000");
  }
  a.push("-c:v", "libx264", "-preset", preset, "-crf", crf, "-pix_fmt", "yuv420p", "-profile:v", "high",
    "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709",
    "-movflags", "+faststart", "-shortest", out);
  execFileSync("ffmpeg", a, { stdio: "inherit" });
  console.log("video:", out);
  if (!args.keep) fs.rmSync(frames, { recursive: true, force: true });
}

main().catch((e) => { console.error(e); process.exit(1); });
