// Rigenera i PNG dell'icona a partire dagli SVG prodotti da scripts/icon-gen.py.
//
//   python3 scripts/icon-gen.py /tmp/icon          # crea icon.svg, full.svg, maskable.svg
//   npm i --no-save playwright                     # rende importabile "playwright" (non tocca package.json)
//   npx playwright install chromium                # solo se non hai già un Chromium
//   node scripts/icon-render.mjs /tmp/icon public  # scrive i PNG in public/
//   cp /tmp/icon/icon.svg public/icon.svg
//
// Variabile opzionale CHROMIUM_PATH per usare un Chromium già installato
// (in quel caso il passo "playwright install" non serve).
import { chromium } from "playwright";
import { readFileSync } from "fs";

const [dir, outDir] = process.argv.slice(2);
if (!dir || !outDir) {
  console.error("uso: node scripts/icon-render.mjs <cartella-svg> <cartella-output>");
  process.exit(1);
}
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const jobs = [
  ["full.svg",     "apple-touch-icon.png",  180],  // iOS applica la sua maschera: pieno campo
  ["full.svg",     "icon-192.png",          192],
  ["full.svg",     "icon-512.png",          512],
  ["maskable.svg", "icon-maskable-512.png", 512],  // figura ridotta dentro la safe zone
];
for (const [src, name, size] of jobs) {
  const page = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
  const svg = Buffer.from(readFileSync(`${dir}/${src}`, "utf8")).toString("base64");
  await page.setContent(`<body style="margin:0"><img src="data:image/svg+xml;base64,${svg}" width="${size}" height="${size}" style="display:block"></body>`);
  await page.waitForTimeout(150);
  await page.screenshot({ path: `${outDir}/${name}`, clip: { x: 0, y: 0, width: size, height: size } });
  await page.close();
  console.log("ok", name);
}
await browser.close();
