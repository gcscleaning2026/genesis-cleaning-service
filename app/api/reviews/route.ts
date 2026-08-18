import { checkBotId } from 'botid/server';
import { NextResponse, after, type NextRequest } from 'next/server';
import { getDb } from '@/lib/db';
import { notifyOwnerOfPendingReview } from '@/lib/notify';
import { countRecentByIp, hashIp, insertPendingWithinLimit } from '@/lib/reviews-repo';
import { readReviewBody } from './body';
import { botVerdict, failsLocalBotChecks, rateLimitPerHour, submissionVerdict, type Verdict } from './verdict';

/**
 * Ceiling for the whole invocation, `after` callback included, against a platform default of
 * 300s. The `resend` SDK takes no AbortSignal, so the notification cannot carry a timeout of
 * its own; this is the supported way to stop a hung mail provider — or an unreachable Turso —
 * from holding an invocation open for five minutes. Measured stages leave enormous headroom:
 * the BotID gate runs ~108ms, the insert ~2ms and the mail ~43ms at the median.
 */
export const maxDuration = 30;

/**
 * Per-stage timings for one submission, off unless REVIEW_TIMING_LOG=1.
 *
 * There is no APM on this project, so this is the cheapest way to find out what the request
 * actually spends its time on in production — where BotID answers for real and the database
 * is Turso over HTTP rather than a local file. Durations only: no name, comment, IP or hash
 * is ever written to the log.
 */
const TIMING_ON = process.env.REVIEW_TIMING_LOG === '1';
const NO_TIMING = { mark() {}, log() {} };

function stopwatch() {
  if (!TIMING_ON) return NO_TIMING;
  const stages: Record<string, number> = {};
  let last = performance.now();
  return {
    mark(stage: string) {
      const now = performance.now();
      stages[stage] = Math.round(now - last);
      last = now;
    },
    log(outcome: string | number) {
      console.log('[reviews] timing', JSON.stringify({ outcome, ...stages }));
    }
  };
}

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
  const timing = stopwatch();
  /** Every non-201 exit logs its stage timings and answers with the verdict it was given. */
  const send = (verdict: Verdict) => {
    timing.log(verdict.status);
    return NextResponse.json(verdict.body, { status: verdict.status });
  };

  let body: Record<string, unknown>;
  try {
    body = await readReviewBody(request);
  } catch {
    return NextResponse.json({ ok: false, reason: 'length' }, { status: 400 });
  }
  timing.mark('parse');

  // The honeypot and the fill timer cost nothing, and a submission that trips either one
  // gets the same 403 whatever BotID and the rate limiter would have answered. Deciding them
  // here keeps the common spam case from paying for an external API call and a Turso round
  // trip; submissionVerdict still applies the identical rules to everything that gets past.
  if (failsLocalBotChecks(body)) return send(botVerdict());

  // Vercel owns this header and keeps it stable even when another proxy rewrites X-Forwarded-For.
  const forwardedIp = request.headers.get('x-vercel-forwarded-for') ?? request.headers.get('x-forwarded-for');
  const ip = forwardedIp?.split(',')[0]?.trim() || 'unknown';
  let ipHash: string;
  try {
    ipHash = hashIp(ip);
  } catch (error) {
    console.error('[reviews] rate-limit configuration unavailable', error);
    return NextResponse.json({ ok: false, reason: 'store' }, { status: 500 });
  }
  const db = getDb();

  // One question goes to Vercel and the other to Turso; neither needs the other's answer, so
  // running them in sequence bought nothing but a second round trip.
  const [isBot, recentFromIp] = await Promise.all([detectBot(), countRecent(db, ipHash)]);
  timing.mark('gate');

  const verdict = submissionVerdict({ body, isBot, recentFromIp });
  timing.mark('moderate');
  if (verdict.status !== 201) return send(verdict);

  let id: number;
  try {
    const insertedId = await insertPendingWithinLimit(db, verdict.review, ipHash, rateLimitPerHour(), 1);
    if (insertedId === null) {
      return send({ status: 429, body: { ok: false, reason: 'rate' } });
    }
    id = insertedId;
  } catch (error) {
    console.error('[reviews] insert failed', error);
    timing.log(500);
    return NextResponse.json({ ok: false, reason: 'store' }, { status: 500 });
  }
  timing.mark('insert');

  // The review is stored, so the visitor's request is finished; the owner's email is our
  // errand, not theirs. `after` runs it once the response has been sent (Vercel keeps the
  // invocation alive via waitUntil), which keeps a slow — or hanging — mail provider off the
  // submission path entirely. notifyOwnerOfPendingReview still swallows its own errors, and
  // the pending queue on /admin remains the source of truth.
  const review = { ...verdict.review, id };
  after(async () => {
    const mailTiming = stopwatch();
    await notifyOwnerOfPendingReview(review);
    mailTiming.mark('mail');
    mailTiming.log('mail');
  });

  timing.log(201);
  return NextResponse.json({ ok: true }, { status: 201 });
}

/** A rate-limit lookup that cannot fail the submission: an unreachable database means the
 *  limiter abstains rather than turning a visitor away. */
async function countRecent(db: ReturnType<typeof getDb>, ipHash: string) {
  try {
    return await countRecentByIp(db, ipHash, 1);
  } catch (error) {
    console.error('[reviews] rate-limit lookup failed', error);
    return 0;
  }
}
