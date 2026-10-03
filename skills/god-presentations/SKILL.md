---
name: god-presentations
description: Presentation and pitch deck design - narrative structures (pitch, sales, keynote, report, training, conference talk), slide layouts and grids, one-idea-per-slide rules, data slides, typography and color for projection, speaker notes, and output as HTML decks (reveal.js, plain HTML/CSS), PowerPoint/Keynote/Google Slides specs or Canva handoff. Use when creating or redesigning slides, decks, keynotes or webinar visuals.
license: MIT
compatibility: Agent Skills standard (Claude Code, Codex, OpenCode, Cursor, Gemini CLI, Antigravity, Copilot)
metadata:
  pack: god-of-design
  version: "1.1.2"
---

# God Presentations

## Procedure

1. **Audience and outcome.** What should they *believe or do* after the last slide? Write that sentence first.
2. **Story spine** (pick one):
   - **Pitch (10–12 slides):** problem → why now → solution → product demo → market size → business model → traction → competition → go-to-market → team → financials/ask.
   - **Sales:** status quo pain → cost of inaction → new way → proof (case study) → offer → next step.
   - **Keynote/talk:** hook story → big idea → 3 supporting points (each: claim, evidence, example) → callback to the hook → call to action.
   - **Report/QBR:** executive summary first (the answer) → KPIs → insights → risks → decisions needed.
   - **Training:** objective → concept → demo → practice → recap → resources.
3. **Write slide titles as assertions** ("Churn fell 32% after onboarding redesign", not "Churn"). Reading only the titles should tell the whole story.
4. **One idea per slide.** ≤ 30 words of on-slide text for talks. Put details in the notes or a leave-behind appendix.
5. **System:** a 16:9 canvas of 1920×1080 (or 1280×720), 12-col grid, safe margins 96px, title zone fixed, 4–6 reusable layouts (title, section, statement, image + text, chart, comparison, quote, team, closing).
6. **Type for projection:** titles 54–72px, body ≥ 28px on 1920 width (≥ 24pt in PowerPoint terms), max 2 typefaces, strong contrast (projectors wash colours out, so prefer dark text on light for bright rooms and light on dark for stages).
7. **Data slides:** one message per chart; highlight the key bar or line in the accent colour and grey out the rest; label directly (no legends if possible); state the takeaway in the title.
8. **Rhythm:** alternate dense and sparse slides, insert full-bleed image or statement slides every 4–6 slides, and use section dividers.

## Layout library (1920×1080)

| Layout | Composition |
|---|---|
| Title | Large title left-aligned on a 7-col span, subtitle, presenter, date; brand device right |
| Statement | One sentence at 96–120px, centred or on 8 cols; nothing else |
| Big number | 240px+ number, label below, source tiny |
| Image + text | Full-bleed image 7 cols, text 5 cols with 96px padding |
| Chart | Assertion title, chart 10 cols, 1-line insight callout |
| Comparison | 2 columns with matching structure; ✓ vs ✕ or before/after |
| Process | 3–5 steps horizontally with numbers; one active step highlighted on build |
| Quote | Large quote marks as a graphic device, quote 56px, attribution with photo |
| Agenda / section | Section number huge (e.g. 01) + section title |
| Closing / CTA | The one action + contact + QR code (≥ 300px) |

## Output options

- **HTML deck:** a single self-contained `deck.html` with `section` per slide, a 16:9 scaled stage, keyboard navigation, print CSS (`@page { size: 1920px 1080px; }`) for PDF export. Or use reveal.js (`<div class="reveal"><div class="slides"><section>…`).
- **PowerPoint / Keynote / Google Slides:** provide a slide-by-slide spec: layout name, title, body, visual, notes, plus theme tokens (fonts, colours, master layouts). If python-pptx is available, generate the `.pptx` (16:9 = 13.333×7.5in).
- **Canva:** create a presentation (1920×1080), apply the brand kit, use autofill/bulk create from the slide spec (see `god-output`).
- **Speaker notes:** 60–120 words per slide, conversational, with timing cues.

## Anti-patterns

Bullet walls, clip art, centred everything, 5 fonts, logo on every slide, "Thank you / Questions?" as the last content slide (end on the CTA instead), unreadable charts, stock photos of handshakes, emoji as icons, gradient-heavy "AI deck" look.
