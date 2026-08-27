import { describe, expect, it } from 'vitest';
import { HEAD, type Lang } from '../lib/i18n';
import { pageHtml } from '../lib/render';

const LANGS: Lang[] = ['en', 'es'];

describe('skip link', () => {
  it.each(LANGS)('is the first focusable thing on the %s page', (lang) => {
    const html = pageHtml(lang, []);
    const firstAnchor = html.indexOf('<a ');

    expect(html.slice(firstAnchor, firstAnchor + 200)).toContain('class="gcs-skip"');
    expect(html).toContain('href="#main"');
  });

  it('translates', () => {
    expect(pageHtml('en', [])).toContain('>Skip to content<');
    expect(pageHtml('es', [])).toContain('>Saltar al contenido<');
  });

  it.each(LANGS)('has somewhere to land on the %s page', (lang) => {
    // tabindex is what lets the jump move the keyboard as well as the viewport.
    expect(pageHtml(lang, [])).toContain('<main id="main" tabindex="-1">');
  });
});

describe('language toggle', () => {
  it.each(LANGS)('is a real link on the %s page, not a script-only control', (lang) => {
    const html = pageHtml(lang, []);

    // Buttons would leave /es reachable only by running the toggle: no crawlable path
    // between the two versions, and nothing at all without JavaScript.
    expect(html).not.toMatch(/<button[^>]*data-lang-btn/);
    expect(html).toContain(`href="${HEAD.en.path}" hreflang="en"`);
    expect(html).toContain(`href="${HEAD.es.path}" hreflang="es"`);
  });

  it.each(LANGS)('marks %s as the current language on its own page', (lang) => {
    const html = pageHtml(lang, []);
    const marked = [...html.matchAll(/<a [^>]*data-lang-btn="(\w+)"[^>]*>/g)]
      .filter(([tag]) => tag.includes('aria-current="true"'))
      .map(([, which]) => which);

    // Three toggles — desktop header, mobile menu, footer — and each marks this language.
    expect(marked).toEqual([lang, lang, lang]);
  });

  it.each(LANGS)('leaves the other language unmarked on the %s page', (lang) => {
    const other = lang === 'en' ? 'es' : 'en';
    const html = pageHtml(lang, []);
    const tags = [...html.matchAll(new RegExp(`<a [^>]*data-lang-btn="${other}"[^>]*>`, 'g'))];

    expect(tags).toHaveLength(3);
    for (const [tag] of tags) expect(tag).not.toContain('aria-current');
  });
});
