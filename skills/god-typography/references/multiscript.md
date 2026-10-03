# Multi-script Typesetting

## Turkish (tr)

- Dotted/dotless i: `i ↔ İ`, `ı ↔ I`. Always set `lang="tr"` so CSS `text-transform` and JS `toLocaleUpperCase('tr')` behave. `"istanbul".toUpperCase()` gives "ISTANBUL" (wrong); `toLocaleUpperCase('tr-TR')` gives "İSTANBUL".
- Check fonts render ğ, ş, ı, İ with proper spacing and accents that don't collide with ascenders at tight leading (watch display sizes with `line-height: 0.9`).
- Turkish words are long (agglutinative). Allow `hyphens: auto` with `lang="tr"`, and avoid very narrow columns or fixed-width buttons. Test with "Çekoslovakyalılaştıramadıklarımızdanmışsınız".
- Number format: `1.234.567,89`; dates `03.10.2026` or `3 Ekim 2026`; currency `₺1.250` or `1.250 TL` (both are common; the symbol before or after the number depends on the house style).

## Arabic, Persian, Urdu (RTL)

- `dir="rtl"` on `<html>` or the container, plus `lang="ar"` / `fa` / `ur`. Use CSS logical properties (`margin-inline-start`, `padding-inline-end`, Tailwind `ms-*` `me-*` `ps-*` `pe-*`, `start-*` `end-*`).
- Mirror the layout: navigation, progress, back arrows and chevrons. **Don't mirror**: logos, media play buttons, clocks, numbers, checkmarks, or (usually) charts' time axes.
- Never letter-space Arabic. It breaks joining. For emphasis, use weight, colour or kashida (tatweel) sparingly, not tracking.
- Line-height 1.6–1.9. Arabic needs space for diacritics (tashkeel). Nastaliq (Urdu) needs 2.0–2.4.
- Fonts: Naskh for body (`Noto Naskh Arabic`, `Amiri`, `Scheherazade New`), Kufi for UI/display (`Noto Kufi Arabic`, `Reem Kufi`, `Cairo`, `Tajawal`), Persian `Vazirmatn`, Urdu Nastaliq `Gulzar`, `Noto Nastaliq Urdu`.
- Numerals: Western Arabic (0–9) or Eastern Arabic (٠–٩) / Persian (۰–۹) by market.

## Chinese, Japanese, Korean (CJK)

- Body line-height 1.7–2.0. No italics (use weight or emphasis dots: `text-emphasis: filled dot`). No letter-spacing on body, except Japanese body may use +0.04–0.1em.
- Line-breaking rules (kinsoku): avoid starting a line with 。、」 etc. Use `line-break: strict;` and `word-break: keep-all` for Korean.
- Vertical text: `writing-mode: vertical-rl; text-orientation: mixed;` and use `text-combine-upright: all` for 2-digit numbers.
- Japanese: `font-feature-settings: "palt"` for proportional punctuation in headings. Mix Japanese + Latin with a Latin face first in the stack: `font-family: "Inter", "Noto Sans JP", sans-serif`.
- Simplified (zh-Hans) and Traditional (zh-Hant) need different fonts (SC vs TC). Japanese kanji use different glyph forms. Set `lang` correctly so the right glyphs are picked.
- CJK fonts are large (5–20 MB). Rely on Google Fonts' automatic unicode-range slicing or subset.

## Devanagari & Indic scripts

- Line-height 1.6–1.8 for matras (vowel signs above and below). Don't clip the headline bar (shirorekha) with tight line-height.
- Fonts: `Mukta`, `Hind`, `Tiro Devanagari Hindi`, `Martel`, `Noto Sans Devanagari`; Bengali `Hind Siliguri`; Tamil `Noto Sans Tamil`, `Catamaran`.
- Never letter-space. Conjuncts must shape correctly (test क्ष, त्र, ज्ञ).

## Thai

- No spaces between words. Use `word-break: normal` with ICU line breaking, or insert `<wbr>`. Line-height ≥ 1.6 for stacked vowels and tone marks.
- Loopless modern Thai (`Kanit`, `Prompt`) suits display; looped (`Sarabun`, `Noto Sans Thai Looped`) suits long reading.

## Cyrillic & Greek

- Check that the font has *proper* Cyrillic (not just Russian: Ukrainian і ї є ґ, Serbian/Macedonian italic forms with `lang="sr"`/`mk`, Bulgarian forms with `lang="bg"`).
- Greek: watch accents in all-caps (Greek uppercase drops tonos). Set `lang="el"` so `text-transform: uppercase` handles it.

## Mixed-script lockups

- Match **optical size**, not point size. CJK and Arabic often need 5–15% size adjustment next to Latin.
- Align on a shared baseline or centre line by design, not by default.
- In bilingual layouts, give each language its own colour or weight role, and keep reading order obvious.
