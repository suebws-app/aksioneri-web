---
name: layouts-and-providers
description: Use this skill when composing layouts, adding a React context provider, or deciding where the server/client boundary goes
type: skill
---

# Layouts and Providers

## When to Use

- Adding a provider (theme, analytics, feature flags)
- Creating a layout for a route group
- A "useState in a Server Component" error

## Core Principles

- **Layouts stay server components.** They fetch data and read the session
  without shipping any of it to the browser.
- **All client context lives in one component**, `src/components/Providers`. A
  layout renders `<Providers>`; it never becomes a client component itself.
- The `'use client'` boundary is a **subtree** boundary: everything imported
  below it is client code too. Push it as deep as possible.
- `src/app/layout.tsx` is a passthrough. `src/app/[locale]/layout.tsx` owns
  `<html>` and `<body>`, because that is the first place the locale is known and
  `<html lang>` must carry the real one.

## Code Templates

### Adding a provider

```typescript
// src/components/Providers/Providers.tsx
'use client';

export function Providers({ children }: { children: ReactNode }) {
  // useState, not a module constant: on the server a shared QueryClient would
  // leak one user's cached data into another user's render.
  const [queryClient] = useState(makeQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryClientProvider>
  );
}
```

### A route-group layout

```typescript
// src/app/[locale]/(private)/layout.tsx
export default async function PrivateLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  // proxy.ts only checks that a cookie exists. This is the real check.
  const user = await getCurrentUser();
  if (!user) redirect({ href: '/sign-in', locale });

  return (
    <div className="flex min-h-full flex-col">
      <AppHeader user={user} />
      {children}
    </div>
  );
}
```

### Passing server data to client components

Serialise it as props. Server data cannot cross the boundary as a class
instance, a Date inside a Map, or a function:

```typescript
// server layout
const user = await getCurrentUser();
return <UserMenu name={user.name} email={user.email} />;
```

## Two-layer auth

`proxy.ts` reads a cookie and redirects — cheap, runs on every request, and
proves nothing (a cookie can be forged). The layout or page performs the real
session lookup. **Both are required**: the proxy for a fast redirect, the server
check for actual protection.

## Anti-Patterns

| Don't                                                   | Do                                     |
| ------------------------------------------------------- | -------------------------------------- |
| `'use client'` on a layout                              | Move the client parts into `Providers` |
| `const queryClient = new QueryClient()` at module scope | Create it in `useState`                |
| A provider per feature at the root                      | One `Providers` component              |
| Trusting `proxy.ts` as the only auth check              | Verify the session server-side too     |
| `<html lang="sq">` hardcoded                            | `<html lang={locale}>`                 |
| Passing a function as a prop across the boundary        | Pass serialisable data                 |
