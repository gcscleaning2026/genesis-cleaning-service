import { describe, expect, it } from 'vitest';
import { SERVICE_PAGES } from '../lib/service-pages';
import { AREA_PAGES } from '../lib/area-pages';
import { areaPath, areasIndexPath, homePath, servicePath, servicesIndexPath } from '../lib/routes';
import type { Copy } from '../lib/page-types';
import type { Lang } from '../lib/i18n';

const LANGS: Lang[] = ['en', 'es'];

/**
 * These pages exist to be indexed, and the two things that stop that from working are a
 * field left empty and a title or description long enough to be truncated in the result.
 * Both are invisible in the browser, so they are asserted here instead.
 */
const TITLE_MAX = 65;
const DESC_MAX = 160;

function everyCopy(): { where: string; copy: Copy }[] {
  const out: { where: string; copy: Copy }[] = [];
  for (const page of SERVICE_PAGES) {
    for (const lang of LANGS) out.push({ where: `service/${page.slug}/${lang}`, copy: page.copy[lang] });
  }
  for (const page of AREA_PAGES) {
    for (const lang of LANGS) out.push({ where: `area/${page.slug}/${lang}`, copy: page.copy[lang] });
  }
  return out;
}

describe('landing page content', () => {
  it('covers twelve services and five counties in both languages', () => {
    expect(SERVICE_PAGES).toHaveLength(12);
    expect(AREA_PAGES).toHaveLength(5);
    expect(everyCopy()).toHaveLength(34);
  });

  it('uses a unique slug for every page', () => {
    const slugs = [...SERVICE_PAGES, ...AREA_PAGES].map(page => page.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('uses slugs that are safe in a URL', () => {
    for (const page of [...SERVICE_PAGES, ...AREA_PAGES]) {
      expect(page.slug, page.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it('fills every copy field', () => {
    for (const { where, copy } of everyCopy()) {
      for (const field of ['name', 'title', 'desc', 'h1', 'intro', 'includesH2'] as const) {
        expect(copy[field].trim(), `${where}.${field}`).not.toBe('');
      }
      expect(copy.sections.length, `${where}.sections`).toBeGreaterThanOrEqual(3);
      expect(copy.includes.length, `${where}.includes`).toBeGreaterThanOrEqual(5);
      expect(copy.faq.length, `${where}.faq`).toBeGreaterThanOrEqual(3);
      for (const section of copy.sections) {
        expect(section.h2.trim(), `${where}.section.h2`).not.toBe('');
        expect(section.body.trim(), `${where}.section.body`).not.toBe('');
      }
      for (const entry of copy.faq) {
        expect(entry.q.trim(), `${where}.faq.q`).not.toBe('');
        expect(entry.a.trim(), `${where}.faq.a`).not.toBe('');
      }
    }
  });

  it('keeps titles and descriptions inside what a search result shows', () => {
    for (const { where, copy } of everyCopy()) {
      expect(copy.title.length, `${where}.title (${copy.title})`).toBeLessThanOrEqual(TITLE_MAX);
      expect(copy.desc.length, `${where}.desc (${copy.desc})`).toBeLessThanOrEqual(DESC_MAX);
    }
  });

  it('never reuses a title or a description across pages in one language', () => {
    for (const lang of LANGS) {
      const titles = [...SERVICE_PAGES, ...AREA_PAGES].map(page => page.copy[lang].title);
      const descs = [...SERVICE_PAGES, ...AREA_PAGES].map(page => page.copy[lang].desc);
      expect(new Set(titles).size, `${lang} titles`).toBe(titles.length);
      expect(new Set(descs).size, `${lang} descriptions`).toBe(descs.length);
    }
  });

  it('names the counties the service area claims', () => {
    expect(AREA_PAGES.map(page => page.county)).toEqual([
      'Essex',
      'Union',
      'Morris',
      'Middlesex',
      'Hudson'
    ]);
    for (const page of AREA_PAGES) {
      expect(page.towns.length, page.slug).toBeGreaterThanOrEqual(10);
      expect(new Set(page.towns).size, `${page.slug} towns unique`).toBe(page.towns.length);
    }
  });

  it('points every service card at an image that the page data names', () => {
    for (const page of SERVICE_PAGES) {
      expect(page.image, page.slug).toMatch(/^gcs-svc-[a-z-]+$/);
      expect(page.icon, page.slug).toMatch(/^i-bold-[a-z-]+$/);
      for (const lang of LANGS) expect(page.imageAlt[lang].trim(), `${page.slug}/${lang}`).not.toBe('');
    }
  });
});

describe('routes', () => {
  it('puts Spanish under /es and English at the root', () => {
    expect(homePath('en')).toBe('/');
    expect(homePath('es')).toBe('/es');
    expect(servicesIndexPath('en')).toBe('/services');
    expect(servicesIndexPath('es')).toBe('/es/services');
    expect(areasIndexPath('en')).toBe('/areas');
    expect(areasIndexPath('es')).toBe('/es/areas');
    expect(servicePath('en', 'deep-cleaning')).toBe('/services/deep-cleaning');
    expect(servicePath('es', 'deep-cleaning')).toBe('/es/services/deep-cleaning');
    expect(areaPath('en', 'essex-county')).toBe('/areas/essex-county');
    expect(areaPath('es', 'essex-county')).toBe('/es/areas/essex-county');
  });

  it('gives every page a distinct path in both languages', () => {
    const paths = [
      ...LANGS.map(lang => homePath(lang)),
      ...LANGS.map(lang => servicesIndexPath(lang)),
      ...LANGS.map(lang => areasIndexPath(lang)),
      ...SERVICE_PAGES.flatMap(page => LANGS.map(lang => servicePath(lang, page.slug))),
      ...AREA_PAGES.flatMap(page => LANGS.map(lang => areaPath(lang, page.slug)))
    ];
    expect(paths).toHaveLength(40);
    expect(new Set(paths).size).toBe(paths.length);
  });
});
