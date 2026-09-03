/**
 * Pricing quote POST body. Honeypot `website` looks like success (200).
 * Valid quotes answer 204. Bad input answers 400 with field keys.
 */
export const PROPERTY_TYPES = ['home', 'apartment', 'business'] as const;
export type PropertyType = (typeof PROPERTY_TYPES)[number];

export type QuoteInput = {
  name: string;
  phone: string;
  zip: string;
  propertyType: PropertyType;
  need: string;
};

export type QuoteFieldKey = 'name' | 'phone' | 'zip' | 'propertyType';

export type QuoteParse =
  | { status: 200 }
  | { status: 400; reason: 'invalid'; fields: Partial<Record<QuoteFieldKey, string>> }
  | { status: 204; quote: QuoteInput };

const asString = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

export function parseQuoteBody(body: Record<string, unknown>): QuoteParse {
  if (asString(body.website) !== '') return { status: 200 };

  const name = asString(body.name);
  const phone = asString(body.phone);
  const zip = asString(body.zip) || asString(body.town);
  const propertyType = asString(body.propertyType);
  const need = asString(body.need) || asString(body.notes);

  const phoneOk = phone.replace(/\D/g, '').length >= 10;
  const typeOk = (PROPERTY_TYPES as readonly string[]).includes(propertyType);
  const fields: Partial<Record<QuoteFieldKey, string>> = {};
  if (!name || name.length < 2) fields.name = 'required';
  if (!phoneOk) fields.phone = 'required';
  if (zip.length < 2) fields.zip = 'required';
  if (!typeOk) fields.propertyType = 'required';
  if (Object.keys(fields).length) return { status: 400, reason: 'invalid', fields };

  return {
    status: 204,
    quote: {
      name,
      phone,
      zip,
      propertyType: propertyType as PropertyType,
      need
    }
  };
}
