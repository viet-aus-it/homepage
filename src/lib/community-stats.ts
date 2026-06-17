/** Community member statistics — static copy from design handoff. */
export interface CommunityStat {
  value: string;
  label: string;
  variant?: 'default' | 'dark' | 'yellow' | 'highlight';
}

export const COMMUNITY_MEMBER_COUNT = '1,448';

export const COMMUNITY_STATS: CommunityStat[] = [
  { value: '388', label: 'Victoria' },
  { value: '353', label: 'New South Wales' },
  { value: '8/8', label: 'states & territories', variant: 'dark' },
  { value: '127', label: 'Queensland' },
  { value: COMMUNITY_MEMBER_COUNT, label: 'total members', variant: 'yellow' },
  { value: '116', label: 'overseas' },
];
