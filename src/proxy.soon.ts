import { NextResponse, type NextRequest } from 'next/server';

// Coming-soon proxy. Only used when COMING_SOON mode is on (next.config.ts);
// the normal proxy.ts is used otherwise. Every URL redirects to "/".
export default function proxy(request: NextRequest): NextResponse {
  if (request.nextUrl.pathname === '/') return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = '/';
  url.search = '';
  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: ['/((?!_next|_vercel|favicon.ico|icon.svg|icon.png|logo.svg).*)'],
};
