import 'server-only';
import { z } from 'zod';

const isProduction = process.env.NODE_ENV === 'production';

const serverEnvSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'staging', 'production'])
    .default('development'),

  APP_URL: isProduction ? z.url() : z.url().default('http://localhost:3000'),

  DATABASE_URL: z.url(),

  AUTH_COOKIE_SECRET: z
    .string()
    .min(32)
    .refine(
      (value) =>
        !isProduction ||
        (!value.startsWith('replace-me') && !value.includes('changeme')),
      'AUTH_COOKIE_SECRET still holds a placeholder value; generate a real secret before deploying',
    ),

  INTERNAL_API_SECRET: z.string().min(32).optional(),

  NOINDEX: z.stringbool().default(false),

  REQUIRE_EMAIL_VERIFICATION: z
    .enum(['true', 'false'])
    .default('false')
    .transform((value) => value === 'true'),

  SESSION_TTL_SECONDS: z.coerce
    .number()
    .int()
    .positive()
    .default(60 * 60 * 24 * 30),
  SESSION_UPDATE_AGE_SECONDS: z.coerce
    .number()
    .int()
    .positive()
    .default(60 * 60 * 24 * 7),
  MIN_PASSWORD_LENGTH: z.coerce.number().int().positive().default(8),

  BREVO_API_KEY: z.string().optional(),
  EMAIL_FROM: z.email().optional(),
  EMAIL_FROM_NAME: z.string().default('Aksioneri'),
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
