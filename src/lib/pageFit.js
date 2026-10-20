import { useEffect, useState } from 'react';

// Desktop pages are laid out for a viewport at least this tall. On shorter laptop-width
// screens (1366x650 browser windows, 1024x600 smart displays) the page content is scaled
// down as one piece so nothing is cut off or pushed behind the lake / below the fold.
export const FIT_MIN_WIDTH = 1024;
export const FIT_DESIGN_HEIGHT = 768;
const MIN_SCALE = 0.6;

export function getPageFit() {
  if (typeof window === 'undefined') return { s: 1, w: 1440, h: 900 };
  const w = window.innerWidth;
  const h = window.innerHeight;
  if (w < FIT_MIN_WIDTH || h >= FIT_DESIGN_HEIGHT) return { s: 1, w, h };
  const s = Math.max(MIN_SCALE, h / FIT_DESIGN_HEIGHT);
  return { s, w: w / s, h: h / s };
}

export function usePageFit() {
  const [fit, setFit] = useState(getPageFit);
  useEffect(() => {
    const onResize = () => setFit(getPageFit());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return fit;
}
