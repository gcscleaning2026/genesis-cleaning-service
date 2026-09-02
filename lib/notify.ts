import 'server-only';
import type { CleanReview } from './moderation';
import type { QuoteFields } from './quote';

const escape = (value: string) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

/**
 * Notifies the owner that a review is waiting. Deliberately never throws: a review that is
 * safely stored must not be reported as failed to the visitor because the mail provider had
 * a bad minute. The pending queue on /admin is the source of truth; mail is a nudge.
 */
export async function notifyOwnerOfPendingReview(review: CleanReview & { id: number }) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.OWNER_EMAIL;
  const from = process.env.REVIEW_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error('[notify] missing RESEND_API_KEY, OWNER_EMAIL or REVIEW_FROM_EMAIL; skipping email');
    return;
  }

  const adminUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/admin`;
  const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);

  try {
    // Imported here rather than at the top of the file: the SDK costs ~15ms to load and a
    // cold start that only ever rejects submissions never needs it.
    const { Resend } = await import('resend');
    await new Resend(apiKey).emails.send({
      from,
      to: [to],
      subject: `New review from ${review.name} (${review.rating}/5) awaiting approval`,
      html: `
        <div style="font-family:system-ui,sans-serif;line-height:1.5;color:#12203F">
          <h2 style="margin:0 0 8px">New review awaiting approval</h2>
          <p style="margin:0 0 4px"><strong>${escape(review.name)}</strong> — ${stars} (${review.rating}/5, ${review.lang})</p>
          <blockquote style="margin:12px 0;padding:12px 16px;background:#F3F8FC;border-left:3px solid #00A9E0">
            ${escape(review.comment)}
          </blockquote>
          <p style="margin:16px 0 0">
            <a href="${adminUrl}" style="background:#D42A80;color:#fff;padding:10px 18px;border-radius:999px;text-decoration:none">
              Approve or reject it
            </a>
          </p>
          <p style="margin:16px 0 0;font-size:12px;color:#56658A">Review #${review.id}. It is not public until you approve it.</p>
        </div>
      `
    });
  } catch (error) {
    console.error('[notify] could not send the owner notification', error);
  }
}



export async function notifyOwnerOfQuote(quote: QuoteFields) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.OWNER_EMAIL;
  const from = process.env.REVIEW_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error('[notify] missing mail env; skipping quote email');
    return;
  }
  try {
    const { Resend } = await import('resend');
    const place = quote.zip ?? quote.town ?? '';
    await new Resend(apiKey).emails.send({
      from,
      to: [to],
      subject: 'New cleaning quote request',
      html: `
        <div style="font-family:system-ui,sans-serif;line-height:1.5;color:#12203F">
          <h2 style="margin:0 0 8px">New quote request</h2>
          <p style="margin:0 0 4px"><strong>${escape(quote.name)}</strong></p>
          <p style="margin:0 0 4px">Phone: ${escape(quote.phone)}</p>
          <p style="margin:0 0 4px">Place: ${escape(place)}</p>
          <p style="margin:0 0 4px">Property: ${escape(quote.propertyType)}</p>
          ${quote.need ? `<p style="margin:12px 0 0">${escape(quote.need)}</p>` : ''}
        </div>
      `
    });
  } catch {
    console.error('[notify] could not send the quote notification');
  }
}
