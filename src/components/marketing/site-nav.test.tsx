import { createMemoryHistory, createRootRoute, createRouter, RouterProvider } from '@tanstack/react-router';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import SiteNav from '@/components/marketing/site-nav';
import type { SiteNavItem } from '@/lib/site-nav';

async function renderSiteNav(
  options: {
    variant?: 'landing' | 'inner';
    activePath?: string;
    navItems?: readonly SiteNavItem[];
  } = {}
) {
  const { variant = 'landing', activePath, navItems } = options;
  const rootRoute = createRootRoute({
    component: () => <SiteNav variant={variant} activePath={activePath} navItems={navItems} />,
  });
  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory({ initialEntries: ['/'] }),
  });

  await router.load();

  return render(<RouterProvider router={router} />);
}

describe('SiteNav', () => {
  it('renders landing variant with fixed positioning', async () => {
    const { container } = await renderSiteNav({ variant: 'landing' });

    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument();
    expect(container.querySelector('header')).toHaveClass('fixed');
  });

  it('renders inner variant with sticky frosted bar', async () => {
    const { container } = await renderSiteNav({ variant: 'inner' });

    expect(container.querySelector('header')).toHaveClass('sticky', 'backdrop-blur-md');
  });

  it('highlights the active route on inner pages', async () => {
    await renderSiteNav({
      variant: 'inner',
      activePath: '/community',
      navItems: [{ label: 'Community', to: '/community', enabled: true }],
    });

    const communityLink = screen.getByRole('link', { name: 'Community' });
    expect(communityLink).toHaveClass('border-brand-yellow', 'font-bold');
  });

  it('hides the mobile menu from assistive tech when closed', async () => {
    await renderSiteNav({ variant: 'landing' });

    expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
    expect(document.getElementById('site-mobile-menu')).toHaveAttribute('aria-hidden', 'true');
  });

  it('exposes the mobile menu when opened and closes via the menu button', async () => {
    const user = userEvent.setup();
    await renderSiteNav({ variant: 'landing' });

    await user.click(screen.getByLabelText('Open menu'));

    const mobileMenu = document.getElementById('site-mobile-menu');
    expect(mobileMenu).toHaveAttribute('aria-hidden', 'false');

    await user.click(screen.getByLabelText('Close menu'));
    expect(mobileMenu).toHaveAttribute('aria-hidden', 'true');
  });
});
