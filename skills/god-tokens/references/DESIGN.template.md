---
name: "<Product> Design System"
version: "1.0"
direction: "<one-sentence aesthetic direction>"
colors:
  bg: "#FAF6EE"
  surface: "#F1E8D8"
  text: "#1E2235"
  text-muted: "#5B607A"
  accent: "#1F3A93"
  accent-contrast: "#FFFFFF"
  danger: "#B42318"
  success: "#067647"
typography:
  display: { fontFamily: "Cormorant Garamond", weight: 600, tracking: "-0.01em" }
  body:    { fontFamily: "Albert Sans", size: "17px", lineHeight: 1.6 }
  mono:    { fontFamily: "JetBrains Mono" }
  scale: "1.25 modular, base 17px"
spacing: [4, 8, 12, 16, 24, 32, 48, 64, 96]
rounded: { sm: "4px", md: "8px", lg: "16px", full: "9999px" }
shadow:  { sm: "0 1px 2px rgb(30 34 53 / 0.06)", md: "0 4px 16px rgb(30 34 53 / 0.08)" }
motion:  { fast: "150ms", base: "250ms", ease: "cubic-bezier(0.25, 1, 0.5, 1)" }
---

## Overview

<Two or three sentences: what this product is, who it is for, the feeling it must create.>

## Colors

- **Accent (#1F3A93):** the only interactive colour. Links, primary buttons, focus.
- **Text (#1E2235)** on **bg (#FAF6EE)**: 14.6:1. Muted text 5.7:1.
- Never use the accent for large background areas. Never add gradients.

## Typography

- Display serif for headlines only (≥ 32px). Body sans for everything else.
- Sentence case everywhere. No all-caps paragraphs. Labels may be caps with +0.06em tracking.

## Layout

- 12-col grid, max 1200px, gutters 24px. Sections separated by 96px (desktop) / 64px (mobile).

## Components

- Buttons: 44px high, radius md, one primary per view.
- Cards: only for collections; 1px border, no shadow at rest.

## Do

- Use real photography of <subject>.
- Use generous white space; one focal point per section.

## Don't

- No purple gradients, no emoji bullets, no stock "people pointing at laptop" imagery.
- No more than two typefaces.
