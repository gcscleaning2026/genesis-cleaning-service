import { checkBotId } from 'botid/server';
import { NextResponse, type NextRequest } from 'next/server';
import { getDb } from '@/lib/db';
import { notifyOwnerOfPendingReview } from '@/lib/notify';
import { countRecentByIp, hashIp, insertPending } from '@/lib/reviews-repo';
import { submissionVerdict } from './verdict';

/**
 * BotID needs Vercel's OIDC header, so `checkBotId()` throws on a local `next start` and
 * whenever the service itself is unavailable. Blocking every review in that case is worse
 * than letting it through: the honeypot, the timing check, the per-IP rate limit and the
 * moderation rules all still apply, and nothing is published without the owner's approval.
 */
async function detectBot() {
  try {
    return (await checkBotId()).isBot;
  } catch (error) {
    console.error('[reviews] BotID check unavailable, falling through to the other checks', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: 'length' }, { status: 400 });
  }

  const isBot = await detectBot();

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const ipHash = hashIp(ip);

  const db = getDb();
  let recentFromIp = 0;
  try {
    recentFromIp = await countRecentByIp(db, ipHash, 1);
  } catch (error) {
    console.error('[reviews] rate-limit lookup failed', error);
  }

  const verdict = submissionVerdict({ body, isBot, recentFromIp });
  if (verdict.status !== 201) return NextResponse.json(verdict.body, { status: verdict.status });

  let id: number;
  try {
    id = await insertPending(db, verdict.review, ipHash);
  } catch (error) {
    console.error('[reviews] insert failed', error);
    return NextResponse.json({ ok: false, reason: 'store' }, { status: 500 });
  }

  // A failed email must not fail the submission — notifyOwnerOfPendingReview swallows its
  // own errors, and the pending queue on /admin is the real source of truth.
  await notifyOwnerOfPendingReview({ ...verdict.review, id });

  return NextResponse.json({ ok: true }, { status: 201 });
}
