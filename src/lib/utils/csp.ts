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

  const posthogOrigin = extras.posthogHost
    ? originOf(extras.posthogHost)
    : null;

  const scriptSources = new Set<string>([
    "'self'",
    "'unsafe-inline'",
    ...(isProduction ? [] : ["'unsafe-eval'"]),
  ]);
  if (posthogOrigin) scriptSources.add(posthogOrigin);
  const scriptSrc = [...scriptSources].join(' ');

  const workerSources = new Set<string>(["'self'", 'blob:']);
  if (posthogOrigin) workerSources.add(posthogOrigin);
  const workerSrc = [...workerSources].join(' ');

  const connectSources = new Set<string>(["'self'", apiOrigin, apiWsOrigin]);
  if (posthogOrigin) connectSources.add(posthogOrigin);
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
    `worker-src ${workerSrc}`,
    "object-src 'none'",
    "frame-src 'none'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    'upgrade-insecure-requests',
    ...(reportUri ? [`report-uri ${reportUri}`] : []),
  ].join('; ');
}
