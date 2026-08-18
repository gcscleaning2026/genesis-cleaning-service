import { beforeEach, describe, expect, it, vi } from 'vitest';

const consumeLoginAttempt = vi.fn();
const clearLoginAttempts = vi.fn();
const verifyPassword = vi.fn();
const setCookie = vi.fn();

vi.mock('next/headers', () => ({
  cookies: async () => ({ set: setCookie }),
  headers: async () => new Headers({ 'x-vercel-forwarded-for': '203.0.113.10' })
}));
vi.mock('next/navigation', () => ({ redirect: vi.fn() }));
vi.mock('@/lib/db', () => ({ getDb: () => ({}) }));
vi.mock('@/lib/admin-login-rate-limit', () => ({
  clearLoginAttempts,
  consumeLoginAttempt,
  loginIdentityHash: () => 'identity'
}));
vi.mock('@/lib/admin-session', () => ({
  ADMIN_COOKIE: 'gcs_admin',
  createSessionToken: async () => 'token',
  verifyPassword
}));

function credentials(user = 'admin', password = 'secret') {
  const data = new FormData();
  data.set('user', user);
  data.set('password', password);
  return data;
}

beforeEach(() => {
  process.env.ADMIN_USER = 'admin';
  process.env.ADMIN_PASSWORD_HASH = 'salt:hash';
  process.env.ADMIN_SESSION_SECRET = 'test-session-secret';
  consumeLoginAttempt.mockReset().mockResolvedValue(true);
  clearLoginAttempts.mockReset().mockResolvedValue(undefined);
  verifyPassword.mockReset().mockResolvedValue(false);
  setCookie.mockReset();
});

describe('login', () => {
  it('does not run scrypt after the distributed attempt limit is exhausted', async () => {
    consumeLoginAttempt.mockResolvedValue(false);
    const { login } = await import('../app/admin/login/actions');

    await expect(login({}, credentials())).resolves.toEqual({ error: 'Too many attempts. Try again later.' });
    expect(verifyPassword).not.toHaveBeenCalled();
  });

  it('bounds credentials before password hashing', async () => {
    const { login } = await import('../app/admin/login/actions');

    await expect(login({}, credentials('admin', 'x'.repeat(1025)))).resolves.toEqual({
      error: 'Wrong username or password.'
    });
    expect(verifyPassword).not.toHaveBeenCalled();
  });
});
