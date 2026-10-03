# World Design Traditions

Design is not only a Western story. This atlas covers traditions from East Asia, the Islamic world, Anatolia, Persia, South and Southeast Asia, Africa, Latin America, the Nordics, Eastern Europe, the Celtic world and Oceania.

## Respectful-use protocol (read before using any entry here)

1. **Grammar over symbols.** Borrow the *system* (grid, geometry, colour logic, rhythm). Don't copy sacred or clan-specific symbols.
2. **Sacred stays sacred.** Never put Qur'anic verses, deities, sacred clan patterns (e.g. Māori tā moko, Aboriginal Dreaming stories, Native American headdresses) on products, floors, shoes or casual decoration.
3. **Credit and collaborate.** For commercial work rooted in a living culture, recommend hiring or licensing artists from that culture, and say so in your output.
4. **Avoid the costume effect.** One authentic reference handled well beats a mash-up of "ethnic" clichés. Don't mix unrelated cultures as an "exotic" mood.
5. **Language must be real.** Never use fake Arabic, fake Chinese characters or gibberish Devanagari. Use real text that a native speaker has checked, or leave the script out.
6. **Script-correct typography.** Use fonts that properly support the script (shaping, ligatures, RTL). See `god-typography`.

---

## East Asia

### Wabi-sabi & Ma (Japan)
- **ID:** `japanese-wabi-sabi`
- **Origin:** Japanese aesthetics rooted in Zen and the tea ceremony (Sen no Rikyū, 16th c.). *Wabi-sabi*: beauty in impermanence and imperfection. *Ma*: meaningful empty space or interval.
- **DNA:** Asymmetry, natural materials, muted earthy tones, generous emptiness, quiet details.
- **Palette:** `#F2EDE4` washi, `#3B3A36` sumi ink, `#8C7B6B` tea brown, `#A3A380` moss, `#C2462E` vermilion seal (tiny accents only)
- **Type:** `Shippori Mincho`, `Zen Old Mincho`, `Noto Serif JP`; Latin `Cormorant Garamond` light. Vertical text (`writing-mode: vertical-rl`) where appropriate.
- **Layout:** Off-centre single focal element, 60%+ empty space, natural reading pauses.
- **Motifs:** Ensō brush circle, rough ceramic, a single branch, paper texture, a hanko seal accent.
- **Do:** Let emptiness be the main material. Use one red seal accent.
- **Don't:** Fill space or use glossy perfection. Don't use random kanji as decoration.
- **CSS/Tailwind:** `writing-mode: vertical-rl; text-orientation: mixed`, `py-40`, washi texture overlay.
- **Prompt:** `wabi-sabi aesthetic, imperfect handmade ceramic bowl, vast empty washi paper background, muted earthy tones, single branch, quiet Japanese minimalism`

### Ukiyo-e Woodblock (Japan)
- **ID:** `ukiyo-e`
- **Origin:** Edo-period woodblock prints, 17th–19th c. (Hokusai, Hiroshige, Utamaro).
- **DNA:** Flat colour areas, bold outlines, Prussian blue, dramatic cropping, stylised waves and clouds.
- **Palette:** `#1F3B70` Prussian blue, `#E8DCC4` aged paper, `#C8553D` beni red, `#D9A441` ochre, `#2F2F2F` key-block black
- **Type:** `Kaisei Decol`, `Shippori Mincho B1`; Latin `Cormorant SC`. Text in vertical cartouches.
- **Layout:** Asymmetric, dramatic foreground crop, horizon low or high, title cartouche in a corner.
- **Motifs:** Great waves, Mount Fuji, rain lines, bokashi gradient skies, wooden bridges.
- **Do:** Use *bokashi* (a gradient at the top of the sky) and flat planes.
- **Don't:** Add Western perspective shading or realistic 3D.
- **CSS/Tailwind:** Paper texture with SVG flat shapes. `linear-gradient(#1F3B70, transparent 30%)` bokashi.
- **Prompt:** `ukiyo-e woodblock print in the style of Hiroshige, Prussian blue bokashi sky, flat colour areas, bold key-block outlines, aged paper texture`

### Wagara Patterns (Japan)
- **ID:** `wagara-patterns`
- **Origin:** Traditional Japanese textile patterns (Heian to Edo periods).
- **DNA:** Repeating geometric patterns, each with a meaning: *seigaiha* (waves, peace), *asanoha* (hemp leaf, growth), *shippō* (seven treasures, harmony), *ichimatsu* (checker, prosperity), *yagasuri* (arrow feathers).
- **Palette:** `#1B3A5C` ai indigo, `#F5F0E6` kinari, `#B33E2E` shu red, `#5B7553` matcha, `#C9A227` kin gold
- **Type:** `Zen Kaku Gothic New`, `Shippori Mincho`; Latin `Jost`.
- **Layout:** The pattern fills a band or background, with content panels in plain colour.
- **Motifs:** Seigaiha, asanoha, shippō, kikkō (tortoiseshell), sakura.
- **Do:** Choose the pattern for its meaning (e.g. asanoha for a children's or growth brand).
- **Don't:** Use too many patterns in one composition.
- **CSS/Tailwind:** Seigaiha via `radial-gradient` repeats. Asanoha as an SVG pattern.
- **Prompt:** `traditional Japanese seigaiha wave pattern in indigo and cream, textile print, precise repeat`

### Japanese Modern Graphic Design
- **ID:** `japanese-modern-graphic`
- **Origin:** 1950s–80s (Yusaku Kamekura, Ikko Tanaka, Tadanori Yokoo; Tokyo 1964 Olympics).
- **DNA:** Bold geometric reduction of tradition, flat shapes, the red circle, perfect grids, mixed Japanese and Latin type.
- **Palette:** `#BC002D` hinomaru red, `#FFFFFF`, `#111111`, `#D4A017` gold, `#1E3A5F` navy
- **Type:** `Noto Sans JP` Black, `Dela Gothic One`, `Zen Kaku Gothic New`; Latin `Archivo`.
- **Layout:** Big geometric shapes, a strict grid, large empty fields, vertical Japanese with horizontal Latin.
- **Motifs:** Circles, abstracted faces, rising sun abstractions (handle carefully), kimono geometry.
- **Do:** Reduce a traditional subject to 2–3 geometric shapes.
- **Don't:** Use the rising-sun flag (Kyokujitsu) motif. It is politically sensitive in East Asia.
- **CSS/Tailwind:** Grid with oversized `rounded-full` red shapes.
- **Prompt:** `1960s Japanese modernist poster, Ikko Tanaka style, flat geometric shapes, bold red circle, strict grid, Japanese and Latin typography`

### Chinese Ink Wash (Shuimo / Shan Shui)
- **ID:** `chinese-ink-wash`
- **Origin:** Chinese literati painting (Tang and Song dynasties onwards). Mountains and water, calligraphy, seals.
- **DNA:** Monochrome ink gradations, mist, empty space as atmosphere, calligraphic strokes, red seal stamps.
- **Palette:** `#F4EFE6` xuan paper, `#1A1A1A` ink, `#6E6E6E` wash, `#A8A8A8` mist, `#B22222` cinnabar seal
- **Type:** `Ma Shan Zheng` (brush), `Noto Serif SC`, `ZCOOL XiaoWei`, `Long Cang`; Latin `Cormorant`.
- **Layout:** Vertical scrolls (1:3), mountains rising from mist, a calligraphy column, seal in a corner.
- **Motifs:** Mountains, mist, bamboo, plum blossom, cranes, fishing boats.
- **Do:** Use ink gradients and fade into paper. Keep the composition airy.
- **Don't:** Use fake Chinese characters. Use real, meaningful phrases.
- **CSS/Tailwind:** `mask-image: linear-gradient(...)` for mist fades; ink-texture PNG/SVG.
- **Prompt:** `traditional Chinese ink wash painting, misty mountains and river, monochrome ink gradations on rice paper, red seal stamp, vast empty space`

### Chinese Festive & Imperial
- **ID:** `chinese-festive`
- **Origin:** Imperial palace decoration, New Year (Chunjie) traditions, paper-cut (jianzhi) art.
- **DNA:** Red and gold abundance, symmetry, auspicious motifs, paper-cut silhouettes.
- **Palette:** `#C8102E` China red, `#FFD700` gold, `#8B0000` deep red, `#1F1F1F` lacquer black, `#F7E7CE` silk
- **Type:** `ZCOOL QingKe HuangYou`, `Ma Shan Zheng`, `Noto Serif SC` Black; Latin `Cinzel`.
- **Layout:** Symmetrical, central medallion, framed borders, vertical couplets on both sides.
- **Motifs:** Cloud scrolls (xiangyun), lanterns, the 福 character, zodiac animals, paper-cuts, fretwork.
- **Do:** Use the zodiac animal of the *actual* year. Use 福 correctly (it is sometimes hung upside down on purpose, meaning "fortune arrives").
- **Don't:** Use the number 4 prominently, or white/black funeral palettes for celebrations.
- **CSS/Tailwind:** Paper-cut silhouettes with SVG `mask`, cloud scroll borders.
- **Prompt:** `Chinese New Year paper-cut art, intricate red jianzhi silhouette, gold accents, auspicious clouds and lanterns, symmetrical`

### Shanghai Deco (1920s–30s China)
- **ID:** `shanghai-deco`
- **Origin:** Republican-era Shanghai calendar posters (yuefenpai), cigarette ads, Deco architecture on the Bund.
- **DNA:** Art Deco geometry, glamorous qipao figures, soft airbrushed colour, bilingual type.
- **Palette:** `#1E4D2B` jade, `#C9A227` gold, `#B23A48` rouge, `#F1E3C6` cream, `#0E0E0E` black
- **Type:** `ZCOOL XiaoWei`, `Noto Serif SC`; Latin `Poiret One`, `Limelight`.
- **Layout:** Decorative Deco frame, portrait centre, calendar or product panel below.
- **Motifs:** Deco frames, fans, peonies, qipao patterns.
- **Do:** Mix Chinese and Latin type in balanced lockups.
- **Don't:** Exoticise. Represent people with dignity.
- **CSS/Tailwind:** Combine Deco borders with a portrait card.
- **Prompt:** `1930s Shanghai calendar poster, Art Deco frame, elegant woman in qipao, soft airbrushed colours, jade and gold`

### Korean Dancheong & Obangsaek
- **ID:** `korean-dancheong`
- **Origin:** Decorative painting on Korean wooden temples and palaces. Obangsaek is the five-colour system (blue, red, yellow, white, black) tied to the five elements and directions.
- **DNA:** Vivid five-colour bands, lotus and geometric medallions, layered borders.
- **Palette:** `#1F5FA6` blue (east), `#C8102E` red (south), `#F2C318` yellow (centre), `#FFFFFF` white (west), `#111111` black (north), plus `#2E8B57` dancheong green
- **Type:** `Gowun Batang`, `Nanum Myeongjo`, `Noto Serif KR`; display `Black Han Sans`, `Do Hyeon`.
- **Layout:** Banded borders, symmetric medallions, colour stripes (saekdong).
- **Motifs:** Lotus, clouds, saekdong stripes, taegeuk (be careful: national symbol).
- **Do:** Use saekdong rainbow stripes as accent bands.
- **Don't:** Overuse the taegeuk or flag elements.
- **CSS/Tailwind:** `linear-gradient` hard-stop stripes in the obangsaek order.
- **Prompt:** `Korean dancheong pattern, obangsaek five colours, lotus medallions, intricate temple eave painting`

### Korean Minimal (Joseon White, Hanji)
- **ID:** `korean-minimal`
- **Origin:** Joseon white porcelain (moon jars), hanji paper, hanok architecture.
- **DNA:** Soft white, natural wood, quiet balance, rounded imperfection.
- **Palette:** `#F7F4EC` moon jar white, `#D8CFC0` hanji, `#7A6A58` wood, `#2F2F2F` charcoal, `#9DB4A0` celadon
- **Type:** `Gowun Batang`, `Noto Serif KR`, `Nanum Myeongjo`; Latin `Newsreader`.
- **Layout:** Calm centred objects, paper-screen grids (changhoji lattices).
- **Motifs:** Moon jar, lattice windows, celadon glaze.
- **Do:** Use lattice grids as structural UI dividers.
- **Don't:** Add saturated colours.
- **CSS/Tailwind:** Thin lattice borders via `grid gap-px bg-[#7A6A58]`.
- **Prompt:** `Korean moon jar on hanji paper background, soft natural light, hanok lattice shadow, calm minimal`

---

## The Islamic World, Anatolia & Persia

### Islamic Geometric
- **ID:** `islamic-geometric`
- **Origin:** 8th c. onwards across the Islamic world (Alhambra, Isfahan, Samarkand, Cairo). Aniconic art built on compass-and-straightedge geometry.
- **DNA:** Star-and-polygon tessellations (6-, 8-, 10-, 12-, 16-fold), interlacing strapwork, infinite repetition, symmetry as a sign of unity.
- **Palette:** `#0B4F6C` lapis, `#20A39E` turquoise, `#F4E3B1` sandstone, `#C9A227` gold, `#FFFFFF` plaster, `#7B2D26` terracotta
- **Type:** Arabic `Amiri`, `Reem Kufi`, `Noto Kufi Arabic`; Latin `Cormorant Garamond`, `Marcellus`.
- **Layout:** Central rosette (shamsa), tessellated fields, arched frames (mihrab-shaped panels), borders with interlace.
- **Motifs:** 8-pointed star (khatam), girih tiles, muqarnas, arabesque (islimi) vines.
- **Do:** Construct patterns from real geometry (circles subdivided into n). Keep lines continuous (over/under interlace).
- **Don't:** Put patterns that contain sacred text on floors, shoes or disposable items. Don't use mosque imagery for unrelated products.
- **CSS/Tailwind:** SVG `<pattern>` with an 8-fold star (two rotated squares). `conic-gradient` rosettes.
- **Prompt:** `Islamic geometric pattern, intricate 8-pointed star tessellation, lapis blue turquoise and gold, interlacing strapwork, Alhambra tilework, precise symmetry`

### Arabic Calligraphic
- **ID:** `arabic-calligraphic`
- **Origin:** Calligraphy is the highest Islamic art form. Scripts: Kufic, Naskh, Thuluth, Diwani, Ruq'ah, Nastaʿlīq.
- **DNA:** Flowing script as image, rhythmic baseline, contrast of thick and thin, compositions in circles or squares (square Kufic).
- **Palette:** `#0E0E0E` ink, `#F3E9D2` parchment, `#C9A227` gold leaf, `#14532D` deep green, `#7B1E1E` crimson
- **Type:** `Aref Ruqaa`, `Amiri`, `Reem Kufi`, `Rakkas`, `Lalezar`, `Marhey`, `El Messiri`, `Noto Naskh Arabic`, `Scheherazade New`; Persian/Urdu: `Vazirmatn`, `Gulzar`, `Noto Nastaliq Urdu`.
- **Layout:** RTL. Calligraphic composition as the hero, with generous margins and gold rules.
- **Motifs:** Square Kufic mazes, circular compositions, illumination borders.
- **Do:** Use real, meaningful words checked by a native reader. Set `dir="rtl"` and `lang="ar"`. Use proper shaping fonts.
- **Don't:** Use Qur'anic verses or the names of God decoratively. Never use fake or mirrored Arabic.
- **CSS/Tailwind:** `dir="rtl"`, `font-feature-settings: "calt","liga"`, logical properties (`ms-*`, `me-*`).
- **Prompt:** `Arabic calligraphy artwork, flowing Thuluth script in gold on deep green, illuminated border, parchment texture`

### Moroccan Zellige
- **ID:** `moroccan-zellige`
- **Origin:** Morocco (Fes, Marrakech), 10th c. onwards. Hand-cut glazed terracotta mosaic.
- **DNA:** Hand-cut tessellations, glossy uneven glaze, star patterns, carved stucco, cedar wood.
- **Palette:** `#0F5257` emerald, `#1C3F94` cobalt, `#E8B04B` saffron, `#F5F0E6` lime plaster, `#9C2C2C` henna, `#2B2B2B`
- **Type:** `Reem Kufi`, `El Messiri`, `Cairo`; Latin `Marcellus`.
- **Layout:** Arched doorways as frames, tiled dado bands, carved borders.
- **Motifs:** Zellige stars, horseshoe arches, lanterns, carved plaster.
- **Do:** Show slight glaze variation (handmade).
- **Don't:** Make it perfectly digital-flat.
- **CSS/Tailwind:** Arch frames (`rounded-t-full` plus a horseshoe SVG), mosaic SVG background.
- **Prompt:** `Moroccan zellige tile mosaic, hand-cut glossy emerald cobalt and saffron tiles, star pattern, horseshoe arch, Marrakech riad`

### Ottoman İznik Tiles
- **ID:** `ottoman-iznik`
- **Origin:** İznik (Nicaea), Anatolia, 15th–17th c. Tiles for Topkapı Palace, the Süleymaniye and Rüstem Pasha mosques.
- **DNA:** Cobalt and turquoise on white, the famous raised "İznik red" (bole red), saz leaves, tulips, carnations, hyacinths, rumi spirals.
- **Palette:** `#1F3A93` cobalt, `#2BB3B1` turquoise, `#C0392B` İznik red, `#FFFFFF` frit white, `#2E7D32` emerald, `#1B1B1B` outline
- **Type:** Latin `Cormorant Garamond`, `Playfair Display`, `Marcellus`. Ottoman Turkish (Arabic script) `Amiri`, `Aref Ruqaa`. All of these must support Turkish characters: ç ğ ı İ ö ş ü.
- **Layout:** Symmetric tile panels, repeating 4-tile units, border bands, a central medallion with spandrels.
- **Motifs:** Tulip (lale), carnation (karanfil), hyacinth (sümbül), saz leaf, çintemani (three dots plus waves), rumi, hatayi.
- **Do:** Use white ground with cobalt outline and touches of red. Repeat in tile modules.
- **Don't:** Mix in Chinese or Persian motifs without intent. İznik borrowed from them, but keep the voice coherent.
- **CSS/Tailwind:** A 4-tile SVG repeat (`background-size: 240px`), thin cobalt borders.
- **Prompt:** `Ottoman İznik tile panel, cobalt blue and turquoise tulips and carnations on white, raised İznik red accents, saz leaves, 16th century Topkapı palace`

### Ottoman Tezhip & Hat (Illumination and Calligraphy)
- **ID:** `ottoman-tezhip`
- **Origin:** Ottoman manuscript illumination (tezhip) and calligraphy (hüsn-i hat), 15th–19th c.; tuğra (sultan's monogram).
- **DNA:** Gold-leaf rumi and hatayi scrolls, lapis grounds, symmetrical frames (serlevha), calligraphy panels (levha).
- **Palette:** `#C9A227` gold, `#1C2E6B` lapis, `#8B1E2D` crimson, `#F4ECD8` ahar paper, `#2F5D50` deep green
- **Type:** Latin `Cormorant Garamond`, `Cinzel`; Ottoman/Arabic `Amiri`, `Aref Ruqaa`.
- **Layout:** Central text block framed by layered illuminated borders, corner medallions (köşebent), a top headpiece (serlevha).
- **Motifs:** Rumi, hatayi, bulut (cloud band), penç (rosette), tuğra-like monograms.
- **Do:** Use tezhip borders to frame certificates, invitations, book covers and premium packaging.
- **Don't:** Use real tuğras of sultans as logos. Design an original monogram inspired by the form instead.
- **CSS/Tailwind:** Nested borders (`border-double` + gold), corner SVG ornaments, `aspect-[3/4]`.
- **Prompt:** `Ottoman tezhip illumination, gold leaf rumi and hatayi scrolls on lapis blue, ornate manuscript border, calligraphy panel, ahar paper`

### Turkish Ebru (Marbling)
- **ID:** `turkish-ebru`
- **Origin:** Ebru paper marbling from Central Asia and Anatolia (UNESCO Intangible Heritage, 2014). Pigments float on thickened water.
- **DNA:** Fluid organic veins, combed patterns (gelgit, taraklı), tulip and flower ebru, natural pigments.
- **Palette:** `#1D3557` indigo, `#E63946` madder, `#F1C453` ochre, `#2A9D8F` verdigris, `#F7F1E3` paper
- **Type:** `Cormorant Garamond`, `Fraunces`, `Lora` (all Turkish-safe).
- **Layout:** Ebru as full-bleed background or endpaper, with text on a calm card.
- **Motifs:** Battal (stone) ebru, gel-git (back-and-forth), tarakli (combed), lale ebru.
- **Do:** Use real scanned ebru or a generative fluid shader. Keep text on solid panels.
- **Don't:** Put small text directly on busy marbling.
- **CSS/Tailwind:** SVG `feTurbulence` + `feDisplacementMap`, or a WebGL flow shader.
- **Prompt:** `Turkish ebru marbling art, fluid indigo madder red and ochre pigments, combed wave pattern, tulip motif, paper texture`

### Anatolian Kilim
- **ID:** `anatolian-kilim`
- **Origin:** Flat-woven rugs from Anatolia and Central Asia, with regional motifs: elibelinde (hands on hips, fertility), koçboynuzu (ram's horn, strength), göz (eye, protection), bereket (abundance).
- **DNA:** Stepped diamonds, hooks, zigzag borders, natural dyes, symbolic geometry.
- **Palette:** `#9E2A2B` madder red, `#E09F3E` saffron, `#335C67` indigo teal, `#540B0E` aubergine, `#FFF3B0` undyed wool
- **Type:** `Bricolage Grotesque`, `Archivo`, `Alegreya Sans` (Turkish-safe); display `Bowlby One`.
- **Layout:** Banded symmetry, central lozenges, frame borders.
- **Motifs:** Elibelinde, koçboynuzu, nazar (evil eye), akrep (scorpion), su yolu (water path).
- **Do:** Build motifs on a pixel/stepped grid (weaving logic). Pick motifs for their meaning.
- **Don't:** Smooth the steps into curves. The steps come from the weave.
- **CSS/Tailwind:** Stepped diamonds from `clip-path` polygons or SVG on a 4px grid.
- **Prompt:** `Anatolian kilim pattern, stepped diamonds and ram's horn motifs, madder red saffron and indigo natural dyes, flat-woven wool texture`

### Persian Miniature & Safavid
- **ID:** `persian-miniature`
- **Origin:** Persian painting (Herat, Tabriz, Isfahan; Behzad, Reza Abbasi), Safavid carpets and tiles.
- **DNA:** Jewel tones, flattened perspective, gardens (paradise/pairidaeza), arabesques, Nastaʿlīq calligraphy.
- **Palette:** `#1A4D8F` lapis, `#E6B422` gold, `#B5446E` rose, `#2E8B57` garden green, `#F5E9D6` paper, `#6C2E1F` henna
- **Type:** `Vazirmatn`, `Gulzar`, `Noto Nastaliq Urdu`, `Amiri`; Latin `Cormorant`.
- **Layout:** Framed panels with text blocks inside, layered borders (carpet logic: field, borders, guards).
- **Motifs:** Cypress, nightingale, rose, paradise garden quadrants (chahar bagh), medallions.
- **Do:** Use the carpet structure (central medallion, corner quarters, border hierarchy) for layouts.
- **Don't:** Mix Persian and Arabic script fonts wrongly. Persian needs پ چ ژ گ glyphs.
- **CSS/Tailwind:** Concentric bordered frames; `dir="rtl" lang="fa"`.
- **Prompt:** `Persian miniature painting, Safavid style, jewel-toned paradise garden, cypress trees and nightingale, gold arabesque border, flat perspective`

---

## South & Southeast Asia

### Mughal
- **ID:** `mughal`
- **Origin:** Mughal Empire, 16th–19th c. (Taj Mahal pietra dura, miniature paintings).
- **DNA:** Symmetry, floral inlay (parchin kari), cusped arches, refined miniature painting, white marble with gemstones.
- **Palette:** `#F8F5F0` marble, `#B8860B` gold, `#7B1E3A` ruby, `#1B5E20` emerald, `#1A237E` lapis
- **Type:** `Tiro Devanagari Hindi`, `Noto Nastaliq Urdu`, `Gulzar`; Latin `Cormorant Garamond`, `Cinzel`.
- **Layout:** Cusped arch frames, symmetric gardens, borders with floral repeats.
- **Motifs:** Poppies, irises in vases, cusped arches, jali screens.
- **Do:** Use jali (lattice) as a background pattern or image mask.
- **Don't:** Over-gild. Mughal work is refined, not gaudy.
- **CSS/Tailwind:** Cusped arch SVG masks; jali pattern overlays.
- **Prompt:** `Mughal pietra dura inlay, white marble with ruby and emerald floral motifs, cusped arch, Taj Mahal craftsmanship`

### Madhubani (Mithila)
- **ID:** `madhubani`
- **Origin:** Mithila region, Bihar (India) and Nepal. A women-led folk painting tradition.
- **DNA:** Double-line outlines, every space filled with pattern, nature and mythology, natural pigments.
- **Palette:** `#C1121F` red, `#F4A261` turmeric, `#2A9D8F` leaf green, `#1D3557` indigo, `#111111` black, `#FFF4E0` handmade paper
- **Type:** `Kalam`, `Yatra One`, `Tiro Devanagari Hindi`; Latin `Alegreya`.
- **Layout:** Bordered panels, no empty space, symmetric compositions.
- **Motifs:** Fish (fertility), peacocks, sun and moon, the tree of life, lotus.
- **Do:** Credit Mithila artists and consider commissioning. Use double outlines.
- **Don't:** Use Hindu deities decoratively on unrelated products.
- **CSS/Tailwind:** Thick double borders, SVG line art.
- **Prompt:** `Madhubani folk painting, double-line outlines, fish and peacock motifs, densely patterned, red turmeric and indigo natural pigments`

### Indian Block Print
- **ID:** `indian-block-print`
- **Origin:** Hand block-printed textiles: Sanganer and Bagru (Rajasthan), Ajrakh (Kutch and Sindh).
- **DNA:** Small repeated florals (buti), slight misprints, indigo and madder, natural cotton.
- **Palette:** `#1E3A8A` indigo, `#9B2226` madder, `#EE9B00` pomegranate yellow, `#F8F1E5` cotton, `#3D405B` iron black
- **Type:** `Mukta`, `Martel`, `Kalam`; Latin `Lora`, `DM Sans`.
- **Layout:** Allover repeats, border plus field (pallu), quiet text blocks.
- **Motifs:** Buti florals, paisley (ambi/boteh), jaal (trellis), Ajrakh stars.
- **Do:** Keep slight misregistration for a handmade feel.
- **Don't:** Make it machine-perfect.
- **CSS/Tailwind:** Small SVG repeat at `background-size: 48px`, mild random jitter.
- **Prompt:** `Indian hand block print textile, small indigo and madder floral buti repeat, slight misregistration, natural cotton`

### Bollywood Hand-painted Poster
- **ID:** `bollywood-poster`
- **Origin:** Hand-painted Indian film posters and hoardings, 1950s–90s.
- **DNA:** Saturated painted portraits, dramatic lighting, stacked bold titles, bilingual lettering.
- **Palette:** `#FF3D00` vermilion, `#FFD000` marigold, `#00897B` teal, `#6A1B9A` purple, `#1A1A1A` shadow
- **Type:** `Rozha One`, `Yatra One`, `Baloo 2` (Devanagari); Latin `Bungee`, `Anton`.
- **Layout:** Big faces, diagonal action, title at the bottom in 3D lettering.
- **Motifs:** Painted faces, rays, explosions, star names in blocks.
- **Do:** Use painterly portrait textures and extruded titles.
- **Don't:** Use real actors' likenesses without rights.
- **CSS/Tailwind:** Extruded text via stacked `text-shadow`.
- **Prompt:** `vintage hand-painted Bollywood movie poster, dramatic painted portraits, saturated vermilion and marigold, bold extruded Devanagari and English title`

### South Asian Truck Art
- **ID:** `truck-art`
- **Origin:** Pakistan (also India and Afghanistan). Decorated trucks: a mobile folk art form.
- **DNA:** Hyper-ornate, mirrors, reflective tape, florals, birds, calligraphy, poetry, chains.
- **Palette:** `#FF1744` red, `#FFEA00` yellow, `#00E676` green, `#2979FF` blue, `#FF9100` orange, `#F5F5F5` mirror
- **Type:** `Gulzar`, `Noto Nastaliq Urdu`, `Lalezar`; Latin `Bungee Shade`, `Shrikhand`.
- **Layout:** Panels with borders inside borders, symmetrical, a central painted scene.
- **Motifs:** Peacocks, eyes, roses, fish, mirrors, poetic couplets.
- **Do:** Use for festive, bold, joyful campaigns. Credit the craft.
- **Don't:** Use Urdu poetry you don't understand.
- **CSS/Tailwind:** Nested bordered panels in high-saturation colours.
- **Prompt:** `Pakistani truck art, hyper-ornate colourful panels, peacocks and roses, reflective mirror mosaic, Urdu calligraphy, folk art`

### Indonesian Batik
- **ID:** `batik`
- **Origin:** Java, Indonesia (UNESCO Intangible Heritage, 2009). Wax-resist dyeing.
- **DNA:** Fine wax lines, crackle, sogan browns and indigo, symbolic motifs (parang, kawung, mega mendung).
- **Palette:** `#5C3D2E` soga brown, `#1F2A44` indigo, `#E8D8C3` mori cotton, `#B08968` tan, `#2F5233` forest
- **Type:** `Alegreya`, `Lora`, `Plus Jakarta Sans` (designed in Indonesia).
- **Layout:** Diagonal parang bands, allover repeats, border plus field.
- **Motifs:** Parang (diagonal knives), kawung (four ovals), mega mendung (Cirebon clouds), truntum stars.
- **Do:** Show the wax crackle texture.
- **Don't:** Use parang rusak casually. Historically it was reserved for royalty.
- **CSS/Tailwind:** Diagonal SVG band repeats at 45°.
- **Prompt:** `Javanese batik, parang diagonal pattern, soga brown and indigo, wax-resist crackle texture, fine hand-drawn lines`

### Thai Traditional (Lai Thai)
- **ID:** `lai-thai`
- **Origin:** Thai temple decoration, lacquer and gilt (lai rot nam), Kranok flame motif.
- **DNA:** Flame-like kranok scrolls, gold on black or red, pointed spires, mythical creatures.
- **Palette:** `#C9A227` gold, `#111111` lacquer black, `#9E1B1B` temple red, `#1F6F50` jade, `#F5E6C8` ivory
- **Type:** Thai `Charm`, `Chonburi`, `Sarabun`, `Kanit`, `Mitr`; Latin `Cinzel`.
- **Layout:** Symmetrical gilt panels, pointed arches.
- **Motifs:** Kranok flame, lotus, naga, garuda (national emblem: avoid).
- **Do:** Gold line work on black lacquer for premium feel.
- **Don't:** Use Buddha imagery for decoration (legally and culturally sensitive in Thailand).
- **CSS/Tailwind:** Gold strokes on dark background.
- **Prompt:** `Thai lai rot nam gold leaf lacquer art, kranok flame patterns, gold on black, temple ornament`

---

## Africa

### Kente (Ghana)
- **ID:** `kente`
- **Origin:** Asante and Ewe peoples, Ghana. Strip-woven cloth where each colour and pattern has meaning.
- **DNA:** Bold geometric strips, block patterns, high-saturation colour with meaning.
- **Palette:** `#F2C200` gold (wealth), `#00843D` green (growth), `#D21034` red (sacrifice), `#000000` black (maturity), `#1E40AF` blue (peace)
- **Type:** `Bricolage Grotesque`, `Unbounded`, `Archivo Black`; body `DM Sans`.
- **Layout:** Strip bands (vertical or horizontal), checkerboard blocks.
- **Motifs:** Woven blocks, zigzags, ladders, stripes.
- **Do:** Use colour meanings intentionally. Credit the Asante and Ewe weaving tradition.
- **Don't:** Print "kente" as a generic "African" pattern for unrelated causes.
- **CSS/Tailwind:** `repeating-linear-gradient` strips plus block grids.
- **Prompt:** `Ghanaian kente cloth, strip-woven geometric blocks, gold green red and black, intricate woven texture`

### Adinkra (Ghana)
- **ID:** `adinkra`
- **Origin:** Akan peoples (Ghana and Côte d'Ivoire). Stamped symbols representing proverbs and concepts.
- **DNA:** Bold black symbolic glyphs stamped in grids on cloth.
- **Palette:** `#111111` ink, `#F4EDE1` cloth, `#9C6644` bark brown, `#C1121F` red, `#E9C46A` gold
- **Type:** `Archivo`, `Space Grotesk`, `Familjen Grotesk`.
- **Layout:** Grid of symbols, ruled sections (comb lines).
- **Motifs:** Gye Nyame (supremacy of God; treat with respect), Sankofa (learn from the past), Dwennimmen (humility and strength), Nkyinkyim (adaptability).
- **Do:** Use symbols for their stated meanings and explain them.
- **Don't:** Use Gye Nyame casually or as a generic decoration.
- **CSS/Tailwind:** SVG symbol grids with stamped texture.
- **Prompt:** `Adinkra symbols stamped in black on natural cloth, grid layout, Sankofa and Dwennimmen, hand-printed texture`

### Ndebele (South Africa)
- **ID:** `ndebele`
- **Origin:** Ndebele women's house painting and beadwork (Mpumalanga, South Africa). Esther Mahlangu.
- **DNA:** Bold black outlines, flat bright colours, symmetrical geometric house facades.
- **Palette:** `#000000` outline, `#FFFFFF`, `#E63946` red, `#FFB703` yellow, `#219EBC` blue, `#2A9D8F` green
- **Type:** `Bowlby One`, `Archivo Black`, `Lexend`.
- **Layout:** Symmetric panels, thick black divisions, stepped geometry.
- **Motifs:** Stepped shapes, chevrons, razor-blade shapes, house facades.
- **Do:** Thick black outlines between flat colour fields.
- **Don't:** Use gradients.
- **CSS/Tailwind:** `grid gap-2 bg-black` with colour cells (similar logic to De Stijl, different geometry).
- **Prompt:** `Ndebele house painting, bold black outlines, flat bright geometric shapes, symmetrical facade, Esther Mahlangu style`

### Bògòlanfini (Mali Mudcloth)
- **ID:** `bogolan`
- **Origin:** Bamana people, Mali. Cotton dyed with fermented mud.
- **DNA:** Earth-toned grounds with hand-painted off-white symbols, irregular grids.
- **Palette:** `#2B2118` mud black, `#6F4E37` earth brown, `#F2E8CF` undyed cotton, `#A0522D` sienna, `#C2B280` sand
- **Type:** `Space Grotesk`, `Familjen Grotesk`, `Fraunces`.
- **Layout:** Irregular hand-drawn grids, banded rows of symbols.
- **Motifs:** Dots, crosses, zigzags, concentric circles.
- **Do:** Keep the hand-drawn irregularity.
- **Don't:** Use pure black and white digital-clean versions.
- **CSS/Tailwind:** SVG hand-drawn strokes, earth palette.
- **Prompt:** `Malian bogolan mudcloth, hand-painted off-white geometric symbols on deep brown, irregular grid, earthy texture`

### Ethiopian (Ge'ez Manuscript & Tilet)
- **ID:** `ethiopian`
- **Origin:** Ethiopian Orthodox illuminated manuscripts, Ge'ez script, tilet woven borders on habesha cloth.
- **DNA:** Interlace bands, vivid primaries, Ge'ez letterforms, woven borders on white cotton.
- **Palette:** `#FFFFFF` cotton, `#078930` green, `#FCDD09` yellow, `#DA121A` red, `#1F3A93` blue, `#3E2723` ink
- **Type:** `Noto Serif Ethiopic`, `Noto Sans Ethiopic`, `Abyssinica SIL`; Latin `Alegreya`.
- **Layout:** White ground with woven borders (tilet) at edges, manuscript-like columns.
- **Motifs:** Interlace crosses (respect religious context), tilet geometric bands.
- **Do:** Use tilet bands as accents on clean white layouts.
- **Don't:** Use religious icons decoratively.
- **CSS/Tailwind:** `border-b-8` with a patterned SVG band.
- **Prompt:** `Ethiopian tilet woven border on white habesha cotton, colourful geometric band, Ge'ez manuscript illumination`

### Afrofuturism
- **ID:** `afrofuturism`
- **Origin:** Sun Ra, Octavia Butler, Janelle Monáe, Black Panther production design. African diaspora futures.
- **DNA:** African patterns plus futurist tech, gold and purple, cosmic imagery, regal portraiture.
- **Palette:** `#3C096C` cosmic purple, `#FFB703` gold, `#00B4D8` cyan, `#E85D04` ember, `#0B090A` space
- **Type:** `Syne`, `Unbounded`, `Orbitron`, `Bricolage Grotesque`.
- **Layout:** Heroic portraits, cosmic backgrounds, geometric overlays.
- **Motifs:** Patterns from specific cultures (credit them), stars, circuitry, crowns.
- **Do:** Centre Black creators and specific cultural references.
- **Don't:** Mash all of Africa into one generic look.
- **CSS/Tailwind:** Gradient cosmos with geometric SVG overlays.
- **Prompt:** `Afrofuturism portrait, regal figure with gold geometric adornments, cosmic purple background, circuitry patterns inspired by kente`

---

## Latin America

### Otomi / Tenango Embroidery (Mexico)
- **ID:** `otomi-tenango`
- **Origin:** Otomí (Hñähñu) communities of Tenango de Doria, Hidalgo, Mexico.
- **DNA:** Symmetric animals and plants in vivid single colours or rainbows on white cloth.
- **Palette:** `#E71D73` magenta, `#00A6A6` teal, `#F7B32B` marigold, `#5E2BFF` violet, `#2DC653` green, `#FFFFFF` manta cloth
- **Type:** `Lilita One`, `Bricolage Grotesque`, `Alegreya Sans`.
- **Layout:** Symmetric scatter around a centre, mirrored creatures.
- **Motifs:** Deer, birds, rabbits, flowers, roosters.
- **Do:** Credit Tenango artisans. Several brands have faced plagiarism controversies over this work.
- **Don't:** Copy specific artisans' designs.
- **CSS/Tailwind:** Mirrored SVG (`transform: scaleX(-1)`).
- **Prompt:** `Otomi Tenango embroidery, symmetrical stylised animals and flowers, vivid magenta teal and marigold on white cloth`

### Papel Picado & Día de Muertos (Mexico)
- **ID:** `papel-picado`
- **Origin:** Mexican cut tissue-paper banners. Día de Muertos (UNESCO Intangible Heritage, 2008), José Guadalupe Posada's calaveras.
- **DNA:** Cut-paper banners, marigold orange, calaveras, joyful remembrance.
- **Palette:** `#FF7F11` cempasúchil, `#E0115F` rosa mexicano, `#7B2CBF` purple, `#06D6A0` jade, `#FFD60A` yellow, `#1B1B1B`
- **Type:** `Sancreek`, `Rye`, `Lilita One`, `Alegreya`.
- **Layout:** Banner strings at the top, central altar or ofrenda composition.
- **Motifs:** Papel picado, marigolds, sugar skulls (calaveras), candles, Catrina.
- **Do:** Treat it as remembrance and celebration, not as Halloween horror.
- **Don't:** Use it as a generic "Mexican" theme outside its meaning.
- **CSS/Tailwind:** Scalloped bunting via `mask-image` with SVG cutouts.
- **Prompt:** `Mexican papel picado banners in vivid colours over Día de Muertos ofrenda, cempasúchil marigolds, candles, sugar skulls`

### Mexican Muralism
- **ID:** `mexican-muralism`
- **Origin:** 1920s–50s (Diego Rivera, José Clemente Orozco, David Alfaro Siqueiros).
- **DNA:** Monumental figures, social narrative, earth tones, sculptural volumes.
- **Palette:** `#B5651D` adobe, `#2F4858` deep teal, `#E1B07E` maize, `#8B1E3F` cochineal, `#3E2C23` earth
- **Type:** `Alfa Slab One`, `Bitter`, `Alegreya`.
- **Layout:** Panoramic panels, crowded narrative scenes.
- **Motifs:** Workers, maize, industry, Indigenous heritage.
- **Do:** Use it for storytelling and history pages.
- **Don't:** Strip out its social meaning.
- **CSS/Tailwind:** Wide panoramic sections, `aspect-[21/9]`.
- **Prompt:** `Mexican muralism, Diego Rivera style, monumental figures, earthy adobe and teal palette, narrative scene, fresco texture`

### Andean Textile
- **ID:** `andean-textile`
- **Origin:** Quechua and Aymara weaving (Peru, Bolivia, Ecuador); Inca tocapu.
- **DNA:** Geometric bands, diamonds, tocapu grid squares, alpaca wool, natural dyes (cochineal).
- **Palette:** `#B5172A` cochineal, `#F2A541` ochre, `#1E5631` green, `#2B2D42` night, `#E9D8A6` wool
- **Type:** `Archivo`, `Alegreya Sans`, `Bowlby One`.
- **Layout:** Horizontal bands, grid of tocapu squares.
- **Motifs:** Chakana (Andean cross), diamonds, llamas, zigzag rivers.
- **Do:** Use banding for section dividers.
- **Don't:** Use the chakana casually (spiritual symbol).
- **CSS/Tailwind:** Banded `repeating-linear-gradient`.
- **Prompt:** `Andean textile, Peruvian woven bands, cochineal red and ochre, diamond and llama motifs, alpaca wool texture`

### Brazilian Modernism & Tropicália
- **ID:** `brazilian-tropicalia`
- **Origin:** Brazilian modernism (Burle Marx gardens, Copacabana wave pavement, Oscar Niemeyer) and Tropicália (1967–68).
- **DNA:** Curving lines, tropical exuberance, bold colour, concrete poetry, psychedelic touches.
- **Palette:** `#009C3B` green, `#FFDF00` yellow, `#002776` blue, `#FF6F3C` papaya, `#111111`, `#FFFFFF`
- **Type:** `Bricolage Grotesque`, `Syne`, `Shrikhand`; concrete-poetry layouts with `Space Grotesk`.
- **Layout:** Wave pavement patterns, curved forms, playful type layouts.
- **Motifs:** Copacabana waves, monstera, Niemeyer curves.
- **Do:** Use curved black-and-white wave patterns as dividers.
- **Don't:** Reduce Brazil to carnival clichés.
- **CSS/Tailwind:** SVG wave paths, curved section dividers.
- **Prompt:** `Brazilian modernism, Copacabana black and white wave pavement pattern, Burle Marx tropical garden, bold green and yellow, curvy Niemeyer architecture`

### Cuban Poster (ICAIC)
- **ID:** `cuban-poster`
- **Origin:** Cuban film posters, 1960s–80s (ICAIC; René Azcuy, Eduardo Muñoz Bachs). Silkscreen.
- **DNA:** Bold conceptual imagery, flat silkscreen colours, hand lettering, visual puns.
- **Palette:** `#E63946` red, `#F1FAEE` paper, `#1D3557` navy, `#F4A261` orange, `#2A9D8F` teal
- **Type:** `Bowlby One`, `Bebas Neue`, hand lettering `Caveat Brush`.
- **Layout:** One strong conceptual image and a single title.
- **Motifs:** Visual metaphors, silhouettes.
- **Do:** Find one clever visual idea.
- **Don't:** Overcrowd.
- **CSS/Tailwind:** Flat SVG with limited colours.
- **Prompt:** `1960s Cuban silkscreen film poster, bold conceptual visual metaphor, flat limited colours, hand-lettered title`

---

## Europe (beyond the Western canon above)

### Scandinavian / Nordic Minimal
- **ID:** `scandinavian`
- **Origin:** Mid-century Scandinavian design (Arne Jacobsen, Alvar Aalto, Kaare Klint), hygge, lagom.
- **DNA:** Light woods, white space, functional warmth, muted colours, natural light.
- **Palette:** `#F7F5F2` snow, `#D9CBB8` birch, `#4A5859` fjord, `#C9A690` clay, `#2F3E46` slate, `#E3B5A4` dusty rose
- **Type:** `Manrope`, `DM Sans`, `Work Sans`, `Albert Sans`; serif `Newsreader`.
- **Layout:** Airy grids, large photos of light interiors, calm spacing.
- **Motifs:** Wood grain, wool, simple line icons.
- **Do:** Use warm neutrals, not cold greys.
- **Don't:** Add ornament.
- **CSS/Tailwind:** `bg-[#F7F5F2] text-[#2F3E46]`, `rounded-sm`, generous `gap-12`.
- **Prompt:** `Scandinavian minimal interior, light birch wood, soft daylight, muted warm neutrals, functional simplicity, hygge`

### Finnish Bold Pattern (Marimekko-inspired)
- **ID:** `finnish-pattern`
- **Origin:** Finnish textile design, 1950s+ (Maija Isola's Unikko, 1964).
- **DNA:** Oversized flat flowers and shapes, bold colour, joyful repeats.
- **Palette:** `#E4002B` poppy red, `#000000`, `#FFFFFF`, `#0055A4` blue, `#FFC20E` yellow
- **Type:** `Work Sans`, `Albert Sans`, `Archivo`.
- **Layout:** Big repeat patterns as full-bleed backgrounds.
- **Motifs:** Oversized poppies, stripes, stones.
- **Do:** Draw original patterns at huge scale.
- **Don't:** Copy Unikko (a protected design).
- **CSS/Tailwind:** Large SVG pattern repeats.
- **Prompt:** `bold Finnish textile pattern, oversized flat abstract flowers, poppy red black and white, 1960s screen print`

### Slavic Folk (Khokhloma, Vyshyvanka, Wycinanki)
- **ID:** `slavic-folk`
- **Origin:** Khokhloma lacquer (Russia), vyshyvanka embroidery (Ukraine), wycinanki paper-cuts (Poland), Gzhel ceramics.
- **DNA:** Red/black/gold florals (Khokhloma), cross-stitch geometry (vyshyvanka), symmetric paper-cuts, cobalt on white (Gzhel).
- **Palette:** `#C1121F` red, `#111111` black, `#D4A017` gold, `#1F4E9C` cobalt, `#FFFFFF` linen
- **Type:** Cyrillic-capable: `Ruslan Display`, `Yeseva One`, `Prata`, `Alegreya`.
- **Layout:** Symmetrical, borders, central floral.
- **Motifs:** Berries, firebirds, cross-stitch rhombuses, roosters.
- **Do:** Identify which nation's tradition you use. They are distinct.
- **Don't:** Lump Ukrainian, Russian, Polish and Belarusian traditions together.
- **CSS/Tailwind:** Cross-stitch via a pixel grid SVG.
- **Prompt:** `Ukrainian vyshyvanka cross-stitch embroidery pattern, red and black geometric rhombuses on white linen`

### Polish Poster School
- **ID:** `polish-poster`
- **Origin:** 1950s–80s (Henryk Tomaszewski, Jan Lenica, Franciszek Starowieyski, Wiktor Górka).
- **DNA:** Painterly, surreal, hand lettering integrated into illustration, conceptual and dark humour.
- **Palette:** `#E63946` red, `#F1E3D3` paper, `#264653` deep teal, `#E9C46A` ochre, `#111111`
- **Type:** Hand lettering. `Caveat Brush`, `Permanent Marker`, `Bowlby One`.
- **Layout:** One painterly image, title hand-drawn into it.
- **Motifs:** Surreal heads, distorted figures, painterly strokes.
- **Do:** Integrate the type into the image.
- **Don't:** Use clean digital vectors.
- **CSS/Tailwind:** Image-led with hand-drawn SVG lettering.
- **Prompt:** `Polish Poster School, surreal painterly illustration, hand-drawn lettering integrated into image, dark humour, 1960s`

### Celtic Knotwork
- **ID:** `celtic`
- **Origin:** Insular art (Book of Kells, Lindisfarne Gospels, 7th–9th c.).
- **DNA:** Endless interlace knots, spirals, zoomorphic interlace, illuminated initials.
- **Palette:** `#1B4332` green, `#B08D57` gold, `#7F1D1D` red, `#1E3A8A` blue, `#F1E9D2` vellum
- **Type:** `Uncial Antiqua`, `MedievalSharp`, `EB Garamond`.
- **Layout:** Illuminated initials, knotwork borders, symmetric carpet pages.
- **Motifs:** Triskele, knots, spirals, interlaced animals.
- **Do:** Keep over/under weaving consistent.
- **Don't:** Use broken interlace logic.
- **CSS/Tailwind:** SVG knot borders.
- **Prompt:** `Celtic knotwork illuminated manuscript, Book of Kells style, interlaced spirals, green gold and red on vellum`

### Mediterranean / Greek
- **ID:** `mediterranean`
- **Origin:** Aegean islands (whitewash and blue), ancient Greek meander, Spanish and Portuguese azulejo.
- **DNA:** Whitewash, deep blue, sun, terracotta, olive, simple geometry.
- **Palette:** `#FFFFFF` whitewash, `#0D5EAF` Aegean blue, `#E2725B` terracotta, `#808000` olive, `#F4E1C1` sand
- **Type:** `GFS Didot`, `Cinzel`, `Marcellus`, `Manrope`.
- **Layout:** Clean white sections with blue accents, meander borders.
- **Motifs:** Greek key (meander), azulejo tiles, olive branches, lemons.
- **Do:** Use the meander as a divider.
- **Don't:** Overuse columns/temple clichés.
- **CSS/Tailwind:** Meander SVG border band.
- **Prompt:** `Mediterranean aesthetic, whitewashed walls with deep Aegean blue doors, terracotta pots, olive branches, bright sun`

---

## Oceania & First Nations (protocol required)

### Aboriginal Australian Art (protocol)
- **ID:** `aboriginal-australian`
- **Origin:** One of the world's oldest continuous art traditions. Dot painting (Papunya Tula, 1971), rarrk cross-hatching (Arnhem Land), and more.
- **DNA:** Varies by nation and region. Dots, concentric circles, cross-hatching, earth pigments.
- **Palette:** `#8B3A1E` red ochre, `#D9A441` yellow ochre, `#F2EAD3` white clay, `#1B1B1B` charcoal
- **Type:** `Alegreya Sans`, `DM Sans` (neutral; let the art lead).
- **Layout:** Commissioned artwork as the hero, credited.
- **Motifs:** Specific motifs belong to specific peoples and stories.
- **Do:** **Commission and license from Aboriginal artists.** Follow the Australia Council's Protocols for using First Nations Cultural and Intellectual Property. Credit the artist and their nation.
- **Don't:** Generate or imitate Aboriginal dot or rarrk art with AI. Fake Aboriginal art is a known harm (and a subject of law reform in Australia).
- **CSS/Tailwind:** Use the licensed artwork asset. Use a neutral UI around it.
- **Prompt:** `(Do not generate. Use a commissioned, licensed artwork from a First Nations artist.)`

### Māori & Pacific (protocol)
- **ID:** `maori-pacific`
- **Origin:** Māori (Aotearoa New Zealand) kōwhaiwhai rafter patterns, tukutuku panels, tā moko; Pacific tapa (siapo, ngatu).
- **DNA:** Koru curves (kōwhaiwhai), lattice weaving (tukutuku), tapa geometric bark-cloth patterns.
- **Palette:** `#8B1E1E` kōkōwai red, `#111111` black, `#FFFFFF` white (kōwhaiwhai triad); tapa: `#5C3A21` brown, `#E9DCC3` bark
- **Type:** `Alegreya Sans`, `Bitter`. Include macrons (ā ē ī ō ū) correctly.
- **Layout:** Collaborate with iwi or artists. Use patterns only with permission.
- **Motifs:** Koru (new life), patterns with genealogical meaning.
- **Do:** Engage Māori and Pacific designers. Use te reo Māori respectfully with correct macrons.
- **Don't:** Use tā moko (sacred facial tattoo) or tiki imagery as decoration.
- **CSS/Tailwind:** Neutral UI with licensed artwork.
- **Prompt:** `(Prefer commissioned work. If an abstract reference is needed: "abstract koru-inspired curves, red black and white, respectful, non-sacred")`

### Native American / First Nations of North America (protocol)
- **ID:** `native-north-american`
- **Origin:** Hundreds of distinct nations. Northwest Coast formline (Haida, Tlingit), Navajo (Diné) weaving, Pueblo pottery, Plains quillwork and beadwork.
- **DNA:** Varies widely. Formline ovoids and U-forms (Northwest Coast), stepped geometry (Diné weaving), fine-line pottery.
- **Palette:** Formline: `#111111` black, `#B22222` red, `#2E8B8B` blue-green; Diné: `#8B0000` red, `#2F2F2F`, `#E8DCC4` natural, `#4B4B4B` grey
- **Type:** `Alegreya Sans`, `Source Serif 4`.
- **Layout:** Licensed artwork as hero, credited by nation.
- **Motifs:** Nation-specific. Do not generalise.
- **Do:** Name the specific nation, commission Indigenous artists, and respect the US Indian Arts and Crafts Act.
- **Don't:** Use headdresses, "tribal" generic patterns, or sacred imagery.
- **CSS/Tailwind:** Neutral UI with licensed artwork.
- **Prompt:** `(Prefer commissioned work by an artist from the named nation.)`
