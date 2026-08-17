import { describe, expect, it } from 'vitest';
import { renderReviewCard, renderTrack } from '../lib/review-card';

describe('renderReviewCard', () => {
  it('escapes user content', () => {
    const html = renderReviewCard({ name: '<script>x</script>', comment: 'Nice & clean work "here"', rating: 5 });
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
    expect(html).toContain('Nice &amp; clean');
  });

  it('turns a rating into a star fill percentage and an aria label', () => {
    const html = renderReviewCard({ name: 'Ana', comment: 'Great', rating: 4.5 });
    expect(html).toContain('width:90%');
    expect(html).toContain('4.5 / 5');
  });

  it('clamps out-of-range ratings', () => {
    expect(renderReviewCard({ name: 'Ana', comment: 'Great', rating: 9 })).toContain('width:100%');
  });
});

describe('renderTrack', () => {
  it('renders each review exactly once — buildMarquee() clones for the loop', () => {
    const track = renderTrack([
      { name: 'Ana', comment: 'Great', rating: 5 },
      { name: 'Beto', comment: 'Also great', rating: 4 }
    ]);
    expect(track.split('<article').length - 1).toBe(2);
    expect(track.split('Ana').length - 1).toBe(1);
  });

  it('is empty with no reviews', () => {
    expect(renderTrack([])).toBe('');
  });
});
