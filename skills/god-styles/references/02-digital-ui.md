# Digital & UI Styles (1990s → today)

Interface styles carry *functional* constraints too: contrast, affordance, performance. Each entry notes accessibility risks.

---

## The styles

### Flat Design

- **ID:** `flat`
- **Origin:** ~2010–2013 (Windows Metro, iOS 7, Google). A reaction against skeuomorphism.
- **DNA:** No depth cues, solid colours, simple icons, bold type.
- **Palette:** `#1ABC9C` turquoise, `#3498DB` blue, `#E74C3C` red, `#F1C40F` yellow, `#2C3E50` midnight, `#ECF0F1` cloud
- **Type:** `Open Sans`, `Lato`, `Source Sans 3`; Metro feel: `Noto Sans`.
- **Layout:** Card tiles, bold colour blocks, clear grid.
- **Motifs:** Long shadows (2013 variant), flat icons, solid buttons.
- **Do:** Compensate missing depth with clear affordances (labels, underlines, contrast).
- **Don't:** Make buttons indistinguishable from labels; flat ≠ ambiguous.
- **CSS/Tailwind:** No shadows; `rounded-md`, solid `bg-*` colours; focus rings mandatory.
- **Prompt:** `flat design illustration, solid colours, no gradients, simple geometric shapes, clean vector`

### Material Design 3 (Material You)

- **ID:** `material-3`
- **Origin:** Google 2014 (M1) → 2021 (M3, dynamic colour) → M3 Expressive (2025).
- **DNA:** Tonal palettes from a seed colour, elevation via tone, rounded shapes, motion with meaning.
- **Palette:** Seed `#6750A4` → primary `#6750A4`, on-primary `#FFFFFF`, primary-container `#EADDFF`, surface `#FEF7FF`, outline `#79747E`
- **Type:** `Roboto`, `Roboto Flex`, `Google Sans`-alike `Product Sans` is not on Google Fonts → use `Roboto` / `Outfit`.
- **Layout:** 4dp baseline grid, 8dp spacing, window size classes (compact <600, medium 600–839, expanded ≥840dp).
- **Motifs:** FABs, chips, navigation rail, shape scale (4/8/12/16/28dp corners).
- **Do:** Generate tonal palettes (Material Theme Builder) and use roles, not raw hex.
- **Don't:** Mix iOS and Material controls in one native app.
- **CSS/Tailwind:** Map roles to CSS vars (`--md-sys-color-primary`); `@material/web` components.
- **Prompt:** `Material You Android interface, dynamic tonal colour palette, rounded containers, soft pastel surfaces`

### Skeuomorphism

- **ID:** `skeuomorphism`
- **Origin:** Apple iOS 1–6 (2007–2012), Mac OS X Aqua.
- **DNA:** Imitate real materials: leather, wood, glass, stitching, realistic lighting.
- **Palette:** Material-driven: `#6B4226` leather, `#C8A26B` wood, `#E6E6E6` brushed aluminium, `#2E2E2E` shadow
- **Type:** `Lora`, `Helvetica`-like `Inter`; embossed labels via text-shadow.
- **Layout:** Objects as UI (notebook, knob, bookshelf).
- **Motifs:** Stitching, gloss highlights, textures, realistic knobs.
- **Do:** Use for playful/nostalgic products, audio plugins, games.
- **Don't:** Rely on texture for meaning; keep labels.
- **CSS/Tailwind:** Layered `box-shadow` + `linear-gradient` highlights; texture images.
- **Prompt:** `skeuomorphic app interface, realistic leather and brushed metal textures, glossy buttons, stitching, iOS 6 style`

### Neumorphism (Soft UI)

- **ID:** `neumorphism`
- **Origin:** ~2019–2020 Dribbble trend.
- **DNA:** Extruded/inset shapes from the same-colour background via dual light/dark shadows.
- **Palette:** `#E0E5EC` base, `#FFFFFF` highlight, `#A3B1C6` shadow, accent `#6C63FF`
- **Type:** `Nunito`, `Poppins`, `Quicksand`.
- **Layout:** Large soft cards, round controls, few elements.
- **Motifs:** Soft pillows, inset toggles, dials.
- **Do:** Add a second cue (colour, icon, text) for states.
- **Don't:** Ship it for core controls without contrast fixes; default neumorphism fails WCAG 1.4.11 (3:1 non-text contrast).
- **CSS/Tailwind:** `box-shadow: 8px 8px 16px #A3B1C6, -8px -8px 16px #FFFFFF;` inset variant for pressed.
- **Prompt:** `neumorphic soft UI, monochrome light grey surface, extruded rounded buttons with soft shadows`

### Glassmorphism

- **ID:** `glassmorphism`
- **Origin:** Windows Vista Aero (2006) → macOS Big Sur / Fluent Acrylic (2020).
- **DNA:** Frosted translucent panels over vivid backgrounds, subtle borders, blur.
- **Palette:** Background `#0F172A` with blobs `#7C3AED`, `#06B6D4`, `#F472B6`; glass `rgba(255,255,255,0.12)`, border `rgba(255,255,255,0.25)`
- **Type:** `Inter`, `Plus Jakarta Sans`, `Sora`.
- **Layout:** Floating cards over gradient/mesh/photo backgrounds.
- **Motifs:** Blurred colour blobs, 1px light border, inner highlight.
- **Do:** Ensure text contrast on the *worst* background spot; add a fallback opaque bg.
- **Don't:** Stack glass on glass; avoid huge blur areas on low-end mobile.
- **CSS/Tailwind:** `bg-white/10 backdrop-blur-xl border border-white/20`; `@supports not (backdrop-filter: blur())` fallback.
- **Prompt:** `glassmorphism UI, frosted glass cards with blur over vibrant purple and cyan gradient blobs, subtle white borders`

### Liquid Glass

- **ID:** `liquid-glass`
- **Origin:** Apple, WWDC 2025 (iOS 26, macOS 26). A platform material.
- **DNA:** Dynamic translucent material that refracts content, adapts tint to context, floating controls.
- **Palette:** Content-driven system tints over imagery: glass fill `#FFFFFF` at 15–25% alpha, edge highlight `#FFFFFF` 50%, tint `#0A84FF`, text `#1D1D1F` / `#F5F5F7` on solid layers.
- **Type:** SF Pro on Apple platforms; on the web `Inter` / `Geist` as a stand-in.
- **Layout:** Controls float above content in capsules; content goes edge to edge.
- **Motifs:** Lensing highlights, capsule toolbars, concentric corners.
- **Do:** Use native APIs on Apple platforms; on web, simulate lightly and respect `prefers-reduced-transparency`.
- **Don't:** Fake it with heavy WebGL on content-critical pages.
- **CSS/Tailwind:** `backdrop-filter: blur(20px) saturate(180%)`, `@media (prefers-reduced-transparency: reduce)` solid fallback.
- **Prompt:** `Apple liquid glass interface, translucent refractive capsule toolbar floating over colourful content`

### Claymorphism

- **ID:** `claymorphism`
- **Origin:** ~2021; 3D clay renders and playful product UI.
- **DNA:** Puffy rounded shapes, inner + outer shadows, pastel, friendly.
- **Palette:** `#FDE2E4` blush, `#CDEAC0` mint, `#BDE0FE` sky, `#FFF1C1` butter, text `#2B2D42`
- **Type:** `Fredoka`, `Baloo 2`, `Nunito`.
- **Layout:** Big rounded cards (24–32px radius), floating 3D illustrations.
- **Motifs:** 3D clay characters, soft blobs.
- **Do:** Great for kids, onboarding, fintech for Gen-Z.
- **Don't:** Use in dense pro tools.
- **CSS/Tailwind:** `rounded-[32px] shadow-[inset_-6px_-6px_12px_rgba(0,0,0,.08),8px_8px_24px_rgba(0,0,0,.12)]`.
- **Prompt:** `claymorphism 3D illustration, soft puffy clay shapes, pastel colours, friendly rounded characters, studio lighting`

### Web Brutalism

- **ID:** `brutalism-web`
- **Origin:** Late 2010s (brutalistwebsites.com), inspired by raw concrete architecture.
- **DNA:** Raw HTML honesty, default-looking elements, system fonts, visible structure, harsh contrast.
- **Palette:** `#FFFFFF`, `#000000`, `#0000EE` link blue, `#FF0000` alert
- **Type:** System stacks, `Times New Roman`-alike `Tinos`, `Courier Prime`, `Arial`-alike `Arimo`.
- **Layout:** Dense, unstyled, table-like, sometimes intentionally ugly.
- **Motifs:** Underlined links, borders, monospace, raw images.
- **Do:** Keep it fast and accessible; brutalism can be the most usable style.
- **Don't:** Confuse with neo-brutalism (playful colour + shadows).
- **CSS/Tailwind:** Minimal CSS; `font-family: ui-monospace`; `border: 1px solid`.
- **Prompt:** `brutalist website, raw HTML aesthetic, black and white, default blue links, monospace text, visible borders`

### Neo-Brutalism

- **ID:** `neo-brutalism`
- **Origin:** ~2021–2023 (Gumroad redesign, Figma community).
- **DNA:** Thick black outlines, hard offset shadows, flat saturated fills, chunky type.
- **Palette:** `#FFDE59` yellow, `#FF66C4` pink, `#5CE1E6` cyan, `#7ED957` green, `#000000` outline, `#FFFDF5` bg
- **Type:** `Archivo Black`, `Space Grotesk`, `Lexend Mega`, `Public Sans`.
- **Layout:** Card grid with 2–4px borders and 4–8px solid shadows, slight rotations.
- **Motifs:** Stickers, stars, arrows, labels.
- **Do:** Press state = shadow collapses (translate 4px).
- **Don't:** Use soft blurred shadows; it must be hard.
- **CSS/Tailwind:** `border-2 border-black shadow-[4px_4px_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none`.
- **Prompt:** `neo-brutalism UI, thick black outlines, hard offset drop shadows, flat bright yellow pink cyan, chunky type`

### Bento Grid

- **ID:** `bento-grid`
- **Origin:** Apple keynotes & product pages (2022+), Japanese bento boxes.
- **DNA:** Modular rounded tiles of varied sizes, each a mini story.
- **Palette:** Dark: `#0A0A0A` bg, `#161616` tiles, `#F5F5F5` text, accent `#A3E635`; or light neutral.
- **Type:** `Inter`, `Geist`, `SF`-like; huge numbers in tiles.
- **Layout:** CSS grid, 3–4 columns, tiles span 1–2 cols/rows, 16–24px gaps, 20–28px radius.
- **Motifs:** Stats, mini charts, product shots, icons.
- **Do:** One idea per tile; vary tile size by importance.
- **Don't:** Fill every tile with the same icon+title+text template.
- **CSS/Tailwind:** `grid grid-cols-4 auto-rows-[180px] gap-4` with `col-span-2 row-span-2`.
- **Prompt:** `bento grid layout, rounded modular tiles of varying sizes, product features, dark mode, Apple keynote style`

### Dark Tech / Linear Style

- **ID:** `dark-tech`
- **Origin:** Linear, Vercel, Raycast (2020+).
- **DNA:** Near-black surfaces, subtle borders, glow accents, tight type, crisp micro-detail.
- **Palette:** `#08090A` bg, `#111214` surface, `#1F2023` border, `#E6E6E6` text, `#8A8F98` muted, accent `#5E6AD2`
- **Type:** `Inter` with `ss01`/`cv11`, `Geist`, `Geist Mono`.
- **Layout:** Centered hero, product screenshot with glow, dense feature grid.
- **Motifs:** Radial glows, 1px borders, keyboard shortcut chips, grid backgrounds.
- **Do:** Use elevation via lighter surface, not shadows.
- **Don't:** Default to purple-blue gradients; pick an accent from the brand.
- **CSS/Tailwind:** `bg-[#08090A] border-white/10`, `bg-[radial-gradient(...)]`.
- **Prompt:** `dark mode SaaS landing page, near black background, subtle grid, soft glowing accent, crisp product screenshot`

### Aurora / Mesh Gradient

- **ID:** `aurora-mesh`
- **Origin:** Stripe (2019+), iOS wallpapers.
- **DNA:** Soft multi-colour mesh gradients, grain, organic motion.
- **Palette:** `#FF7A59` coral, `#FFB86B` apricot, `#7C5CFF` violet, `#00D4FF` aqua, base `#0B0B1A` or `#FFFFFF`
- **Type:** `Sora`, `Satoshi`-like `Manrope`, `Inter Tight`.
- **Layout:** Gradient field hero, crisp foreground type.
- **Motifs:** Blurred blobs, noise grain to avoid banding.
- **Do:** Add 3–5% noise to prevent banding; animate slowly (≥ 10 s loops).
- **Don't:** Put long text on busy colour areas.
- **CSS/Tailwind:** Multiple `radial-gradient`s + SVG noise; `@property` animated hues.
- **Prompt:** `soft aurora mesh gradient background, coral violet aqua blending, fine film grain`

### Editorial / Magazine Web

- **ID:** `editorial`
- **Origin:** Print magazines (Vogue, Monocle, The Gentlewoman) translated to web.
- **DNA:** Big serif headlines, columns, pull quotes, art direction per story, rich photography.
- **Palette:** `#FBF8F3` paper, `#141414` ink, `#B3261E` editorial red, `#6B6B6B` caption grey
- **Type:** Display `Playfair Display`, `Fraunces`, `Instrument Serif`, `Gloock`; body `Newsreader`, `Source Serif 4`; captions `Inter`.
- **Layout:** 12-col grid, asymmetric image/text, drop caps, generous leading, 60–75 char measure.
- **Motifs:** Pull quotes, rules, section numbers, bylines, footnotes.
- **Do:** Treat each page like a spread; vary rhythm.
- **Don't:** Use card grids everywhere.
- **CSS/Tailwind:** `columns-2`, `first-letter:text-7xl`, `text-balance` for headlines, `hanging-punctuation`.
- **Prompt:** `editorial magazine layout, large serif headline, asymmetric photography, pull quote, refined typography`

### Corporate Memphis (Alegria)

- **ID:** `corporate-memphis`
- **Origin:** Facebook "Alegria" (Buck, 2017) → ubiquitous tech illustration.
- **DNA:** Flat people with big limbs, small heads, no outlines, bright flat colour.
- **Palette:** `#6C63FF` violet, `#FF6584` pink, `#F9A826` amber, `#3F3D56` dark, `#F2F2F2` bg
- **Type:** `Poppins`, `Nunito`.
- **Layout:** Spot illustrations next to text blocks.
- **Motifs:** Disproportionate figures, plants, laptops.
- **Do:** Know it now reads as generic tech; use only with a twist (custom proportions, texture, brand palette).
- **Don't:** Default to it — it is a classic "AI slop"/template tell.
- **CSS/Tailwind:** SVG illustrations, flat fills.
- **Prompt:** `flat vector illustration of people with oversized limbs, small heads, bright flat colours, corporate tech style`

### Isometric & 3D

- **ID:** `isometric-3d`
- **Origin:** Pixel-art isometric games → 2018+ SaaS illustration → Spline/three.js.
- **DNA:** 30° axonometric projection, consistent lighting, toy-like objects.
- **Palette:** `#4F46E5` indigo, `#22D3EE` cyan, `#F472B6` pink, `#F8FAFC` light, `#1E293B` shade
- **Type:** `Outfit`, `Lexend`.
- **Layout:** Isometric scenes as hero, text left.
- **Motifs:** Servers, blocks, tiny people, platforms.
- **Do:** Keep one light direction and shadow colour.
- **Don't:** Mix isometric and perspective objects.
- **CSS/Tailwind:** `transform: rotateX(60deg) rotateZ(-45deg)`; Spline embeds.
- **Prompt:** `isometric 3D illustration, soft studio lighting, pastel toy-like objects on floating platform, 30 degree axonometric`

### Organic / Biophilic

- **ID:** `organic-biophilic`
- **Origin:** Wellness, sustainable brands, 2020s.
- **DNA:** Natural textures, earthy colours, irregular shapes, soft serif type.
- **Palette:** `#F4F1EA` oat, `#6B705C` olive, `#A5A58D` sage, `#CB997E` clay, `#3A3A2F` bark
- **Type:** `Fraunces`, `Young Serif`, `DM Serif Display`; body `DM Sans`.
- **Layout:** Rounded blob masks for photos, generous spacing, asymmetric.
- **Motifs:** Leaves, stones, paper textures, hand-drawn lines.
- **Do:** Use real photography of materials.
- **Don't:** Use neon or hard geometric frames.
- **CSS/Tailwind:** `clip-path` / SVG mask blobs, `rounded-[40%_60%_60%_40%]`.
- **Prompt:** `organic biophilic design, earthy muted greens and clay, natural textures, soft irregular shapes, gentle daylight`

### Spatial UI

- **ID:** `spatial-ui`
- **Origin:** Apple visionOS (2023), Meta Horizon OS.
- **DNA:** Floating glass windows in 3D space, depth, eye/hand targets, ornaments.
- **Palette:** System glass; text `#FFFFFF` on glass; accent from content.
- **Type:** SF Pro (native); web stand-in `Inter`, larger sizes and weights.
- **Layout:** Windows, volumes, tab bars as ornaments; min 60pt targets.
- **Motifs:** Glass, depth shadows, hover highlights.
- **Do:** Respect comfort: content at ~1–2 m, avoid head-locked UI.
- **Don't:** Port dense desktop layouts unchanged.
- **CSS/Tailwind:** For mockups: glass panels with large radius and perspective transforms.
- **Prompt:** `visionOS spatial interface, floating frosted glass windows in a bright living room, depth and soft shadows`

### Retro OS (Windows 95 / Mac OS 9)

- **ID:** `retro-os`
- **Origin:** 1990s desktop GUIs.
- **DNA:** Bevelled grey windows, title bars, pixel icons, system fonts.
- **Palette:** `#C0C0C0` silver, `#000080` title navy, `#008080` desktop teal, `#FFFFFF`, `#808080`
- **Type:** `VT323`, `Silkscreen`, `Pixelify Sans`, `W95FA`-like; or `Tahoma`-alike `Noto Sans`.
- **Layout:** Draggable windows, menus, status bars.
- **Motifs:** Bevel borders, hourglass cursors, pixel icons.
- **Do:** Great for portfolios, games, nostalgic campaigns.
- **Don't:** Hurt usability; keep real buttons focusable.
- **CSS/Tailwind:** `98.css` library; `border-style: outset/inset`.
- **Prompt:** `Windows 95 desktop interface, grey bevelled windows, navy title bar, teal desktop, pixel icons`

### Industrial Monochrome (Nothing-style)

- **ID:** `industrial-mono`
- **Origin:** Teenage Engineering, Nothing, Braun; 2020s hardware-inspired UI.
- **DNA:** Monochrome + one signal colour, dot-matrix type, instrument-panel widgets, grids.
- **Palette:** `#000000`, `#FFFFFF`, `#8E8E8E`, signal `#FF3B30` or `#FF6B00`
- **Type:** `Space Grotesk`, `Space Mono`, `Doto` (dot matrix), `DotGothic16`.
- **Layout:** Strict grid, labels in mono caps, gauges, segmented bars.
- **Motifs:** Dot matrix, screws, LED dots, technical labels.
- **Do:** Use the signal colour only for state/alerts.
- **Don't:** Add gradients.
- **CSS/Tailwind:** `font-mono uppercase text-[11px] tracking-widest`, segmented progress via repeating gradient.
- **Prompt:** `industrial monochrome interface, dot matrix typography, instrument panel widgets, single red accent, Teenage Engineering aesthetic`

### Terminal / Data-Dense

- **ID:** `terminal-dense`
- **Origin:** Bloomberg Terminal, CLIs, trading UIs.
- **DNA:** Monospace, high density, keyboard-first, colour as data.
- **Palette:** `#0B0F14` bg, `#E6EDF3` text, `#3FB950` up, `#F85149` down, `#D29922` warn, `#58A6FF` info
- **Type:** `JetBrains Mono`, `IBM Plex Mono`, `Fira Code`; `tabular-nums`.
- **Layout:** Panels, tables, split panes, minimal padding (4–8px).
- **Motifs:** Command palette, ASCII borders, sparklines.
- **Do:** Optimise for scanning: alignment, tabular numerals, colour + sign (▲▼).
- **Don't:** Use red/green alone (colour-blindness).
- **CSS/Tailwind:** `font-mono text-[13px] leading-5 tabular-nums`.
- **Prompt:** `dense financial terminal interface, monospace, dark background, green and red data, many panels`

### Kinetic Typography

- **ID:** `kinetic-type`
- **Origin:** Saul Bass titles → motion design → variable fonts on the web.
- **DNA:** Type is the visual; moves, morphs, scales with scroll.
- **Palette:** High contrast pairs: `#0A0A0A` / `#F5F5F0`, accent `#FF4D00`
- **Type:** Variable fonts: `Roboto Flex`, `Fraunces`, `Big Shoulders Display`, `Bricolage Grotesque`, `Anybody`.
- **Layout:** Full-screen words, scroll-driven sequences.
- **Motifs:** Marquees, stretching letters, split text.
- **Do:** Provide `prefers-reduced-motion` alternatives.
- **Don't:** Animate body text.
- **CSS/Tailwind:** `font-variation-settings`, scroll-driven animations (`animation-timeline: scroll()`).
- **Prompt:** `kinetic typography poster, stretched variable font letters, bold black and white with orange accent`

### AI-Native / Conversational UI

- **ID:** `ai-native`
- **Origin:** 2023+ chat-first products.
- **DNA:** Prompt box as hero, streaming text, suggestion chips, artefact panels.
- **Palette:** Calm neutrals `#FFFFFF` / `#F7F7F8` / `#0D0D0D`, single accent from brand (avoid default violet).
- **Type:** `Inter`, `Geist`; reading-optimised body 16–17px.
- **Layout:** Centered composer, side history, split view for artefacts.
- **Motifs:** Typing indicators, citations, tool-call cards.
- **Do:** Show status, sources and undo; design empty and error states.
- **Don't:** Use the sparkle ✨ icon and purple gradient as the identity — top AI-slop tell.
- **CSS/Tailwind:** `max-w-3xl mx-auto`, sticky composer, `prose` for output.
- **Prompt:** `clean conversational AI interface, centered prompt box, suggestion chips, calm neutral palette`
