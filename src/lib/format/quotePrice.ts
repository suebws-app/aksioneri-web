/**
 * Formatting for live market-quote ticks.
 *
 * A quote's `price` arrives from `aksioneri-api` **already formatted**:
 * `formatPrice` in `markets.symbols.ts` renders it with
 * `Intl.NumberFormat('en-US')`, per-instrument fraction digits
 * (`pricePrecision`: 2 for indices, 0 for Bitcoin, 4 for FX pairs) and
 * per-instrument grouping. That string is what the server components render,
 * so it is exactly what the reader sees on first paint.
 *
 * WebSocket ticks carry a raw number instead, and with `quotesQuery`
 * configured sockets-only (`refetchInterval: false`, `staleTime: Infinity`)
 * there is **no REST refresh coming to correct a mismatched reformat** —
 * whatever this module produces is what stays on screen. So a tick is
 * reformatted to match the SSR string precisely: the same locale convention
 * the API's formatter uses, with fraction digits and grouping inferred from
 * the SSR string itself. A tick then updates the digits without visibly
 * rewriting the number's shape.
 *
 * Deliberately NOT `formattingLocales['sq']` and not `lib/format/money`:
 * those govern figures this app formats for itself. Here the source of truth
 * is the API's en-US-convention string — reformatting "6,421.20" into
 * "6.421,20" one tick after hydration would visibly rewrite every price and
 * break the numeric comparison in `usePriceFlash`, which strips `,` as a
 * group separator. If the API's convention ever changes, it changes in
 * `formatPrice` first and this mirror follows it via the inference below.
 */

export interface QuotePrecision {
  /** Fraction digits, min and max alike — the API pins both to the same value. */
  digits: number;
  /** Whether the instrument uses thousands separators (FX pairs do not). */
  grouping: boolean;
}

/**
 * Reads an instrument's display precision off its SSR-formatted price.
 *
 * Mirrors the API's `pricePrecision` without a per-symbol table on the
 * client: a string with no decimal point was formatted with **zero**
 * fraction digits (Bitcoin), not two — falling back to 2 here would make
 * the first tick rewrite "67,890" as "67,890.25".
 */
export function quotePrecisionOf(formatted: string): QuotePrecision {
  const dot = formatted.indexOf('.');
  return {
    digits: dot === -1 ? 0 : formatted.length - dot - 1,
    grouping: formatted.includes(','),
  };
}

/**
 * A raw tick value in the exact shape of the API's `formatPrice` output.
 * 'en-US' is not a locale choice for the reader — it reproduces the
 * convention the SSR string already carries (see module comment).
 */
export function formatQuotePrice(
  value: number,
  precision: QuotePrecision,
): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: precision.digits,
    maximumFractionDigits: precision.digits,
    useGrouping: precision.grouping,
  }).format(value);
}
