import { toNextJsHandler } from 'better-auth/next-js';
import { auth } from '@/lib/auth/better-auth';

/**
 * Mounts every better-auth endpoint under /api/auth/*. This route lives outside
 * `[locale]` deliberately — auth endpoints are not localised.
 */
export const { GET, POST } = toNextJsHandler(auth);
