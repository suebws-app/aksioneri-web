import { NEWS_IMAGE_HOSTS } from '@/config/news-image-hosts';

const originOf = (url: string): string => {
  try {
    return new URL(url).origin;
  } catch {
    return url;
  }
};

const wsOriginOf = (httpOrigin: string): string =>
  httpOrigin.replace(/^http:/, 'ws:').replace(/^https:/, 'wss:');

const sentryReportUri = (dsn: string): string | null => {
  try {
    const url = new URL(dsn);
    const projectId = url.pathname.replace(/^\//, '');
    if (!url.username || !projectId) return null;
    return `${url.origin}/api/${projectId}/security/?sentry_key=${url.username}`;
  } catch {
    return null;
  }
};

const imgSrc = [
  "'self'",
  'data:',
  'blob:',
  ...NEWS_IMAGE_HOSTS.map((host) => `https://${host}`),
].join(' ');

interface CspExtras {
  posthogHost?: string;
  sentryDsn?: string;
}

export function buildCsp(
  apiUrl: string,
  isProduction: boolean,
  extras: CspExtras = {},
): string {
  const apiOrigin = originOf(apiUrl);
  const apiWsOrigin = wsOriginOf(apiOrigin);

  const scriptSrc = isProduction
    ? "'self' 'unsafe-inline'"
    : "'self' 'unsafe-inline' 'unsafe-eval'";

  const connectSources = new Set<string>(["'self'", apiOrigin, apiWsOrigin]);
  if (extras.posthogHost) {
    connectSources.add(originOf(extras.posthogHost));
  }
  if (extras.sentryDsn) {
    connectSources.add(originOf(extras.sentryDsn));
  }
  const connectSrc = [...connectSources].join(' ');

  const reportUri = extras.sentryDsn ? sentryReportUri(extras.sentryDsn) : null;

  return [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline'",
    `img-src ${imgSrc}`,
    "font-src 'self' data:",
    `connect-src ${connectSrc}`,
    "object-src 'none'",
    "frame-src 'none'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    'upgrade-insecure-requests',
    ...(reportUri ? [`report-uri ${reportUri}`] : []),
  ].join('; ');
}
