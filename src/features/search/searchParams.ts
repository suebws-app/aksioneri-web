export const QUERY_PARAM = 'q';

const MAX_QUERY_LENGTH = 80;

export const readQuery = (
  searchParams: Record<string, string | string[] | undefined>,
): string => {
  const raw = searchParams[QUERY_PARAM];
  const value = Array.isArray(raw) ? raw[0] : raw;
  return (value ?? '').trim().slice(0, MAX_QUERY_LENGTH);
};
