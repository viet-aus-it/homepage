import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { renderHomeV2Route } from '@/test-utils/render-home-v2-route';

describe('LandingNav', () => {
  it('hides the mobile menu from assistive tech when closed', async () => {
    await renderHomeV2Route();

    expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument();
    expect(document.getElementById('landing-mobile-menu')).toHaveAttribute('aria-hidden', 'true');
  });

  it('exposes the mobile menu when opened and closes via the menu button', async () => {
    const user = userEvent.setup();
    await renderHomeV2Route();

    await user.click(screen.getByLabelText('Open menu'));

    const mobileMenu = document.getElementById('landing-mobile-menu');
    expect(mobileMenu).toHaveAttribute('aria-hidden', 'false');

    await user.click(screen.getByLabelText('Close menu'));
    expect(mobileMenu).toHaveAttribute('aria-hidden', 'true');
  });
});
