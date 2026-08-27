/**
 * Route access control, shared by `proxy.ts`, `robots.ts`, and any future
 * guard. AGENTS.md rule 6: "Private routes need three edits" — this file
 * cuts that to one.
 *
 * `PRIVATE_PATHS` is the crawler-facing list (blocked in `robots.ts`).
 * `PROTECTED_PREFIXES` is the auth-facing list (redirected in `proxy.ts`).
 */

/**
 * Paths that must not be crawled at all. Emitted under every locale prefix by
 * `robots.ts`; a sitemap entry for any of these is a crawl error.
 *
 * Deliberately NOT here: the search page (`/kerko`). Its result lists are
 * thin near-duplicates, so the page sets `noIndex: true` via `buildMetadata`
 * — but it stays crawlable, because a robots disallow would hide that very
 * `noindex` directive from crawlers, leaving any already-indexed search URL
 * stuck in the index ("indexed, though blocked by robots.txt").
 */
export const PRIVATE_PATHS = ['/api/'] as const;

/**
 * Path prefixes that require a signed-in session. Empty for now — the site
 * has no authenticated surface yet (see `proxy.ts`). Add here when the
 * account area lands; `proxy.ts` reads this and redirects to `/sign-in`.
 */
export const PROTECTED_PREFIXES: readonly string[] = [];
