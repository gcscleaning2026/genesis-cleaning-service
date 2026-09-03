import { describe, expect, it } from 'vitest';
import { parseQuoteBody } from '../lib/quote';

describe('quote POST body', () => {
  const good = {
    name: 'Ada',
    phone: '8829300319',
    zip: '07050',
    propertyType: 'home'
  };

  it('returns 204 for a valid quote', () => {
    expect(parseQuoteBody(good).status).toBe(204);
  });

  it('accepts town instead of zip', () => {
    const parsed = parseQuoteBody({ ...good, zip: undefined, town: 'Orange' });
    expect(parsed.status).toBe(204);
    if (parsed.status === 204) expect(parsed.quote.zip).toBe('Orange');
  });

  it('returns 400 when a required field is missing', () => {
    expect(parseQuoteBody({ ...good, phone: '123' }).status).toBe(400);
    expect(parseQuoteBody({ ...good, propertyType: 'warehouse' }).status).toBe(400);
  });

  it('returns field keys on 400 without copying submitted values', () => {
    const parsed = parseQuoteBody({ name: '', phone: '123', town: '', propertyType: 'warehouse' });
    expect(parsed.status).toBe(400);
    if (parsed.status !== 400) return;
    expect(parsed.fields).toEqual({
      name: 'required',
      phone: 'required',
      zip: 'required',
      propertyType: 'required'
    });
    expect(JSON.stringify(parsed.fields)).not.toMatch(/123/);
  });

  it('returns 200 when the website honeypot is filled', () => {
    expect(parseQuoteBody({ ...good, website: 'http://spam.test' }).status).toBe(200);
  });
});
