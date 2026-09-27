# Performance case study

This portfolio is an animated, illustrated scene: a night sky, mountains, forests, a lotus lake, a rotating mandala, falling sakura petals and butterflies. It ran smoothly on an Apple Silicon MacBook but stuttered on a typical office laptop, a low-end AMD Ryzen ThinkPad with integrated graphics. Images loaded late, the emblem glitched, and the sakura branch popped in.

The goal was to make it smooth on any desktop without redesigning or removing a single element.

## Results

These were measured on the production build with the CPU slowed 6× and a 1536×864 viewport at 1.25× scaling. The lab machine has **no GPU at all**, so every frame is drawn in software. That makes it a deliberately worse case than any real laptop. Balanced is the tier integrated-GPU laptops get; Lite is the tier machines without GPU acceleration get.

| Scenario | Before | After (Balanced) | After (Lite) |
| --- | --- | --- | --- |
| Home, idle | 7 fps | 39 fps | 45 fps |
| Home, mouse moving | 4 fps | 20 fps | 42 fps |
| Contact, steady | 3 fps | 11 fps | 44 fps |
| Contact, entering | 6 fps | 13 fps | 35 fps |
| About, entering | 6 fps | 9 fps | 41 fps |
| Projects, entering | 12 fps | 18 fps | 37 fps |
| Redraw (raster) time while the mouse moves on Home | 3.9 s per 6 s | 0.001 s | 0 |
| Contact artwork fully drawn after navigation | 1.86 s | 0.54 s | 0.18 s |
| Home LCP | 2.1 s | 1.5 s | 1.4 s |
| Bytes for a full tour of the site | 4.2 MB | 1.48 MB | 1.41 MB |
| Main JS (gzip) | 160 KB | 130 KB | 130 KB |
| External CDN requests | 8 | 0 | 0 |

Every replaced asset was checked with a pixel diff against the original render.

## What was slow, and what fixed it

### 1. Assets and loading

- **The sakura branch was a 2.2 MB Illustrator SVG:** 1,923 paths and 1,781 gradients. It's now a 51 KB WebP rendered at 2× its display size; one pixel differs at Retina resolution. The rotating emblem went from a 400 KB SVG with 1,036 paths to a 146 KB AVIF, with zero pixels different. The originals are kept in `design-source/`.
- **Pre-decoding the artwork.** `new Image().src = …` only downloads a file. `src/lib/assetWarmup.js` also calls `img.decode()` in idle time, so the artwork is decoded before you open Contact. The images then fade in fully drawn instead of popping in half-rendered.
- **Route-level code splitting.** Every page's code is fetched in parallel right after Home's first paint. Each page is then rendered once, invisibly, while you're still on Home, so the first visit is as fast as a repeat visit. Nav clicks wait for the page's code before switching, so the content and the landscape transition start in the same frame.
- **Fonts, photos and logos.** The fonts are subset WOFF2 files (146 KB down to 45 KB) and the two main ones are preloaded. The photos use the existing WebP versions. The tech logos are bundled with the site instead of loaded from `jsdelivr@latest`.

### 2. Stop redrawing every frame

Chrome can move, fade or rotate a *layer* on the GPU for free. It can't do that for things *inside* an SVG, or for anything with a live filter. Those get repainted, and the cost grows with the area that changes.

- **Mouse-driven sky mask.** The constellation reveal was an SVG `<mask>` that followed the mouse, which repainted the whole 1920×1080 sky, including its blur filters, on every mouse frame. It's now a small window with a static mask that moves with the mouse while its contents move the opposite way. That's pure GPU transforms, with zero repaints.
- **Star glow.** A live `feGaussianBlur` covered the whole starfield. It's replaced by per-star radial gradients whose stops were computed to match the blur (`design-source/scripts/star-halo-stops.py`).
- **Lotus lake.** 14 lotuses, each with about 3 filters, were swayed inside one SVG, so the whole strip was repainted every frame. Now each wave and each lotus is its own small SVG in its own GPU layer, with CSS sway.
- **Butterflies and petals.** Their flight paths are now CSS keyframes instead of Framer Motion JavaScript loops. The butterflies' glow moved onto the wing SVGs, so it's drawn once instead of recalculated on every wing flap.
- **Aurora blobs.** A `filter: blur(32px)` on an animated element was replaced by a softer gradient. The largest difference is 8/255 in one colour channel, which is invisible.
- **Missing `will-change`.** Without it, Chrome repaints a layer every time it moves by a fraction of a pixel. It's now set on the landscape layers and the spotlight.
- **About → Home stall.** The forest layers were unmounted when you left Home and rebuilt and redrawn on return. They now stay mounted and slide out and back in.
- **Glass effect.** The SVG displacement-map `backdrop-filter`, the most expensive effect in Chrome, now only runs in Cinematic.
- **About cards.** Only the current theme's artwork is mounted; both sets are mounted just during the 0.7 s theme cross-fade. That's 40% fewer DOM nodes and half the SVG filters.

### 3. Performance tiers that actually do something

`PerformanceContext` picks **Cinematic**, **Balanced** or **Lite**, and sets `html[data-perf]` so the CSS can switch effects on or off.

- **Detection.** WebGL is requested with `failIfMajorPerformanceCaveat`, which the browser refuses when it would render in software. If that's refused, or there's no WebGL at all, the site goes straight to Lite. Before, a machine with hardware acceleration switched off could land in Balanced.
- **Frame-rate safety net.** It only steps down, never up. It waits 2.5 s after load, ignores page and tab switches, and needs 3 slow seconds in a row.
- **Lite keeps every element on screen in its resting pose.** It only stops continuous background motion: the lotus sway, emblem spin, branch sway, aurora, card float and pulsing dots. One lesson: without a GPU, Chrome repaints one rectangle covering everything that moved. On Contact, a tiny pulsing ring plus the waves merged into an almost full-screen repaint. Stopping just the ring took Contact from 40 to 60 fps.

| Effect | Cinematic | Balanced | Lite |
| --- | --- | --- | --- |
| Glass effect | SVG displacement | blur glass | blur glass |
| Sakura petals | 10 | 6 | 0 |
| Lotus sway | all | back row | still |
| Emblem, branch, aurora, card float | animated | animated | still |

Mouse parallax on the landscape was removed as a design decision. The spotlight and the constellation reveal still follow the mouse.

## Guard rails

| Command | What it does |
| --- | --- |
| `npm run check:budgets` | After a build, fails if main JS goes over 150 KB gzip, a page chunk over 25 KB, CSS over 25 KB, any image over 200 KB, any font over 20 KB, the whole `dist` over 1.6 MB, or any external CDN URL appears. |
| `npm run perf:bench` | With `npm run preview` running, replays the scenarios above in your installed Chrome (CPU throttled, `BENCH_MODE=full|balanced|lite`) and prints fps, p95 frame time and long tasks per page. |
| `npm run perf:lighthouse` | Runs Lighthouse CI (desktop, 3 runs) against LCP, CLS and total-bytes assertions. |
| `.github/workflows/performance.yml` | Runs the build, the budgets and Lighthouse on every push to `main`, `dev` or `perf/**`, and on pull requests. |

Lighthouse scores 100 (desktop) both before and after. A load-time audit can't see animation smoothness, which is why the bench exists.

## Things found along the way

- **Lotus positions.** The lotuses have always been drawn at twice their intended position: Framer applied the sway on top of the base translate. Only the left 7 of the 14 were ever on screen. That look was kept exactly.
- **Filter classes that did nothing.** `drop-shadow(…)` and `sepia(…) hue-rotate(…)` written as plain Tailwind class names generate no CSS, so they never applied. They were removed; nothing visible changed.
