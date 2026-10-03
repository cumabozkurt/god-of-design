---
name: god-review
description: Structured design critique and quality audit - a 10-dimension scored rubric (concept, hierarchy, layout, typography, color, imagery, consistency, usability, accessibility, craft/polish), screenshot or code review workflow, prioritized fix lists, and medium-specific checklists for web, mobile, social, print, branding and slides. Use when asked to review, critique, audit, grade or improve an existing design, mockup, screenshot, URL or front-end code.
license: MIT
compatibility: Agent Skills standard (Claude Code, Codex, OpenCode, Cursor, Gemini CLI, Antigravity, Copilot)
metadata:
  pack: god-of-design
  version: "1.0.0"
---

# God Review: Design Critique

## Workflow

1. **Understand intent.** What is it, who is it for, what is its single job? If unknown, infer and state your assumption.
2. **Look like a user, then like a designer.** First impression in 5 seconds (what do you notice, what do you understand?), then a systematic pass.
3. **Score** each dimension 0–10 with one-line evidence.
4. **Prioritise fixes:** P0 (broken: usability, accessibility, legal), P1 (strong quality gains), P2 (polish). Give each fix as an exact change (value, token, code), not advice.
5. **Optionally apply** the fixes if you have file access and the user wants it. Re-score after.

## Rubric (0–10 each, total /100)

| # | Dimension | 9–10 looks like |
|---|---|---|
| 1 | Concept & direction | Clear, ownable idea rooted in the subject; consistent everywhere |
| 2 | Hierarchy | Obvious first/second/third read; the primary action is unmistakable |
| 3 | Layout & spacing | Grid-aligned, a consistent spacing scale, rhythm with deliberate breaks |
| 4 | Typography | Deliberate fonts, a modular scale, good measure/leading, correct language support |
| 5 | Colour | Purposeful palette, one accent, semantic roles, harmony |
| 6 | Imagery & iconography | Specific, high quality, a consistent style, no generic stock or emoji |
| 7 | Consistency & system | Tokens, reusable components, the same patterns for the same things |
| 8 | Usability & UX | Clear flows, conventions respected, all states designed, fast |
| 9 | Accessibility | WCAG 2.2 AA met: contrast, focus, semantics, motion, alt text |
| 10 | Craft & polish | Optical alignment, concentric radii, crisp assets, no orphans, real copy |

Bands: 90+ exceptional · 75–89 strong, ship with tweaks · 60–74 decent but generic · < 60 rework the direction.

## Output format

```markdown
## Design review: <name>  ·  Score: 72/100 (decent but generic)
**Intent (assumed):** …
**5-second read:** …

| Dimension | Score | Evidence |
|---|---|---|
| Concept | 6 | Reads as a generic SaaS template; nothing from the tea-ceremony subject |
…

### P0: must fix
1. Body text #9CA3AF on #FFFFFF = 2.5:1 → use #4B5563 (7.6:1).
### P1: high impact
1. Replace the 3 identical feature cards with a split layout: image left, 3 numbered steps right (real sequence).
### P2: polish
1. Inner radius 16px inside a 16px card with 16px padding → inner radius 0–4px (concentric).
```

## Medium checklists

- **Web/app:** responsive 320→1440, focus states, form errors, empty/loading states, performance (LCP < 2.5s, CLS < 0.1, INP < 200ms), SEO basics (title, meta description, OG image 1200×630, semantic headings).
- **Social:** exact platform size, safe zones, legible at 30% scale, ≤ 25 words/frame, brand consistency across the series, alt text and captions.
- **Print:** bleed/safe area, CMYK, 300ppi, rich black only for large areas, fonts outlined/embedded, spelling of names and dates, QR tested.
- **Branding:** works at 16px and in 1 colour, distinct from competitors, construction consistent, a full lockup set, trademark sanity check.
- **Slides:** assertion titles, one idea per slide, ≥ 28px body at 1920 width, charts with highlighted takeaways, consistent layouts.
- **Image generation:** anatomy, hands, text artefacts, style consistency, licence/ethics.

Always run `god-anti-slop`'s slop gate as part of the review.
