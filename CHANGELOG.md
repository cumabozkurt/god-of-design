# Changelog

All notable changes are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses [Semantic Versioning](https://semver.org/).

## [1.0.0] - 2026-10-03

### Added
- **19 Agent Skills**: `god-of-design` (router + 5-step workflow), `god-styles`, `god-color`, `god-typography`, `god-layout`, `god-ui-ux`, `god-mobile`, `god-tokens`, `god-accessibility`, `god-social-media`, `god-print`, `god-branding`, `god-presentations`, `god-motion`, `god-dataviz`, `god-imagegen`, `god-anti-slop`, `god-review`, `god-output`.
- **Style atlas with 109 styles** in 4 families: art movements (24), digital & UI (22), retro & subcultures (18), world traditions (45, with a respectful-use protocol). Each entry has a hex palette, Google Fonts, layout, motifs, do/don't, CSS/Tailwind hints and an image-gen prompt.
- References: 60 Google Fonts pairings, multi-script typography, color reference, component specs, microcopy, social platform specs, content patterns, image prompt library, DESIGN.md template.
- Scripts: `contrast.mjs` (WCAG contrast checker), `render.mjs` (Playwright HTML → PNG/PDF).
- 7 slash commands: `/god-design`, `/god-directions`, `/god-audit`, `/god-polish`, `/god-style`, `/god-social`, `/god-export-tokens`.
- Adapters for Cursor, Windsurf, Cline, Copilot, Antigravity rules, Codex AGENTS.md and Gemini GEMINI.md, plus single-file `dist/GOD-OF-DESIGN.md`, `dist/GOD-OF-DESIGN-LITE.md` and `llms.txt` for any LLM.
- Installers: `install.sh`, `install.ps1` and a zero-dependency Node CLI (`npx github:cumabozkurt/god-of-design`) with `--tool`, `--global/--project`, `--dry-run`, `--force` and manifest-based uninstall.
- Claude Code plugin marketplace (`.claude-plugin/`), Codex plugin manifest (`.codex-plugin/`) and Gemini CLI extension manifest.
- CI on Linux, macOS and Windows: build check, validator and installer round-trip tests.
- Research: benchmark of 52 related open-source repos (EN + TR).
