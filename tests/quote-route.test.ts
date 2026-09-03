import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  after: vi.fn(),
  notifyOwner: vi.fn()
}));

vi.mock('next/server', async importOriginal => ({
  ...(await importOriginal<typeof import('next/server')>()),
  after: mocks.after
}));
vi.mock('@/lib/notify', () => ({ notifyOwnerOfQuoteRequest: mocks.notifyOwner }));

import { POST } from '../app/api/quote/route';

const ALLOWED_ERROR_KEYS = ['name', 'phone', 'propertyType', 'zip'];

const validBody = {
  name: 'Maria R.',
  phone: '8829300319',
  zip: '07083',
  propertyType: 'home',
  need: 'Weekly kitchen and baths'
};

function request(body: unknown) {
  return new Request('https://example.test/api/quote', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: typeof body === 'string' ? body : JSON.stringify(body)
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  mocks.notifyOwner.mockResolvedValue(undefined);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('POST /api/quote', () => {
  it('returns 400 with field keys when required fields are missing', async () => {
    const response = await POST(request({}) as never);

    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json.ok).toBe(false);
    expect(json.errors).toEqual({
      name: 'required',
      phone: 'required',
      zip: 'required',
      propertyType: 'required'
    });
    expect(Object.keys(json.errors).sort()).toEqual(ALLOWED_ERROR_KEYS);
    expect(mocks.after).not.toHaveBeenCalled();
  });

  it('returns 400 with only the four field keys for invalid JSON', async () => {
    const response = await POST(request('not-json') as never);

    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json.ok).toBe(false);
    expect(Object.keys(json.errors).sort()).toEqual(ALLOWED_ERROR_KEYS);
    expect(json.errors.name).toBeTruthy();
    expect(json.errors.phone).toBeTruthy();
    expect(json.errors.zip).toBeTruthy();
    expect(json.errors.propertyType).toBeTruthy();
  });

  it('does not put extra body keys on the 400 errors object', async () => {
    const response = await POST(request({
      name: '',
      phone: '',
      zip: '',
      propertyType: '',
      email: 'x@y.z',
      website: '',
      notes: 'hi'
    }) as never);

    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json.ok).toBe(false);
    expect(Object.keys(json.errors).sort()).toEqual(ALLOWED_ERROR_KEYS);
    expect(json.errors).not.toHaveProperty('email');
    expect(json.errors).not.toHaveProperty('website');
    expect(json.errors).not.toHaveProperty('notes');
  });

  it('accepts whatsapp in place of phone and town in place of zip', async () => {
    const response = await POST(request({
      name: 'Ana',
      whatsapp: '18829300319',
      town: 'Union',
      propertyType: 'apartment'
    }) as never);

    expect(response.status).toBe(204);
    expect(mocks.after).toHaveBeenCalledOnce();
  });

  it('rejects an unknown propertyType with that field key', async () => {
    const response = await POST(request({
      ...validBody,
      propertyType: 'warehouse'
    }) as never);

    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json.ok).toBe(false);
    expect(json.errors).toEqual({ propertyType: 'required' });
  });

  it('returns 200 and does not notify when the website honeypot is filled', async () => {
    const response = await POST(request({
      ...validBody,
      website: 'https://spam.example'
    }) as never);

    expect(response.status).toBe(200);
    expect(await response.text()).toBe('');
    expect(mocks.after).not.toHaveBeenCalled();
    expect(mocks.notifyOwner).not.toHaveBeenCalled();
  });

  it('returns 204 and schedules a notification on a valid request', async () => {
    const response = await POST(request(validBody) as never);

    expect(response.status).toBe(204);
    expect(await response.text()).toBe('');
    expect(mocks.after).toHaveBeenCalledOnce();

    const callback = mocks.after.mock.calls[0][0] as () => void;
    callback();
    expect(mocks.notifyOwner).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Maria R.',
      phone: '8829300319',
      zip: '07083',
      propertyType: 'home',
      need: 'Weekly kitchen and baths'
    }));
  });

  it('returns 204 when the owner notification rejects', async () => {
    mocks.notifyOwner.mockRejectedValue(new Error('resend down'));

    const response = await POST(request(validBody) as never);

    expect(response.status).toBe(204);
    expect(await response.text()).toBe('');
    const callback = mocks.after.mock.calls[0][0] as () => void;
    expect(() => callback()).not.toThrow();
    await vi.waitFor(() => {
      expect(mocks.notifyOwner).toHaveBeenCalled();
    });
  });

  it('returns 204 when after() cannot queue and notify still fails', async () => {
    mocks.after.mockImplementation(() => {
      throw new Error('after unavailable');
    });
    mocks.notifyOwner.mockRejectedValue(new Error('resend down'));

    const response = await POST(request(validBody) as never);

    expect(response.status).toBe(204);
    expect(await response.text()).toBe('');
    await vi.waitFor(() => {
      expect(mocks.notifyOwner).toHaveBeenCalled();
    });
  });
});
