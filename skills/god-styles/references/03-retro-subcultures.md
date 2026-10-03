# Retro, Internet & Subculture Aesthetics

---

## The aesthetics

### Y2K

- **ID:** `y2k`
- **Origin:** 1997–2004 (millennium optimism, iMac G3, early web, pop music videos).
- **DNA:** Chrome, translucent plastics, bubble shapes, iridescence, futurist sans type, lens flares.
- **Palette:** `#C0C0C0` chrome, `#A0E7E5` ice blue, `#FFAEBC` bubblegum, `#B4F8C8` mint, `#8E7DBE` lilac, `#0D0D0D`
- **Type:** `Orbitron`, `Michroma`, `Audiowide`, `Syncopate`; body `Exo 2`.
- **Layout:** Floating objects, blobby frames, star sparkles, lots of centre.
- **Motifs:** Chrome blobs, butterflies, sparkles ✦, low-poly 3D, translucent plastic, tribal lines.
- **Do:** Combine chrome type with soft pastel gradients.
- **Don't:** Overload sparkles; keep one hero object.
- **CSS/Tailwind:** Chrome text via `background: linear-gradient(#fff,#999 45%,#eee 55%,#666); -webkit-background-clip:text`.
- **Prompt:** `Y2K aesthetic, liquid chrome 3D blob, iridescent translucent plastic, pastel gradient, sparkles, early 2000s futurism`

### Frutiger Aero

- **ID:** `frutiger-aero`
- **Origin:** 2004–2013 (Windows Vista/7, Wii, early smartphones).
- **DNA:** Glossy, sky-blue, green nature, water bubbles, glass, optimism about tech + nature.
- **Palette:** `#3FA9F5` sky, `#7ED957` grass, `#FFFFFF` gloss, `#0B5394` deep blue, `#E0F7FF` mist
- **Type:** `Frutiger`-like `Hind`, `Nunito Sans`, `Segoe`-like `Noto Sans`.
- **Layout:** Glossy buttons, aqua orbs, nature backgrounds.
- **Motifs:** Bubbles, fish, leaves with dew, lens flare, reflections.
- **Do:** Glossy highlight on top half of buttons.
- **Don't:** Use flat dark mode.
- **CSS/Tailwind:** `linear-gradient(to bottom, rgba(255,255,255,.8), rgba(255,255,255,0) 50%)` gloss overlay.
- **Prompt:** `Frutiger Aero aesthetic, glossy aqua bubbles, green grass and blue sky, glass reflections, Windows Vista era`

### Vaporwave

- **ID:** `vaporwave`
- **Origin:** 2010–2015 internet music/art scene.
- **DNA:** Ironic 80s/90s consumer nostalgia, Greek statues, Windows 95, Japanese text, pink-cyan.
- **Palette:** `#FF71CE` pink, `#01CDFE` cyan, `#05FFA1` mint, `#B967FF` purple, `#FFFB96` pale yellow
- **Type:** `VT323`, `Press Start 2P`, wide-spaced `Monoton`; full-width Japanese characters (Ｖａｐｏｒ).
- **Layout:** Collage of statues, palm trees, grids, windows.
- **Motifs:** Marble busts, palm trees, perspective grid, dolphins, old OS windows.
- **Do:** Use as nostalgic/ironic campaign art.
- **Don't:** Use random Japanese text you can't read; use real words.
- **CSS/Tailwind:** Perspective grid via `linear-gradient` + `transform: perspective() rotateX()`.
- **Prompt:** `vaporwave aesthetic, marble Greek bust, palm trees, pink and cyan gradient, perspective grid, retro computer windows`

### Synthwave / Outrun

- **ID:** `synthwave`
- **Origin:** 2010s revival of 80s sci-fi/arcade/Miami Vice.
- **DNA:** Neon on deep purple night, chrome text, sunset with horizontal stripes, grid floor.
- **Palette:** `#2B0F54` night, `#FF2A6D` neon pink, `#05D9E8` cyan, `#FF9E00` sunset orange, `#D1F7FF` glow
- **Type:** `Monoton`, `Audiowide`, `Orbitron`, chrome script `Yellowtail`.
- **Layout:** Centered sun, horizon grid, chrome title.
- **Motifs:** Striped sun, mountains wireframe, sports cars, palm silhouettes.
- **Do:** Glows via layered text-shadows.
- **Don't:** Use glow on body text.
- **CSS/Tailwind:** `text-shadow: 0 0 4px #fff, 0 0 12px #FF2A6D, 0 0 24px #FF2A6D`.
- **Prompt:** `synthwave outrun, neon pink and cyan, striped retro sunset over wireframe grid, chrome lettering, 1980s`

### Cyberpunk

- **ID:** `cyberpunk`
- **Origin:** Blade Runner (1982), Neuromancer, Akira, Ghost in the Shell, Cyberpunk 2077.
- **DNA:** High tech / low life, neon in rain, dense signage, glitch, HUD overlays.
- **Palette:** `#0D0221` deep, `#FCEE0A` hazard yellow, `#00F0FF` electric cyan, `#FF003C` red, `#711C91` violet
- **Type:** `Orbitron`, `Rajdhani`, `Chakra Petch`, `Share Tech Mono`; CJK signage `Noto Sans JP` Black.
- **Layout:** Angled cut corners, HUD frames, scanlines, layered labels.
- **Motifs:** Glitch, scanlines, barcodes, warning stripes, kanji signs, chamfered panels.
- **Do:** Chamfer corners with `clip-path`; use yellow/black hazard for alerts.
- **Don't:** Glitch-animate content users must read; respect reduced motion.
- **CSS/Tailwind:** `clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))`.
- **Prompt:** `cyberpunk city at night, neon signs in rain, holographic HUD, cyan and magenta with hazard yellow, cinematic`

### Solarpunk

- **ID:** `solarpunk`
- **Origin:** 2010s optimistic eco-futurism.
- **DNA:** Green cities, Art Nouveau curves + solar tech, warm daylight, community.
- **Palette:** `#3A7D44` leaf, `#F2C14E` sun, `#F78154` terracotta, `#4D9DE0` sky, `#FDFBF6` light
- **Type:** `Fraunces`, `Alegreya`, `Quicksand`.
- **Layout:** Lush illustrations, rounded arches, organic frames.
- **Motifs:** Vertical gardens, solar panels, wind turbines, stained glass.
- **Do:** Pair Nouveau ornament with clean tech.
- **Don't:** Make it dystopian.
- **CSS/Tailwind:** Arch masks `rounded-t-full`, warm gradients.
- **Prompt:** `solarpunk city, lush vertical gardens, solar panels with Art Nouveau curves, warm golden daylight, optimistic`

### Steampunk

- **ID:** `steampunk`
- **Origin:** Victorian sci-fi (Verne, Wells), 1980s+ subculture.
- **DNA:** Brass, gears, leather, engraved type, sepia.
- **Palette:** `#B5843B` brass, `#6E4B2A` leather, `#3B2F2F` soot, `#D9C7A3` parchment, `#7C9473` verdigris
- **Type:** `Rye`, `Cinzel Decorative`, `IM Fell English`, `Special Elite`.
- **Layout:** Framed plates, gauges, ornament.
- **Motifs:** Cogs, rivets, pressure gauges, airships, goggles.
- **Do:** Use texture sparingly behind clear text.
- **Don't:** Use for modern SaaS.
- **CSS/Tailwind:** Sepia filter, ornamental borders.
- **Prompt:** `steampunk illustration, brass gears and rivets, Victorian engraving style, sepia parchment, airship`

### Pixel Art / 8-bit

- **ID:** `pixel-art`
- **Origin:** 1980s–90s consoles (NES, SNES, Game Boy).
- **DNA:** Visible pixels, limited palettes, dithering, chunky sprites.
- **Palette:** PICO-8 subset: `#1D2B53`, `#7E2553`, `#008751`, `#FFA300`, `#FF004D`, `#FFF1E8`; Game Boy: `#0F380F` `#306230` `#8BAC0F` `#9BBC0F`
- **Type:** `Press Start 2P`, `Silkscreen`, `Pixelify Sans`, `VT323`.
- **Layout:** Tile-based, integer scaling.
- **Motifs:** Sprites, hearts, coins, dialogue boxes.
- **Do:** Use `image-rendering: pixelated` and integer scaling.
- **Don't:** Mix pixel densities.
- **CSS/Tailwind:** `[image-rendering:pixelated]`, `box-shadow` pixel borders.
- **Prompt:** `16-bit pixel art, limited palette, dithering, retro video game scene, crisp pixels`

### Risograph / Lo-fi Print

- **ID:** `risograph`
- **Origin:** Riso duplicators; indie zines and posters 2010s.
- **DNA:** Spot-colour layers, misregistration, grain, overprint mixing.
- **Palette:** Riso inks: `#FF48B0` fluorescent pink, `#0078BF` blue, `#FFE800` yellow, `#00A95C` green, `#FF6C2F` orange, `#000000`
- **Type:** `Space Grotesk`, `Syne`, `Bricolage Grotesque`, `Archivo`.
- **Layout:** 2–3 ink layers offset by 1–3px, halftones.
- **Motifs:** Grain, halftone, overprint.
- **Do:** Limit to 2–3 inks; overlap with `multiply`.
- **Don't:** Use full RGB photo colour.
- **CSS/Tailwind:** `mix-blend-multiply`, SVG grain, slight translate offsets.
- **Prompt:** `risograph print, two-colour fluorescent pink and blue overprint, misregistration, grainy texture, halftone`

### Rave / Acid Graphics

- **ID:** `acid-rave`
- **Origin:** 1988–1999 rave flyers; 2010s–20s "acid graphics" revival.
- **DNA:** Chrome + liquid type, warped 3D, smileys, rave flyers, Designers Republic.
- **Palette:** `#CCFF00` acid green, `#000000`, `#FF00FF` magenta, `#C0C0C0` chrome, `#00FFFF`
- **Type:** `Unbounded`, `Monoton`, `Rubik Glitch`, `Syne` (extra bold), custom warped type.
- **Layout:** Centred chaos, stretched type, tiny tech labels.
- **Motifs:** Smileys, warped grids, barcodes, chrome blobs, technical labels.
- **Do:** Pair huge warped headline with tiny mono metadata.
- **Don't:** Use for accessible long text.
- **CSS/Tailwind:** `transform: scaleY(1.6)`, SVG displacement.
- **Prompt:** `acid graphics rave flyer, warped chrome typography, acid green and black, technical labels, 1990s`

### Dark Academia

- **ID:** `dark-academia`
- **Origin:** 2010s internet aesthetic (Oxford libraries, classics).
- **DNA:** Old books, tweed, candlelight, serif type, muted browns/greens.
- **Palette:** `#2E2A24` espresso, `#5C4B3B` walnut, `#3E4A3D` hunter green, `#C9B38C` parchment, `#8C2F39` burgundy
- **Type:** `EB Garamond`, `Cormorant Garamond`, `IM Fell English`, `Cinzel`.
- **Layout:** Book-like, centered titles, ornaments, small caps.
- **Motifs:** Quills, busts, ink stains, library ladders.
- **Do:** Use small caps and old-style figures (`onum`).
- **Don't:** Use bright accents.
- **CSS/Tailwind:** `font-variant-numeric: oldstyle-nums`, `font-variant-caps: small-caps`.
- **Prompt:** `dark academia, candlelit old library, leather-bound books, muted brown and green, classical marble bust`

### Cottagecore

- **ID:** `cottagecore`
- **Origin:** 2018+ romanticised rural life.
- **DNA:** Florals, gingham, handwriting, soft light, pastoral.
- **Palette:** `#F6EFE0` cream, `#E8B4B8` rose, `#A3B18A` meadow, `#DDA15E` honey, `#6B4F3A` bark
- **Type:** `Lora`, `Caveat`, `Amatic SC`, `Cormorant`.
- **Layout:** Soft framing, scalloped edges, botanical spot art.
- **Motifs:** Wildflowers, mushrooms, gingham, embroidery.
- **Do:** Hand-drawn accents with a clean body face.
- **Don't:** Use script for body text.
- **CSS/Tailwind:** Scalloped borders via `radial-gradient` masks.
- **Prompt:** `cottagecore illustration, wildflowers and gingham, soft golden light, watercolour, pastoral`

### Kawaii

- **ID:** `kawaii`
- **Origin:** Japan, 1970s+ (Sanrio, Harajuku, Yume kawaii).
- **DNA:** Cute characters with small faces, pastel, rounded everything, stickers.
- **Palette:** `#FFD1DC` pink, `#C1E1C1` mint, `#FDFD96` lemon, `#AEC6CF` baby blue, `#B39EB5` lavender
- **Type:** `Mochiy Pop One`, `Hachi Maru Pop`, `Kosugi Maru`, `Fredoka`.
- **Layout:** Rounded bubbles, sticker clusters.
- **Motifs:** Faces on objects (◕‿◕), stars, hearts, clouds.
- **Do:** Consistent character style; big rounded radii.
- **Don't:** Copy Sanrio characters (trademarks).
- **CSS/Tailwind:** `rounded-full`, pastel `bg-*`, wobble animation.
- **Prompt:** `kawaii illustration, pastel colours, cute objects with tiny faces, rounded shapes, stickers, Harajuku`

### Anime / Manga

- **ID:** `anime-manga`
- **Origin:** Japan; manga screentones, anime cel shading.
- **DNA:** Screentone dots, speed lines, panel layouts, cel-shaded colour.
- **Palette:** Manga: `#000000`, `#FFFFFF`, screentone greys; anime: `#FF6B6B`, `#4ECDC4`, `#FFE66D`, sky `#89CFF0`
- **Type:** `Bangers` (SFX), `Dela Gothic One`, `Noto Sans JP` Black, `RocknRoll One`.
- **Layout:** Irregular comic panels, diagonal splits, SFX lettering.
- **Motifs:** Speed lines, sparkles, sweat drops, screentones.
- **Do:** Use dynamic panel borders for storytelling sections.
- **Don't:** Imitate living artists' signature characters.
- **CSS/Tailwind:** `clip-path` panels, halftone patterns.
- **Prompt:** `anime cel-shaded illustration, vibrant colours, dynamic speed lines, manga screentone accents`

### Blackletter / Gothic

- **ID:** `gothic-blackletter`
- **Origin:** Medieval manuscripts → heavy metal, streetwear, tattoo.
- **DNA:** Fraktur/Textura lettering, dark palette, ornament, symmetry.
- **Palette:** `#0B0B0B` black, `#E8E1D3` bone, `#7A0A0A` blood, `#4B4B4B` iron, `#B89B5E` tarnished gold
- **Type:** `UnifrakturMaguntia`, `UnifrakturCook` (700), `Pirata One`, `Grenze Gotisch`; body `EB Garamond`.
- **Layout:** Centered, symmetrical, framed.
- **Motifs:** Thorns, crowns, ornate frames, daggers.
- **Do:** Use blackletter only for short display words.
- **Don't:** Set paragraphs in blackletter; be aware of historical associations in some contexts.
- **CSS/Tailwind:** `text-center uppercase-none` (blackletter caps are hard to read).
- **Prompt:** `gothic blackletter lettering, ornate dark poster, bone white on black, thorny ornament`

### Grain & Tactile Texture

- **ID:** `tactile-grain`
- **Origin:** 2020s backlash to sterile digital; print nostalgia.
- **DNA:** Film grain, paper texture, imperfect edges, warm muted colours.
- **Palette:** `#EDE6DA` paper, `#2D2A26` ink, `#C46A3B` burnt sienna, `#5E6B5A` moss
- **Type:** `Instrument Serif`, `Fraunces`, `Bricolage Grotesque`.
- **Layout:** Simple layouts given depth by texture.
- **Motifs:** Noise, scans, deckled edges, tape.
- **Do:** Keep grain subtle (3–8% opacity) and static.
- **Don't:** Use heavy grain under small text.
- **CSS/Tailwind:** SVG `feTurbulence` noise as `::after` overlay with `pointer-events:none`.
- **Prompt:** `tactile print aesthetic, subtle film grain, uncoated paper texture, warm muted palette, imperfect edges`

### Vintage Americana / Diner

- **ID:** `vintage-americana`
- **Origin:** 1940s–60s US signage, diners, road trips, sign painting.
- **DNA:** Script logotypes, badges, stars, cream/red/teal, sign-painter lettering.
- **Palette:** `#C1272D` diner red, `#F4E1C1` cream, `#2A9D8F` teal, `#1D3557` navy, `#E9C46A` mustard
- **Type:** `Yellowtail`, `Lobster`, `Pacifico`, `Alfa Slab One`, `Bebas Neue`.
- **Layout:** Badge lockups, banners, arched text.
- **Motifs:** Stars, chevrons, checkerboard floors, neon tubes.
- **Do:** Arch text with SVG `<textPath>`.
- **Don't:** Overuse Lobster (a cliché); pick a less common script.
- **CSS/Tailwind:** SVG badges, `font-feature-settings` for script alternates.
- **Prompt:** `vintage americana diner sign, red and cream, script lettering, chrome and neon, 1950s roadside`

### Tiki / Mid-century Tropical

- **ID:** `tiki-tropical`
- **Origin:** 1950s–60s American Polynesian pop (an outsider fantasy, be careful).
- **DNA:** Tropical leaves, bamboo, warm sunsets, hand-lettered type.
- **Palette:** `#F28C28` mango, `#2E8B57` palm, `#7A4E2D` bamboo, `#F2D7A7` sand, `#1B4965` lagoon
- **Type:** `Bungee`, `Rye`, `Kavoon`, `Lilita One`.
- **Layout:** Framed posters, bamboo borders.
- **Motifs:** Monstera, hibiscus, palm, sunsets.
- **Do:** Prefer botanical/tropical over pseudo-Polynesian deities.
- **Don't:** Use sacred Māori/Polynesian imagery (tiki gods) as decoration.
- **CSS/Tailwind:** Leaf SVG overlays.
- **Prompt:** `mid-century tropical poster, monstera and hibiscus, warm sunset, hand-lettered type, screen print`
