import { createClient, type Client } from '@libsql/client';
import { beforeEach, describe, expect, it } from 'vitest';
import { applySchema } from '../lib/db';
import { clearLoginAttempts, consumeLoginAttempt } from '../lib/admin-login-rate-limit';

let db: Client;

beforeEach(async () => {
  db = createClient({ url: ':memory:' });
  await applySchema(db);
});

describe('admin login rate limit', () => {
  it('allows only the configured number of concurrent attempts', async () => {
    const results = await Promise.all(
      Array.from({ length: 10 }, () => consumeLoginAttempt(db, 'identity', 5, 900))
    );
    expect(results.filter(Boolean)).toHaveLength(5);
  });

  it('clears the attempt counter after a successful login', async () => {
    expect(await consumeLoginAttempt(db, 'identity', 1, 900)).toBe(true);
    expect(await consumeLoginAttempt(db, 'identity', 1, 900)).toBe(false);
    await clearLoginAttempts(db, 'identity');
    expect(await consumeLoginAttempt(db, 'identity', 1, 900)).toBe(true);
  });
});
