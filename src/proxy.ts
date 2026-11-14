import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const url = request.nextUrl;
  const pathname = url.pathname;

  // Check if request is directed to the creators subdomain
  // e.g. creators.neckt.in or creators.localhost:3000
  const isCreatorsSubdomain = host.startsWith('creators.');

  if (isCreatorsSubdomain) {
    // If not already prefixed with /creators, rewrite to /creators
    if (!pathname.startsWith('/creators')) {
      const rewriteUrl = new URL(`/creators${pathname === '/' ? '' : pathname}`, request.url);
      return NextResponse.rewrite(rewriteUrl);
    }
  }

  return NextResponse.next();
}

export default proxy;

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt
     */
    '/((?!api|_next/static|_next/image|favicon.svg|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
