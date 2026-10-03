---
name: god-tokens
description: Design tokens and design-system plumbing - W3C DTCG token JSON, primitive vs semantic vs component tokens, CSS custom properties, Tailwind v4 @theme, dark/brand theming, DESIGN.md files for coding agents, Style Dictionary and Figma variables mapping. Use when creating a design system, theming an app, exporting tokens, writing DESIGN.md, or syncing design and code.
license: MIT
compatibility: Agent Skills standard (Claude Code, Codex, OpenCode, Cursor, Gemini CLI, Antigravity, Copilot)
metadata:
  pack: god-of-design
  version: "1.1.1"
---

# God Tokens

## Three tiers

1. **Primitive** (raw values): `color.blue.600 = oklch(0.55 0.2 255)`, `space.4 = 16px`.
2. **Semantic** (roles): `color.accent = {color.blue.600}`, `color.text.muted`, `space.section`. Components consume these.
3. **Component** (optional): `button.primary.bg = {color.accent}`.

Theme switching (dark, brand B, high contrast) remaps **semantic** tokens only.

## DTCG JSON (W3C Design Tokens Community Group format)

```json
{
  "color": {
    "$type": "color",
    "cobalt": { "600": { "$value": "#1F3A93" } },
    "ink":    { "900": { "$value": "#1E2235" } },
    "paper":  { "50":  { "$value": "#FAF6EE" } },
    "accent": {
      "$value": "{color.cobalt.600}",
      "$description": "Primary interactive colour (İznik cobalt)"
    },
    "text":   { "$value": "{color.ink.900}" },
    "bg":     { "$value": "{color.paper.50}" }
  },
  "font": {
    "display": { "$type": "fontFamily", "$value": ["Cormorant Garamond", "Georgia", "serif"] },
    "body":    { "$type": "fontFamily", "$value": ["Albert Sans", "system-ui", "sans-serif"] }
  },
  "space": {
    "$type": "dimension",
    "1": { "$value": "4px" }, "2": { "$value": "8px" },
    "4": { "$value": "16px" }, "8": { "$value": "32px" }
  },
  "radius": { "$type": "dimension", "md": { "$value": "8px" }, "lg": { "$value": "16px" } },
  "duration": {
    "$type": "duration", "fast": { "$value": "150ms" }, "base": { "$value": "250ms" }
  }
}
```

(DTCG 2025 also allows structured colour and dimension objects. Plain strings are the most widely supported by tools today.)

## CSS variables + Tailwind v4

```css
@import "tailwindcss";
@theme {
  --color-bg: #FAF6EE;
  --color-surface: #F1E8D8;
  --color-text: #1E2235;
  --color-text-muted: #5B607A;
  --color-accent: #1F3A93;
  --color-accent-contrast: #FFFFFF;
  --font-display: "Cormorant Garamond", Georgia, serif;
  --font-body: "Albert Sans", system-ui, sans-serif;
  --radius-md: 8px;
  --radius-lg: 16px;
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #12131A; --color-surface: #1B1D27;
    --color-text: #ECEAF2; --color-text-muted: #A5A8BC;
    --color-accent: #8FA8FF; --color-accent-contrast: #0B0C12;
  }
}
```

This generates utilities like `bg-bg`, `text-text-muted`, `bg-accent`, `font-display` and `rounded-lg`.

Tailwind v3 equivalent: `theme.extend.colors.accent = 'var(--color-accent)'` in `tailwind.config.js`.

## DESIGN.md (for coding agents)

Put a `DESIGN.md` in the project root so every agent builds on-style. Use the template in `references/DESIGN.template.md`: YAML front matter tokens + prose rationale (the google-labs-code/design.md format). Keep it under ~300 lines. Include **Do / Don't** and component rules.

## Mapping to tools

- **Figma Variables:** collections Primitives / Semantic, modes Light / Dark. Export with the Figma REST API or plugins (Tokens Studio) into DTCG JSON.
- **Style Dictionary v4+** reads DTCG and outputs CSS, SCSS, iOS Swift, Android XML and Compose.
- **Naming:** `category.role.variant.state` (e.g. `color.text.muted`, `color.button.primary.bg.hover`). Use kebab-case in CSS: `--color-button-primary-bg-hover`.

## Checklist

- [ ] No raw hex in components; only semantic tokens.
- [ ] Every text/background semantic pair passes contrast in every theme.
- [ ] Spacing, radius, shadow and motion scales are tokenised.
- [ ] Tokens are documented with `$description`.
- [ ] One source of truth (JSON) generates all platform outputs.
