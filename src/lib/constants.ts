export const ORGANISATION = {
  NAME: 'Vietnamese Australians in Information Technology Inc.',
  SHORT_NAME: 'VAIT',
  ABN: '54 638 315 913',
  ASSOCIATION_NUMBER: 'A0127262Z',
  ADDRESS: 'Melbourne, VIC Australia',
  DISCORD_URL: 'https://chat.vait.au/',
} as const;

/** ACNC Registered Charity Tick — usage per https://www.acnc.gov.au/charity/registered-charity-tick/information-charities */
export const ACNC = {
  CHARITY_REGISTER_URL: 'https://www.acnc.gov.au/charity/charities/6a81d930-583d-f011-8779-002248112f30/profile',
  LOGO_SRC: '/images/acnc-registered-charity-reverse.png',
  LOGO_ALT: 'Registered with the Australian Charities and Not-for-profits Commission',
  LOGO_TITLE: 'VAIT is a charity registered with the Australian Charities and Not-for-profits Commission',
} as const;

/**
 * Short-link destinations for public social profiles.
 * Managed in https://github.com/viet-aus-it/static-sites — update redirects there, then sync URLs here.
 */
export const SOCIAL_LINKS = {
  FACEBOOK_URL: 'https://fb.vait.au',
  LINKEDIN_URL: 'https://linkedin.vait.au',
  YOUTUBE_URL: 'https://yt.vait.au',
} as const;

/**
 * Community reach figures for the v2 landing page.
 *
 * Values are pre-formatted strings (e.g. `1,448`, `8/8`) rather than numbers run through
 * `Intl.NumberFormat` or similar. The counts are static marketing copy that changes rarely,
 * so a formatting layer adds complexity without benefit until a live data source ships.
 */
export const COMMUNITY_MEMBER_COUNT = '1,448';

export interface CommunityStat {
  value: string;
  label: string;
  variant?: 'default' | 'dark' | 'yellow';
}

export const COMMUNITY_STATS: CommunityStat[] = [
  { value: '388', label: 'Victoria' },
  { value: '353', label: 'New South Wales' },
  { value: '8/8', label: 'states & territories', variant: 'dark' },
  { value: '127', label: 'Queensland' },
  { value: COMMUNITY_MEMBER_COUNT, label: 'total members', variant: 'yellow' },
  { value: '116', label: 'overseas' },
];

export const MARKETING_IMAGES = {
  bbqAlbertPark: {
    src: '/images/bbq-albert-park.webp',
    alt: 'VAIT members at the Albert Park BBQ',
  },
  northernClimbing: {
    src: '/images/northern-climbing.webp',
    alt: 'VAIT members at a climbing session in Brunswick',
  },
} as const;
