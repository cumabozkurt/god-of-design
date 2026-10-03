---
name: god-typography
description: Typography system design - type scales, font pairing with Google Fonts, measure/leading/tracking rules, hierarchy, variable fonts, OpenType features, web font loading, and multi-script typesetting (Turkish, Arabic/Persian RTL, CJK, Devanagari, Thai, Cyrillic, Greek). Use when choosing fonts, fixing text that looks off, building a type scale, or designing for non-Latin languages.
license: MIT
compatibility: Agent Skills standard (Claude Code, Codex, OpenCode, Cursor, Gemini CLI, Antigravity, Copilot)
metadata:
  pack: god-of-design
  version: "1.1.0"
---

# God Typography

## Procedure

1. **Voice first.** Describe the voice in 3 words (e.g. "precise, calm, Turkish-modern"). Pick a display face that *is* that voice and a text face that disappears into reading.
2. **One or two families.** One superfamily (e.g. `IBM Plex Sans` + `IBM Plex Mono`) or a high-contrast pair (serif display + sans body, or the reverse). Pairs must differ clearly. Two similar sans faces look like a mistake.
3. **Set a modular scale.** Base 16–18px body on screen. Ratio: 1.125 (dense UI), 1.2 (apps), 1.25 (marketing), 1.333 (editorial), 1.5–1.618 (posters). Use fluid sizes with `clamp()`.
4. **Set measure, leading, tracking.**
   - Measure: 45–75 characters (66 is ideal) for body; `max-width: 65ch`.
   - Leading: body 1.5–1.7 (Latin), headings 1.0–1.2, CJK body 1.7–2.0, Arabic 1.6–1.9, Devanagari 1.6–1.8.
   - Tracking: tighten large display (−0.01 to −0.04em), loosen ALL CAPS and small labels (+0.04 to +0.12em). Never letter-space lowercase body text.
5. **Hierarchy with few levers.** Change size *or* weight *or* colour per level, not all three. Usually 3–4 levels are enough.
6. **Check language support.** Every font you pick must contain the glyphs of the content language. For Turkish: `ç ğ ı İ ö ş ü Ç Ğ Ö Ş Ü`, and `text-transform: uppercase` needs `lang="tr"` so i → İ (not I). Test with "İstanbul'da ığdır şehri çiçekleri görüyorüz" or similar.
7. **Load fast.** Load 2–4 files maximum. Use variable fonts, `font-display: swap`, `preconnect` to Google Fonts, `size-adjust` fallbacks to avoid layout shift, and subset where possible.

## Fluid scale example (ratio 1.25, 16→18px body)

```css
:root {
  --step--1: clamp(0.83rem, 0.80rem + 0.15vw, 0.90rem);
  --step-0:  clamp(1.00rem, 0.95rem + 0.25vw, 1.125rem);
  --step-1:  clamp(1.25rem, 1.17rem + 0.40vw, 1.41rem);
  --step-2:  clamp(1.56rem, 1.43rem + 0.65vw, 1.76rem);
  --step-3:  clamp(1.95rem, 1.75rem + 1.00vw, 2.20rem);
  --step-4:  clamp(2.44rem, 2.12rem + 1.60vw, 2.75rem);
  --step-5:  clamp(3.05rem, 2.55rem + 2.50vw, 3.43rem);
}
h1 { font-size: var(--step-5); line-height: 1.05;
     letter-spacing: -0.02em; text-wrap: balance; }
p  { font-size: var(--step-0); line-height: 1.6; max-width: 65ch; text-wrap: pretty; }
```

## Avoid (common tells)

- Inter / Roboto / Arial for everything by default. Choose deliberately; Inter is fine when it is a reasoned choice.
- Centered body paragraphs longer than 3 lines.
- Light weights (≤300) for small text, and grey-on-grey below 4.5:1.
- Faux bold/italic (synthesised). Load the real weights.
- More than 2 typefaces (a mono for code is the allowed third).
- Widows/orphans on headlines. Use `text-wrap: balance`.

See `references/font-pairings.md` (60+ Google Fonts pairings by mood) and `references/multiscript.md` (non-Latin setting rules).
