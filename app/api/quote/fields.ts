export const PROPERTY_TYPES = ['home', 'apartment', 'business'] as const;
export type PropertyType = (typeof PROPERTY_TYPES)[number];

export type QuoteErrorKey = 'name' | 'phone' | 'zip' | 'propertyType';
export type QuoteErrors = Partial<Record<QuoteErrorKey, true | 'required'>>;

export type QuoteRequest = {
  name: string;
  phone: string;
  whatsapp: string;
  zip: string;
  town: string;
  propertyType: PropertyType;
  need: string;
};

function field(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export function isQuoteHoneypot(body: Record<string, unknown>) {
  return field(body.website) !== '';
}

export function quoteFieldErrors(body: Record<string, unknown>): QuoteErrors {
  const errors: QuoteErrors = {};
  if (!field(body.name)) errors.name = 'required';
  if (!field(body.phone) && !field(body.whatsapp)) errors.phone = 'required';
  if (!field(body.zip) && !field(body.town)) errors.zip = 'required';
  const propertyType = field(body.propertyType);
  if (!(PROPERTY_TYPES as readonly string[]).includes(propertyType)) {
    errors.propertyType = 'required';
  }
  return errors;
}

export function readQuoteRequest(body: Record<string, unknown>): QuoteRequest {
  return {
    name: field(body.name),
    phone: field(body.phone),
    whatsapp: field(body.whatsapp),
    zip: field(body.zip),
    town: field(body.town),
    propertyType: field(body.propertyType) as PropertyType,
    need: field(body.need)
  };
}

export const ALL_QUOTE_FIELD_ERRORS: QuoteErrors = {
  name: 'required',
  phone: 'required',
  zip: 'required',
  propertyType: 'required'
};
