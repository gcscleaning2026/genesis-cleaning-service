import type { Metadata, Viewport } from 'next';
import { preload } from 'react-dom';
import { HEAD, SITE_ORIGIN, type Lang } from '@/lib/i18n';
import { HERO_AVIF_SRCSET, HERO_PRELOAD_HREF, HERO_SIZES } from '@/lib/hero-image';

// English lives at /, Spanish at /es. They are separate root layouts (app/(en) and
// app/(es)) rather than one shared layout because the two pages must ship different
// `<html lang>` attributes in the static HTML — a crawler that never runs the language
// toggle has to see the right one.

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

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'CleaningService',
  '@id': `${SITE_ORIGIN}/#business`,
  name: 'Genesis Cleaning Service LLC',
  alternateName: 'GCS',
  url: `${SITE_ORIGIN}/`,
  image: `${SITE_ORIGIN}${OG_IMAGE}`,
  logo: `${SITE_ORIGIN}/assets/gcs-badge.webp`,
  slogan: 'Los detalles hacen la diferencia',
  description:
    'Residential, commercial, construction and window cleaning for homes and businesses in New Jersey. Bilingual English and Spanish service.',
  telephone: '+1-908-338-3160',
  email: 'service@gcscleaning.net',
  areaServed: { '@type': 'State', name: 'New Jersey' },
  availableLanguage: [
    { '@type': 'Language', name: 'English', alternateName: 'en' },
    { '@type': 'Language', name: 'Spanish', alternateName: 'es' }
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Cleaning services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Residential Cleaning' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Commercial Cleaning' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Construction Cleaning' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Window Cleaning' } }
    ]
  }
};

// Below-the-fold content is hidden by `html.gcs-anim` until the motion chunk has built
// its timelines. If that chunk never arrives, the class has to come off anyway — the
// runtime has its own shorter timers, this is the last-resort one that survives even a
// crashed bundle.
const MOTION_BAIL =
  'setTimeout(function(){if(!window.__gcsMotionReady)document.documentElement.classList.remove("gcs-anim")},4500)';

// Fonts and icons are same-origin (see app/globals.css), so nothing third-party is on
// the critical path. Preloading both variable fonts and the LCP image starts them
// before the inlined CSS and the JS bundle are parsed. ReactDOM.preload rather than a
// <link> element: React hoists both into <head>, but the element also stays in the tree
// and ends up emitted twice.
function preloadCriticalAssets() {
  preload('/assets/fonts/outfit-latin-var.woff2', { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' });
  preload('/assets/fonts/manrope-latin-var.woff2', { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' });
  // The hero is a <picture>: AVIF first, WebP behind it. `type` is what keeps the two
  // in step — a browser without AVIF ignores a preload it cannot decode and falls
  // through to the <img>, so it never downloads a format it will not use. Preloading
  // the WebP as well would hand every modern browser both copies.
  preload(HERO_PRELOAD_HREF, {
    as: 'image',
    type: 'image/avif',
    imageSrcSet: HERO_AVIF_SRCSET,
    imageSizes: HERO_SIZES,
    fetchPriority: 'high'
  });
}

export function SiteDocument({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  preloadCriticalAssets();
  return (
    <html lang={lang} className="gcs-anim">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
        <script dangerouslySetInnerHTML={{ __html: MOTION_BAIL }} />
        {children}
      </body>
    </html>
  );
}
