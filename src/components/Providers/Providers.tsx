'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';
import { makeQueryClient } from '@/lib/query/queryClient';

/**
 * Client-side providers, kept in one component so layouts stay server
 * components. Only what genuinely needs browser APIs or React context lives here.
 */
export function Providers({ children }: { children: ReactNode }) {
  // useState, not a module-level constant: on the server a shared client would
  // leak cached data between users' requests.
  const [queryClient] = useState(makeQueryClient);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
