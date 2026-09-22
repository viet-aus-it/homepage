import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { COMMUNITY_PAGE_META } from '@/lib/community-content';
import { ORGANISATION } from '@/lib/constants';
import { renderCommunityRoute } from '@/test-utils/render-community-route';

describe('CommunityPage', () => {
  it('renders key section headings from the merged prototype', async () => {
    await renderCommunityRoute();

    expect(screen.getByRole('heading', { level: 1, name: /It started as a group chat/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /More than a group chat/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /1,448 of us/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Group chat to grassroots org/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Three rings of belonging/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /The board & the crew/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Hold us to it/i })).toBeInTheDocument();
  });

  it('sets page title and meta description', async () => {
    await renderCommunityRoute();

    expect(document.title).toBe(COMMUNITY_PAGE_META.title);
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute('content', COMMUNITY_PAGE_META.description);
  });

  it('highlights Community in the inner nav', async () => {
    await renderCommunityRoute();

    const communityLinks = screen.getAllByRole('link', { name: 'Community' });
    expect(communityLinks[0]).toHaveClass('border-brand-yellow');
  });

  it('links Meet the team to the in-page anchor', async () => {
    await renderCommunityRoute();

    expect(screen.getByRole('link', { name: /Meet the team/i })).toHaveAttribute('href', '#team');
    expect(document.getElementById('team')).toBeInTheDocument();
  });

  it('links Discord CTA to the organisation URL', async () => {
    await renderCommunityRoute();

    for (const link of screen.getAllByRole('link', { name: /join the community|join discord|join our discord/i })) {
      expect(link).toHaveAttribute('href', ORGANISATION.DISCORD_URL);
    }
  });

  it('does not render a Become a member CTA', async () => {
    await renderCommunityRoute();

    expect(screen.queryByRole('link', { name: /Become a member/i })).not.toBeInTheDocument();
  });
});
