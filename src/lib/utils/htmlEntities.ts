/**
 * Decodes numeric (`&#39;`), hex (`&#x27;`) and named (`&amp;`) HTML entities
 * in a single linear pass. Malformed or unknown entities are left alone —
 * an event name that legitimately contains `&custom;` should render as-is.
 *
 * Used at the API-mapping boundary for text that arrives from upstreams
 * (calendar names, article headlines) which may pass entity-encoded strings
 * through even when their content-type promises plain text. Cheaper than
 * pulling in a full HTML parser and safer than trusting the upstream.
 */

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  hellip: '…',
  mdash: '—',
  ndash: '–',
  laquo: '«',
  raquo: '»',
};

export function decodeHtmlEntities(input: string): string {
  return input.replace(
    /&(#x[0-9a-fA-F]+|#\d+|[a-zA-Z]+);/g,
    (match, body: string) => {
      if (body.startsWith('#x') || body.startsWith('#X')) {
        const code = parseInt(body.slice(2), 16);
        return Number.isFinite(code) ? String.fromCodePoint(code) : match;
      }
      if (body.startsWith('#')) {
        const code = parseInt(body.slice(1), 10);
        return Number.isFinite(code) ? String.fromCodePoint(code) : match;
      }
      return NAMED_ENTITIES[body] ?? match;
    },
  );
}
