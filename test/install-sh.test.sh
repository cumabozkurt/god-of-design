#!/usr/bin/env bash
# Standalone round-trip test for install.sh (no Node needed). Usage: bash test/install-sh.test.sh
set -eu
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
pass=0; fail=0
check() { if eval "$2"; then pass=$((pass+1)); echo "ok   $1"; else fail=$((fail+1)); echo "FAIL $1"; fi; }
snap() { (cd "$1" && find . -print | LC_ALL=C sort | while IFS= read -r f; do if [ -f "$f" ]; then printf '%s %s\n' "$f" "$(cksum < "$f")"; else printf '%s/\n' "$f"; fi; done); }

T="$(mktemp -d)"; trap 'rm -rf "$T"' EXIT
export GOD_OF_DESIGN_HOME="$T/home" XDG_CONFIG_HOME="$T/home/.config" CODEX_HOME="$T/home/.codex" NO_COLOR=1
mkdir -p "$T/home/.codex" "$T/proj"
printf '# My rules\n' > "$T/home/.codex/AGENTS.md"
printf '# Project\n' > "$T/proj/AGENTS.md"
H0="$(snap "$T/home")"; P0="$(snap "$T/proj")"

bash "$ROOT/install.sh" install >/dev/null
check "global skills for Claude Code"   '[ -f "$T/home/.claude/skills/god-of-design/SKILL.md" ]'
check "global skills for Codex/agents"  '[ -f "$T/home/.agents/skills/god-styles/SKILL.md" ]'
check "global skills for Antigravity"   '[ -f "$T/home/.gemini/config/skills/god-color/SKILL.md" ]'
check "Claude commands"                 '[ -f "$T/home/.claude/commands/god-design.md" ]'
check "OpenCode commands"               '[ -f "$T/home/.config/opencode/commands/god-design.md" ]'
check "Codex AGENTS.md keeps user text" 'head -n 1 "$T/home/.codex/AGENTS.md" | grep -q "My rules"'
check "Codex AGENTS.md has block"       'grep -q "god-of-design:start" "$T/home/.codex/AGENTS.md"'
check "status reports install"          'bash "$ROOT/install.sh" status | grep -q "global: v"'
bash "$ROOT/install.sh" install >/dev/null
check "reinstall keeps a single block"  '[ "$(grep -c "god-of-design:start" "$T/home/.codex/AGENTS.md")" = 1 ]'
bash "$ROOT/install.sh" uninstall >/dev/null
check "global uninstall restores HOME"  '[ "$(snap "$T/home")" = "$H0" ]'

(cd "$T/proj" && bash "$ROOT/install.sh" install --project --tool every >/dev/null)
check "project cursor rule"             '[ -f "$T/proj/.cursor/rules/god-of-design.mdc" ]'
check "project windsurf rule"           '[ -f "$T/proj/.windsurf/rules/god-of-design.md" ]'
check "project copilot instructions"    '[ -f "$T/proj/.github/instructions/god-of-design.instructions.md" ]'
(cd "$T/proj" && bash "$ROOT/install.sh" uninstall --project >/dev/null)
check "project uninstall restores dir"  '[ "$(snap "$T/proj")" = "$P0" ]'

bash "$ROOT/install.sh" install --dry-run >/dev/null
check "dry-run writes nothing"          '[ "$(snap "$T/home")" = "$H0" ]'

echo "install.sh: $pass passed, $fail failed"
[ "$fail" = 0 ]
