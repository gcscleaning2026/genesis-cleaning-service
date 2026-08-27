import { describe, expect, it } from 'vitest';
import { faqJsonLd } from '../lib/faq-schema';
import { HEAD, type Lang } from '../lib/i18n';
import { pageHtml } from '../lib/render';

const LANGS: Lang[] = ['en', 'es'];

// A search result truncates rather than wraps, so copy past these lengths is copy nobody
// reads. Both numbers are approximate in Google's own rendering — it measures pixels —
// which is why they are a ceiling to stay under rather than a target to hit.
const TITLE_MAX = 60;
const DESCRIPTION_MAX = 160;

describe('head copy', () => {
  it.each(LANGS)('keeps the %s title and description inside the snippet', (lang) => {
    expect(HEAD[lang].title.length).toBeLessThanOrEqual(TITLE_MAX);
    expect(HEAD[lang].desc.length).toBeLessThanOrEqual(DESCRIPTION_MAX);
  });

  it.each(LANGS)('names the service before the brand in the %s title', (lang) => {
    // The brand is the part a searcher does not type, so it belongs after the words they do.
    expect(HEAD[lang].title).toMatch(/\| Genesis/);
  });
});

describe('FAQPage schema', () => {
  it.each(LANGS)('answers on the %s page word for word', (lang) => {
    const html = pageHtml(lang, []);
    const questions = faqJsonLd(lang).mainEntity;

    expect(questions.length).toBeGreaterThan(0);
    for (const question of questions) {
      expect(html).toContain(question.name);
      expect(html).toContain(question.acceptedAnswer.text);
    }
  });

  it('covers every question the page renders', () => {
    const rendered = pageHtml('en', []).match(/<details data-faq-item="\d+"/g) ?? [];

    expect(faqJsonLd('en').mainEntity).toHaveLength(rendered.length);
  });

  it('translates with the page rather than repeating the English', () => {
    const [english] = faqJsonLd('en').mainEntity;
    const [spanish] = faqJsonLd('es').mainEntity;

    expect(spanish.name).not.toBe(english.name);
    expect(spanish.acceptedAnswer.text).not.toBe(english.acceptedAnswer.text);
  });
});
