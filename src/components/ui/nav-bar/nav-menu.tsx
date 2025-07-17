import type { NavigationMenuProps } from '@radix-ui/react-navigation-menu';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

interface NavMenuItemProps {
  title: string;
  href: string;
}

function NavMenuItem({ title, href }: NavMenuItemProps) {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <a href={href}>{title}</a>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

function NavMenu({ className, ...props }: NavigationMenuProps) {
  return (
    <NavigationMenu className={cn('data-[orientation=vertical]:items-start', className)} {...props}>
      <NavigationMenuList className="gap-1 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
        <NavMenuItem title="Knowledge Sharing" href="#knowledge-sharing" />
        <NavMenuItem title="Networking Events" href="#networking-events" />
        <NavMenuItem title="Professional Growth" href="#professional-growth" />
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default NavMenu;
