---
name: god-motion
description: Motion design for interfaces and media - UI micro-interactions, page transitions, scroll-driven effects, easing curves and duration tables, choreography and staggering, Disney's 12 principles for UI, reduced-motion accessibility, and implementation in CSS, View Transitions, Framer Motion/Motion, GSAP, Lottie/Rive, plus social video and kinetic typography. Use when adding animation, transitions, hover effects, loaders or motion graphics.
license: MIT
compatibility: Agent Skills standard (Claude Code, Codex, OpenCode, Cursor, Gemini CLI, Antigravity, Copilot)
metadata:
  pack: god-of-design
  version: "1.1.0"
---

# God Motion

## Principles

1. **Motion must mean something:** orient (where did this come from), give feedback (it worked), show hierarchy (what's important), or add personality (the brand). Otherwise remove it.
2. **Fast by default.** Users wait for motion. Keep UI transitions short.
3. **Ease like physics.** Things enter fast and settle (ease-out), leave fast (ease-in), and move between states with ease-in-out. Never use linear for spatial movement (linear is fine for opacity loops, spinners and progress).
4. **Animate cheap properties:** `transform` and `opacity` (GPU). Avoid animating `width`, `height`, `top` and `box-shadow` on large areas.
5. **Choreograph.** Stagger related items by 20–60ms. A parent leads, then children follow. Shared elements morph between states.
6. **Respect `prefers-reduced-motion`:** replace movement with fades or nothing. Never auto-play large parallax for these users.

## Duration table

| Interaction | Duration | Easing |
|---|---|---|
| Hover/press feedback | 80–150ms | ease-out |
| Small element (toggle, checkbox, tooltip) | 120–200ms | ease-out |
| Medium (dropdown, card expand, toast) | 200–300ms | `cubic-bezier(0.2, 0.8, 0.2, 1)` |
| Large (modal, sheet, page) | 300–450ms | `cubic-bezier(0.32, 0.72, 0, 1)` (iOS-like sheet) |
| Exit | ~70–80% of the enter duration | ease-in |
| Stagger per item | 20–60ms (cap total at ~400ms) | – |
| Ambient/background loops | 6–20s | ease-in-out / linear |

Useful curves: ease-out-quart `cubic-bezier(0.25, 1, 0.5, 1)`, ease-out-expo `cubic-bezier(0.16, 1, 0.3, 1)`, ease-in-out-cubic `cubic-bezier(0.65, 0, 0.35, 1)`. Springs (Motion/Framer): `{ type: "spring", stiffness: 400, damping: 30 }` for snappy UI, `{ stiffness: 120, damping: 20 }` for soft.

## Disney's 12 principles applied to UI (short)

Squash and stretch (buttons on press, slight) · Anticipation (a small pull-back before a big move) · Staging (one thing moves at a time) · Follow-through (overshoot then settle, i.e. springs) · Slow in/out (easing) · Arcs (curved paths for organic movement) · Secondary action (an icon wiggles as the card lands) · Timing (duration = weight) · Exaggeration (for celebration only) · Solid drawing (consistent 3D/perspective) · Appeal (brand personality) · Straight-ahead vs pose-to-pose (keyframes).

## Recipes

```css
/* Enter animation with reduced-motion safety */
@media (prefers-reduced-motion: no-preference) {
  .reveal { animation: rise 450ms cubic-bezier(0.16,1,0.3,1) both; }
  @keyframes rise { from { opacity: 0; transform: translateY(12px); } }
}
/* Scroll-driven (Chromium; progressive enhancement) */
@supports (animation-timeline: view()) {
  .on-scroll { animation: rise linear both;
               animation-timeline: view(); animation-range: entry 0% cover 30%; }
}
/* View Transitions between pages (same-document or cross-document MPA) */
@view-transition { navigation: auto; }
::view-transition-old(root), ::view-transition-new(root) { animation-duration: 250ms; }
```

```jsx
// Motion (formerly Framer Motion) – staggered list
import { motion } from "motion/react";
const list = { show: { transition: { staggerChildren: 0.04 } } };
const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 30 } },
};
<motion.ul variants={list} initial="hidden" animate="show">
  {items.map((i) => <motion.li key={i.id} variants={item}>{i.label}</motion.li>)}
</motion.ul>
```

GSAP: use for complex timelines and scroll storytelling (`gsap.timeline()`, ScrollTrigger). Since the 2025 Webflow acquisition GSAP and its plugins are free, but its licence excludes tools that compete with Webflow. Check the current licence. Lottie/Rive: use for illustrative, designer-made animation (Rive supports interactive state machines). Keep files small (< 100KB Lottie JSON for UI).

## Motion for social / video

- 9:16 at 30fps (60 for smooth UI demos). Hook in the first 1–2 seconds; text on screen ≥ 1.5s per line (reading time ≈ 3 words/second); captions burned in.
- Kinetic type: animate words with meaning (scale on emphasis, not every word). Keep it within the safe zones.
- Loops: make the last frame match the first. Seamless loops raise watch time.
- Export: MP4 H.264 High profile, AAC 128–320kbps, ≤ the platform's maximum bitrate; GIF only when required (< 5MB, 15–24fps).
