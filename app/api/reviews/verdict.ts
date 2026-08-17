import { moderateReview, type CleanReview, type RejectReason } from '@/lib/moderation';

export const DEFAULT_RATE_LIMIT_PER_HOUR = 3;

/**
 * Submissions allowed per IP hash per hour. `REVIEW_RATE_LIMIT_PER_HOUR=0` switches the
 * limit off, which is only ever meant for local testing — the env var is absent in
 * production, so the default applies there.
 */
export function rateLimitPerHour() {
  const raw = process.env.REVIEW_RATE_LIMIT_PER_HOUR;
  if (raw == null || raw === '') return DEFAULT_RATE_LIMIT_PER_HOUR;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : DEFAULT_RATE_LIMIT_PER_HOUR;
}
// A human cannot read the modal, type a name and eight words in under two seconds.
export const MIN_FILL_MS = 2000;

export type SubmissionBody = Record<string, unknown>;
export type Verdict =
  | { status: 201; body: { ok: true }; review: CleanReview }
  | { status: 400 | 403 | 429; body: { ok: false; reason: RejectReason | 'bot' | 'rate' } };

export function submissionVerdict(input: {
  body: SubmissionBody;
  isBot: boolean;
  recentFromIp: number;
}): Verdict {
  const { body, isBot, recentFromIp } = input;

  // `website` is a hidden field: real people never see it, scripted form-fillers always do.
  const honeypot = typeof body.website === 'string' && body.website.trim() !== '';
  const tooFast = typeof body.elapsedMs === 'number' && body.elapsedMs < MIN_FILL_MS;
  if (isBot || honeypot || tooFast) return { status: 403, body: { ok: false, reason: 'bot' } };

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
