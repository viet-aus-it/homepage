import { ORGANISATION } from '@/lib/constants';
import { SOCIAL_LINKS } from '@/lib/social-links';

/** Primary or footer navigation item with progressive enablement. */
export interface SiteNavItem {
  label: string;
  /** Route path when the page exists (e.g. `/community`). */
  to?: string;
  /** In-page anchor on the home route (e.g. `#events-preview`). */
  hash?: string;
  /** External URL (Discord, social). */
  external?: string;
  /** When false, the item is not rendered. */
  enabled: boolean;
}

/** Resolved nav item ready for rendering. */
export interface SiteNavLink extends SiteNavItem {
  href: string;
}

/**
 * Resolves the href for a nav item against a home base path.
 * @param item - Navigation item configuration.
 * @param homePath - Base path for hash links (`/` after promotion, `/v2` during staging).
 */
export function resolveNavHref(item: SiteNavItem, homePath: string): string | undefined {
  if (item.external) {
    return item.external.length > 0 ? item.external : undefined;
  }
  if (item.to) {
    return item.to;
  }
  if (item.hash) {
    return `${homePath}${item.hash}`;
  }
  return homePath;
}

/**
 * Returns enabled navigation items with resolved hrefs (skips items without a valid href).
 * @param items - Navigation configuration array.
 * @param homePath - Base path for hash links.
 */
export function getEnabledNavLinks(items: readonly SiteNavItem[], homePath: string): SiteNavLink[] {
  return items
    .filter((item) => item.enabled)
    .map((item) => {
      const href = resolveNavHref(item, homePath);
      return href ? { ...item, href } : null;
    })
    .filter((item): item is SiteNavLink => item !== null);
}

/** Primary header navigation — enable items as routes ship. */
export const PRIMARY_NAV: SiteNavItem[] = [
  { label: 'Community', hash: '#community-reach', enabled: true },
  { label: 'Events', hash: '#events-preview', enabled: true },
  { label: 'About', to: '/about', enabled: false },
  { label: 'Resources', to: '/resources', enabled: false },
  { label: 'Join', to: '/join', enabled: false },
];

/** Footer Explore column. */
export const FOOTER_EXPLORE: SiteNavItem[] = [
  { label: 'Community', hash: '#community-reach', enabled: true },
  { label: 'Events', hash: '#events-preview', enabled: true },
  { label: 'About', to: '/about', enabled: false },
  { label: 'Resources', to: '/resources', enabled: false },
];

/** Footer Get involved column. */
export const FOOTER_GET_INVOLVED: SiteNavItem[] = [
  { label: 'Become a member', to: '/join', enabled: false },
  { label: 'Host an event', to: '/events', enabled: false },
  { label: 'Volunteer', to: '/about', enabled: false },
  { label: 'Partner with us', to: '/about', enabled: false },
];

/** Footer Follow column — social URLs from {@link SOCIAL_LINKS} when set. */
export const FOOTER_FOLLOW: SiteNavItem[] = [
  { label: 'Discord', external: ORGANISATION.DISCORD_URL, enabled: true },
  { label: 'LinkedIn', external: SOCIAL_LINKS.LINKEDIN_URL, enabled: true },
  { label: 'Facebook', external: SOCIAL_LINKS.FACEBOOK_URL, enabled: true },
];

/** Home route path (`/v2` during staging, `/` after promotion). */
export const HOME_PATH = '/v2';
