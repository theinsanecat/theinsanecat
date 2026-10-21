// Phone & tablet experience: screens under laptop width, and every touch-only device (any tablet,
// any size or orientation). These get the basic Lite version with no Quality switch, the bottom tab
// bar, and the lighter About cards.
export const COMPACT_MAX_WIDTH = 1023;
export const TOUCH_UI_QUERY = '(hover: none) and (pointer: coarse)';
export const isTouchUi = () => typeof window !== 'undefined' && window.matchMedia(TOUCH_UI_QUERY).matches;
// Same edge as the CSS (min-width: 64rem): matchMedia, not innerWidth, so zoomed/scaled windows at
// fractional widths (e.g. 1023.6px) agree with the layout.
export const COMPACT_QUERY = '(max-width: 1023.98px)';
export const isCompactScreen = () =>
  typeof window !== 'undefined' && (window.matchMedia(COMPACT_QUERY).matches || isTouchUi());
