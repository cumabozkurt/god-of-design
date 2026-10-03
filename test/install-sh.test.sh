#!/usr/bin/env bash
# Standalone round-trip tests for install.sh (no Node needed). Usage: bash test/install-sh.test.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
INSTALLER="$ROOT/install.sh"
pass=0; fail=0
ok()   { pass=$((pass + 1)); echo "ok   $1"; }
bad()  { fail=$((fail + 1)); echo "FAIL $1"; }
expect() { if "${@:2}"; then ok "$1"; else bad "$1"; fi; }
same() { if [ "$2" = "$3" ]; then ok "$1"; else bad "$1"; fi; }
snap() { (cd "$1" && find . -print | LC_ALL=C sort | while IFS= read -r f; do
  if [ -f "$f" ]; then printf '%s %s\n' "$f" "$(cksum < "$f")"; else printf '%s/\n' "$f"; fi; done); }
run() { bash "$INSTALLER" "$@" >/dev/null; }

# A sandbox whose path contains spaces, like "C:\Users\Jane Doe" or "/Users/Jane Doe".
T="$(mktemp -d)"; trap 'chmod -R u+w "$T" 2>/dev/null || true; rm -rf "$T"' EXIT
W="$T/with space"; mkdir -p "$W/home/.codex" "$W/proj dir"
export GOD_OF_DESIGN_HOME="$W/home" XDG_CONFIG_HOME="$W/home/.config" CODEX_HOME="$W/home/.codex" NO_COLOR=1
printf '# My rules\r\n\r\nUse tabs.\r\n' > "$W/home/.codex/AGENTS.md"          # CRLF
printf '\357\273\277# Project rules' > "$W/proj dir/AGENTS.md"                   # BOM, no final newline
H0="$(snap "$W/home")"; P0="$(snap "$W/proj dir")"

run install
expect "global skills for Claude Code"   test -f "$W/home/.claude/skills/god-of-design/SKILL.md"
expect "global skills for Codex/agents"  test -f "$W/home/.agents/skills/god-styles/SKILL.md"
expect "global skills for Antigravity"   test -f "$W/home/.gemini/config/skills/god-color/SKILL.md"
expect "Claude commands"                 test -f "$W/home/.claude/commands/god-design.md"
expect "OpenCode commands"               test -f "$W/home/.config/opencode/commands/god-design.md"
expect "Codex block added"               grep -q "god-of-design:start" "$W/home/.codex/AGENTS.md"
case "$(bash "$INSTALLER" status)" in *"global: v"*) ok "status reports install" ;; *) bad "status reports install" ;; esac
run install
same   "reinstall keeps a single block"  "$(grep -c "god-of-design:start" "$W/home/.codex/AGENTS.md")" 1
expect "Codex block on its own CRLF lines" grep -q $'^Use tabs.\r$' "$W/home/.codex/AGENTS.md"
expect "Codex block start on own line"    grep -q $'^<!-- god-of-design:start -->\r$' "$W/home/.codex/AGENTS.md"
run uninstall
same   "uninstall restores HOME byte-for-byte (CRLF file)" "$(snap "$W/home")" "$H0"

(cd "$W/proj dir" && run install --project --tool every)
expect "project cursor rule"             test -f "$W/proj dir/.cursor/rules/god-of-design.mdc"
expect "project windsurf rule"           test -f "$W/proj dir/.windsurf/rules/god-of-design.md"
expect "project block on its own line"   grep -q '^<!-- god-of-design:start -->$' "$W/proj dir/AGENTS.md"
expect "project copilot instructions"    test -f "$W/proj dir/.github/instructions/god-of-design.instructions.md"
(cd "$W/proj dir" && run uninstall --project)
same   "project uninstall restores dir (BOM, no final newline)" "$(snap "$W/proj dir")" "$P0"

run install --project --dir "$W/proj dir" --tool cursor --dry-run
run install --dry-run
same   "dry-run writes nothing (home)"   "$(snap "$W/home")" "$H0"
same   "dry-run writes nothing (project)" "$(snap "$W/proj dir")" "$P0"

if bash "$INSTALLER" install --tool claude,photoshop >/dev/null 2>&1; then bad "unknown tool rejected"; else ok "unknown tool rejected"; fi
same   "unknown tool touched nothing"     "$(snap "$W/home")" "$H0"

if [ "$(id -u)" != 0 ]; then   # root ignores permissions, so this check is meaningless there
  mkdir -p "$W/home/.agents/skills"; chmod 555 "$W/home/.agents/skills"
  H1="$(snap "$W/home")"
  if bash "$INSTALLER" install >/dev/null 2>&1; then bad "permission error fails the install"; else ok "permission error fails the install"; fi
  same "failed install is rolled back"    "$(snap "$W/home")" "$H1"
  chmod 755 "$W/home/.agents/skills"; rmdir "$W/home/.agents/skills" "$W/home/.agents"
fi

echo "install.sh: $pass passed, $fail failed"
[ "$fail" = 0 ]
