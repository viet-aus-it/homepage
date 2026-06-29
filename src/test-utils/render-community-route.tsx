import { createMemoryHistory, createRouter, RouterProvider } from '@tanstack/react-router';
import { render, type RenderResult } from '@testing-library/react';

import { routeTree } from '@/routeTree.gen';

/**
 * Renders the app at `/community` with TanStack Router context for integration tests.
 */
export async function renderCommunityRoute(): Promise<RenderResult> {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: ['/community'] }),
  });

  await router.load();

  return render(<RouterProvider router={router} />);
}
