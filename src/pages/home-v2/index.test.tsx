import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ORGANISATION } from '@/lib/constants';

import HomeV2Page from './index';

describe('HomeV2Page', () => {
  it('renders hero heading and key sections', () => {
    render(<HomeV2Page />);

    expect(screen.getByRole('heading', { level: 1, name: /Community\./i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Help when you're stuck/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /In every state and territory/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Come hang out IRL/i })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /Discord channels/i })).toBeInTheDocument();
  });

  it('sets production page title and meta description', () => {
    render(<HomeV2Page />);

    expect(document.title).toBe(`${ORGANISATION.SHORT_NAME} — Community. Technology. Culture.`);
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toContain('Viet-Aussie tech');
    expect(document.querySelector('meta[name="robots"]')).toBeNull();
  });

  it('links Discord CTAs to the organisation Discord URL', () => {
    render(<HomeV2Page />);

    const discordLinks = screen.getAllByRole('link', { name: /discord|join the community/i });
    expect(discordLinks.length).toBeGreaterThan(0);
    for (const link of discordLinks) {
      expect(link).toHaveAttribute('href', ORGANISATION.DISCORD_URL);
    }
  });

  it('renders Events nav link to in-page anchor', () => {
    render(<HomeV2Page />);

    const eventsLinks = screen.getAllByRole('link', { name: 'Events' });
    expect(eventsLinks[0]).toHaveAttribute('href', '/#events-preview');
  });

  it('links community map CTA to in-page anchor', () => {
    render(<HomeV2Page />);

    expect(screen.getByRole('link', { name: /See the whole map/i })).toHaveAttribute('href', '/#community-reach');
  });

  it('shows footer legal details', () => {
    render(<HomeV2Page />);

    expect(screen.getByText(new RegExp(`ABN ${ORGANISATION.ABN}`))).toBeInTheDocument();
  });
});
