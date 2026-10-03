---
name: god-styles
description: Atlas of 100+ design styles with exact palettes, Google Fonts, layout rules, motifs, do/don't, CSS hints and image prompts. Covers art movements (Bauhaus, Swiss, Art Nouveau, Art Deco, Memphis), digital UI (glassmorphism, neumorphism, neo-brutalism, bento), retro (Y2K, vaporwave, cyberpunk) and world traditions (Japanese, Chinese, Korean, Islamic, Ottoman/Turkish, Persian, Indian, African, Latin American, Nordic). Use when the user names a style or needs a direction.
license: MIT
compatibility: Agent Skills standard (Claude Code, Codex, OpenCode, Cursor, Gemini CLI, Antigravity, Copilot)
metadata:
  pack: god-of-design
  version: "1.1.0"
---

# God Styles: The Style Atlas

## How to use

1. **Find the entry.** The index `references/00-index.md` lists every style ID by family. Open only the reference file you need:
   - `references/01-art-movements.md`: Western movements 1850–2000
   - `references/02-digital-ui.md`: interface styles
   - `references/03-retro-subcultures.md`: retro, internet and subculture looks
   - `references/04-world-traditions.md`: world traditions **and the respectful-use protocol**
2. **Translate, don't costume.** Extract the style's *grammar*: grid logic, geometry, colour roles, type behaviour, ornament system. Apply it to the user's real content and medium.
3. **Make it tokens.** Convert the palette and type into roles (`--color-bg`, `--color-ink`, `--color-accent`, `--font-display`, `--font-body`), then build. Fix contrast with `god-color` if the historical palette fails WCAG for text.
4. **Respect the refusals.** Each entry's **Don't** line matters as much as its **Do**.

## Picking a style when none is given

Derive it from the subject's world, not from trends:

| Brief signal | Strong candidates |
|---|---|
| Finance, legal, B2B data | `swiss-international`, `editorial`, `terminal-dense`, `dark-tech`, `scandinavian` |
| Luxury, hospitality, fashion | `art-deco`, `editorial`, `minimalism`, `japanese-wabi-sabi`, `ottoman-tezhip`, `vienna-secession` |
| Kids, education, playful consumer | `memphis`, `claymorphism`, `kawaii`, `mid-century-modern`, `risograph` |
| Culture, music, events | `constructivism`, `psychedelic-60s`, `acid-rave`, `punk-zine`, `polish-poster`, `cuban-poster` |
| Wellness, food, sustainability | `organic-biophilic`, `solarpunk`, `scandinavian`, `japanese-wabi-sabi`, `tactile-grain` |
| Developer tools, AI, SaaS | `dark-tech`, `industrial-mono`, `brutalism-web`, `bento-grid`, `swiss-international` (avoid default `ai-native` clichés) |
| Turkish / Anatolian brand or heritage | `ottoman-iznik`, `ottoman-tezhip`, `turkish-ebru`, `anatolian-kilim`, modernised with `swiss-international` |
| Gaming, entertainment | `cyberpunk`, `synthwave`, `pixel-art`, `anime-manga`, `y2k` |

## Mixing styles

You may fuse at most **two**: one *structural* style (grid and type) plus one *ornamental* style (colour, motif). Examples:

- Swiss grid + İznik palette and tulip line icons → a modern Turkish ceramics e-shop.
- Editorial serif layout + wabi-sabi emptiness → a tea brand.
- Neo-brutalist components + kente colour meanings → a Ghanaian fintech, with credit and local designers.

State the fusion explicitly in your direction sentence.

## Output for a style request

Return:

1. A **direction sentence**.
2. A **token block** (CSS variables) derived from the entry.
3. **Font import** (Google Fonts `<link>` or `@import`).
4. The **artefact** (code, SVG or prompt).
5. Three lines on **what the style refuses**, so later edits stay on-style.
