---
name: god-layout
description: Layout, grids and composition - column/modular/baseline grids, spacing scales, visual hierarchy, Gestalt principles, rule of thirds, golden ratio, Z/F reading patterns, whitespace, alignment, rhythm, focal points and responsive layout patterns (CSS Grid/Flexbox). Use when arranging elements on a page, poster, slide or screen, or when a design feels cluttered, unbalanced or flat.
license: MIT
compatibility: Agent Skills standard (Claude Code, Codex, OpenCode, Cursor, Gemini CLI, Antigravity, Copilot)
metadata:
  pack: god-of-design
  version: "1.0.0"
---

# God Layout

## Procedure

1. **One focal point per view.** Decide what is seen first, second and third. Build hierarchy with size, contrast, position, isolation and colour, in roughly that order of strength.
2. **Pick a grid for the medium.**
   - Web: 12 columns (desktop), 8 (tablet), 4 (mobile); gutters 16–32px; max content width 1120–1280px; reading column ≤ 720px.
   - App: 4/8pt spacing grid; margins 16–24px (mobile).
   - Poster/print: modular grid (e.g. 6×8 modules) with baseline grid, margins ≥ 5% of the short side.
   - Slides: 12-col on 1920×1080 with 96–120px safe margins.
   - Social: square/vertical modular grid with platform safe zones (see `god-social-media`).
3. **Use a spacing scale.** `4, 8, 12, 16, 24, 32, 48, 64, 96, 128` (px). Related items sit closer than unrelated ones (proximity). Space *between* sections should be at least 2× the space *within* them.
4. **Align everything.** Every element should share an edge or centre line with something else. Pick left alignment for reading layouts. Centre only short, symmetric compositions.
5. **Create rhythm and tension.** Repeat a module, then break it once on purpose (a large image, an offset quote). Pure uniformity is boring; uncontrolled variety is noise.
6. **Check balance** by squinting or blurring: is the visual weight distributed intentionally (symmetric or asymmetric)?

## Composition toolkit

| Tool | Rule | When |
|---|---|---|
| Rule of thirds | Focal points on the 1/3 intersections | Photos, heroes, posters |
| Golden ratio (1:1.618) | Column splits like 62/38; type scale 1.618 | Editorial, classical |
| Z-pattern | Eye moves top-left → top-right → diagonal → bottom-right | Sparse pages, landing heroes |
| F-pattern | Users scan the left edge and first lines | Text-heavy pages: front-load words |
| Gutenberg diagram | Strong fallow areas top-right/bottom-left | Ads and posters: put the CTA bottom-right |
| Gestalt: proximity, similarity, continuity, closure, figure-ground, common region | Grouping without boxes | Reduce borders and cards |
| Visual weight | Large, dark, saturated, complex and isolated elements weigh more | Balancing asymmetry |
| Negative space | Space is an active element | Luxury, focus, readability |
| Scale contrast | Display:body ≥ 3:1 for drama (posters 8:1+) | Energy |
| Grid breaking | One element crosses the grid deliberately | Interest |

## Responsive patterns (CSS)

```css
/* Intrinsic auto-fit grid: no media queries */
.grid { display:grid; gap: clamp(1rem, 2vw, 2rem);
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr)); }
/* Classic 12-col */
.page { display:grid; grid-template-columns: repeat(12, 1fr); gap: 24px; max-width: 1200px; margin-inline:auto; padding-inline: clamp(16px, 4vw, 48px); }
/* Full-bleed inside a constrained column */
.content { display:grid; grid-template-columns: 1fr min(65ch, 100% - 2rem) 1fr; }
.content > * { grid-column: 2; } .content > .bleed { grid-column: 1 / -1; }
/* Container queries for components */
.card-wrap { container-type: inline-size; }
@container (min-width: 32rem) { .card { grid-template-columns: 1fr 2fr; } }
```

Breakpoints (content-driven, typical): 640, 768, 1024, 1280, 1536px (Tailwind defaults). Design mobile first. Test at 320px wide and at 200% zoom (WCAG 1.4.10 reflow).

## Layout archetypes

- **Hero + proof + features + CTA** (marketing). Vary the feature sections; don't repeat a 3-card row four times.
- **Split screen** (50/50 or 60/40): image vs text, before vs after.
- **Bento** (asymmetric modular tiles).
- **Editorial long-read** (narrow column + full-bleed images + pull quotes).
- **Dashboard** (top KPIs → trends → details; left nav; 8pt density).
- **Poster** (one dominant image or type, a secondary info block, a tertiary small print strip).
- **Masonry / Pinterest** (variable heights; use CSS `columns` or a grid with `masonry` where supported).
