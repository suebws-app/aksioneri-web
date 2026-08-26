import { z } from 'zod';

/**
 * Values safe to ship to the browser. Every key must start with `NEXT_PUBLIC_`
 * and must be referenced as a full literal (`process.env.NEXT_PUBLIC_API_URL`,
 * never `process.env[key]`) — Next.js inlines these at build time by static
 * text replacement, so a computed lookup resolves to `undefined` in the bundle.
 *
 * In production the URL and email are required — a missing value should fail
 * the build loudly rather than silently coerce to localhost. In development
 * the defaults keep `pnpm dev` working with no `.env` file.
 */
// `NODE_ENV` is set by Next itself; safe to read at module load.
const isProduction = process.env.NODE_ENV === 'production';

const optionalUrl = (fallback: string) =>
  isProduction ? z.url() : z.url().default(fallback);

const clientEnvSchema = z.object({
  NEXT_PUBLIC_API_URL: optionalUrl('http://localhost:4000/api'),
  NEXT_PUBLIC_APP_URL: optionalUrl('http://localhost:3000'),
  /**
   * The address readers write to. Shown on the contact page and interpolated
   * into the privacy and terms bodies. Required in production so the "replace
   * before launch" placeholder cannot ship by accident.
   */
  NEXT_PUBLIC_CONTACT_EMAIL: isProduction
    ? z.email()
    : z.email().default('kontakt@aksioneri.com'),
  /**
   * Timezone the calendar renders release times in. Kosovo audience default
   * (`Europe/Belgrade`); a user-preference picker will override this per
   * viewer once the account area lands.
   */
  NEXT_PUBLIC_DISPLAY_TZ: z.string().min(1).default('Europe/Belgrade'),
  /**
   * Human-facing brand name. Almost always `Aksioneri`; overridden on staging
   * so the environment marker (e.g. "Aksioneri (Staging)") appears in the
   * browser tab.
   */
  NEXT_PUBLIC_SITE_NAME: z.string().min(1).default('Aksioneri'),
  /**
   * Sentry project DSN. When set, error tracking initialises after the
   * reader accepts cookies; when unset, Sentry is fully disabled.
   */
  NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),
  /**
   * PostHog project API key. Same consent-gated flow as Sentry.
   */
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
  /**
   * PostHog API host. Defaults to the US cloud; set to
   * `https://eu.i.posthog.com` for EU-region data residency.
   */
  NEXT_PUBLIC_POSTHOG_HOST: z.string().default('https://us.i.posthog.com'),
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
});

if (!parsed.success) {
  const formatted = parsed.error.issues
    .map((issue) => `  ${issue.path.join('.')}: ${issue.message}`)
    .join('\n');
  throw new Error(`Client environment validation failed:\n${formatted}`);
}

export const clientEnv = parsed.data;
