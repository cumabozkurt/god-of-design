# AGENTS.md: working on the God of Design repository

This file is for AI agents (and humans) **editing this repo**. To *use* the design skills, install them (see README).

## Layout

| Path | What | Edited by hand? |
|---|---|---|
| `skills/<name>/SKILL.md` | 19 Agent Skills (YAML frontmatter + Markdown). **Single source of truth.** | ✅ |
| `skills/<name>/references/` | Long reference material loaded on demand (progressive disclosure) | ✅ |
| `skills/god-styles/references/0[1-4]-*.md` | Style atlas (109 entries) | ✅ |
| `skills/god-styles/references/00-index.md` | Style index | ❌ generated |
| `commands/*.md` | Slash commands (Claude Code, OpenCode) | ✅ |
| `adapters/_core.md` | Canonical short rule text for rule-file tools | ✅ |
| `adapters/<tool>/*`, `dist/*`, `llms.txt`, `catalog.json` | Per-tool adapters, single-file bundles, catalogue | ❌ generated |
| `bin/god-of-design.mjs`, `install.sh`, `install.ps1` | Three installers sharing **one manifest format** | ✅ keep in sync |
| `scripts/build.mjs`, `scripts/validate.mjs` | Generator and validator | ✅ |
| `test/` | node:test suite + standalone bash/pwsh round-trip tests | ✅ |

## Commands

```bash
npm run build          # regenerate index, adapters, dist, llms.txt, catalog.json
npm run validate       # frontmatter, name=dir, description ≤ 500, links, style fields, JSON, script syntax
npm test               # build --check + validate + installer round trips (node, bash, pwsh if present)
bash test/install-sh.test.sh
pwsh -File test/install-ps1.test.ps1
```

## Rules

1. **Never run installers against your real HOME while developing.** Use `GOD_OF_DESIGN_HOME=/tmp/x XDG_CONFIG_HOME=/tmp/x/.config CODEX_HOME=/tmp/x/.codex`.
2. After any content change run `npm run build` and commit the generated files; CI fails on stale output.
3. Skill frontmatter: `name` equals the directory, kebab-case; `description` ≤ 500 chars and says *when* to use it; keep `metadata.pack: god-of-design` (installers use it to recognise their own files) and `metadata.version` equal to `package.json`.
4. Keep `SKILL.md` under ~500 lines; move detail to `references/`.
5. Style entries need every field: ID, Origin, DNA, Palette (hex), Type (real Google Fonts names), Layout, Motifs, Do, Don't, CSS/Tailwind, Prompt. World traditions follow the respectful-use protocol at the top of `04-world-traditions.md`.
6. Only verified facts: tool paths, platform image sizes and font names need an official source in the PR.
7. A change to the install logic must land in **all three** installers, with tests.
8. Zero runtime dependencies.
