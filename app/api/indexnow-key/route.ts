import { indexNowKey } from '@/lib/indexnow';

export const dynamic = 'force-dynamic';

/**
 * Body of the IndexNow key file. next.config rewrites `/{INDEXNOW_KEY}.txt` here so the
 * protocol's well-known filename can stay an env value rather than a committed secret.
 */
export function GET() {
  const key = indexNowKey();
  if (!key) return new Response(null, { status: 404 });
  return new Response(key, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
