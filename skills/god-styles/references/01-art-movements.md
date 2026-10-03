# Art & Design Movements (Western canon, 1850–2000)

Each entry gives you enough to *commit* to the style: where it comes from, its visual DNA, a pinned palette, real Google Fonts, layout rules, motifs, what it refuses, implementation hints and an image-generation fragment. Use historical styles as a **grammar**, not as a costume: borrow the logic (grid, geometry, ornament system) and apply it to today's content.

---

### Arts and Crafts
- **ID:** `arts-and-crafts`
- **Origin:** Britain, 1860–1910 (William Morris, Kelmscott Press). A reaction against industrial ugliness; honest materials, hand craft.
- **DNA:** Dense botanical repeat patterns, woodcut borders, medieval-inspired book typography, warm natural dyes.
- **Palette:** `#2F4A3A` forest, `#8C3B2E` madder red, `#C9A54C` weld gold, `#E9E1CC` linen, `#1E1B18` ink
- **Type:** Display `Cormorant Garamond` / `EB Garamond`; body `EB Garamond` or `Libre Caslon Text`. Drop caps encouraged.
- **Layout:** Book-page proportions (2:3), generous outer margins, ornamental frames, decorated initials; symmetrical.
- **Motifs:** Acanthus, willow boughs, strawberry thieves, vines, birds, interlaced borders.
- **Do:** Use a single repeating pattern as a field; let type sit in a calm panel inside it.
- **Don't:** Mix with glossy gradients or neon; don't use sans serif body text.
- **CSS/Tailwind:** SVG pattern background (`background-image: url(pattern.svg)`), `font-feature-settings: "liga","dlig"`; `first-letter:` drop caps.
- **Prompt:** `William Morris Arts and Crafts style, dense botanical repeat pattern, woodblock print texture, muted natural dyes, ornamental border`

### Art Nouveau
- **ID:** `art-nouveau`
- **Origin:** Europe, 1890–1910 (Mucha, Horta, Guimard, Klimt adjacent). "New Art": organic, flowing, nature as structure.
- **DNA:** Whiplash curves, elongated female figures, halos and arches, botanical frames, flat colour with outline.
- **Palette:** `#6B7F4E` sage, `#C08A3E` ochre gold, `#B5654B` terracotta, `#E8D9B5` parchment, `#3A2F2A` umber
- **Type:** Display `Federo`, `Poiret One` (lighter Deco crossover); body `Cormorant` / `Lora`. Custom lettering ideal.
- **Layout:** Central figure framed by an arch or circle, ornamental border, text in a cartouche at top or bottom; vertical posters (1:2).
- **Motifs:** Lilies, irises, peacock feathers, hair as ornament, mosaics, stained glass leading.
- **Do:** Let lines flow continuously from frame into subject.
- **Don't:** Use straight hard-edged grids or geometric sans fonts.
- **CSS/Tailwind:** Curvy SVG frames; `border-radius` arches (`rounded-t-full`); gold via `#C08A3E` not metallic gradients.
- **Prompt:** `Alphonse Mucha Art Nouveau poster, whiplash curves, ornate circular halo, flat muted colours with fine outline, botanical frame, lithograph`

### Vienna Secession
- **ID:** `vienna-secession`
- **Origin:** Vienna, 1897–1915 (Klimt, Moser, Hoffmann, Wiener Werkstätte).
- **DNA:** Geometric take on Nouveau: squares, grids, gold leaf, black-white checkers, strong rectangles.
- **Palette:** `#C9A227` gold leaf, `#111111` black, `#F4F1E8` white, `#7A1F2B` oxblood, `#3F5E5A` patina
- **Type:** `Marcellus`, `Italiana`, `Cinzel` for display; body `Spectral`.
- **Layout:** Square formats, gridded panels, square dots and checker borders, text blocks as geometric slabs.
- **Motifs:** Small squares, spirals, checkerboards, gold mosaic, stylised trees of life.
- **Do:** Combine strict geometry with one rich ornamental field.
- **Don't:** Use soft shadows or rounded UI chrome.
- **CSS/Tailwind:** `repeating-conic-gradient(#111 0 25%, #F4F1E8 0 50%) 0 0/16px 16px` checker borders.
- **Prompt:** `Vienna Secession poster, Gustav Klimt gold leaf mosaic, black and white checker border, square grid ornament`

### Art Deco
- **ID:** `art-deco`
- **Origin:** France then worldwide, 1920–1940 (Cassandre, Chrysler Building, ocean liners).
- **DNA:** Symmetry, stepped forms, sunbursts, chevrons, metallic gold on black, streamlined luxury.
- **Palette:** `#0E0E10` jet, `#C9A646` brass, `#E8DCC0` champagne, `#1F4E5F` peacock teal, `#8E2A2A` lacquer red
- **Type:** Display `Poiret One`, `Limelight`, `Josefin Sans` (caps, wide tracking), `Italiana`; body `Josefin Sans` or `Raleway`.
- **Layout:** Strict bilateral symmetry, vertical emphasis, stepped/ziggurat frames, central axis, thin parallel lines.
- **Motifs:** Sunbursts, fans, chevrons, zigzags, stylised fountains, speed lines.
- **Do:** Use thin gold rules (1px) and generous letter-spacing (0.2em) in caps.
- **Don't:** Use rounded blobs, pastel gradients, or asymmetric scatter.
- **CSS/Tailwind:** `tracking-[0.2em] uppercase`, `border-double`, `repeating-linear-gradient` for line bundles; conic gradient sunburst.
- **Prompt:** `Art Deco poster, Cassandre style, symmetrical stepped architecture, gold sunburst on black, streamlined geometric shapes, 1930s travel poster`

### Streamline Moderne
- **ID:** `streamline-moderne`
- **Origin:** USA, 1930s–40s. Late Deco shaped by aerodynamics.
- **DNA:** Horizontal speed lines, rounded corners, chrome, porthole windows.
- **Palette:** `#F2EDE4` cream, `#2E5E8C` aero blue, `#D9534F` signal red, `#B8B8B8` chrome, `#1C1C1C` black
- **Type:** `Righteous`, `Monoton` for signage; body `Josefin Sans`.
- **Layout:** Long horizontal bands, rounded ends (pill shapes), three-line speed stripes.
- **Motifs:** Speed stripes, teardrop shapes, rounded corners, portholes.
- **Do:** Use triple horizontal lines as a recurring device.
- **Don't:** Use vertical ziggurats (that's classic Deco).
- **CSS/Tailwind:** `rounded-full` pills, `border-y-4 border-double`.
- **Prompt:** `Streamline Moderne illustration, aerodynamic rounded forms, horizontal chrome speed lines, 1930s American industrial design`

### Bauhaus
- **ID:** `bauhaus`
- **Origin:** Germany, 1919–1933 (Gropius, Moholy-Nagy, Bayer, Albers). Form follows function; art and industry unified.
- **DNA:** Primary colours, circle/square/triangle, asymmetric balance, sans-serif lowercase, photomontage, grid.
- **Palette:** `#E63027` red, `#1F4FA3` blue, `#F7C514` yellow, `#111111` black, `#F2EFE6` off-white
- **Type:** `Archivo`, `Jost` (Futura-like), `League Spartan`; Bayer-style lowercase headings. Body `Jost`.
- **Layout:** Asymmetric grid, strong diagonals, large geometric shapes overlapping type, plenty of off-white.
- **Motifs:** Circles, squares, triangles, thick bars, arrows, rotated text.
- **Do:** Assign each primary colour a role; let geometry carry hierarchy.
- **Don't:** Add gradients, shadows or decorative serifs.
- **CSS/Tailwind:** CSS Grid with spanning blocks, `rotate-90` vertical labels, `rounded-full` circles in pure primaries.
- **Prompt:** `Bauhaus poster, primary red blue yellow geometric shapes, circle square triangle, asymmetric composition, sans serif lowercase typography, off-white paper`

### De Stijl
- **ID:** `de-stijl`
- **Origin:** Netherlands, 1917–1931 (Mondrian, van Doesburg, Rietveld).
- **DNA:** Pure abstraction: black orthogonal lines, rectangles of primaries + white/grey.
- **Palette:** `#D62828` red, `#003F88` blue, `#FFD500` yellow, `#0A0A0A` black, `#FAFAFA` white
- **Type:** `Archivo Black`, `Inter Tight` (or custom blocky lettering); body `Inter Tight`.
- **Layout:** Asymmetric rectangle grid with thick black gutters; colour in few cells only.
- **Motifs:** Rectangles, thick black rules, no curves, no diagonals (Mondrian) / diagonals allowed (van Doesburg's Elementarism).
- **Do:** Keep most cells white; colour 3–4 cells.
- **Don't:** Use curves, shadows or more than 5 colours.
- **CSS/Tailwind:** `grid gap-2 bg-black` with white/colour cells. Perfect bento-grid ancestor.
- **Prompt:** `De Stijl composition, Piet Mondrian, thick black grid lines, rectangles of primary red blue yellow, white space`

### Russian Constructivism
- **ID:** `constructivism`
- **Origin:** Soviet Union, 1917–1930s (Rodchenko, El Lissitzky, Stepanova).
- **DNA:** Diagonal dynamism, red/black/cream, photomontage, bold sans type as architecture, megaphone shouting.
- **Palette:** `#C1121F` red, `#111111` black, `#EFE6D2` cream, `#6C757D` grey
- **Type:** `Oswald`, `Bebas Neue`, `Russo One` (Cyrillic support), `Rubik Mono One`; type set on diagonals.
- **Layout:** 30–45° diagonals, overlapping planes, circles and wedges, high contrast photo cutouts.
- **Motifs:** Wedges, arrows, megaphones, gears, figures pointing.
- **Do:** Make type a structural element (huge, rotated, cropped).
- **Don't:** Use political imagery casually; abstract the energy, not the propaganda.
- **CSS/Tailwind:** `-rotate-12` blocks, `mix-blend-multiply` photo with red overlay.
- **Prompt:** `Russian Constructivist poster, El Lissitzky, diagonal composition, red and black wedges, photomontage, bold sans serif type`

### Italian Futurism
- **ID:** `futurism`
- **Origin:** Italy, 1909–1940s (Marinetti, Balla, Depero). Speed, machines, noise.
- **DNA:** Explosive typography ("parole in libertà"), motion blur repetition, fragmented forms.
- **Palette:** `#E4572E` vermilion, `#1B1B1E` black, `#F3A712` amber, `#29335C` indigo, `#F0EAD6` paper
- **Type:** Mixed weights/sizes: `Anton`, `Bodoni Moda`, `Chivo`; deliberately chaotic.
- **Layout:** Radiating, colliding text lines, words of varying sizes, onomatopoeia.
- **Motifs:** Speed lines, repeated silhouettes, gears, sound words.
- **Do:** Use for energetic event or sports graphics.
- **Don't:** Use for calm or dense informational UIs.
- **CSS/Tailwind:** Absolutely positioned words with varied rotate/scale; `@keyframes` jitter.
- **Prompt:** `Italian Futurism poster, Depero style, explosive typography of different sizes, speed lines, dynamic fragmented machine forms`

### Dada & Collage
- **ID:** `dada-collage`
- **Origin:** Zurich/Berlin, 1916–1924 (Höch, Schwitters, Hausmann).
- **DNA:** Anti-art collage, ransom-note type, cut-up photos, absurd juxtaposition.
- **Palette:** `#EDE6D6` newsprint, `#1A1A1A` ink, `#B23A48` red, `#3D5A80` blue, halftone greys
- **Type:** Mixed found type: `Abril Fatface`, `Special Elite`, `Bodoni Moda`, `Rubik Mono One` together.
- **Layout:** Intentional disorder, overlaps, torn edges, rotated fragments.
- **Motifs:** Torn paper, halftone photos, stamps, tickets, arrows, typewriter fragments.
- **Do:** Keep one clear focal point so chaos still reads.
- **Don't:** Use for forms or flows where clarity matters.
- **CSS/Tailwind:** `clip-path` torn edges (polygon), `mix-blend-multiply`, paper texture backgrounds.
- **Prompt:** `Dada photomontage collage, Hannah Höch, torn newspaper, mismatched cut-out typography, halftone photos, absurd juxtaposition`

### Surrealism
- **ID:** `surrealism`
- **Origin:** Paris, 1924–1960s (Dalí, Magritte, Ernst).
- **DNA:** Dream logic, impossible scenes rendered realistically, uncanny calm.
- **Palette:** `#87A8C3` dream sky, `#E9D8A6` sand, `#9B2226` red, `#2B2D42` night, `#F1FAEE` cloud
- **Type:** Elegant serif `Playfair Display`, `Gloock`; minimal so the image speaks.
- **Layout:** Single central image, lots of empty sky/ground, small caption.
- **Motifs:** Floating objects, melting forms, doors in skies, bowler hats, eyes, endless horizons.
- **Do:** Pair one impossible idea with photographic realism.
- **Don't:** Stack many surreal elements; one twist is enough.
- **CSS/Tailwind:** Full-bleed image hero, tiny caption, no chrome.
- **Prompt:** `Surrealist painting in the style of René Magritte, impossible scene rendered realistically, floating object in calm blue sky, long shadows`

### Swiss / International Typographic Style
- **ID:** `swiss-international`
- **Origin:** Switzerland, 1950s–70s (Müller-Brockmann, Hofmann, Ruder, Vignelli in the US).
- **DNA:** Objective clarity, mathematical grids, flush-left ragged-right sans type, asymmetric layouts, photography over illustration.
- **Palette:** `#FFFFFF` white, `#111111` black, `#E30613` Swiss red, `#F2F2F2` light grey (one accent only)
- **Type:** Helvetica-likes: `Inter Tight`, `Archivo`, `Hanken Grotesk`; Akzidenz feel: `Schibsted Grotesk`. One family, 2–3 weights.
- **Layout:** Modular grid (e.g. 12 col × 8 rows), flush-left, big type scale contrast (8:1), deliberate white space, numbers aligned.
- **Motifs:** Grid itself, rules, circles, large numerals, cropped photography.
- **Do:** Hang everything on baselines and column edges; align obsessively.
- **Don't:** Center text, use decoration, or more than one accent colour.
- **CSS/Tailwind:** `grid-cols-12 gap-x-6`, `tracking-tight`, `leading-none` for display, `text-left`, `tabular-nums`.
- **Prompt:** `Swiss International Typographic Style poster, Josef Müller-Brockmann, strict modular grid, flush left Helvetica-like typography, red accent, objective design`

### Mid-Century Modern
- **ID:** `mid-century-modern`
- **Origin:** USA/Europe, 1945–1969 (Saul Bass, Paul Rand, Alvin Lustig, Charley Harper, Eames).
- **DNA:** Playful geometry, cut-paper shapes, limited warm palettes, hand-drawn type, optimism.
- **Palette:** `#E07A2F` tangerine, `#2A9D8F` teal, `#E9C46A` mustard, `#264653` deep slate, `#F4EBD9` paper
- **Type:** `Josefin Sans`, `Futura`-like `Jost`, hand-lettered feel `Shrikhand`; body `Lora`.
- **Layout:** Asymmetric, overlapping flat shapes, off-register printing, generous negative space.
- **Motifs:** Atomic starbursts, boomerangs, kidney shapes, stylised animals, paper cutouts.
- **Do:** Simulate 2–3 colour print with overprint (`mix-blend-mode: multiply`).
- **Don't:** Use photo-realistic rendering or gradients.
- **CSS/Tailwind:** SVG blobs, `mix-blend-multiply`, subtle grain overlay.
- **Prompt:** `Mid-century modern illustration, Saul Bass and Charley Harper style, flat cut paper shapes, limited palette teal mustard tangerine, off-register print, grain`

### Pop Art
- **ID:** `pop-art`
- **Origin:** UK/USA, 1955–1970 (Warhol, Lichtenstein, Hamilton).
- **DNA:** Mass-culture imagery, Ben-Day dots, thick outlines, saturated flat colour, repetition.
- **Palette:** `#FF1F1F` red, `#FFD60A` yellow, `#0057FF` blue, `#FF5DA2` pink, `#111111` outline
- **Type:** `Bangers`, `Luckiest Guy`, `Anton`; speech bubbles.
- **Layout:** Grids of repeated images (Warhol), comic panels, big onomatopoeia.
- **Motifs:** Halftone dots, speech balloons, POW/WHAAM, product packaging, celebrity portraits.
- **Do:** Use dots and thick black outline consistently.
- **Don't:** Use subtle tones or thin lines.
- **CSS/Tailwind:** `radial-gradient(#111 1px, transparent 1.5px) 0 0/6px 6px` halftone, `border-4 border-black`.
- **Prompt:** `Roy Lichtenstein pop art, Ben-Day halftone dots, thick black outlines, saturated primary colours, comic speech bubble`

### Op Art
- **ID:** `op-art`
- **Origin:** 1960s (Bridget Riley, Victor Vasarely).
- **DNA:** Optical illusions, high-contrast patterns that vibrate, moiré, perceived motion.
- **Palette:** `#000000`, `#FFFFFF`, optional `#E63946` red / `#1D3557` blue
- **Type:** `Monoton`, `Megrim` display; body `Inter`.
- **Layout:** Full-field pattern with a small calm text block.
- **Motifs:** Concentric circles, warped checkerboards, stripes bending.
- **Do:** Use sparingly as a hero or poster field.
- **Don't:** Put body text on top; never animate fast flashing patterns (photosensitivity, WCAG 2.3.1).
- **CSS/Tailwind:** `repeating-radial-gradient`, SVG warped grids.
- **Prompt:** `Op art, Bridget Riley, black and white wavy stripes creating optical illusion of motion, Vasarely warped checkerboard sphere`

### Psychedelic 60s
- **ID:** `psychedelic-60s`
- **Origin:** San Francisco, 1965–1972 (Wes Wilson, Victor Moscoso, Peter Max).
- **DNA:** Melting, filling lettering, vibrating complementary colours, Art Nouveau revival.
- **Palette:** `#FF4F00` orange, `#8F00FF` violet, `#00C2A8` turquoise, `#FFE135` yellow, `#E0218A` magenta
- **Type:** `Monoton`, `Shrikhand`, `Bungee Shade` or custom fluid lettering; avoid readable body copy on posters.
- **Layout:** Lettering that fills the shape, symmetrical, swirling.
- **Motifs:** Paisley, swirls, eyes, flowers, sun rays.
- **Do:** Use complementary colours at equal value to vibrate.
- **Don't:** Use for accessibility-critical text.
- **CSS/Tailwind:** SVG `feTurbulence` + `feDisplacementMap` for melt.
- **Prompt:** `1960s psychedelic concert poster, Fillmore style, melting lettering filling the space, vibrating complementary colours, swirls and paisley`

### Seventies Retro
- **ID:** `seventies-retro`
- **Origin:** 1970s graphics, supergraphics, Cooper Black era.
- **DNA:** Warm earthy palette, rainbow stripes, rounded chunky type, sunsets.
- **Palette:** `#D9822B` burnt orange, `#A44A3F` rust, `#E3B23C` harvest gold, `#6B8E23` avocado, `#4E342E` brown
- **Type:** `Shrikhand`, Cooper-like `Alfa Slab One`/`Chango`, `Righteous`; body `Bitter`.
- **Layout:** Stacked stripes bending around corners, circles, centered lockups.
- **Motifs:** Rainbow stripe arcs, sunsets, daisies, grain.
- **Do:** Use 3–5 stripe bands in sequence.
- **Don't:** Use cold blues or neon.
- **CSS/Tailwind:** `box-shadow` stacks for stripes; `linear-gradient` hard stops.
- **Prompt:** `1970s retro graphic, rainbow stripes in burnt orange mustard and brown, chunky rounded Cooper Black lettering, sunset, film grain`

### Memphis Design
- **ID:** `memphis`
- **Origin:** Milan, 1981–1987 (Ettore Sottsass, Memphis Group).
- **DNA:** Clashing pastels and brights, squiggles, terrazzo, geometric primitives, playful anti-taste.
- **Palette:** `#FF6F91` pink, `#FFC75F` yellow, `#00C9A7` mint, `#845EC2` purple, `#111111` black
- **Type:** `Rubik`, `Bungee`, `Fredoka`; geometric, chunky.
- **Layout:** Scattered shapes around content, tilted blocks, patterned fills.
- **Motifs:** Squiggles, confetti triangles, zigzags, dots, terrazzo, grid patterns.
- **Do:** Keep content area clean and scatter shapes around it.
- **Don't:** Confuse with "Corporate Memphis" flat people illustrations (see digital styles).
- **CSS/Tailwind:** Absolutely positioned SVG shapes, `bg-[radial-gradient(...)]` dot fields.
- **Prompt:** `Memphis Group 1980s design, squiggles, confetti triangles, terrazzo pattern, pastel pink mint yellow with black, playful geometric shapes`

### Postmodern / New Wave Typography
- **ID:** `postmodern-new-wave`
- **Origin:** 1970s–80s (Wolfgang Weingart, April Greiman, Cranbrook).
- **DNA:** Breaking the Swiss grid, layered type, texture, early digital artefacts.
- **Palette:** `#F72585` magenta, `#4361EE` blue, `#4CC9F0` cyan, `#111111` black, `#F8F9FA` white
- **Type:** `Space Grotesk`, `Syne`, mixed weights; letter-spacing experiments.
- **Layout:** Overlapping layers, stepped text, grid deliberately violated.
- **Motifs:** Bitmap textures, halftone, overlapping rules, Greiman pixel collages.
- **Do:** Show the Swiss grid and then break it on purpose.
- **Don't:** Lose reading order.
- **CSS/Tailwind:** CSS Grid with overlapping areas, `mix-blend-difference`.
- **Prompt:** `Wolfgang Weingart new wave typography poster, layered overlapping type, broken grid, halftone textures`

### Punk / DIY Zine
- **ID:** `punk-zine`
- **Origin:** UK/US, 1976–1985 (Jamie Reid, Raymond Pettibon).
- **DNA:** Photocopy, ransom letters, tape, hand-scrawled type, cheap 1-colour print.
- **Palette:** `#F5F500` acid yellow, `#FF0A54` hot pink, `#000000`, `#FFFFFF`, photocopy greys
- **Type:** `Special Elite`, `Permanent Marker`, `Rock Salt`, cut-out mixes.
- **Layout:** Chaotic, tilted, taped elements, high contrast.
- **Motifs:** Safety pins, tape, xerox grain, scribbles, stencils.
- **Do:** Use 1–2 ink colours max with heavy grain.
- **Don't:** Make it clean; punk without grit is a costume.
- **CSS/Tailwind:** `filter: contrast(1.6) grayscale(1)`, rotated `-rotate-2` cards, noise SVG.
- **Prompt:** `1970s punk zine, photocopied xerox texture, ransom note cut-out letters, tape, hot pink and acid yellow, Jamie Reid style`

### Grunge / Ray Gun Era
- **ID:** `grunge-90s`
- **Origin:** 1990s (David Carson, Ray Gun magazine, Emigre).
- **DNA:** Illegible-on-purpose, distressed type, layered photos, chaotic editorial.
- **Palette:** `#3B3B3B` charcoal, `#8A7F70` dirty taupe, `#A23B2A` rust, `#D9CFC1` dirty paper
- **Type:** `Special Elite`, `Cutive Mono`, distressed display; extreme sizes.
- **Layout:** Overlapping columns, rotated text, cropped type.
- **Motifs:** Scratches, ink bleed, film burns, photocopy.
- **Do:** Use for music/culture editorial only.
- **Don't:** Use for body copy or product UI.
- **CSS/Tailwind:** Texture overlays, `filter: url(#rough)`.
- **Prompt:** `1990s grunge editorial layout, David Carson Ray Gun magazine, distressed overlapping typography, gritty textures`

### Minimalism
- **ID:** `minimalism`
- **Origin:** 1960s art (Judd, Agnes Martin) → Dieter Rams "less but better" → Apple/MUJI.
- **DNA:** Reduction to essentials, generous negative space, restrained palette, precise detail.
- **Palette:** `#FAFAF9` off-white, `#1C1917` near-black, `#A8A29E` stone, one accent e.g. `#2563EB`
- **Type:** `Inter`, `Manrope`, `Instrument Sans`; or serif minimal `Instrument Serif`/`Newsreader`.
- **Layout:** Few elements, big margins (≥ 10% of width), clear single focus per screen.
- **Motifs:** None, or a single line, dot or product shot.
- **Do:** Make every remaining element precise: spacing, alignment, weight.
- **Don't:** Mistake "empty" for minimal; minimal is *considered*.
- **CSS/Tailwind:** `max-w-prose`, `py-32`, single accent CSS var.
- **Prompt:** `minimalist composition, single object, vast negative space, soft natural light, muted neutral palette, Dieter Rams aesthetic`

### Maximalism
- **ID:** `maximalism`
- **Origin:** Counter to minimalism; Victorian interiors, Gucci under Michele, contemporary Gen-Z editorial.
- **DNA:** More is more: layered patterns, saturated colour, mixed type, density with curation.
- **Palette:** `#5B2A86` aubergine, `#FF8C42` tangerine, `#2EC4B6` jade, `#F15BB5` fuchsia, `#FFE66D` lemon, `#1B263B` navy
- **Type:** Mixed: `Fraunces` (soft, wonky), `Bricolage Grotesque`, `Shrikhand`.
- **Layout:** Dense collage but with a clear grid underneath; repeated rhythm.
- **Motifs:** Florals over stripes, animal prints, ornament, stickers.
- **Do:** Limit to one dominant pattern + one dominant colour per section.
- **Don't:** Let the CTA drown; maximalism still needs hierarchy.
- **CSS/Tailwind:** Layered backgrounds, `grid-template-areas` collages.
- **Prompt:** `maximalist editorial design, layered florals and stripes, saturated jewel tones, eclectic mixed typography, dense but curated`

### Victorian / Letterpress
- **ID:** `victorian-letterpress`
- **Origin:** 1840–1900 wood-type posters, playbills, apothecary labels.
- **DNA:** Many typefaces per poster, centered stacks, ornament rules, engraved illustrations.
- **Palette:** `#F1E9D2` aged paper, `#2B2118` ink, `#8B1E1E` oxblood, `#1F3A5F` navy, `#B08D57` brass
- **Type:** `Rye`, `Sancreek`, `Ultra`, `Playfair Display SC`, `Abril Fatface`, `Libre Caslon Text`.
- **Layout:** Centered, every line a different face/size, full-width rules, decorative borders.
- **Motifs:** Engraved vignettes, fleurons (❦), banners, rope borders.
- **Do:** Alternate condensed and extended faces line by line.
- **Don't:** Use on screens without strong hierarchy; scale for legibility.
- **CSS/Tailwind:** `text-center`, `font-variant: small-caps`, ornament SVG dividers.
- **Prompt:** `Victorian wood type letterpress poster, multiple typefaces, centered layout, engraved illustrations, ornamental borders, aged paper`
