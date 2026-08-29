import { describe, expect, it, vi } from 'vitest';
import { createIndexLoader } from '../indexCache';
import type { SearchEntry } from '../searchTypes';

const entries: SearchEntry[] = [
  { kind: 'lesson', title: 'Obligacionet', href: '/learn/bonds' },
];

describe('createIndexLoader', () => {
  it('fetches once and serves the same index afterwards', async () => {
    const fetchIndex = vi.fn().mockResolvedValue(entries);
    const loader = createIndexLoader(fetchIndex);

    await expect(loader.load()).resolves.toEqual(entries);
    await expect(loader.load()).resolves.toEqual(entries);
    expect(fetchIndex).toHaveBeenCalledTimes(1);
  });

  it('shares one request between callers that overlap', async () => {
    const fetchIndex = vi.fn().mockResolvedValue(entries);
    const loader = createIndexLoader(fetchIndex);

    await Promise.all([loader.load(), loader.load(), loader.load()]);

    expect(fetchIndex).toHaveBeenCalledTimes(1);
  });

  it('retries after a failure instead of caching the rejection', async () => {
    const fetchIndex = vi
      .fn()
      .mockRejectedValueOnce(new Error('offline'))
      .mockResolvedValue(entries);
    const loader = createIndexLoader(fetchIndex);

    await expect(loader.load()).rejects.toThrow('offline');
    await expect(loader.load()).resolves.toEqual(entries);
    expect(fetchIndex).toHaveBeenCalledTimes(2);
  });

  it('reports nothing loaded until a load succeeds', async () => {
    const fetchIndex = vi.fn().mockRejectedValueOnce(new Error('offline'));
    const loader = createIndexLoader(fetchIndex);

    expect(loader.peek()).toBeNull();
    await expect(loader.load()).rejects.toThrow('offline');
    expect(loader.peek()).toBeNull();
  });
});
