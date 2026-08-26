import { createNavigation } from 'next-intl/navigation';
import type { ComponentProps } from 'react';
import type { Locale } from './config';
import { matchPathname } from './pathnames';
import { routing } from './routing';

/**
 * Href shape our wrappers accept. Broader than next-intl's strict per-
 * pathname type so callers can pass:
 *
 *   - a canonical string (`/news/abc-123`) — we match it against the
 *     pathnames map and forward the object form to next-intl
 *   - an already-object href (`{ pathname, query }`) — often with a
 *     runtime-derived pathname from `usePathname()` that TypeScript
 *     cannot narrow to a specific literal
 */
type WrappedHref =
  | string
  | {
      pathname: string;
      query?: Record<string, unknown>;
      hash?: string;
      params?: Record<string, string>;
    };

/**
 * Locale-aware replacements for `next/link` and `next/navigation`.
 *
 * Always import from here. Using the bare Next.js versions drops the locale
 * prefix and sends a reader back to the wrong URL.
 *
 * These wrap next-intl's `createNavigation` so consumers can pass a
 * canonical string href (`/news/abc-123`) for both static and dynamic
 * routes. Internally the string is parsed against the pathnames map and
 * converted to the object form next-intl needs when pathnames is set.
 * Without the wrapper, every dynamic Link callsite would have to move to
 * the object form — ~37 in this codebase.
 */
const nav = createNavigation(routing);

type NextIntlLinkProps = ComponentProps<typeof nav.Link>;

/**
 * Converts a canonical string href into next-intl's expected form.
 * Falls through untouched for hrefs that already come in as objects or
 * for external / hash-only strings the map does not cover.
 */
function toNextIntlHref(href: WrappedHref): unknown {
  if (typeof href !== 'string') return href;

  // Fragment-only or query-only strings — leave alone.
  if (href.startsWith('#') || href.startsWith('?')) return href;

  // Split off any trailing query / hash so the path portion can be matched
  // cleanly, then reattach.
  const questionAt = href.indexOf('?');
  const hashAt = href.indexOf('#');
  const cutAt =
    questionAt === -1
      ? hashAt
      : hashAt === -1
        ? questionAt
        : Math.min(questionAt, hashAt);
  const pathPart = cutAt === -1 ? href : href.slice(0, cutAt);
  const tail = cutAt === -1 ? '' : href.slice(cutAt);

  const matched = matchPathname(pathPart);
  if (!matched) return href;

  // Static pattern (no params) — the raw pathname is already a valid
  // pathnames key, so hand it back as a string plus tail.
  if (Object.keys(matched.params).length === 0) {
    return matched.pattern + tail;
  }

  return {
    pathname: matched.pattern,
    params: matched.params,
    ...(tail ? { query: parseQuery(tail), hash: parseHash(tail) } : {}),
  };
}

function parseQuery(tail: string): Record<string, string> | undefined {
  const q = tail.indexOf('?');
  if (q === -1) return undefined;
  const h = tail.indexOf('#', q);
  const raw = h === -1 ? tail.slice(q + 1) : tail.slice(q + 1, h);
  return Object.fromEntries(new URLSearchParams(raw));
}

function parseHash(tail: string): string | undefined {
  const h = tail.indexOf('#');
  return h === -1 ? undefined : tail.slice(h + 1);
}

export function Link({
  href,
  ...props
}: Omit<NextIntlLinkProps, 'href'> & { href: WrappedHref }) {
  return <nav.Link href={toNextIntlHref(href) as never} {...props} />;
}

/**
 * Wraps next-intl's `useRouter` so `router.push('/news/abc')` and
 * `router.replace('/learn/xyz')` translate their string hrefs the same
 * way `Link` does.
 */
export function useRouter() {
  const router = nav.useRouter();
  return {
    ...router,
    push: (href: WrappedHref, options?: Parameters<typeof router.push>[1]) =>
      router.push(toNextIntlHref(href) as never, options),
    replace: (
      href: WrappedHref,
      options?: Parameters<typeof router.replace>[1],
    ) => router.replace(toNextIntlHref(href) as never, options),
    prefetch: (
      href: WrappedHref,
      options?: Parameters<typeof router.prefetch>[1],
    ) => router.prefetch(toNextIntlHref(href) as never, options),
  };
}

/**
 * Wraps next-intl's `getPathname` for the same string-href support.
 * Used by SearchField / NavSearch to build the `<form action>` URL.
 */
export function getPathname({
  href,
  locale,
}: {
  href: WrappedHref;
  locale: Locale;
}): string {
  return nav.getPathname({
    href: toNextIntlHref(href) as never,
    locale,
  });
}

export const { redirect, usePathname } = nav;
