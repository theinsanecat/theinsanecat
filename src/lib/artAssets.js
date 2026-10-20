// Single source of truth for heavy artwork URLs, so App can warm them up
// before the (lazy-loaded) pages that display them are opened.
//
// sakura-branch.webp / rotating-emblem.avif are pixel-identical 2x renders of the original
// Illustrator SVGs kept in /design-source (verified with a pixel diff at display size).
import sakuraBranch from '../assets/art/sakura-branch.webp';
import rotatingEmblem from '../assets/art/rotating-emblem.avif';

export const SAKURA_BRANCH_SRC = sakuraBranch;
export const ROTATING_EMBLEM_SRC = rotatingEmblem;

const base = import.meta.env.BASE_URL;
export const ABOUT_IMAGES = {
  infosys: `${base}images/infosys-building.webp`,
  jio: `${base}images/jio-building.webp`,
  bits: `${base}images/bits-pilani-building.webp`,
  mumbai: `${base}images/mumbai-university-building.webp`,
  dav: `${base}images/dav-school-building.webp`,
};
