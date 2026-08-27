/**
 * Shape of the standalone service and area pages.
 *
 * The home page is one HTML string translated through the [data-i18n] dictionary in
 * lib/i18n.ts. These pages are not: each one is a small amount of copy that exists in
 * both languages from the start, so the English and the Spanish live side by side in the
 * data rather than one being derived from the other. A dictionary would have bought
 * nothing here and would have put 34 pages' worth of keys in one flat namespace.
 */
import type { Lang } from './i18n';

export type Copy = {
  /** Display name, used in nav, breadcrumbs and cross-links. */
  name: string;
  /** <title>, cut to roughly 60 characters. */
  title: string;
  /** Meta description, cut to roughly 155 characters. */
  desc: string;
  h1: string;
  /** Lead paragraph under the h1. */
  intro: string;
  /** Body sections, each an h2 and a paragraph. */
  sections: { h2: string; body: string }[];
  /** Heading above the checklist. */
  includesH2: string;
  /** What the visit covers, one line each. */
  includes: string[];
  faq: { q: string; a: string }[];
};

export type ServicePage = {
  slug: string;
  /** Symbol id in the icon sprite, without the leading hash. */
  icon: string;
  /** Basename under /assets/services, without the width suffix or extension. */
  image: string;
  imageAlt: Record<Lang, string>;
  copy: Record<Lang, Copy>;
};

export type AreaPage = {
  slug: string;
  /** County name without the "County" suffix. */
  county: string;
  /** Municipalities named on the page, in rough order of size. */
  towns: string[];
  copy: Record<Lang, Copy>;
};
