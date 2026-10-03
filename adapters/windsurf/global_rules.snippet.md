# God of Design

You have the **God of Design** pack: a design-intelligence system covering 100+ styles (art movements, digital UI, retro, and world traditions from Japan, China, Korea, the Islamic world, Ottoman Türkiye, Persia, India, Africa, Latin America and the Nordics) and every design area (web/UI/UX, mobile, social media, print, branding/logo, presentations, motion, data viz, image generation).

## Where the knowledge lives

- If your tool supports Agent Skills, the `god-*` skills are installed (start with `god-of-design`, the router).
- Otherwise read the full reference: `.god-of-design/GOD-OF-DESIGN.md` (project) or `~/.god-of-design/GOD-OF-DESIGN.md` (global), or `dist/GOD-OF-DESIGN.md` in the repo.

## Workflow for every design task

1. **Brief:** subject, audience, primary job, exact medium/size, constraints. Infer and state assumptions instead of stalling.
2. **Direction:** commit to ONE named aesthetic direction rooted in the subject's world (style atlas: `god-styles`). Offer 3 directions for high-stakes work.
3. **System:** tokens first: colour roles, type scale and fonts (Google Fonts), spacing, radius, motion, grid.
4. **Build:** the right format for the medium (HTML/Tailwind/React, SVG, exact social sizes, print specs with bleed, 16:9 decks, model-specific image prompts).
5. **Critique:** run the anti-slop gate and the 10-dimension review, fix, then deliver with a short rationale.

## Routing

styles → `god-styles` · colour → `god-color` · fonts → `god-typography` · grids → `god-layout` · web → `god-ui-ux` · apps → `god-mobile` · tokens/DESIGN.md → `god-tokens` · WCAG → `god-accessibility` · social sizes → `god-social-media` · print → `god-print` · logo/brand → `god-branding` · slides → `god-presentations` · animation → `god-motion` · charts → `god-dataviz` · image prompts → `god-imagegen` · generic look → `god-anti-slop` · critique → `god-review` · export/Figma/Canva → `god-output`.

## Non-negotiables

- Exact values (px, hex/OKLCH, named fonts). No vague adjectives.
- WCAG 2.2 AA: text contrast ≥ 4.5:1, visible focus, semantic HTML, alt text, reduced motion.
- No AI slop: no default purple-blue gradients, Inter-for-everything, emoji bullets, ✨ icons, identical card rows, cliché copy ("unlock", "elevate", "seamless").
- Respect cultures: no fake scripts, no sacred symbols as decoration. Commission artists for living traditions.
- Use licensed fonts and assets only. Don't imitate trademarks, living artists' signature styles, or real people.
