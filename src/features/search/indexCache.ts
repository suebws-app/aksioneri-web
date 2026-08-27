import type { SearchEntry } from './searchTypes';

/**
 * Load-once caching for the search index, with the failure case handled.
 *
 * Split out of the component so the interesting behaviour can be tested: a
 * rejected load must leave nothing behind. Caching the in-flight promise
 * without clearing it on rejection meant one offline moment handed that same
 * rejected promise to every later open, and search stayed broken until the
 * page was reloaded.
 *
 * Deliberately module state rather than React state: the header remounts on
 * every navigation, and the index should survive that.
 */
export const createIndexLoader = <Args extends unknown[]>(
  fetchIndex: (...args: Args) => Promise<SearchEntry[]>,
): {
  /** The index, fetching it at most once per successful load. */
  load: (...args: Args) => Promise<SearchEntry[]>;
  /** What has already been loaded, for a fresh mount's initial state. */
  peek: () => SearchEntry[] | null;
} => {
  let cache: SearchEntry[] | null = null;
  let inFlight: Promise<SearchEntry[]> | null = null;

  return {
    load: (...args: Args) => {
      if (cache) return Promise.resolve(cache);

      inFlight ??= fetchIndex(...args)
        .then((entries) => {
          cache = entries;
          return entries;
        })
        .finally(() => {
          inFlight = null;
        });

      return inFlight;
    },
    peek: () => cache,
  };
};
