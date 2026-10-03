// Link checker for every Markdown file (dist/ excluded: it is generated from skills/).
//   - relative links and images must point at files that exist (anchors are checked by validate.mjs),
//   - external http(s) links must answer (HEAD, then GET; 3 tries with back-off).
// URLs inside code blocks are only checked when they point at this repository (the install
// one-liners); other code URLs are often placeholders.
//   node scripts/check-links.mjs            # everything
//   node scripts/check-links.mjs --offline  # relative links only
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OFFLINE = process.argv.includes("--offline");
const REPO = (process.env.GITHUB_REPOSITORY || "cumabozkurt/god-of-design").toLowerCase();
const SKIP_HOST = /^(localhost|127\.0\.0\.1|0\.0\.0\.0|(.+\.)?example\.(com|org|net)|x\.com|twitter\.com)$/i;
// Sites that answer bots with 403/429 even though the page exists: a 403/429 there is a warning.
const BOT_WALL = /(^|\.)(npmjs\.com|medium\.com|linkedin\.com|reddit\.com|dribbble\.com|behance\.net|figma\.com|openai\.com|claude\.ai|anthropic\.com|cursor\.com|windsurf\.com|codeium\.com)$/i;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if ([".git", "node_modules", "dist"].includes(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out); else if (e.name.endsWith(".md")) out.push(p);
  }
  return out;
}

const clean = (u) => u.replace(/[)>.,;:'"`*_\]]+$/, "");
const external = new Map(); // url -> [where]
const errors = [], warnings = [];

for (const file of walk(ROOT)) {
  const rel = path.relative(ROOT, file).split(path.sep).join("/");
  const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
  let fence = null;
  lines.forEach((line, i) => {
    const where = `${rel}:${i + 1}`;
    const f = line.match(/^\s*(`{3,}|~{3,})/);
    if (f) { if (!fence) fence = f[1][0]; else if (f[1][0] === fence) fence = null; return; }
    const urls = new Set();
    for (const m of line.matchAll(/https?:\/\/[^\s<>"'`)\]]+/g)) urls.add(clean(m[0]));
    for (const u of urls) {
      if (/[{}$<>…]|\.\.\.|\*/.test(u)) continue; // template / placeholder
      let host;
      try { host = new URL(u).hostname; } catch { errors.push(`${where}: malformed URL ${u}`); continue; }
      if (SKIP_HOST.test(host)) continue;
      if (fence && !u.toLowerCase().includes(REPO)) continue;
      if (!external.has(u)) external.set(u, []);
      external.get(u).push(where);
    }
    if (fence) return;
    const noCode = line.replace(/`[^`]*`/g, "");
    const targets = [
      ...[...noCode.matchAll(/!?\[[^\]]*\]\(\s*<?([^)\s>]+)>?(?:\s+"[^"]*")?\s*\)/g)].map((m) => m[1]),
      ...[...noCode.matchAll(/\b(?:src|href)="([^"]+)"/g)].map((m) => m[1]),
    ];
    for (const t of targets) {
      if (/^(https?:|mailto:|#)/i.test(t)) continue;
      const p = decodeURIComponent(t.split("#")[0].split("?")[0]);
      if (!p) continue;
      const abs = p.startsWith("/") ? path.join(ROOT, p) : path.resolve(path.dirname(file), p);
      if (!fs.existsSync(abs)) errors.push(`${where}: missing local target ${t}`);
    }
  });
}

async function probe(url) {
  let last = "";
  for (let attempt = 0; attempt < 3; attempt++) {
    if (attempt) await new Promise((r) => setTimeout(r, 1500 * attempt));
    for (const method of ["HEAD", "GET"]) {
      try {
        const res = await fetch(url, {
          method, redirect: "follow", signal: AbortSignal.timeout(20000),
          headers: { "user-agent": "Mozilla/5.0 (god-of-design link check)", accept: "text/html,*/*" },
        });
        if (res.body) await res.body.cancel().catch(() => {});
        if (res.ok) return { ok: true };
        last = `HTTP ${res.status}`;
        if ([404, 410].includes(res.status) && method === "GET") return { ok: false, why: last };
      } catch (e) { last = e.cause?.code || e.name || String(e); }
    }
  }
  return { ok: false, why: last };
}

let checked = 0;
if (!OFFLINE) {
  const queue = [...external.keys()];
  await Promise.all(Array.from({ length: 8 }, async () => {
    while (queue.length) {
      const url = queue.shift();
      const r = await probe(url);
      checked++;
      if (r.ok) continue;
      const host = new URL(url).hostname;
      const msg = `${url} (${r.why}) ← ${external.get(url).slice(0, 3).join(", ")}`;
      if (BOT_WALL.test(host) && /HTTP (403|429)|TimeoutError/.test(r.why)) warnings.push(msg);
      else if (/HTTP 429/.test(r.why)) warnings.push(msg);
      else errors.push(msg);
    }
  }));
}

for (const w of warnings) console.log("WARN  " + w);
for (const e of errors) console.log("ERROR " + e);
console.log(`\n${external.size} external URL(s)${OFFLINE ? " (skipped, --offline)" : `, ${checked} checked`} · ${errors.length} error(s), ${warnings.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
