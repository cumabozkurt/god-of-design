# Color Reference

## WCAG contrast math

Relative luminance for an sRGB channel `c` in 0–1:
`c_lin = c <= 0.04045 ? c/12.92 : ((c+0.055)/1.055)^2.4`
`L = 0.2126 R_lin + 0.7152 G_lin + 0.0722 B_lin`
Contrast ratio = `(L1 + 0.05) / (L2 + 0.05)` where L1 is the lighter colour.

| Requirement (WCAG 2.2) | AA | AAA |
|---|---|---|
| Body text | 4.5:1 | 7:1 |
| Large text (≥24px, or ≥18.66px bold) | 3:1 | 4.5:1 |
| UI components, focus indicators, graphical objects | 3:1 | – |

APCA (proposed for WCAG 3) gives a perceptual Lc value. For body text aim for |Lc| ≥ 75, for large headings ≥ 60. Use it as a second opinion. Legal conformance today is still WCAG 2.x.

Handy reference pairs on white `#FFFFFF`:
- `#767676` is the lightest neutral grey that passes 4.5:1 (≈4.54:1).
- `#595959` ≈ 7:1 (AAA).
- Tailwind `slate-500 #64748B` ≈ 4.76:1 passes; `slate-400 #94A3B8` ≈ 2.56:1 fails for text.

## OKLCH quick guide

`oklch(L C H)`: L = lightness 0–1, C = chroma 0–~0.37, H = hue angle.
- Even lightness ramp for 11 steps: L ≈ 0.98, 0.95, 0.90, 0.82, 0.72, 0.62, 0.53, 0.45, 0.38, 0.30, 0.22
- Peak chroma around the 500–600 steps; reduce C by 30–60% at 50 and 950.
- Hue anchors (approx.): red 25, orange 55, amber 75, yellow 95, lime 125, green 145, teal 180, cyan 210, blue 255, indigo 275, violet 295, magenta 330.
- CSS: `color-mix(in oklch, var(--accent) 80%, white)` for tints. `oklch(from var(--accent) calc(l - 0.1) c h)` for relative colours (modern browsers).

## Curated palettes (hex, roles in order: bg, surface, text, muted, accent, accent-2)

| Name | Mood | Palette |
|---|---|---|
| Istanbul Dusk | Turkish heritage, modern | `#FAF6EE` `#F1E8D8` `#1E2235` `#5B607A` `#1F3A93` (İznik cobalt) `#C0392B` (İznik red) |
| Bosphorus | Calm coastal | `#F5F8FA` `#E6EEF3` `#0E2433` `#4A6272` `#0F6E8C` `#F2A541` |
| Swiss Signal | Objective | `#FFFFFF` `#F2F2F2` `#111111` `#5E5E5E` `#E30613` `#111111` |
| Kyoto Moss | Quiet | `#F2EDE4` `#E8E1D3` `#2E2C28` `#6E675C` `#5B7553` `#C2462E` |
| Midnight Studio | Dark premium | `#0B0C0F` `#15171C` `#ECEDEE` `#9BA1A6` `#E5B567` `#6CB4EE` |
| Terracotta Table | Food, warm | `#FBF5EF` `#F3E6D8` `#2B1D14` `#7A5C48` `#C8553D` `#6B8F71` |
| Clinical Trust | Health | `#F7FAFC` `#EDF2F7` `#1A202C` `#4A5568` `#0E7C86` `#2F855A` |
| Fintech Lime | Bold modern | `#0A0A0A` `#141414` `#FAFAFA` `#A1A1AA` `#C6F432` `#7C7CFF` |
| Nordic Clay | Interiors | `#F7F5F2` `#ECE7E1` `#2F3E46` `#6B7A80` `#C9A690` `#4A5859` |
| Kente Bold | Celebratory | `#FFF8E7` `#FFEFC2` `#1A1A1A` `#4D4D4D` `#00843D` `#D21034` (with `#F2C200`) |

## Cultural colour meanings (check your audience)

| Colour | West (EU/US) | Türkiye / Middle East | East Asia | South Asia | Africa (varies widely) | Latin America |
|---|---|---|---|---|---|---|
| Red | Passion, danger, sale | Nation, power, celebration (Turkish flag); bridal henna | Luck, joy, prosperity (China); stocks *up* in China, *down* in the West | Marriage, purity (bridal saris) | Life, sacrifice, mourning (some) | Passion, religion |
| White | Purity, weddings, clean | Purity; also mourning shrouds | **Mourning, death** (China, Japan, Korea) | Mourning, widowhood | Peace, spirituality | Purity |
| Black | Elegance, mourning | Mourning, authority | Formal; can be negative | Evil, inauspicious (some) | Maturity, spirituality | Mourning |
| Green | Nature, go, money | **Islam**, paradise, prosperity | Health; green hats = infidelity (China) | Islam (Pakistan), harvest | Fertility, land | Independence, nature (Mexico) |
| Yellow / Gold | Optimism, caution | Wealth, sun | **Imperial** (China), courage (Japan) | Sacred, knowledge (saffron) | Wealth, status (gold) | Mourning (some), sun |
| Blue | Trust, corporate | Protection (nazar boncuğu, evil eye), heaven | Healing, calm; also cold | Divine (Krishna) | Peace, love | Trust, religion |
| Purple | Royalty, creativity | Luxury | Wealth; mourning (Thailand for widows) | Sorrow (some) | Royalty | Mourning (Brazil) |
| Orange | Energy, discount | Warmth | Happiness | **Sacred** (Hinduism, Buddhism) | – | Día de Muertos marigold |

## Colour-blind-safe sets

- **Okabe–Ito (8):** `#000000` `#E69F00` `#56B4E9` `#009E73` `#F0E442` `#0072B2` `#D55E00` `#CC79A7`
- **Blue/orange diverging** for data: `#2166AC` → `#F7F7F7` → `#B2182B` (or use viridis / cividis ramps for sequential).
- For status, pair colour with icon + text: ✓ Success (green), ! Warning (amber), × Error (red).

## Dark mode role ladder (example, neutral hue 260)

```css
--bg: oklch(0.16 0.01 260);
--surface: oklch(0.20 0.012 260);
--surface-raised: oklch(0.24 0.014 260);
--border: oklch(0.32 0.015 260);
--text: oklch(0.94 0.005 260);
--text-muted: oklch(0.72 0.01 260);
--accent: oklch(0.75 0.14 75);   /* lighter, slightly desaturated vs light mode */
```
