---
name: god-print
description: Graphic and print design - posters, flyers, brochures, magazines, book covers, business cards, menus, packaging, labels, signage, stationery and certificates - with print production (bleed, trim, safe area, CMYK, Pantone, rich black, DPI, paper sizes ISO A/B and US, folds, PDF/X export) and composition rules for persuasive graphics. Use when creating anything to be printed or any poster/flyer-style graphic.
license: MIT
compatibility: Agent Skills standard (Claude Code, Codex, OpenCode, Cursor, Gemini CLI, Antigravity, Copilot)
metadata:
  pack: god-of-design
  version: "1.1.2"
---

# God Print & Graphic Design

## Procedure

1. **Format and distance.** What size, and from how far is it read? (A poster at 3m needs a headline ≥ 7cm tall, roughly 1cm of letter height per 30–40cm of viewing distance.)
2. **Concept.** One idea, one image, one message. Write the headline before designing.
3. **Hierarchy in three levels:** (1) visual + headline, (2) key info (date, place, offer), (3) small print (URL, logos, legal).
4. **Grid and margins.** Modular grid; margins ≥ 10mm on A4/A3 (≥ 5% of the short side for posters).
5. **Production setup** (below) *before* exporting.
6. **Proof.** Print at 100% scale, or view at the intended size and distance. Check spelling twice (names, dates, Turkish characters).

## Production essentials

| Item | Standard |
|---|---|
| Bleed | 3mm per side (EU) / 0.125in (US). Large format: 5–10mm |
| Safe area (quiet zone) | ≥ 3–5mm inside trim for text and logos |
| Resolution | 300 ppi at final size (photos); 150 ppi is acceptable for large posters viewed far away; billboard 20–50 ppi |
| Colour | CMYK with the printer's profile (EU coated: *PSO Coated v3 / FOGRA51*; uncoated: *PSO Uncoated v3 / FOGRA52*; US: *GRACoL 2013 / CRPC6*). Spot: Pantone (PMS) for brand colours |
| Total ink limit | ~300% coated, ~260% uncoated (ask the printer) |
| Rich black (large areas) | C60 M40 Y40 K100 (cool) or C40 M30 Y20 K100. **Text < 24pt: 100K only** |
| Fonts | Embed or outline. Minimum 6–7pt for legal text; avoid thin weights below 8pt and reversed (white) text below 8pt |
| Export | PDF/X-1a (flattened CMYK) or PDF/X-4 (live transparency, ICC). Crop marks + bleed |
| Lines | ≥ 0.25pt (0.1mm) to print reliably |
| Barcodes/QR | QR ≥ 2×2cm with a quiet zone of 4 modules; test the scan; dark on light |

## Paper sizes

| ISO A | mm | | US | in |
|---|---|---|---|---|
| A0 | 841×1189 | | Letter | 8.5×11 |
| A1 | 594×841 | | Legal | 8.5×14 |
| A2 | 420×594 | | Tabloid / Ledger | 11×17 |
| A3 | 297×420 | | Poster (US) | 18×24, 24×36 |
| A4 | 210×297 | | Postcard (US) | 4×6 |
| A5 | 148×210 | | Business card (US) | 3.5×2 |
| A6 | 105×148 | | | |
| DL (envelope / flyer) | 99×210 (flyer) / 110×220 (envelope) | | | |
| Business card (EU/TR) | 85×55 (also 90×50 / 85×54 ISO 7810) | | | |

At 300 ppi: A4 = 2480×3508 px; A3 = 3508×4961 px; A2 = 4961×7016 px; with 3mm bleed A4 = 2551×3579 px.

## Format playbooks

- **Poster:** one dominant visual (60–70% of the area), headline readable from 3–5m, info block in a consistent corner, small print strip at the bottom. Try type-only posters for culture and events (Swiss, Constructivist, Polish School).
- **Flyer (A5/DL):** front = hook + visual + key info; back = details, map/QR, contact.
- **Tri-fold brochure (A4 → DL):** panel order: cover (right outer) → back cover (middle outer) → flap (left outer, teaser) → inner spread for content. The inner fold-in panel is 2–3mm narrower.
- **Business card:** name (largest), role, 1–2 contact lines, logo; ≥ 3mm safe area; consider a single strong colour on the back; 350–450 gsm; special finishes (letterpress, foil, spot UV) in an attention budget of one.
- **Book cover:** front + spine (pages × paper thickness, e.g. 300 pages × 0.1mm = 30mm on 80gsm offset; ask the printer) + back + flaps if any. The title must read at thumbnail size (Amazon/Kitaptik, about 150px wide).
- **Packaging:** use the dieline from the manufacturer; one face for brand + product + variant; legal info (ingredients, barcode, recycling) on the back/side. Mock up in 3D before printing.
- **Menu:** scan pattern (top-right of spread = golden zone), no currency symbols column-aligned in a price list (it makes prices more prominent), group by course, max ~7 items per section.
- **Certificate / invitation:** symmetrical, a border system (try `ottoman-tezhip`, `art-deco`, `victorian-letterpress`), serif type, a space for signatures/seal.

## Code output for print

- **HTML/CSS → PDF:** `@page { size: A4; margin: 0; bleed: 3mm; marks: crop cross; }` (full support only in Paged.js/Prince/WeasyPrint; browsers ignore bleed and marks). Use `mm` units. Use Paged.js or WeasyPrint for multi-page documents.
- **SVG** for vector posters (`width="297mm" height="420mm" viewBox="0 0 297 420"`).
- Remind the user that a professional preflight (Acrobat Preflight, printer check) is needed for CMYK and PDF/X conformance, because browser PDFs are RGB.
