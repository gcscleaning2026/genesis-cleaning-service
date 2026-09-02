import { describe, expect, it, vi } from 'vitest';
import sitemap from '../app/sitemap';
import robots from '../app/robots';
import { AREA_PAGES } from '../lib/area-pages';
import { SERVICE_PAGES } from '../lib/service-pages';

vi.mock('../lib/indexnow', () => ({
  submitToIndexNow: vi.fn().mockResolvedValue(undefined)
}));

describe('sitemap', () => {
  const entries = sitemap();
  const urls = entries.map(entry => entry.url);

  it('lists the English home with a trailing slash', () => {
    expect(urls).toContain('https://www.gcscleaning.net/');
    expect(urls).not.toContain('https://www.gcscleaning.net');
  });

  it('gives every URL its own lastmod', () => {
    expect(entries.length).toBeGreaterThan(0);
    for (const entry of entries) {
      expect(entry.lastModified, entry.url).toBeInstanceOf(Date);
      expect(Number.isNaN((entry.lastModified as Date).getTime()), entry.url).toBe(false);
    }
    const home = entries.find(entry => entry.url === 'https://www.gcscleaning.net/');
    expect((home?.lastModified as Date).toISOString().slice(0, 10)).toBe('2026-09-02');
  });

  it('does not publish Wave 1 city URLs', () => {
    const areaUrls = urls.filter(url => url.includes('/areas/'));
    const allowed = new Set(
      AREA_PAGES.flatMap(page => [
        `https://www.gcscleaning.net/areas/${page.slug}`,
        `https://www.gcscleaning.net/es/areas/${page.slug}`
      ])
    );
    expect(AREA_PAGES.map(page => page.slug)).toEqual([
      'essex-county',
      'union-county',
      'morris-county',
      'middlesex-county',
      'hudson-county'
    ]);
    for (const url of areaUrls) expect(allowed.has(url), url).toBe(true);
    expect(urls.some(url => /\/areas\/(?!essex-county|union-county|morris-county|middlesex-county|hudson-county)/.test(url))).toBe(false);
  });

  it('does not add an extra house-cleaning URL', () => {
    expect(urls.some(url => /\/services\/house-cleaning$/.test(url))).toBe(false);
    expect(SERVICE_PAGES.some(page => page.slug === 'house-cleaning')).toBe(false);
    expect(urls).toContain('https://www.gcscleaning.net/services/residential-commercial-cleaning');
  });
});

describe('robots', () => {
  it('is unchanged: allow all, point at the sitemap', () => {
    expect(robots()).toEqual({
      rules: [{ userAgent: '*', allow: '/' }],
      sitemap: 'https://www.gcscleaning.net/sitemap.xml'
    });
  });
});
