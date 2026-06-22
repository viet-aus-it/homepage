import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderHomeRoute } from '@/test-utils/render-home-route';

describe('Index Route', () => {
  it('should render the HomePage component', async () => {
    await renderHomeRoute();
    expect(screen.getByRole('heading', { level: 1, name: /Community\./i })).toBeInTheDocument();
  });
});
