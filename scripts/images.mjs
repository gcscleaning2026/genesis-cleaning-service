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
const responsive = [
  { src: 'gcs-hero.webp', widths: [480, 768, 1034] },
  { src: 'gcs-why.webp', widths: [480, 768, 948] },
  { src: 'gcs-badge.webp', widths: [96, 280, 560] },
  { src: 'gcs-logo-navy.webp', widths: [290, 580] }
];

for (const { src, widths } of responsive) {
  const base = src.replace(/\.webp$/, '');
  for (const w of widths) {
    const out = `${base}-${w}.webp`;
    await sharp(at(src)).resize({ width: w, withoutEnlargement: true }).webp({ quality: 82 }).toFile(at(out));
    console.log(`${out.padEnd(26)} ${kb(out)}`);
  }
}

// The grain overlay is a 128px tile repeated across a fixed full-viewport layer. PNG
// costs ~26 KB for what WebP does in a fraction of that.
await sharp(at('grain.png')).webp({ quality: 70 }).toFile(at('grain.webp'));
console.log(`grain.webp                 ${kb('grain.webp')} (was ${kb('grain.png')})`);
