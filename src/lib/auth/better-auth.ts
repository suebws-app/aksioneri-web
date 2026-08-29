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

const pool = new Pool({ connectionString: env.DATABASE_URL });

const csrfCookieAttributes = {
  httpOnly: false,
  secure: env.IS_PRODUCTION || env.APP_URL.startsWith('https://'),
  sameSite: 'lax',
  path: '/',
} as const;

export const auth = betterAuth({
  database: pool,
  baseURL: env.APP_URL,
  secret: env.AUTH_COOKIE_SECRET,
  trustedOrigins: [env.APP_URL],

  emailAndPassword: {
    enabled: true,
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

  verification: {
    fields: {
      expiresAt: 'expires_at',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },

  rateLimit: {
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
        before: async (session) => ({
          data: {
            ...session,
            csrfToken: randomBytes(32).toString('base64url'),
            lastUsedAt: new Date(),
          },
        }),
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

  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
