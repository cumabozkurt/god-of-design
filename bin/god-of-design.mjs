#!/usr/bin/env node
// God of Design CLI: install / uninstall / list / status. Zero dependencies, Node >= 18.
// The manifest format is shared with install.sh and install.ps1, so you can install with one and uninstall with another.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SRC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PKG = JSON.parse(fs.readFileSync(path.join(SRC, "package.json"), "utf8"));
const VERSION = PKG.version;
const MARK = "god-of-design";
const BLOCK_START = "<!-- god-of-design:start -->";
const BLOCK_END = "<!-- god-of-design:end -->";
const ALL_TOOLS = ["claude", "codex", "opencode", "antigravity", "gemini", "cursor", "copilot", "windsurf", "cline"];

const c = process.stdout.isTTY && !process.env.NO_COLOR
  ? { b: (s) => `\x1b[1m${s}\x1b[0m`, g: (s) => `\x1b[32m${s}\x1b[0m`, y: (s) => `\x1b[33m${s}\x1b[0m`, r: (s) => `\x1b[31m${s}\x1b[0m`, d: (s) => `\x1b[2m${s}\x1b[0m` }
  : { b: (s) => s, g: (s) => s, y: (s) => s, r: (s) => s, d: (s) => s };

function home() { return process.env.GOD_OF_DESIGN_HOME || os.homedir(); }
function xdg() { return process.env.XDG_CONFIG_HOME || path.join(home(), ".config"); }
function codexHome() { return process.env.CODEX_HOME || path.join(home(), ".codex"); }

/** Targets per tool and scope. parts: skills (dir), commands (dir), rule [file, adapter], block [file, snippet], bundle (file). */
export function targets(tool, scope, base) {
  const H = home(), P = (...p) => path.join(base, ...p);
  const G = {
    claude: { skills: path.join(H, ".claude/skills"), commands: path.join(H, ".claude/commands") },
    codex: { skills: path.join(H, ".agents/skills"), block: [path.join(codexHome(), "AGENTS.md"), "adapters/codex/AGENTS.snippet.md"] },
    opencode: { skills: path.join(xdg(), "opencode/skills"), commands: path.join(xdg(), "opencode/commands") },
    antigravity: { skills: path.join(H, ".gemini/config/skills") },
    gemini: { skills: path.join(H, ".gemini/skills") },
    cursor: { skills: path.join(H, ".cursor/skills") },
    copilot: { skills: path.join(H, ".copilot/skills") },
    windsurf: { block: [path.join(H, ".codeium/windsurf/memories/global_rules.md"), "adapters/windsurf/god-of-design.md"], bundle: path.join(H, ".god-of-design/GOD-OF-DESIGN.md") },
    cline: { rule: [path.join(H, "Documents/Cline/Rules/god-of-design.md"), "adapters/cline/god-of-design.md"], bundle: path.join(H, ".god-of-design/GOD-OF-DESIGN.md") },
  };
  const L = {
    claude: { skills: P(".claude/skills"), commands: P(".claude/commands") },
    codex: { skills: P(".agents/skills"), block: [P("AGENTS.md"), "adapters/codex/AGENTS.snippet.md"] },
    opencode: { skills: P(".opencode/skills"), commands: P(".opencode/commands") },
    antigravity: { skills: P(".agents/skills"), rule: [P(".agents/rules/god-of-design.md"), "adapters/antigravity/god-of-design.md"] },
    gemini: { skills: P(".gemini/skills"), block: [P("GEMINI.md"), "adapters/gemini/GEMINI.snippet.md"] },
    cursor: { skills: P(".cursor/skills"), rule: [P(".cursor/rules/god-of-design.mdc"), "adapters/cursor/god-of-design.mdc"] },
    copilot: { skills: P(".github/skills"), rule: [P(".github/instructions/god-of-design.instructions.md"), "adapters/copilot/god-of-design.instructions.md"] },
    windsurf: { rule: [P(".windsurf/rules/god-of-design.md"), "adapters/windsurf/god-of-design.md"], bundle: P(".god-of-design/GOD-OF-DESIGN.md") },
    cline: { rule: [P(".clinerules/god-of-design.md"), "adapters/cline/god-of-design.md"], bundle: P(".god-of-design/GOD-OF-DESIGN.md") },
  };
  return (scope === "global" ? G : L)[tool];
}

/** "all" = the deduplicated recommended set: each tool sees the pack once through shared skill folders. */
export function resolvePlan(toolArg, scope, base) {
  if (toolArg === "all") {
    const plan = scope === "global"
      ? [["claude", null], ["codex", null], ["antigravity", null], ["opencode", ["commands"]]]
      : [["claude", null], ["codex", null], ["antigravity", ["rule"]], ["opencode", ["commands"]]];
    return plan.map(([t, parts]) => ({ tool: t, parts, t: targets(t, scope, base) }));
  }
  if (toolArg === "every") return ALL_TOOLS.map((t) => ({ tool: t, parts: null, t: targets(t, scope, base) }));
  const list = toolArg.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
  for (const t of list) if (!ALL_TOOLS.includes(t)) throw new Error(`Unknown tool "${t}". Use one of: ${ALL_TOOLS.join(", ")}, all, every`);
  return list.map((t) => ({ tool: t, parts: null, t: targets(t, scope, base) }));
}

function manifestDir(scope, base) { return scope === "global" ? path.join(home(), ".god-of-design") : path.join(base, ".god-of-design"); }
function manifestPath(scope, base) { return path.join(manifestDir(scope, base), "manifest.tsv"); }

export function readManifest(file) {
  if (!fs.existsSync(file)) return [];
  return fs.readFileSync(file, "utf8").split(/\r?\n/).filter((l) => l && !l.startsWith("#")).map((l) => l.split("\t"));
}

function isOurs(p) {
  try {
    const st = fs.statSync(p);
    const f = st.isDirectory() ? path.join(p, "SKILL.md") : p;
    return fs.existsSync(f) && fs.readFileSync(f, "utf8").includes(MARK);
  } catch { return false; }
}

class Recorder {
  constructor(dry) { this.lines = []; this.dry = dry; this.created = new Set(); }
  mkdirp(dir) {
    const missing = [];
    let d = path.resolve(dir);
    while (!fs.existsSync(d)) { missing.unshift(d); const p = path.dirname(d); if (p === d) break; d = p; }
    for (const m of missing) { if (!this.dry) fs.mkdirSync(m); if (!this.created.has(m)) { this.created.add(m); this.lines.push(["mkdir", m]); } }
  }
  add(...l) { this.lines.push(l); }
}

function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    if (e.isDirectory()) copyDir(s, d); else fs.copyFileSync(s, d);
  }
}

function insertBlock(file, snippet) {
  const existing = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
  const cleaned = removeBlockText(existing);
  const block = `${BLOCK_START}\n${snippet.trim()}\n${BLOCK_END}\n`;
  const out = cleaned.trim() ? cleaned.replace(/\s*$/, "\n\n") + block : block;
  fs.writeFileSync(file, out);
}
export function removeBlockText(text) {
  const re = new RegExp(`\\n*${BLOCK_START}[\\s\\S]*?${BLOCK_END}\\n?`, "g");
  return text.replace(re, "\n").replace(/\n{3,}/g, "\n\n").replace(/^\n+/, "");
}

function skillNames() {
  return fs.readdirSync(path.join(SRC, "skills")).filter((d) => fs.existsSync(path.join(SRC, "skills", d, "SKILL.md"))).sort();
}

export function install({ tool = "all", scope = "global", base = process.cwd(), dry = false, force = false, instructions = true, quiet = false } = {}) {
  const log = quiet ? () => {} : console.log;
  const mpath = manifestPath(scope, base);
  if (fs.existsSync(mpath)) {
    log(c.d("Existing installation found: removing it first (clean upgrade)."));
    if (!dry) uninstall({ scope, base, quiet: true });
  }
  const rec = new Recorder(dry);
  const plan = resolvePlan(tool, scope, base);
  const done = new Set();
  const skills = skillNames();
  const summary = [];
  for (const { tool: t, parts, t: tg } of plan) {
    const want = (k) => tg[k] && (!parts || parts.includes(k));
    const did = [];
    if (want("skills") && !done.has(tg.skills)) {
      done.add(tg.skills); rec.mkdirp(tg.skills);
      let n = 0;
      for (const s of skills) {
        const dst = path.join(tg.skills, s);
        if (fs.existsSync(dst) && !isOurs(dst) && !force) { log(c.y(`  ! skip ${dst} (exists and is not from ${MARK}; use --force)`)); continue; }
        if (!dry) { fs.rmSync(dst, { recursive: true, force: true }); copyDir(path.join(SRC, "skills", s), dst); }
        rec.add("dir", dst); n++;
      }
      did.push(`${n} skills → ${tg.skills}`);
    }
    if (want("commands") && !done.has(tg.commands)) {
      done.add(tg.commands); rec.mkdirp(tg.commands);
      let n = 0;
      for (const f of fs.readdirSync(path.join(SRC, "commands")).filter((x) => x.endsWith(".md"))) {
        const dst = path.join(tg.commands, f);
        if (fs.existsSync(dst) && !isOurs(dst) && !force) { log(c.y(`  ! skip ${dst} (exists, not ours)`)); continue; }
        if (!dry) fs.writeFileSync(dst, fs.readFileSync(path.join(SRC, "commands", f), "utf8").replace(/^---\n/, `---\n# ${MARK}\n`));
        rec.add("file", dst); n++;
      }
      did.push(`${n} commands → ${tg.commands}`);
    }
    if (want("rule") && !done.has(tg.rule[0])) {
      const [dst, adapter] = tg.rule; done.add(dst);
      if (fs.existsSync(dst) && !isOurs(dst) && !force) log(c.y(`  ! skip ${dst} (exists, not ours)`));
      else { rec.mkdirp(path.dirname(dst)); if (!dry) fs.copyFileSync(path.join(SRC, adapter), dst); rec.add("file", dst); did.push(`rule → ${dst}`); }
    }
    if (want("block") && instructions && !done.has(tg.block[0])) {
      const [dst, snippet] = tg.block; done.add(dst);
      const existed = fs.existsSync(dst);
      rec.mkdirp(path.dirname(dst));
      if (!dry) insertBlock(dst, fs.readFileSync(path.join(SRC, snippet), "utf8"));
      rec.add("block", dst, existed ? "0" : "1"); did.push(`instructions block → ${dst}`);
    }
    if (want("bundle") && !done.has(tg.bundle)) {
      done.add(tg.bundle); rec.mkdirp(path.dirname(tg.bundle));
      if (!dry) fs.copyFileSync(path.join(SRC, "dist/GOD-OF-DESIGN.md"), tg.bundle);
      rec.add("file", tg.bundle); did.push(`reference bundle → ${tg.bundle}`);
    }
    summary.push([t, did]);
  }
  if (!dry) {
    rec.mkdirp(path.dirname(mpath));
    const header = `# ${MARK}\tv${VERSION}\t${new Date().toISOString()}\t${scope}\t${tool}\n`;
    fs.writeFileSync(mpath, header + rec.lines.map((l) => l.join("\t")).join("\n") + "\n");
  }
  log(c.b(`\nGod of Design v${VERSION}: ${dry ? "dry run (nothing written)" : "installed"} (${scope})`));
  for (const [t, did] of summary) for (const d of did) log(`  ${c.g("✓")} ${t.padEnd(12)} ${d}`);
  if (!dry) log(c.d(`  manifest: ${mpath}`));
  log(`\nTry it: ask your agent ${c.b('"design a landing page for an Istanbul ceramics studio in Ottoman İznik style"')}`);
  log(c.d(`Uninstall: npx github:cumabozkurt/god-of-design uninstall${scope === "project" ? " --project" : ""}`));
  return { manifest: mpath, lines: rec.lines };
}

export function uninstall({ scope = "global", base = process.cwd(), quiet = false, dry = false } = {}) {
  const log = quiet ? () => {} : console.log;
  const mpath = manifestPath(scope, base);
  const lines = readManifest(mpath);
  if (!fs.existsSync(mpath)) { log(c.y(`No ${scope} installation found (missing ${mpath}). Nothing to remove.`)); return { removed: 0 }; }
  let removed = 0;
  for (const [kind, p, extra] of lines) {
    if (kind === "dir" || kind === "file") {
      if (fs.existsSync(p) && (isOurs(p) || kind === "file" && p.endsWith("GOD-OF-DESIGN.md"))) { if (!dry) fs.rmSync(p, { recursive: true, force: true }); removed++; log(`  ${c.r("−")} ${p}`); }
    } else if (kind === "block" && fs.existsSync(p)) {
      const text = removeBlockText(fs.readFileSync(p, "utf8"));
      if (!dry) { if (extra === "1" && !text.trim()) fs.rmSync(p); else fs.writeFileSync(p, text); }
      removed++; log(`  ${c.r("−")} block in ${p}`);
    }
  }
  if (!dry) fs.rmSync(mpath, { force: true });
  // Remove directories we created, deepest first, only if empty.
  const dirs = lines.filter((l) => l[0] === "mkdir").map((l) => l[1]).sort((a, b) => b.length - a.length);
  const md = manifestDir(scope, base);
  if (!dirs.includes(md)) dirs.push(md);
  for (const d of dirs) { try { if (!dry && fs.existsSync(d) && fs.readdirSync(d).length === 0) fs.rmdirSync(d); } catch {} }
  log(c.b(`God of Design ${dry ? "dry-run: would remove" : "removed"} ${removed} item(s) (${scope}).`));
  return { removed };
}

function status({ base }) {
  for (const scope of ["global", "project"]) {
    const m = manifestPath(scope, base);
    if (!fs.existsSync(m)) { console.log(`${scope.padEnd(8)} not installed`); continue; }
    const head = fs.readFileSync(m, "utf8").split("\n")[0].split("\t");
    const lines = readManifest(m);
    console.log(`${scope.padEnd(8)} ${head[1]} (tool: ${head[4]}, ${lines.filter((l) => l[0] === "dir").length} skill dirs, ${lines.filter((l) => l[0] !== "mkdir").length} items) · ${m}`);
  }
}

function list(what = "skills") {
  const cat = JSON.parse(fs.readFileSync(path.join(SRC, "catalog.json"), "utf8"));
  if (what === "styles") {
    let fam = "";
    for (const s of cat.styles) { if (s.family !== fam) { fam = s.family; console.log(c.b(`\n${fam}`)); } console.log(`  ${s.id.padEnd(26)} ${s.name}${s.region ? c.d(` · ${s.region}`) : ""}`); }
    console.log(c.d(`\n${cat.styles.length} styles`));
  } else if (what === "tools") {
    for (const t of cat.tools) console.log(`${c.b(t.id.padEnd(12))} ${t.name}\n  global : ${t.global}\n  project: ${t.project}\n  uses   : ${t.native}`);
  } else {
    for (const s of cat.skills) console.log(`${c.b(s.name.padEnd(20))} ${s.description.slice(0, 110)}…`);
    console.log(c.d(`\n${cat.skills.length} skills · ${cat.counts.styles} styles · ${cat.counts.commands} commands`));
  }
}

const HELP = `God of Design v${VERSION}: design-intelligence pack for AI agents

Usage
  god-of-design install   [--tool <t>] [--global|--project] [--dir <path>] [--dry-run] [--force] [--no-instructions]
  god-of-design uninstall [--global|--project] [--dir <path>] [--dry-run]
  god-of-design list      [skills|styles|tools]
  god-of-design status    [--dir <path>]

Tools (--tool, comma-separated)
  all (default)  Claude Code + Codex + Antigravity skills, Claude & OpenCode commands. Also covers
                 OpenCode, Cursor, Gemini CLI and Copilot via their shared skill folders
  every          native folders of every tool below (may show duplicates in tools that read several folders)
  ${ALL_TOOLS.join(", ")}

Scope
  --global (default)  your home directory, all projects
  --project           the current directory (or --dir), committed with your repo

Examples
  npx github:cumabozkurt/god-of-design install
  npx github:cumabozkurt/god-of-design install --tool cursor,windsurf --project
  npx github:cumabozkurt/god-of-design uninstall
`;

export function parseArgs(argv) {
  const o = { cmd: argv[0] && !argv[0].startsWith("-") ? argv[0] : "help", tool: "all", scope: "global", base: process.cwd(), dry: false, force: false, instructions: true, arg: null };
  for (let i = o.cmd === "help" ? 0 : 1; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--tool" || a === "-t") o.tool = argv[++i];
    else if (a.startsWith("--tool=")) o.tool = a.slice(7);
    else if (a === "--global" || a === "-g") o.scope = "global";
    else if (a === "--project" || a === "-p") o.scope = "project";
    else if (a === "--dir") o.base = path.resolve(argv[++i]);
    else if (a === "--dry-run" || a === "-n") o.dry = true;
    else if (a === "--force" || a === "-f") o.force = true;
    else if (a === "--no-instructions") o.instructions = false;
    else if (a === "--help" || a === "-h") o.cmd = "help";
    else if (a === "--version" || a === "-v") o.cmd = "version";
    else if (!a.startsWith("-") && !o.arg) o.arg = a;
    else throw new Error(`Unknown option: ${a}`);
  }
  return o;
}

const isMain = process.argv[1] && fs.realpathSync(process.argv[1]) === fs.realpathSync(fileURLToPath(import.meta.url));
if (isMain) {
  try {
    const o = parseArgs(process.argv.slice(2));
    if (o.cmd === "install") install(o);
    else if (o.cmd === "uninstall" || o.cmd === "remove") uninstall(o);
    else if (o.cmd === "list" || o.cmd === "ls") list(o.arg || "skills");
    else if (o.cmd === "status") status(o);
    else if (o.cmd === "version") console.log(VERSION);
    else console.log(HELP);
  } catch (e) { console.error(c.r(`Error: ${e.message}`)); process.exit(1); }
}
