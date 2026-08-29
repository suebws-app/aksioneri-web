import { createNavigation } from 'next-intl/navigation';
import type { ComponentProps } from 'react';
import type { Locale } from './config';
import { matchPathname } from './pathnames';
import { routing } from './routing';

type WrappedHref =
  | string
  | {
      pathname: string;
      query?: Record<string, unknown>;
      hash?: string;
      params?: Record<string, string>;
    };

const nav = createNavigation(routing);

type NextIntlLinkProps = ComponentProps<typeof nav.Link>;

function toNextIntlHref(href: WrappedHref): unknown {
  if (typeof href !== 'string') return href;

  if (href.startsWith('#') || href.startsWith('?')) return href;

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
