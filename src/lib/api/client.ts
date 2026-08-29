import { AUTH_COOKIE_PREFIX, CSRF_HEADER_NAME } from '@/lib/auth/constants';
import { clientEnv } from '@/lib/utils/env.client';

export interface ApiErrorBody {
  error: {
    code: string;
    message: string;
    details: Record<string, unknown>;
    traceId?: string;
  };
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly details: Record<string, unknown> = {},
    public readonly traceId?: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export interface PaginatedResponse<T> {
  data: T[];
  nextCursor: string | null;
}

export interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  searchParams?: Record<string, string | number | boolean | undefined>;
  next?: { revalidate?: number | false; tags?: string[] };
}

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

const buildUrl = (
  path: string,
  searchParams?: RequestOptions['searchParams'],
): string => {
  const url = new URL(
    path.startsWith('/') ? path.slice(1) : path,
    `${clientEnv.NEXT_PUBLIC_API_URL.replace(/\/$/, '')}/`,
  );

  for (const [key, value] of Object.entries(searchParams ?? {})) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }

  return url.toString();
};

export async function apiFetch<T>(
  path: string,
  { body, searchParams, headers, ...init }: RequestOptions = {},
): Promise<T> {
  const method = init.method ?? 'GET';

  const response = await fetch(buildUrl(path, searchParams), {
    ...init,
    method,
    credentials: 'include',
    headers: {
      ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
      ...(SAFE_METHODS.has(method)
        ? {}
        : { [CSRF_HEADER_NAME]: readCsrfToken() }),
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (response.status === 204) return undefined as T;

  const payload: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const parsed = payload as ApiErrorBody | null;
    throw new ApiError(
      response.status,
      parsed?.error?.code ?? 'UNKNOWN',
      parsed?.error?.message ?? response.statusText,
      parsed?.error?.details ?? {},
      parsed?.error?.traceId,
    );
  }

  return payload as T;
}

export const apiFetchPaginated = <T>(
  path: string,
  options?: RequestOptions,
): Promise<PaginatedResponse<T>> =>
  apiFetch<PaginatedResponse<T>>(path, options);

function readCsrfToken(): string {
  if (typeof document === 'undefined') return '';
  const cookiePrefix = `${AUTH_COOKIE_PREFIX}.csrf_token=`;
  const match = document.cookie
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(cookiePrefix));
  return match ? decodeURIComponent(match.split('=')[1] ?? '') : '';
}
