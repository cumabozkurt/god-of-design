#!/usr/bin/env node
// Validates the pack: skill frontmatter, commands, style atlas completeness, internal links, JSON, versions, script syntax.
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

for (const w of warnings) console.log(`warn  ${w}`);
for (const e of errors) console.log(`ERROR ${e}`);
console.log(`\n${skills.length} skills · ${styleCount} styles · ${mdFiles.length} markdown files checked · ${errors.length} error(s), ${warnings.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
