import { describe, expect, it, vi } from 'vitest';
import sitemap from '../app/sitemap';
import robots from '../app/robots';
import { AREA_PAGES } from '../lib/area-pages';
import { CITY_PAGES, WAVE1_CITY_SLUGS } from '../lib/city-pages';
import { SERVICE_PAGES } from '../lib/service-pages';
import { cityPath, pricingPath, servicePath } from '../lib/routes';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..');

describe('sitemap', () => {
  const entries = sitemap();
  const urls = entries.map(entry => entry.url);

  it('lists the English home with a trailing slash', () => {
    expect(urls).toContain('https://www.gcscleaning.net/');
    expect(urls).not.toContain('https://www.gcscleaning.net');
  });

  it('gives every non-home URL an unslashed loc', () => {
    for (const url of urls) {
      if (url === 'https://www.gcscleaning.net/') continue;
      expect(url.endsWith('/'), url).toBe(false);
    }
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

  it('publishes Wave 1 city locs under /areas/ and /es/areas/ (flat, not nested)', () => {
    expect([...WAVE1_CITY_SLUGS].sort()).toEqual(
      [
        'orange',
        'east-orange',
        'west-orange',
        'newark',
        'montclair',
        'bloomfield',
        'elizabeth',
        'edison',
        'jersey-city',
        'hoboken'
      ].sort()
    );
    expect(CITY_PAGES.map(page => page.slug).sort()).toEqual([...WAVE1_CITY_SLUGS].sort());
    for (const slug of WAVE1_CITY_SLUGS) {
      expect(cityPath('en', slug)).toBe(`/areas/${slug}`);
      expect(cityPath('es', slug)).toBe(`/es/areas/${slug}`);
      expect(urls).toContain(`https://www.gcscleaning.net/areas/${slug}`);
      expect(urls).toContain(`https://www.gcscleaning.net/es/areas/${slug}`);
    }
    expect(urls.some(url => /\/areas\/[^/]+\/[^/?#]+/.test(url))).toBe(false);
    const countySlugs = AREA_PAGES.map(page => page.slug);
    for (const slug of countySlugs) {
      expect(urls).toContain(`https://www.gcscleaning.net/areas/${slug}`);
      expect(urls).toContain(`https://www.gcscleaning.net/es/areas/${slug}`);
    }
  });

  it('publishes house-cleaning, commercial-cleaning, and pricing; drops the combo', () => {
    expect(urls).toContain('https://www.gcscleaning.net/services/house-cleaning');
    expect(urls).toContain('https://www.gcscleaning.net/es/services/house-cleaning');
    expect(urls).toContain('https://www.gcscleaning.net/services/commercial-cleaning');
    expect(urls).toContain('https://www.gcscleaning.net/es/services/commercial-cleaning');
    expect(urls).toContain('https://www.gcscleaning.net/pricing');
    expect(urls).toContain('https://www.gcscleaning.net/es/pricing');
    expect(servicePath('en', 'house-cleaning')).toBe('/services/house-cleaning');
    expect(servicePath('es', 'commercial-cleaning')).toBe('/es/services/commercial-cleaning');
    expect(pricingPath('en')).toBe('/pricing');
    expect(pricingPath('es')).toBe('/es/pricing');
    expect(urls).not.toContain('https://www.gcscleaning.net/services/residential-commercial-cleaning');
    expect(urls).not.toContain('https://www.gcscleaning.net/es/services/residential-commercial-cleaning');
    expect(SERVICE_PAGES.some(page => page.slug === 'house-cleaning')).toBe(false);
    expect(SERVICE_PAGES.some(page => page.slug === 'commercial-cleaning')).toBe(false);
  });

  it('gives Wave 1 new pages a truthful lastmod of 2026-09-03', () => {
    const wave1Paths = [
      ...WAVE1_CITY_SLUGS.flatMap(slug => [`/areas/${slug}`, `/es/areas/${slug}`]),
      '/services/house-cleaning',
      '/es/services/house-cleaning',
      '/services/commercial-cleaning',
      '/es/services/commercial-cleaning',
      '/pricing',
      '/es/pricing'
    ];
    for (const path of wave1Paths) {
      const entry = entries.find(e => e.url === `https://www.gcscleaning.net${path}`);
      expect(entry, path).toBeTruthy();
      expect((entry!.lastModified as Date).toISOString().slice(0, 10), path).toBe('2026-09-03');
    }
  });

  it('does not fire-and-forget IndexNow from sitemap()', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200, statusText: 'OK' });
    vi.stubGlobal('fetch', fetchMock);
    process.env.INDEXNOW_KEY = 'test-key-123';
    sitemap();
    await Promise.resolve();
    expect(fetchMock).not.toHaveBeenCalled();
    delete process.env.INDEXNOW_KEY;
    vi.unstubAllGlobals();
  });

  it('does not import submitToIndexNow', () => {
    const src = readFileSync(join(rootDir, 'app/sitemap.ts'), 'utf8');
    expect(src).not.toMatch(/submitToIndexNow/);
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

describe('trailingSlash lock', () => {
  it('is false in next.config.ts and vercel.ts', () => {
    const nextConfig = readFileSync(join(rootDir, 'next.config.ts'), 'utf8');
    const vercel = readFileSync(join(rootDir, 'vercel.ts'), 'utf8');
    expect(nextConfig).toMatch(/trailingSlash:\s*false/);
    expect(vercel).toMatch(/trailingSlash:\s*false/);
  });

  it('does not bake INDEXNOW_KEY into next.config rewrites', () => {
    const nextConfig = readFileSync(join(rootDir, 'next.config.ts'), 'utf8');
    expect(nextConfig).not.toMatch(/INDEXNOW_KEY/);
    expect(nextConfig).not.toMatch(/rewrites\s*\(/);
  });
});
