// Asset warm-up: download + decode heavy images before the page that needs them is opened.
// `new Image().src = x` only downloads; `img.decode()` also decodes the bitmap off the main thread,
// so when the real <img> mounts it paints on the very next frame (no pop-in / half-drawn frames).
// Holding a reference to the Image keeps the decoded bitmap alive in Blink's image cache.

const cache = new Map(); // src -> { img, promise, ready }

export function warmImage(src) {
  if (!src || typeof window === 'undefined') return Promise.resolve();
  const hit = cache.get(src);
  if (hit) return hit.promise;

  const img = new Image();
  img.decoding = 'async';
  const entry = { img, ready: false, promise: null };
  entry.promise = new Promise((resolve) => {
    img.onload = () => {
      // decode() can reject for huge images or when the doc is hidden — still usable, just not pre-decoded
      (img.decode ? img.decode() : Promise.resolve()).catch(() => {}).then(() => {
        entry.ready = true;
        resolve(img);
      });
    };
    img.onerror = () => { entry.ready = true; resolve(img); };
  });
  img.src = src;
  cache.set(src, entry);
  return entry.promise;
}

export const isImageWarm = (src) => cache.get(src)?.ready === true;

const idle = (cb, timeout = 2500) =>
  typeof window !== 'undefined' && 'requestIdleCallback' in window
    ? window.requestIdleCallback(cb, { timeout })
    : setTimeout(cb, 200);

/**
 * Run `tasks` (functions returning promises) one after another, each in an idle slot,
 * starting `delayMs` after the call so the first paint + entrance animations are never disturbed.
 */
export function runWhenIdle(tasks, delayMs = 1200) {
  if (typeof window === 'undefined') return () => {};
  let cancelled = false;
  const next = (i) => {
    if (cancelled || i >= tasks.length) return;
    idle(() => {
      if (cancelled) return;
      Promise.resolve()
        .then(tasks[i])
        .catch(() => {})
        .then(() => next(i + 1));
    });
  };
  const t = setTimeout(() => next(0), delayMs);
  return () => { cancelled = true; clearTimeout(t); };
}
