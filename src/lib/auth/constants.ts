/**
 * The cookie prefix better-auth uses. Shared by the better-auth config and by
 * `proxy.ts`, which must pass it to `getSessionCookie` — that helper otherwise
 * looks for the default `better-auth.session_token` and silently finds nothing,
 * so every protected route redirects even for a signed-in user.
 *
 * Changing this means changing `AUTH_COOKIE_NAME` in aksioneri-api to match:
 * the full cookie name is `<prefix>.session_token`.
 */
export const AUTH_COOKIE_PREFIX = 'aksioneri';
