import { describe, expect, it } from 'vitest';

import { reachBarWidthPercent } from '@/lib/community-content';

describe('reachBarWidthPercent', () => {
  it('returns 100% for the largest region count', () => {
    expect(reachBarWidthPercent(388)).toBe('100.0%');
  });

  it('scales smaller regions relative to the max', () => {
    expect(reachBarWidthPercent(353)).toBe('91.0%');
    expect(reachBarWidthPercent(9)).toBe('2.3%');
  });
});
