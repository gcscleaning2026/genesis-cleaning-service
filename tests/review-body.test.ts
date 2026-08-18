import { describe, expect, it } from 'vitest';
import { MAX_REVIEW_BODY_BYTES, readReviewBody } from '../app/api/reviews/body';

function request(body: BodyInit) {
  return new Request('https://example.test/api/reviews', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body
  });
}

describe('readReviewBody', () => {
  it('accepts a small JSON object', async () => {
    await expect(readReviewBody(request('{"name":"Ana"}'))).resolves.toEqual({ name: 'Ana' });
  });

  it.each(['null', '[]', '"text"'])('rejects the non-object JSON value %s', async (body) => {
    await expect(readReviewBody(request(body))).rejects.toThrow('invalid review body');
  });

  it('rejects a body larger than the byte limit before parsing it', async () => {
    const body = `{"padding":"${'x'.repeat(MAX_REVIEW_BODY_BYTES)}"}`;
    await expect(readReviewBody(request(body))).rejects.toThrow('review body too large');
  });
});
