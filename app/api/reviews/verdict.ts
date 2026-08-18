import { moderateReview, type CleanReview, type RejectReason } from '@/lib/moderation';

export const DEFAULT_RATE_LIMIT_PER_HOUR = 3;

/**
 * Submissions allowed per IP hash per hour. `REVIEW_RATE_LIMIT_PER_HOUR=0` switches the
 * limit off outside production only; production falls back to the safe default.
 */
export function rateLimitPerHour() {
  const raw = process.env.REVIEW_RATE_LIMIT_PER_HOUR;
  if (raw == null || raw === '') return DEFAULT_RATE_LIMIT_PER_HOUR;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed < 0) return DEFAULT_RATE_LIMIT_PER_HOUR;
  if (parsed === 0 && process.env.NODE_ENV === 'production') return DEFAULT_RATE_LIMIT_PER_HOUR;
  return parsed;
}
// A human cannot read the modal, type a name and eight words in under two seconds.
export const MIN_FILL_MS = 2000;

export type SubmissionBody = Record<string, unknown>;
export type Verdict =
  | { status: 201; body: { ok: true }; review: CleanReview }
  | { status: 400 | 403 | 429; body: { ok: false; reason: RejectReason | 'bot' | 'rate' } };

/**
 * The two bot checks that need neither the network nor the database.
 *
 * `website` is a hidden field: real people never see it, scripted form-fillers always do.
 * `elapsedMs` is the fill timer. Exported so the route can answer them before it spends a
 * BotID call and a Turso round trip on a submission that is already rejected — the reply is
 * the same 403 either way.
 */
export function failsLocalBotChecks(body: SubmissionBody) {
  const honeypot = typeof body.website === 'string' && body.website.trim() !== '';
  const tooFast = typeof body.elapsedMs === 'number' && body.elapsedMs < MIN_FILL_MS;
  return honeypot || tooFast;
}

/** One definition of the bot rejection, so the early exit and the full verdict cannot drift. */
export function botVerdict(): Verdict {
  return { status: 403, body: { ok: false, reason: 'bot' } };
}

export function submissionVerdict(input: {
  body: SubmissionBody;
  isBot: boolean;
  recentFromIp: number;
}): Verdict {
  const { body, isBot, recentFromIp } = input;

  if (isBot || failsLocalBotChecks(body)) return botVerdict();

  const limit = rateLimitPerHour();
  if (limit > 0 && recentFromIp >= limit) return { status: 429, body: { ok: false, reason: 'rate' } };

  const moderated = moderateReview({
    name: body.name,
    comment: body.comment,
    rating: body.rating,
    lang: body.lang
  });
  if (!moderated.ok) return { status: 400, body: { ok: false, reason: moderated.reason } };

  return { status: 201, body: { ok: true }, review: moderated.review };
}
