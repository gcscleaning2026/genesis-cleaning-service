/**
 * Turns a service or area slug into everything a route needs: the markup input, the
 * <head> metadata and the structured data.
 *
 * Kept out of the route files because there are four of them — English and Spanish,
 * services and areas — and they should differ only in which two functions they call.
 */
import 'server-only';
import type { Metadata } from 'next';
import { SERVICE_PAGES } from './service-pages';
import { AREA_PAGES } from './area-pages';
import { SITE_ORIGIN, type Lang } from './i18n';
import { areaPath, areasIndexPath, homePath, otherLang, servicePath, servicesIndexPath } from './routes';
import { AREA_SERVED } from './service-area';
import type { IndexInput, RelatedLink, SubpageInput } from './subpage';
import { AREAS_INDEX, SERVICES_INDEX } from './index-pages';

const BUSINESS_ID = `${SITE_ORIGIN}/#business`;

export const serviceBySlug = (slug: string) => SERVICE_PAGES.find(page => page.slug === slug);
export const areaBySlug = (slug: string) => AREA_PAGES.find(page => page.slug === slug);

// --- markup input ---------------------------------------------------------------------

/**
 * All twelve services as links. Every area page carries the full set, which is what stops
 * eleven of the twelve service pages from being reachable only through the home page.
 */
function allServices(lang: Lang): RelatedLink[] {
  return SERVICE_PAGES.map(page => ({
    href: servicePath(lang, page.slug),
    label: page.copy[lang].name,
    icon: page.icon
  }));
}

function allAreas(lang: Lang, exclude?: string): RelatedLink[] {
  return AREA_PAGES.filter(area => area.slug !== exclude).map(area => ({
    href: areaPath(lang, area.slug),
    label: area.copy[lang].name,
    icon: 'i-bold-map-pin-area'
  }));
}

export function serviceInput(slug: string, lang: Lang): SubpageInput | null {
  const page = serviceBySlug(slug);
  if (!page) return null;
  return {
    lang,
    kind: 'service',
    copy: page.copy[lang],
    icon: page.icon,
    image: page.image,
    imageAlt: page.imageAlt[lang],
    // A service page sends you to the counties, not to the other eleven services: someone
    // reading about move-out cleaning wants to know whether we reach them.
    related: allAreas(lang),
    relatedH2: lang === 'es' ? 'Condados que cubrimos' : 'Counties we cover',
    path: servicePath(lang, slug),
    altPath: servicePath(otherLang(lang), slug)
  };
}

export function areaInput(slug: string, lang: Lang): SubpageInput | null {
  const page = areaBySlug(slug);
  if (!page) return null;
  return {
    lang,
    kind: 'area',
    copy: page.copy[lang],
    icon: 'i-bold-map-pin-area',
    image: null,
    imageAlt:
      lang === 'es'
        ? 'Cuadrilla de Genesis Cleaning trabajando en una casa de Nueva Jersey'
        : 'Genesis Cleaning crew at work in a New Jersey home',
    towns: page.towns,
    related: allServices(lang),
    relatedH2: lang === 'es' ? 'Servicios disponibles aquí' : 'Services available here',
    path: areaPath(lang, slug),
    altPath: areaPath(otherLang(lang), slug)
  };
}

// --- <head> ----------------------------------------------------------------------------

function metadataFrom(
  lang: Lang,
  title: string,
  description: string,
  path: string,
  altPath: string,
  image?: string
): Metadata {
  const en = lang === 'en' ? path : altPath;
  const es = lang === 'es' ? path : altPath;
  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: { en, es, 'x-default': en }
    },
    openGraph: {
      type: 'article',
      siteName: 'Genesis Cleaning Service LLC',
      locale: lang === 'es' ? 'es_US' : 'en_US',
      alternateLocale: lang === 'es' ? 'en_US' : 'es_US',
      title,
      description,
      url: path,
      images: [{ url: image ?? '/assets/gcs-og.jpg', width: 1200, height: 630, alt: title }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image ?? '/assets/gcs-og.jpg']
    }
  };
}

export function serviceMetadata(slug: string, lang: Lang): Metadata {
  const page = serviceBySlug(slug);
  if (!page) return {};
  const copy = page.copy[lang];
  return metadataFrom(
    lang,
    copy.title,
    copy.desc,
    servicePath(lang, slug),
    servicePath(otherLang(lang), slug)
  );
}

export function areaMetadata(slug: string, lang: Lang): Metadata {
  const page = areaBySlug(slug);
  if (!page) return {};
  const copy = page.copy[lang];
  return metadataFrom(lang, copy.title, copy.desc, areaPath(lang, slug), areaPath(otherLang(lang), slug));
}

// --- structured data ---------------------------------------------------------------------

const abs = (path: string) => `${SITE_ORIGIN}${path}`;

function breadcrumb(lang: Lang, parentName: string, parentPath: string, name: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: lang === 'es' ? 'Inicio' : 'Home', item: abs(homePath(lang)) },
      { '@type': 'ListItem', position: 2, name: parentName, item: abs(parentPath) },
      { '@type': 'ListItem', position: 3, name, item: abs(path) }
    ]
  };
}

function faqNode(id: string, lang: Lang, faq: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': id,
    inLanguage: lang,
    mainEntity: faq.map(entry => ({
      '@type': 'Question',
      name: entry.q,
      acceptedAnswer: { '@type': 'Answer', text: entry.a }
    }))
  };
}

/** Escaped so a `<` in any string cannot close the script tag early. */
const serialize = (nodes: unknown[]) => JSON.stringify(nodes).replace(/</g, '\\u003c');

export function serviceJsonLd(slug: string, lang: Lang) {
  const page = serviceBySlug(slug);
  if (!page) return null;
  const copy = page.copy[lang];
  const path = servicePath(lang, slug);
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${abs(path)}#service`,
    name: copy.name,
    serviceType: copy.name,
    description: copy.intro,
    inLanguage: lang,
    url: abs(path),
    provider: { '@id': BUSINESS_ID },
    areaServed: AREA_SERVED,
    // The checklist on the page, said again as data. Anything here is on the page; the
    // point of structured data is not to claim more than the page does.
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: copy.includesH2,
      itemListElement: copy.includes.map(item => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: item, provider: { '@id': BUSINESS_ID } }
      }))
    }
  };
  return serialize([
    service,
    breadcrumb(lang, lang === 'es' ? 'Servicios' : 'Services', servicesIndexPath(lang), copy.name, path),
    faqNode(`${abs(path)}#faq`, lang, copy.faq)
  ]);
}

export function areaJsonLd(slug: string, lang: Lang) {
  const page = areaBySlug(slug);
  if (!page) return null;
  const copy = page.copy[lang];
  const path = areaPath(lang, slug);
  const county = {
    '@type': 'AdministrativeArea',
    name: `${page.county} County, New Jersey`,
    containedInPlace: { '@type': 'State', name: 'New Jersey' }
  };
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${abs(path)}#service`,
    name: copy.h1,
    serviceType: lang === 'es' ? 'Servicio de limpieza' : 'Cleaning service',
    description: copy.intro,
    inLanguage: lang,
    url: abs(path),
    provider: { '@id': BUSINESS_ID },
    // The county, then the municipalities named on the page. Towns are Cities inside the
    // county rather than a flat list, so a parser can tell which contains which.
    areaServed: [
      county,
      ...page.towns.map(town => ({
        '@type': 'City',
        name: `${town}, New Jersey`,
        containedInPlace: county
      }))
    ]
  };
  return serialize([
    service,
    breadcrumb(lang, lang === 'es' ? 'Áreas de servicio' : 'Service areas', areasIndexPath(lang), copy.name, path),
    faqNode(`${abs(path)}#faq`, lang, copy.faq)
  ]);
}

// --- hub pages ---------------------------------------------------------------------------

/** First sentence of a page's intro, for the card blurbs on the hub. */
const firstSentence = (text: string) => {
  const stop = text.indexOf('. ');
  return stop === -1 ? text : text.slice(0, stop + 1);
};

export function servicesIndexInput(lang: Lang): IndexInput {
  return {
    lang,
    kind: 'service',
    copy: SERVICES_INDEX[lang],
    items: SERVICE_PAGES.map(page => ({
      href: servicePath(lang, page.slug),
      label: page.copy[lang].name,
      icon: page.icon,
      blurb: firstSentence(page.copy[lang].intro)
    })),
    path: servicesIndexPath(lang),
    altPath: servicesIndexPath(otherLang(lang))
  };
}

export function areasIndexInput(lang: Lang): IndexInput {
  return {
    lang,
    kind: 'area',
    copy: AREAS_INDEX[lang],
    items: AREA_PAGES.map(page => ({
      href: areaPath(lang, page.slug),
      label: page.copy[lang].name,
      icon: 'i-bold-map-pin-area',
      // The county page's own opening line, then the towns it names. Town names alone made
      // the hub the thinnest page on the site and told a reader nothing they could choose on.
      blurb: `${firstSentence(page.copy[lang].intro)} ${page.towns.slice(0, 5).join(', ')}…`
    })),
    path: areasIndexPath(lang),
    altPath: areasIndexPath(otherLang(lang))
  };
}

export function servicesIndexMetadata(lang: Lang): Metadata {
  const copy = SERVICES_INDEX[lang];
  return metadataFrom(lang, copy.title, copy.desc, servicesIndexPath(lang), servicesIndexPath(otherLang(lang)));
}

export function areasIndexMetadata(lang: Lang): Metadata {
  const copy = AREAS_INDEX[lang];
  return metadataFrom(lang, copy.title, copy.desc, areasIndexPath(lang), areasIndexPath(otherLang(lang)));
}

/**
 * CollectionPage plus the ItemList it holds, so the hub is described as a listing rather
 * than as another page that happens to have links on it, and the breadcrumb has a real
 * middle rung to point at.
 */
function indexJsonLd(lang: Lang, kind: 'service' | 'area') {
  const isService = kind === 'service';
  const copy = isService ? SERVICES_INDEX[lang] : AREAS_INDEX[lang];
  const path = isService ? servicesIndexPath(lang) : areasIndexPath(lang);
  const items = isService
    ? SERVICE_PAGES.map(page => ({ name: page.copy[lang].name, url: abs(servicePath(lang, page.slug)) }))
    : AREA_PAGES.map(page => ({ name: page.copy[lang].name, url: abs(areaPath(lang, page.slug)) }));
  return serialize([
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${abs(path)}#collection`,
      name: copy.h1,
      description: copy.intro,
      inLanguage: lang,
      url: abs(path),
      about: { '@id': BUSINESS_ID },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: items.length,
        itemListElement: items.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
          url: item.url
        }))
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: lang === 'es' ? 'Inicio' : 'Home', item: abs(homePath(lang)) },
        { '@type': 'ListItem', position: 2, name: copy.h1, item: abs(path) }
      ]
    }
  ]);
}

export const servicesIndexJsonLd = (lang: Lang) => indexJsonLd(lang, 'service');
export const areasIndexJsonLd = (lang: Lang) => indexJsonLd(lang, 'area');
