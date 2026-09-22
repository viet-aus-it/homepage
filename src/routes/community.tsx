import { createFileRoute } from '@tanstack/react-router';

import CommunityPage from '@/pages/community';

export const Route = createFileRoute('/community')({
  component: CommunityPage,
});
