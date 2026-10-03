// Round-trip tests for the Node CLI, install.sh and install.ps1 in throwaway HOME/project dirs.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import { spawnSync, execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { addBlock, removeBlock, parseArgs, resolvePlan, isOurs } from "../bin/god-of-design.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CLI = path.join(ROOT, "bin", "god-of-design.mjs");
const SKILLS = fs.readdirSync(path.join(ROOT, "skills")).filter((d) => fs.existsSync(path.join(ROOT, "skills", d, "SKILL.md")));
const isWin = process.platform === "win32";
const has = (cmd, args) => { try { execFileSync(cmd, args, { stdio: "ignore" }); return true; } catch { return false; } };
const BASH = !isWin && has("bash", ["--version"]);
const PWSH = ["pwsh", "/opt/pwsh/pwsh"].find((p) => has(p, ["-v"]));

function sandbox() {
  // Spaces in every path, like "C:\\Users\\Jane Doe" or "/Users/Jane Doe".
  const dir = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "god-test-")), "with space");
  fs.mkdirSync(dir);
  const home = path.join(dir, "home dir"), proj = path.join(dir, "proj dir");
  fs.mkdirSync(home); fs.mkdirSync(proj);
  const env = { ...process.env, GOD_OF_DESIGN_HOME: home, XDG_CONFIG_HOME: path.join(home, ".config"), CODEX_HOME: path.join(home, ".codex"), NO_COLOR: "1", GOD_OF_DESIGN_SRC: ROOT };
  return { dir, home, proj, env };
}
function snapshot(dir) {
  const out = {};
  (function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name), rel = path.relative(dir, p);
      if (e.isDirectory()) { out[rel + "/"] = "dir"; walk(p); }
      else out[rel] = crypto.createHash("sha1").update(fs.readFileSync(p)).digest("hex");
    }
  })(dir);
  return out;
}
const runners = {
  node: (args, s, cwd) => spawnSync(process.execPath, [CLI, ...args], { env: s.env, cwd: cwd || s.proj, encoding: "utf8" }),
  bash: (args, s, cwd) => spawnSync("bash", [path.join(ROOT, "install.sh"), ...args], { env: s.env, cwd: cwd || s.proj, encoding: "utf8" }),
  pwsh: (args, s, cwd) => {
    const map = { "--project": "-Project", "--dry-run": "-DryRun", "--force": "-Force", "--no-instructions": "-NoInstructions", "--tool": "-Tool", "--dir": "-Dir" };
    return spawnSync(PWSH, ["-NoProfile", "-File", path.join(ROOT, "install.ps1"), ...args.map((a) => map[a] || a)], { env: s.env, cwd: cwd || s.proj, encoding: "utf8" });
  },
};
function ok(r) { assert.equal(r.status, 0, `exit ${r.status}\n${r.stdout}\n${r.stderr}`); return r; }
function seedUserFiles(s) {
  fs.mkdirSync(path.join(s.home, ".codex"), { recursive: true });
  fs.writeFileSync(path.join(s.home, ".codex", "AGENTS.md"), "# My Codex rules\r\n\r\nAlways use tabs.\r\n"); // CRLF (Windows editors)
  fs.mkdirSync(path.join(s.home, ".claude", "skills", "my-skill"), { recursive: true });
  fs.writeFileSync(path.join(s.home, ".claude", "skills", "my-skill", "SKILL.md"), "---\nname: my-skill\ndescription: mine\n---\n");
  fs.writeFileSync(path.join(s.proj, "AGENTS.md"), "\uFEFF# Project rules\n\nRun tests."); // BOM, no final newline
  fs.writeFileSync(path.join(s.proj, "GEMINI.md"), "");                                           // empty file
  fs.writeFileSync(path.join(s.proj, "README.md"), "hello\n");
}

const available = Object.keys(runners).filter((k) => k === "node" || (k === "bash" && BASH) || (k === "pwsh" && PWSH));

for (const name of available) {
  const run = runners[name];

  test(`${name}: global --tool all round trip leaves HOME byte-identical`, () => {
    const s = sandbox(); seedUserFiles(s);
    const before = snapshot(s.home);
    ok(run(["install"], s));
    for (const d of [".claude/skills", ".agents/skills", ".gemini/config/skills"]) for (const sk of SKILLS) assert.ok(fs.existsSync(path.join(s.home, d, sk, "SKILL.md")), `${d}/${sk}`);
    assert.ok(fs.existsSync(path.join(s.home, ".claude/commands/god-design.md")));
    assert.ok(fs.existsSync(path.join(s.home, ".config/opencode/commands/god-design.md")));
    const agents = fs.readFileSync(path.join(s.home, ".codex/AGENTS.md"), "utf8");
    assert.match(agents, /^# My Codex rules/); assert.match(agents, /god-of-design:start/);
    assert.ok(fs.existsSync(path.join(s.home, ".god-of-design/manifest.tsv")));
    ok(run(["uninstall"], s));
    assert.deepEqual(snapshot(s.home), before);
  });

  test(`${name}: project --tool every round trip preserves user files`, () => {
    const s = sandbox(); seedUserFiles(s);
    const before = snapshot(s.proj);
    ok(run(["install", "--project", "--tool", "every"], s));
    for (const f of [".claude/skills/god-of-design/SKILL.md", ".agents/skills/god-styles/SKILL.md", ".opencode/commands/god-design.md", ".cursor/rules/god-of-design.mdc",
      ".github/instructions/god-of-design.instructions.md", ".windsurf/rules/god-of-design.md", ".clinerules/god-of-design.md", ".agents/rules/god-of-design.md", "GEMINI.md", ".god-of-design/GOD-OF-DESIGN.md"])
      assert.ok(fs.existsSync(path.join(s.proj, f)), f);
    ok(run(["uninstall", "--project"], s));
    assert.deepEqual(snapshot(s.proj), before);
  });

  test(`${name}: skill folders are shared, never duplicated (Gemini CLI warns on duplicates)`, () => {
    const s = sandbox();
    ok(run(["install", "--tool", "every"], s));
    for (const d of [".gemini/skills", ".cursor/skills", ".config/opencode/skills"]) assert.ok(!fs.existsSync(path.join(s.home, d)), `${d} should not be written`);
    for (const d of [".claude/skills", ".agents/skills", ".gemini/config/skills", ".copilot/skills"]) assert.ok(fs.existsSync(path.join(s.home, d, "god-color", "SKILL.md")), d);
    ok(run(["uninstall"], s));
    ok(run(["install", "--tool", "gemini,cursor"], s));                        // alone, each tool gets its own folder
    for (const d of [".gemini/skills", ".cursor/skills"]) assert.ok(fs.existsSync(path.join(s.home, d, "god-color", "SKILL.md")), d);
    ok(run(["uninstall"], s));
    assert.deepEqual(Object.keys(snapshot(s.home)), []);
  });

  test(`${name}: reinstall is idempotent (one instructions block)`, () => {
    const s = sandbox(); seedUserFiles(s);
    const before = snapshot(s.proj);
    ok(run(["install", "--project"], s)); ok(run(["install", "--project"], s));
    const txt = fs.readFileSync(path.join(s.proj, "AGENTS.md"), "utf8");
    assert.equal(txt.split("god-of-design:start").length - 1, 1);
    ok(run(["uninstall", "--project"], s));
    assert.deepEqual(snapshot(s.proj), before);
  });

  test(`${name}: never overwrites a foreign skill with the same name (unless --force)`, () => {
    const s = sandbox();
    const mine = path.join(s.home, ".claude/skills/god-color");
    fs.mkdirSync(mine, { recursive: true }); fs.writeFileSync(path.join(mine, "SKILL.md"), "---\nname: god-color\ndescription: my own\n---\n");
    const r = ok(run(["install", "--tool", "claude"], s));
    assert.match(r.stdout, /skip/);
    assert.match(fs.readFileSync(path.join(mine, "SKILL.md"), "utf8"), /my own/);
    ok(run(["uninstall"], s));
    assert.match(fs.readFileSync(path.join(mine, "SKILL.md"), "utf8"), /my own/);
    assert.ok(!fs.existsSync(path.join(s.home, ".claude/skills/god-styles")));
  });

  test(`${name}: --dry-run writes nothing`, () => {
    const s = sandbox(); seedUserFiles(s);
    const bh = snapshot(s.home), bp = snapshot(s.proj);
    ok(run(["install", "--dry-run"], s)); ok(run(["install", "--project", "--tool", "every", "--dry-run"], s));
    assert.deepEqual(snapshot(s.home), bh); assert.deepEqual(snapshot(s.proj), bp);
  });

  test(`${name}: inserted block sits on its own lines in the file's newline style`, () => {
    const s = sandbox(); seedUserFiles(s);
    ok(run(["install", "--tool", "codex"], s)); ok(run(["install", "--project", "--tool", "codex"], s));
    const g = fs.readFileSync(path.join(s.home, ".codex/AGENTS.md"), "utf8");
    assert.ok(g.startsWith("# My Codex rules\r\n\r\nAlways use tabs.\r\n\r\n<!-- god-of-design:start -->\r\n"), JSON.stringify(g.slice(0, 120)));
    assert.ok(!/[^\r]\n/.test(g), "mixed line endings in CRLF file");
    const p = fs.readFileSync(path.join(s.proj, "AGENTS.md"), "utf8");
    assert.ok(p.startsWith("\uFEFF# Project rules\n\nRun tests.\n\n<!-- god-of-design:start -->\n"), JSON.stringify(p.slice(0, 120)));
    assert.ok(!p.includes("\r"));
  });

  test(`${name}: unknown tool and missing --dir change nothing`, () => {
    const s = sandbox(); seedUserFiles(s);
    const bh = snapshot(s.home), bp = snapshot(s.proj);
    assert.notEqual(run(["install", "--tool", "claude,photoshop"], s).status, 0);
    const missing = path.join(s.dir, "does not exist");
    run(["install", "--project", "--dir", missing], s);
    assert.ok(!fs.existsSync(missing), "--dir must not be created");
    assert.deepEqual(snapshot(s.home), bh); assert.deepEqual(snapshot(s.proj), bp);
  });

  test(`${name}: a permission error rolls the install back`, { skip: isWin || process.getuid?.() === 0 ? "needs POSIX permissions as non-root" : false }, () => {
    const s = sandbox(); seedUserFiles(s);
    const locked = path.join(s.home, ".agents", "skills");
    fs.mkdirSync(locked, { recursive: true }); fs.chmodSync(locked, 0o555);
    const before = snapshot(s.home);
    try {
      const r = run(["install"], s);
      assert.notEqual(r.status, 0, "install should fail");
      assert.deepEqual(snapshot(s.home), before);
    } finally { fs.chmodSync(locked, 0o755); }
  });

  test(`${name}: uninstall without an installation is a no-op`, () => {
    const s = sandbox();
    const r = ok(run(["uninstall"], s));
    assert.match(r.stdout, /Nothing to remove/);
  });
}

// Cross-installer compatibility: shared manifest format.
const pairs = [];
for (const a of available) for (const b of available) if (a !== b) pairs.push([a, b]);
for (const [a, b] of pairs) {
  test(`cross: install with ${a}, uninstall with ${b}`, () => {
    const s = sandbox(); seedUserFiles(s);
    const bh = snapshot(s.home), bp = snapshot(s.proj);
    ok(runners[a](["install"], s)); ok(runners[a](["install", "--project", "--tool", "every"], s));
    ok(runners[b](["uninstall"], s)); ok(runners[b](["uninstall", "--project"], s));
    assert.deepEqual(snapshot(s.home), bh); assert.deepEqual(snapshot(s.proj), bp);
  });
}

test("node: unknown tool fails with a helpful message", () => {
  const s = sandbox();
  const r = runners.node(["install", "--tool", "photoshop"], s);
  assert.equal(r.status, 1); assert.match(r.stderr, /Unknown tool/);
});

test("node: list / status / version", () => {
  const s = sandbox();
  assert.match(ok(runners.node(["list", "styles"], s)).stdout, /ottoman-iznik|bauhaus/);
  assert.match(ok(runners.node(["list"], s)).stdout, /god-anti-slop/);
  assert.match(ok(runners.node(["status"], s)).stdout, /not installed/);
  assert.match(ok(runners.node(["--version"], s)).stdout.trim(), /^\d+\.\d+\.\d+$/);
});

test("unit: addBlock/removeBlock restore the exact original bytes", () => {
  const cases = ["", "x", "x\n", "# A\n\nB\n", "# A\r\n\r\nB\r\n", "# A\r\nB", "\uFEFF# A\nB", "\n", "a\n\n\n"];
  for (const original of cases) {
    const { out, pad } = addBlock(original, "## Snippet\n\nline two\n");
    assert.equal(out.split("god-of-design:start").length - 1, 1);
    assert.equal(removeBlock(out, pad), original, JSON.stringify(original));
    const again = addBlock(out, "## Snippet v2\n");                 // reinstall replaces, never duplicates
    assert.equal(again.out.split("god-of-design:start").length - 1, 1);
    assert.equal(removeBlock(again.out, pad), original, "reinstall " + JSON.stringify(original));
  }
  const t = "# Mine\n\n<!-- god-of-design:start -->\nours\n<!-- god-of-design:end -->\n\nAfter.\n";
  assert.equal(removeBlock(t, false), "# Mine\n\nAfter.\n");
});

test("unit: isOurs recognises our files (incl. v1.0.0 installs) and nothing else", () => {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), "god-ours-"));
  const w = (name, text) => { const p = path.join(d, name); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, text); return p; };
  assert.ok(isOurs(w("a/god-design.md", "---\n# god-of-design:managed\ndescription: x\n---\n")));
  assert.ok(isOurs(w("b/god-design.md", "---\n# god-of-design\ndescription: x\n---\n")), "v1.0.0 command file");
  assert.ok(isOurs(w("c/god-of-design.mdc", "---\ndescription: x\n---\n")), "v1.0.0 rule file");
  assert.ok(!isOurs(w("d/god-design.md", "---\ndescription: my own command\n---\nmentions god-of-design\n")));
  w("e/god-color/SKILL.md", "---\nname: god-color\nmetadata:\n  pack: god-of-design\n---\n");
  assert.ok(isOurs(path.join(d, "e/god-color")));
  w("f/god-color/SKILL.md", "---\nname: god-color\ndescription: inspired by god-of-design\n---\n");
  assert.ok(!isOurs(path.join(d, "f/god-color")));
  fs.rmSync(d, { recursive: true, force: true });
});

test("unit: resolvePlan validates and de-duplicates tools", () => {
  assert.throws(() => resolvePlan("claude,nope", "global", os.tmpdir()), /Unknown tool/);
  assert.doesNotThrow(() => resolvePlan("claude,claude,CODEX", "global", os.tmpdir()));
});

test("unit: parseArgs", () => {
  const o = parseArgs(["install", "--tool=cursor,windsurf", "--project", "--dry-run"]);
  assert.equal(o.cmd, "install"); assert.equal(o.tool, "cursor,windsurf"); assert.equal(o.scope, "project"); assert.equal(o.dry, true);
});

test(`environment: bash=${BASH} pwsh=${Boolean(PWSH)}`, () => assert.ok(true));
