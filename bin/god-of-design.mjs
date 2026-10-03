#!/usr/bin/env node
// God of Design CLI: install / uninstall / list / status. Zero dependencies, Node >= 18.
// The manifest format is shared with install.sh and install.ps1: install with one, uninstall with another.
//
// Manifest (~/.god-of-design/manifest.tsv or ./.god-of-design/manifest.tsv), one record per line, TAB-separated:
//   # god-of-design <TAB> v<version> <TAB> <iso-date> <TAB> <scope> <TAB> <tool>   (header)
//   mkdir <TAB> <dir>                      directory we created (removed on uninstall only if empty)
//   dir   <TAB> <skill dir>                copied skill folder (removed only if its SKILL.md has "pack: god-of-design")
//   file  <TAB> <file>                     copied file (removed only if it contains "god-of-design:managed")
//   block <TAB> <file> <TAB> <created 0|1> <TAB> <pad 0|1>   instructions block appended to a file
// Records are appended as work happens, so even an interrupted install can be rolled back.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SRC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PKG = JSON.parse(fs.readFileSync(path.join(SRC, "package.json"), "utf8"));
const VERSION = PKG.version;
const MARK = "god-of-design";
const MANAGED = "god-of-design:managed";
export const BLOCK_START = "<!-- god-of-design:start -->";
export const BLOCK_END = "<!-- god-of-design:end -->";
export const ALL_TOOLS = ["claude", "codex", "opencode", "antigravity", "gemini", "cursor", "copilot", "windsurf", "cline"];

const color = process.stdout.isTTY && !process.env.NO_COLOR;
const paint = (code) => (s) => (color ? `\x1b[${code}m${s}\x1b[0m` : String(s));
const c = { b: paint(1), g: paint(32), y: paint(33), r: paint(31), d: paint(2) };

const home = () => process.env.GOD_OF_DESIGN_HOME || os.homedir();
const xdg = () => process.env.XDG_CONFIG_HOME || path.join(home(), ".config");
const codexHome = () => process.env.CODEX_HOME || path.join(home(), ".codex");

/** Destinations per tool and scope. rule/block = [destination, adapter source]. */
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
    windsurf: { block: [path.join(H, ".codeium/windsurf/memories/global_rules.md"), "adapters/windsurf/global_rules.snippet.md"], bundle: path.join(H, ".god-of-design/GOD-OF-DESIGN.md") },
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

/** "all" = the recommended set: each tool finds the pack through its native or a shared folder. */
export function resolvePlan(toolArg, scope, base) {
  const arg = String(toolArg || "all").toLowerCase();
  if (arg === "all") {
    const plan = scope === "global"
      ? [["claude", null], ["codex", null], ["antigravity", null], ["opencode", ["commands"]]]
      : [["claude", null], ["codex", null], ["antigravity", ["rule"]], ["opencode", ["commands"]]];
    return plan.map(([t, parts]) => ({ tool: t, parts, t: targets(t, scope, base) }));
  }
  const list = arg === "every" ? ALL_TOOLS : arg.split(",").map((s) => s.trim()).filter(Boolean);
  if (!list.length) throw new Error("--tool needs a value");
  for (const t of list) if (!ALL_TOOLS.includes(t)) throw new Error(`Unknown tool "${t}". Use one of: ${ALL_TOOLS.join(", ")}, all, every`);
  // Share skill folders instead of duplicating them: Gemini CLI also reads .agents/skills; Cursor and
  // OpenCode also read .agents/skills and .claude/skills. A second copy only adds noise (Gemini CLI
  // prints a "Skill conflict detected" warning for every skill).
  const has = new Set(list);
  const agents = has.has("codex") ? "codex" : scope === "project" && has.has("antigravity") ? "antigravity" : null;
  const claude = has.has("claude") ? "claude" : null;
  const READS = { gemini: [agents], cursor: [agents, claude], opencode: [agents, claude] };
  return [...has].map((t) => {
    const via = (READS[t] || []).find(Boolean) || null;
    return { tool: t, parts: via ? ["commands", "rule", "block", "bundle"] : null, sharedVia: via ? targets(via, scope, base).skills : null, t: targets(t, scope, base) };
  });
}

const manifestDir = (scope, base) => (scope === "global" ? path.join(home(), ".god-of-design") : path.join(base, ".god-of-design"));
const manifestPath = (scope, base) => path.join(manifestDir(scope, base), "manifest.tsv");

export function readManifest(file) {
  if (!fs.existsSync(file)) return [];
  return fs.readFileSync(file, "utf8").split(/\r?\n/).filter((l) => l && !l.startsWith("#")).map((l) => l.split("\t"));
}

const LEGACY_NAMES = new Set(["god-of-design.md", "god-of-design.mdc", "god-of-design.instructions.md", "GOD-OF-DESIGN.md"]);
/** True only for things this pack installed. */
export function isOurs(p) {
  try {
    if (fs.statSync(p).isDirectory()) {
      const f = path.join(p, "SKILL.md");
      return fs.existsSync(f) && /^\s+pack:\s*"?god-of-design"?\s*$/m.test(fs.readFileSync(f, "utf8"));
    }
    const text = fs.readFileSync(p, "utf8");
    if (text.includes(MANAGED)) return true;
    // Files written by v1.0.0, before the :managed marker existed.
    return LEGACY_NAMES.has(path.basename(p)) || /^---\r?\n# god-of-design\r?\n/.test(text);
  } catch { return false; }
}

// ---------- byte-preserving instruction blocks ----------
const nlOf = (t) => (t.includes("\r\n") ? "\r\n" : "\n");

/** Append our block. Returns the new text and whether a newline had to be added to the original. */
export function addBlock(text, snippet) {
  if (text.includes(BLOCK_START)) text = removeBlock(text, false);
  const nl = text ? nlOf(text) : "\n";
  const body = snippet.replace(/\r\n/g, "\n").trim().split("\n").join(nl);
  const block = BLOCK_START + nl + body + nl + BLOCK_END + nl;
  if (text === "") return { out: block, pad: false };
  const pad = !text.endsWith("\n");
  return { out: text + (pad ? nl : "") + nl + block, pad };
}

/** Exact inverse of addBlock: restores the original bytes (line endings, BOM, missing final newline). */
export function removeBlock(text, pad) {
  const i = text.indexOf(BLOCK_START);
  if (i < 0) return text;
  const j = text.indexOf(BLOCK_END, i);
  if (j < 0) return text;
  const nl = nlOf(text);
  let pre = text.slice(0, i), post = text.slice(j + BLOCK_END.length);
  if (post.startsWith(nl)) post = post.slice(nl.length); else if (post.startsWith("\n")) post = post.slice(1);
  if (pre.endsWith(nl)) pre = pre.slice(0, -nl.length);
  if (pad && pre.endsWith(nl)) pre = pre.slice(0, -nl.length);
  return pre + post;
}

class Recorder {
  constructor(dry) { this.dry = dry; this.lines = []; this.created = new Set(); this.file = null; }
  add(...l) { this.lines.push(l); if (this.file) fs.appendFileSync(this.file, l.join("\t") + "\n"); }
  open(file, header) { fs.writeFileSync(file, header + this.lines.map((l) => l.join("\t") + "\n").join("")); this.file = file; }
  mkdirp(dir) {
    const missing = [];
    let d = path.resolve(dir);
    while (!fs.existsSync(d)) { missing.unshift(d); const p = path.dirname(d); if (p === d) break; d = p; }
    for (const m of missing) {
      if (!this.dry) fs.mkdirSync(m);
      if (!this.created.has(m)) { this.created.add(m); this.add("mkdir", m); }
    }
  }
}

function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  // SKILL.md first, so even a partially copied folder is recognisable as ours (and removable).
  const entries = fs.readdirSync(src, { withFileTypes: true }).sort((x, y) => (y.name === "SKILL.md") - (x.name === "SKILL.md"));
  for (const e of entries) {
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    if (e.isDirectory()) copyDir(s, d); else fs.copyFileSync(s, d);
  }
}

const skillNames = () => fs.readdirSync(path.join(SRC, "skills")).filter((d) => fs.existsSync(path.join(SRC, "skills", d, "SKILL.md"))).sort();

export function install({ tool = "all", scope = "global", base = process.cwd(), dry = false, force = false, instructions = true, quiet = false } = {}) {
  const log = quiet ? () => {} : console.log;
  const plan = resolvePlan(tool, scope, base); // validates --tool before touching anything
  const mpath = manifestPath(scope, base);
  if (fs.existsSync(mpath)) {
    log(c.d("Existing installation found: removing it first (clean upgrade)."));
    if (!dry) uninstall({ scope, base, quiet: true });
  }
  const rec = new Recorder(dry);
  if (!dry) {
    rec.mkdirp(path.dirname(mpath));
    rec.open(mpath, `# ${MARK}\tv${VERSION}\t${new Date().toISOString()}\t${scope}\t${tool}\n`);
  }
  const done = new Set(), summary = [];
  try {
    for (const { tool: t, parts, sharedVia, t: tg } of plan) {
      const want = (k) => tg[k] && (!parts || parts.includes(k));
      const did = [];
      if (sharedVia && tg.skills) did.push(`skills: reads ${sharedVia} (no duplicate copy)`);
      if (want("skills") && !done.has(tg.skills)) {
        done.add(tg.skills); rec.mkdirp(tg.skills);
        let n = 0;
        for (const s of skillNames()) {
          const dst = path.join(tg.skills, s);
          if (fs.existsSync(dst) && !isOurs(dst) && !force) { log(c.y(`  ! skip ${dst} (exists and is not from ${MARK}; use --force)`)); continue; }
          rec.add("dir", dst);
          if (!dry) { fs.rmSync(dst, { recursive: true, force: true }); copyDir(path.join(SRC, "skills", s), dst); }
          n++;
        }
        did.push(`${n} skills → ${tg.skills}`);
      }
      if (want("commands") && !done.has(tg.commands)) {
        done.add(tg.commands); rec.mkdirp(tg.commands);
        let n = 0;
        for (const f of fs.readdirSync(path.join(SRC, "commands")).filter((x) => x.endsWith(".md")).sort()) {
          const dst = path.join(tg.commands, f);
          if (fs.existsSync(dst) && !isOurs(dst) && !force) { log(c.y(`  ! skip ${dst} (exists, not ours)`)); continue; }
          rec.add("file", dst);
          if (!dry) fs.writeFileSync(dst, fs.readFileSync(path.join(SRC, "commands", f), "utf8").replace(/^---\r?\n/, `---\n# ${MANAGED}\n`));
          n++;
        }
        did.push(`${n} commands → ${tg.commands}`);
      }
      if (want("rule") && !done.has(tg.rule[0])) {
        const [dst, adapter] = tg.rule; done.add(dst);
        if (fs.existsSync(dst) && !isOurs(dst) && !force) log(c.y(`  ! skip ${dst} (exists, not ours)`));
        else { rec.mkdirp(path.dirname(dst)); rec.add("file", dst); if (!dry) fs.copyFileSync(path.join(SRC, adapter), dst); did.push(`rule → ${dst}`); }
      }
      if (want("block") && instructions && !done.has(tg.block[0])) {
        const [dst, snippet] = tg.block; done.add(dst);
        const existed = fs.existsSync(dst);
        rec.mkdirp(path.dirname(dst));
        const { out, pad } = addBlock(existed ? fs.readFileSync(dst, "utf8") : "", fs.readFileSync(path.join(SRC, snippet), "utf8"));
        rec.add("block", dst, existed ? "0" : "1", pad ? "1" : "0");
        if (!dry) fs.writeFileSync(dst, out);
        did.push(`instructions block → ${dst}`);
      }
      if (want("bundle") && !done.has(tg.bundle)) {
        done.add(tg.bundle); rec.mkdirp(path.dirname(tg.bundle)); rec.add("file", tg.bundle);
        if (!dry) fs.copyFileSync(path.join(SRC, "dist/GOD-OF-DESIGN.md"), tg.bundle);
        did.push(`reference bundle → ${tg.bundle}`);
      }
      summary.push([t, did]);
    }
  } catch (e) {
    if (!dry) uninstall({ scope, base, quiet: true });
    throw new Error(`${e.message}\nInstall stopped and was rolled back; nothing from God of Design is left behind.`);
  }
  log(c.b(`\nGod of Design v${VERSION}: ${dry ? "dry run (nothing written)" : "installed"} (${scope})`));
  for (const [t, did] of summary) for (const d of did) log(`  ${c.g("✓")} ${t.padEnd(12)} ${d}`);
  if (!dry) log(c.d(`  manifest: ${mpath}`));
  log(`\nTry it: ask your agent ${c.b('"design a landing page for an Istanbul ceramics studio in Ottoman İznik style"')}`);
  // npm exec works on every npm; `npx github:` exits silently on some npm 9 builds.
  log(c.d(`Uninstall: npm exec --yes github:cumabozkurt/god-of-design -- uninstall${scope === "project" ? " --project" : ""}`));
  return { manifest: mpath, lines: rec.lines };
}

export function uninstall({ scope = "global", base = process.cwd(), quiet = false, dry = false } = {}) {
  const log = quiet ? () => {} : console.log;
  const mpath = manifestPath(scope, base);
  if (!fs.existsSync(mpath)) { log(c.y(`No ${scope} installation found (missing ${mpath}). Nothing to remove.`)); return { removed: 0 }; }
  const lines = readManifest(mpath);
  let removed = 0;
  for (const [kind, p, created, pad] of lines) {
    if (!p) continue;
    if (kind === "dir" || kind === "file") {
      if (fs.existsSync(p) && isOurs(p)) { if (!dry) fs.rmSync(p, { recursive: true, force: true }); removed++; log(`  ${c.r("−")} ${p}`); }
    } else if (kind === "block" && fs.existsSync(p)) {
      const before = fs.readFileSync(p, "utf8");
      if (!before.includes(BLOCK_START)) continue;
      const text = removeBlock(before, pad === "1");
      if (!dry) { if (created === "1" && text === "") fs.rmSync(p); else fs.writeFileSync(p, text); }
      removed++; log(`  ${c.r("−")} block in ${p}`);
    }
  }
  if (!dry) {
    fs.rmSync(mpath, { force: true });
    const dirs = lines.filter((l) => l[0] === "mkdir" && l[1]).map((l) => l[1]);
    dirs.push(manifestDir(scope, base));
    for (const d of [...new Set(dirs)].sort((a, b) => b.length - a.length)) {
      try { if (fs.existsSync(d) && fs.readdirSync(d).length === 0) fs.rmdirSync(d); } catch { /* not empty or no permission: keep */ }
    }
  }
  log(c.b(`God of Design ${dry ? "dry run: would remove" : "removed"} ${removed} item(s) (${scope}).`));
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
    for (const s of cat.styles) { if (s.family !== fam) { fam = s.family; console.log(c.b(`\n${fam}`)); } console.log(`  ${s.id.padEnd(30)} ${s.name}`); }
    console.log(c.d(`\n${cat.styles.length} styles`));
  } else if (what === "tools") {
    for (const t of cat.tools) console.log(`${c.b(t.id.padEnd(12))} ${t.name}\n  global : ${t.global}\n  project: ${t.project}\n  uses   : ${t.native}`);
  } else if (what === "skills") {
    for (const s of cat.skills) console.log(`${c.b(s.name.padEnd(20))} ${s.description.slice(0, 110)}…`);
    console.log(c.d(`\n${cat.skills.length} skills · ${cat.counts.styles} styles · ${cat.counts.commands} commands`));
  } else throw new Error(`Unknown list "${what}". Use: skills, styles, tools`);
}

const HELP = `God of Design v${VERSION}: design-intelligence pack for AI agents

Usage
  god-of-design install   [--tool <t>] [--global|--project] [--dir <path>] [--dry-run] [--force] [--no-instructions]
  god-of-design uninstall [--global|--project] [--dir <path>] [--dry-run]
  god-of-design list      [skills|styles|tools]
  god-of-design status    [--dir <path>]

Tools (--tool, comma-separated)
  all (default)  Claude Code + Codex + Antigravity skills, Claude & OpenCode commands. Also covers
                 OpenCode, Cursor, Gemini CLI and Copilot through the shared ~/.agents/skills folder
  every          the native folders of every tool below
  ${ALL_TOOLS.join(", ")}

Scope
  --global (default)  your home directory, all projects
  --project           the current directory (or --dir), committed with your repo

Examples
  npm exec --yes github:cumabozkurt/god-of-design -- install
  npm exec --yes github:cumabozkurt/god-of-design -- install --tool cursor,windsurf --project
  npm exec --yes github:cumabozkurt/god-of-design -- uninstall
  (npx github:cumabozkurt/god-of-design <command> also works on npm 10+)
`;

export function parseArgs(argv) {
  const o = { cmd: argv[0] && !argv[0].startsWith("-") ? argv[0] : "help", tool: "all", scope: "global", base: process.cwd(), dry: false, force: false, instructions: true, arg: null };
  const value = (i, flag) => { if (i >= argv.length || argv[i].startsWith("-")) throw new Error(`${flag} needs a value`); return argv[i]; };
  for (let i = o.cmd === "help" ? 0 : 1; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--tool" || a === "-t") o.tool = value(++i, a);
    else if (a.startsWith("--tool=")) o.tool = a.slice(7);
    else if (a === "--global" || a === "-g") o.scope = "global";
    else if (a === "--project" || a === "-p") o.scope = "project";
    else if (a === "--dir") o.base = path.resolve(value(++i, a));
    else if (a.startsWith("--dir=")) o.base = path.resolve(a.slice(6));
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

function isMain() {
  try { return Boolean(process.argv[1]) && fs.realpathSync(process.argv[1]) === fs.realpathSync(fileURLToPath(import.meta.url)); } catch { return false; }
}
if (isMain()) {
  try {
    const o = parseArgs(process.argv.slice(2));
    if (o.base && !fs.existsSync(o.base)) throw new Error(`Directory not found: ${o.base}`);
    if (o.cmd === "install") install(o);
    else if (o.cmd === "uninstall" || o.cmd === "remove") uninstall(o);
    else if (o.cmd === "list" || o.cmd === "ls") list(o.arg || "skills");
    else if (o.cmd === "status") status(o);
    else if (o.cmd === "version") console.log(VERSION);
    else if (o.cmd === "help") console.log(HELP);
    else throw new Error(`Unknown command "${o.cmd}". Run god-of-design --help`);
  } catch (e) { console.error(c.r(`Error: ${e.message}`)); process.exit(1); }
}
