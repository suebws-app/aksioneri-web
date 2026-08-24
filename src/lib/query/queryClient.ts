import { QueryClient } from '@tanstack/react-query';
import { ApiError } from '@/lib/api/client';

/**
 * A fresh client per browser session, and a fresh one per request on the
 * server — a shared server-side client would leak one user's cached data into
 * another user's render.
 */
export const makeQueryClient = (): QueryClient =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000,
        retry: (failureCount, error) => {
          // Retrying a 4xx just repeats the same rejection.
          if (error instanceof ApiError && error.status < 500) return false;
          return failureCount < 2;
        },
      },
    },
  });
