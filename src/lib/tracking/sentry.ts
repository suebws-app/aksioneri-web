import { clientEnv } from '@/lib/utils/env.client';

let initialized = false;

export async function initSentry(): Promise<void> {
  if (initialized) return;
  const dsn = clientEnv.NEXT_PUBLIC_SENTRY_DSN;
  if (!dsn) return;
  if (process.env.NODE_ENV !== 'production') return;

  const Sentry = await import('@sentry/browser');
  Sentry.init({
    dsn,
    release: process.env.NEXT_PUBLIC_SENTRY_RELEASE || undefined,
    environment: process.env.NODE_ENV,
    tracesSampleRate: Number(
      process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE ?? '0.1',
    ),
    sendDefaultPii: false,
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 0,
    beforeSend(event) {
      if (event.user) {
        event.user = undefined;
      }
      if (event.request) {
        if ('cookies' in event.request) {
          delete (event.request as { cookies?: unknown }).cookies;
        }
        if (event.request.headers) {
          const headers = event.request.headers as Record<string, unknown>;
          delete headers.cookie;
          delete headers.Cookie;
          delete headers.authorization;
          delete headers.Authorization;
          delete headers['x-csrf-token'];
          delete headers['X-CSRF-Token'];
        }
        if (typeof event.request.query_string === 'string') {
          event.request.query_string = event.request.query_string.replace(
            /(^|&)token=[^&]*/g,
            '$1token=[Filtered]',
          );
        }
      }
      if (event.contexts) {
        for (const key of Object.keys(event.contexts)) {
          if (key !== 'browser' && key !== 'runtime' && key !== 'os') {
            delete event.contexts[key];
          }
        }
      }
      return event;
    },
  });
  initialized = true;
}
