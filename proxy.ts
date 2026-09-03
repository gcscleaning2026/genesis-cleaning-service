import { NextResponse, type NextRequest } from 'next/server';
import { ADMIN_COOKIE, isValidSessionToken } from '@/lib/admin-session';
import { canonicalLocation } from '@/lib/host-redirect';
import { isIndexNowKeyFilePath } from '@/lib/indexnow';

// `middleware` was renamed to `proxy` in Next.js 16. This is the gate in front of the admin
// area; the server actions behind it check the session again, because a proxy runs before
// routing and is not a substitute for authorisation at the point of mutation.
//
// It also folds http and the apex onto https://www.gcscleaning.net{path} in one 308 so a
// crawler never sees a two-step chain.
export async function proxy(request: NextRequest) {
  const location = canonicalLocation(
    request.headers.get('host'),
    request.headers.get('x-forwarded-proto'),
    request.nextUrl.pathname,
    request.nextUrl.search
  );
  if (location) return NextResponse.redirect(location, 308);

  // `/{INDEXNOW_KEY}.txt` is matched against the live env on this request so a runtime-only
  // key still serves the file. A next.config rewrite of `/${process.env.INDEXNOW_KEY}.txt`
  // would freeze whatever was set when the config module loaded, and a generic `/:key.txt`
  // rewrite would swallow `/robots.txt`.
  if (isIndexNowKeyFilePath(request.nextUrl.pathname)) {
    return NextResponse.rewrite(new URL('/api/indexnow-key', request.url));
  }

  if (!request.nextUrl.pathname.startsWith('/admin')) return NextResponse.next();
  if (request.nextUrl.pathname === '/admin/login') return NextResponse.next();
  if (await isValidSessionToken(request.cookies.get(ADMIN_COOKIE)?.value)) return NextResponse.next();
  return NextResponse.redirect(new URL('/admin/login', request.url));
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)']
};
