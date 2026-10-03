---
name: god-dataviz
description: Data visualization and information design - choosing the right chart, dashboards, infographics, color for data (sequential, diverging, categorical, color-blind safe), labeling and annotation, chart decluttering, tables, maps, and implementation with SVG, D3, Chart.js, Recharts, Vega-Lite or ECharts. Use when presenting numbers, building charts or dashboards, or designing infographics and reports.
license: MIT
compatibility: Agent Skills standard (Claude Code, Codex, OpenCode, Cursor, Gemini CLI, Antigravity, Copilot)
metadata:
  pack: god-of-design
  version: "1.1.2"
---

# God Data Viz

## Procedure

1. **The one message.** Write the takeaway as a sentence. It becomes the chart title.
2. **Pick the chart by the question:**

| Question | Chart |
|---|---|
| Compare categories | Horizontal bar (sorted); dot plot |
| Change over time | Line (≤ 5 series); area for totals; column for few periods |
| Part-to-whole | Stacked bar / 100% bar; donut only for 2–4 parts; treemap for many |
| Distribution | Histogram, box/violin, beeswarm |
| Relationship | Scatter (+ trend line), bubble (careful) |
| Ranking over time | Bump chart, slope chart |
| Geography | Choropleth (normalise per capita!), proportional symbols |
| Flow | Sankey, alluvial |
| Single KPI | Big number + delta + sparkline |
| Precise lookup | Table (with conditional formatting) |

3. **Declutter:** remove chart borders, heavy gridlines (keep light horizontal ones), 3D, shadows and legends (label lines directly). Start bar axes at zero. Use tabular numerals, sensible rounding, and units in labels.
4. **Highlight:** grey for context, accent colour for the story. Annotate the key point ("Launch → +32%").
5. **Colour scales:** sequential (one hue, light→dark: viridis, cividis, or blues), diverging (two hues around a meaningful midpoint, e.g. `#2166AC → #F7F7F7 → #B2182B`), categorical (≤ 7 distinct; Okabe–Ito set for colour-blind safety). Don't encode with red vs green alone.
6. **Accessibility:** text alternative (a summary + key numbers), data table toggle, patterns or direct labels in addition to colour, keyboard focus for interactive charts, ≥ 3:1 contrast for marks against the background.

## Dashboard rules

- Top row: 3–5 KPIs with comparison (vs last period / target) and trend.
- Middle: primary trend chart. Bottom: breakdowns and tables.
- Consistent time ranges and units; filters at the top; last-updated timestamp.
- Density: 8pt grid, 12–14px labels, avoid more than ~9 charts per view.

## Infographic structure

Title (the takeaway) → hook stat → 3–5 sections in reading order (top→bottom for 2:3 vertical, left→right for 16:9) → sources and date → brand. Use icons from one family (Lucide, Phosphor, Material Symbols, Tabler). Pinterest/IG vertical infographics: 1000×1500 or 1080×1350 frames.

## Code snippets

- **Vega-Lite** (fast, declarative): `{ "mark": "bar", "encoding": { "y": {"field":"country","sort":"-x"}, "x": {"field":"value","type":"quantitative"} } }`
- **Recharts** (React): `<BarChart layout="vertical">…` with `<LabelList>` for direct labels.
- **Chart.js**: set `plugins.legend.display=false` and use the datalabels plugin for direct labelling.
- **D3/SVG** for bespoke editorial charts: build scales (`d3.scaleLinear`), axes with few ticks, `<title>` and `aria-label` on the SVG.
- **ECharts** for large interactive dashboards and maps.
