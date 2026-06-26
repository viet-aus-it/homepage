import { Link, useRouterState } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import DiscordCtaLink from '@/components/ui/discord-cta-link';
import Logo from '@/components/ui/logo';
import type { SiteNavItem, SiteNavLink } from '@/lib/site-nav';
import { getEnabledNavLinks, HOME_PATH, isNavLinkActive, PRIMARY_NAV } from '@/lib/site-nav';
import { cn } from '@/lib/utils';

const NAV_SCROLL_THRESHOLD_PX = 24;
const MOBILE_MENU_ID = 'site-mobile-menu';

export type SiteNavVariant = 'landing' | 'inner';

interface SiteNavProps {
  variant?: SiteNavVariant;
  /** Base path for hash links (typically `/`). */
  homePath?: string;
  /** Route path used for active link styling (defaults to current pathname). */
  activePath?: string;
  /** Nav configuration (defaults to {@link PRIMARY_NAV}). */
  navItems?: readonly SiteNavItem[];
}

interface NavLinkItemProps {
  item: SiteNavLink;
  homePath: string;
  isActive: boolean;
  variant: SiteNavVariant;
  className: string;
  onNavigate?: () => void;
}

function isNavItemActive(item: SiteNavLink, activePath: string): boolean {
  return isNavLinkActive(item, activePath);
}

function navLinkClassName(variant: SiteNavVariant, isActive: boolean, baseClassName: string): string {
  if (variant === 'inner') {
    return cn(
      baseClassName,
      'border-b-2 pb-0.5 transition-colors',
      isActive ? 'border-brand-yellow font-bold text-white' : 'border-transparent text-brand-nav-muted hover:text-white'
    );
  }

  return cn(baseClassName, 'transition-colors hover:text-white', isActive && 'font-bold text-white');
}

function NavLinkItem({ item, homePath, isActive, variant, className, onNavigate }: NavLinkItemProps) {
  const linkClassName = navLinkClassName(variant, isActive, className);

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={linkClassName} onClick={onNavigate}>
        {item.label}
      </a>
    );
  }

  if (item.hash) {
    return (
      <Link to={homePath} hash={item.hash.slice(1)} className={linkClassName} onClick={onNavigate}>
        {item.label}
      </Link>
    );
  }

  return (
    <Link to={item.href} className={linkClassName} onClick={onNavigate}>
      {item.label}
    </Link>
  );
}

/**
 * Shared site navigation — landing (fixed over hero) or inner (sticky dark frosted bar).
 */
function SiteNav({ variant = 'landing', homePath = HOME_PATH, activePath, navItems = PRIMARY_NAV }: SiteNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navLinks = getEnabledNavLinks(navItems, homePath);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const resolvedActivePath = activePath ?? pathname;
  const isLanding = variant === 'landing';

  useEffect(() => {
    if (!isLanding) {
      return undefined;
    }

    const onScroll = () => setScrolled(window.scrollY > NAV_SCROLL_THRESHOLD_PX);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isLanding]);

  return (
    <header
      className={cn(
        'inset-x-0 top-0 z-50 min-h-home-nav w-full',
        isLanding
          ? cn('fixed transition-colors duration-200', scrolled ? 'border-b border-white/8 bg-brand-near-black' : 'border-b border-transparent bg-transparent')
          : 'sticky border-b border-white/8 bg-brand-near-black/92 backdrop-blur-md'
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-12" aria-label="Primary">
        <Link to={homePath} className="flex items-center gap-2.5">
          <Logo className="h-8 w-auto" colour="colour" aria-hidden />
          <span className="font-display text-xl font-semibold tracking-tight text-white">VAIT</span>
        </Link>

        <div className="hidden items-center gap-9 text-[15px] font-medium text-brand-nav-muted md:flex">
          {navLinks.map((item) => (
            <NavLinkItem key={item.label} item={item} homePath={homePath} variant={variant} isActive={isNavItemActive(item, resolvedActivePath)} className="" />
          ))}
          <DiscordCtaLink variant="outlined" size="md">
            Join Discord
          </DiscordCtaLink>
        </div>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-xl border border-white/15 bg-white/8 md:hidden"
          aria-expanded={menuOpen}
          aria-controls={MOBILE_MENU_ID}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X className="size-6 text-white" aria-hidden /> : <Menu className="size-6 text-white" aria-hidden />}
        </button>
      </nav>

      <div
        id={MOBILE_MENU_ID}
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
                variant={variant}
                isActive={isNavItemActive(item, resolvedActivePath)}
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

export default SiteNav;
