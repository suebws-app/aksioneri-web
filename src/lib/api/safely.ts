import { ApiError } from './client';

const FALLBACK_STATUS = new Set([404, 502, 503, 504]);

export async function safely<T>(
  work: () => Promise<T>,
  fallback: T,
  scope: string,
): Promise<T> {
  try {
    return await work();
  } catch (error) {
    if (error instanceof ApiError && FALLBACK_STATUS.has(error.status)) {
      if (error.status !== 404) {
        console.warn(
          `[${scope}] upstream degraded (${error.status} ${error.code}): ${error.message}`,
        );
      }
      return fallback;
    }
    console.error(`[${scope}] request failed:`, error);
    throw error;
  }
}
