import { createClient, type Client } from '@libsql/client';
import { beforeEach, describe, expect, it } from 'vitest';
import { applySchema } from '../lib/db';
import {
  countRecentByIp,
  hashIp,
  insertPending,
  insertPendingWithinLimit,
  listByStatus,
  setStatus
} from '../lib/reviews-repo';

const review = {
  name: 'Ana R.',
  comment: 'The team was on time and the kitchen and bathrooms were spotless before staff arrived.',
  rating: 5,
  lang: 'en'
} as const;

let db: Client;

beforeEach(async () => {
  db = createClient({ url: ':memory:' });
  await applySchema(db);
  process.env.REVIEW_IP_SALT = 'test-salt';
});

describe('reviews repo', () => {
  it('stores a review as pending and returns its id', async () => {
    const id = await insertPending(db, review, hashIp('1.2.3.4'));
    expect(id).toBeGreaterThan(0);
    const pending = await listByStatus(db, 'pending');
    expect(pending).toHaveLength(1);
    expect(pending[0]).toMatchObject({ id, name: 'Ana R.', rating: 5, lang: 'en', status: 'pending' });
  });

  it('keeps pending reviews out of the approved list until approved', async () => {
    const id = await insertPending(db, review, hashIp('1.2.3.4'));
    expect(await listByStatus(db, 'approved')).toHaveLength(0);
    await setStatus(db, id, 'approved');
    expect(await listByStatus(db, 'approved')).toHaveLength(1);
    expect(await listByStatus(db, 'pending')).toHaveLength(0);
  });

  it('counts recent submissions per ip hash', async () => {
    const mine = hashIp('1.2.3.4');
    await insertPending(db, review, mine);
    await insertPending(db, review, mine);
    await insertPending(db, review, hashIp('9.9.9.9'));
    expect(await countRecentByIp(db, mine, 1)).toBe(2);
  });

  it('enforces the per-ip limit atomically under concurrent inserts', async () => {
    const mine = hashIp('1.2.3.4');
    const ids = await Promise.all(
      Array.from({ length: 8 }, () => insertPendingWithinLimit(db, review, mine, 3, 1))
    );

    expect(ids.filter((id) => id !== null)).toHaveLength(3);
    expect(await countRecentByIp(db, mine, 1)).toBe(3);
  });

  it('hashes ips instead of storing them', async () => {
    expect(hashIp('1.2.3.4')).toMatch(/^[a-f0-9]{64}$/);
    expect(hashIp('1.2.3.4')).not.toContain('1.2.3.4');
    expect(hashIp('1.2.3.4')).toBe(hashIp('1.2.3.4'));
    expect(hashIp('1.2.3.4')).not.toBe(hashIp('4.3.2.1'));
  });

  it('refuses to hash submitter addresses without the secret salt', () => {
    delete process.env.REVIEW_IP_SALT;
    expect(() => hashIp('1.2.3.4')).toThrow('REVIEW_IP_SALT must be set');
  });

  it('orders approved reviews newest first and respects the limit', async () => {
    const first = await insertPending(db, { ...review, name: 'First' }, hashIp('1.1.1.1'));
    const second = await insertPending(db, { ...review, name: 'Second' }, hashIp('1.1.1.2'));
    await setStatus(db, first, 'approved');
    await setStatus(db, second, 'approved');
    const approved = await listByStatus(db, 'approved', 1);
    expect(approved).toHaveLength(1);
    expect(approved[0].id).toBe(second);
  });
});
