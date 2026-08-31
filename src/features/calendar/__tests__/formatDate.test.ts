import { describe, expect, it } from 'vitest';
import { formatTimestamp } from '../formatDate';

describe('formatTimestamp', () => {
  it('formats a valid ISO timestamp for English', () => {
    expect(formatTimestamp('en', '2026-09-01T12:30:00Z')).toContain('2026');
  });

  it('formats a valid ISO timestamp for Albanian', () => {
    expect(formatTimestamp('sq', '2026-09-01T12:30:00Z')).toContain('2026');
  });

  it('returns an empty string instead of throwing for an invalid date', () => {
    expect(formatTimestamp('en', '2026-08-31T—:00Z')).toBe('');
    expect(formatTimestamp('sq', '')).toBe('');
  });
});
