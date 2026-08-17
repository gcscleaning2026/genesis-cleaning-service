'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_COOKIE, createSessionToken, verifyPassword } from '@/lib/admin-session';

export type LoginState = { error?: string };

export async function login(_state: LoginState, formData: FormData): Promise<LoginState> {
  const user = String(formData.get('user') ?? '');
  const password = String(formData.get('password') ?? '');

  const expectedUser = process.env.ADMIN_USER ?? '';
  const storedHash = process.env.ADMIN_PASSWORD_HASH ?? '';
  const passwordOk = await verifyPassword(password, storedHash);

  // One message for both failures: telling an attacker which half was wrong hands them the
  // username for free.
  if (!expectedUser || user !== expectedUser || !passwordOk) return { error: 'Wrong username or password.' };

  (await cookies()).set(ADMIN_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/admin',
    maxAge: 8 * 60 * 60
  });
  redirect('/admin');
}
