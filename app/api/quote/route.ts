import { after, NextResponse, type NextRequest } from 'next/server';
import { notifyOwnerOfQuoteRequest } from '@/lib/notify';
import {
  ALL_QUOTE_FIELD_ERRORS,
  isQuoteHoneypot,
  quoteFieldErrors,
  readQuoteRequest,
  type QuoteErrors
} from './fields';

export const maxDuration = 30;

function invalid(errors: QuoteErrors) {
  return NextResponse.json({ ok: false, errors }, { status: 400 });
}

function queueNotify(quote: ReturnType<typeof readQuoteRequest>) {
  try {
    after(() => notifyOwnerOfQuoteRequest(quote));
  } catch (error) {
    console.error('[quote] could not queue owner notification', error);
    void notifyOwnerOfQuoteRequest(quote);
  }
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return invalid(ALL_QUOTE_FIELD_ERRORS);
  }
  if (body === null || typeof body !== 'object' || Array.isArray(body)) {
    return invalid(ALL_QUOTE_FIELD_ERRORS);
  }
  const record = body as Record<string, unknown>;

  // Bots fill the hidden website field. Answer 200 with no work so they cannot probe
  // validation, and never send the owner a notification.
  if (isQuoteHoneypot(record)) {
    return new NextResponse(null, { status: 200 });
  }

  const errors = quoteFieldErrors(record);
  if (Object.keys(errors).length) return invalid(errors);

  queueNotify(readQuoteRequest(record));
  return new NextResponse(null, { status: 204 });
}
