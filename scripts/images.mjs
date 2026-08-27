/**
 * Regenerates the derivative images in public/assets.
 *
 * Not part of `npm run build`: the outputs are committed, so the deploy does not need
 * sharp installed or the extra build time. Run it by hand (`npm run images`) after
 * replacing any of the source images below.
 *
 * Sources are the largest version of each asset; everything else here is derived.
 */
import sharp from 'sharp';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { statSync } from 'node:fs';

const assets = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'assets');
const at = (f) => resolve(assets, f);
const kb = (f) => Math.round(statSync(at(f)).size / 1024) + ' KB';

// Widths each image is actually served at, so the browser can pick one instead of
// downloading the full-resolution file for a 362px-wide slot on a phone.
//
// `avif: true` additionally emits AVIF cuts, which <picture> offers ahead of the WebP.
// It is on for the two photographs and off for the flat-colour brand art: AVIF wins ~35%
// on the hero photo (46.5 KB -> 30.2 KB at 1034w) but very little on a logo, and every
// extra format is another file to keep in step with the markup.
//
// The twelve service photographs share one geometry (800x500, the master is already the
// largest width served), so they are listed by slug rather than repeated one line each.
const SERVICE_SLUGS = [
  'commercial-residential', 'window', 'standard', 'move',
  'office', 'apartment', 'deep', 'construction',
  'clubhouse', 'gym', 'sanitizing', 'vacation-rental'
];

const responsive = [
  { src: 'gcs-hero.webp', widths: [480, 768, 1034], avif: true },
  { src: 'gcs-why.webp', widths: [480, 768, 948], avif: true },
  { src: 'gcs-badge.webp', widths: [96, 280, 560] },
  { src: 'gcs-logo-navy.webp', widths: [290, 580] },
  // A service card is at most ~400 CSS px wide, so 480 covers a phone and 800 covers a
  // 2x desktop card. AVIF is on: these are photographs, and there are twelve of them.
  ...SERVICE_SLUGS.map((slug) => ({
    src: `services/gcs-svc-${slug}.webp`,
    widths: [480, 800],
    avif: true
  }))
];

for (const { src, widths, avif } of responsive) {
  const base = src.replace(/\.webp$/, '');
  for (const w of widths) {
    // One decode and one resize spec per width; `clone()` forks the pipeline so each format
    // encodes from the same decoded, resized image instead of restating the geometry.
    const resized = sharp(at(src)).resize({ width: w, withoutEnlargement: true });
    const out = `${base}-${w}.webp`;
    await resized.clone().webp({ quality: 82 }).toFile(at(out));
    console.log(`${out.padEnd(26)} ${kb(out)}`);
    if (!avif) continue;
    // Quality 55 is where AVIF matches WebP 82 by eye on these photographs; `effort: 6`
    // is slow to encode and this script is run by hand, so the encode time is free.
    const avifOut = `${base}-${w}.avif`;
    await resized.clone().avif({ quality: 55, effort: 6 }).toFile(at(avifOut));
    console.log(`${avifOut.padEnd(26)} ${kb(avifOut)} (was ${kb(out)} as webp)`);
  }
}

// The grain overlay is a 128px tile repeated across a fixed full-viewport layer. PNG
// costs ~26 KB for what WebP does in a fraction of that.
await sharp(at('grain.png')).webp({ quality: 70 }).toFile(at('grain.webp'));
console.log(`grain.webp                 ${kb('grain.webp')} (was ${kb('grain.png')})`);
