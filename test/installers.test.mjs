// Round-trip tests for the Node CLI, install.sh and install.ps1 in throwaway HOME/project dirs.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import { spawnSync, execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { removeBlockText, parseArgs } from "../bin/god-of-design.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CLI = path.join(ROOT, "bin", "god-of-design.mjs");
const SKILLS = fs.readdirSync(path.join(ROOT, "skills")).filter((d) => fs.existsSync(path.join(ROOT, "skills", d, "SKILL.md")));
const isWin = process.platform === "win32";
const has = (cmd, args) => { try { execFileSync(cmd, args, { stdio: "ignore" }); return true; } catch { return false; } };
const BASH = !isWin && has("bash", ["--version"]);
const PWSH = ["pwsh", "/opt/pwsh/pwsh"].find((p) => has(p, ["-v"]));

function sandbox() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "god-test-"));
  const home = path.join(dir, "home"), proj = path.join(dir, "proj");
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
    const map = { "--project": "-Project", "--dry-run": "-DryRun", "--force": "-Force", "--no-instructions": "-NoInstructions", "--tool": "-Tool" };
    return spawnSync(PWSH, ["-NoProfile", "-File", path.join(ROOT, "install.ps1"), ...args.map((a) => map[a] || a)], { env: s.env, cwd: cwd || s.proj, encoding: "utf8" });
  },
};
function ok(r) { assert.equal(r.status, 0, `exit ${r.status}\n${r.stdout}\n${r.stderr}`); return r; }
function seedUserFiles(s) {
  fs.mkdirSync(path.join(s.home, ".codex"), { recursive: true });
  fs.writeFileSync(path.join(s.home, ".codex", "AGENTS.md"), "# My Codex rules\n\nAlways use tabs.\n");
  fs.mkdirSync(path.join(s.home, ".claude", "skills", "my-skill"), { recursive: true });
  fs.writeFileSync(path.join(s.home, ".claude", "skills", "my-skill", "SKILL.md"), "---\nname: my-skill\ndescription: mine\n---\n");
  fs.writeFileSync(path.join(s.proj, "AGENTS.md"), "# Project rules\n\nRun tests.\n");
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
    for (const f of [".claude/skills/god-of-design/SKILL.md", ".agents/skills/god-styles/SKILL.md", ".opencode/skills/god-color/SKILL.md", ".cursor/rules/god-of-design.mdc",
      ".github/instructions/god-of-design.instructions.md", ".windsurf/rules/god-of-design.md", ".clinerules/god-of-design.md", ".agents/rules/god-of-design.md", "GEMINI.md", ".god-of-design/GOD-OF-DESIGN.md"])
      assert.ok(fs.existsSync(path.join(s.proj, f)), f);
    ok(run(["uninstall", "--project"], s));
    assert.deepEqual(snapshot(s.proj), before);
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

test("unit: removeBlockText keeps surrounding user text", () => {
  const t = "# Mine\n\nKeep me.\n\n<!-- god-of-design:start -->\nours\n<!-- god-of-design:end -->\n\nAfter.\n";
  assert.equal(removeBlockText(t), "# Mine\n\nKeep me.\n\nAfter.\n");
  assert.equal(removeBlockText("<!-- god-of-design:start -->\nx\n<!-- god-of-design:end -->\n").trim(), "");
});

test("unit: parseArgs", () => {
  const o = parseArgs(["install", "--tool=cursor,windsurf", "--project", "--dry-run"]);
  assert.equal(o.cmd, "install"); assert.equal(o.tool, "cursor,windsurf"); assert.equal(o.scope, "project"); assert.equal(o.dry, true);
});

test(`environment: bash=${BASH} pwsh=${Boolean(PWSH)}`, () => assert.ok(true));
