// One-shot schema apply against the real database. Run after changing lib/schema.sql:
//   node --env-file=.env.local scripts/migrate.mjs
import { createClient } from '@libsql/client';
import { readFileSync } from 'node:fs';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN
});

const statements = readFileSync(new URL('../lib/schema.sql', import.meta.url), 'utf8')
  .split(';')
  .map(s => s.trim())
  .filter(Boolean);

for (const sql of statements) {
  await client.execute(sql);
  console.log('[migrate] ok:', sql.split('\n')[0]);
}
console.log('[migrate] done');
