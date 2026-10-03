---
name: god-anti-slop
description: Detect and eliminate generic "AI slop" in design and copy - the visual, typographic, layout, color, iconography, imagery, motion and copywriting tells that make output look machine-made and templated - with a concrete fix for each and a pre-delivery slop gate. Use on every design before handing it over, or when the user says the result looks generic, boring, templated or AI-generated.
license: MIT
compatibility: Agent Skills standard (Claude Code, Codex, OpenCode, Cursor, Gemini CLI, Antigravity, Copilot)
metadata:
  pack: god-of-design
  version: "1.1.0"
---

# God Anti-Slop

AI output drifts toward the average of its training data. The average is generic. These tells come from reviewing many generated UIs and the anti-slop work of the community (see `docs/research/benchmark-50-repos.md`). Each one comes with its fix.

## The tells and the fixes

### Colour

| Tell | Fix |
|---|---|
| Purple→blue (or purple→pink) gradient hero | Derive the accent from the subject's world; use a single hue, or a gradient with close hues |
| Gradient text on headlines | Solid ink; emphasis through size, weight or a single rule |
| Neon glow everywhere on dark mode | Glow only on the focal element, if at all |
| Pure #000 on pure #FFF for long text | Tinted near-black on off-white (see `god-color`) |
| Grey text on coloured backgrounds (low contrast) | Use a tint of the background colour or white/ink at ≥ 4.5:1 |
| Random rainbow of accent colours | One accent + semantic colours only |

### Typography

| Tell | Fix |
|---|---|
| Inter/Roboto/Poppins by default for everything | Pick fonts for the voice (see `god-typography` pairings) |
| One word in the headline coloured or italic for "emphasis" | Let the sentence do the work; emphasis only when it carries meaning |
| Tiny all-caps "eyebrow" labels above every heading | Use only where they add information (section numbers, categories) |
| Centered paragraphs | Left-align body text |
| Headline clichés: "Unlock", "Elevate", "Supercharge", "Revolutionize", "Seamless", "Next-gen", "Your all-in-one…" | Concrete outcome + audience + proof ("Close your books in 2 days, not 10") |

### Layout

| Tell | Fix |
|---|---|
| Hero → 3 identical icon cards → 3 identical cards → CTA | Vary section structure: split, bento, list, big quote, data, image-led |
| Cards inside cards; borders on everything | Group with spacing and type; one container level |
| Everything centred, symmetric, same spacing | Asymmetric grid, scale contrast, one deliberate grid break |
| Fake numbered markers (01/02/03) on non-sequential content | Numbers only for real sequences |
| Big stat + tiny label + gradient as the default hero | Open with the most characteristic thing in the subject's world |
| Uniform 16px radius on every element | Radius scale tied to element size (concentric corners: inner = outer − padding) |
| Floating blurred blobs behind every section | One background idea, used deliberately |

### Iconography & imagery

| Tell | Fix |
|---|---|
| ✨ sparkle icon as "AI" identity; 🚀 rocket for "launch" | Custom or meaningful iconography; drop emoji from UI |
| Rounded-square icon tile above every heading | Icons inline, or none; or a bespoke illustration per section |
| Emoji bullet points (✅ 🔥 💡) | Real list styles, small custom markers, or none |
| Corporate Memphis people, 3D glossy blobs, generic isometric servers | Real photography, bespoke illustration in a defined style, product UI |
| Stock photos of people pointing at laptops, handshakes | Authentic, specific imagery; the product itself |
| AI images with garbled text, extra fingers, plastic skin | Add text in code; fix or regenerate; prefer real assets |

### Interaction & motion

| Tell | Fix |
|---|---|
| Everything fades up on scroll with the same delay | Animate only what needs attention; vary choreography; respect reduced motion |
| Hover scale 1.05 + shadow on every card | Subtle, state-appropriate feedback |
| Missing states (focus, error, empty, loading) | Design every state (see `god-ui-ux`) |

### Copy

| Tell | Fix |
|---|---|
| "In today's fast-paced world…", "Whether you're a X or a Y…" | Start with the point |
| Rule-of-three adjective stacks ("fast, simple, and powerful") | One specific claim with proof |
| Em-dash-heavy, "It's not just X, it's Y" constructions | Plain declarative sentences |
| Lorem ipsum or placeholder testimonials ("John Doe, CEO") | Real or clearly marked sample content, realistic and local (Turkish names for a Turkish audience) |

## The slop gate (run before delivery)

Answer each with yes/no. Any "no" must be fixed or explicitly justified.

1. Could this design belong to a *different* company if you swapped the logo? (It should **not**.)
2. Is the aesthetic direction nameable in one sentence, and is it visible in every section?
3. Are the fonts deliberate choices (not defaults) and limited to two?
4. Is there exactly one accent colour, and does it come from the subject?
5. Do section layouts vary meaningfully?
6. Are all icons and images specific to the content (no sparkles, rockets, generic stock)?
7. Is all copy concrete (numbers, names, outcomes) with zero cliché phrases?
8. Do all text pairs pass WCAG AA contrast, and do all interactive elements have focus states?
9. Are empty, loading, error and long-content states handled?
10. Would a senior art director recognise intent in the spacing, alignment and type scale?

If 3 or more answers fail, redo the **direction** step in `god-of-design`, not just the details.
