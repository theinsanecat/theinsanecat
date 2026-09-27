# design-source

Source material that is **not shipped** with the site (nothing here is imported by `src/` or copied to `dist/`).

| Folder / file | What it is |
| --- | --- |
| `sakura-branch.svg`, `rotating-emblem.svg` | Original Illustrator exports. The site ships pixel-identical 2x renders (`src/assets/art/*.webp|avif`). To go back to vector, point `src/lib/artAssets.js` at these files. |
| `fonts/` | Original OTF/TTF fonts. The site ships subset WOFF2 builds (`src/assets/fonts/*.woff2`). |
| `scripts/star-halo-stops.py` | Computes the radial-gradient stops that replaced the sky's star-glow blur filter. |
| `archive/` | Components and assets that were no longer used (Experience page, cat layer, original JPG photos, unused images). Kept for reference. |
