# Contributing to God of Design

🇹🇷 [Türkçe](CONTRIBUTING.tr.md)

Thanks for helping make AI-made design less generic. The most valuable contributions are:

1. **New or improved styles** in the atlas, especially under-represented world traditions, written with care.
2. **Sharper anti-slop rules**: a tell you keep seeing in AI output, with a concrete fix.
3. **Verified platform specs** (social sizes change every year) and **tool paths** (agent tools move their folders often).
4. **Installer fixes** for an OS or shell we missed.

## Setup

```bash
git clone https://github.com/cumabozkurt/god-of-design
cd god-of-design
npm test            # Node ≥ 18, no dependencies
npm run test:sh     # install.sh tests
npm run test:ps1    # install.ps1 tests (pwsh)
npm run lint:md     # markdownlint
npm run lint:sh     # ShellCheck (needs shellcheck)
npm run lint:ps1    # PSScriptAnalyzer (pwsh)
npm run check:spell # codespell (pip install codespell)
npm run check:links # external links
```

The GitHub rendering check (no table or code block may scroll sideways) needs Chrome and three packages: `npm i --no-save playwright-core marked github-markdown-css`, then `npm run check:render`.

Test an install without touching your real config:

```bash
# Throwaway home: nothing touches your real config. The subshell keeps your
# environment clean (a global XDG_CONFIG_HOME would also hide e.g. gh config).
(
  export GOD_OF_DESIGN_HOME=/tmp/god-home
  export XDG_CONFIG_HOME=/tmp/god-home/.config CODEX_HOME=/tmp/god-home/.codex
  node bin/god-of-design.mjs install --tool all
  node bin/god-of-design.mjs status
  node bin/god-of-design.mjs uninstall
)
```

## How the repo works

- `skills/` is the **single source of truth**. Everything in `adapters/<tool>/`, `dist/`, `llms.txt`, `catalog.json` and `skills/god-styles/references/00-index.md` is **generated** by `npm run build`. Edit the sources, run the build, and commit both.
- `npm run validate` checks frontmatter, `name` = folder, description ≤ 500 chars, internal links, style-entry fields, JSON manifests, version consistency and script syntax.
- The three installers (`bin/god-of-design.mjs`, `install.sh`, `install.ps1`) share one manifest format, so each can uninstall what another installed. Change all three together; `test/installers.test.mjs` checks every cross pair.

## Adding a style

Add a `###` entry to the right file in `skills/god-styles/references/` (`01-art-movements`, `02-digital-ui`, `03-retro-subcultures`, `04-world-traditions`):

```markdown
### Style Name
- **ID:** `kebab-case-id`
- **Origin:** Place, era, key makers.
- **DNA:** The 1–2 sentence essence.
- **Palette:** `#HEX` name, `#HEX` name, … (4–6 colours)
- **Type:** Real Google Fonts names (`Font Name`), plus a fallback note
- **Layout:** Grid / composition rules.
- **Motifs:** Signature elements.
- **Do:** …
- **Don't:** …
- **CSS/Tailwind:** Concrete implementation hints.
- **Prompt:** `image-generation prompt fragment`
```

For **living cultural traditions**, follow the respectful-use protocol at the top of `04-world-traditions.md`: name the culture precisely, exclude sacred or restricted motifs, and recommend commissioning artists from that community for commercial work.

## Pull requests

- One topic per PR. Use the PR template checklist.
- Back facts (font names, platform sizes, tool paths) with an official source link.
- Update `README.md` **and** `README.tr.md` when user-facing behaviour changes, and add a line to `CHANGELOG.md`.
- By contributing, you agree your work is released under the [MIT License](LICENSE) and that you follow the [Code of Conduct](CODE_OF_CONDUCT.md).
