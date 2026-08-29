import type { SearchEntry } from './searchTypes';

export const createIndexLoader = <Args extends unknown[]>(
  fetchIndex: (...args: Args) => Promise<SearchEntry[]>,
): {
  load: (...args: Args) => Promise<SearchEntry[]>;
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
