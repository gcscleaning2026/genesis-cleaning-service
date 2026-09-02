/**
 * Turns a service or area slug into everything a route needs: the markup input, the
 * <head> metadata and the structured data.
 *
 * Kept out of the route files because there are four of them — English and Spanish,
 * services and areas — and they should differ only in which two functions they call.
 */
import 'server-only';
import type { Metadata } from 'next';
import { navServicePages, SERVICE_PAGES } from './service-pages';
import { AREA_PAGES } from './area-pages';
import { CITY_PAGES } from './city-pages';
import { PRICING } from './pricing-page';
import { SITE_ORIGIN, type Lang } from './i18n';
import { absoluteUrl, areaPath, areasIndexPath, homePath, otherLang, pricingPath, servicePath, servicesIndexPath } from './routes';
import { AREA_SERVED } from './service-area';
import type { IndexInput, RelatedLink, SubpageInput } from './subpage';
import { AREAS_INDEX, SERVICES_INDEX } from './index-pages';

const BUSINESS_ID = `${SITE_ORIGIN}/#business`;

export const serviceBySlug = (slug: string) => SERVICE_PAGES.find(page => page.slug === slug);
export const areaBySlug = (slug: string) =>
  AREA_PAGES.find(page => page.slug === slug) ?? CITY_PAGES.find(page => page.slug === slug);
export { navServicePages };

// --- markup input ---------------------------------------------------------------------

/**
 * All twelve services as links. Every area page carries the full set, which is what stops
 * eleven of the twelve service pages from being reachable only through the home page.
 */
function allServices(lang: Lang): RelatedLink[] {
  return navServicePages().map(page => ({
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

const COUNTY_SLUGS = [
  'essex-county',
  'union-county',
  'morris-county',
  'middlesex-county',
  'hudson-county'
] as const;

function countyHubs(lang: Lang) {
  return AREA_PAGES.filter(area => (COUNTY_SLUGS as readonly string[]).includes(area.slug)).map(area => ({
    href: areaPath(lang, area.slug),
    label: area.copy[lang].name,
    icon: 'i-bold-map-pin-area'
  }));
}

function serviceLink(lang: Lang, slug: string, label: string, icon: string) {
  return { href: servicePath(lang, slug), label, icon };
}

export function serviceInput(slug: string, lang: Lang): SubpageInput | null {
  const page = serviceBySlug(slug);
  if (!page) return null;
  const es = lang === 'es';
  const base: SubpageInput = {
    lang,
    kind: 'service',
    copy: page.copy[lang],
    icon: page.icon,
    image: page.image,
    imageAlt: page.imageAlt[lang],
    related: allAreas(lang),
    relatedH2: es ? 'Condados que cubrimos' : 'Counties we cover',
    crumbs: [
      { href: homePath(lang), label: es ? 'Inicio' : 'Home' },
      { href: servicesIndexPath(lang), label: es ? 'Servicios' : 'Services' },
      { label: page.copy[lang].name }
    ],
    path: servicePath(lang, slug),
    altPath: servicePath(otherLang(lang), slug)
  };
  if (slug === 'house-cleaning') {
    return {
      ...base,
      waText: es
        ? 'Hola, necesito una cotización de limpieza de casa en Nueva Jersey.'
        : 'Hello, I need a house cleaning quote in New Jersey.',
      related: [
        serviceLink(lang, 'standard-cleaning', es ? 'Limpieza estándar (visitas fijas)' : 'Standard cleaning (standing visits)', 'i-bold-broom'),
        serviceLink(lang, 'deep-cleaning', es ? 'Limpieza profunda' : 'Deep cleaning', 'i-bold-sparkle'),
        serviceLink(lang, 'move-in-move-out-cleaning', es ? 'Limpieza de mudanza' : 'Move-in & move-out cleaning', 'i-bold-truck'),
        serviceLink(lang, 'apartment-condo-cleaning', es ? 'Limpieza de apartamentos y condos' : 'Apartment & condo cleaning', 'i-bold-building-apartment')
      ],
      relatedH2: es ? 'Servicios relacionados' : 'Related services',
      relatedHelper: es
        ? 'Las unidades, no las casas, van a limpieza de apartamentos.'
        : 'Units, not houses, go to apartment cleaning.',
      counties: countyHubs(lang),
      countiesH2: es ? 'Condados que cubrimos' : 'Counties we cover',
      coverageH2: es ? 'Disponible en cinco condados' : 'Available across five counties',
      coverageBody: es
        ? 'Limpieza de casas en Essex, Union, Morris, Middlesex y Hudson, NJ.'
        : 'House cleaning in Essex, Union, Morris, Middlesex, and Hudson County, NJ.',
      ctaH2: es ? '¿Listo para una casa más limpia?' : 'Ready for a cleaner house?',
      ctaSub: es
        ? 'Dinos el pueblo, recámaras y baños. Cotizamos por WhatsApp o por teléfono.'
        : 'Tell us the town, beds, and baths. We quote on WhatsApp or the phone.'
    };
  }
  if (slug === 'commercial-cleaning') {
    return {
      ...base,
      waText: es
        ? 'Hola, necesito una cotización de limpieza comercial para mi negocio en Nueva Jersey. Tipo de negocio:'
        : 'Hello, I need a commercial cleaning quote for my business in New Jersey. Business type:',
      related: [
        serviceLink(lang, 'office-cleaning', es ? 'Limpieza de oficinas' : 'Office workplace cleaning', 'i-bold-buildings'),
        serviceLink(lang, 'gym-cleaning', es ? 'Limpieza de gimnasios' : 'Gyms & fitness center cleaning', 'i-bold-barbell'),
        serviceLink(lang, 'construction-cleaning', es ? 'Limpieza de obra y casas modelo' : 'Construction & model home cleaning', 'i-bold-hard-hat'),
        serviceLink(lang, 'house-cleaning', es ? 'Limpieza de casas' : 'House cleaning', 'i-bold-house-line')
      ],
      relatedH2: es ? 'Servicios relacionados' : 'Related services',
      counties: countyHubs(lang),
      countiesH2: es ? 'Condados que cubrimos' : 'Counties we cover',
      coverageH2: es ? 'Disponible en cinco condados' : 'Available across five counties',
      coverageBody: es
        ? 'Limpieza comercial en Essex, Union, Morris, Middlesex y Hudson, NJ.'
        : 'Commercial cleaning in Essex, Union, Morris, Middlesex, and Hudson County, NJ.',
      ctaH2: es ? '¿Listo para un local u obra más limpios?' : 'Ready for a cleaner shop or job site?',
      ctaSub: es
        ? 'Envía el tipo de negocio, el pueblo y el horario en que podemos entrar.'
        : 'Send the business type, town, and hours we can be inside.'
    };
  }
  return base;
}

export function areaInput(slug: string, lang: Lang): SubpageInput | null {
  const county = AREA_PAGES.find(page => page.slug === slug);
  const city = CITY_PAGES.find(page => page.slug === slug);
  const page = county ?? city;
  if (!page) return null;
  const es = lang === 'es';
  if (city) {
    const relatedPage = serviceBySlug(city.relatedSlug);
    const relatedLabel = relatedPage
      ? relatedPage.copy[lang].name
      : city.relatedSlug;
    return {
      lang,
      kind: 'area',
      copy: city.copy[lang],
      icon: 'i-bold-map-pin-area',
      image: null,
      imageAlt:
        es
          ? 'Cuadrilla de Genesis Cleaning trabajando en una casa de Nueva Jersey'
          : 'Genesis Cleaning crew at work in a New Jersey home',
      towns: city.nearby,
      townsH2: es
        ? `Otros pueblos que limpiamos en el condado de ${city.county}`
        : `Other towns we clean in ${city.county} County`,
      townsHelper: es
        ? 'Mismo condado, mismo equipo. Estos nombres no son páginas aparte.'
        : 'Same county, same crew. These names are not separate pages.',
      related: relatedPage
        ? [
            {
              href: servicePath(lang, city.relatedSlug),
              label: relatedLabel,
              icon: relatedPage.icon
            }
          ]
        : [],
      relatedH2: city.copy[lang].sections[1]?.h2 ?? (es ? 'Servicios relacionados' : 'Related services'),
      relatedHelper: es ? '¿Otro tipo de trabajo? Ver todos los servicios.' : 'Need a different job? See all services.',
      crumbs: [
        { href: homePath(lang), label: es ? 'Inicio' : 'Home' },
        { href: areasIndexPath(lang), label: es ? 'Áreas de servicio' : 'Service areas' },
        {
          href: areaPath(lang, city.countySlug),
          label: es ? `Condado de ${city.county}` : `${city.county} County`
        },
        { href: areaPath(lang, city.slug), label: city.city }
      ],
      waText: es
        ? `Hola, necesito una cotización de limpieza en ${city.city}, condado de ${city.county}, NJ.`
        : `Hello, I need a cleaning quote in ${city.city}, ${city.county} County, NJ.`,
      coverageH2: es ? `Condado de ${city.county}` : `${city.county} County`,
      coverageBody: es
        ? `La cobertura completa del condado de ${city.county} está en la página del condado.`
        : `Full ${city.county} County coverage lives on the county page.`,
      coverageHref: areaPath(lang, city.countySlug),
      mobileBar: true,
      ctaH2: es ? `¿Listo para un espacio más limpio en ${city.city}?` : `Ready for a cleaner space in ${city.city}?`,
      ctaSub: es
        ? 'Dinos el edificio o la casa. Cotizamos por WhatsApp, teléfono o correo.'
        : 'Tell us the building or the house. We quote on WhatsApp, phone, or email.',
      path: areaPath(lang, slug),
      altPath: areaPath(otherLang(lang), slug)
    };
  }
  return {
    lang,
    kind: 'area',
    copy: page.copy[lang],
    icon: 'i-bold-map-pin-area',
    image: null,
    imageAlt:
      es
        ? 'Cuadrilla de Genesis Cleaning trabajando en una casa de Nueva Jersey'
        : 'Genesis Cleaning crew at work in a New Jersey home',
    towns: county!.towns,
    related: allServices(lang),
    relatedH2: es ? 'Servicios disponibles aquí' : 'Services available here',
    crumbs: [
      { href: homePath(lang), label: es ? 'Inicio' : 'Home' },
      { href: areasIndexPath(lang), label: es ? 'Áreas de servicio' : 'Service areas' },
      { label: page.copy[lang].name }
    ],
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
      canonical: absoluteUrl(path),
      languages: { en: absoluteUrl(en), es: absoluteUrl(es), 'x-default': absoluteUrl(en) }
    },
    openGraph: {
      type: 'article',
      siteName: 'Genesis Cleaning Service LLC',
      locale: lang === 'es' ? 'es_US' : 'en_US',
      alternateLocale: lang === 'es' ? 'en_US' : 'es_US',
      title,
      description,
      url: absoluteUrl(path),
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

const abs = (path: string) => absoluteUrl(path);

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
  const countyPage = AREA_PAGES.find(page => page.slug === slug);
  const cityPage = CITY_PAGES.find(page => page.slug === slug);
  const page = countyPage ?? cityPage;
  if (!page) return null;
  const copy = page.copy[lang];
  const path = areaPath(lang, slug);
  const county = {
    '@type': 'AdministrativeArea',
    name: `${page.county} County, New Jersey`,
    containedInPlace: { '@type': 'State', name: 'New Jersey' }
  };
  const areaServed = cityPage
    ? {
        '@type': 'City',
        name: `${cityPage.city}, New Jersey`,
        containedInPlace: county
      }
    : [
        county,
        ...countyPage!.towns.map(town => ({
          '@type': 'City',
          name: `${town}, New Jersey`,
          containedInPlace: county
        }))
      ];
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
    areaServed
  };
  const crumbs = cityPage
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: lang === 'es' ? 'Inicio' : 'Home', item: abs(homePath(lang)) },
          {
            '@type': 'ListItem',
            position: 2,
            name: lang === 'es' ? 'Áreas de servicio' : 'Service areas',
            item: abs(areasIndexPath(lang))
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: lang === 'es' ? `Condado de ${cityPage.county}` : `${cityPage.county} County`,
            item: abs(areaPath(lang, cityPage.countySlug))
          },
          { '@type': 'ListItem', position: 4, name: cityPage.city, item: abs(path) }
        ]
      }
    : breadcrumb(lang, lang === 'es' ? 'Áreas de servicio' : 'Service areas', areasIndexPath(lang), copy.name, path);
  return serialize([service, crumbs, faqNode(`${abs(path)}#faq`, lang, copy.faq)]);
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
    items: navServicePages().map(page => ({
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
    ? navServicePages().map(page => ({ name: page.copy[lang].name, url: abs(servicePath(lang, page.slug)) }))
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

export function pricingInput(lang: Lang): SubpageInput {
  const copy = PRICING[lang];
  const es = lang === 'es';
  return {
    lang,
    kind: 'service',
    copy,
    icon: 'i-bold-seal-check',
    image: null,
    imageAlt:
      es
        ? 'Cuadrilla de Genesis Cleaning en una casa de Nueva Jersey'
        : 'Genesis Cleaning crew at work in a New Jersey home',
    related: [
      serviceLink(lang, 'house-cleaning', es ? 'Limpieza de casas' : 'House cleaning', 'i-bold-house-line'),
      serviceLink(lang, 'commercial-cleaning', es ? 'Limpieza comercial' : 'Commercial cleaning', 'i-bold-buildings'),
      serviceLink(lang, 'office-cleaning', es ? 'Limpieza de oficinas' : 'Office cleaning', 'i-bold-buildings')
    ],
    relatedH2: es ? 'Qué cotizamos' : 'What we quote',
    relatedHelper: es
      ? 'Estas páginas explican el trabajo. El precio sigue yendo en la cotización.'
      : 'These pages explain the job. Prices still come in the quote.',
    crumbs: [
      { href: homePath(lang), label: es ? 'Inicio' : 'Home' },
      { href: pricingPath(lang), label: copy.name }
    ],
    waText: es
      ? 'Hola, me gustaría una cotización de limpieza. Puedo compartir mi ZIP, el tipo de propiedad y lo que necesito.'
      : 'Hello, I would like a cleaning quote. I can share my ZIP, property type, and what I need.',
    eyebrow: es ? 'Cotizaciones' : 'Quotes',
    showQuoteForm: true,
    mobileBar: true,
    ctaH2: es ? '¿Listo para un número para tu trabajo?' : 'Ready for a number on your job?',
    ctaSub: es ? 'WhatsApp, llama o el formulario. Sin tarifas publicadas.' : 'WhatsApp, call, or the form. No published rates.',
    path: pricingPath(lang),
    altPath: pricingPath(otherLang(lang))
  };
}

export function pricingMetadata(lang: Lang): Metadata {
  const copy = PRICING[lang];
  return metadataFrom(lang, copy.title, copy.desc, pricingPath(lang), pricingPath(otherLang(lang)));
}

export function pricingJsonLd(lang: Lang) {
  const copy = PRICING[lang];
  const path = pricingPath(lang);
  const page = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${abs(path)}#page`,
    name: copy.h1,
    description: copy.intro,
    inLanguage: lang,
    url: abs(path),
    about: { '@id': BUSINESS_ID }
  };
  return serialize([
    page,
    breadcrumb(lang, lang === 'es' ? 'Inicio' : 'Home', homePath(lang), copy.name, path)
  ]);
}
