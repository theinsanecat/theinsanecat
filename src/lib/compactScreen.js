// Phone & tablet experience: screens under laptop width, and every touch-only device (any tablet,
// any size or orientation). These get the basic Lite version with no Quality switch, the bottom tab
// bar, and the lighter About cards.
export const COMPACT_MAX_WIDTH = 1023;
export const TOUCH_UI_QUERY = '(hover: none) and (pointer: coarse)';
export const isTouchUi = () => typeof window !== 'undefined' && window.matchMedia(TOUCH_UI_QUERY).matches;
export const isCompactScreen = () =>
  typeof window !== 'undefined' && (window.innerWidth <= COMPACT_MAX_WIDTH || isTouchUi());
