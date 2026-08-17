import { NextResponse, type NextRequest } from 'next/server';
import { ADMIN_COOKIE, isValidSessionToken } from '@/lib/admin-session';

// `middleware` was renamed to `proxy` in Next.js 16. This is the gate in front of the admin
// area; the server actions behind it check the session again, because a proxy runs before
// routing and is not a substitute for authorisation at the point of mutation.
export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === '/admin/login') return NextResponse.next();
  if (await isValidSessionToken(request.cookies.get(ADMIN_COOKIE)?.value)) return NextResponse.next();
  return NextResponse.redirect(new URL('/admin/login', request.url));
}

export const config = {
  matcher: '/admin/:path*'
};
