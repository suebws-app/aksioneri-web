/**
 * The cookie prefix better-auth uses. Shared by the better-auth config and by
 * `proxy.ts`, which must pass it to `getSessionCookie` — that helper otherwise
 * looks for the default `better-auth.session_token` and silently finds nothing,
 * so every protected route redirects even for a signed-in user.
 *
 * Changing this means changing `AUTH_COOKIE_PREFIX` in aksioneri-api to match:
 * both apps derive `<prefix>.session_token` and `<prefix>.csrf_token` from
 * the same base string.
 */
export const AUTH_COOKIE_PREFIX = 'aksioneri';

/**
 * HTTP header the API expects on state-changing requests. Kept alongside
 * the cookie prefix so any future rename touches one file. The API pins
 * the same string in `common/guards/auth.guard.ts`.
 */
export const CSRF_HEADER_NAME = 'X-CSRF-Token';

/**
 * The readable (non-httpOnly) cookie that mirrors the `csrf_token` column of
 * the session row. better-auth sets it in the `session.create` database hook
 * so `readCsrfToken` in `lib/api/client.ts` — which derives the same name from
 * `AUTH_COOKIE_PREFIX` — can send it as `X-CSRF-Token` on every write.
 */
export const CSRF_COOKIE_NAME = `${AUTH_COOKIE_PREFIX}.csrf_token`;

/**
 * Where a successful sign-in or sign-up lands. Home for now — the site has no
 * authenticated surface yet (see `proxy.ts`), so a `/dashboard` redirect would
 * 404. Kept as a single source of truth so the destination moves in one place
 * when the account area lands.
 */
export const POST_SIGN_IN_ROUTE = '/';
