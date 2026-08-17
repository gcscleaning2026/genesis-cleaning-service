import { createClient, type Client } from '@libsql/client';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// Read once at module load rather than per call: on Vercel the file ships next to the
// compiled module and one read keeps cold starts cheap.
export const SCHEMA = readFileSync(join(process.cwd(), 'lib', 'schema.sql'), 'utf8');

let client: Client | null = null;

/** Memoised Turso client. Fluid Compute reuses instances, so one client serves many requests. */
export function getDb(): Client {
  if (client) return client;
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;
  if (!url || !authToken) throw new Error('TURSO_DATABASE_URL and TURSO_AUTH_TOKEN must be set');
  client = createClient({ url, authToken });
  return client;
}

/** Runs every statement in schema.sql. Safe to re-run: all statements are IF NOT EXISTS. */
export async function applySchema(target: Client) {
  const statements = SCHEMA.split(';').map(s => s.trim()).filter(Boolean);
  for (const sql of statements) await target.execute(sql);
}
