import createMiddleware from 'next-intl/middleware';
import type { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';
import { routing } from './i18n/routing';
import { clientEnv } from './lib/utils/env.client';
import { buildCsp } from './lib/utils/csp';

/**
 * Next.js 16 replaces `middleware.ts` with `proxy.ts`, and it runs on Node.js
 * rather than the Edge runtime.
 *
 * Handles locale negotiation and security headers.
 *
 * The auth gate is deliberately absent: the site has no authenticated surface
 * yet. `src/lib/auth` and `src/features/auth` still hold a working better-auth
 * setup, unreferenced — wiring it back means restoring the session check here
 * and re-adding the sign-in routes.
 */
const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest): NextResponse {
  const response = intlMiddleware(request) as NextResponse;

  response.headers.set(
    'Content-Security-Policy',
    buildCsp(
      clientEnv.NEXT_PUBLIC_API_URL,
      process.env.NODE_ENV === 'production',
    ),
  );
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}

export const config = {
  // Skip Next internals, the better-auth handler, the metadata routes, and
  // anything with a file extension. Without the metadata exclusions next-intl
  // rewrites /opengraph-image to /sq/opengraph-image, which does not exist.
  matcher: [
    '/((?!api|_next|_vercel|opengraph-image|icon|apple-icon|sitemap|robots|.*\\..*).*)',
  ],
};
