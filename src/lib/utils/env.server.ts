import 'server-only';
import { z } from 'zod';

/**
 * Server-only configuration. The `server-only` import makes referencing this
 * from a client component a build error, so a secret cannot reach the browser
 * bundle by accident.
 *
 * URLs default to localhost in development so `pnpm dev` needs no `.env`; in
 * production they are required so a missing value fails the build rather than
 * silently pinning CORS and canonical URLs to localhost.
 */
const isProduction = process.env.NODE_ENV === 'production';

const serverEnvSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),

  // Public origin of this app. Used by better-auth and by every canonical URL.
  APP_URL: isProduction ? z.url() : z.url().default('http://localhost:3000'),

  // The same PostgreSQL database aksioneri-api uses. better-auth writes its
  // tables here; the API reads them.
  DATABASE_URL: z.url(),

  // Must be byte-identical to aksioneri-api's AUTH_COOKIE_SECRET — better-auth
  // signs the session cookie here and the API verifies that signature.
  AUTH_COOKIE_SECRET: z.string().min(32),

  REQUIRE_EMAIL_VERIFICATION: z
    .enum(['true', 'false'])
    .default('false')
    .transform((value) => value === 'true'),

  /**
   * Session lifetime in seconds. Default 30 days matches better-auth's
   * out-of-the-box behaviour; tuneable per environment (shorter for
   * staging drills, longer for a native shell that dislikes re-auth).
   */
  SESSION_TTL_SECONDS: z.coerce
    .number()
    .int()
    .positive()
    .default(60 * 60 * 24 * 30),
  /**
   * How often better-auth rotates the session token while a viewer is
   * active. Default 7 days.
   */
  SESSION_UPDATE_AGE_SECONDS: z.coerce
    .number()
    .int()
    .positive()
    .default(60 * 60 * 24 * 7),
  /**
   * Minimum password length better-auth enforces on sign-up. Kept as a
   * single source of truth so `authSchema.ts` cannot drift below it.
   */
  MIN_PASSWORD_LENGTH: z.coerce.number().int().positive().default(8),
});

const parsed = serverEnvSchema.safeParse(process.env);

if (!parsed.success) {
  const formatted = parsed.error.issues
    .map((issue) => `  ${issue.path.join('.')}: ${issue.message}`)
    .join('\n');
  throw new Error(`Server environment validation failed:\n${formatted}`);
}

export const serverEnv = {
  ...parsed.data,
  IS_PRODUCTION: parsed.data.NODE_ENV === 'production',
} as const;
