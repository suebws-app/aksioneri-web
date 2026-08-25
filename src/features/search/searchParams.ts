/**
 * The query string key, in one place: the form input is named after it and the
 * page reads it back. Two literals would drift apart the moment either moved.
 */
export const QUERY_PARAM = 'q';

/** Longest query accepted, so a pasted essay cannot become a scan of the index. */
const MAX_QUERY_LENGTH = 80;

/**
 * Read the query out of `searchParams`.
 *
 * A repeated parameter (`?q=a&q=b`) arrives as an array — take the first, the
 * same way the news page treats its category filter.
 */
export const readQuery = (
  searchParams: Record<string, string | string[] | undefined>,
): string => {
  const raw = searchParams[QUERY_PARAM];
  const value = Array.isArray(raw) ? raw[0] : raw;
  return (value ?? '').trim().slice(0, MAX_QUERY_LENGTH);
};
