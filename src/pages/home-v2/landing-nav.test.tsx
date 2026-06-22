import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { renderHomeRoute } from '@/test-utils/render-home-route';

describe('LandingNav', () => {
  it('hides the mobile menu from assistive tech when closed', async () => {
    await renderHomeRoute();

    expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument();
    expect(document.getElementById('landing-mobile-menu')).toHaveAttribute('aria-hidden', 'true');
  });

  it('exposes the mobile menu when opened and closes via the menu button', async () => {
    const user = userEvent.setup();
    await renderHomeRoute();

    await user.click(screen.getByLabelText('Open menu'));

    const mobileMenu = document.getElementById('landing-mobile-menu');
    expect(mobileMenu).toHaveAttribute('aria-hidden', 'false');

    await user.click(screen.getByLabelText('Close menu'));
    expect(mobileMenu).toHaveAttribute('aria-hidden', 'true');
  });
});
