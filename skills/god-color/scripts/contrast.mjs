#!/usr/bin/env node
// WCAG 2.x contrast ratio checker. Zero dependencies.
// Usage: node contrast.mjs <foreground> <background>   e.g. node contrast.mjs "#767676" "#ffffff"
//        node contrast.mjs --pairs "#111:#fff" "#64748B:#fff"
export function hexToRgb(hex) {
  let h = String(hex).trim().replace(/^#/, "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  if (!/^[0-9a-f]{6}$/i.test(h)) throw new Error(`Invalid hex colour: ${hex}`);
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
}
export function luminance([r, g, b]) {
  const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}
export function contrast(fg, bg) {
  const a = luminance(hexToRgb(fg)), b = luminance(hexToRgb(bg));
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}
export function verdict(ratio) {
  return {
    ratio: Math.round(ratio * 100) / 100,
    AA_text: ratio >= 4.5, AA_large: ratio >= 3, AAA_text: ratio >= 7, AA_ui: ratio >= 3,
  };
}
const isMain = import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith("contrast.mjs");
if (isMain) {
  const args = process.argv.slice(2);
  const pairs = args[0] === "--pairs" ? args.slice(1).map((p) => p.split(":")) : [[args[0], args[1]]];
  if (!pairs.length || pairs.some(([f, b]) => !f || !b)) {
    console.error("Usage: node contrast.mjs <fg> <bg>  |  node contrast.mjs --pairs fg:bg fg:bg ...");
    process.exit(2);
  }
  for (const [f, b] of pairs) {
    const v = verdict(contrast(f, b));
    const mark = (ok) => (ok ? "pass" : "FAIL");
    console.log(`${f} on ${b}: ${v.ratio}:1  AA text ${mark(v.AA_text)} · AA large/UI ${mark(v.AA_large)} · AAA ${mark(v.AAA_text)}`);
  }
}
