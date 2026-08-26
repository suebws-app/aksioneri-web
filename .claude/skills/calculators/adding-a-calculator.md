---
name: adding-a-calculator
description: Use this skill when adding a new financial calculator, changing an existing one's inputs or results, or touching anything under src/features/calculators
type: skill
---

# Adding a Calculator

## When to Use

- Adding a calculator to `/calculators`
- Changing a calculator's inputs, results, chart or copy
- Editing anything in `src/features/calculators/`

## The shape of it

A calculator is **one registry entry**, not a page. The route, the landing
page, the sitemap, the related-calculators rail and the structured data all
read from the registry, so there is no page to write and nothing to remember
to wire up.

```
src/features/calculators/
  engine/<name>.ts          pure maths — no React, no zod, no `@/`
  definitions/<name>.ts     the contract: fields, defaults, result, chart
  registry.ts               one line
  ../../messages/sq.json    the copy
  __tests__/<name>.test.ts  the maths, with known-answer vectors
```

## Six steps

1. **Write the engine function** in `engine/<name>.ts`. It takes a typed input
   and returns `Outcome<TResult>` — never a bare number, never `NaN`.
2. **Write the definition** in `definitions/<name>.ts`. Declare `fields` with
   their bounds; `createUrlCodec(fields)` gives you the query-string codec for
   free.
3. **Register it**: add the import and one line to `REGISTRY` in `registry.ts`,
   and add the slug to `CalculatorSlug` in `types.ts`.
4. **Write the copy** under `calculators.<messageKey>` in `messages/sq.json`.
   See the key rules below.
5. **Write the tests** in `__tests__/<name>.test.ts` — known-answer vectors
   plus every refusal branch.
6. **Verify**: `pnpm ts-check && pnpm lint:check && pnpm i18n:check && pnpm
seo:audit-meta && pnpm test && pnpm build`.

The registry meta-test (`__tests__/registry.test.ts`) then checks the rest for
you: that every message key exists, that the defaults parse and compute, that
`faqCount` matches the catalogue, that related slugs resolve.

## Engine purity is enforced

`eslint.config.mjs` bans every import outside `engine/` from engine files —
no `@/`, no React, no Next, no next-intl, no zod, no `../`. The engine must
stay liftable into the API, a package or a mobile app without a rewrite, and
that is a property of its dependencies rather than its folder.

Validation messages, formatting and fetching all belong to the layer above.

## Refuse, never approximate

Every engine function returns `Outcome<T>`:

```ts
if (!allFinite(a, b)) return refuse('nonFinite');
if (principal < 0) return refuse('negativeAmount');
return ok(result);
```

The reasons in `engine/types.ts` each map to a translated sentence under
`calculators.refusals`. Adding a reason means adding that sentence in the same
commit — the meta-test checks it — or a reader sees a raw key at exactly the
moment something went wrong.

## Money precision

- Rates and growth factors are plain doubles. The error over 720 periods is
  ~1e-13, nine orders below the uncertainty in the rate the reader typed.
- **Anything that must sum runs in integer cents** (`toCents`/`fromCents`).
  An amortisation schedule's principal column has to add up to the principal
  exactly, because a reader will add it up.
- `roundMoney` at boundaries only — never inside a loop whose output feeds the
  next iteration.
- No `decimal.js`. The misleading-result risk is bad inputs, not the 16th
  significant digit.

## Message key rules

**`pnpm seo:audit-meta` checks any leaf named exactly `title` or
`description`** — the regexes are anchored (`/^(meta|default)?[Tt]itle$/`) —
and enforces title ≤ 60 chars and description **70–160**. That 70 _minimum_ is
the trap: a natural Albanian one-liner lands at ~55 and fails the build.

So only `metaTitle` and `metaDescription` may carry those names. Use
`heading`, `intro`, `cardBlurb`, `chart.heading` for everything else.

Aim for a `metaTitle` under about 48 characters: the layout appends
`" | Aksioneri"`, and the audit only measures the bare string.

**`pnpm i18n:check` cannot help you here.** It diffs locales against a
reference, and with only `sq` shipped it compares the file to itself and
always passes. The registry meta-test is the real gate.

Albanian is **Kosovar** — see `i18n/kosovo-albanian-translation.md`.

## URLs are public API

`field.param` is what appears in the query string, and shared links live
forever in articles and messages. Changing one breaks every link already out
there. `?initial=10000&monthly=500&rate=7&years=20` is the shape to aim for —
readable in a sentence.

`decode` never throws and never invents: an unusable value falls back to that
field's default, so one mangled parameter costs one field rather than the
page.

## Server first

The page is server-rendered and the island is the only client component. A
shared link must show its answer **with JavaScript disabled** — that is what
makes these pages indexable and what the e2e spec asserts. Never move the
result computation into an effect.

Only serialisable props cross into the island: it takes a **slug**, not a
definition, because a definition holds functions and RSC cannot serialise
those. (This one throws at render time if you get it wrong.)

## Charts

`ChartSpec` declares only the kinds that have a renderer. Adding `donut` or
`bars` means writing the renderer in the same commit — a variant without one
either breaks the exhaustive switch or silently draws nothing.

Every chart ships three things beside the picture: a summary sentence for
screen readers (`charts/summary.ts`), a legend carrying **dash patterns as
well as colour**, and the numbers as a data table. Colour is never the only
signal. No animation.

## Market data

A calculator declares what it needs with `marketData`. The route fetches it and
puts it in the compute context; the engine reads it from there and **refuses**
(`noData`) when it is absent. Never fetch inside an engine function, and never
fall back to a hardcoded rate.

Data comes from `aksioneri-api`'s `/rates` endpoints, which serve from our own
tables — the ECB, Eurostat and NY Fed syncs fill them on a cron. Anything using
live data must render `<DataSource />`: a reference rate without its date is
not a fact, and the ECB fixes once per business day.

When a figure is denominated in something other than the page's currency, set
`currency` on the `ResultFigure`. The converter's result is in its target
currency; labelling it with the toggle's symbol is the wrong number.

## Article embeds

`newsPhrases` is scored against an article's text at render time to decide
which calculator it offers. Two rules:

- **Include English as well as Albanian.** The wire arrives in English and is
  only translated when the OpenAI worker runs. `matchNews.ts` documents the
  same discovery: matching Albanian terms against the wire "found nothing at
  all".
- **Never store the match on the article.** Nine lessons once carried stored
  article slugs and every one was dead, because the wire regenerates slugs
  hourly.

`embeddableIn` gates which desks a calculator may appear on. Keep it tight — a
crypto story mentioning "interest rate" should not surface a mortgage
calculator.

## Analytics

`useCalculatorView` and `reportCalculatorEvent` send a slug and an event name
by `sendBeacon`. **Never add a field.** The API schema is `.strict()` and will
reject a payload carrying anything else, which is the point: the reader's
inputs are their salary, mortgage and pension, and they do not leave the
browser.

## Related

- `ui/component-conventions.md` — server/client split, prop typing
- `ui/tailwind-design-system.md` — tokens, `cva`, focus states
- `i18n/no-hardcoded-text.md` — every string is a key first
- `seo/structured-data.md` — JSON-LD must describe what the page renders
