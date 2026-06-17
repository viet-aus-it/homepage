import { createFileRoute } from '@tanstack/react-router';

import HomeV2Page from '@/pages/home-v2';

export const Route = createFileRoute('/')({
  component: HomeV2Page,
});
