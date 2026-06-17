import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import HomeV2Page from '../pages/home-v2';

describe('Index Route', () => {
  it('renders the redesigned landing page hero', () => {
    render(<HomeV2Page />);
    expect(screen.getByRole('heading', { level: 1, name: /Community\./i })).toBeInTheDocument();
  });
});
