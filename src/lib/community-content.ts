import { COMMUNITY_MEMBER_COUNT } from '@/lib/constants';

export const COMMUNITY_PATH = '/community';

export type ReachHeat = 'light' | 'medium' | 'strong' | 'max';

export interface ReachRegion {
  code: string;
  value: number;
  heat: ReachHeat;
}

export interface ReachBarRow {
  label: string;
  value: number;
  abroad?: boolean;
}

export interface ExperienceCard {
  title: string;
  description: string;
  icon: 'briefcase' | 'code' | 'users' | 'coffee';
}

export interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
  current?: boolean;
}

export interface BelongingRing {
  number: string;
  title: string;
  description: string;
  accent?: 'yellow' | 'dark';
  link?: { label: string; href: string };
}

export interface BoardMember {
  name: string;
  role: string;
  subtitle: string;
  initials: string;
}

export interface ContributorMember {
  name: string;
  role: string;
  subtitle?: string;
  initials: string;
}

export interface CredibilityStat {
  value: string;
  label: string;
  variant?: 'default' | 'dark' | 'yellow';
}

export interface PillarCard {
  title: string;
  description: string;
  icon: 'grow' | 'connect' | 'build';
}

export interface ValuePrinciple {
  number: string;
  title: string;
  description: string;
}

/** Australian states/territories for cartogram layout (prototype counts, June 2026). */
export const REACH_REGIONS: ReachRegion[] = [
  { code: 'WA', value: 23, heat: 'light' },
  { code: 'NT', value: 9, heat: 'light' },
  { code: 'SA', value: 85, heat: 'medium' },
  { code: 'QLD', value: 127, heat: 'strong' },
  { code: 'ACT', value: 9, heat: 'light' },
  { code: 'VIC', value: 388, heat: 'max' },
  { code: 'TAS', value: 12, heat: 'light' },
  { code: 'NSW', value: 353, heat: 'max' },
];

export const REACH_OVERSEAS_COUNT = 116;

/** Ranked bar chart rows — widths derived from max member count in a single region. */
export const REACH_BAR_ROWS: ReachBarRow[] = [
  { label: 'VIC', value: 388 },
  { label: 'NSW', value: 353 },
  { label: 'QLD', value: 127 },
  { label: 'Abroad', value: 116, abroad: true },
  { label: 'SA', value: 85 },
  { label: 'WA', value: 23 },
  { label: 'TAS', value: 12 },
  { label: 'ACT', value: 9 },
  { label: 'NT', value: 9 },
];

const REACH_BAR_MAX = REACH_BAR_ROWS[0]?.value ?? 1;

/** Bar fill width as a percentage of the largest region count. */
export function reachBarWidthPercent(value: number): string {
  return `${((value / REACH_BAR_MAX) * 100).toFixed(1)}%`;
}

export const EXPERIENCE_CARDS: ExperienceCard[] = [
  {
    icon: 'briefcase',
    title: 'Get hired, faster',
    description: 'Fresh job leads in #opportunities, referrals from people already inside, plus résumé reviews and mock interviews before the real thing.',
  },
  {
    icon: 'code',
    title: 'Sharpen your craft',
    description: "Stuck on a bug? Drop it in #programming. There are study groups, coding challenges and fireside chats with seniors who've done it.",
  },
  {
    icon: 'users',
    title: 'Meet your people IRL',
    description: 'BBQs, trà sữa runs, Lunar New Year catch-ups and city meetups. The group chat, but in person.',
  },
  {
    icon: 'coffee',
    title: 'Switch off together',
    description: 'Channels for gaming, food, books, photography and the rest. Honestly, the reason most people stick around.',
  },
];

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    year: '2017',
    title: 'The first message',
    description: 'A small group of Vietnamese-Australian techies start a Slack to share job leads and survive uni assignments together.',
  },
  {
    year: '2019',
    title: 'Onto Discord',
    description:
      'As the crew outgrows Slack, we migrate to Discord to handle the scale. The chat spills into real life too: coffee catch-ups, study sessions and the first of many BBQs.',
  },
  {
    year: '2023',
    title: 'Nationwide',
    description: 'Members in all eight states and territories, plus a growing crew overseas. Weekly recurring events become a thing.',
  },
  {
    year: '2025',
    title: 'Officially official',
    description: `VAIT becomes an incorporated not-for-profit association, so we can finally do more, properly, for the ${COMMUNITY_MEMBER_COUNT} of us and counting.`,
    current: true,
  },
];

export const BELONGING_RINGS: BelongingRing[] = [
  {
    number: '01',
    title: 'Anyone, free forever',
    description: `Hop into the Discord and you're in. Every channel, every event, no fee. That's all ${COMMUNITY_MEMBER_COUNT} of us.`,
    accent: 'yellow',
  },
  {
    number: '02',
    title: 'Paid members get a say',
    description:
      'Everything above, plus a vote at the AGM and the right to stand for the board or join the volunteer crew. Members shape where VAIT heads next.',
    accent: 'yellow',
  },
  {
    number: '03',
    title: 'The team runs it',
    description: 'A board and a crew of contributors, all drawn from paid members, all volunteers. Meet them below.',
    accent: 'dark',
    link: { label: 'Meet the team ↓', href: '#team' },
  },
];

export const BOARD_MEMBERS: BoardMember[] = [
  { name: 'Sam Huynh', role: 'President', subtitle: 'Senior Software Engineer - Rosterfy', initials: 'SH' },
  { name: 'Luan Nguyen', role: 'VP · Operations', subtitle: 'Lead Engineer - Envato', initials: 'LN' },
  { name: 'Hoa Nguyen', role: 'Treasurer', subtitle: 'UX Designer - The Data Foundry', initials: 'HN' },
  { name: 'Nhat Ngo', role: 'Secretary', subtitle: 'Senior Platform Engineer - Sharon AI', initials: 'NN' },
];

export const CONTRIBUTOR_MEMBERS: ContributorMember[] = [
  { name: 'Jing Vu', role: 'Event Organiser · Victoria', subtitle: 'Data Analyst - Melbourne', initials: 'JV' },
  { name: 'Hung Tran', role: 'Committee Member', subtitle: 'Senior ML Engineer - Canva', initials: 'HT' },
  { name: 'Daniel Nguyen', role: 'Committee Member', subtitle: 'Senior Data Engineer - Mantel', initials: 'DN' },
  { name: 'Phuong Bui', role: 'Committee Member', initials: 'PB' },
];

export const CREDIBILITY_STATS: CredibilityStat[] = [
  { value: '100%', label: 'volunteer-run' },
  { value: 'Free', label: 'to be part of', variant: 'dark' },
  { value: '8 yrs', label: 'and counting', variant: 'yellow' },
  { value: 'NFP', label: 'incorporated 2025' },
];

export const PILLAR_CARDS: PillarCard[] = [
  {
    icon: 'grow',
    title: 'Grow',
    description: 'Meaningful careers, built together. Mentorship, skills programs and peer-to-peer knowledge sharing, so everyone has the support to level up.',
  },
  {
    icon: 'connect',
    title: 'Connect',
    description: 'The Vietnamese-Australian tech community, linked across every career stage, background and experience level.',
  },
  {
    icon: 'build',
    title: 'Build',
    description: 'Vietnamese-Australian pride and visibility in tech, so our community is known, respected and sought after across the industry.',
  },
];

export const VALUE_PRINCIPLES: ValuePrinciple[] = [
  {
    number: '01',
    title: 'Open by default',
    description:
      'Plans, decisions and progress happen in the open in Discord, not in DMs. If you want to see how a call was made, you can. Owners still make the call and ship; visibility is an FYI, not an approval queue.',
  },
  {
    number: '02',
    title: 'We ship, then sharpen',
    description: "We'd rather put something real in front of you and improve it than polish a plan forever. Ship, measure, iterate.",
  },
  {
    number: '03',
    title: 'Outcomes over output',
    description:
      "We measure ourselves on whether you're getting value and sticking around, and on the quality of your feedback, not on how many events fill the calendar.",
  },
  {
    number: '04',
    title: 'Trust is earned',
    description: 'We earn your commitment by showing up and delivering first. And as a non-profit, asking for money is always our last resort.',
  },
  {
    number: '05',
    title: 'Anyone can own the fix',
    description: "Spot a problem? Raise it. Want to fix it? It's yours. No need to wait for permission, ownership beats ego here.",
  },
];

export const COMMUNITY_PAGE_META = {
  title: 'Community — VAIT',
  description: `Who we are, where we're based, and how ${COMMUNITY_MEMBER_COUNT} Vietnamese-Australian tech professionals connect across Australia and overseas.`,
} as const;

/** Placeholder avatar for team cards until real headshots ship. */
export function teamPlaceholderSrc(initials: string, size = 440): string {
  return `https://dummyimage.com/${size}x${size}/1a1a1a/f5c518&text=${encodeURIComponent(initials)}`;
}

export const REACH_HEAT_CLASS: Record<ReachHeat, string> = {
  light: 'bg-[#FDF3C0]',
  medium: 'bg-[#FAE488]',
  strong: 'bg-[#F8D450]',
  max: 'bg-brand-yellow',
};
