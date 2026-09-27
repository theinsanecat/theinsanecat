#!/usr/bin/env node
// Performance budgets for the production build. Run after `npm run build`:  npm run check:budgets
// Fails (exit 1) if any budget is exceeded, so a heavy asset can't sneak back in unnoticed.
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const DIST = path.resolve(process.argv[2] || 'dist');
const KB = 1024;
const gz = (buf) => zlib.gzipSync(buf, { level: 9 }).length;

const BUDGETS = {
  entryJsGzip: 150 * KB, // index-*.js: everything needed for the first paint of Home
  pageChunkGzip: 25 * KB, // each lazily loaded page chunk
  cssGzip: 25 * KB,
  imageBytes: 200 * KB, // any single image (webp/avif/png/jpg/svg) that ships
  fontBytes: 20 * KB, // any single font file (should be subset woff2)
  totalBytes: 1.6 * 1024 * KB, // whole dist folder, uncompressed
};

if (!fs.existsSync(DIST)) {
  console.error(`No build found at ${DIST} — run "npm run build" first.`);
  process.exit(1);
}

const files = [];
const walk = (dir) => {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p);
    else files.push(p);
  }
};
walk(DIST);

const rows = [];
const fail = [];
const check = (label, value, limit, fmt = (v) => `${(v / KB).toFixed(1)} KB`) => {
  const ok = value <= limit;
  rows.push([ok ? 'ok  ' : 'FAIL', label, fmt(value), fmt(limit)]);
  if (!ok) fail.push(label);
};

let total = 0;
for (const f of files) {
  const rel = path.relative(DIST, f);
  const buf = fs.readFileSync(f);
  total += buf.length;
  const ext = path.extname(f).toLowerCase();
  if (ext === '.js') {
    const isEntry = /^assets\/index-/.test(rel);
    check(`${rel} (gzip)`, gz(buf), isEntry ? BUDGETS.entryJsGzip : BUDGETS.pageChunkGzip);
    if (/cdn\.jsdelivr|unpkg\.com|cdnjs/.test(buf.toString())) {
      rows.push(['FAIL', `${rel} references an external CDN`, '', '']);
      fail.push(`${rel} external CDN`);
    }
  } else if (ext === '.css') check(`${rel} (gzip)`, gz(buf), BUDGETS.cssGzip);
  else if (['.webp', '.avif', '.png', '.jpg', '.jpeg', '.svg', '.gif'].includes(ext)) check(rel, buf.length, BUDGETS.imageBytes);
  else if (['.woff2', '.woff', '.ttf', '.otf'].includes(ext)) check(rel, buf.length, BUDGETS.fontBytes);
}
check('dist total', total, BUDGETS.totalBytes);

const w = Math.max(...rows.map((r) => r[1].length));
for (const [s, l, v, lim] of rows) console.log(`${s}  ${l.padEnd(w)}  ${v.padStart(10)}  ${lim ? `/ ${lim}` : ''}`);
if (fail.length) {
  console.error(`\n${fail.length} budget(s) exceeded.`);
  process.exit(1);
}
console.log('\nAll performance budgets met.');
