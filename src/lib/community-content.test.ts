import { describe, expect, it } from 'vitest';

import { reachBarWidthPercent } from '@/lib/community-content';

/**
 * reachBarWidthPercent drives bar *length* in the ranked reach chart (CSS width relative to the
 * largest region). It does not express each region's percentage of total VAIT membership — that
 * would need total headcount in the denominator; we show raw counts in the label instead.
 */
describe('reachBarWidthPercent', () => {
  it('uses 100% width for the largest region so its bar fills the track', () => {
    expect(reachBarWidthPercent(388)).toBe('100.0%');
  });

  it('scales smaller region counts relative to the max bar width, not relative to total members', () => {
    expect(reachBarWidthPercent(353)).toBe('91.0%');
    expect(reachBarWidthPercent(9)).toBe('2.3%');
  });
});
