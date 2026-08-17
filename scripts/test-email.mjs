/**
 * Sends one real notification email, using the same env vars and the same body the review
 * endpoint uses. Run after the Resend key is in place:
 *
 *   node --env-file=.env.local scripts/test-email.mjs
 *
 * Prints the Resend message id on success, or the provider's error — unlike lib/notify.ts,
 * which deliberately swallows failures so a dead mail provider cannot fail a stored review.
 */
import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;
const to = process.env.OWNER_EMAIL;
const from = process.env.REVIEW_FROM_EMAIL;

const missing = [
  !apiKey && 'RESEND_API_KEY',
  !to && 'OWNER_EMAIL',
  !from && 'REVIEW_FROM_EMAIL'
].filter(Boolean);

if (missing.length) {
  console.error(`[test-email] missing: ${missing.join(', ')}`);
  process.exit(1);
}

const review = {
  id: 0,
  name: 'Test Submission',
  comment: 'This is a test of the review notification email. No review was stored.',
  rating: 5,
  lang: 'en'
};

const adminUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/admin`;
const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);

const { data, error } = await new Resend(apiKey).emails.send({
  from,
  to: [to],
  subject: `[test] New review from ${review.name} (${review.rating}/5) awaiting approval`,
  html: `
    <div style="font-family:system-ui,sans-serif;line-height:1.5;color:#12203F">
      <h2 style="margin:0 0 8px">New review awaiting approval</h2>
      <p style="margin:0 0 4px"><strong>${review.name}</strong> — ${stars} (${review.rating}/5, ${review.lang})</p>
      <blockquote style="margin:12px 0;padding:12px 16px;background:#F3F8FC;border-left:3px solid #00A9E0">
        ${review.comment}
      </blockquote>
      <p style="margin:16px 0 0">
        <a href="${adminUrl}" style="background:#D42A80;color:#fff;padding:10px 18px;border-radius:999px;text-decoration:none">
          Approve or reject it
        </a>
      </p>
      <p style="margin:16px 0 0;font-size:12px;color:#56658A">Test message — nothing is queued.</p>
    </div>
  `
});

if (error) {
  console.error('[test-email] failed:', error);
  process.exit(1);
}
console.log(`[test-email] sent to ${to} from ${from} — id ${data.id}`);
