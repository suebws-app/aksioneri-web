import 'server-only';
import { betterAuth } from 'better-auth';
import { createAuthMiddleware } from 'better-auth/api';
import { nextCookies } from 'better-auth/next-js';
import { randomBytes } from 'node:crypto';
import { Pool } from 'pg';
import { defaultLocale } from '@/i18n/config';
import {
  sendPasswordResetEmail,
  sendVerificationEmail,
} from '@/lib/email/auth-emails';
import { serverEnv as env } from '@/lib/utils/env.server';
import { AUTH_COOKIE_PREFIX, CSRF_COOKIE_NAME } from './constants';

/**
 * better-auth runs HERE, inside Next.js, against the same PostgreSQL database
 * aksioneri-api uses. It owns sign-up, sign-in, verification and the
 * `users` / `session` / `account` / `verification` / `rate_limit` tables; the
 * API only reads them.
 *
 * The `fields` maps below translate better-auth's camelCase model fields onto
 * the snake_case columns declared in `aksioneri-api/src/database/schema`.
 * Changing a column there means changing the map here in the same commit —
 * a mismatch fails at runtime, not at build time.
 */
const pool = new Pool({ connectionString: env.DATABASE_URL });

/**
 * Attributes of the readable CSRF mirror cookie (`aksioneri.csrf_token`).
 * Deliberately NOT httpOnly: `readCsrfToken` in `lib/api/client.ts` reads it
 * from `document.cookie` and sends it as `X-CSRF-Token`, which the API compares
 * against the `csrf_token` column on the session row (double-submit check).
 */
const csrfCookieAttributes = {
  httpOnly: false,
  secure: env.IS_PRODUCTION || env.APP_URL.startsWith('https://'),
  sameSite: 'lax',
  path: '/',
} as const;

export const auth = betterAuth({
  database: pool,
  baseURL: env.APP_URL,
  // The same secret aksioneri-api verifies the session cookie signature with.
  secret: env.AUTH_COOKIE_SECRET,
  trustedOrigins: [env.APP_URL],

  emailAndPassword: {
    enabled: true,
    // Email sending IS wired (Brevo, `lib/email/`). The flag can be switched
    // on once BREVO_API_KEY and EMAIL_FROM are set in production; without
    // them the email module logs a warning and skips the send.
    requireEmailVerification: env.REQUIRE_EMAIL_VERIFICATION,
    minPasswordLength: env.MIN_PASSWORD_LENGTH,
    autoSignIn: true,
    sendResetPassword: async ({ user, url }) => {
      await sendPasswordResetEmail({ to: user.email, url });
    },
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendVerificationEmail({ to: user.email, url });
    },
  },

  user: {
    modelName: 'users',
    fields: {
      name: 'full_name',
      image: 'avatar_url',
      emailVerified: 'email_verified',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'user',
        required: false,
        fieldName: 'role',
      },
      preferredLanguage: {
        type: 'string',
        defaultValue: defaultLocale,
        required: false,
        fieldName: 'preferred_language',
      },
    },
  },

  session: {
    expiresIn: env.SESSION_TTL_SECONDS,
    updateAge: env.SESSION_UPDATE_AGE_SECONDS,
    // The API reads the session row on every request, so a cached cookie copy
    // would let a revoked session keep working until the cache expired.
    cookieCache: { enabled: false },
    fields: {
      userId: 'user_id',
      expiresAt: 'expires_at',
      ipAddress: 'ip_address',
      userAgent: 'user_agent',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    additionalFields: {
      csrfToken: { type: 'string', required: true, fieldName: 'csrf_token' },
      lastUsedAt: { type: 'date', required: true, fieldName: 'last_used_at' },
    },
  },

  account: {
    fields: {
      userId: 'user_id',
      // better-auth 1.7 scopes account identity by issuer; the column is
      // required and (issuer, account_id) is the unique key.
      issuer: 'issuer',
      accountId: 'account_id',
      providerId: 'provider_id',
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
      idToken: 'id_token',
      accessTokenExpiresAt: 'access_token_expires_at',
      refreshTokenExpiresAt: 'refresh_token_expires_at',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },

  // Both models default to camelCase column names. These maps are what let the
  // API's schema keep every column snake_case.
  verification: {
    fields: {
      expiresAt: 'expires_at',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },

  rateLimit: {
    // Throttle everywhere except local dev and tests — staging and preview
    // deployments face the internet too and must not run unthrottled.
    enabled: env.NODE_ENV !== 'development' && env.NODE_ENV !== 'test',
    storage: 'database',
    modelName: 'rate_limit',
    fields: { lastRequest: 'last_request' },
    window: 60,
    max: 30,
    customRules: {
      '/sign-in/email': { window: 60, max: 5 },
      '/sign-up/email': { window: 600, max: 3 },
      '/request-password-reset': { window: 600, max: 2 },
      '/reset-password': { window: 600, max: 5 },
    },
  },

  databaseHooks: {
    session: {
      create: {
        // `csrf_token` is NOT NULL and the API compares it against the
        // X-CSRF-Token header on every write, so it must be generated here.
        before: async (session) => ({
          data: {
            ...session,
            csrfToken: randomBytes(32).toString('base64url'),
            lastUsedAt: new Date(),
          },
        }),
        // Mirror the stored token into a readable cookie so client-side
        // mutations can send it. `ctx` is the endpoint context of the request
        // that created the session (sign-in / sign-up); it is null only for
        // adapter calls outside a request, where there is no response to
        // attach a cookie to.
        after: async (session, ctx) => {
          if (!ctx) return;
          const { csrfToken } = session as { csrfToken?: unknown };
          if (typeof csrfToken !== 'string') return;

          const maxAge =
            session.expiresAt instanceof Date
              ? Math.max(
                  0,
                  Math.floor((session.expiresAt.getTime() - Date.now()) / 1000),
                )
              : env.SESSION_TTL_SECONDS;

          ctx.setCookie(CSRF_COOKIE_NAME, csrfToken, {
            ...csrfCookieAttributes,
            maxAge,
          });
        },
      },
    },
  },

  hooks: {
    // The session cookie is cleared by better-auth itself on sign-out; the
    // CSRF mirror is ours, so it has to be expired here too.
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path === '/sign-out') {
        ctx.setCookie(CSRF_COOKIE_NAME, '', {
          ...csrfCookieAttributes,
          maxAge: 0,
        });
      }
    }),
  },

  advanced: {
    database: { generateId: 'uuid' },
    cookiePrefix: AUTH_COOKIE_PREFIX,
  },

  // Must stay last: it lets better-auth set cookies from server actions.
  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
