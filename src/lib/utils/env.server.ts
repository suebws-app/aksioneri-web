import 'server-only';
import { z } from 'zod';

/**
 * Server-only configuration. The `server-only` import makes referencing this
 * from a client component a build error, so a secret cannot reach the browser
 * bundle by accident.
 */
const serverEnvSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),

  // Public origin of this app. Used by better-auth and by every canonical URL.
  APP_URL: z.url().default('http://localhost:3000'),

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
