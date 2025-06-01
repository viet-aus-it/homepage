import { Button } from '@/components/ui/button';
import { DiscordLogo } from '@/components/ui/icons';
import Logo from '@/components/ui/logo';
import { ORGANISATION } from '@/lib/constants';
import NavMenu from './nav-menu';
import NavSheet from './nav-sheet';

function NavBar() {
  return (
    <nav className="fixed z-10 top-6 inset-x-4 h-14 bg-background border dark:border-slate-700/70 max-w-screen-lg mx-auto rounded-full">
      <div className="h-full flex items-center justify-between mx-auto px-3">
        <Logo />

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-2">
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
