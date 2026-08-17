import { I18N_SEED, pageHtml } from '@/lib/render';
import type { Lang } from '@/lib/i18n';
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
export function SitePage({ lang }: { lang: Lang }) {
  return (
    <>
      <div className="gcs-shell" dangerouslySetInnerHTML={{ __html: pageHtml(lang) }} />
      <script id="gcs-i18n-en" type="application/json" dangerouslySetInnerHTML={{ __html: SEED_JSON }} />
      <SiteRuntime lang={lang} />
    </>
  );
}
