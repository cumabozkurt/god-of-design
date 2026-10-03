---
name: god-color
description: Color theory and palette engineering - harmony schemes, 60-30-10, OKLCH scales, semantic color roles, dark mode, WCAG contrast math, color-blind safety, cultural color meanings, gradients and print vs screen color. Use when choosing, fixing or explaining colors, building a palette from a brand color, or checking contrast.
license: MIT
compatibility: Agent Skills standard (Claude Code, Codex, OpenCode, Cursor, Gemini CLI, Antigravity, Copilot)
metadata:
  pack: god-of-design
  version: "1.0.0"
---

# God Color

## Procedure

1. **Start from meaning, not from a wheel.** What should the colour *do*: signal trust, appetite, energy, calm, heritage? Check cultural meaning for the audience (`references/color-reference.md`, cultural table).
2. **Pick an anchor.** Choose one brand or accent hue. Everything else is neutral or supporting.
3. **Choose a harmony** (see below) and **a proportion**: the 60-30-10 rule (dominant neutral / secondary / accent) is a safe default. Bold styles may use 50-40-10.
4. **Build scales in OKLCH.** Use 11 steps (50–950) per hue with steady lightness steps and slightly reduced chroma at the extremes. OKLCH keeps perceived lightness consistent across hues, unlike HSL.
5. **Assign roles.** Use `bg`, `surface`, `surface-raised`, `border`, `text`, `text-muted`, `accent`, `accent-contrast`, `success`, `warning`, `danger`, `info`, `focus`. Components use roles, never raw hex.
6. **Check contrast.** Text ≥ 4.5:1 (large text ≥ 18.66px bold / 24px regular: ≥ 3:1). UI components and graphics ≥ 3:1 (WCAG 1.4.3, 1.4.11). Use the formula in the reference, or run `node scripts/contrast.mjs <fg> <bg>` (path relative to this skill folder).
7. **Design dark mode separately.** Don't just invert. Use dark grey surfaces (`oklch(0.18–0.22 …)`), lighter surfaces for elevation, desaturated accents, and off-white text (`oklch(0.93 0 0)`).
8. **Test colour-blind safety.** Never encode meaning by hue alone. Add icons, labels or patterns. Avoid pairing red and green as the only cue.

## Harmony schemes

| Scheme | Construction | Feel | Use |
|---|---|---|---|
| Monochromatic | One hue, varied L/C | Calm, premium | Minimal brands, dashboards |
| Analogous | 3 neighbours (±30°) | Harmonious, natural | Wellness, food |
| Complementary | Opposite (180°) | Vibrant, high tension | CTAs, sports, posters |
| Split-complementary | Base + two neighbours of its complement | Lively but balanced | Marketing sites |
| Triadic | 3 at 120° | Playful, bold | Kids, Bauhaus, Memphis |
| Tetradic / square | 4 at 90° | Rich, hard to balance | Illustration |
| Neutral + one accent | Greys + single hue | Modern, focused | SaaS, Swiss, editorial |

## Fast palette recipe (from one brand hex)

```text
accent      = brand hex (check L between 0.45 and 0.65 in OKLCH for text-on-white or white-on-accent)
bg          = oklch(0.985 0.005 <brand hue>)      # tinted off-white
surface     = oklch(0.97 0.007 <hue>)
border      = oklch(0.90 0.01 <hue>)
text        = oklch(0.22 0.02 <hue>)              # tinted near-black, never pure #000 on pure #fff for long reading
text-muted  = oklch(0.48 0.02 <hue>)              # must still hit 4.5:1 on bg
accent-contrast = white or text, whichever passes 4.5:1 on accent
```

## Gradients that don't look generic

- Interpolate in OKLCH (`linear-gradient(in oklch, …)`) to avoid muddy middles.
- Use **close hues** (≤ 60° apart) or **one hue + neutral**. Default purple→blue→pink reads as AI slop.
- Add 2–4% noise to prevent banding on large areas.

## Screen vs print

- Screen: sRGB by default. Display-P3 for vivid accents via `color(display-p3 …)` with an sRGB fallback.
- Print: CMYK conversion shifts saturated RGB (especially greens, blues and oranges). Specify Pantone/CMYK for brand colours. Rich black for large areas `C60 M40 Y40 K100`; body text 100K only. See `god-print`.

See `references/color-reference.md` for contrast math, OKLCH ramps, curated palettes, cultural colour meanings and colour-blind-safe sets.
