import { vi } from 'vitest';
vi.mock('server-only', () => ({}));
import { describe, expect, it } from 'vitest';
import { absoluteUrl, areaPath, homePath, pricingPath, servicePath } from '../lib/routes';
import { CITY_PAGES, otherTownsFor } from '../lib/city-pages';
import { COMMERCIAL_CLEANING, HOUSE_CLEANING, NAV_DROP_SLUGS, PRICING_COPY } from '../lib/wave1-services';
import { cityInput, cityJsonLd, pricingInput, servicesIndexInput, wave1ServiceInput } from '../lib/subpage-build';
import { subpageHtml } from '../lib/subpage';
import { SERVICE_PAGES } from '../lib/service-pages';
import { SITE_HTML } from '../lib/site-content';
import { AREA_PAGES } from '../lib/area-pages';

const LANGS = ['en', 'es'] as const;

describe('absoluteUrl', () => {
  it('keeps a slash only on the English home', () => {
    expect(absoluteUrl('/')).toBe('https://www.gcscleaning.net/');
    expect(absoluteUrl(homePath('es'))).toBe('https://www.gcscleaning.net/es');
    expect(absoluteUrl('/services')).toBe('https://www.gcscleaning.net/services');
    expect(absoluteUrl('/areas/orange')).toBe('https://www.gcscleaning.net/areas/orange');
  });
});

describe('wave 1 cities', () => {
  it('publishes ten flat city slugs that do not collide with counties', () => {
    expect(new Set(CITY_PAGES.map(page => page.slug))).toEqual(new Set([
      'jersey-city',
      'hoboken',
      'orange',
      'east-orange',
      'west-orange',
      'montclair',
      'bloomfield',
      'newark',
      'elizabeth',
      'edison'
    ]));
    const county = new Set(AREA_PAGES.map(page => page.slug));
    for (const page of CITY_PAGES) expect(county.has(page.slug)).toBe(false);
  });

  it('keeps titles 50-60 and descriptions 150-160, unique per language', () => {
    for (const lang of LANGS) {
      const titles = CITY_PAGES.map(page => page.copy[lang].title);
      const descs = CITY_PAGES.map(page => page.copy[lang].desc);
      expect(new Set(titles).size).toBe(titles.length);
      expect(new Set(descs).size).toBe(descs.length);
      for (const page of CITY_PAGES) {
        const { title, desc, h1 } = page.copy[lang];
        expect(title.length, `${page.slug}/${lang} title ${title}`).toBeGreaterThanOrEqual(50);
        expect(title.length, `${page.slug}/${lang} title ${title}`).toBeLessThanOrEqual(60);
        expect(desc.length, `${page.slug}/${lang} desc`).toBeGreaterThanOrEqual(150);
        expect(desc.length, `${page.slug}/${lang} desc`).toBeLessThanOrEqual(160);
        expect(h1).toContain(page.city);
      }
    }
  });

  it('renders one related service, chips without links, county hub, no quote form or HowTo', () => {
    const html = subpageHtml(cityInput('jersey-city', 'en')!);
    expect(html).toContain(areaPath('en', 'hudson-county'));
    expect(html).toContain(servicePath('en', 'apartment-condo-cleaning'));
    expect(html).not.toContain('id="quote"');
    expect(html).not.toContain('/areas/hudson-county/jersey-city');
    expect(html.match(/href="\/services\//g)?.length).toBeGreaterThanOrEqual(1);
    const json = cityJsonLd('jersey-city', 'en')!;
    expect(json).toContain('BreadcrumbList');
    expect(json).toContain('"@type":"Service"');
    expect(json).not.toContain('HowTo');
    expect(otherTownsFor('hudson-county', 'Jersey City')).not.toContain('Jersey City');
  });

  it('uses Orange 07050 without a street', () => {
    const html = subpageHtml(cityInput('orange', 'en')!);
    expect(html).toContain('07050');
    expect(html.toLowerCase()).not.toContain('street');
  });
});

describe('wave 1 services and pricing', () => {
  it('keeps house and commercial off SERVICE_PAGES so sitemap.ts can stay untouched', () => {
    expect(SERVICE_PAGES.some(page => page.slug === 'house-cleaning')).toBe(false);
    expect(SERVICE_PAGES.some(page => page.slug === 'commercial-cleaning')).toBe(false);
    expect(HOUSE_CLEANING.image).not.toBe('gcs-svc-office');
    expect(COMMERCIAL_CLEANING.image).not.toBe('gcs-svc-office');
  });

  it('drops the combo page from the services hub', () => {
    const items = servicesIndexInput('en').items.map(item => item.href);
    expect(items).toContain(servicePath('en', 'house-cleaning'));
    expect(items).toContain(servicePath('en', 'commercial-cleaning'));
    expect(items.some(href => href.includes('residential-commercial-cleaning'))).toBe(false);
    expect(NAV_DROP_SLUGS.has('residential-commercial-cleaning')).toBe(true);
  });

  it('fits house, commercial, and pricing titles and descriptions', () => {
    const pages = [
      HOUSE_CLEANING.copy,
      COMMERCIAL_CLEANING.copy,
      { en: { title: PRICING_COPY.en.title, desc: PRICING_COPY.en.desc }, es: { title: PRICING_COPY.es.title, desc: PRICING_COPY.es.desc } }
    ];
    for (const page of pages) {
      for (const lang of LANGS) {
        expect(page[lang].title.length, page[lang].title).toBeGreaterThanOrEqual(50);
        expect(page[lang].title.length, page[lang].title).toBeLessThanOrEqual(60);
        expect(page[lang].desc.length).toBeGreaterThanOrEqual(150);
        expect(page[lang].desc.length).toBeLessThanOrEqual(160);
      }
    }
  });

  it('does not put a quote form on house or commercial pages', () => {
    expect(subpageHtml(wave1ServiceInput('house-cleaning', 'en')!)).not.toContain('<!--QUOTE_FORM-->');
    expect(subpageHtml(wave1ServiceInput('commercial-cleaning', 'en')!)).not.toContain('<!--QUOTE_FORM-->');
    expect(subpageHtml(pricingInput('en'))).toContain('<!--QUOTE_FORM-->');
    expect(pricingPath('en')).toBe('/pricing');
    expect(pricingPath('es')).toBe('/es/pricing');
  });
});

describe('wave 1 review fixes', () => {
  it('maps one related service per city variant', () => {
    const related: Record<string, string> = {
      'jersey-city': 'apartment-condo-cleaning',
      hoboken: 'apartment-condo-cleaning',
      orange: 'house-cleaning',
      'east-orange': 'house-cleaning',
      'west-orange': 'house-cleaning',
      montclair: 'house-cleaning',
      bloomfield: 'house-cleaning',
      elizabeth: 'commercial-cleaning',
      edison: 'commercial-cleaning',
      newark: 'move-in-move-out-cleaning'
    };
    for (const page of CITY_PAGES) expect(page.relatedSlug).toBe(related[page.slug]);
  });

  it('uses Home / Areas / County / City crumbs and a four-rung BreadcrumbList', () => {
    const input = cityInput('jersey-city', 'en')!;
    expect(input.crumbs?.map(c => c.href)).toEqual(['/', '/areas', '/areas/hudson-county', '/areas/jersey-city']);
    const json = cityJsonLd('jersey-city', 'en')!;
    expect(json).toContain('/areas/hudson-county');
    expect(json).toContain('/areas/jersey-city');
    expect(json).not.toContain('/areas/hudson-county/jersey-city');
  });

  it('sets H1s to apartment, house, shop, or move-out by city', () => {
    expect(CITY_PAGES.find(p => p.slug === 'newark')!.copy.en.h1).toMatch(/move-out/i);
    expect(CITY_PAGES.find(p => p.slug === 'elizabeth')!.copy.en.h1).toMatch(/shop/i);
    expect(CITY_PAGES.find(p => p.slug === 'edison')!.copy.en.h1).toMatch(/shop/i);
    expect(CITY_PAGES.find(p => p.slug === 'jersey-city')!.copy.en.h1).toMatch(/apartment/i);
    expect(CITY_PAGES.find(p => p.slug === 'orange')!.copy.en.h1).toMatch(/house/i);
  });

  it('keeps city, house, and commercial bottom bands to WhatsApp and Call', () => {
    const band = (html: string) => html.slice(html.indexOf('id="contact"'), html.indexOf('</main>'));
    for (const html of [
      subpageHtml(cityInput('orange', 'en')!),
      subpageHtml(wave1ServiceInput('house-cleaning', 'en')!),
      subpageHtml(wave1ServiceInput('commercial-cleaning', 'en')!)
    ]) {
      const cta = band(html);
      expect(cta).toContain('wa.me');
      expect(cta).toContain('tel:+18829300319');
      expect(cta).not.toContain('mailto:');
    }
  });

  it('puts areas, pricing, and services on subpage mobile nav and a hamburger', () => {
    const html = subpageHtml(cityInput('hoboken', 'en')!);
    expect(html).toContain('id="gcs-burger"');
    expect(html).toContain('id="gcs-mobnav"');
    const nav = html.slice(html.indexOf('id="gcs-mobnav"'), html.indexOf('</header>'));
    expect(nav).toContain('/areas');
    expect(nav).toContain('/pricing');
    expect(nav).toContain('/services');
  });

  it('links commercial cleaning from the home grid and keeps combo off nav', () => {
    expect(SITE_HTML).toContain('href="/services/commercial-cleaning"');
    const mob = SITE_HTML.slice(SITE_HTML.indexOf('id="gcs-mobnav"'));
    expect(mob).toContain('/areas');
    expect(mob).toContain('/pricing');
    expect(mob).toContain('/services');
    expect(mob).not.toContain('residential-commercial-cleaning');
  });
});
