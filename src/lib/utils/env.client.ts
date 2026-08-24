import { z } from 'zod';

/**
 * Values safe to ship to the browser. Every key must start with `NEXT_PUBLIC_`
 * and must be referenced as a full literal (`process.env.NEXT_PUBLIC_API_URL`,
 * never `process.env[key]`) — Next.js inlines these at build time by static
 * text replacement, so a computed lookup resolves to `undefined` in the bundle.
 */
const clientEnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.url().default('http://localhost:4000/api'),
  NEXT_PUBLIC_APP_URL: z.url().default('http://localhost:3000'),
});

const parsed = clientEnvSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
});

if (!parsed.success) {
  const formatted = parsed.error.issues
    .map((issue) => `  ${issue.path.join('.')}: ${issue.message}`)
    .join('\n');
  throw new Error(`Client environment validation failed:\n${formatted}`);
}

export const clientEnv = parsed.data;
