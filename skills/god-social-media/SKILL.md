---
name: god-social-media
description: Social media design at exact platform specs - Instagram (feed 4:5, square, Stories/Reels 9:16, carousel), TikTok, YouTube (thumbnails, banners, Shorts), Facebook, LinkedIn, X/Twitter, Pinterest, Threads, Bluesky, Snapchat, WhatsApp, Telegram - with safe zones, carousel storytelling, thumbnail psychology, templates and HTML/SVG export recipes. Use for any social post, story, ad creative, cover, banner, avatar or thumbnail.
license: MIT
compatibility: Agent Skills standard (Claude Code, Codex, OpenCode, Cursor, Gemini CLI, Antigravity, Copilot)
metadata:
  pack: god-of-design
  version: "1.0.0"
---

# God Social Media

## Procedure

1. **Platform + format + goal.** For example: "Instagram carousel, 1080×1350, goal: saves". Load the exact spec from `references/platform-specs.md`.
2. **Safe zones.** Keep text and faces out of UI overlays (9:16 formats: top ~250px and bottom ~340px on a 1920px-high canvas, plus a right-side action rail on TikTok/Reels). Profile-photo crops are circular.
3. **Thumb-stopping hierarchy:** one idea per frame, readable at phone size (the headline must work at ~30% scale), a big contrast focal point, and a face or object for emotion.
4. **Type minimums** on a 1080px-wide canvas: headline ≥ 64px, body ≥ 32px, captions ≥ 28px. Max ~20–25 words per frame.
5. **Brand consistency:** same grid, type and colour system across a series. Vary the layout within the system.
6. **Export:** PNG for graphics and text (sRGB), JPG ≥ 85% quality for photos, MP4 H.264 + AAC for video (30 fps, ≤ the platform bitrate). Name files `platform_format_campaign_v1.png`.
7. **Accessibility:** alt text, captions, sufficient contrast, camelCase hashtags.

## Carousel storytelling (Instagram / LinkedIn)

1. **Hook frame:** a bold promise or question, plus a visual cue to swipe (→, a cut-off element crossing the edge).
2. **Frames 2…n-1:** one point each, consistent position for headline and number (2/8).
3. **Last frame:** summary + CTA ("Save this", "Follow for part 2").
- Design continuous panoramas by building one wide canvas (e.g. 5400×1350 for 5 frames) and slicing it into 1080px-wide frames.
- LinkedIn carousels are uploaded as PDF documents (each page = one slide). Use 1080×1350 or 1080×1080 pages.

## YouTube thumbnail formula

1280×720 (16:9), < 2MB (JPG/PNG/GIF/WEBP). Use 1 face with a clear emotion + 1 object + ≤ 4 words in huge type. High contrast between subject and background. Avoid the bottom-right corner (timestamp overlay). Test at 168×94px: it must still read.

## Generation recipes

- **HTML/CSS → PNG:** build a fixed-size `<div style="width:1080px;height:1350px">`, then screenshot it with Playwright: `npx playwright screenshot --viewport-size=1080,1350 file.html out.png` (or `page.screenshot`). See `god-output`.
- **SVG:** use `viewBox="0 0 1080 1350"` with embedded fonts or text converted to paths for portability.
- **Canva:** use the exact dimensions as a custom size, or the Canva MCP/Connect API autofill with brand kit (see `god-output`).
- **Image generation:** state the aspect ratio explicitly (`--ar 4:5` Midjourney, `aspect_ratio: "9:16"` in APIs) and leave negative space for text. Add text afterwards in code, because generated text is often misspelled.

See `references/platform-specs.md` for all sizes, and `references/content-patterns.md` for post archetypes.
