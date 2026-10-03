#!/usr/bin/env node
// Validates the pack: skill frontmatter (incl. YAML safety), commands, style atlas completeness, internal links and
// heading anchors, GitHub layout (table width, code line length), EN/TR parity, images, JSON, versions, script syntax.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [], warnings = [];
const err = (f, m) => errors.push(`${path.relative(ROOT, f) || f}: ${m}`);
const warn = (f, m) => warnings.push(`${path.relative(ROOT, f) || f}: ${m}`);
const read = (f) => fs.readFileSync(f, "utf8");
const pkg = JSON.parse(read(path.join(ROOT, "package.json")));

export function parseFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!m) return null;
  const data = {}; let parent = null;
  for (const line of m[1].split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const nested = line.match(/^\s{2,}([A-Za-z0-9_-]+):\s*(.*)$/);
    if (nested && parent) { data[parent][nested[1]] = nested[2].replace(/^["']|["']$/g, ""); continue; }
    const top = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!top) return { __error: `cannot parse line: ${line}` };
    if (top[2] === "") { data[top[1]] = {}; parent = top[1]; } else { data[top[1]] = top[2].replace(/^["']|["']$/g, ""); parent = null; }
  }
  return data;
}

// 1. Skills
const skillsDir = path.join(ROOT, "skills");
const ALLOWED = new Set(["name", "description", "license", "compatibility", "metadata", "allowed-tools"]);
const skills = fs.readdirSync(skillsDir).filter((d) => fs.statSync(path.join(skillsDir, d)).isDirectory());
for (const d of skills) {
  const f = path.join(skillsDir, d, "SKILL.md");
  if (!fs.existsSync(f)) { err(path.join(skillsDir, d), "missing SKILL.md"); continue; }
  const fm = parseFrontmatter(read(f));
  if (!fm) { err(f, "missing YAML frontmatter"); continue; }
  if (fm.__error) { err(f, fm.__error); continue; }
  for (const k of Object.keys(fm)) if (!ALLOWED.has(k)) err(f, `unknown frontmatter key "${k}"`);
  if (fm.name !== d) err(f, `name "${fm.name}" must equal directory "${d}"`);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(fm.name || "") || (fm.name || "").length > 64) err(f, "name must be kebab-case, ≤ 64 chars");
  if (!fm.description) err(f, "missing description");
  else {
    if (fm.description.length > 500) err(f, `description is ${fm.description.length} chars (max 500)`);
    if (!/use when|use for|use on|use it|use this|use before|use after/i.test(fm.description)) warn(f, "description should say when to use the skill");
  }
  if (fm.metadata?.pack !== "god-of-design") err(f, "metadata.pack must be god-of-design (installers rely on it)");
  if (fm.metadata?.version !== pkg.version) err(f, `metadata.version ${fm.metadata?.version} ≠ package.json ${pkg.version}`);
  if (read(f).split("\n").length > 500) warn(f, "SKILL.md over 500 lines; move detail to references/");
}
if (skills.length < 19) err(skillsDir, `expected ≥ 19 skills, found ${skills.length}`);

// 2. Commands
for (const f of fs.readdirSync(path.join(ROOT, "commands")).filter((x) => x.endsWith(".md")).map((x) => path.join(ROOT, "commands", x))) {
  const fm = parseFrontmatter(read(f));
  if (!fm?.description) err(f, "command needs a description in frontmatter");
  if (!read(f).includes("$ARGUMENTS")) warn(f, "command does not use $ARGUMENTS");
}

// 3. Style atlas
const REQ = ["ID", "Origin", "DNA", "Palette", "Type", "Layout", "Motifs", "Do", "Don't", "CSS/Tailwind", "Prompt"];
const styleDir = path.join(skillsDir, "god-styles", "references");
const ids = new Map();
let styleCount = 0;
for (const file of fs.readdirSync(styleDir).filter((x) => /^0[1-9].*\.md$/.test(x))) {
  const fp = path.join(styleDir, file);
  const chunks = read(fp).split(/^### /m).slice(1);
  for (const ch of chunks) {
    const name = ch.split("\n")[0].trim(); styleCount++;
    for (const k of REQ) if (!ch.includes(`- **${k}:**`)) err(fp, `style "${name}" missing field ${k}`);
    const id = (ch.match(/- \*\*ID:\*\* `([^`]+)`/) || [])[1];
    if (!id || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id)) err(fp, `style "${name}" has an invalid ID`);
    else if (ids.has(id)) err(fp, `duplicate style ID ${id} (also in ${ids.get(id)})`);
    else ids.set(id, file);
    const pal = (ch.match(/- \*\*Palette:\*\*(.*)/) || [])[1] || "";
    if (!/#[0-9A-Fa-f]{6}\b/.test(pal)) warn(fp, `style "${name}" palette has no hex values`);
    for (const h of pal.match(/#[0-9A-Za-z]+\b/g) || []) if (!/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(h)) err(fp, `style "${name}" has malformed hex ${h}`);
  }
}
if (styleCount < 100) err(styleDir, `style atlas has ${styleCount} styles (minimum 100)`);

// 4. Internal markdown links
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if ([".git", "node_modules"].includes(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out); else if (/\.(md|mdc)$/.test(e.name)) out.push(p);
  }
  return out;
}
const mdFiles = walk(ROOT);
for (const f of mdFiles) {
  const text = read(f).replace(/```[\s\S]*?```/g, "").replace(/`[^`\n]*`/g, "");
  for (const m of text.matchAll(/\]\(([^)\s]+)(?:\s+"[^"]*")?\)|<img[^>]+src="([^"]+)"/g)) {
    let link = m[1] || m[2];
    if (/^(https?:|mailto:|#|data:)/.test(link)) continue;
    link = decodeURIComponent(link.split("#")[0]);
    if (!link) continue;
    const target = path.resolve(path.dirname(f), link);
    if (!fs.existsSync(target)) err(f, `broken link → ${link}`);
  }
}

// 5. JSON files + versions
for (const j of ["package.json", "catalog.json", ".claude-plugin/plugin.json", ".claude-plugin/marketplace.json", ".codex-plugin/plugin.json", "gemini-extension.json"]) {
  const f = path.join(ROOT, j);
  if (!fs.existsSync(f)) { if (j !== "gemini-extension.json") err(f, "missing"); continue; }
  try {
    const data = JSON.parse(read(f));
    const v = data.version ?? data.plugins?.[0]?.version ?? data.metadata?.version;
    if (v && v !== pkg.version) err(f, `version ${v} ≠ package.json ${pkg.version}`);
  } catch (e) { err(f, `invalid JSON: ${e.message}`); }
}
const cat = JSON.parse(read(path.join(ROOT, "catalog.json")));
if (cat.counts?.styles !== styleCount) err(path.join(ROOT, "catalog.json"), "stale: run npm run build");

// 6. Script syntax
const tryRun = (cmd, args, label) => {
  try { execFileSync(cmd, args, { stdio: "pipe" }); }
  catch (e) { if (e.code === "ENOENT") warn(ROOT, `${cmd} not found, skipped ${label}`); else err(path.join(ROOT, label), (e.stderr || e.message).toString().trim()); }
};
for (const f of [...fs.readdirSync(path.join(ROOT, "bin")).map((x) => `bin/${x}`), ...fs.readdirSync(path.join(ROOT, "scripts")).filter((x) => x.endsWith(".mjs")).map((x) => `scripts/${x}`),
  ...["god-color/scripts/contrast.mjs", "god-output/scripts/render.mjs"].map((x) => `skills/${x}`)]) tryRun(process.execPath, ["--check", path.join(ROOT, f)], f);
tryRun("bash", ["-n", path.join(ROOT, "install.sh")], "install.sh");
const pwsh = ["pwsh", "/opt/pwsh/pwsh"].find((p) => { try { execFileSync(p, ["-v"], { stdio: "pipe" }); return true; } catch { return false; } });
if (pwsh) tryRun(pwsh, ["-NoProfile", "-Command", `$e=$null; [void][System.Management.Automation.Language.Parser]::ParseFile('${path.join(ROOT, "install.ps1")}', [ref]$null, [ref]$e); if ($e.Count) { $e | % { $_.ToString() }; exit 1 }`], "install.ps1");
else warn(ROOT, "pwsh not found, skipped install.ps1 parse");

// 7. YAML safety of every frontmatter block. Our own parser is lenient, but real YAML parsers
//    (Claude Code, Codex, OpenCode, Gemini CLI, Cursor) are not: an unquoted ": " or " #" or a
//    leading [ { & * ! | > % @ ` breaks or silently changes the value.
const fmFiles = [
  ...skills.map((d) => path.join(skillsDir, d, "SKILL.md")),
  ...fs.readdirSync(path.join(ROOT, "commands")).filter((x) => x.endsWith(".md")).map((x) => path.join(ROOT, "commands", x)),
  ...walk(path.join(ROOT, "adapters")),
].filter((f) => fs.existsSync(f));
export function yamlProblems(block) {
  const out = [];
  for (const line of block.split(/\r?\n/)) {
    if (!line.trim() || /^\s*#/.test(line)) continue;
    const m = line.match(/^\s*([A-Za-z0-9_-]+):(?:\s+(.*))?$/);
    if (!m) { out.push(`not a "key: value" line: ${line.trim().slice(0, 60)}`); continue; }
    const v = (m[2] || "").trim();
    if (!v) continue;
    if (v.startsWith('"')) { if (!/^"(?:[^"\\]|\\.)*"$/.test(v)) out.push(`${m[1]}: badly quoted value`); continue; }
    if (v.startsWith("'")) { if (!/^'(?:[^']|'')*'$/.test(v)) out.push(`${m[1]}: badly quoted value`); continue; }
    if (/^[[\]{}&*!|>%@`,?-]/.test(v) && !/^-?\d/.test(v)) out.push(`${m[1]}: value starts with a YAML indicator; quote it`);
    if (/:\s/.test(v) || v.endsWith(":")) out.push(`${m[1]}: unquoted ": " in value; quote it`);
    if (/\s#/.test(v)) out.push(`${m[1]}: unquoted " #" starts a YAML comment; quote it`);
  }
  return out;
}
for (const f of fmFiles) {
  const m = read(f).match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) { if (/SKILL\.md$|commands/.test(f)) err(f, "missing frontmatter"); continue; }
  for (const p of yamlProblems(m[1])) err(f, `frontmatter: ${p}`);
}
for (const d of skills) {
  const fm = parseFrontmatter(read(path.join(skillsDir, d, "SKILL.md"))) || {};
  if (/anthropic|claude/i.test(fm.name || "")) err(path.join(skillsDir, d), "skill names must not contain reserved words (anthropic, claude)");
  if (/[<>]/.test(fm.description || "")) err(path.join(skillsDir, d), "description must not contain < or > (XML tags are rejected)");
}

// 8. Heading anchors: in-page (#x) and cross-file (file.md#x) links must hit a real heading.
//    Slugs follow GitHub: lower-case, drop everything except letters, marks, numbers, "_", "-"
//    and spaces, spaces become "-", duplicates get -1, -2 ...
export function slugify(heading) {
  const text = heading.replace(/<[^>]+>/g, "").replace(/!\[[^\]]*\]\([^)]*\)/g, "").replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/[`*]/g, "");
  return text.trim().toLowerCase().replace(/[^\p{L}\p{M}\p{N}\p{Pc} -]/gu, "").replace(/ /g, "-");
}
const stripCode = (t) => t.replace(/^(```|~~~)[\s\S]*?^\1/gm, "");
const anchorCache = new Map();
function anchorsOf(file) {
  if (anchorCache.has(file)) return anchorCache.get(file);
  const seen = new Map(), set = new Set();
  for (const m of stripCode(read(file)).matchAll(/^#{1,6}\s+(.+?)\s*#*\s*$/gm)) {
    let slug = slugify(m[1]);
    const n = seen.get(slug) || 0; seen.set(slug, n + 1);
    if (n) slug = `${slug}-${n}`;
    set.add(slug);
  }
  for (const m of read(file).matchAll(/<a\s+(?:name|id)="([^"]+)"/g)) set.add(m[1]);
  anchorCache.set(file, set);
  return set;
}
for (const f of mdFiles) {
  const text = stripCode(read(f)).replace(/`[^`\n]*`/g, "");
  for (const m of text.matchAll(/\]\(([^)\s]*#[^)\s]+)\)|href="([^"]*#[^"]+)"/g)) {
    const link = m[1] || m[2];
    if (/^(https?:|mailto:)/.test(link)) continue;
    const [file, frag] = link.split("#");
    const target = file ? path.resolve(path.dirname(f), decodeURIComponent(file)) : f;
    if (!fs.existsSync(target) || !/\.md$/.test(target)) continue;
    if (!anchorsOf(target).has(decodeURIComponent(frag))) err(f, `broken anchor → ${link}`);
  }
}

// 9. GitHub layout for the pages people read on github.com: no table may need a horizontal
//    scrollbar in GitHub's narrowest desktop column (570 px at a 1012 px window), and code lines
//    must fit the regular column (≤ 95 characters). scripts/check-render.mjs measures the real
//    rendering in Chrome; this is the fast static estimate.
const TABLE_MAX = 570, CODE_MAX = 95;
const ghDocs = mdFiles.filter((f) => !path.relative(ROOT, f).startsWith("skills") && !path.relative(ROOT, f).startsWith("adapters") && !path.relative(ROOT, f).startsWith("dist") && /\.md$/.test(f));
export function minTableWidth(rows) {
  const cols = [];
  for (const row of rows) {
    const cells = row.replace(/\\\|/g, "\u0000").trim().replace(/^\||\|$/g, "").split("|").map((c) => c.replace(/\u0000/g, "|").trim());
    cells.forEach((cell, i) => {
      let widest = 0;
      const code = [...cell.matchAll(/`([^`]*)`/g)].flatMap((m) => m[1].split(/\s+/));
      for (const t of code) widest = Math.max(widest, t.length * 8.2);
      const prose = cell.replace(/`[^`]*`/g, " ").replace(/!\[[^\]]*\]\([^)]*\)/g, "").replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/<[^>]+>/g, " ").replace(/[*_]/g, "");
      for (const t of prose.split(/\s+|(?<=[-/])/)) widest = Math.max(widest, [...t].length * 8.8);   // browsers break after - and /
      cols[i] = Math.max(cols[i] || 0, widest + 27);
    });
  }
  return Math.round(cols.reduce((a, b) => a + b, 0));
}
for (const f of ghDocs) {
  const lines = read(f).split(/\r?\n/);
  let fence = null;
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    const fm = l.match(/^\s*(```|~~~)/);
    if (fm) { fence = fence ? null : fm[1]; continue; }
    if (fence) { if ([...l].length > CODE_MAX) err(f, `line ${i + 1}: code line is ${[...l].length} chars (max ${CODE_MAX}); wrap it`); continue; }
    if (/^\s*\|/.test(l) && /^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?\s*$/.test(lines[i + 1] || "")) {
      const rows = [l];
      let j = i + 2;
      while (j < lines.length && /^\s*\|/.test(lines[j])) rows.push(lines[j++]);
      const w = minTableWidth(rows);
      if (w > TABLE_MAX) err(f, `line ${i + 1}: table needs about ${w}px (max ${TABLE_MAX}); it would scroll sideways on GitHub`);
      i = j - 1;
    }
  }
  if (fence) err(f, "unclosed code fence");
}

// 10. English/Turkish parity: same sections, same commands, same images.
const pairs = [["README.md", "README.tr.md"], ["CONTRIBUTING.md", "CONTRIBUTING.tr.md"], ["docs/research/benchmark-50-repos.md", "docs/research/benchmark-50-repos.tr.md"]];
const blocks = (t, langs) => [...t.matchAll(/^```(\w*)\n([\s\S]*?)^```/gm)].filter((m) => langs.includes(m[1]))
  .map((m) => m[2].split("\n").map((l) => l.replace(/(^|\s)#(?![!\w-]*\]).*$/, "").trimEnd()).filter(Boolean).join("\n"));
for (const [en, tr] of pairs) {
  const fe = path.join(ROOT, en), ft = path.join(ROOT, tr);
  if (!fs.existsSync(fe) || !fs.existsSync(ft)) { err(fe, `missing translation pair ${tr}`); continue; }
  const a = read(fe), b = read(ft);
  const h2 = (t) => stripCode(t).match(/^## /gm)?.length || 0;
  if (en.startsWith("README") || en.startsWith("CONTRIBUTING")) { if (h2(a) !== h2(b)) err(ft, `has ${h2(b)} sections, ${en} has ${h2(a)}`); }
  const ca = blocks(a, ["bash", "powershell", "sh", "json"]), cb = blocks(b, ["bash", "powershell", "sh", "json"]);
  if (JSON.stringify(ca) !== JSON.stringify(cb)) {
    const k = ca.findIndex((x, i) => x !== cb[i]);
    err(ft, `commands differ from ${en} (code block #${k + 1}): keep the commands identical, translate only comments`);
  }
  const imgs = (t) => [...t.matchAll(/<img[^>]+src="([^"]+)"/g)].map((m) => m[1]).filter((x) => !x.includes("badge/lang") && !x.includes("badge/dil") && !x.includes("version-") && !x.includes("s%C3%BCr%C3%BCm"));
  if (JSON.stringify(imgs(a).length) !== JSON.stringify(imgs(b).length)) err(ft, `has ${imgs(b).length} images, ${en} has ${imgs(a).length}`);
  if (en.includes("benchmark")) {
    const stars = (t) => [...t.matchAll(/^\| (\d+) \| \[([^\]]+)\][^|]*\| ([\d.,]+) \|/gm)].map((m) => `${m[1]} ${m[2]} ${m[3].replace(/[.,]/g, "")}`);
    if (JSON.stringify(stars(a)) !== JSON.stringify(stars(b)) || !stars(a).length) err(ft, `repo list or star counts differ from ${en}`);
  }
}
const badge = (t) => (t.match(/badge\/(?:version|s%C3%BCr%C3%BCm)-([\d.]+)-/) || [])[1];
for (const r of ["README.md", "README.tr.md"]) if (badge(read(path.join(ROOT, r))) !== pkg.version) err(path.join(ROOT, r), `version badge ≠ package.json ${pkg.version}`);

// 11. Images: exist (checked above), reasonable size, the banner has no live text (GitHub shows
//     README SVGs as images without web fonts) and no external references.
for (const f of walk2(ROOT, /\.(png|jpe?g|gif|webp|svg)$/i)) {
  const size = fs.statSync(f).size, rel = path.relative(ROOT, f);
  if (size > 600 * 1024) err(f, `${Math.round(size / 1024)} KB image; keep images under 600 KB`);
  if (/\.svg$/i.test(f)) {
    const t = read(f);
    if (!/<svg[\s>]/.test(t) || !/<\/svg>\s*$/.test(t)) err(f, "not a complete SVG document");
    if (/<(script|foreignObject)\b/i.test(t) || /(?:href|src)="https?:/i.test(t)) err(f, "SVG must not contain scripts or external references");
    if (!rel.endsWith(".src.svg") && /<text\b/.test(t)) err(f, "SVG shown on GitHub contains <text>; outline it (scripts/outline-banner.mjs)");
  }
  if (/\.png$/i.test(f)) {
    const b = fs.readFileSync(f);
    if (b.readUInt32BE(0) !== 0x89504e47) err(f, "not a PNG file");
    else if (b.readUInt32BE(16) > 2560 || b.readUInt32BE(20) > 2560) err(f, `PNG is ${b.readUInt32BE(16)}x${b.readUInt32BE(20)}; keep it ≤ 2560 px`);
  }
}
function walk2(dir, re, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if ([".git", "node_modules"].includes(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk2(p, re, out); else if (re.test(e.name)) out.push(p);
  }
  return out;
}

// 12. Script hygiene: install.ps1 must be ASCII (Windows PowerShell 5.1 reads BOM-less files as
//     ANSI), shell and PowerShell files must use LF only.
for (const f of ["install.ps1", "test/install-ps1.test.ps1", "PSScriptAnalyzerSettings.psd1"].map((x) => path.join(ROOT, x)).filter((x) => fs.existsSync(x))) {
  const t = read(f);
  const bad = [...t].findIndex((ch) => ch.charCodeAt(0) > 126 || (ch.charCodeAt(0) < 32 && !"\n\t".includes(ch)));
  if (bad >= 0) err(f, `non-ASCII or control character at offset ${bad} (line ${t.slice(0, bad).split("\n").length})`);
}
for (const f of [...walk2(ROOT, /\.(sh|ps1|mjs)$/)]) if (read(f).includes("\r")) err(f, "CRLF line endings; use LF");

for (const w of warnings) console.log(`warn  ${w}`);
for (const e of errors) console.log(`ERROR ${e}`);
console.log(`\n${skills.length} skills · ${styleCount} styles · ${mdFiles.length} markdown files checked · ${errors.length} error(s), ${warnings.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
