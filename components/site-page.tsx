import { I18N_SEED, pageHtml } from '@/lib/render';
import { faqJsonLd } from '@/lib/faq-schema';
import type { Lang } from '@/lib/i18n';
import type { CardReview } from '@/lib/review-card';
import { getDb } from '@/lib/db';
import { listByStatus } from '@/lib/reviews-repo';
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
// A build or a revalidation must never fail because Turso is unreachable: an empty strip
// is a far better outcome than a 500 on the home page.
async function getApprovedReviews(): Promise<CardReview[]> {
  try {
    const rows = await listByStatus(getDb(), 'approved', 24);
    return rows.map(row => ({ name: row.name, comment: row.comment, rating: row.rating }));
  } catch (error) {
    console.error('[reviews] could not load approved reviews', error);
    return [];
  }
}

export async function SitePage({ lang }: { lang: Lang }) {
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
