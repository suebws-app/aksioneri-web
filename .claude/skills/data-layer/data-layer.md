---
name: data-layer
description: Use this skill when fetching data from the API, adding a query or mutation, or handling loading and error states
type: skill
---

# Data Layer

## When to Use

- Reading or writing data owned by aksioneri-api
- Adding a React Query hook
- Handling a loading, empty, or error state

## Core Principles

Three layers, and components only ever touch the third:

```
lib/api/client.ts      apiFetch — the ONLY place fetch() is called
lib/api/<resource>.ts  typed functions per resource
lib/query/<resource>Queries.ts  query keys + hooks
```

- **Never call `fetch` in a component.** Auth cookies, the CSRF header, error
  mapping and base URL all live in `apiFetch`; bypassing it loses all four.
- **Server state belongs to React Query, never `useState`.** Copying a query
  result into local state creates two sources of truth that drift.
- Query keys come from a factory, so invalidation cannot typo a key.
- Every consumer handles **loading, error and empty** — three states, not two.

## Code Templates

### Resource functions

```typescript
// src/lib/api/auctions.ts
export interface Auction {
  id: string;
  title: string;
  startingPriceCents: number;
  status: 'draft' | 'live' | 'ended' | 'cancelled';
  endsAt: string;
}

export const auctionsApi = {
  list: (params: { cursor?: string; limit?: number } = {}) =>
    apiFetchPaginated<Auction>('/auctions', { searchParams: params }),

  detail: (id: string) => apiFetch<Auction>(`/auctions/${id}`),

  create: (body: CreateAuctionInput) =>
    apiFetch<Auction>('/auctions', { method: 'POST', body }),
};
```

### Query keys and hooks

```typescript
// src/lib/query/auctionsQueries.ts
export const auctionsQueries = {
  all: ['auctions'] as const,
  lists: () => [...auctionsQueries.all, 'list'] as const,
  list: (params: ListParams) => [...auctionsQueries.lists(), params] as const,
  details: () => [...auctionsQueries.all, 'detail'] as const,
  detail: (id: string) => [...auctionsQueries.details(), id] as const,
};

export const useAuctions = (params: ListParams) =>
  useQuery({
    queryKey: auctionsQueries.list(params),
    queryFn: () => auctionsApi.list(params),
  });

export const useCreateAuction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: auctionsApi.create,
    onSuccess: () => {
      // Invalidate the list branch only — detail queries are untouched by a
      // create, and blowing away `all` refetches everything on screen.
      void queryClient.invalidateQueries({ queryKey: auctionsQueries.lists() });
    },
  });
};
```

### Consuming

```typescript
const { data, isPending, error } = useAuctions({ limit: 20 });

if (isPending) return <AuctionsSkeleton />;
if (error) return <ErrorState message={t('errors.loadFailed')} />;
if (data.data.length === 0) return <EmptyState message={t('empty.noAuctions')} />;

return <AuctionGrid auctions={data.data} />;
```

### Errors

`apiFetch` throws `ApiError` carrying the API's `code`, `status`, `details` and
`traceId`. Branch on `code`, never on the message text:

```typescript
if (error instanceof ApiError && error.code === 'BID_TOO_LOW') {
  setFormError(
    t('errors.bidTooLow', { min: String(error.details.minimumCents) }),
  );
}
```

`queryClient` is configured not to retry 4xx — repeating a rejected request just
repeats the rejection.

### Server components

A server component can call the API directly, but it must forward the incoming
cookies — `apiFetch` runs in the browser context and has none on the server:

```typescript
const response = await fetch(`${serverEnv.API_URL}/auctions`, {
  headers: { cookie: (await headers()).get('cookie') ?? '' },
  cache: 'no-store', // Next.js 16 does not cache by default; be explicit
});
```

## Anti-Patterns

| Don't                                                          | Do                                 |
| -------------------------------------------------------------- | ---------------------------------- |
| `fetch('/api/auctions')` in a component                        | Go through `lib/api` + `lib/query` |
| `const [auctions, setAuctions] = useState([])`                 | `useQuery`                         |
| `queryKey: ['auctions', id]` inline                            | `auctionsQueries.detail(id)`       |
| `invalidateQueries({ queryKey: ['auctions'] })` after a create | Invalidate `lists()`               |
| Checking `error.message === 'Not found'`                       | Check `error.code`                 |
| Rendering `data.map` with no loading state                     | Handle all three states            |
| `useEffect` + `fetch`                                          | `useQuery`                         |
