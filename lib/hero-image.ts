// The hero photograph is the LCP element, and its descriptor has to be stated in two
// places: the `<picture>` inside SITE_HTML and the `preload` in components/site-document.tsx.
// If those two ever disagree — a width added to one, a `sizes` string edited in the other —
// the preload stops matching what the browser picks and the page quietly downloads the
// largest image twice. Both sides import from here so there is one thing to change.
//
// scripts/images.mjs states these widths again because a plain node script cannot import a
// TypeScript module; if you add a width, add it there too and run `pnpm images`.

const WIDTHS = [480, 768, 1034];
const LARGEST = WIDTHS[WIDTHS.length - 1];

const srcset = (ext: 'avif' | 'webp') =>
  WIDTHS.map(w => `/assets/gcs-hero-${w}.${ext} ${w}w`).join(', ');

/** Slot width at each breakpoint. Must match the hero column in SITE_HTML. */
export const HERO_SIZES = '(max-width:1024px) 92vw, 46vw';

export const HERO_AVIF_SRCSET = srcset('avif');
export const HERO_WEBP_SRCSET = srcset('webp');

/** `src` for the `<img>`, used by browsers that ignore srcset entirely. */
export const HERO_FALLBACK_SRC = `/assets/gcs-hero-${LARGEST}.webp`;

/** `href` for the preload. React uses it as the dedup key; the srcset decides the download. */
export const HERO_PRELOAD_HREF = `/assets/gcs-hero-${LARGEST}.avif`;

/** Intrinsic size of the source image, so the slot reserves the right box. */
export const HERO_WIDTH = 1034;
export const HERO_HEIGHT = 776;
