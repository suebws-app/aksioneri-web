import createMiddleware from 'next-intl/middleware';
import type { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';
import { routing } from './i18n/routing';
import { clientEnv, IS_PRODUCTION } from './lib/utils/env.client';
import { buildCsp } from './lib/utils/csp';

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest): NextResponse {
  const response = intlMiddleware(request) as NextResponse;

  response.headers.set(
    'Content-Security-Policy',
    buildCsp(clientEnv.NEXT_PUBLIC_API_URL, IS_PRODUCTION, {
      posthogHost: clientEnv.NEXT_PUBLIC_POSTHOG_KEY
        ? clientEnv.NEXT_PUBLIC_POSTHOG_HOST
        : undefined,
      sentryDsn: clientEnv.NEXT_PUBLIC_SENTRY_DSN || undefined,
    }),
  );
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=()',
  );
  response.headers.set('X-Frame-Options', 'DENY');

  if (IS_PRODUCTION) {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=63072000; includeSubDomains; preload',
    );
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|opengraph-image|icon|apple-icon|sitemap|robots|.*\\..*).*)',
  ],
};
