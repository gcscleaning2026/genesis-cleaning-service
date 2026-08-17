import { createClient } from '@libsql/client';
import { describe, expect, it } from 'vitest';
import { applySchema } from '../lib/db';

describe('applySchema', () => {
  it('creates the reviews table with a pending default', async () => {
    const client = createClient({ url: ':memory:' });
    await applySchema(client);
    await client.execute({
      sql: 'INSERT INTO reviews (name, comment, rating, lang) VALUES (?, ?, ?, ?)',
      args: ['Ana', 'A comment that is long enough to be stored in the table.', 5, 'es']
    });
    const rows = await client.execute('SELECT status, created_at FROM reviews');
    expect(rows.rows[0]['status']).toBe('pending');
    expect(rows.rows[0]['created_at']).toBeTruthy();
  });
});
