import { toNextJsHandler } from 'better-auth/next-js';
import { auth } from '@/lib/auth/better-auth';

/**
 * better-auth's Next.js integration mounted at `/api/auth/*`.
 *
 * Deliberately outside the `[locale]` segment: the client posts to
 * origin-relative `/api/auth/sign-in/email`, `/api/auth/sign-up/email`, etc.
 * A locale prefix here would move the handler under `/sq/api/auth/...` and
 * every auth call would 404.
 */
export const { GET, POST } = toNextJsHandler(auth);
