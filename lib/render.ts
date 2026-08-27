/**
 * Server-side page markup.
 *
 * `SITE_HTML` is a single static string, so producing the Spanish page and the
 * split hero heading is a string operation — no browser, no DOM. This module is
 * the Next.js port of the old `scripts/prerender.mjs`: the same transforms, but
 * run while the Server Component renders instead of after `vite build`. Both
 * routes are statically prerendered, so it still executes once per build.
 *
 * Every [data-i18n] element in SITE_HTML holds plain text with no nested markup —
 * `collect()` asserts that below and fails the build if it ever stops being true.
 */
import 'server-only';
import { SITE_HTML } from './site-content';
import { ES, WA_TEXT, type Lang } from './i18n';
import { renderTrack, type CardReview } from './review-card';

export type I18nSeed = {
  /** [data-i18n] text content, keyed by i18n key. */
  t: Record<string, string>;
  /** [data-i18n-aria] aria-label values. */
  a: Record<string, string>;
  /** [data-i18n-ph] placeholder values. */
  p: Record<string, string>;
};

const attrEscape = (s: string) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const textEscape = (s: string) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// --- read the English strings straight out of the markup -----------------------------
function collect(html: string): I18nSeed {
  const t: Record<string, string> = {};
  const a: Record<string, string> = {};
  const p: Record<string, string> = {};
  const text = /<(\w+)([^>]*\sdata-i18n="([^"]+)"[^>]*)>([\s\S]*?)<\/\1>/g;
  let m: RegExpExecArray | null;
  while ((m = text.exec(html))) {
    if (m[4].includes('<')) {
      throw new Error(`data-i18n="${m[3]}" wraps nested markup; the render only handles text nodes.`);
    }
    t[m[3]] = m[4];
  }
  for (const [, k, v] of html.matchAll(/data-i18n-aria="([^"]+)"[^>]*aria-label="([^"]*)"/g)) a[k] = v;
  for (const [, k, v] of html.matchAll(/data-i18n-ph="([^"]+)"[^>]*placeholder="([^"]*)"/g)) p[k] = v;
  return { t, a, p };
}

// --- translate SITE_HTML into Spanish ------------------------------------------------
function translate(html: string) {
  let out = html.replace(/<(\w+)([^>]*\sdata-i18n="([^"]+)"[^>]*)>([\s\S]*?)<\/\1>/g, (whole, tag, attrs, key) => {
    const v = ES[key];
    return v == null ? whole : `<${tag}${attrs}>${textEscape(v)}</${tag}>`;
  });
  out = out.replace(/(data-i18n-aria="([^"]+)"[^>]*aria-label=")([^"]*)(")/g, (whole, head, key, _old, tail) => {
    const v = ES[key];
    return v == null ? whole : head + attrEscape(v) + tail;
  });
  out = out.replace(/(data-i18n-ph="([^"]+)"[^>]*placeholder=")([^"]*)(")/g, (whole, head, key, _old, tail) => {
    const v = ES[key];
    return v == null ? whole : head + attrEscape(v) + tail;
  });
  // The language toggle links both ways on both pages, so the one that is the current
  // page moves with the translation. Without this a visitor on /es with no JavaScript is
  // told, correctly for the source markup and wrongly for the page, that English is current.
  out = out.replace(/(<a[^>]*)\saria-current="true"([^>]*\sdata-lang-btn="en")/g, '$1$2');
  out = out.replace(/(<a[^>]*\sdata-lang-btn="es")/g, '$1 aria-current="true"');

  // Links that leave the home page point at the English route in the source markup, so on
  // the Spanish page they have to move to their /es counterpart. The Spanish href is carried
  // on the element as `data-eshref` rather than derived here, because a rule that rewrote
  // every internal href by prefixing /es would also rewrite the ones that must not move.
  out = out.replace(/(<a[^>]*\shref=")[^"]*("[^>]*\sdata-eshref="([^"]*)")/g, (_w, head, tail, es) =>
    head + attrEscape(es) + tail
  );

  // Same deep link apply() builds at runtime, so the no-JS markup is already correct.
  const wa = 'https://wa.me/19083383160?text=' + encodeURIComponent(WA_TEXT.es);
  out = out.replace(/(<a[^>]*\sdata-wa="1"[^>]*href=")[^"]*(")/g, (_w, head, tail) => head + attrEscape(wa) + tail);
  return out;
}

// --- split the hero heading into per-word spans ---------------------------------------
// Mirrors SiteRuntime.splitWords(), but at build time and with a `--i` index per word,
// so the staggered rise is a CSS animation that starts on parse instead of a GSAP
// timeline that starts once the motion bundle has loaded. buildHeadings() reuses these
// spans rather than splitting again.
const WORD_OUTER =
  'display:inline-block;overflow:hidden;vertical-align:bottom;padding:0 .08em .16em;margin:0 -.08em -.16em';

function splitHeroWords(html: string) {
  const hero = /(<h1 id="hero-h"[^>]*>)([\s\S]*?)(<\/h1>)/;
  const m = html.match(hero);
  if (!m) throw new Error('[render] hero heading not found');
  let i = 0;
  const inner = m[2]
    .split(/(<[^>]+>)/)
    .map((part) => {
      if (!part || part.startsWith('<')) return part;
      return part
        .split(/(\s+)/)
        .map((w) => {
          if (!w || !w.trim()) return w;
          return `<span data-w="1" style="${WORD_OUTER}"><span style="display:inline-block;--i:${i++}">${w}</span></span>`;
        })
        .join('');
    })
    .join('');
  if (!i) throw new Error('[render] hero heading produced no words');
  return html.replace(hero, `$1${inner}$3`);
}

/** English strings, read out of the untranslated markup. */
export const I18N_SEED: I18nSeed = collect(SITE_HTML);

const missing = Object.keys(I18N_SEED.t).filter((k) => !(k in ES));
if (missing.length) {
  console.warn(`[render] ${missing.length} key(s) fall back to English: ${missing.join(', ')}`);
}

// A [data-i18n] element's text is read into I18N_SEED verbatim and written back with
// `textContent` by the client runtime when the language is toggled, so a character
// reference in that text would be shown literally the first time it is restored. Catching
// it here rather than in review makes it a build failure instead of a `&amp;` on the page.
for (const [key, value] of Object.entries(I18N_SEED.t)) {
  if (/&[a-zA-Z]+;|&#\d+;/.test(value)) {
    throw new Error(
      `[render] data-i18n="${key}" contains a character reference (${value.trim()}); write the character itself.`
    );
  }
}


// The Spanish href has been applied by now on /es and is dead weight on /, so it comes back
// out of both. It exists to be read by translate(), not by a browser.
const stripEsHref = (html: string) => html.replace(/\sdata-eshref="[^"]*"/g, '');

const PAGES: Record<Lang, string> = {
  en: stripEsHref(splitHeroWords(SITE_HTML)),
  es: stripEsHref(splitHeroWords(translate(SITE_HTML)))
};

// The marquee is the one part of SITE_HTML that is not static: it is written per render
// from the approved reviews, so the cards are in the HTML crawlers receive rather than
// being injected by JavaScript afterwards. The cards contain nested <div>s, so the close
// tag is found by counting depth rather than with a lazy regex.
const TRACK_OPEN = '<div id="gcs-track"';

function injectTrack(html: string, reviews: CardReview[]) {
  const start = html.indexOf(TRACK_OPEN);
  if (start === -1) throw new Error('[render] #gcs-track not found');
  const innerStart = html.indexOf('>', start) + 1;

  let depth = 1;
  let i = innerStart;
  while (depth > 0) {
    const nextOpen = html.indexOf('<div', i);
    const nextClose = html.indexOf('</div>', i);
    if (nextClose === -1) throw new Error('[render] #gcs-track is never closed');
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      i = nextOpen + 4;
    } else {
      depth--;
      i = nextClose + 6;
    }
  }
  const innerEnd = i - 6;
  return html.slice(0, innerStart) + renderTrack(reviews) + html.slice(innerEnd);
}

/** Full page markup for one language, with the approved reviews already in the strip. */
export function pageHtml(lang: Lang, reviews: CardReview[]) {
  return injectTrack(PAGES[lang], reviews);
}
