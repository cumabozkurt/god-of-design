# AGENTS.md: working on the God of Design repository

This file is for AI agents (and humans) **editing this repo**. To *use* the design skills, install them (see README).

## Layout

Edit by hand unless the row says **generated** (run `npm run build` instead).

| Path | What |
|---|---|
| `skills/<name>/SKILL.md` | 19 Agent Skills. **Single source of truth.** |
| `skills/<name>/references/` | Long reference material, loaded on demand |
| `skills/god-styles/references/` | Style atlas `01`–`04` (109 entries); `00-index.md` is **generated** |
| `commands/*.md` | Slash commands (Claude Code, OpenCode) |
| `adapters/_core.md` | Canonical short rule text for rule-file tools |
| `adapters/<tool>/*`, `dist/*` | **Generated** per-tool rules and single-file bundles |
| `llms.txt`, `catalog.json` | **Generated** index and catalogue |
| `bin/god-of-design.mjs` | Node installer; keep in sync with the two below |
| `install.sh`, `install.ps1` | Shell installers; all three share **one manifest format** |
| `scripts/` | Build, validate, render check, link check, image builders |
| `test/` | node:test suite + standalone bash/PowerShell tests |
| `docs/images/banner.svg` | **Generated** from `banner.src.svg` (text outlined) |
| `examples/*/preview.png` | **Generated** by `scripts/screenshot-example.mjs` |

## Commands

```bash
npm run build          # regenerate index, adapters, dist, llms.txt, catalog.json
npm run validate       # frontmatter + YAML safety, links, anchors, layout, parity, JSON
npm test               # build --check + validate + installer round trips
bash test/install-sh.test.sh
pwsh -File test/install-ps1.test.ps1
npm run check:render   # needs Chrome + npm i --no-save playwright-core marked
```

## Rules

1. **Never run installers against your real HOME while developing.** Set `GOD_OF_DESIGN_HOME=/tmp/x XDG_CONFIG_HOME=/tmp/x/.config CODEX_HOME=/tmp/x/.codex` per command or in a subshell, never globally (a global `XDG_CONFIG_HOME` also hides the config of tools like `gh`).
2. After any content change run `npm run build` and commit the generated files; CI fails on stale output.
3. Skill frontmatter: `name` equals the directory, kebab-case; `description` ≤ 500 chars and says *when* to use it; keep `metadata.pack: god-of-design` (installers use it to recognise their own files) and `metadata.version` equal to `package.json`.
4. Keep `SKILL.md` under ~500 lines; move detail to `references/`.
5. Style entries need every field: ID, Origin, DNA, Palette (hex), Type (real Google Fonts names), Layout, Motifs, Do, Don't, CSS/Tailwind, Prompt. World traditions follow the respectful-use protocol at the top of `04-world-traditions.md`.
6. Only verified facts: tool paths, platform image sizes and font names need an official source in the PR.
7. A change to the install logic must land in **all three** installers, with tests.
8. Zero runtime dependencies.
9. GitHub layout: tables must fit 570 px (no sideways scrolling) and code lines ≤ 95 characters; `npm run validate` estimates it, `npm run check:render` measures it in Chrome.
10. `install.ps1` stays ASCII-only and must not leak anything into the caller's session (`irm | iex`).
