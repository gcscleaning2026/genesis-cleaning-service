import type { MetadataRoute } from 'next';
import { HEAD, SITE_ORIGIN, type Lang } from '@/lib/i18n';

/**
 * Replaces the hand-written public/sitemap.xml.
 *
 * Two differences from the file it replaces. `changefreq` and `priority` are gone —
 * Google ignores both, and a sitemap that ranks its own two URLs against each other was
 * saying nothing anyway. `lastmod`, the one field Google does read, is now there.
 *
 * It is a constant rather than the build date on purpose: every deploy would otherwise
 * claim the copy changed, and a lastmod that moves when the page did not is one Google
 * stops believing. Bump it when the visible copy changes — approved reviews reach the
 * page through revalidation, not a deploy, so they are not what this date is about.
 */
const CONTENT_UPDATED = new Date('2026-08-26');

const LANGS: Lang[] = ['en', 'es'];

// Every URL carries the full set, itself included: hreflang is only honoured when the
// annotations are reciprocal, and x-default names the page an unmatched visitor gets.
const ALTERNATES = {
  en: `${SITE_ORIGIN}${HEAD.en.path}`,
  es: `${SITE_ORIGIN}${HEAD.es.path}`,
  'x-default': `${SITE_ORIGIN}${HEAD.en.path}`
};

export default function sitemap(): MetadataRoute.Sitemap {
  return LANGS.map((lang) => ({
    url: `${SITE_ORIGIN}${HEAD[lang].path}`,
    lastModified: CONTENT_UPDATED,
    alternates: { languages: ALTERNATES }
  }));
}
