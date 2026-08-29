import 'server-only';
import { headers } from 'next/headers';
import { cache } from 'react';
import { auth, type Session } from './better-auth';

export const getServerSession = cache(async (): Promise<Session | null> => {
  const session = await auth.api.getSession({ headers: await headers() });
  return session ?? null;
});

export const getCurrentUser = async (): Promise<Session['user'] | null> => {
  const session = await getServerSession();
  return session?.user ?? null;
};
