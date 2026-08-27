import { preload } from 'react-dom';
import { I18N_SEED, pageHtml } from '@/lib/render';
import { faqJsonLd } from '@/lib/faq-schema';
import type { Lang } from '@/lib/i18n';
import { getApprovedReviews } from '@/lib/reviews-cache';
import { HERO_AVIF_SRCSET, HERO_PRELOAD_HREF, HERO_SIZES } from '@/lib/hero-image';
import SiteRuntime from './site-runtime';

// The English strings have to survive onto the Spanish page: the runtime builds its
// English dictionary from this table, and on /es the DOM it would otherwise read is
// Spanish. Escaping `<` keeps the JSON from closing the script tag early.
const SEED_JSON = JSON.stringify(I18N_SEED).replace(/</g, '\\u003c');

/**
 * One statically rendered language of the site.
 *
 * The markup is a string produced at build time (lib/render.ts) and written straight
 * into the HTML, so the page — including the LCP image — is complete before any
 * JavaScript runs. SiteRuntime renders nothing; it attaches to this DOM after
 * hydration and takes over the interactive parts.
 */
export async function SitePage({ lang }: { lang: Lang }) {
  // The LCP element, and only on this route: the service and area pages have their own
  // photograph, and preloading this one there would download an image they never show.
  //
  // The hero is a <picture>: AVIF first, WebP behind it. `type` is what keeps the two in
  // step — a browser without AVIF ignores a preload it cannot decode and falls through to
  // the <img>, so it never downloads a format it will not use.
  preload(HERO_PRELOAD_HREF, {
    as: 'image',
    type: 'image/avif',
    imageSrcSet: HERO_AVIF_SRCSET,
    imageSizes: HERO_SIZES,
    fetchPriority: 'high'
  });
  const reviews = await getApprovedReviews();
  return (
    <>
      <div className="gcs-shell" dangerouslySetInnerHTML={{ __html: pageHtml(lang, reviews) }} />
      {/* The FAQ node belongs to the page rather than the layout: it is the one piece of
          structured data that describes this document instead of the business. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(lang)).replace(/</g, '\\u003c') }}
      />
      <script id="gcs-i18n-en" type="application/json" dangerouslySetInnerHTML={{ __html: SEED_JSON }} />
      {/* The client rebuilds the strip from this list after a language switch. */}
      <script
        id="gcs-reviews"
        type="application/json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviews).replace(/</g, '\\u003c') }}
      />
      <SiteRuntime lang={lang} />
    </>
  );
}
