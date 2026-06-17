import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { DiscordLogo } from '@/components/ui/icons';
import Logo from '@/components/ui/logo';
import { ORGANISATION } from '@/lib/constants';
import { getEnabledNavLinks, HOME_PATH, PRIMARY_NAV } from '@/lib/site-nav';
import { cn } from '@/lib/utils';

interface LandingNavProps {
  /** Base path for hash links (`/v2` during staging, `/` after promotion). */
  homePath?: string;
}

/**
 * Fixed landing nav — overlays the hero with a transparent bar, solid dark background when scrolled.
 */
function LandingNav({ homePath = HOME_PATH }: LandingNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navLinks = getEnabledNavLinks(PRIMARY_NAV, homePath);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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
        <a href={homePath} className="flex items-center gap-2.5">
          <Logo className="h-8 w-auto" colour="colour" aria-hidden />
          <span className="font-display text-xl font-semibold tracking-tight text-white">VAIT</span>
        </a>

        <div className="hidden items-center gap-9 text-[15px] font-medium text-[#cfcfcf] md:flex">
          {navLinks.map((item) => (
            <a key={item.label} href={item.href} className="transition-colors hover:text-white">
              {item.label}
            </a>
          ))}
          <a
            href={ORGANISATION.DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brand-yellow px-5 py-2.5 font-bold text-brand-near-black transition hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(245,197,24,0.3)]"
          >
            <DiscordLogo className="size-[18px]!" aria-hidden />
            Join Discord
          </a>
        </div>

        <button
          type="button"
          className={cn(
            'inline-flex size-11 items-center justify-center rounded-xl border md:hidden',
            scrolled ? 'border-white/15 bg-white/8' : 'border-white/15 bg-white/8'
          )}
          aria-expanded={menuOpen}
          aria-controls="landing-mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X className="size-6 text-white" aria-hidden /> : <Menu className="size-6 text-white" aria-hidden />}
        </button>
      </nav>

      <div id="landing-mobile-menu" className={cn('border-t border-white/8 bg-brand-near-black px-5 pb-7 md:hidden', menuOpen ? 'block' : 'hidden')}>
        {navLinks.length > 0 && (
          <div className="flex flex-col gap-0 text-[17px] font-semibold text-[#e6e6e6]">
            {navLinks.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className={cn('py-3.5', index < navLinks.length - 1 && 'border-b border-white/7')}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
        <a
          href={ORGANISATION.DISCORD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center justify-center gap-2 rounded-full bg-brand-yellow px-5 py-4 text-base font-bold text-brand-near-black"
        >
          <DiscordLogo className="size-5!" aria-hidden />
          Join Discord
        </a>
      </div>
    </header>
  );
}

export default LandingNav;
