import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ORGANISATION } from '@/lib/constants';

import HomeV2Page from './index';

describe('HomeV2Page', () => {
  it('renders hero heading and Discord links', () => {
    render(<HomeV2Page />);
    expect(screen.getByRole('heading', { level: 1, name: /Community\./i })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /join discord|join the community/i }).length).toBeGreaterThan(0);
  });

  it('sets noindex robots meta', () => {
    render(<HomeV2Page />);
    expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe('noindex, nofollow');
  });

  it('links Discord CTAs correctly', () => {
    render(<HomeV2Page />);
    for (const link of screen.getAllByRole('link', { name: /discord|join the community/i })) {
      expect(link).toHaveAttribute('href', ORGANISATION.DISCORD_URL);
    }
  });
});
