// Phone & tablet sized screens: under laptop width, where the bottom tab bar appears.
// These always get the basic Lite version with no Quality switch, and the lighter About cards.
export const COMPACT_MAX_WIDTH = 1023;
export const isCompactScreen = () => typeof window !== 'undefined' && window.innerWidth <= COMPACT_MAX_WIDTH;
