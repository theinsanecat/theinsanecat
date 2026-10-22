#!/usr/bin/env node
/*
 * Renders the About card backs (both themes, all 5 cards) from the live SVG cards into pictures,
 * which phones and tablets show instead of the live SVG (far lighter to animate).
 *
 *   npm run build && npm run preview          (in one terminal)
 *   node scripts/render-about-cards.mjs       (in another)
 *
 * Writes 600x900 PNGs to design-source/about-cards/ (a local, untracked folder). Then convert each to
 * src/assets/art/about-cards/<theme>-<n>.webp at 540x810, quality 80
 * (e.g. cwebp -q 80 -resize 540 810 light-1.png -o light-1.webp).
 */
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const URL = process.env.BENCH_URL || 'http://localhost:4173/theinsanecat/about';
const OUT = 'design-source/about-cards';
mkdirSync(OUT, { recursive: true });
const names = ['Infosys', 'Jio', 'BITS', 'University', 'D.A.V.'];

const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: 'chrome' });
for (const theme of ['light', 'dark']) {
  const ctx = await browser.newContext({ viewport: { width: 1536, height: 864 }, deviceScaleFactor: 2 });
  await ctx.addInitScript((t) => {
    localStorage.setItem('portfolio_theme', t);
    localStorage.setItem('portfolio_user_set_mode', 'true');
    localStorage.setItem('portfolio_perf_mode', 'lite'); // no card float, so the card is still
  }, theme);
  const page = await ctx.newPage();
  await page.goto(URL);
  await page.waitForTimeout(3000);
  for (let i = 0; i < names.length; i++) {
    if (i) { await page.getByRole('button', { name: 'Next card' }).click(); await page.waitForTimeout(1800); }
    await page.locator(`[role=button][aria-label^="${names[i]}"]`).screenshot({ path: `${OUT}/${theme}-${i + 1}.png` });
  }
  await ctx.close();
}
await browser.close();
console.log(`Wrote 10 card pictures to ${OUT}/`);
