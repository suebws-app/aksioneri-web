'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';
import { CookieConsent } from '@/components/CookieConsent';
import { ConsentProvider } from '@/lib/consent/consentContext';
import { makeQueryClient } from '@/lib/query/queryClient';
import { TrackingBootstrap } from '@/lib/tracking/TrackingBootstrap';

/**
 * Client-side providers, kept in one component so layouts stay server
 * components. Only what genuinely needs browser APIs or React context lives
 * here.
 *
 * Order matters:
 *   - QueryClient is outermost (nothing below reads consent from it).
 *   - ConsentProvider wraps the tree, so `useConsent()` works everywhere
 *     the banner or tracking-bootstrap live.
 *   - `TrackingBootstrap` is a null-render bridge that fires Sentry +
 *     PostHog inits when consent flips to `granted`.
 *   - `CookieConsent` renders the banner at the bottom of every page.
 */
export function Providers({ children }: { children: ReactNode }) {
  // useState, not a module-level constant: on the server a shared client would
  // leak cached data between users' requests.
  const [queryClient] = useState(makeQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <ConsentProvider>
        {children}
        <TrackingBootstrap />
        <CookieConsent />
      </ConsentProvider>
    </QueryClientProvider>
  );
}
