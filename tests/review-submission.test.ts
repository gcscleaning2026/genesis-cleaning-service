import { afterEach, describe, expect, it } from 'vitest';
import { submissionVerdict } from '../app/api/reviews/verdict';

const body = {
  name: 'Ana R.',
  comment: 'They arrived on time and left the kitchen and both bathrooms completely spotless.',
  rating: 5,
  lang: 'en',
  elapsedMs: 9000
};

afterEach(() => {
  delete process.env.REVIEW_RATE_LIMIT_PER_HOUR;
});

describe('submissionVerdict', () => {
  it('accepts a genuine submission', () => {
    expect(submissionVerdict({ body, isBot: false, recentFromIp: 0 })).toEqual({
      status: 201,
      body: { ok: true },
      review: { name: 'Ana R.', comment: body.comment, rating: 5, lang: 'en' }
    });
  });

  it('rejects a request BotID flagged', () => {
    expect(submissionVerdict({ body, isBot: true, recentFromIp: 0 }))
      .toMatchObject({ status: 403, body: { ok: false, reason: 'bot' } });
  });

  it('rejects a filled honeypot field', () => {
    expect(submissionVerdict({ body: { ...body, website: 'http://spam' }, isBot: false, recentFromIp: 0 }))
      .toMatchObject({ status: 403, body: { ok: false, reason: 'bot' } });
  });

  it('rejects a form completed faster than a human can type', () => {
    expect(submissionVerdict({ body: { ...body, elapsedMs: 900 }, isBot: false, recentFromIp: 0 }))
      .toMatchObject({ status: 403, body: { ok: false, reason: 'bot' } });
  });

  it('rejects the fourth submission from the same ip within an hour', () => {
    expect(submissionVerdict({ body, isBot: false, recentFromIp: 3 }))
      .toMatchObject({ status: 429, body: { ok: false, reason: 'rate' } });
  });

  it('lets REVIEW_RATE_LIMIT_PER_HOUR raise the limit', () => {
    process.env.REVIEW_RATE_LIMIT_PER_HOUR = '10';
    expect(submissionVerdict({ body, isBot: false, recentFromIp: 3 })).toMatchObject({ status: 201 });
  });

  it('switches the limit off entirely at 0, for local testing', () => {
    process.env.REVIEW_RATE_LIMIT_PER_HOUR = '0';
    expect(submissionVerdict({ body, isBot: false, recentFromIp: 99 })).toMatchObject({ status: 201 });
  });

  it('ignores a nonsense limit and keeps the default', () => {
    process.env.REVIEW_RATE_LIMIT_PER_HOUR = 'lots';
    expect(submissionVerdict({ body, isBot: false, recentFromIp: 3 })).toMatchObject({ status: 429 });
  });

  it('passes the moderation reason through', () => {
    expect(submissionVerdict({ body: { ...body, comment: 'Too short.' }, isBot: false, recentFromIp: 0 }))
      .toMatchObject({ status: 400, body: { ok: false, reason: 'words' } });
  });
});
