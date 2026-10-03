#!/usr/bin/env node
// Render an HTML or SVG file to PNG or PDF at an exact size using Playwright (if installed).
// Usage: node render.mjs <input.html|svg> <output.png|pdf> <width> <height> [scale=2]
import { resolve, extname } from "node:path";
import { pathToFileURL } from "node:url";
import { existsSync } from "node:fs";

const [input, output, w = "1080", h = "1350", s = "2"] = process.argv.slice(2);
if (!input || !output) {
  console.error("Usage: node render.mjs <input.html|svg> <output.png|pdf> <width> <height> [scale]");
  process.exit(2);
}
if (!existsSync(input)) { console.error(`Input not found: ${input}`); process.exit(2); }
const width = Number(w), height = Number(h), scale = Number(s);

let chromium;
try { ({ chromium } = await import("playwright")); }
catch {
  console.error("Playwright is not installed. Install it with:\n  npm i -D playwright && npx playwright install chromium\n" +
    `or run once: npx -y playwright@latest screenshot --viewport-size=${width},${height} ${input} ${output}`);
  process.exit(1);
}
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: scale });
await page.goto(pathToFileURL(resolve(input)).href, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts && document.fonts.ready);
if (extname(output).toLowerCase() === ".pdf") {
  await page.pdf({ path: output, width: `${width}px`, height: `${height}px`, printBackground: true });
} else {
  await page.screenshot({ path: output, clip: { x: 0, y: 0, width, height } });
}
await browser.close();
console.log(`Rendered ${output} (${width}×${height} @${scale}x)`);
