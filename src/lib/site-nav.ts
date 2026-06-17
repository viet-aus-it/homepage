import { ORGANISATION } from '@/lib/constants';

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
export function resolveNavHref(item: SiteNavItem, homePath: string): string {
  if (item.external) {
    return item.external;
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
 * Returns enabled navigation items with resolved hrefs.
 * @param items - Navigation configuration array.
 * @param homePath - Base path for hash links.
 */
export function getEnabledNavLinks(items: readonly SiteNavItem[], homePath: string): SiteNavLink[] {
  return items
    .filter((item) => item.enabled)
    .map((item) => ({
      ...item,
      href: resolveNavHref(item, homePath),
    }));
}

/** Primary header navigation — enable items as routes ship. */
export const PRIMARY_NAV: SiteNavItem[] = [
  { label: 'Community', to: '/community', enabled: false },
  { label: 'Events', hash: '#events-preview', enabled: true },
  { label: 'About', to: '/about', enabled: false },
  { label: 'Resources', to: '/resources', enabled: false },
  { label: 'Join', to: '/join', enabled: false },
];

/** Footer Explore column. */
export const FOOTER_EXPLORE: SiteNavItem[] = [
  { label: 'Community', to: '/community', enabled: false },
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

/** Footer Follow column — Discord only until social URLs are confirmed. */
export const FOOTER_FOLLOW: SiteNavItem[] = [
  { label: 'Discord', external: ORGANISATION.DISCORD_URL, enabled: true },
  { label: 'LinkedIn', external: '', enabled: false },
  { label: 'Facebook', external: '', enabled: false },
];

/** Home route path (`/v2` during staging, `/` after promotion). */
export const HOME_PATH = '/v2';
