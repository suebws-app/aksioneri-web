/**
 * Route access control, shared by `proxy.ts`, `robots.ts`, and any future
 * guard. AGENTS.md rule 6: "Private routes need three edits" — this file
 * cuts that to one.
 *
 * `PRIVATE_PATHS` is the crawler-facing list (blocked in `robots.ts`).
 * `PROTECTED_PREFIXES` is the auth-facing list (redirected in `proxy.ts`).
 * They usually overlap but not always — the search results page is
 * disallowed for crawlers (thin, near-duplicate) but not gated by auth.
 */

/**
 * Paths that must not be indexed. Emitted under every locale prefix by
 * `robots.ts`; a sitemap entry for any of these is a crawl error.
 */
export const PRIVATE_PATHS = ['/api/', '/search'] as const;

/**
 * Path prefixes that require a signed-in session. Empty for now — the site
 * has no authenticated surface yet (see `proxy.ts`). Add here when the
 * account area lands; `proxy.ts` reads this and redirects to `/sign-in`.
 */
export const PROTECTED_PREFIXES: readonly string[] = [];
