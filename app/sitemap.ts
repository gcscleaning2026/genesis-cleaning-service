import type { MetadataRoute } from 'next';
import { SITE_ORIGIN, type Lang } from '@/lib/i18n';
import { SERVICE_PAGES } from '@/lib/service-pages';
import { AREA_PAGES } from '@/lib/area-pages';
import { areaPath, areasIndexPath, homePath, servicePath, servicesIndexPath } from '@/lib/routes';
import { submitToIndexNow } from '@/lib/indexnow';

/**
 * Replaces the hand-written public/sitemap.xml.
 *
 * `lastmod` is per page so a copy change on one URL does not claim every other URL moved.
 * Dates are constants rather than the build date: a lastmod that moves when the page did
 * not is one Google stops believing.
 *
 * Home loc keeps the trailing slash (`https://www.gcscleaning.net/`). County pages only —
 * Wave 1 city URLs are not published. There is no extra `/services/house-cleaning` URL;
 * house cleaning lives on residential-commercial-cleaning.
 */
const HOME_LASTMOD = new Date('2026-09-02');
const DEFAULT_LASTMOD = new Date('2026-08-27');

const LANGS: Lang[] = ['en', 'es'];

type PagePair = { paths: Record<Lang, string>; lastModified: Date };

function pagePairs(): PagePair[] {
  return [
    { paths: { en: homePath('en'), es: homePath('es') }, lastModified: HOME_LASTMOD },
    { paths: { en: servicesIndexPath('en'), es: servicesIndexPath('es') }, lastModified: DEFAULT_LASTMOD },
    { paths: { en: areasIndexPath('en'), es: areasIndexPath('es') }, lastModified: DEFAULT_LASTMOD },
    ...SERVICE_PAGES.map(page => ({
      paths: { en: servicePath('en', page.slug), es: servicePath('es', page.slug) },
      lastModified: DEFAULT_LASTMOD
    })),
    ...AREA_PAGES.map(page => ({
      paths: { en: areaPath('en', page.slug), es: areaPath('es', page.slug) },
      lastModified: DEFAULT_LASTMOD
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
  const entries = sitemapEntries();
  void submitToIndexNow(entries.map(entry => entry.url));
  return entries;
}
