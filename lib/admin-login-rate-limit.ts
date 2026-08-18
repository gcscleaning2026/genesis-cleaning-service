import 'server-only';
import { createHmac } from 'node:crypto';
import type { Client } from '@libsql/client';

export function loginIdentityHash(clientIp: string, account: string) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error('ADMIN_SESSION_SECRET must be set');
  return createHmac('sha256', secret)
    .update(clientIp)
    .update('\0')
    .update(account.toLocaleLowerCase('en-US'))
    .digest('hex');
}

/** Atomically reserves one attempt in a fixed window. A missing returned row means blocked. */
export async function consumeLoginAttempt(
  client: Client,
  identityHash: string,
  maxAttempts: number,
  windowSeconds: number
) {
  const result = await client.execute({
    sql: `INSERT INTO admin_login_attempts (identity_hash, window_started_at, attempts)
          VALUES (?, unixepoch(), 1)
          ON CONFLICT(identity_hash) DO UPDATE SET
            attempts = CASE
              WHEN window_started_at <= unixepoch() - ? THEN 1
              ELSE attempts + 1
            END,
            window_started_at = CASE
              WHEN window_started_at <= unixepoch() - ? THEN unixepoch()
              ELSE window_started_at
            END
          WHERE window_started_at <= unixepoch() - ? OR attempts < ?
          RETURNING attempts`,
    args: [identityHash, windowSeconds, windowSeconds, windowSeconds, maxAttempts]
  });
  return result.rows.length === 1;
}

export async function clearLoginAttempts(client: Client, identityHash: string) {
  await client.execute({
    sql: 'DELETE FROM admin_login_attempts WHERE identity_hash = ?',
    args: [identityHash]
  });
}
