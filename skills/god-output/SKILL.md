---
name: god-output
description: Output recipes and handoff - production HTML/CSS, Tailwind, React/Next.js with shadcn/ui, Vue/Svelte notes, SVG graphics, email HTML, rendering HTML/SVG to PNG/PDF (Playwright), image export settings, favicon/OG sets, file naming, and handoff to Figma (variables, auto layout, specs) and Canva (sizes, brand kit, autofill, MCP). Use when turning a design decision into files, choosing an export format, or preparing a design for developers, Figma or Canva.
license: MIT
compatibility: Agent Skills standard (Claude Code, Codex, OpenCode, Cursor, Gemini CLI, Antigravity, Copilot)
metadata:
  pack: god-of-design
  version: "1.1.1"
---

# God Output

## Choose the format

| Need | Best output |
|---|---|
| Website / landing page prototype | Single-file `index.html` with Tailwind (CDN for prototypes, a build step for production) or plain CSS |
| Production React app | React/Next.js components + Tailwind v4 tokens (+ shadcn/ui primitives when the project uses it) |
| Social graphic, poster, slide as an image | HTML/SVG at the exact pixel size → PNG via Playwright |
| Logo, icon, pattern | Hand-written SVG (optimised), plus PNG exports |
| Print document | SVG/PDF (vector), or HTML with Paged.js/WeasyPrint; final CMYK preflight in pro tools |
| Deck | `deck.html` (16:9 sections) or a `.pptx` spec / python-pptx |
| Email | Table-based HTML, inline CSS, 600–640px wide, web-safe font fallbacks |
| Design-tool handoff | Tokens JSON + specs + assets → Figma variables / Canva brand kit |

## HTML/CSS baseline (copy into every page)

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Specific page title · Brand</title>
<meta name="description" content="One specific sentence.">
<meta property="og:image" content="/og.png"><!-- 1200×630 -->
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=...&display=swap" rel="stylesheet">
<style>
  :root { color-scheme: light dark; /* tokens from god-tokens */ }
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; font-family: var(--font-body);
         color: var(--color-text); background: var(--color-bg);
         -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }
  img, svg, video { display: block; max-width: 100%; height: auto; }
  :focus-visible { outline: 2px solid var(--color-focus, currentColor); outline-offset: 2px; }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: .01ms !important;
      transition-duration: .01ms !important; scroll-behavior: auto !important; }
  }
</style>
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<header>…</header><main id="main">…</main><footer>…</footer>
</body></html>
```

Tailwind prototypes: `<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>` plus a `<style type="text/tailwindcss">@theme { … }</style>` block. For production, install `tailwindcss` with the Vite/PostCSS plugin.

## React + shadcn/ui notes

- Map tokens to shadcn's CSS variables (`--background`, `--foreground`, `--primary`, `--primary-foreground`, `--muted`, `--border`, `--ring`, `--radius`) in `globals.css`. Then **restyle**. Default shadcn styling with zero changes is a slop tell.
- Keep components presentational and accept `className`. Use `cva` for variants.
- Use `next/font` (Next.js) to self-host Google Fonts with zero layout shift.

## Render HTML/SVG → PNG/PDF

```bash
npx -y playwright@latest install chromium                    # once
# PNG at an exact size (2x scale by default)
node skills/god-output/scripts/render.mjs poster.html poster.png 1080 1350
# PDF, one page per slide/section
node skills/god-output/scripts/render.mjs deck.html deck.pdf 1920 1080
```

(The script uses Playwright if installed and otherwise prints the manual command.)

## Export settings

| Asset | Format | Settings |
|---|---|---|
| UI images/photos | AVIF/WebP with JPG fallback | Quality 70–82; `srcset` 1x/2x; explicit width/height |
| Graphics with text | PNG-24 or SVG | sRGB |
| Social images | PNG (graphics) / JPG 85–92 (photo) | Exact platform size, sRGB, < 8MB |
| Favicon set | `favicon.svg` + `favicon.ico` (32) + `apple-touch-icon.png` (180) + `icon-192.png` / `icon-512.png` (PWA manifest) | |
| OG image | PNG/JPG 1200×630 | Text ≥ 48px, centred safe area |
| Print | PDF/X-4 or PDF/X-1a | CMYK, bleed, crop marks (pro tool preflight) |
| Video | MP4 H.264 + AAC | 1080p, 30fps, platform bitrate limits |

File naming: `brand_asset_variant_size@scale.ext` → `godofdesign_logo_horizontal_dark@2x.png`.

## Figma handoff

1. Create **Variables** collections: `Primitives` (raw colours, spacing), `Semantic` (roles) with **modes** Light/Dark, mirroring `god-tokens` names.
2. **Text styles** for each type-scale step; **effect styles** for shadows.
3. Components with **auto layout** (padding = spacing tokens), variants for states, and properties for text/icon toggles.
4. Frames at real device sizes, layout grids matching `god-layout`.
5. Annotate: spacing, behaviour, breakpoints, motion specs (duration/easing), accessibility notes (heading levels, focus order, alt text).
6. If a Figma MCP/API is available, read existing variables and components first and reuse them. Never duplicate the system.

## Canva handoff

1. Use **custom dimensions** matching the platform spec (e.g. 1080×1350 px for an IG portrait).
2. Set up a **Brand Kit**: logos (SVG/PNG), colours (hex), fonts (upload brand fonts or choose the closest Canva fonts), plus a brand template.
3. Provide a **content sheet** (CSV: one row per design, columns per text/image field) for Bulk Create or Autofill (Canva Connect API / Canva MCP `autofill-design` with a brand template).
4. Keep text as live text (editable). Avoid flattening into images.
5. If the Canva MCP is connected: search brand templates → get the dataset (field names) → autofill with your content → export PNG/PDF. Always confirm with the user before publishing or sharing anything.
