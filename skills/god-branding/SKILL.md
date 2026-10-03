---
name: god-branding
description: Logo design and brand identity systems - brand strategy (positioning, personality, voice), logo types (wordmark, lettermark, symbol, combination, emblem, mascot), geometric construction, SVG logo production, responsive logo suites, color/type systems, brand applications, trademark hygiene and complete brand guidelines documents. Use when creating or refreshing a logo, visual identity, brand kit or brand book.
license: MIT
compatibility: Agent Skills standard (Claude Code, Codex, OpenCode, Cursor, Gemini CLI, Antigravity, Copilot)
metadata:
  pack: god-of-design
  version: "1.1.1"
---

# God Branding & Logo

## Procedure

1. **Strategy (one page):** purpose, audience, positioning ("For X who Y, Brand is the Z that W"), 3–5 personality traits, competitors' visual codes (so you can differ), name meaning and story, and the cultural context of the markets.
2. **Concept exploration:** 3 distinct routes. Each route = a concept sentence + a mark sketch + type + colour. For example: (A) heritage: a tezhip-inspired monogram; (B) modern: a Swiss wordmark with a cut detail; (C) playful: a kinetic symbol.
3. **Choose a logo type:**
   - Wordmark (Google, Supreme): when the name is short, distinctive and pronounceable.
   - Lettermark/monogram (IBM, LV): long names, heritage feel.
   - Symbol/pictorial (Apple): once you have recognition or a strong metaphor.
   - Abstract mark (Nike): ownable, needs investment.
   - Combination (symbol + wordmark): the default for new brands.
   - Emblem (badges, seals): crafts, food, universities.
   - Mascot: community and kids brands.
4. **Construct.** Build on a grid with circles and modular units. Optical corrections: round shapes overshoot the baseline by ~1–3%, verticals are slightly thicker than horizontals, and the visual centre sits slightly above the geometric centre.
5. **Test:** 16px favicon, 1-colour (black/white), reversed, on photos, embroidered/engraved (no fine detail), at a distance; "squint test"; similarity check against existing marks (trademark search: TÜRKPATENT, EUIPO, USPTO, WIPO Global Brand Database).
6. **System:** primary logo, horizontal/stacked lockups, symbol only, clear space (e.g. = cap height), minimum sizes (digital 24px, print 10mm), colour palette (with HEX/RGB/CMYK/Pantone), typography, imagery style, iconography, graphic devices, voice and tone, application mockups.
7. **Deliverables:** SVG (master), PDF/EPS (print), PNG at 1x/2x/4x with transparency, favicon set (ICO + 32/180/192/512 PNG + SVG), social avatars, and a brand guidelines document.

## SVG logo rules

- `viewBox` tight to the artwork; no transforms left over; integer or 0.5 coordinates where possible.
- Convert text to paths for the final logo (and keep the editable source with font names).
- Use `currentColor` for single-colour versions so CSS can recolour them.
- Accessible inline SVG: `<svg role="img" aria-labelledby="t"><title id="t">Brand name</title>…</svg>`.
- Optimise with SVGO and keep the file under ~5KB for simple marks.

Example monogram scaffold (geometric):

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-labelledby="t">
  <title id="t">GD monogram</title>
  <rect width="120" height="120" rx="28" fill="#1F3A93"/>
  <path d="M60 26a34 34 0 1 0 34 34H64" fill="none"
        stroke="#FAF6EE" stroke-width="12" stroke-linecap="square"/>
  <circle cx="60" cy="60" r="6" fill="#C0392B"/>
</svg>
```

## Brand guidelines document outline

1. Brand story and strategy · 2. Logo (versions, construction, clear space, min size, misuse ✕ examples) · 3. Colour (primary/secondary/neutral, ratios, codes, accessibility pairs) · 4. Typography (families, hierarchy, licences) · 5. Imagery (photo style, illustration style, do/don't) · 6. Iconography · 7. Graphic devices and patterns · 8. Voice and tone (with examples) · 9. Applications (cards, social, web, signage, merch, email signature) · 10. Downloads and contacts.

Output as a multi-page HTML (print to PDF) or a slide deck, using the brand's own system.

## Ethics and legal

- Don't imitate existing trademarks or famous logos closely. Run a basic visual search.
- Fonts in logos must allow logo use (OFL fonts like most Google Fonts do; check commercial EULAs).
- Cultural symbols in logos (crescents, crosses, sacred geometry, national emblems): check legal restrictions (e.g. Paris Convention Article 6ter protects state emblems) and cultural meaning.
