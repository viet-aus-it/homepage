import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      css: true,
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./vitest.setup.ts'],
      coverage: {
        provider: 'v8',
        enabled: true,
        include: ['src/**/*'],
        exclude: ['src/routeTree.gen.ts'],
      },
      typecheck: {
        enabled: true,
      },
    },
  })
);
