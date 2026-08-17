import { randomBytes, scryptSync } from 'node:crypto';
import { beforeEach, describe, expect, it } from 'vitest';
import { createSessionToken, isValidSessionToken, verifyPassword } from '../lib/admin-session';

// Same shape scripts/hash-password.mjs prints.
function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex');
  return `${salt}:${scryptSync(password, salt, 64).toString('hex')}`;
}

beforeEach(() => {
  process.env.ADMIN_SESSION_SECRET = 'a-long-random-test-secret';
});

describe('verifyPassword', () => {
  it('accepts the right password and rejects the wrong one', async () => {
    const stored = hashPassword('correct horse');
    expect(await verifyPassword('correct horse', stored)).toBe(true);
    expect(await verifyPassword('wrong horse', stored)).toBe(false);
  });

  it('rejects a malformed stored value instead of throwing', async () => {
    expect(await verifyPassword('anything', 'not-a-hash')).toBe(false);
    expect(await verifyPassword('anything', '')).toBe(false);
  });
});

describe('session tokens', () => {
  it('accepts a token it just issued', async () => {
    expect(await isValidSessionToken(await createSessionToken())).toBe(true);
  });

  it('rejects a tampered token', async () => {
    const token = await createSessionToken();
    expect(await isValidSessionToken(token.replace(/.$/, 'x'))).toBe(false);
  });

  it('rejects a token signed with a different secret', async () => {
    const token = await createSessionToken();
    process.env.ADMIN_SESSION_SECRET = 'a-different-secret';
    expect(await isValidSessionToken(token)).toBe(false);
  });

  it('rejects an expired token', async () => {
    expect(await isValidSessionToken(await createSessionToken(-1000))).toBe(false);
  });

  it('rejects undefined and garbage', async () => {
    expect(await isValidSessionToken(undefined)).toBe(false);
    expect(await isValidSessionToken('nonsense')).toBe(false);
  });
});
