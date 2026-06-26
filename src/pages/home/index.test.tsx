import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ACNC, ORGANISATION } from '@/lib/constants';
import { FOOTER_FOLLOW, getEnabledNavLinks, HOME_PATH } from '@/lib/site-nav';
import { renderHomeRoute } from '@/test-utils/render-home-route';

describe('HomePage', () => {
  it('renders hero heading and Discord links', async () => {
    await renderHomeRoute();
    expect(screen.getByRole('heading', { level: 1, name: /Community\./i })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /join discord|join the community/i }).length).toBeGreaterThan(0);
  });

  it('links Discord CTAs correctly', async () => {
    await renderHomeRoute();
    for (const link of screen.getAllByRole('link', { name: /discord|join the community/i })) {
      expect(link).toHaveAttribute('href', ORGANISATION.DISCORD_URL);
    }
  });

  it('links Community nav to the community page and Events to in-page sections', async () => {
    await renderHomeRoute();

    expect(screen.getAllByRole('link', { name: 'Community' })[0]).toHaveAttribute('href', '/community');
    expect(screen.getAllByRole('link', { name: 'Events' })[0]).toHaveAttribute('href', '/#events-preview');
  });

  it('links the community reach section to the full community page', async () => {
    await renderHomeRoute();

    expect(screen.getByRole('link', { name: /See the whole map/i })).toHaveAttribute('href', '/community');
  });

  it('does not render redundant in-section events links', async () => {
    await renderHomeRoute();

    expect(screen.queryByRole('link', { name: /All events/i })).not.toBeInTheDocument();
  });

  it('links Follow column social profiles', async () => {
    await renderHomeRoute();

    for (const { label, href } of getEnabledNavLinks(FOOTER_FOLLOW, HOME_PATH)) {
      expect(screen.getByRole('link', { name: label })).toHaveAttribute('href', href);
    }
  });

  it('renders the ACNC registered charity tick with required link and alt text', async () => {
    await renderHomeRoute();

    const acncLink = screen.getByRole('link', { name: ACNC.LOGO_ALT });
    expect(acncLink).toHaveAttribute('href', ACNC.CHARITY_REGISTER_URL);
    expect(acncLink).toHaveAttribute('target', '_blank');
    expect(acncLink).toHaveAttribute('title', ACNC.LOGO_TITLE);
    expect(screen.getByRole('img', { name: ACNC.LOGO_ALT })).toHaveAttribute('src', ACNC.LOGO_SRC);
  });

  it('renders event preview cards with marketing images', async () => {
    await renderHomeRoute();

    expect(screen.getByRole('heading', { level: 3, name: 'VAIT Winter Warm-Up BBQ' })).toBeInTheDocument();
    expect(screen.getByText('Hosted by Luan Nguyen')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /climbing session in Brunswick/i })).toHaveAttribute('src', '/images/northern-climbing.webp');
    expect(screen.getAllByRole('img', { name: /Albert Park BBQ/i }).every((img) => img.getAttribute('src') === '/images/bbq-albert-park.webp')).toBe(true);
  });

  it('provides a skip to content link', async () => {
    await renderHomeRoute();

    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute('href', '#main-content');
    expect(document.getElementById('main-content')).toBeInTheDocument();
  });
});
