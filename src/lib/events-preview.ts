import { MARKETING_IMAGES } from '@/lib/constants';

/** Static event preview card for the homepage. */
export interface EventPreviewCard {
  id: string;
  badge: string;
  schedule: string;
  title: string;
  description: string;
  interested: number;
  host: string;
  imageSrc?: string;
  imageAlt?: string;
  variant: 'featured' | 'recurring';
}

/** TODO: Replace with dynamic event data when events backend ships. */
export const EVENT_PREVIEW_CARDS: EventPreviewCard[] = [
  {
    id: 'winter-bbq',
    badge: 'Next up',
    schedule: 'Sat 20 Jun · 11am to 4pm · Albert Park',
    title: 'VAIT Winter Warm-Up BBQ',
    description: 'Warming up winter the only sensible way: lighting a fire and grilling everything in sight. Bring an appetite, leave with new mates.',
    interested: 13,
    host: 'Jing Vu',
    imageSrc: MARKETING_IMAGES.bbqAlbertPark.src,
    imageAlt: MARKETING_IMAGES.bbqAlbertPark.alt,
    variant: 'featured',
  },
  {
    id: 'climbing-squad',
    badge: 'Weekly · Fridays',
    schedule: 'Fridays · 6:30 to 9:30pm · Brunswick',
    title: '[VIC] Northern Climbing Squad',
    description:
      "Chalk up every week with the North-side crew. Top rope, bouldering, then trà sữa on the way home. Never climbed? Doesn't matter, and you can hire shoes there.",
    interested: 6,
    host: 'Luan Nguyen',
    imageSrc: MARKETING_IMAGES.northernClimbing.src,
    imageAlt: MARKETING_IMAGES.northernClimbing.alt,
    variant: 'recurring',
  },
];
