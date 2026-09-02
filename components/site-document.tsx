import type { Metadata, Viewport } from 'next';
import { HEAD, SITE_ORIGIN, type Lang } from '@/lib/i18n';
import { SERVICE_PAGES } from '@/lib/service-pages';
import { AREA_SERVED, BUSINESS_ADDRESS } from '@/lib/service-area';
import { servicePath } from '@/lib/routes';
import { SAME_AS } from '@/lib/social';
import { aggregateRating, getApprovedReviews } from '@/lib/reviews-cache';

// English lives at /, Spanish at /es. They are separate root layouts (app/(en) and
// app/(es)) rather than one shared layout because the two pages must ship different
// `<html lang>` attributes in the static HTML — a crawler that never runs the language
// toggle has to see the right one.

const BUSINESS_ID = `${SITE_ORIGIN}/#business`;

const OG_IMAGE = '/assets/gcs-og.jpg';
const OG_IMAGE_ALT = 'Genesis Cleaning Service LLC — professional cleaning you can trust';

/** Per-language <head>. Mirrors what the old scripts/prerender.mjs wrote by hand. */
export function metadataFor(lang: Lang): Metadata {
  const h = HEAD[lang];
  const other = HEAD[lang === 'es' ? 'en' : 'es'];
  return {
    metadataBase: new URL(SITE_ORIGIN),
    title: h.title,
    description: h.desc,
    alternates: {
      canonical: h.path,
      languages: {
        en: HEAD.en.path,
        es: HEAD.es.path,
        'x-default': HEAD.en.path
      }
    },
    openGraph: {
      type: 'website',
      siteName: 'Genesis Cleaning Service LLC',
      locale: h.locale,
      alternateLocale: other.locale,
      title: h.ogTitle,
      description: h.ogDesc,
      url: h.path,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: OG_IMAGE_ALT }]
    },
    twitter: {
      card: 'summary_large_image',
      title: h.ogTitle,
      description: h.ogDesc,
      images: [OG_IMAGE]
    },
    icons: {
      icon: [{ url: '/assets/gcs-icon-96.png', type: 'image/png', sizes: '96x96' }],
      apple: '/assets/gcs-icon-180.png'
    }
  };
}

export const viewport: Viewport = {
  themeColor: '#071336'
};

// The one prose field of the business node, per language. Everything else about the
// business is language-neutral, so only this and `inLanguage` differ between the two
// pages — `@id` and `url` deliberately do not: there is one business, described twice.
const BUSINESS_DESCRIPTION: Record<Lang, string> = {
  en: 'Residential, commercial, construction and window cleaning for homes and businesses in Essex, Union, Morris, Middlesex and Hudson County, New Jersey. Bilingual English and Spanish service.',
  es: 'Limpieza residencial, comercial, post-construcción y de ventanas para casas y negocios en los condados de Essex, Union, Morris, Middlesex y Hudson, Nueva Jersey. Servicio bilingüe en inglés y español.'
};

const BUSINESS = {
  '@context': 'https://schema.org',
  '@type': 'CleaningService',
  '@id': BUSINESS_ID,
  name: 'Genesis Cleaning Service LLC',
  alternateName: 'GCS',
  url: `${SITE_ORIGIN}/`,
  image: `${SITE_ORIGIN}${OG_IMAGE}`,
  logo: `${SITE_ORIGIN}/assets/gcs-badge.webp`,
  slogan: 'Los detalles hacen la diferencia',
  telephone: '+1-882-930-0319',
  email: 'service@gcscleaning.net',
  address: BUSINESS_ADDRESS,
  // The profiles Google and the AI crawlers already have; sameAs is what ties them to this
  // entity, and the same URLs are linked from the contact card and the footer.
  sameAs: SAME_AS,
  areaServed: AREA_SERVED,
  availableLanguage: [
    { '@type': 'Language', name: 'English', alternateName: 'en' },
    { '@type': 'Language', name: 'Spanish', alternateName: 'es' }
  ]
};

/**
 * All twelve services, from the same data the twelve service pages are built from.
 *
 * A bare name tells a parser nothing it could not guess, so each Offer carries what the
 * service covers, who provides it, where, and the URL of the page that says the same thing
 * in prose. It is derived rather than hand-listed because a hand-listed copy is how this
 * ended up claiming four services while the page showed twelve.
 */
function offerCatalog(lang: Lang) {
  return {
    '@type': 'OfferCatalog',
    name: lang === 'es' ? 'Servicios de limpieza' : 'Cleaning services',
    itemListElement: SERVICE_PAGES.map(page => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        '@id': `${SITE_ORIGIN}${servicePath(lang, page.slug)}#service`,
        name: page.copy[lang].name,
        serviceType: page.copy[lang].name,
        description: page.copy[lang].intro,
        url: `${SITE_ORIGIN}${servicePath(lang, page.slug)}`,
        provider: { '@id': BUSINESS_ID },
        areaServed: AREA_SERVED
      }
    }))
  };
}

// Every value above is a constant in this file, but the escape is what keeps that true
// under edits: a `<` inside any string would otherwise close the script tag early. The two
// JSON seeds and the FAQ node in site-page.tsx do the same.
function businessJson(lang: Lang, rating: object | null) {
  const node = {
    ...BUSINESS,
    description: BUSINESS_DESCRIPTION[lang],
    inLanguage: HEAD[lang].lang,
    hasOfferCatalog: offerCatalog(lang),
    ...(rating ? { aggregateRating: rating } : {})
  };
  return JSON.stringify(node).replace(/</g, '\\u003c');
}

// Below-the-fold content is hidden by `html.gcs-anim` until the motion chunk has built
// its timelines. If that chunk never arrives, the class has to come off anyway — the
// runtime has its own shorter timers, this is the last-resort one that survives even a
// crashed bundle.
const MOTION_BAIL =
  'setTimeout(function(){if(!window.__gcsMotionReady)document.documentElement.classList.remove("gcs-anim")},4500)';

// Nothing is preloaded from here any more.
//
// The two variable fonts used to be, and they were 57 KB queued ahead of the LCP image on a
// connection that had roughly 275 KB to move before it could paint. The LCP element is a
// photograph, not text: `font-display: swap` already paints the headline in the fallback
// face and swaps it when the file lands, and the measured CLS has an order of magnitude of
// headroom to absorb that swap. The hero preload moved to components/site-page.tsx, which is
// the only route that shows the hero — leaving it here would have downloaded it on all
// thirty-four pages that do not.

/**
 * Prerender the next page on hover.
 *
 * The site is a hub with seventeen spokes, so most visits now involve at least one internal
 * navigation. `moderate` starts the prerender on hover rather than for every link in the
 * viewport, which is the difference between helping and prefetching thirty pages nobody
 * asked for. /admin and /api are excluded: one is behind a session check, the other is a
 * POST endpoint, and neither is somewhere a link on this site leads.
 */
const SPECULATION_RULES = JSON.stringify({
  prerender: [
    {
      where: {
        and: [
          { href_matches: '/*' },
          { not: { href_matches: '/admin/*' } },
          { not: { href_matches: '/api/*' } }
        ]
      },
      eagerness: 'moderate'
    }
  ]
});

export async function SiteDocument({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  // The rating belongs to the business rather than to one page, so it is computed here and
  // rides along on every route. `cache()` in lib/reviews-cache.ts keeps this and the
  // marquee's own fetch to a single query per render.
  const rating = aggregateRating(await getApprovedReviews());
  return (
    <html lang={lang} className="gcs-anim">
      <body>
        {/* The gcs-anim class pre-hides revealed content until a script takes it off. With
            scripts blocked entirely nothing ever does, so that pre-hide has to undo itself
            rather than leave the page half empty. Covers the home page too. */}
        <noscript>
          <style>
            {'html.gcs-anim [data-reveal],html.gcs-anim [data-val]{opacity:1}html.gcs-anim [data-clip]{clip-path:none}'}
          </style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: businessJson(lang, rating) }} />
        <script type="speculationrules" dangerouslySetInnerHTML={{ __html: SPECULATION_RULES }} />
        <script dangerouslySetInnerHTML={{ __html: MOTION_BAIL }} />
        {children}
      </body>
    </html>
  );
}
