/**
 * Every URL the site publishes, built in one place.
 *
 * The sitemap, the hreflang annotations, the canonical tags, the breadcrumb JSON-LD, the
 * language toggle and the internal links all have to agree on what a page's address is.
 * They agree by all calling these.
 */
import { HEAD, type Lang } from './i18n';

/** Path prefix for a language: '' for English at the root, '/es' for Spanish. */
export const langPrefix = (lang: Lang) => (lang === 'es' ? '/es' : '');

export const homePath = (lang: Lang) => HEAD[lang].path;

export const servicesIndexPath = (lang: Lang) => `${langPrefix(lang)}/services`;

export const areasIndexPath = (lang: Lang) => `${langPrefix(lang)}/areas`;

export const servicePath = (lang: Lang, slug: string) => `${servicesIndexPath(lang)}/${slug}`;

export const areaPath = (lang: Lang, slug: string) => `${areasIndexPath(lang)}/${slug}`;

/** The same page in the other language, given the current one. */
export const otherLang = (lang: Lang): Lang => (lang === 'es' ? 'en' : 'es');
