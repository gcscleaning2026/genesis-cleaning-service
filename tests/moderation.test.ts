import { describe, expect, it } from 'vitest';
import { countWords, moderateReview } from '../lib/moderation';

const base = {
  name: 'Yesenia M.',
  comment: 'They cleaned the whole apartment before we moved in and the window tracks were spotless.',
  rating: 5,
  lang: 'en'
};

describe('countWords', () => {
  it('counts whitespace-separated words', () => {
    expect(countWords('  one   two\nthree ')).toBe(3);
  });
});

describe('moderateReview', () => {
  it('accepts a normal review and trims it', () => {
    const result = moderateReview({ ...base, name: '  Yesenia M. ' });
    expect(result).toEqual({ ok: true, review: { ...base, name: 'Yesenia M.' } });
  });

  it('accepts Spanish reviews', () => {
    const result = moderateReview({
      ...base,
      lang: 'es',
      comment: 'Limpiaron las ventanas por dentro y por fuera y ahora entra mucha mas luz en la casa.'
    });
    expect(result.ok).toBe(true);
  });

  it('rejects a comment under eight words', () => {
    expect(moderateReview({ ...base, comment: 'Great job, very clean.' })).toEqual({ ok: false, reason: 'words' });
  });

  it('rejects a comment over eighty words', () => {
    const long = Array.from({ length: 81 }, () => 'clean').join(' ');
    expect(moderateReview({ ...base, comment: long })).toEqual({ ok: false, reason: 'words' });
  });

  it('rejects a comment over 500 characters', () => {
    const long = Array.from({ length: 60 }, () => 'cleaningservicework').join(' ');
    expect(moderateReview({ ...base, comment: long })).toEqual({ ok: false, reason: 'length' });
  });

  it('rejects English profanity, including leetspeak', () => {
    expect(moderateReview({ ...base, comment: 'This service is total sh1t and I want my money back now.' }))
      .toEqual({ ok: false, reason: 'profanity' });
  });

  it('rejects Spanish profanity', () => {
    expect(moderateReview({ ...base, lang: 'es', comment: 'Que mierda de servicio, no vuelvo a llamar nunca mas.' }))
      .toEqual({ ok: false, reason: 'profanity' });
  });

  it('rejects links and email addresses', () => {
    expect(moderateReview({ ...base, comment: 'Great work, visit https://spam.example.com for cheaper cleaning today.' }))
      .toEqual({ ok: false, reason: 'links' });
  });

  it('rejects shouting', () => {
    expect(moderateReview({ ...base, comment: 'BEST CLEANING SERVICE EVER IN ALL OF NEW JERSEY, CALL THEM NOW' }))
      .toEqual({ ok: false, reason: 'shouting' });
  });

  it('rejects a name that is too short or holds a link', () => {
    expect(moderateReview({ ...base, name: 'A' })).toEqual({ ok: false, reason: 'name' });
    expect(moderateReview({ ...base, name: 'buy.example.com' })).toEqual({ ok: false, reason: 'name' });
  });

  it('rejects an out-of-range or non-integer rating', () => {
    expect(moderateReview({ ...base, rating: 9 })).toEqual({ ok: false, reason: 'rating' });
    expect(moderateReview({ ...base, rating: 4.5 })).toEqual({ ok: false, reason: 'rating' });
  });

  it('rejects a wrong language tag', () => {
    expect(moderateReview({ ...base, lang: 'fr' })).toEqual({ ok: false, reason: 'rating' });
  });
  it('folds newlines and control characters out of the name', () => {
    // The name is interpolated into the notification email subject, where a bare CRLF is
    // the start of a second header.
    const result = moderateReview({ ...base, name: 'Ana\r\nBcc: victim@example.com' });
    expect(result).toEqual({ ok: false, reason: 'name' });

    const folded = moderateReview({ ...base, name: 'Ana\r\n\u0000R.' });
    expect(folded).toEqual({ ok: true, review: { ...base, name: 'Ana R.' } });
  });

  it('drops control characters from the comment but keeps its newlines', () => {
    const comment = 'They arrived on time\r\n\u0000and left the kitchen and both bathrooms spotless.';
    const result = moderateReview({ ...base, comment });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.review.comment).toBe('They arrived on time\nand left the kitchen and both bathrooms spotless.');
  });
});
