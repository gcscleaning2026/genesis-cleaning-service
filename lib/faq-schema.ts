/**
 * FAQPage JSON-LD for the FAQ section, in whichever language the page renders.
 *
 * Worth being clear about the return, which is close to nothing. Google retired the FAQ
 * rich result outright on 7 May 2026 — there is no SERP feature left for this to win, for
 * any site. The answer engines are believed to read FAQPage, but that is not a documented
 * or measured benefit, so treat it as a cheap bet rather than a reason. It stays because
 * it is accurate and free to maintain, not because it is known to pay.
 *
 * Genuine visitor-written Q&A would be QAPage, not FAQPage. This is neither — it is the
 * business answering its own questions, which is what FAQPage is for.
 *
 * The copy is read back out of the same two dictionaries the section renders from rather
 * than repeated here, and the question numbers come from the markup rather than a count,
 * so a sixth <details> in SITE_HTML lands in the schema without anyone remembering to
 * come back. Missing copy throws: structured data that disagrees with the page it sits
 * on is worse than none at all.
 */
import 'server-only';
import { ES, HEAD, SITE_ORIGIN, type Lang } from './i18n';
import { I18N_SEED } from './render';

/** '1', '2', ... in markup order, from every `data-i18n="faq.N.q"` in SITE_HTML. */
const FAQ_NUMBERS = Object.keys(I18N_SEED.t)
  .map((key) => /^faq\.(\d+)\.q$/.exec(key)?.[1])
  .filter((n): n is string => n != null)
  .sort((a, b) => Number(a) - Number(b));

if (!FAQ_NUMBERS.length) throw new Error('[faq-schema] SITE_HTML has no faq.N.q keys');

// Same fallback the Spanish render uses: an untranslated key leaves the English text in
// place on the page, so the schema has to say English there too.
function copy(lang: Lang, key: string) {
  const value = lang === 'es' ? ES[key] ?? I18N_SEED.t[key] : I18N_SEED.t[key];
  if (!value) throw new Error(`[faq-schema] no ${lang} copy for ${key}`);
  return value;
}

export function faqJsonLd(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_ORIGIN}${HEAD[lang].path}#faq`,
    inLanguage: HEAD[lang].lang,
    mainEntity: FAQ_NUMBERS.map((n) => ({
      '@type': 'Question',
      name: copy(lang, `faq.${n}.q`),
      acceptedAnswer: { '@type': 'Answer', text: copy(lang, `faq.${n}.a`) }
    }))
  };
}
