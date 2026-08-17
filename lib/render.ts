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
import { SITE_HTML } from './site-content';
import { ES, WA_TEXT, type Lang } from './i18n';

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
    return v == null ? whole : `<${tag}${attrs}>${v}</${tag}>`;
  });
  out = out.replace(/(data-i18n-aria="([^"]+)"[^>]*aria-label=")([^"]*)(")/g, (whole, head, key, _old, tail) => {
    const v = ES[key];
    return v == null ? whole : head + attrEscape(v) + tail;
  });
  out = out.replace(/(data-i18n-ph="([^"]+)"[^>]*placeholder=")([^"]*)(")/g, (whole, head, key, _old, tail) => {
    const v = ES[key];
    return v == null ? whole : head + attrEscape(v) + tail;
  });
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

const PAGES: Record<Lang, string> = {
  en: splitHeroWords(SITE_HTML),
  es: splitHeroWords(translate(SITE_HTML))
};

/** Full page markup for one language, ready for the shell's innerHTML. */
export function pageHtml(lang: Lang) {
  return PAGES[lang];
}
