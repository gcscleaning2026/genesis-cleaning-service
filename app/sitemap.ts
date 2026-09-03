import type { MetadataRoute } from 'next';
import { SITE_ORIGIN, type Lang } from '@/lib/i18n';
import { SERVICE_PAGES } from '@/lib/service-pages';
import { AREA_PAGES } from '@/lib/area-pages';
import { CITY_PAGES } from '@/lib/city-pages';
import { WAVE1_SERVICES } from '@/lib/wave1-services';
import {
  areaPath,
  areasIndexPath,
  cityPath,
  homePath,
  pricingPath,
  servicePath,
  servicesIndexPath
} from '@/lib/routes';

/**
 * Replaces the hand-written public/sitemap.xml.
 *
 * `lastmod` is per page so a copy change on one URL does not claim every other URL moved.
 * Dates are constants rather than the build date: a lastmod that moves when the page did
 * not is one Google stops believing.
 *
 * Home loc keeps the trailing slash (`https://www.gcscleaning.net/`). County hubs plus
 * Wave 1 flat city pages under /areas/{city}. House cleaning and commercial cleaning are
 * first-class locs; the old residential-commercial-cleaning combo 301s away and is omitted.
 *
 * IndexNow is not a side effect of this function. Sitemap generation can run on every
 * cold start; the ping belongs on publish/deploy (see scripts/submit-indexnow.mts).
 */
const HOME_LASTMOD = new Date('2026-09-02');
const DEFAULT_LASTMOD = new Date('2026-08-27');
const WAVE1_LASTMOD = new Date('2026-09-03');

const LANGS: Lang[] = ['en', 'es'];

const COMBO_SLUG = 'residential-commercial-cleaning';

type PagePair = { paths: Record<Lang, string>; lastModified: Date };

function pagePairs(): PagePair[] {
  return [
    { paths: { en: homePath('en'), es: homePath('es') }, lastModified: HOME_LASTMOD },
    { paths: { en: servicesIndexPath('en'), es: servicesIndexPath('es') }, lastModified: DEFAULT_LASTMOD },
    { paths: { en: areasIndexPath('en'), es: areasIndexPath('es') }, lastModified: DEFAULT_LASTMOD },
    { paths: { en: pricingPath('en'), es: pricingPath('es') }, lastModified: WAVE1_LASTMOD },
    ...WAVE1_SERVICES.map(page => ({
      paths: { en: servicePath('en', page.slug), es: servicePath('es', page.slug) },
      lastModified: WAVE1_LASTMOD
    })),
    ...SERVICE_PAGES.filter(page => page.slug !== COMBO_SLUG).map(page => ({
      paths: { en: servicePath('en', page.slug), es: servicePath('es', page.slug) },
      lastModified: DEFAULT_LASTMOD
    })),
    ...AREA_PAGES.map(page => ({
      paths: { en: areaPath('en', page.slug), es: areaPath('es', page.slug) },
      lastModified: DEFAULT_LASTMOD
    })),
    ...CITY_PAGES.map(page => ({
      paths: { en: cityPath('en', page.slug), es: cityPath('es', page.slug) },
      lastModified: WAVE1_LASTMOD
    }))
  ];
}

function loc(path: string): string {
  if (path === '/') return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${path}`;
}

export function sitemapEntries(): MetadataRoute.Sitemap {
  return pagePairs().flatMap(({ paths, lastModified }) => {
    const languages = {
      en: loc(paths.en),
      es: loc(paths.es),
      'x-default': loc(paths.en)
    };
    return LANGS.map(lang => ({
      url: loc(paths[lang]),
      lastModified,
      alternates: { languages }
    }));
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapEntries();
}
