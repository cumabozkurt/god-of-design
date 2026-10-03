---
description: Export the current design system as DTCG tokens, CSS variables, Tailwind v4 theme and DESIGN.md
argument-hint: '[path to existing styles or brand description]'
---
Use `god-tokens` to extract or define the design system from: $ARGUMENTS

Output four artefacts: `tokens.json` (W3C DTCG format), `tokens.css` (custom properties, light and dark), a Tailwind v4 `@theme` block, and a `DESIGN.md` based on the template. Verify every text/background pair with WCAG contrast and list the ratios.
