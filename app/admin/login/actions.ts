'use server';

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  clearLoginAttempts,
  consumeLoginAttempt,
  loginIdentityHash
} from '@/lib/admin-login-rate-limit';
import { ADMIN_COOKIE, createSessionToken, verifyPassword } from '@/lib/admin-session';
import { getDb } from '@/lib/db';

export type LoginState = { error?: string };

const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_WINDOW_SECONDS = 15 * 60;
const MAX_USER_LENGTH = 128;
const MAX_PASSWORD_LENGTH = 1024;

export async function login(_state: LoginState, formData: FormData): Promise<LoginState> {
  const user = String(formData.get('user') ?? '');
  const password = String(formData.get('password') ?? '');

  const expectedUser = process.env.ADMIN_USER ?? '';
  const storedHash = process.env.ADMIN_PASSWORD_HASH ?? '';
  const requestHeaders = await headers();
  const forwardedIp = requestHeaders.get('x-vercel-forwarded-for') ?? requestHeaders.get('x-forwarded-for');
  const clientIp = (forwardedIp?.split(',')[0]?.trim() || 'unknown').slice(0, 128);

  let identityHash: string;
  try {
    identityHash = loginIdentityHash(clientIp, expectedUser);
    const allowed = await consumeLoginAttempt(getDb(), identityHash, MAX_LOGIN_ATTEMPTS, LOGIN_WINDOW_SECONDS);
    if (!allowed) return { error: 'Too many attempts. Try again later.' };
  } catch (error) {
    console.error('[admin] login limiter unavailable', error);
    return { error: 'Sign-in temporarily unavailable.' };
  }

  const bounded = user.length <= MAX_USER_LENGTH && password.length <= MAX_PASSWORD_LENGTH;
  const passwordOk = bounded ? await verifyPassword(password, storedHash) : false;

  // One message for both failures: telling an attacker which half was wrong hands them the
  // username for free.
  if (!expectedUser || user !== expectedUser || !passwordOk) return { error: 'Wrong username or password.' };

  try {
    await clearLoginAttempts(getDb(), identityHash);
  } catch (error) {
    console.error('[admin] could not clear login attempts', error);
  }

  (await cookies()).set(ADMIN_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/admin',
    maxAge: 8 * 60 * 60
  });
  redirect('/admin');
}
