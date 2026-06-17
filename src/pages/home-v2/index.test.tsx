import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ORGANISATION } from '@/lib/constants';
import { renderHomeV2Route } from '@/test-utils/render-home-v2-route';

describe('HomeV2Page', () => {
  it('renders hero heading and Discord links', async () => {
    await renderHomeV2Route();
    expect(screen.getByRole('heading', { level: 1, name: /Community\./i })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /join discord|join the community/i }).length).toBeGreaterThan(0);
  });

  it('sets noindex robots meta', async () => {
    await renderHomeV2Route();
    expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe('noindex, nofollow');
  });

  it('restores robots meta on unmount when tag pre-exists', async () => {
    const existingRobots = document.createElement('meta');
    existingRobots.setAttribute('name', 'robots');
    existingRobots.setAttribute('content', 'index, follow');
    document.head.appendChild(existingRobots);

    const view = await renderHomeV2Route();
    expect(existingRobots.getAttribute('content')).toBe('noindex, nofollow');

    view.unmount();
    expect(existingRobots.getAttribute('content')).toBe('index, follow');

    existingRobots.remove();
  });

  it('links Discord CTAs correctly', async () => {
    await renderHomeV2Route();
    for (const link of screen.getAllByRole('link', { name: /discord|join the community/i })) {
      expect(link).toHaveAttribute('href', ORGANISATION.DISCORD_URL);
    }
  });

  it('links Community and Events nav to in-page sections', async () => {
    await renderHomeV2Route();

    expect(screen.getAllByRole('link', { name: 'Community' })[0]).toHaveAttribute('href', '/v2#community-reach');
    expect(screen.getAllByRole('link', { name: 'Events' })[0]).toHaveAttribute('href', '/v2#events-preview');
  });

  it('does not render redundant in-section map or events links', async () => {
    await renderHomeV2Route();

    expect(screen.queryByRole('link', { name: /See the whole map/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /All events/i })).not.toBeInTheDocument();
  });

  it('links Follow column social profiles', async () => {
    await renderHomeV2Route();

    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', 'https://www.linkedin.com/company/vietausit/about/');
    expect(screen.getByRole('link', { name: 'Facebook' })).toHaveAttribute('href', 'https://www.facebook.com/vietausit');
  });

  it('provides a skip to content link', async () => {
    await renderHomeV2Route();

    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute('href', '#main-content');
    expect(document.getElementById('main-content')).toBeInTheDocument();
  });
});
