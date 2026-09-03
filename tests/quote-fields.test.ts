import { describe, expect, it } from 'vitest';
import {
  isQuoteHoneypot,
  quoteFieldErrors,
  readQuoteRequest
} from '../app/api/quote/fields';

describe('quote fields', () => {
  it('treats a filled website field as the honeypot', () => {
    expect(isQuoteHoneypot({ website: 'https://spam.example' })).toBe(true);
    expect(isQuoteHoneypot({ website: '  ' })).toBe(false);
    expect(isQuoteHoneypot({ website: '' })).toBe(false);
    expect(isQuoteHoneypot({})).toBe(false);
  });

  it('reports only name, phone, zip, and propertyType', () => {
    const errors = quoteFieldErrors({ website: '', need: 'x', town: '', whatsapp: '' });
    expect(Object.keys(errors).sort()).toEqual(['name', 'phone', 'propertyType', 'zip']);
  });

  it('reads optional contact aliases into the notice payload', () => {
    expect(readQuoteRequest({
      name: ' Ana ',
      whatsapp: '18829300319',
      town: 'Union',
      propertyType: 'business',
      need: 'offices'
    })).toEqual({
      name: 'Ana',
      phone: '',
      whatsapp: '18829300319',
      zip: '',
      town: 'Union',
      propertyType: 'business',
      need: 'offices'
    });
  });
});
