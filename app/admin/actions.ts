'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { ADMIN_COOKIE, isValidSessionToken } from '@/lib/admin-session';
import { getDb } from '@/lib/db';
import { setStatus } from '@/lib/reviews-repo';

export async function decide(formData: FormData) {
  // Server actions are publicly reachable endpoints. The proxy gate in front of /admin does
  // not cover them, so the session is checked again here.
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!(await isValidSessionToken(token))) throw new Error('Not authorised');

  const id = Number(formData.get('id'));
  const decision = String(formData.get('decision'));
  if (!Number.isInteger(id) || id <= 0) throw new Error('Bad review id');
  if (decision !== 'approved' && decision !== 'rejected') throw new Error('Bad decision');

  await setStatus(getDb(), id, decision);

  // Approved reviews live in the static HTML of both languages, so both must be rebuilt.
  revalidatePath('/');
  revalidatePath('/es');
}
