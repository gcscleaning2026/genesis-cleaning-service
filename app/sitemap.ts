import type { MetadataRoute } from 'next';
import { SITE_ORIGIN, type Lang } from '@/lib/i18n';
import { SERVICE_PAGES } from '@/lib/service-pages';
import { AREA_PAGES } from '@/lib/area-pages';
import { areaPath, areasIndexPath, homePath, servicePath, servicesIndexPath } from '@/lib/routes';

/**
 * Replaces the hand-written public/sitemap.xml.
 *
 * Two differences from the file it replaces. `changefreq` and `priority` are gone —
 * Google ignores both, and a sitemap that ranks its own URLs against each other was
 * saying nothing anyway. `lastmod`, the one field Google does read, is now there.
 *
 * It is a constant rather than the build date on purpose: every deploy would otherwise
 * claim the copy changed, and a lastmod that moves when the page did not is one Google
 * stops believing. Bump it when the visible copy changes — approved reviews reach the
 * page through revalidation, not a deploy, so they are not what this date is about.
 */
const CONTENT_UPDATED = new Date('2026-08-27');

const LANGS: Lang[] = ['en', 'es'];

/**
 * Every URL the site publishes, as the pair of paths that name the same page in the two
 * languages. hreflang is only honoured when the annotations are reciprocal, so each entry
 * below becomes two sitemap rows carrying the identical alternates block — itself included,
 * plus the x-default that names the page an unmatched visitor gets.
 */
function pagePairs(): Record<Lang, string>[] {
  return [
    { en: homePath('en'), es: homePath('es') },
    { en: servicesIndexPath('en'), es: servicesIndexPath('es') },
    { en: areasIndexPath('en'), es: areasIndexPath('es') },
    ...SERVICE_PAGES.map(page => ({ en: servicePath('en', page.slug), es: servicePath('es', page.slug) })),
    ...AREA_PAGES.map(page => ({ en: areaPath('en', page.slug), es: areaPath('es', page.slug) }))
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return pagePairs().flatMap(pair => {
    const languages = {
      en: `${SITE_ORIGIN}${pair.en}`,
      es: `${SITE_ORIGIN}${pair.es}`,
      'x-default': `${SITE_ORIGIN}${pair.en}`
    };
    return LANGS.map(lang => ({
      url: `${SITE_ORIGIN}${pair[lang]}`,
      lastModified: CONTENT_UPDATED,
      alternates: { languages }
    }));
  });
}
