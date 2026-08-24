import { getSessionCookie } from 'better-auth/cookies';
import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { locales } from './i18n/config';
import { AUTH_COOKIE_PREFIX } from './lib/auth/constants';
import { routing } from './i18n/routing';
import { clientEnv } from './lib/utils/env.client';
import { buildCsp } from './lib/utils/csp';

/**
 * Next.js 16 replaces `middleware.ts` with `proxy.ts`, and it runs on Node.js
 * rather than the Edge runtime.
 *
 * Two jobs, in order: locale negotiation (next-intl), then the auth gate.
 */
const intlMiddleware = createMiddleware(routing);

/** Path prefixes that require a session, written without a locale prefix. */
const PROTECTED_PREFIXES = ['/dashboard', '/account', '/settings'];

/** Signed-in users have no reason to see these. */
const AUTH_PREFIXES = ['/sign-in', '/sign-up'];

const LOCALE_PATTERN = new RegExp(`^/(${locales.join('|')})(?=/|$)`);

/** Strips the locale prefix so route matching is written once, not per locale. */
const stripLocale = (pathname: string): string =>
  pathname.replace(LOCALE_PATTERN, '') || '/';

const matches = (pathname: string, prefixes: string[]): boolean =>
  prefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

export default function proxy(request: NextRequest): NextResponse {
  const response = intlMiddleware(request) as NextResponse;

  const path = stripLocale(request.nextUrl.pathname);
  // Reads the cookie only — no database call, so this stays cheap on every
  // request. The API verifies the session properly on the actual data call.
  //
  // The prefix is required: without it getSessionCookie looks for the default
  // `better-auth.session_token` and never finds ours.
  const hasSession = Boolean(
    getSessionCookie(request, { cookiePrefix: AUTH_COOKIE_PREFIX }),
  );

  if (!hasSession && matches(path, PROTECTED_PREFIXES)) {
    const signIn = new URL('/sign-in', request.url);
    // Preserve where they were going so sign-in can send them back.
    signIn.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(signIn);
  }

  if (hasSession && matches(path, AUTH_PREFIXES)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

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
