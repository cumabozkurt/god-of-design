# Benchmark: 52 open-source repos closest to God of Design

> 🇹🇷 Türkçe özet: [benchmark-50-repos.tr.md](benchmark-50-repos.tr.md)

**Data captured:** 2026-10-03 (Europe/Istanbul) with `gh search repos`, `gh api repos/<owner>/<repo>`, `gh api repos/<owner>/<repo>/contents/` and `gh api repos/<owner>/<repo>/readme`.
**Star counts are real values returned by the GitHub API at capture time**, not estimates. They will drift. Every README and root tree in this table was actually fetched and read. The "does well" and "gaps" notes are our own judgement.

The brief said "about 50". We kept 52 because two format/standard repos (DESIGN.md, DTCG) shaped our architecture as much as the skill packs did.

## How the list was built

1. Searches (`--sort stars`): `claude skills`, `agent skills`, `frontend design skill`, `ui ux skill`, `ui-ux-pro-max`, `design skill`, `awesome design`, `awesome design systems`, `design tokens`, `design prompts`, `cursor rules`, `awesome cursorrules`, `AGENTS.md`, `antigravity skills`, `copilot instructions`, `superdesign`, `midjourney prompts`, `awesome-chatgpt-prompts`, `claude code plugin design`.
2. Direct lookups of known design skills (impeccable, taste-skill, emilkowalski/skills, open-design, make-interfaces-feel-better, ui-skills, claude-plugins-official).
3. Dropped anything unrelated to design or agent-instruction packaging (e.g. security skill packs, unrelated apps), then fetched metadata, root tree and README for each kept repo.

## Categories

- **Design skill packs** (the direct competitors): ui-ux-pro-max, taste-skill, impeccable, hallmark, huashu-design, emilkowalski/skills, superdesign-skill, designer-skills, awesome-design-skills, nothing-design, motion-design, material-3, make-interfaces-feel-better, ai-design-skills, stylekit, frontend-design (anthropics/skills)
- **Formats & standards**: Agent Skills (anthropics/skills), DESIGN.md, AGENTS.md, DTCG design tokens
- **Multi-harness packaging & installers**: vercel-labs/skills, superpowers, wshobson/agents, addyosmani/agent-skills, alirezarezvani/claude-skills
- **Curated lists / prompt collections**: awesome-claude-skills (×2), awesome-agent-skills, awesome-claude-code, awesome-copilot, awesome-cursorrules, awesome-design-*, prompts.chat, gpt4o-images, slide prompts

## The table

Ranked by stars. Licence, last push, strengths and gaps for each repo follow in [Per-repo notes](#per-repo-notes).

| # | Repo | ★ Stars | Type |
|--:|------|--------:|------|
| 1 | [obra/superpowers](https://github.com/obra/superpowers) | 294,682 | Methodology skills |
| 2 | [anthropics/skills](https://github.com/anthropics/skills) | 179,479 | Official skills |
| 3 | [f/prompts.chat](https://github.com/f/prompts.chat) | 171,897 | Prompt library |
| 4 | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | 132,669 | Design-intelligence skill |
| 5 | [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) | 119,333 | DESIGN.md collection |
| 6 | [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | 100,659 | Engineering workflow skills |
| 7 | [nexu-io/open-design](https://github.com/nexu-io/open-design) | 99,254 | Design agent app |
| 8 | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) | 92,190 | Anti-slop frontend skills |
| 9 | [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) | 76,404 | Awesome list |
| 10 | [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | 74,660 | Design language + detector |
| 11 | [bradtraversy/design-resources-for-developers](https://github.com/bradtraversy/design-resources-for-developers) | 67,075 | Resource list |
| 12 | [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) | 54,990 | Awesome list |
| 13 | [blader/humanizer](https://github.com/blader/humanizer) | 53,684 | Anti-AI writing skill |
| 14 | [emilkowalski/skills](https://github.com/emilkowalski/skills) | 42,925 | Design-engineering craft |
| 15 | [goabstract/Awesome-Design-Tools](https://github.com/goabstract/Awesome-Design-Tools) | 41,382 | Awesome list |
| 16 | [PatrickJS/awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules) | 40,872 | Cursor rules collection |
| 17 | [wshobson/agents](https://github.com/wshobson/agents) | 40,170 | Plugin marketplace |
| 18 | [github/awesome-copilot](https://github.com/github/awesome-copilot) | 39,651 | Copilot customisations |
| 19 | [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) | 37,330 | Plugin directory |
| 20 | [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) | 35,149 | Awesome list |
| 21 | [vercel-labs/skills](https://github.com/vercel-labs/skills) | 33,024 | Installer CLI |
| 22 | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | 31,873 | Official skills |
| 23 | [Nutlope/hallmark](https://github.com/Nutlope/hallmark) | 29,443 | Anti-slop design skill |
| 24 | [google-labs-code/design.md](https://github.com/google-labs-code/design.md) | 28,220 | Format spec |
| 25 | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | 27,400 | Mega skill library |
| 26 | [alexpate/awesome-design-systems](https://github.com/alexpate/awesome-design-systems) | 26,054 | Awesome list |
| 27 | [agentsmd/agents.md](https://github.com/agentsmd/agents.md) | 24,742 | Format |
| 28 | [alchaincyf/huashu-design](https://github.com/alchaincyf/huashu-design) | 24,567 | HTML-native design skill |
| 29 | [gztchan/awesome-design](https://github.com/gztchan/awesome-design) | 17,594 | Resource list |
| 30 | [travisvn/awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills) | 15,253 | Awesome list |
| 31 | [Jeffallan/claude-skills](https://github.com/Jeffallan/claude-skills) | 11,715 | Full-stack skills |
| 32 | [ibelick/ui-skills](https://github.com/ibelick/ui-skills) | 9,342 | Skill registry |
| 33 | [jamez-bondos/awesome-gpt4o-images](https://github.com/jamez-bondos/awesome-gpt4o-images) | 8,153 | Image prompt cases |
| 34 | [superdesigndev/superdesign](https://github.com/superdesigndev/superdesign) | 7,049 | IDE design agent |
| 35 | [sanjeed5/awesome-cursor-rules-mdc](https://github.com/sanjeed5/awesome-cursor-rules-mdc) | 3,574 | Generated MDC rules |
| 36 | [jakubkrehel/make-interfaces-feel-better](https://github.com/jakubkrehel/make-interfaces-feel-better) | 3,565 | UI polish skill |
| 37 | [bergside/awesome-design-skills](https://github.com/bergside/awesome-design-skills) | 3,024 | Design system skills |
| 38 | [Owl-Listener/designer-skills](https://github.com/Owl-Listener/designer-skills) | 2,823 | Designer skills pack |
| 39 | [dominikmartn/nothing-design-skill](https://github.com/dominikmartn/nothing-design-skill) | 2,805 | Single-style skill |
| 40 | [elayadesign/ai-design-skills](https://github.com/elayadesign/ai-design-skills) | 2,345 | Landing page skill |
| 41 | [design-tokens/community-group](https://github.com/design-tokens/community-group) | 2,138 | W3C DTCG spec |
| 42 | [LottieFiles/motion-design-skill](https://github.com/LottieFiles/motion-design-skill) | 1,874 | Motion skill |
| 43 | [rmyndharis/antigravity-skills](https://github.com/rmyndharis/antigravity-skills) | 1,688 | Antigravity skills |
| 44 | [hamen/material-3-skill](https://github.com/hamen/material-3-skill) | 1,440 | Material 3 skill |
| 45 | [sturobson/Awesome-Design-Tokens](https://github.com/sturobson/Awesome-Design-Tokens) | 1,299 | Tokens list |
| 46 | [instructa/ai-prompts](https://github.com/instructa/ai-prompts) | 1,103 | Prompt & rules collection |
| 47 | [kzhrknt/awesome-design-md-jp](https://github.com/kzhrknt/awesome-design-md-jp) | 984 | Localised DESIGN.md |
| 48 | [raphaelsalaja/userinterface-wiki](https://github.com/raphaelsalaja/userinterface-wiki) | 902 | UI knowledge wiki |
| 49 | [robinstickel/awesome-design-principles](https://github.com/robinstickel/awesome-design-principles) | 775 | Principles list |
| 50 | [superdesigndev/superdesign-skill](https://github.com/superdesigndev/superdesign-skill) | 621 | Design skill (hosted) |
| 51 | [AnxForever/stylekit](https://github.com/AnxForever/stylekit) | 567 | Style library |
| 52 | [SlideSpeak/presentation-design-prompts](https://github.com/SlideSpeak/presentation-design-prompts) | 164 | Slide design prompts |

## Per-repo notes

The "does well" and "gaps" notes are our own judgement after reading each README and file tree.

1. **obra/superpowers** (Methodology skills; MIT licence; last push 2026-09-27)
    - Does well: Best-in-class multi-harness install docs (Claude, Antigravity, Codex, Cursor, Gemini, OpenCode, Copilot, Kimi…) and composable skills.
    - Gaps: Software process, not design.
2. **anthropics/skills** (Official skills; — licence; last push 2026-09-29)
    - Does well: Reference implementation of the Agent Skills format; `frontend-design`, `canvas-design`, `brand-guidelines`, `theme-factory`, `algorithmic-art` set the tone for subject-grounded, opinionated design; plugin marketplace manifest.
    - Gaps: Design skills are short single files; no style atlas, no social/print specs, no tokens, no installer for non-Claude tools.
3. **f/prompts.chat** (Prompt library; NOASSERTION licence; last push 2026-10-03)
    - Does well: World's largest prompt library, CSV/HF dataset, now with Claude plugin.
    - Gaps: General prompts; design prompts are generic.
4. **nextlevelbuilder/ui-ux-pro-max-skill** (Design-intelligence skill; MIT licence; last push 2026-09-27)
    - Does well: Searchable datasets (79 styles, 192 palettes, 74 font pairings, 22 stacks), design-system generator, multi-platform CLI with `uninstall`, 5 README languages.
    - Gaps: Web/app UI only: no print, social sizes, logos, presentations or world art traditions; heavy Python/BM25 data layer; style taxonomy is mostly digital trends.
5. **VoltAgent/awesome-design-md** (DESIGN.md collection; MIT licence; last push 2026-09-21)
    - Does well: Ready DESIGN.md files extracted from real brand sites; clear AGENTS.md vs DESIGN.md split; zero tooling.
    - Gaps: Brand clones, not principles; nothing on non-web media, accessibility, or how to invent an original direction.
6. **addyosmani/agent-skills** (Engineering workflow skills; MIT licence; last push 2026-10-03)
    - Does well: Lifecycle commands (/spec, /plan, /build, /test, /review, /ship), evals, adapters for Claude/Codex/Gemini/OpenCode.
    - Gaps: Not design; useful as a model for multi-harness packaging and evals.
7. **nexu-io/open-design** (Design agent app; Apache-2.0 licence; last push 2026-10-03)
    - Does well: Full local-first design workspace (Claude Design alternative), many runtimes, 14 README languages incl. Turkish.
    - Gaps: Heavy app (Node workspace, cloud upsell); not a lightweight portable knowledge pack you can drop into any agent.
8. **Leonxlnx/taste-skill** (Anti-slop frontend skills; MIT licence; last push 2026-09-26)
    - Does well: Multiple focused skills (minimalist, brutalist, soft, redesign, image-to-code, brand kit, image-gen boards); strong anti-generic stance.
    - Gaps: Frontend-centric; few cultural/historical styles; no print/social specs; install via third-party CLI only, no manifest uninstall.
9. **ComposioHQ/awesome-claude-skills** (Awesome list; — licence; last push 2026-09-18)
    - Does well: Huge curated list incl. canvas-design and brand-guidelines skills; covers many agents.
    - Gaps: List with vendor upsell; quality varies; no unified design system.
10. **pbakaus/impeccable** (Design language + detector; Apache-2.0 licence; last push 2026-10-03)
    - Does well: 24 shared-vocabulary commands (polish, audit, critique, bolder, quieter), 61 deterministic anti-pattern detector rules, PRODUCT.md context, adapters for ~20 harness folders.
    - Gaps: Web UI focus; big multi-language toolchain (Rust/Bun); no world-style atlas, social/print/brand coverage.
11. **bradtraversy/design-resources-for-developers** (Resource list; MIT licence; last push 2026-05-24)
    - Does well: Massive resource index (fonts, colors, icons, illustrations, CSS frameworks).
    - Gaps: Links only; no agent integration.
12. **hesreallyhim/awesome-claude-code** (Awesome list; NOASSERTION licence; last push 2026-10-03)
    - Does well: Well-curated, data-driven (CSV → README generator) list.
    - Gaps: Links only.
13. **blader/humanizer** (Anti-AI writing skill; MIT licence; last push 2026-09-28)
    - Does well: Systematic de-AI-ing of copy based on Wikipedia's 'Signs of AI writing'; before/after evidence.
    - Gaps: Text only, but its pattern list approach is exactly what visual anti-slop needs.
14. **emilkowalski/skills** (Design-engineering craft; MIT licence; last push 2026-10-02)
    - Does well: Concrete, experience-based motion/animation and UI detail rules (easing choice, shadows vs borders).
    - Gaps: Narrow scope (animation & polish); very small; no install manifest.
15. **goabstract/Awesome-Design-Tools** (Awesome list; MIT licence; last push 2024-07-28)
    - Does well: Exhaustive design tools/plugins/UI kits catalogue.
    - Gaps: Last push Jul 2024; tools, not guidance.
16. **PatrickJS/awesome-cursorrules** (Cursor rules collection; CC0-1.0 licence; last push 2026-05-30)
    - Does well: Large catalogue of .cursorrules/.mdc by framework.
    - Gaps: Framework coding rules, almost no visual design; Cursor-only.
17. **wshobson/agents** (Plugin marketplace; MIT licence; last push 2026-10-01)
    - Does well: One Markdown source generating harness-native artifacts for 6 harnesses; capability matrix doc.
    - Gaps: Generic agents; design covered superficially.
18. **github/awesome-copilot** (Copilot customisations; MIT licence; last push 2026-10-01)
    - Does well: Instructions, agents, skills, hooks; `llms.txt`; schema validation.
    - Gaps: Copilot-centric; design content minimal.
19. **anthropics/claude-plugins-official** (Plugin directory; Apache-2.0 licence; last push 2026-10-02)
    - Does well: Canonical Claude Code plugin structure and marketplace install flow (`/plugin install x@marketplace`).
    - Gaps: Directory, not design content.
20. **VoltAgent/awesome-agent-skills** (Awesome list; MIT licence; last push 2026-10-02)
    - Does well: 1000+ hand-picked official/community skills with a per-tool path table.
    - Gaps: Links only; design is a small slice.
21. **vercel-labs/skills** (Installer CLI; MIT licence; last push 2026-10-02)
    - Does well: `npx skills add owner/repo` for 75+ agents; per-agent path knowledge; `use` without installing.
    - Gaps: Generic installer: no design content; path bugs show how fast tool locations change (e.g. Antigravity global dir fix).
22. **vercel-labs/agent-skills** (Official skills; — licence; last push 2026-08-28)
    - Does well: `web-design-guidelines` and React best-practice rules prioritised by impact; Agent Skills format.
    - Gaps: Engineering-first; design guidance limited to web interface guidelines.
23. **Nutlope/hallmark** (Anti-slop design skill; MIT licence; last push 2026-08-06)
    - Does well: Macrostructure selection, 21 themes, 57 slop-test gates and a pre-emit self-critique; `audit`, `redesign`, `study` verbs.
    - Gaps: Landing pages/web only; themes are curated looks, not design traditions; no print/social.
24. **google-labs-code/design.md** (Format spec; Apache-2.0 licence; last push 2026-10-01)
    - Does well: DESIGN.md spec: YAML tokens + prose rationale; linter packages; clean philosophy doc.
    - Gaps: A format, not design knowledge; you still need to know what to put in it.
25. **alirezarezvani/claude-skills** (Mega skill library; MIT licence; last push 2026-08-30)
    - Does well: 388 skills, 13 tools, authoring standard, conventions, sync scripts per harness.
    - Gaps: Breadth over depth; design is a minor category.
26. **alexpate/awesome-design-systems** (Awesome list; Unlicense licence; last push 2026-04-28)
    - Does well: Canonical list of public design systems with tags (components, voice & tone, kits).
    - Gaps: Links only; aging.
27. **agentsmd/agents.md** (Format; MIT licence; last push 2026-09-10)
    - Does well: The AGENTS.md open format adopted by Codex, OpenCode, Cursor, Jules, etc.
    - Gaps: Format only.
28. **alchaincyf/huashu-design** (HTML-native design skill; MIT licence; last push 2026-09-22)
    - Does well: Ships deliverables (launch animations, clickable prototypes, editable decks, infographics); 60 HTML-native styles; references/assets/scripts bundle.
    - Gaps: Chinese-first docs; relies on `npx skills`; Western/Chinese tech aesthetics, little on global craft traditions or print production.
29. **gztchan/awesome-design** (Resource list; — licence; last push 2024-07-04)
    - Does well: Global designer resources incl. typography, color, styleguides, books.
    - Gaps: Unmaintained since 2024.
30. **travisvn/awesome-claude-skills** (Awesome list; — licence; last push 2026-04-28)
    - Does well: Clear explanation of progressive disclosure and how skills load.
    - Gaps: Curated links only; last push Apr 2026.
31. **Jeffallan/claude-skills** (Full-stack skills; MIT licence; last push 2026-08-07)
    - Does well: Context-aware activation with references/ loading; marketplace plugin.
    - Gaps: Developer skills; little visual design.
32. **ibelick/ui-skills** (Skill registry; MIT licence; last push 2026-09-30)
    - Does well: CLI (`npx ui-skills`), MCP registry endpoint, playbook distilled from other design skills.
    - Gaps: Mostly a registry/website; repo README is thin; content lives remotely.
33. **jamez-bondos/awesome-gpt4o-images** (Image prompt cases; NOASSERTION licence; last push 2025-05-26)
    - Does well: 100+ curated image prompts with results; style vocabulary (Ghibli, 3D plush, glass).
    - Gaps: Unmaintained since May 2025; case list, not a method.
34. **superdesigndev/superdesign** (IDE design agent; NOASSERTION licence; last push 2026-06-29)
    - Does well: Pioneered in-IDE design generation with variations.
    - Gaps: Archived/unmaintained; product moved to hosted web app.
35. **sanjeed5/awesome-cursor-rules-mdc** (Generated MDC rules; CC0-1.0 licence; last push 2026-05-19)
    - Does well: Automated generation pipeline for library-specific .mdc rules.
    - Gaps: LLM-generated content; not design.
36. **jakubkrehel/make-interfaces-feel-better** (UI polish skill; MIT licence; last push 2026-08-29)
    - Does well: Micro-details: optical alignment, concentric radii, hit areas, shadows.
    - Gaps: Narrow; tiny README.
37. **bergside/awesome-design-skills** (Design system skills; MIT licence; last push 2026-06-28)
    - Does well: 67 style skills each with SKILL.md + DESIGN.md (brutalism, bento, claymorphism…), one-line pull.
    - Gaps: Pull via TypeUI CLI; styles are UI themes, not art-historical or cultural traditions.
38. **Owl-Listener/designer-skills** (Designer skills pack; MIT licence; last push 2026-09-05)
    - Does well: 273 skills / 76 commands across research, systems, UX strategy, critique, design ops; skill index by situation.
    - Gaps: Process-heavy and Claude/Gemini only; little hands-on visual output (code/SVG/sizes).
39. **dominikmartn/nothing-design-skill** (Single-style skill; MIT licence; last push 2026-04-01)
    - Does well: Shows how one tight visual language (tokens, components, platform mapping) beats vague prompts.
    - Gaps: Single style.
40. **elayadesign/ai-design-skills** (Landing page skill; MIT licence; last push 2026-07-29)
    - Does well: Intake questions + conversion copy + visual system; per-tool copy instructions (Claude, Cursor, Codex, Windsurf).
    - Gaps: One skill so far; manual install.
41. **design-tokens/community-group** (W3C DTCG spec; NOASSERTION licence; last push 2026-09-08)
    - Does well: The standard design-token JSON format ($value/$type) for cross-tool interchange.
    - Gaps: Spec only.
42. **LottieFiles/motion-design-skill** (Motion skill; MIT licence; last push 2026-05-18)
    - Does well: Philosophy-first motion: Disney principles for UI, timing/easing tables, choreography, quality checklist.
    - Gaps: Motion only.
43. **rmyndharis/antigravity-skills** (Antigravity skills; MIT licence; last push 2026-10-01)
    - Does well: 300+ skills ported to Antigravity format with catalog/bundles and CLI.
    - Gaps: Port of generic agents; not design.
44. **hamen/material-3-skill** (Material 3 skill; MIT licence; last push 2026-07-15)
    - Does well: Deep single-system coverage (30+ components, tokens) with versioned release notes and marketplace fix.
    - Gaps: Material only.
45. **sturobson/Awesome-Design-Tokens** (Tokens list; Unlicense licence; last push 2026-02-20)
    - Does well: Historic token resource list.
    - Gaps: Moved off GitHub; README is a pointer.
46. **instructa/ai-prompts** (Prompt & rules collection; MIT licence; last push 2026-05-13)
    - Does well: Table showing how to include prompts in Cursor, Copilot, Zed, Windsurf, Cline.
    - Gaps: Coding prompts; not design-specific.
47. **kzhrknt/awesome-design-md-jp** (Localised DESIGN.md; MIT licence; last push 2026-10-02)
    - Does well: Proves locale typography matters (kinsoku, line-height, palt, font fallback chains) with 50+ Japanese sites.
    - Gaps: Japanese web only.
48. **raphaelsalaja/userinterface-wiki** (UI knowledge wiki; MIT licence; last push 2026-07-29)
    - Does well: High-quality articles and interactive demos on interface craft; ships skills.
    - Gaps: Website-first; not an installable pack.
49. **robinstickel/awesome-design-principles** (Principles list; Unlicense licence; last push 2021-01-11)
    - Does well: Collection of design principles from major systems.
    - Gaps: Unmaintained since 2021.
50. **superdesigndev/superdesign-skill** (Design skill (hosted); MIT licence; last push 2026-08-21)
    - Does well: Design direction, design systems, slides and graphics from coding agents; multi-harness manifests.
    - Gaps: Depends on hosted superdesign.dev service/account.
51. **AnxForever/stylekit** (Style library; MIT licence; last push 2026-10-03)
    - Does well: 148 styles with tokens, component recipes, Tailwind constraints, shadcn registry themes, MCP + CLI.
    - Gaps: Web app/registry; Chinese-first; digital styles, few cultural traditions.
52. **SlideSpeak/presentation-design-prompts** (Slide design prompts; MIT licence; last push 2026-09-30)
    - Does well: 128 slide themes, each a full prompt with hex palette, Google Fonts, layout grammar and avoid-list.
    - Gaps: Slides only; paste-in prompts, no agent install.

## Cross-cutting findings

| Finding | Evidence | What God of Design does about it |
|---|---|---|
| **The best packs are opinionated, not encyclopedic.** | anthropics `frontend-design`, impeccable, hallmark, taste-skill all win by refusing defaults and forcing a point of view. | Every skill opens with a decision procedure ("pick a direction, commit, then build"). The style atlas tells you what each style refuses, not only what it is. |
| **Anti-slop is the #1 demand.** | hallmark (57 gates), impeccable (61 detector rules), taste-skill, superdesign ("stop shipping AI-slop UI"), humanizer for text. | `god-anti-slop` has an explicit catalogue of visual, typographic, layout, copy and image-gen tells, each with a fix, plus a scored rubric in `god-review`. |
| **Coverage is web-UI only.** | None of the top 16 design packs covers print production (bleed, CMYK, paper sizes), all social platform specs, logo construction and presentations *together*. | 19 skills spanning UI/UX, mobile, social media, print, branding/logo, presentations, motion, data viz, illustration and image generation. |
| **Styles are digital trends, not design history or world cultures.** | ui-ux-pro-max (79 styles), stylekit (148), awesome-design-skills (67) list glassmorphism, bento, brutalism and similar. Only awesome-design-md-jp addresses one non-Western locale, Japan. | A style atlas of 100+ entries across Western movements, digital UI styles, retro/subculture looks and **world traditions** (Islamic geometric, Ottoman/Turkish, Persian, Japanese, Chinese, Korean, Indian, African, Latin American, Nordic, Slavic, Aboriginal-with-protocol…), with respectful-use notes. |
| **Locale typography is ignored.** | awesome-design-md-jp shows CJK needs different line-height, kinsoku and font fallback chains. | `god-typography` covers multi-script setting: Arabic/Persian RTL, CJK, Devanagari, Thai, Cyrillic, and Turkish glyph support (ğ ş ı İ). |
| **Installation is fragmented and uninstall is rare.** | Only ui-ux-pro-max documents `uninstall`. Most packs say "copy this folder" or depend on `npx skills`. Tool paths keep moving: vercel-labs/skills PR #1794 fixed Antigravity's global dir. | One-line `install.sh` / `install.ps1` / Node CLI, with `--tool` and `--global/--project`, a manifest, and an uninstall that removes only what was installed. Paths were re-checked against the official docs on 2026-10-03. |
| **`.agents/skills` became the cross-tool meeting point.** | Codex, Cursor, Gemini CLI, OpenCode and Antigravity (workspace) all read `.agents/skills`. Claude Code reads `.claude/skills`. | The default `--tool all` writes to `~/.claude/skills` + `~/.agents/skills` + `~/.gemini/config/skills`. Three shared folders cover nine tools without a copy per tool. When you pick tools yourself, the installer never writes a second copy into a folder a tool already reads (Gemini CLI warns about duplicates; OpenCode lists each name once). |
| **Single-file bundles help non-agent LLMs.** | prompts.chat CSV/HF dataset, awesome-copilot `llms.txt`, SlideSpeak paste-in prompts. | `dist/GOD-OF-DESIGN.md` is the full pack in one file for ChatGPT/Gemini web/any LLM, plus `llms.txt`. |
| **Concrete numbers beat adjectives.** | SlideSpeak pins hex values and named Google Fonts. DESIGN.md pairs tokens with prose. | Every style entry ships hex palettes, named Google Fonts, layout rules, CSS/Tailwind hints and an image-gen prompt fragment. |
| **Multi-harness packs use one source + thin adapters.** | wshobson/agents, superpowers, impeccable ship one Markdown source and generate per-harness artifacts. | `skills/` is the single source of truth. `adapters/` holds thin rule files for Cursor, Windsurf, Cline, Copilot, Antigravity, Gemini and Codex. |
| **CI validation of skills is uncommon.** | Only a few (awesome-copilot schemas, alirezarezvani yamllint, addyosmani evals) validate. | GitHub Actions validates frontmatter and YAML safety, name/dir match, description length, internal links and anchors, style-entry completeness and GitHub rendering (no sideways-scrolling tables), and runs installer round-trip tests on Linux, macOS and Windows. |

## Top takeaways

1. Opinion beats volume. Ship decision procedures and refusals, not just catalogues.
2. Anti-slop has to be explicit, testable and paired with fixes.
3. The market gap is breadth across **media** (print, social, brand, slides) and across **cultures and design history**.
4. Installation has to be one line, cross-tool, and fully reversible.
5. Keep one canonical source and thin adapters. Re-verify tool paths often, because they move.
