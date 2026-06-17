import { createFileRoute } from '@tanstack/react-router';

import HomeV2Page from '@/pages/home-v2';

export const Route = createFileRoute('/v2/')({
  component: HomeV2Page,
});
