---
name: god-accessibility
description: Accessibility and inclusive design to WCAG 2.2 AA - contrast, keyboard and focus, semantic HTML and ARIA, screen readers, forms, motion and seizure safety, touch targets, reflow/zoom, alt text, captions, cognitive accessibility, RTL and localisation, plus an audit checklist. Use when building or reviewing any interface, document, slide or social graphic for accessibility or legal compliance (EAA, ADA, Section 508).
license: MIT
compatibility: Agent Skills standard (Claude Code, Codex, OpenCode, Cursor, Gemini CLI, Antigravity, Copilot)
metadata:
  pack: god-of-design
  version: "1.1.0"
---

# God Accessibility

Accessibility is a quality bar, not an add-on. The European Accessibility Act has applied since 28 June 2025 to many consumer digital products and services in the EU. It references EN 301 549, which maps to WCAG 2.1 AA (aim for 2.2 AA).

## WCAG 2.2 AA checklist (the high-impact items)

**Perceivable**

- [ ] Text contrast ≥ 4.5:1 (large ≥ 3:1). Non-text UI and focus indicators ≥ 3:1. (1.4.3, 1.4.11)
- [ ] Information is never conveyed by colour alone. (1.4.1)
- [ ] Meaningful images have alt text; decorative ones use `alt=""`. Complex charts get a text summary or a data table. (1.1.1)
- [ ] Video has captions; audio-only has a transcript. (1.2.x)
- [ ] Content reflows at 320 CSS px width with no 2-D scrolling (except tables, maps). (1.4.10)
- [ ] Text spacing can be increased (line-height 1.5, paragraph spacing 2×, letter-spacing 0.12em, word-spacing 0.16em) without loss. (1.4.12)
- [ ] Text resizes to 200%. Use rem units, not fixed-height text containers. (1.4.4)

**Operable**

- [ ] Everything works by keyboard; no keyboard traps; logical tab order. (2.1.1, 2.1.2, 2.4.3)
- [ ] Visible focus indicator (`:focus-visible`, ≥ 2px, ≥ 3:1). Focus is not hidden behind sticky headers. (2.4.7, 2.4.11)
- [ ] Targets ≥ 24×24 CSS px, or enough spacing (2.5.8). Aim for 44px.
- [ ] Dragging has a single-pointer alternative. (2.5.7)
- [ ] No content flashes more than 3 times per second. (2.3.1)
- [ ] Respect `prefers-reduced-motion`. Parallax, auto-playing carousels and big motion can be paused or disabled. (2.2.2, 2.3.3 AAA)
- [ ] Skip link to main content. Descriptive page titles, headings and link text. (2.4.1, 2.4.2, 2.4.4, 2.4.6)

**Understandable**

- [ ] `lang` attribute on `<html>` and on passages in another language. (3.1.1, 3.1.2)
- [ ] Labels and instructions for inputs. Errors identified in text with suggestions. (3.3.1–3.3.3)
- [ ] Consistent navigation and help location. (3.2.3, 3.2.6)
- [ ] No unexpected context changes on focus or input. (3.2.1, 3.2.2)
- [ ] Accessible authentication: no cognitive puzzles without alternatives; allow paste and password managers. (3.3.8)
- [ ] Don't ask users to re-enter info they already provided in the same flow. (3.3.7)

**Robust**

- [ ] Semantic HTML first (`button`, `a`, `nav`, `main`, `h1–h6`, `label`, `table`). ARIA only to fill gaps, following the "No ARIA is better than bad ARIA" rule. (4.1.2)
- [ ] Status messages announced via `role="status"` / `aria-live`. (4.1.3)

## Design-time habits

- Design focus states and error states in the mockup, not later.
- Annotate heading levels, reading order, alt text and landmarks for developers.
- Use real text instead of text baked into images (social graphics: put key text in the caption/alt too).
- Write plain language: aim for grade 8 reading level for public content.
- Inclusive imagery: diverse people represented with dignity; avoid stereotypes.

## Testing

- Automated: axe DevTools / `@axe-core/cli`, Lighthouse, WAVE. These catch roughly 30–40% of issues.
- Manual: keyboard-only pass, screen reader (VoiceOver macOS/iOS, NVDA Windows, TalkBack Android), 200% and 400% zoom, Windows high-contrast/forced-colours mode (`@media (forced-colors: active)`), reduced-motion setting.
- Colour-blindness simulation (Chrome DevTools > Rendering > Emulate vision deficiencies).

## Social and document accessibility

- Social: alt text on every image post (Instagram, X, LinkedIn, Facebook and Bluesky support it), captions burned in *and* as an SRT for video, camelCase hashtags (#GodOfDesign), emoji sparingly and never mid-sentence.
- PDFs/slides: real text, reading order, slide titles, alt text, sufficient contrast, and no information conveyed only by animation.
