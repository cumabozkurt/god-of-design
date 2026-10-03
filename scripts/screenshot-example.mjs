// Regenerates examples/iznik-ceramics-landing/preview.png with headless Chromium.
//   npm i --no-save playwright-core && node scripts/screenshot-example.mjs
// Uses an installed Chrome/Chromium (CHROME_PATH, or the usual install locations).
// Waits for web fonts and images, then crops at the end of the workshops band so the
// picture ends at a section boundary instead of mid-page.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright-core";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const page = path.join(ROOT, "examples/iznik-ceramics-landing/index.html");
const out = path.join(ROOT, "examples/iznik-ceramics-landing/preview.png");
const candidates = [process.env.CHROME_PATH, "/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"].filter(Boolean);
const executablePath = candidates.find((p) => fs.existsSync(p));
if (!executablePath) { console.error("Chrome not found; set CHROME_PATH"); process.exit(1); }

const browser = await chromium.launch({ executablePath });
try {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
  const tab = await ctx.newPage();
  await tab.goto(pathToFileURL(page).href, { waitUntil: "networkidle" });
  const fonts = await tab.evaluate(async () => {
    await document.fonts.ready;
    return ["700 40px 'Cormorant Garamond'", "400 16px 'Work Sans'", "600 16px 'Work Sans'"].map((f) => [f, document.fonts.check(f)]);
  });
  for (const [f, ok] of fonts) if (!ok) throw new Error(`web font did not load: ${f} (are you offline?)`);
  const bottom = await tab.evaluate(() => Math.ceil(document.querySelector("#workshops").getBoundingClientRect().bottom + window.scrollY));
  await tab.screenshot({ path: out, fullPage: true, clip: { x: 0, y: 0, width: 1280, height: bottom } });
  console.log(`wrote ${path.relative(ROOT, out)} (1280x${bottom})`);
} finally { await browser.close(); }
