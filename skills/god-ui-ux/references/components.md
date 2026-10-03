# Component Recipes (Tailwind v4 + CSS variables)

Assume tokens from `god-tokens` (`--color-*`, `--radius-*`, `--shadow-*`). Every interactive element needs a visible `:focus-visible` style.

## Button

```html
<button class="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-[var(--radius-md)]
  bg-[var(--color-accent)] text-[var(--color-accent-contrast)] font-medium
  transition-[transform,background-color] duration-150 ease-out
  hover:bg-[color-mix(in_oklch,var(--color-accent)_88%,black)]
  active:scale-[0.98]
  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]
  disabled:opacity-50 disabled:pointer-events-none">
  Start free trial
</button>
```
Hierarchy: **primary** (filled, one per view) → **secondary** (outline or tonal) → **tertiary** (text). Destructive = danger colour plus confirmation. Loading: keep the width, swap the label for a spinner + "Saving…", and set `aria-busy="true"`.

## Text input

```html
<label for="email" class="block text-sm font-medium text-[var(--color-text)]">Email</label>
<input id="email" type="email" autocomplete="email" required aria-describedby="email-hint email-err"
  class="mt-1.5 block w-full h-11 px-3 rounded-[var(--radius-md)] bg-[var(--color-surface)]
  border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]
  focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] focus:border-transparent
  aria-[invalid=true]:border-[var(--color-danger)]">
<p id="email-hint" class="mt-1 text-sm text-[var(--color-text-muted)]">We'll send a confirmation link.</p>
<p id="email-err" class="mt-1 text-sm text-[var(--color-danger)]" hidden>Enter an email like name@example.com</p>
```

## Card (only when grouping is needed)

Use cards for *collections of comparable items*. Otherwise use whitespace and type for grouping. Never nest cards in cards.
```html
<article class="group relative rounded-[var(--radius-lg)] bg-[var(--color-surface)] p-6 ring-1 ring-[var(--color-border)]
  transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]">
  <h3 class="text-lg font-semibold"><a href="/x" class="after:absolute after:inset-0">Title</a></h3>
  <p class="mt-2 text-[var(--color-text-muted)]">One specific sentence of value.</p>
</article>
```

## Modal / dialog

Use the native `<dialog>` with `showModal()` for a focus trap and Esc to close. Return focus to the trigger on close. Title via `aria-labelledby`. Max width 480–640px. Primary action on the right (LTR). Don't stack modals.

## Toast

`role="status"` (polite) for info/success, `role="alert"` for errors. Auto-dismiss ≥ 5s and pause on hover/focus; errors persist. Bottom-centre (mobile) or bottom-right (desktop).

## Table

Left-align text, right-align numbers (`tabular-nums`), sticky header, zebra or row hover (not both), 44px+ rows for touch, column sorting with `aria-sort`, responsive: horizontal scroll with a shadow cue, or a card list below 640px.

## Tabs

`role="tablist"` / `tab` / `tabpanel`, arrow-key navigation, selected indicator (underline 2px or a filled pill). Tabs switch views. They don't navigate pages.

## Navbar

Height 56–72px, logo left, links centre or right, a single primary CTA, a sticky header that shrinks on scroll (optional). Mobile: a menu button with `aria-expanded` and a full-screen sheet with 48px rows.

## Pricing table

2–4 tiers, recommended tier highlighted (border + label, not just colour), monthly/yearly toggle with the savings stated, features as ✓ rows with plain language, the price in the largest type, a CTA per tier, and an enterprise "Contact us".

## Empty state

Illustration or icon (optional, on-style) + what this area is for + one primary action + a help link. Never just "No data".

## Skeletons and loading

Match the final layout, use a shimmer ≤ 1.5s cycle (disable it with reduced motion), and show real content progressively. For > 10s operations, show a progress percentage or steps.
