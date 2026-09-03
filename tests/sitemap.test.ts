import { describe, expect, it, vi } from 'vitest';
import sitemap from '../app/sitemap';
import robots from '../app/robots';
import { AREA_PAGES } from '../lib/area-pages';
import { SERVICE_PAGES } from '../lib/service-pages';
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
