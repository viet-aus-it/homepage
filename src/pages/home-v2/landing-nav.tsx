import { Link } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import DiscordCtaLink from '@/components/ui/discord-cta-link';
import Logo from '@/components/ui/logo';
import type { SiteNavLink } from '@/lib/site-nav';
import { getEnabledNavLinks, HOME_PATH, PRIMARY_NAV } from '@/lib/site-nav';
import { cn } from '@/lib/utils';

const NAV_SCROLL_THRESHOLD_PX = 24;

interface LandingNavProps {
  /** Base path for hash links (`/v2` during staging, `/` after promotion). */
  homePath?: string;
}

interface NavLinkItemProps {
  item: SiteNavLink;
  homePath: string;
  className: string;
  onNavigate?: () => void;
}

function NavLinkItem({ item, homePath, className, onNavigate }: NavLinkItemProps) {
  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={className} onClick={onNavigate}>
        {item.label}
      </a>
    );
  }

  if (item.hash) {
    return (
      <Link to={homePath} hash={item.hash.slice(1)} className={className} onClick={onNavigate}>
        {item.label}
      </Link>
    );
  }

  return (
    <Link to={item.href} className={className} onClick={onNavigate}>
      {item.label}
    </Link>
  );
}

/**
 * Fixed landing nav — overlays the hero with a transparent bar, solid dark background when scrolled.
 */
function LandingNav({ homePath = HOME_PATH }: LandingNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navLinks = getEnabledNavLinks(PRIMARY_NAV, homePath);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > NAV_SCROLL_THRESHOLD_PX);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 min-h-landing-nav w-full transition-colors duration-200',
        scrolled ? 'border-b border-white/8 bg-brand-near-black' : 'border-b border-transparent bg-transparent'
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-12" aria-label="Primary">
        <Link to={homePath} className="flex items-center gap-2.5">
          <Logo className="h-8 w-auto" colour="colour" aria-hidden />
          <span className="font-display text-xl font-semibold tracking-tight text-white">VAIT</span>
        </Link>

        <div className="hidden items-center gap-9 text-[15px] font-medium text-brand-nav-muted md:flex">
          {navLinks.map((item) => (
            <NavLinkItem key={item.label} item={item} homePath={homePath} className="transition-colors hover:text-white" />
          ))}
          <DiscordCtaLink variant="outlined" size="md">
            Join Discord
          </DiscordCtaLink>
        </div>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-xl border border-white/15 bg-white/8 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="landing-mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X className="size-6 text-white" aria-hidden /> : <Menu className="size-6 text-white" aria-hidden />}
        </button>
      </nav>

      <div
        id="landing-mobile-menu"
        aria-hidden={!menuOpen}
        className={cn('border-t border-white/8 bg-brand-near-black px-5 pb-7 md:hidden', menuOpen ? 'block' : 'hidden')}
      >
        {navLinks.length > 0 && (
          <div className="flex flex-col gap-0 text-[17px] font-semibold text-brand-on-dark-emphasis">
            {navLinks.map((item, index) => (
              <NavLinkItem
                key={item.label}
                item={item}
                homePath={homePath}
                className={cn('block py-3.5', index < navLinks.length - 1 && 'border-b border-white/7')}
                onNavigate={() => setMenuOpen(false)}
              />
            ))}
          </div>
        )}
        <DiscordCtaLink variant="outlined" size="md" className="mt-4 w-full justify-center py-4 text-base">
          Join Discord
        </DiscordCtaLink>
      </div>
    </header>
  );
}

export default LandingNav;
