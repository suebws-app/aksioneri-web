/**
 * URL builder for embedded TradingView widgets.
 *
 * TradingView's documented embed is a `<script>` tag carrying JSON in its body
 * that replaces itself with an iframe. It locates itself through
 * `document.currentScript`, which is `null` for any script a framework
 * injects — so under React the loader throws and renders nothing.
 *
 * The iframe URL below is the one that loader builds, assembled directly:
 * `locale` in the query string, every other setting in the hash as
 * URI-encoded JSON. That is TradingView's own contract, read out of the loader
 * source (`propertiesToSkipInHash`). Building it here needs no client
 * JavaScript, so widgets stay server components.
 *
 * **Never pass `width: '100%'` in the settings.** The widget renders as a
 * blank frame with no error of any kind. Size the iframe element instead, and
 * use `autosize` where a widget supports it.
 */

const WIDGET_ORIGIN = 'https://www.tradingview-widget.com';

/**
 * Locales TradingView actually ships. Albanian is not among them, so `sq`
 * readers get the English widget — an unsupported code makes it fail to
 * render at all, which is worse than an English label over a number.
 */
const WIDGET_LOCALES = new Set(['en']);

export function tradingViewWidgetUrl(
  widgetId: string,
  settings: Record<string, unknown>,
  locale: string,
): string {
  const url = new URL(`${WIDGET_ORIGIN}/embed-widget/${widgetId}/`);

  url.searchParams.set('locale', WIDGET_LOCALES.has(locale) ? locale : 'en');
  url.hash = encodeURIComponent(JSON.stringify(settings));

  return url.toString();
}

/**
 * TradingView symbols for the instruments the site tracks.
 *
 * These are the freely-quoted feeds — the exchange-native tickers (`SP:SPX`,
 * `DJ:DJI`) need a paid data subscription and render as an error without one.
 */
export const TV_SYMBOLS = {
  'sp-500': 'FOREXCOM:SPXUSD',
  'nasdaq-100': 'FOREXCOM:NSXUSD',
  'dow-jones': 'FOREXCOM:DJI',
  'stoxx-600': 'FOREXCOM:EUSIDX',
  bitcoin: 'BITSTAMP:BTCUSD',
  gold: 'TVC:GOLD',
  'eur-usd': 'FX:EURUSD',
} as const;

export type TrackedSymbol = keyof typeof TV_SYMBOLS;
