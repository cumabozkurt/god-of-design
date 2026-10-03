#!/usr/bin/env bash
# God of Design installer for macOS / Linux (bash 3.2+). MIT © Cuma Bozkurt
#   Install  : curl -fsSL https://raw.githubusercontent.com/cumabozkurt/god-of-design/main/install.sh | bash
#   Uninstall: curl -fsSL https://raw.githubusercontent.com/cumabozkurt/god-of-design/main/install.sh | bash -s -- uninstall
#   Options  : install|uninstall|status|list  --tool all|every|claude,codex,opencode,antigravity,gemini,cursor,copilot,windsurf,cline
#              --global (default) | --project [--dir PATH]   --dry-run   --force   --no-instructions
# The manifest format is shared with the Node CLI and install.ps1, so any of them can uninstall what another installed.
set -eu

REPO="cumabozkurt/god-of-design"
REF="${GOD_OF_DESIGN_REF:-main}"
MARK="god-of-design"
BSTART="<!-- god-of-design:start -->"
BEND="<!-- god-of-design:end -->"
ALL_TOOLS="claude codex opencode antigravity gemini cursor copilot windsurf cline"

CMD="install"; TOOL="all"; SCOPE="global"; BASE="$(pwd)"; DRY=0; FORCE=0; INSTR=1
H="${GOD_OF_DESIGN_HOME:-$HOME}"
XDG="${XDG_CONFIG_HOME:-$H/.config}"
CODEXH="${CODEX_HOME:-$H/.codex}"

if [ -t 1 ] && [ -z "${NO_COLOR:-}" ]; then B=$'\033[1m'; G=$'\033[32m'; Y=$'\033[33m'; R=$'\033[31m'; D=$'\033[2m'; N=$'\033[0m'; else B=; G=; Y=; R=; D=; N=; fi
say() { printf '%s\n' "$*"; }
die() { printf '%sError: %s%s\n' "$R" "$*" "$N" >&2; exit 1; }

while [ $# -gt 0 ]; do
  case "$1" in
    install|uninstall|remove|status|list|help) CMD="$1" ;;
    --tool|-t) [ $# -ge 2 ] || die "--tool needs a value"; TOOL="$2"; shift ;;
    --tool=*) TOOL="${1#--tool=}" ;;
    --global|-g) SCOPE="global" ;;
    --project|-p) SCOPE="project" ;;
    --dir) [ $# -ge 2 ] || die "--dir needs a value"; mkdir -p "$2"; BASE="$(cd "$2" && pwd)"; shift ;;
    --dry-run|-n) DRY=1 ;;
    --force|-f) FORCE=1 ;;
    --no-instructions) INSTR=0 ;;
    --help|-h) CMD="help" ;;
    *) die "Unknown option: $1" ;;
  esac
  shift
done
[ "$CMD" = "remove" ] && CMD="uninstall"

if [ "$SCOPE" = "global" ]; then MDIR="$H/.god-of-design"; else MDIR="$BASE/.god-of-design"; fi
MANIFEST="$MDIR/manifest.tsv"

# ---------- source resolution ----------
SRC=""; TMPD=""
cleanup() { [ -n "$TMPD" ] && rm -rf "$TMPD"; return 0; }
trap cleanup EXIT
resolve_src() {
  if [ -n "${GOD_OF_DESIGN_SRC:-}" ]; then SRC="$GOD_OF_DESIGN_SRC"; return; fi
  local here="${BASH_SOURCE[0]:-}"
  if [ -n "$here" ] && [ -f "$(dirname "$here")/skills/god-of-design/SKILL.md" ]; then SRC="$(cd "$(dirname "$here")" && pwd)"; return; fi
  TMPD="$(mktemp -d 2>/dev/null || mktemp -d -t god-of-design)"
  local url="https://codeload.github.com/$REPO/tar.gz/$REF"
  say "${D}Downloading $REPO@$REF …${N}"
  if command -v curl >/dev/null 2>&1; then curl -fsSL "$url" | tar -xz -C "$TMPD"
  elif command -v wget >/dev/null 2>&1; then wget -qO- "$url" | tar -xz -C "$TMPD"
  else die "curl or wget is required"; fi
  SRC="$(find "$TMPD" -mindepth 1 -maxdepth 1 -type d | head -n 1)"
  [ -f "$SRC/skills/god-of-design/SKILL.md" ] || die "download did not contain the skill pack"
}

# ---------- helpers ----------
LINES=""          # manifest body being built (newline separated)
CREATED=""        # dirs created in this run
DONE=""           # destinations already handled
add_line() { LINES="${LINES}$1
"; }
seen() { case "
$DONE
" in *"
$1
"*) return 0 ;; esac; DONE="${DONE}
$1"; return 1; }
is_ours() {
  local p="$1" f="$1"
  [ -d "$p" ] && f="$p/SKILL.md"
  [ -f "$f" ] && grep -q "$MARK" "$f"
}
mkdirp() {
  local d="$1" missing=""
  while [ ! -e "$d" ]; do missing="$d
$missing"; d="$(dirname "$d")"; done
  local IFS='
'
  for m in $missing; do
    if [ "$DRY" = 0 ] && [ ! -d "$m" ]; then mkdir "$m"; fi
    case "
$CREATED
" in *"
$m
"*) ;; *) CREATED="${CREATED}
$m"; add_line "mkdir	$m" ;; esac
  done
}
strip_block() { # prints file without our block, squeezing blank lines and dropping leading blanks
  awk -v s="$BSTART" -v e="$BEND" '
    $0==s {skip=1; next} skip && $0==e {skip=0; next} skip {next}
    { if ($0 ~ /^[[:space:]]*$/) { blank++; next } if (started && blank) print ""; blank=0; started=1; print }
  ' "$1"
}
insert_block() { # file snippet
  local f="$1" snip="$2" body=""
  [ -f "$f" ] && body="$(strip_block "$f")"
  {
    if [ -n "$(printf '%s' "$body" | tr -d '[:space:]')" ]; then printf '%s\n\n' "$body"; fi
    printf '%s\n' "$BSTART"
    awk 'NF{p=1} p' "$snip" | sed -e :a -e '/^\n*$/{$d;N;ba' -e '}'
    printf '%s\n' "$BEND"
  } > "$f.god-tmp" && mv "$f.god-tmp" "$f"
}

# target <tool> <part>  → prints destination (and adapter after a TAB for rule/block)
target() {
  local t="$1" k="$2"
  if [ "$SCOPE" = "global" ]; then
    case "$t:$k" in
      claude:skills) echo "$H/.claude/skills" ;; claude:commands) echo "$H/.claude/commands" ;;
      codex:skills) echo "$H/.agents/skills" ;; codex:block) printf '%s\t%s\n' "$CODEXH/AGENTS.md" "adapters/codex/AGENTS.snippet.md" ;;
      opencode:skills) echo "$XDG/opencode/skills" ;; opencode:commands) echo "$XDG/opencode/commands" ;;
      antigravity:skills) echo "$H/.gemini/config/skills" ;;
      gemini:skills) echo "$H/.gemini/skills" ;;
      cursor:skills) echo "$H/.cursor/skills" ;;
      copilot:skills) echo "$H/.copilot/skills" ;;
      windsurf:block) printf '%s\t%s\n' "$H/.codeium/windsurf/memories/global_rules.md" "adapters/windsurf/god-of-design.md" ;;
      windsurf:bundle|cline:bundle) echo "$H/.god-of-design/GOD-OF-DESIGN.md" ;;
      cline:rule) printf '%s\t%s\n' "$H/Documents/Cline/Rules/god-of-design.md" "adapters/cline/god-of-design.md" ;;
    esac
  else
    case "$t:$k" in
      claude:skills) echo "$BASE/.claude/skills" ;; claude:commands) echo "$BASE/.claude/commands" ;;
      codex:skills) echo "$BASE/.agents/skills" ;; codex:block) printf '%s\t%s\n' "$BASE/AGENTS.md" "adapters/codex/AGENTS.snippet.md" ;;
      opencode:skills) echo "$BASE/.opencode/skills" ;; opencode:commands) echo "$BASE/.opencode/commands" ;;
      antigravity:skills) echo "$BASE/.agents/skills" ;; antigravity:rule) printf '%s\t%s\n' "$BASE/.agents/rules/god-of-design.md" "adapters/antigravity/god-of-design.md" ;;
      gemini:skills) echo "$BASE/.gemini/skills" ;; gemini:block) printf '%s\t%s\n' "$BASE/GEMINI.md" "adapters/gemini/GEMINI.snippet.md" ;;
      cursor:skills) echo "$BASE/.cursor/skills" ;; cursor:rule) printf '%s\t%s\n' "$BASE/.cursor/rules/god-of-design.mdc" "adapters/cursor/god-of-design.mdc" ;;
      copilot:skills) echo "$BASE/.github/skills" ;; copilot:rule) printf '%s\t%s\n' "$BASE/.github/instructions/god-of-design.instructions.md" "adapters/copilot/god-of-design.instructions.md" ;;
      windsurf:rule) printf '%s\t%s\n' "$BASE/.windsurf/rules/god-of-design.md" "adapters/windsurf/god-of-design.md" ;;
      windsurf:bundle|cline:bundle) echo "$BASE/.god-of-design/GOD-OF-DESIGN.md" ;;
      cline:rule) printf '%s\t%s\n' "$BASE/.clinerules/god-of-design.md" "adapters/cline/god-of-design.md" ;;
    esac
  fi
}

do_part() { # tool part
  local t="$1" k="$2" spec dst adp n s f
  spec="$(target "$t" "$k")"; [ -n "$spec" ] || return 0
  dst="${spec%%	*}"; adp=""; case "$spec" in *"	"*) adp="${spec#*	}" ;; esac
  seen "$dst" && return 0
  case "$k" in
    skills)
      mkdirp "$dst"; n=0
      for s in "$SRC"/skills/*/; do
        s="$(basename "$s")"; [ -f "$SRC/skills/$s/SKILL.md" ] || continue
        if [ -e "$dst/$s" ] && ! is_ours "$dst/$s" && [ "$FORCE" = 0 ]; then say "  ${Y}! skip $dst/$s (exists and is not from $MARK; use --force)${N}"; continue; fi
        if [ "$DRY" = 0 ]; then rm -rf "$dst/$s"; cp -R "$SRC/skills/$s" "$dst/$s"; fi
        add_line "dir	$dst/$s"; n=$((n+1))
      done
      say "  ${G}✓${N} $(printf '%-12s' "$t") $n skills → $dst" ;;
    commands)
      mkdirp "$dst"; n=0
      for f in "$SRC"/commands/*.md; do
        s="$(basename "$f")"
        if [ -e "$dst/$s" ] && ! is_ours "$dst/$s" && [ "$FORCE" = 0 ]; then say "  ${Y}! skip $dst/$s (exists, not ours)${N}"; continue; fi
        [ "$DRY" = 0 ] && awk -v m="# $MARK" 'NR==1 && $0=="---" {print; print m; next} {print}' "$f" > "$dst/$s"
        add_line "file	$dst/$s"; n=$((n+1))
      done
      say "  ${G}✓${N} $(printf '%-12s' "$t") $n commands → $dst" ;;
    rule)
      if [ -e "$dst" ] && ! is_ours "$dst" && [ "$FORCE" = 0 ]; then say "  ${Y}! skip $dst (exists, not ours)${N}"; return 0; fi
      mkdirp "$(dirname "$dst")"; [ "$DRY" = 0 ] && cp "$SRC/$adp" "$dst"
      add_line "file	$dst"; say "  ${G}✓${N} $(printf '%-12s' "$t") rule → $dst" ;;
    block)
      [ "$INSTR" = 1 ] || return 0
      local existed=1; [ -e "$dst" ] || existed=0
      mkdirp "$(dirname "$dst")"; [ "$DRY" = 0 ] && insert_block "$dst" "$SRC/$adp"
      if [ "$existed" = 1 ]; then add_line "block	$dst	0"; else add_line "block	$dst	1"; fi
      say "  ${G}✓${N} $(printf '%-12s' "$t") instructions block → $dst" ;;
    bundle)
      mkdirp "$(dirname "$dst")"; [ "$DRY" = 0 ] && cp "$SRC/dist/GOD-OF-DESIGN.md" "$dst"
      add_line "file	$dst"; say "  ${G}✓${N} $(printf '%-12s' "$t") reference bundle → $dst" ;;
  esac
}

do_uninstall() {
  local quiet="${1:-0}" removed=0 kind p extra
  if [ ! -f "$MANIFEST" ]; then [ "$quiet" = 1 ] || say "${Y}No $SCOPE installation found ($MANIFEST). Nothing to remove.${N}"; return 0; fi
  while IFS='	' read -r kind p extra; do
    case "$kind" in
      dir|file)
        if [ -e "$p" ] && { is_ours "$p" || [ "$(basename "$p")" = "GOD-OF-DESIGN.md" ]; }; then
          [ "$DRY" = 0 ] && rm -rf "$p"; removed=$((removed+1)); [ "$quiet" = 1 ] || say "  ${R}−${N} $p"
        fi ;;
      block)
        if [ -f "$p" ]; then
          if [ "$DRY" = 0 ]; then
            strip_block "$p" > "$p.god-tmp"
            if [ "$extra" = "1" ] && [ -z "$(tr -d '[:space:]' < "$p.god-tmp")" ]; then rm -f "$p" "$p.god-tmp"; else mv "$p.god-tmp" "$p"; fi
          fi
          removed=$((removed+1)); [ "$quiet" = 1 ] || say "  ${R}−${N} block in $p"
        fi ;;
    esac
  done < <(grep -v '^#' "$MANIFEST")
  if [ "$DRY" = 0 ]; then
    rm -f "$MANIFEST"
  fi
  [ "$quiet" = 1 ] || say "${B}God of Design: removed $removed item(s) ($SCOPE).${N}"
}
remove_created_dirs() { # reads manifest lines from stdin
  grep '^mkdir	' | cut -f2- | awk '{print length($0)"\t"$0}' | sort -rn | cut -f2- | while IFS= read -r d; do
    [ -d "$d" ] && rmdir "$d" 2>/dev/null || true
  done
  rmdir "$MDIR" 2>/dev/null || true
}
uninstall_all() {
  local q="${1:-0}" saved=""
  [ -f "$MANIFEST" ] && saved="$(cat "$MANIFEST")"
  do_uninstall "$q"
  [ "$DRY" = 0 ] && [ -n "$saved" ] && printf '%s\n' "$saved" | remove_created_dirs
  return 0
}

do_install() {
  resolve_src
  local version; version="$(sed -n 's/.*"version": *"\([^"]*\)".*/\1/p' "$SRC/package.json" | head -n 1)"
  if [ -f "$MANIFEST" ]; then say "${D}Existing installation found, removing it first (clean upgrade).${N}"; [ "$DRY" = 1 ] || uninstall_all 1; fi
  say "${B}God of Design v$version → $SCOPE${N}"
  local t k
  if [ "$TOOL" = "all" ]; then
    do_part claude skills; do_part claude commands
    do_part codex skills; do_part codex block
    do_part antigravity skills; [ "$SCOPE" = "project" ] && do_part antigravity rule
    do_part opencode commands
  else
    local list="$TOOL"; [ "$TOOL" = "every" ] && list="$ALL_TOOLS"
    for t in $(printf '%s' "$list" | tr ',' ' ' | tr 'A-Z' 'a-z'); do
      case " $ALL_TOOLS " in *" $t "*) ;; *) die "Unknown tool \"$t\". Use: $ALL_TOOLS, all, every" ;; esac
      for k in skills commands rule block bundle; do do_part "$t" "$k"; done
    done
  fi
  if [ "$DRY" = 0 ]; then
    mkdirp "$MDIR"
    { printf '# %s\tv%s\t%s\t%s\t%s\n' "$MARK" "$version" "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "$SCOPE" "$TOOL"; printf '%s' "$LINES"; } > "$MANIFEST"
    say "  ${D}manifest: $MANIFEST${N}"
  else say "${Y}dry run: nothing was written${N}"; fi
  say ""
  say "Try it: ask your agent ${B}\"design a landing page for an Istanbul ceramics studio in Ottoman İznik style\"${N}"
  say "${D}Uninstall: curl -fsSL https://raw.githubusercontent.com/$REPO/main/install.sh | bash -s -- uninstall$([ "$SCOPE" = project ] && printf ' --project')${N}"
}

case "$CMD" in
  install) do_install ;;
  uninstall) uninstall_all 0 ;;
  status)
    for sc in global project; do
      if [ "$sc" = global ]; then m="$H/.god-of-design/manifest.tsv"; else m="$BASE/.god-of-design/manifest.tsv"; fi
      if [ -f "$m" ]; then say "$sc: $(head -n 1 "$m" | cut -f2,4,5 | tr '\t' ' ') · $(grep -c '^dir' "$m" || true) skill dirs · $m"; else say "$sc: not installed"; fi
    done ;;
  list) resolve_src; for s in "$SRC"/skills/*/SKILL.md; do basename "$(dirname "$s")"; done ;;
  help) sed -n '2,8p' "${BASH_SOURCE[0]:-/dev/null}" 2>/dev/null | sed 's/^# \{0,1\}//' || true
        say "Docs: https://github.com/$REPO" ;;
esac
