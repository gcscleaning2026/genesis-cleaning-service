import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  after: vi.fn(),
  checkBotId: vi.fn(),
  countRecentByIp: vi.fn(),
  getDb: vi.fn(),
  hashIp: vi.fn(),
  insertPendingWithinLimit: vi.fn(),
  notifyOwner: vi.fn()
}));

vi.mock('next/server', async importOriginal => ({
  ...(await importOriginal<typeof import('next/server')>()),
  after: mocks.after
}));
vi.mock('botid/server', () => ({ checkBotId: mocks.checkBotId }));
vi.mock('@/lib/db', () => ({ getDb: mocks.getDb }));
vi.mock('@/lib/notify', () => ({ notifyOwnerOfPendingReview: mocks.notifyOwner }));
vi.mock('@/lib/reviews-repo', () => ({
  countRecentByIp: mocks.countRecentByIp,
  hashIp: mocks.hashIp,
  insertPendingWithinLimit: mocks.insertPendingWithinLimit
}));

import { POST } from '../app/api/reviews/route';

const validBody = {
  name: 'Ana R.',
  comment: 'They arrived on time and left the kitchen and both bathrooms completely spotless.',
  rating: 5,
  lang: 'en',
  website: '',
  formStartedAtMs: Date.now() - 9000,
  elapsedMs: 9000
};

function request(body: unknown, headers: Record<string, string> = {}) {
  return new Request('https://example.test/api/reviews', {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...headers },
    body: JSON.stringify(body)
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.spyOn(console, 'error').mockImplementation(() => {});
  mocks.checkBotId.mockResolvedValue({ isBot: false });
  mocks.countRecentByIp.mockResolvedValue(0);
  mocks.getDb.mockReturnValue({});
  mocks.hashIp.mockReturnValue('ip-hash');
  mocks.insertPendingWithinLimit.mockResolvedValue(42);
  mocks.notifyOwner.mockResolvedValue(undefined);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('POST /api/reviews', () => {
  it('maps a structurally invalid JSON body to a controlled 400', async () => {
    const response = await POST(request(null) as never);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ ok: false, reason: 'length' });
    expect(mocks.getDb).not.toHaveBeenCalled();
  });

  it('prefers the Vercel-owned client address and schedules notification after insertion', async () => {
    const response = await POST(request(validBody, {
      'x-vercel-forwarded-for': '203.0.113.20',
      'x-forwarded-for': '198.51.100.7'
    }) as never);

    expect(response.status).toBe(201);
    expect(mocks.hashIp).toHaveBeenCalledWith('203.0.113.20');
    expect(mocks.insertPendingWithinLimit).toHaveBeenCalledWith({}, expect.any(Object), 'ip-hash', 3, 1);
    expect(mocks.after).toHaveBeenCalledOnce();

    const callback = mocks.after.mock.calls[0][0] as () => Promise<void>;
    await callback();
    expect(mocks.notifyOwner).toHaveBeenCalledWith(expect.objectContaining({ id: 42, name: 'Ana R.' }));
  });

  it('fails closed when the IP hashing salt is unavailable', async () => {
    mocks.hashIp.mockImplementationOnce(() => { throw new Error('missing salt'); });

    const response = await POST(request(validBody) as never);

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ ok: false, reason: 'store' });
    expect(mocks.getDb).not.toHaveBeenCalled();
  });

  it('returns 429 when the atomic insert loses a concurrent quota race', async () => {
    mocks.insertPendingWithinLimit.mockResolvedValueOnce(null);

    const response = await POST(request(validBody) as never);

    expect(response.status).toBe(429);
    expect(await response.json()).toEqual({ ok: false, reason: 'rate' });
    expect(mocks.after).not.toHaveBeenCalled();
  });
});
