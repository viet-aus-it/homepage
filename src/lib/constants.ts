export const ORGANISATION = {
  NAME: 'Vietnamese Australians in Information Technology Inc.',
  SHORT_NAME: 'VAIT',
  ABN: '54 638 315 913',
  ASSOCIATION_NUMBER: 'A0127262Z',
  ADDRESS: 'Melbourne, VIC Australia',
  DISCORD_URL: 'https://chat.vait.au/',
} as const;

export const SOCIAL_LINKS = {
  LINKEDIN_URL: 'https://www.linkedin.com/company/vietausit/about/',
  FACEBOOK_URL: 'https://www.facebook.com/vietausit',
} as const;

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
