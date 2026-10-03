---
name: god-ui-ux
description: Web and product UI/UX design and implementation - landing pages, marketing sites, SaaS apps, dashboards, e-commerce, forms, navigation, component states, UX laws, information architecture, microcopy, responsive behavior and production HTML/CSS/Tailwind/React output. Use when designing or building any website or web app interface, improving UX, or turning a design into front-end code.
license: MIT
compatibility: Agent Skills standard (Claude Code, Codex, OpenCode, Cursor, Gemini CLI, Antigravity, Copilot)
metadata:
  pack: god-of-design
  version: "1.0.0"
---

# God UI/UX

## Procedure

1. **Job and flow.** Write the primary user job ("compare plans and start a trial in < 60 s"). Sketch the flow: entry → key decision → action → confirmation. Remove steps.
2. **Information architecture.** List the content blocks in priority order. Each section answers one question.
3. **Direction + tokens.** Use `god-styles` and `god-tokens`. Define tokens *before* writing components.
4. **Build the components with all states:** default, hover, focus-visible, active, disabled, loading, empty, error, success. Also skeleton and overflow (long text, long Turkish/German words, RTL).
5. **Responsive pass:** 320, 375, 768, 1024, 1440px. Touch targets ≥ 44×44px (WCAG 2.5.8 requires a 24×24 minimum; Apple and Google recommend 44pt/48dp).
6. **Accessibility pass** (`god-accessibility`) and **anti-slop pass** (`god-anti-slop`).
7. **Ship.** Semantic HTML, no layout shift (reserve image sizes), lazy-load below the fold, `prefers-reduced-motion` and `prefers-color-scheme` support.

## UX laws that change decisions

| Law | Implication |
|---|---|
| Hick's law | Fewer choices → faster decisions. One primary CTA per view; group options. |
| Fitts's law | Big, close targets are faster. Put primary actions near the thumb or cursor path. |
| Jakob's law | Users expect conventions: logo top-left → home, cart top-right, underlined links. |
| Miller / chunking | Chunk info (phone numbers, steps, cards of 3–5 items). |
| Doherty threshold | Respond in < 400ms. Use optimistic UI and skeletons. |
| Peak-end rule | Polish the key moment and the ending (success states, receipts). |
| Aesthetic-usability effect | Beautiful feels easier, but it doesn't excuse broken usability. |
| Tesler's law | Complexity has to live somewhere. Absorb it in the system, not in the user. |
| Von Restorff | The different thing gets remembered. Make the CTA distinct, and only the CTA. |
| Serial position | First and last items are remembered. Put key nav at the ends. |

## Page patterns

**Landing page** (in order, adapt freely): nav (logo, 3–5 links, 1 CTA) → hero (specific headline ≤ 10 words + subline + primary CTA + product visual or proof) → social proof (logos/metrics) → problem → solution features (varied layouts) → how it works → testimonials (real names, faces, roles) → pricing → FAQ → final CTA → footer.
Headline formula: a concrete outcome for a specific audience. Avoid "Unlock the power of…", "Revolutionize…", "Seamless…".

**Dashboard:** global nav (left rail) → page title + date range + primary action → KPI row (3–5 metrics with delta and sparkline) → main chart → table with filters → secondary panels. Density: 8pt grid, 13–14px tables, tabular numbers, sticky headers.

**Forms:** single column, labels above fields (never placeholder-only), inline validation on blur, error text that says how to fix, mark *optional* fields rather than required ones, right input types (`email`, `tel`, `inputmode="numeric"`), autocomplete attributes, a primary button that states the action ("Create account", not "Submit").

**E-commerce product page:** gallery (zoom, 4–8 images, video) → title, price, rating → variant pickers with real swatches → stock and delivery estimate → add to cart (sticky on mobile) → trust (returns, secure payment) → details accordion → reviews → related items.

**Navigation:** ≤ 7 top-level items; current page indicated; mobile uses a bottom tab bar (apps) or a full-screen menu with large targets (web); breadcrumbs for deep IA; search for > 50 pages.

## Component recipes

See `references/components.md` for buttons, inputs, cards, modals, toasts, tables, tabs, navbars, pricing tables, empty states and their Tailwind implementations. See `references/microcopy.md` for writing UI text.
