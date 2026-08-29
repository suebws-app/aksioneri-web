'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';
import { CookieConsent } from '@/components/CookieConsent';
import { ConsentProvider } from '@/lib/consent/consentContext';
import { makeQueryClient } from '@/lib/query/queryClient';
import { TrackingBootstrap } from '@/lib/tracking/TrackingBootstrap';

export function Providers({ children }: { children: ReactNode }) {
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
