import { Button } from '@/components/ui/button';
import { DiscordLogo } from '@/components/ui/icons';
import Logo from '@/components/ui/logo';
import { ORGANISATION } from '@/lib/constants';
import { Separator } from '../separator';
import NavMenu from './nav-menu';
import NavSheet from './nav-sheet';

/**
 * NavBar provides a consistent, accessible navigation experience across all screen sizes, reinforcing brand identity and supporting key user actions.
 *
 * Design rationale:
 * - On desktop, navigation links are always visible for quick access and orientation.
 * - On mobile (limited width), navigation is moved into a sheet (slide-out panel) to maximise screen real estate and reduce clutter, while still providing full access to site sections.
 * - The sheet approach ensures a modern, touch-friendly experience and avoids overwhelming users with too many visible options on small screens.
 * - The Discord button is always accessible, supporting community engagement as a primary action.
 *
 * The layout and structure are optimised for clarity, responsiveness, and a seamless transition between device sizes.
 */
function NavBar() {
  return (
    <nav className="fixed z-10 top-6 inset-x-4 h-14 bg-background border dark:border-slate-700/70 max-w-screen-lg mx-auto rounded-full">
      <div className="h-full flex items-center justify-between mx-auto px-3">
        <Logo className="h-6 w-auto" />

        <div className="flex items-center gap-3 h-3/5">
          {/* Desktop Menu */}
          <NavMenu className="hidden md:block" />
          <Separator orientation="vertical" className="h-5" />
          <Button variant="outline" className="rounded-full shadow-none" size="icon">
            <a href={ORGANISATION.DISCORD_URL} target="_blank" rel="noopener noreferrer" aria-label="Join our Discord server">
              <DiscordLogo className="h-5! w-5!" />
            </a>
          </Button>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavSheet />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
