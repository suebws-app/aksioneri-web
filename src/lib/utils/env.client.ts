import { z } from 'zod';

const isProduction = process.env.NODE_ENV === 'production';

export const IS_PRODUCTION = isProduction;

const optionalUrl = (fallback: string) =>
  isProduction ? z.url() : z.url().default(fallback);

const clientEnvSchema = z.object({
  NEXT_PUBLIC_API_URL: optionalUrl('http://localhost:4000/api'),
  NEXT_PUBLIC_APP_URL: optionalUrl('http://localhost:3000'),
  NEXT_PUBLIC_CONTACT_EMAIL: isProduction
    ? z.email()
    : z.email().default('kontakt@aksioneri.com'),
  NEXT_PUBLIC_DISPLAY_TZ: z.string().min(1).default('Europe/Belgrade'),
  NEXT_PUBLIC_SITE_NAME: z.string().min(1).default('Aksioneri'),
  NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().default('https://us.i.posthog.com'),
  NEXT_PUBLIC_MIN_PASSWORD_LENGTH: z.coerce
    .number()
    .int()
    .positive()
    .default(8),
});

const parsed = clientEnvSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  NEXT_PUBLIC_DISPLAY_TZ: process.env.NEXT_PUBLIC_DISPLAY_TZ,
  NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
  NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
  NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  NEXT_PUBLIC_MIN_PASSWORD_LENGTH: process.env.NEXT_PUBLIC_MIN_PASSWORD_LENGTH,
});

if (!parsed.success) {
  const formatted = parsed.error.issues
    .map((issue) => `  ${issue.path.join('.')}: ${issue.message}`)
    .join('\n');
  throw new Error(`Client environment validation failed:\n${formatted}`);
}

export const clientEnv = parsed.data;
