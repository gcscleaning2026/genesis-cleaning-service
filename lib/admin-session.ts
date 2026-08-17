export const ADMIN_COOKIE = 'gcs_admin';
const DEFAULT_TTL_MS = 8 * 60 * 60 * 1000;

function secret() {
  const value = process.env.ADMIN_SESSION_SECRET;
  if (!value) throw new Error('ADMIN_SESSION_SECRET must be set');
  return value;
}

// Web Crypto rather than node:crypto so proxy.ts can verify a session wherever it runs.
async function hmac(message: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message));
  return Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, '0')).join('');
}

/** Constant-time compare: a fast `!==` leaks how much of a forged token was right. */
function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Compares a password against the "salt:hash" scrypt value from ADMIN_PASSWORD_HASH. */
export async function verifyPassword(password: string, stored: string) {
  const [salt, expected] = (stored ?? '').split(':');
  if (!salt || !expected) return false;
  const { scrypt } = await import('node:crypto');
  const actual = await new Promise<string>(resolve =>
    scrypt(password, salt, 64, (error, buffer) => resolve(error ? '' : buffer.toString('hex')))
  );
  return actual.length > 0 && safeEqual(actual, expected);
}

export async function createSessionToken(ttlMs = DEFAULT_TTL_MS) {
  const expiry = String(Date.now() + ttlMs);
  return `${expiry}.${await hmac(expiry)}`;
}

export async function isValidSessionToken(token: string | undefined) {
  if (!token) return false;
  const [expiry, signature] = token.split('.');
  if (!expiry || !signature) return false;
  if (!/^\d+$/.test(expiry) || Number(expiry) < Date.now()) return false;
  return safeEqual(signature, await hmac(expiry));
}
