#!/usr/bin/env node
/*
 * Performance bench: replays the same scenarios used during the perf/optimization work and prints
 * frame-rate / long-task numbers per page, emulating a low-end laptop (CPU throttle, DPR 1.25).
 *
 *   npm run build && npm run preview          (in one terminal)
 *   npm run perf:bench                        (in another)
 *
 * Options (env vars):
 *   BENCH_URL   default http://localhost:4173/theinsanecat/
 *   BENCH_MODE  full | balanced | lite        (default balanced — what integrated-GPU laptops get)
 *   THROTTLE    CPU slowdown factor           (default 4)
 *   CHROME_PATH path to a Chrome/Chromium binary (default: your installed Google Chrome)
 */
import { chromium } from 'playwright-core';

const URL = process.env.BENCH_URL || 'http://localhost:4173/theinsanecat/';
const MODE = process.env.BENCH_MODE || 'balanced';
const THROTTLE = Number(process.env.THROTTLE || 4);

const browser = await chromium.launch(
  process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: 'chrome' }
);
const ctx = await browser.newContext({ viewport: { width: 1536, height: 864 }, deviceScaleFactor: 1.25 });
await ctx.addInitScript((mode) => {
  localStorage.setItem('portfolio_theme', 'dark');
  localStorage.setItem('portfolio_user_set_mode', 'true');
  localStorage.setItem('portfolio_perf_mode', mode);
  window.__long = [];
  new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__long.push(e.duration))).observe({ entryTypes: ['longtask'] });
}, MODE);
const page = await ctx.newPage();
const cdp = await ctx.newCDPSession(page);
await cdp.send('Emulation.setCPUThrottlingRate', { rate: THROTTLE });

const moveMouse = async (ms) => {
  const t0 = Date.now();
  let a = 0;
  while (Date.now() - t0 < ms) {
    a += 0.12;
    await page.mouse.move(768 + Math.cos(a) * 520, 432 + Math.sin(a) * 300);
    await page.waitForTimeout(16);
  }
};

// Records frames for `ms` while `action` runs; returns fps, p95 frame time, long tasks
const measure = async (action, ms) => {
  await page.evaluate(() => {
    window.__long = [];
    window.__frames = [];
    const gen = (window.__gen = (window.__gen || 0) + 1); // one recorder loop at a time
    const tick = (t) => { if (window.__gen !== gen) return; window.__frames.push(t); requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  });
  const t0 = Date.now();
  if (action) await action();
  const rest = ms - (Date.now() - t0);
  if (rest > 0) await page.waitForTimeout(rest);
  return page.evaluate((dur) => {
    window.__gen++;
    const f = window.__frames;
    const iv = f.slice(1).map((x, i) => x - f[i]).sort((a, b) => a - b);
    const p95 = iv.length ? iv[Math.floor(0.95 * (iv.length - 1))] : 0;
    return {
      fps: +(f.length / (dur / 1000)).toFixed(1),
      p95ms: Math.round(p95),
      longTasks: window.__long.length,
      worstTaskMs: Math.round(Math.max(0, ...window.__long)),
    };
  }, Date.now() - t0);
};

const go = (hash) => page.evaluate((h) => { location.hash = h; }, hash);

await page.goto(URL + '#/', { waitUntil: 'load' });
await page.waitForTimeout(4000);

const results = {};
results['Home, idle'] = await measure(null, 4000);
results['Home, mouse moving'] = await measure(() => moveMouse(5000), 5000);
for (const [name, hash] of [['About', '#/about'], ['Projects', '#/projects'], ['Contact', '#/contact']]) {
  results[`${name}, entering`] = await measure(() => go(hash), 4000);
  results[`${name}, steady + mouse`] = await measure(() => moveMouse(4000), 4000);
  results[`${name} -> Home transition`] = await measure(() => go('#/'), 3000);
  await page.waitForTimeout(800);
}

console.log(`\nMode: ${MODE}   CPU throttle: ${THROTTLE}x   Viewport 1536x864 @1.25x\n`);
console.table(results);
await browser.close();
