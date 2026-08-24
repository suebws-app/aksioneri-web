import 'server-only';
import { headers } from 'next/headers';
import { cache } from 'react';
import { auth, type Session } from './better-auth';

/**
 * Reads the session in a server component, layout, or route handler.
 *
 * Wrapped in `cache()` so several components in one render share a single
 * lookup instead of hitting the database each time.
 *
 * Next.js 16: `headers()` is async and must be awaited.
 */
export const getServerSession = cache(async (): Promise<Session | null> => {
  const session = await auth.api.getSession({ headers: await headers() });
  return session ?? null;
});

export const getCurrentUser = async (): Promise<Session['user'] | null> => {
  const session = await getServerSession();
  return session?.user ?? null;
};
