'use client';

import { useState, type FormEvent } from 'react';
import type { Lang } from '@/lib/i18n';
import { PRICING_COPY } from '@/lib/wave1-services';

const COPY = {
  en: {
    name: 'Name',
    namePh: 'Your name',
    phone: 'Phone or WhatsApp number',
    zip: 'ZIP or town',
    zipPh: 'Orange 07050',
    property: 'Home / apartment / business',
    home: 'Home',
    apartment: 'Apartment',
    business: 'Business',
    need: 'What you need',
    needPh: 'Town, beds/baths, or business type',
    submit: 'Request a quote',
    helper: PRICING_COPY.en.quoteHelper,
    success: 'Thanks. Genesis will reach you by phone or WhatsApp.',
    error: 'Check the required fields and try again.',
    privacy: 'We use this to quote your job. We do not sell it.'
  },
  es: {
    name: 'Nombre',
    namePh: 'Tu nombre',
    phone: 'Teléfono o número de WhatsApp',
    zip: 'ZIP o pueblo',
    zipPh: 'Orange 07050',
    property: 'Casa / apartamento / negocio',
    home: 'Casa',
    apartment: 'Apartamento',
    business: 'Negocio',
    need: 'Qué necesitas',
    needPh: 'Pueblo, recámaras/baños o tipo de negocio',
    submit: 'Pedir cotización',
    helper: PRICING_COPY.es.quoteHelper,
    success: 'Gracias. Genesis te escribe por teléfono o WhatsApp.',
    error: 'Revisa los campos obligatorios e inténtalo de nuevo.',
    privacy: 'Lo usamos para cotizar tu trabajo. No lo vendemos.'
  }
} as const;

const FORM_FIELDS = ['name', 'phone', 'zip', 'propertyType'] as const;
type FormField = (typeof FORM_FIELDS)[number];

const API_KEY_TO_FIELD: Record<string, FormField> = {
  name: 'name',
  phone: 'phone',
  zip: 'zip',
  town: 'zip',
  propertyType: 'propertyType'
};

function collectQuote400Keys(source: Record<string, unknown>, marked: Set<FormField>) {
  for (const key of Object.keys(API_KEY_TO_FIELD)) {
    const value = source[key];
    if ((typeof value === 'string' && value) || value === true) marked.add(API_KEY_TO_FIELD[key]);
  }
}

function fieldsFromQuote400(body: Record<string, unknown>): FormField[] {
  const marked = new Set<FormField>();
  collectQuote400Keys(body, marked);
  const nested = body.errors ?? body.fields;
  if (nested && typeof nested === 'object' && !Array.isArray(nested)) {
    collectQuote400Keys(nested as Record<string, unknown>, marked);
  }
  const extra = body.fields ?? body.invalid;
  if (Array.isArray(extra)) {
    for (const item of extra) {
      if (typeof item === 'string' && API_KEY_TO_FIELD[item]) marked.add(API_KEY_TO_FIELD[item]);
    }
  }
  return FORM_FIELDS.filter(field => marked.has(field));
}

export function QuoteForm({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle');
  const [invalid, setInvalid] = useState<FormField[]>([]);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const place = String(data.get('zip') ?? '').trim();
    const zipLike = /^\d{5}(?:-\d{4})?$/.test(place);
    const payload: Record<string, string> = {
      name: String(data.get('name') ?? ''),
      phone: String(data.get('phone') ?? ''),
      propertyType: String(data.get('propertyType') ?? ''),
      website: String(data.get('website') ?? '')
    };
    if (zipLike) payload.zip = place;
    else payload.town = place;
    const need = String(data.get('need') ?? '').trim();
    if (need) payload.need = need;

    setPending(true);
    setStatus('idle');
    setInvalid([]);
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.status === 204) {
        setStatus('ok');
        form.reset();
        return;
      }
      if (res.status === 200) {
        form.reset();
        return;
      }
      if (res.status === 400) {
        let body: Record<string, unknown> = {};
        try {
          body = (await res.json()) as Record<string, unknown>;
        } catch {
          body = {};
        }
        setInvalid(fieldsFromQuote400(body));
        setStatus('err');
        return;
      }
      setStatus('err');
    } catch {
      setStatus('err');
    } finally {
      setPending(false);
    }
  }

  const field = { display: 'flex', flexDirection: 'column' as const, gap: 6 };
  const input = {
    fontFamily: 'Manrope,sans-serif',
    fontSize: 16,
    padding: '12px 14px',
    borderRadius: 12,
    border: '1.5px solid #CFE0EC',
    color: '#0B1E4E'
  };
  const inputInvalid = { ...input, border: '1.5px solid #B4225F', boxShadow: '0 0 0 3px rgba(180,34,95,.15)' };
  const marked = new Set(invalid);
  const describedBy = status === 'err' ? 'quote-err' : undefined;

  return (
    <section
      id="quote"
      aria-labelledby="quote-h"
      style={{ maxWidth: 1240, margin: '0 auto', padding: 'clamp(36px,4vw,56px) 24px 0' }}
    >
      <div
        style={{
          background: '#fff',
          border: '1px solid #DFEAF3',
          borderRadius: 24,
          padding: 'clamp(24px,3vw,36px)',
          boxShadow: '0 14px 38px rgba(11,30,78,.06)',
          maxWidth: 640
        }}
      >
        <h2 id="quote-h" style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 800, fontSize: 24, color: '#0B1E4E', margin: '0 0 8px' }}>
          {t.submit === 'Request a quote' ? 'Request a quote' : 'Pedir cotización'}
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: '#4A5A7D', margin: '0 0 20px' }}>{t.helper}</p>
        <form onSubmit={onSubmit} style={{ display: 'grid', gap: 16, position: 'relative' }} noValidate>
          <div aria-hidden="true" inert style={{ position: 'absolute', left: -10000, width: 1, height: 1, overflow: 'hidden' }}>
            <label>
              Website
              <input name="website" type="text" tabIndex={-1} autoComplete="off" hidden />
            </label>
          </div>
          <label style={field} htmlFor="quote-name">
            <span style={{ fontWeight: 700, fontSize: 14, color: '#0B1E4E' }}>{t.name}</span>
            <input
              id="quote-name"
              name="name"
              required
              autoComplete="name"
              placeholder={t.namePh}
              aria-invalid={marked.has('name')}
              aria-describedby={marked.has('name') ? describedBy : undefined}
              style={marked.has('name') ? inputInvalid : input}
            />
          </label>
          <label style={field} htmlFor="quote-phone">
            <span style={{ fontWeight: 700, fontSize: 14, color: '#0B1E4E' }}>{t.phone}</span>
            <input
              id="quote-phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="(882) 930-0319"
              aria-invalid={marked.has('phone')}
              aria-describedby={marked.has('phone') ? describedBy : undefined}
              style={marked.has('phone') ? inputInvalid : input}
            />
          </label>
          <label style={field} htmlFor="quote-zip">
            <span style={{ fontWeight: 700, fontSize: 14, color: '#0B1E4E' }}>{t.zip}</span>
            <input
              id="quote-zip"
              name="zip"
              required
              autoComplete="postal-code"
              placeholder={t.zipPh}
              aria-invalid={marked.has('zip')}
              aria-describedby={marked.has('zip') ? describedBy : undefined}
              style={marked.has('zip') ? inputInvalid : input}
            />
          </label>
          <label style={field} htmlFor="quote-propertyType">
            <span style={{ fontWeight: 700, fontSize: 14, color: '#0B1E4E' }}>{t.property}</span>
            <select
              id="quote-propertyType"
              name="propertyType"
              required
              defaultValue=""
              aria-invalid={marked.has('propertyType')}
              aria-describedby={marked.has('propertyType') ? describedBy : undefined}
              style={marked.has('propertyType') ? inputInvalid : input}
            >
              <option value="" disabled>
                {t.property}
              </option>
              <option value="home">{t.home}</option>
              <option value="apartment">{t.apartment}</option>
              <option value="business">{t.business}</option>
            </select>
          </label>
          <label style={field}>
            <span style={{ fontWeight: 700, fontSize: 14, color: '#0B1E4E' }}>{t.need}</span>
            <textarea name="need" rows={4} placeholder={t.needPh} style={input} />
          </label>
          <button
            type="submit"
            disabled={pending}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 0,
              cursor: 'pointer',
              fontFamily: 'Manrope,sans-serif',
              background: '#D42A80',
              color: '#fff',
              fontWeight: 700,
              fontSize: 15.5,
              padding: '16px 26px',
              borderRadius: 999,
              boxShadow: '0 8px 22px rgba(212,42,128,.3)'
            }}
          >
            {t.submit}
          </button>
          <p style={{ fontSize: 13, lineHeight: 1.5, color: '#5A6A8C', margin: 0 }}>{t.privacy}</p>
          {status === 'ok' ? (
            <p role="status" style={{ fontSize: 15, fontWeight: 700, color: '#0B4A63', margin: 0 }}>
              {t.success}
            </p>
          ) : null}
          {status === 'err' ? (
            <p id="quote-err" role="alert" style={{ fontSize: 15, fontWeight: 700, color: '#B4225F', margin: 0 }}>
              {t.error}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
