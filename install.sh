#!/usr/bin/env bash
# God of Design installer for macOS / Linux (bash 3.2+). MIT (c) Cuma Bozkurt
#
#   Install:    curl -fsSL https://raw.githubusercontent.com/cumabozkurt/god-of-design/main/install.sh | bash
#   Uninstall:  curl -fsSL https://raw.githubusercontent.com/cumabozkurt/god-of-design/main/install.sh | bash -s -- uninstall
#   Commands:   install | uninstall | status | list | help
#   Options:    --tool all|every|claude,codex,opencode,antigravity,gemini,cursor,copilot,windsurf,cline
#               --global (default) | --project [--dir PATH]   --dry-run   --force   --no-instructions
#
# Needs only bash, coreutils and (for remote installs) curl or wget plus tar. No git, no Node.
# The manifest format is shared with the Node CLI and install.ps1 (see bin/god-of-design.mjs for the spec).
set -Eeuo pipefail

REPO="cumabozkurt/god-of-design"
REF="${GOD_OF_DESIGN_REF:-main}"
MANAGED="god-of-design:managed"
BSTART="<!-- god-of-design:start -->"
BEND="<!-- god-of-design:end -->"
ALL_TOOLS="claude codex opencode antigravity gemini cursor copilot windsurf cline"
NL=$'\n'
CRLF=$'\r\n'
TAB=$'\t'

CMD="install"; TOOL="all"; SCOPE="global"; BASE="$PWD"; DRY=0; FORCE=0; INSTR=1
H="${GOD_OF_DESIGN_HOME:-$HOME}"
XDG="${XDG_CONFIG_HOME:-$H/.config}"
CODEXH="${CODEX_HOME:-$H/.codex}"

if [ -t 1 ] && [ -z "${NO_COLOR:-}" ]; then
  B=$'\033[1m'; G=$'\033[32m'; Y=$'\033[33m'; R=$'\033[31m'; D=$'\033[2m'; N=$'\033[0m'
else
  B=""; G=""; Y=""; R=""; D=""; N=""
fi
say() { printf '%s\n' "$*"; }
die() { printf '%sError: %s%s\n' "$R" "$*" "$N" >&2; exit 1; }
abspath() { case "$1" in /*) printf '%s' "$1" ;; *) printf '%s/%s' "$PWD" "$1" ;; esac; }

while [ $# -gt 0 ]; do
  case "$1" in
    install|uninstall|remove|status|list|help) CMD="$1" ;;
    --tool|-t) [ $# -ge 2 ] || die "--tool needs a value"; TOOL="$2"; shift ;;
    --tool=*) TOOL="${1#--tool=}" ;;
    --global|-g) SCOPE="global" ;;
    --project|-p) SCOPE="project" ;;
    --dir) [ $# -ge 2 ] || die "--dir needs a value"; BASE="$(abspath "$2")"; shift ;;
    --dir=*) BASE="$(abspath "${1#--dir=}")" ;;
    --dry-run|-n) DRY=1 ;;
    --force|-f) FORCE=1 ;;
    --no-instructions) INSTR=0 ;;
    --help|-h) CMD="help" ;;
    *) die "Unknown option: $1 (try: bash install.sh help)" ;;
  esac
  shift
done
[ "$CMD" = "remove" ] && CMD="uninstall"
BASE="${BASE%/}"; [ -n "$BASE" ] || BASE="/"
[ -d "$BASE" ] || die "Directory not found: $BASE"

if [ "$SCOPE" = "global" ]; then MDIR="$H/.god-of-design"; else MDIR="$BASE/.god-of-design"; fi
MANIFEST="$MDIR/manifest.tsv"

# Validate --tool before touching anything.
TOOLS=""
if [ "$TOOL" != "all" ]; then
  list="$TOOL"; [ "$TOOL" = "every" ] && list="$ALL_TOOLS"
  for t in $(printf '%s' "$list" | tr ',' ' ' | tr '[:upper:]' '[:lower:]'); do
    case " $ALL_TOOLS " in *" $t "*) ;; *) die "Unknown tool \"$t\". Use: $ALL_TOOLS, all, every" ;; esac
    case " $TOOLS " in *" $t "*) ;; *) TOOLS="$TOOLS $t" ;; esac
  done
  [ -n "$TOOLS" ] || die "--tool needs a value"
fi

# ---------- source resolution ----------
SRC=""; TMPD=""
cleanup() { if [ -n "$TMPD" ]; then rm -rf "$TMPD"; fi; }
trap cleanup EXIT
resolve_src() {
  if [ -n "${GOD_OF_DESIGN_SRC:-}" ]; then SRC="$GOD_OF_DESIGN_SRC"; return 0; fi
  local here="${BASH_SOURCE[0]:-}"
  if [ -n "$here" ] && [ -f "$(dirname "$here")/skills/god-of-design/SKILL.md" ]; then
    SRC="$(cd "$(dirname "$here")" && pwd)"; return 0
  fi
  TMPD="$(mktemp -d 2>/dev/null || mktemp -d -t god-of-design)"
  local url="https://codeload.github.com/$REPO/tar.gz/$REF"
  say "${D}Downloading $REPO@$REF ...${N}"
  if command -v curl >/dev/null 2>&1; then curl -fsSL "$url" | tar -xzf - -C "$TMPD"
  elif command -v wget >/dev/null 2>&1; then wget -qO- "$url" | tar -xzf - -C "$TMPD"
  else die "curl or wget is required to download the pack"; fi
  local d
  for d in "$TMPD"/*/; do SRC="${d%/}"; break; done
  [ -n "$SRC" ] && [ -f "$SRC/skills/god-of-design/SKILL.md" ] || die "the download did not contain the skill pack"
}

# ---------- helpers ----------
CREATED="$NL"   # directories created in this run
DONE="$NL"      # destinations already handled
PENDING=""      # manifest lines recorded before the manifest file exists
MANIFEST_OPEN=0
record() {
  if [ "$DRY" = 1 ]; then return 0; fi
  if [ "$MANIFEST_OPEN" = 1 ]; then printf '%s\n' "$1" >> "$MANIFEST"; else PENDING="$PENDING$1$NL"; fi
}
seen() {
  case "$DONE" in *"$NL$1$NL"*) return 0 ;; esac
  DONE="$DONE$1$NL"; return 1
}
is_ours() {
  if [ -d "$1" ]; then
    [ -f "$1/SKILL.md" ] && grep -Eq '^[[:space:]]+pack:[[:space:]]*"?god-of-design"?[[:space:]]*$' "$1/SKILL.md"
  else
    [ -f "$1" ] || return 1
    if grep -q "$MANAGED" "$1"; then return 0; fi
    # Files written by v1.0.0, before the :managed marker existed.
    case "${1##*/}" in god-of-design.md|god-of-design.mdc|god-of-design.instructions.md|GOD-OF-DESIGN.md) return 0 ;; esac
    [ "$(sed -n 2p "$1" | tr -d '\r')" = "# god-of-design" ]
  fi
}
mkdirp() {
  local d="$1" missing="" m
  while [ ! -e "$d" ]; do missing="$d$NL$missing"; d="$(dirname "$d")"; done
  while IFS= read -r m; do
    [ -n "$m" ] || continue
    if [ "$DRY" = 0 ] && [ ! -d "$m" ]; then mkdir "$m"; fi
    case "$CREATED" in *"$NL$m$NL"*) ;; *) CREATED="$CREATED$m$NL"; record "mkdir$TAB$m" ;; esac
  done <<EOF_DIRS
$missing
EOF_DIRS
}
read_file() { # exact file content into $CONTENT (trailing newlines kept)
  CONTENT="$(cat -- "$1"; printf x)"; CONTENT="${CONTENT%x}"
}
nl_of() { # sets $EOL to the file's newline style (not printed: $() would strip it)
  case "$1" in *"$CRLF"*) EOL="$CRLF" ;; *) EOL="$NL" ;; esac
}
remove_block_text() { # $1 text, $2 pad(0|1) -> prints text without our block, original bytes restored
  local text="$1" pad="$2" nl pre rest post
  case "$text" in *"$BSTART"*) ;; *) printf '%s' "$text"; return 0 ;; esac
  pre="${text%%"$BSTART"*}"; rest="${text#*"$BSTART"}"
  case "$rest" in *"$BEND"*) ;; *) printf '%s' "$text"; return 0 ;; esac
  post="${rest#*"$BEND"}"; nl_of "$text"; nl="$EOL"
  case "$post" in "$nl"*) post="${post#"$nl"}" ;; "$NL"*) post="${post#"$NL"}" ;; esac
  case "$pre" in *"$nl") pre="${pre%"$nl"}" ;; esac
  if [ "$pad" = 1 ]; then case "$pre" in *"$nl") pre="${pre%"$nl"}" ;; esac; fi
  printf '%s' "$pre$post"
}
insert_block() { # $1 file, $2 snippet; sets BLOCK_PAD
  local f="$1" snip="$2" text="" nl body out
  if [ -f "$f" ]; then read_file "$f"; text="$CONTENT"; fi
  case "$text" in *"$BSTART"*) text="$(remove_block_text "$text" 0; printf x)"; text="${text%x}" ;; esac
  if [ -n "$text" ]; then nl_of "$text"; nl="$EOL"; else nl="$NL"; fi
  body="$(tr -d '\r' < "$snip" | awk 'NF{p=1} p')"   # drop leading blank lines; $() drops trailing ones
  [ "$nl" = "$NL" ] || body="${body//$NL/$CRLF}"
  out="$BSTART$nl$body$nl$BEND$nl"
  BLOCK_PAD=0
  if [ -n "$text" ]; then
    case "$text" in *"$NL") ;; *) BLOCK_PAD=1; text="$text$nl" ;; esac
    out="$text$nl$out"
  fi
  if [ "$DRY" = 0 ]; then printf '%s' "$out" > "$f"; fi
}

# target <tool> <part> -> prints "destination" or "destination<TAB>adapter"
target() {
  local t="$1" k="$2" P="$BASE"
  if [ "$SCOPE" = "global" ]; then
    case "$t:$k" in
      claude:skills) echo "$H/.claude/skills" ;;
      claude:commands) echo "$H/.claude/commands" ;;
      codex:skills) echo "$H/.agents/skills" ;;
      codex:block) echo "$CODEXH/AGENTS.md${TAB}adapters/codex/AGENTS.snippet.md" ;;
      opencode:skills) echo "$XDG/opencode/skills" ;;
      opencode:commands) echo "$XDG/opencode/commands" ;;
      antigravity:skills) echo "$H/.gemini/config/skills" ;;
      gemini:skills) echo "$H/.gemini/skills" ;;
      cursor:skills) echo "$H/.cursor/skills" ;;
      copilot:skills) echo "$H/.copilot/skills" ;;
      windsurf:block) echo "$H/.codeium/windsurf/memories/global_rules.md${TAB}adapters/windsurf/global_rules.snippet.md" ;;
      windsurf:bundle|cline:bundle) echo "$H/.god-of-design/GOD-OF-DESIGN.md" ;;
      cline:rule) echo "$H/Documents/Cline/Rules/god-of-design.md${TAB}adapters/cline/god-of-design.md" ;;
    esac
  else
    case "$t:$k" in
      claude:skills) echo "$P/.claude/skills" ;;
      claude:commands) echo "$P/.claude/commands" ;;
      codex:skills) echo "$P/.agents/skills" ;;
      codex:block) echo "$P/AGENTS.md${TAB}adapters/codex/AGENTS.snippet.md" ;;
      opencode:skills) echo "$P/.opencode/skills" ;;
      opencode:commands) echo "$P/.opencode/commands" ;;
      antigravity:skills) echo "$P/.agents/skills" ;;
      antigravity:rule) echo "$P/.agents/rules/god-of-design.md${TAB}adapters/antigravity/god-of-design.md" ;;
      gemini:skills) echo "$P/.gemini/skills" ;;
      gemini:block) echo "$P/GEMINI.md${TAB}adapters/gemini/GEMINI.snippet.md" ;;
      cursor:skills) echo "$P/.cursor/skills" ;;
      cursor:rule) echo "$P/.cursor/rules/god-of-design.mdc${TAB}adapters/cursor/god-of-design.mdc" ;;
      copilot:skills) echo "$P/.github/skills" ;;
      copilot:rule) echo "$P/.github/instructions/god-of-design.instructions.md${TAB}adapters/copilot/god-of-design.instructions.md" ;;
      windsurf:rule) echo "$P/.windsurf/rules/god-of-design.md${TAB}adapters/windsurf/god-of-design.md" ;;
      windsurf:bundle|cline:bundle) echo "$P/.god-of-design/GOD-OF-DESIGN.md" ;;
      cline:rule) echo "$P/.clinerules/god-of-design.md${TAB}adapters/cline/god-of-design.md" ;;
    esac
  fi
}

ok_line() { say "  ${G}✓${N} $(printf '%-12s' "$1") $2"; }
do_part() { # tool part
  local t="$1" k="$2" spec dst adp="" n=0 s f e existed
  spec="$(target "$t" "$k")"
  [ -n "$spec" ] || return 0
  dst="${spec%%"$TAB"*}"
  case "$spec" in *"$TAB"*) adp="${spec#*"$TAB"}" ;; esac
  if seen "$dst"; then return 0; fi
  case "$k" in
    skills)
      mkdirp "$dst"
      for s in "$SRC"/skills/*/; do
        s="$(basename "$s")"
        [ -f "$SRC/skills/$s/SKILL.md" ] || continue
        if [ -e "$dst/$s" ] && ! is_ours "$dst/$s" && [ "$FORCE" = 0 ]; then
          say "  ${Y}! skip $dst/$s (exists and is not from god-of-design; use --force)${N}"; continue
        fi
        record "dir$TAB$dst/$s"
        if [ "$DRY" = 0 ]; then
          rm -rf "${dst:?}/${s:?}"; mkdir "$dst/$s"
          cp "$SRC/skills/$s/SKILL.md" "$dst/$s/SKILL.md"   # first: makes partial copies recognisable
          for e in "$SRC/skills/$s"/*; do
            [ "$(basename "$e")" = "SKILL.md" ] || cp -R "$e" "$dst/$s/"
          done
        fi
        n=$((n + 1))
      done
      ok_line "$t" "$n skills -> $dst" ;;
    commands)
      mkdirp "$dst"
      for f in "$SRC"/commands/*.md; do
        s="$(basename "$f")"
        if [ -e "$dst/$s" ] && ! is_ours "$dst/$s" && [ "$FORCE" = 0 ]; then
          say "  ${Y}! skip $dst/$s (exists, not ours)${N}"; continue
        fi
        record "file$TAB$dst/$s"
        if [ "$DRY" = 0 ]; then
          tr -d '\r' < "$f" | awk -v m="# $MANAGED" 'NR==1 && $0=="---" {print; print m; next} {print}' > "$dst/$s"
        fi
        n=$((n + 1))
      done
      ok_line "$t" "$n commands -> $dst" ;;
    rule)
      if [ -e "$dst" ] && ! is_ours "$dst" && [ "$FORCE" = 0 ]; then
        say "  ${Y}! skip $dst (exists, not ours)${N}"; return 0
      fi
      mkdirp "$(dirname "$dst")"; record "file$TAB$dst"
      if [ "$DRY" = 0 ]; then cp "$SRC/$adp" "$dst"; fi
      ok_line "$t" "rule -> $dst" ;;
    block)
      [ "$INSTR" = 1 ] || return 0
      existed=0; if [ -e "$dst" ]; then existed=1; fi
      mkdirp "$(dirname "$dst")"
      insert_block "$dst" "$SRC/$adp"
      if [ "$existed" = 1 ]; then record "block$TAB$dst${TAB}0$TAB$BLOCK_PAD"; else record "block$TAB$dst${TAB}1$TAB$BLOCK_PAD"; fi
      ok_line "$t" "instructions block -> $dst" ;;
    bundle)
      mkdirp "$(dirname "$dst")"; record "file$TAB$dst"
      if [ "$DRY" = 0 ]; then cp "$SRC/dist/GOD-OF-DESIGN.md" "$dst"; fi
      ok_line "$t" "reference bundle -> $dst" ;;
  esac
}

# Skill folders are shared instead of duplicated: Gemini CLI also reads .agents/skills, and Cursor
# and OpenCode also read .agents/skills and .claude/skills. A second copy only adds noise (Gemini
# CLI prints a "Skill conflict detected" warning per skill), so skip it when the plan writes one.
shared_via() { # tool -> prints the tool whose skills folder it can read, if that tool is in the plan
  local t="$1" agents="" claude=""
  case " $TOOLS " in *" codex "*) agents="codex" ;; esac
  if [ -z "$agents" ] && [ "$SCOPE" = "project" ]; then case " $TOOLS " in *" antigravity "*) agents="antigravity" ;; esac; fi
  case " $TOOLS " in *" claude "*) claude="claude" ;; esac
  case "$t" in
    gemini) if [ -n "$agents" ]; then printf '%s' "$agents"; fi ;;
    cursor|opencode) if [ -n "$agents" ]; then printf '%s' "$agents"; elif [ -n "$claude" ]; then printf '%s' "$claude"; fi ;;
  esac
  return 0
}

do_uninstall() { # $1 quiet
  local quiet="${1:-0}" removed=0 kind p created pad text dirs d
  if [ ! -f "$MANIFEST" ]; then
    [ "$quiet" = 1 ] || say "${Y}No $SCOPE installation found ($MANIFEST). Nothing to remove.${N}"
    return 0
  fi
  while IFS="$TAB" read -r kind p created pad; do
    [ -n "${p:-}" ] || continue
    case "$kind" in
      dir|file)
        if [ -e "$p" ] && is_ours "$p"; then
          if [ "$DRY" = 0 ]; then rm -rf "$p"; fi
          removed=$((removed + 1)); [ "$quiet" = 1 ] || say "  ${R}-${N} $p"
        fi ;;
      block)
        if [ -f "$p" ] && grep -qF "$BSTART" "$p"; then
          read_file "$p"
          text="$(remove_block_text "$CONTENT" "${pad:-0}"; printf x)"; text="${text%x}"
          if [ "$DRY" = 0 ]; then
            if [ "${created:-0}" = 1 ] && [ -z "$text" ]; then rm -f "$p"; else printf '%s' "$text" > "$p"; fi
          fi
          removed=$((removed + 1)); [ "$quiet" = 1 ] || say "  ${R}-${N} block in $p"
        fi ;;
    esac
  done < "$MANIFEST"
  if [ "$DRY" = 0 ]; then
    dirs="$( { grep "^mkdir$TAB" "$MANIFEST" || true; } | cut -f2- )"
    rm -f "$MANIFEST"
    dirs="$dirs$NL$MDIR"
    while IFS= read -r d; do
      if [ -n "$d" ] && [ -d "$d" ]; then rmdir "$d" 2>/dev/null || true; fi
    done <<EOF_RM
$(printf '%s\n' "$dirs" | awk '{ print length($0) "\t" $0 }' | sort -rn | cut -f2-)
EOF_RM
  fi
  [ "$quiet" = 1 ] || say "${B}God of Design: removed $removed item(s) ($SCOPE).${N}"
  return 0
}

on_install_error() {
  local rc=$?
  trap - ERR
  printf '%sInstall failed (exit %s). Rolling back...%s\n' "$R" "$rc" "$N" >&2
  do_uninstall 1 || true
  printf '%sRolled back: nothing from God of Design is left behind.%s\n' "$R" "$N" >&2
  exit "$rc"
}

do_install() {
  resolve_src
  local version t k via spec
  version="$(sed -n 's/.*"version": *"\([^"]*\)".*/\1/p' "$SRC/package.json" | head -n 1)"
  if [ -f "$MANIFEST" ]; then
    say "${D}Existing installation found: removing it first (clean upgrade).${N}"
    if [ "$DRY" = 0 ]; then do_uninstall 1; fi
  fi
  say "${B}God of Design v$version -> $SCOPE${N}"
  if [ "$DRY" = 0 ]; then
    trap on_install_error ERR
    mkdirp "$MDIR"
    printf '# god-of-design\tv%s\t%s\t%s\t%s\n%s' "$version" "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "$SCOPE" "$TOOL" "$PENDING" > "$MANIFEST"
    MANIFEST_OPEN=1
  fi
  if [ "$TOOL" = "all" ]; then
    do_part claude skills; do_part claude commands
    do_part codex skills; do_part codex block
    do_part antigravity skills
    if [ "$SCOPE" = "project" ]; then do_part antigravity rule; fi
    do_part opencode commands
  else
    for t in $TOOLS; do
      via="$(shared_via "$t")"
      for k in skills commands rule block bundle; do
        if [ "$k" = "skills" ] && [ -n "$via" ]; then
          spec="$(target "$via" skills)"; ok_line "$t" "skills: reads ${spec%%"$TAB"*} (no duplicate copy)"; continue
        fi
        do_part "$t" "$k"
      done
    done
  fi
  trap - ERR
  if [ "$DRY" = 0 ]; then say "  ${D}manifest: $MANIFEST${N}"; else say "${Y}dry run: nothing was written${N}"; fi
  say ""
  say "Try it: ask your agent ${B}\"design a landing page for an Istanbul ceramics studio in Ottoman Iznik style\"${N}"
  if [ "$SCOPE" = "project" ]; then
    say "${D}Uninstall: curl -fsSL https://raw.githubusercontent.com/$REPO/main/install.sh | bash -s -- uninstall --project${N}"
  else
    say "${D}Uninstall: curl -fsSL https://raw.githubusercontent.com/$REPO/main/install.sh | bash -s -- uninstall${N}"
  fi
}

show_status() {
  local sc m
  for sc in global project; do
    if [ "$sc" = global ]; then m="$H/.god-of-design/manifest.tsv"; else m="$BASE/.god-of-design/manifest.tsv"; fi
    if [ -f "$m" ]; then
      say "$sc: $(head -n 1 "$m" | cut -f2,4,5 | tr '\t' ' ') - $( { grep -c "^dir$TAB" "$m" || true; } ) skill dirs - $m"
    else
      say "$sc: not installed"
    fi
  done
}

case "$CMD" in
  install) do_install ;;
  uninstall) do_uninstall 0 ;;
  status) show_status ;;
  list) resolve_src; for s in "$SRC"/skills/*/SKILL.md; do basename "$(dirname "$s")"; done ;;
  help)
    say "God of Design installer"
    say "Usage: install.sh [install|uninstall|status|list|help] [--tool all|every|<tool,...>]"
    say "                  [--global|--project] [--dir PATH] [--dry-run] [--force] [--no-instructions]"
    say "Tools: $ALL_TOOLS"
    say "Docs:  https://github.com/$REPO" ;;
esac
