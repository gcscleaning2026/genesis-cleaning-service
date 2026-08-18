export const MAX_REVIEW_BODY_BYTES = 8 * 1024;

/** Reads an unauthenticated JSON body without allowing the parser to allocate unbounded input. */
export async function readReviewBody(request: Pick<Request, 'body' | 'headers'>) {
  const declaredLength = Number(request.headers.get('content-length'));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_REVIEW_BODY_BYTES) {
    throw new Error('review body too large');
  }
  if (!request.body) throw new Error('invalid review body');

  const reader = request.body.getReader();
  const decoder = new TextDecoder('utf-8', { fatal: true });
  let bytes = 0;
  let json = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    if (bytes > MAX_REVIEW_BODY_BYTES) {
      await reader.cancel();
      throw new Error('review body too large');
    }
    json += decoder.decode(value, { stream: true });
  }
  json += decoder.decode();

  const body: unknown = JSON.parse(json);
  if (body === null || typeof body !== 'object' || Array.isArray(body)) {
    throw new Error('invalid review body');
  }
  return body as Record<string, unknown>;
}
