import { describe, expect, it } from 'vitest';
import { pageHtml } from '../lib/render';

describe('pageHtml', () => {
  it('writes the review cards inside #gcs-track', () => {
    const html = pageHtml('en', [{ name: 'Ana R.', comment: 'Spotless work throughout the house.', rating: 5 }]);
    const track = html.slice(html.indexOf('id="gcs-track"'));
    expect(track).toContain('Ana R.');
    // One card per approved review; the marquee clones at runtime.
    expect(track.split('<article').length - 1).toBe(1);
  });

  it('leaves the track empty when there are no approved reviews', () => {
    const html = pageHtml('en', []);
    const open = html.indexOf('id="gcs-track"');
    expect(open).toBeGreaterThan(-1);
    // The strip closes immediately: no card markup survives between the tags. Other
    // <article> elements elsewhere on the page are untouched, so this cannot assert on
    // the whole document.
    expect(html.slice(open, open + 200)).toContain('"></div>');
  });

  it('keeps the markup after the track intact', () => {
    const html = pageHtml('en', []);
    expect(html).toContain('id="contact"');
    expect(html.trimEnd().endsWith('</div>')).toBe(true);
  });

  it('still translates the page', () => {
    expect(pageHtml('es', [])).toContain('Servicios');
  });
});
