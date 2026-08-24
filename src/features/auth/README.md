# auth (parked)

better-auth sign-in and sign-up, complete and working, but **not routed**.

The site has no authenticated surface, so `(auth)` and `(private)` route groups
were removed and `proxy.ts` no longer runs a session check. Nothing imports this
folder or `src/lib/auth`.

To bring it back:

1. Recreate `src/app/[locale]/(public)/(auth)/{sign-in,sign-up}/page.tsx`
   rendering `SignInPage` / `SignUpPage`.
2. Recreate `src/app/api/auth/[...all]/route.ts` exporting
   `toNextJsHandler(auth)` from `@/lib/auth/better-auth`.
3. Restore the session gate in `proxy.ts` — it must pass
   `{ cookiePrefix: AUTH_COOKIE_PREFIX }` to `getSessionCookie`, or the default
   `better-auth.` prefix silently matches nothing.
4. Add the protected and auth paths back to `PRIVATE_PATHS` in
   `src/app/robots.ts`.

The API side is untouched: `aksioneri-api` still has `AuthGuard`, the `users`
module, and the better-auth tables. See
`aksioneri-api/.claude/skills/auth/session-guard.md` for the shared-database
topology.
