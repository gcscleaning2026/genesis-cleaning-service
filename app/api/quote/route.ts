import { NextResponse, after, type NextRequest } from 'next/server';
import { parseQuoteBody } from '@/lib/quote';
import { readReviewBody } from '@/app/api/reviews/body';

export const maxDuration = 15;

async function notifyQuote(quote: { name: string; phone: string; zip: string; propertyType: string; need: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.OWNER_EMAIL;
  const from = process.env.REVIEW_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error('[quote] missing mail env; skipping email', quote.propertyType);
    return;
  }
  try {
    const { Resend } = await import('resend');
    const esc = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
    await new Resend(apiKey).emails.send({
      from,
      to: [to],
      subject: `Quote request from ${quote.name} (${quote.propertyType})`,
      html: `<div style="font-family:system-ui,sans-serif;line-height:1.5">
        <p><strong>${esc(quote.name)}</strong></p>
        <p>Phone: ${esc(quote.phone)}<br>ZIP/town: ${esc(quote.zip)}<br>Type: ${esc(quote.propertyType)}</p>
        <p>${esc(quote.need) || '—'}</p>
      </div>`
    });
  } catch (error) {
    console.error('[quote] could not send owner mail', error);
  }
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await readReviewBody(request);
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const parsed = parseQuoteBody(body);
  if (parsed.status === 200) return NextResponse.json({ ok: true }, { status: 200 });
  if (parsed.status === 400) return NextResponse.json({ ok: false }, { status: 400 });

  after(async () => {
    await notifyQuote(parsed.quote);
  });
  return new NextResponse(null, { status: 204 });
}
