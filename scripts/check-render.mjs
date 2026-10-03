// Renders every Markdown file the way GitHub does and measures it in headless Chrome:
//   - no table may scroll sideways in GitHub's narrowest desktop column (570 px, 1012 px window),
//   - no code block may scroll sideways at 1280 px (817 px: the file view, narrower than the 838 px home page),
//   - every local image must load.
// HTML comes from GitHub's own Markdown API when GITHUB_TOKEN / GH_TOKEN is set (exactly what
// github.com shows), otherwise from `marked` (GFM). Styling: github-markdown-css.
//   npm i --no-save playwright-core marked github-markdown-css && node scripts/check-render.mjs [files…]
//   RENDER_VIA_GH=1 node scripts/check-render.mjs   # use `gh api markdown` instead of a token
// Chrome: CHROME_PATH or the usual install locations.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright-core";
import { marked } from "marked";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const css = fs.readFileSync(require.resolve("github-markdown-css/github-markdown-light.css"), "utf8");
const TABLE_WIDTH = 570, CODE_WIDTH = 817;
const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
const repo = process.env.GITHUB_REPOSITORY || "cumabozkurt/god-of-design";

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if ([".git", "node_modules"].includes(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out); else if (e.name.endsWith(".md")) out.push(p);
  }
  return out;
}
// Agent-facing generated bundles are not meant to be read on github.com.
const files = (process.argv.slice(2).length ? process.argv.slice(2).map((f) => path.resolve(f)) : walk(ROOT))
  .filter((f) => !path.relative(ROOT, f).startsWith("dist" + path.sep));

async function toHtml(md) {
  if (token) {
    for (let attempt = 0; attempt < 3; attempt++) {
      const res = await fetch("https://api.github.com/markdown", {
        method: "POST",
        headers: { authorization: `Bearer ${token}`, accept: "application/vnd.github+json", "content-type": "application/json" },
        body: JSON.stringify({ text: md, mode: "gfm", context: repo }),
      });
      if (res.ok) return { html: await res.text(), via: "github" };
      if (res.status !== 403 && res.status !== 429 && res.status < 500) break;
      await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
    }
  }
  if (process.env.RENDER_VIA_GH === "1") {
    // Local alternative to a token: an authenticated GitHub CLI (`gh api markdown`).
    const { execFileSync } = await import("node:child_process");
    const html = execFileSync("gh", ["api", "markdown", "--input", "-"],
      { input: JSON.stringify({ text: md, mode: "gfm", context: repo }), maxBuffer: 64 << 20 }).toString();
    return { html, via: "github (gh)" };
  }
  return { html: marked.parse(md, { gfm: true }), via: "marked" };
}

const exe = [process.env.CHROME_PATH, "/usr/bin/google-chrome", "/usr/bin/google-chrome-stable", "/usr/bin/chromium", "/usr/bin/chromium-browser",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"].filter(Boolean).find((p) => fs.existsSync(p));
if (!exe) { console.error("Chrome not found; set CHROME_PATH"); process.exit(2); }
const browser = await chromium.launch({ executablePath: exe });
const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
const problems = [];
let renderer = "";
try {
  for (const f of files) {
    const rel = path.relative(ROOT, f);
    const { html, via } = await toHtml(fs.readFileSync(f, "utf8"));
    renderer ||= via;
    const doc = `<!doctype html><html><head><meta charset="utf-8"><base href="${pathToFileURL(path.dirname(f) + path.sep).href}">
      <style>${css} body{margin:0} .markdown-body{box-sizing:content-box;padding:0;margin:0}</style></head>
      <body><article class="markdown-body" id="a">${html}</article></body></html>`;
    const tmp = path.join(path.dirname(f), `.render-check-${process.pid}.html`);
    fs.writeFileSync(tmp, doc);
    try {
      await page.goto(pathToFileURL(tmp).href, { waitUntil: "load" });
      await page.evaluate(() => Promise.all([...document.images].filter((i) => i.src.startsWith("file:")).map((i) => i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; }))));
      const r = await page.evaluate(({ TABLE_WIDTH, CODE_WIDTH }) => {
        const a = document.getElementById("a"), out = [];
        const label = (el) => (el.innerText || "").trim().split("\n")[0].slice(0, 60);
        a.style.width = TABLE_WIDTH + "px";
        document.querySelectorAll("details").forEach((d) => (d.open = true));
        for (const t of a.querySelectorAll("table")) if (t.scrollWidth > t.clientWidth + 1) out.push(`table needs ${t.scrollWidth}px at ${TABLE_WIDTH}px: "${label(t)}"`);
        a.style.width = CODE_WIDTH + "px";
        for (const p of a.querySelectorAll("pre")) if (p.scrollWidth > p.clientWidth + 1) out.push(`code block needs ${p.scrollWidth}px at ${CODE_WIDTH}px: "${label(p)}"`);
        for (const i of document.images) if (i.src.startsWith("file:") && !i.naturalWidth) out.push(`image does not load: ${i.getAttribute("src")}`);
        return out;
      }, { TABLE_WIDTH, CODE_WIDTH });
      for (const m of r) problems.push(`${rel}: ${m}`);
    } finally { fs.rmSync(tmp, { force: true }); }
  }
} finally { await browser.close(); }
for (const p of problems) console.log(`ERROR ${p}`);
console.log(`\n${files.length} files rendered via ${renderer || "-"} and measured in Chrome · ${problems.length} problem(s)`);
process.exit(problems.length ? 1 : 0);
