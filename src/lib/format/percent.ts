export const formatSignedPercent = (value: number): string => {
  if (!Number.isFinite(value)) return '—';
  return `${value < 0 ? '−' : '+'}${Math.abs(value).toFixed(2)}%`;
};
