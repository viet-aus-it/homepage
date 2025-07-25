/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-vite-plugin';
import react from '@vitejs/plugin-react-oxc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tanstackRouter({
      routeFileIgnorePattern: '.*\\.test\\.tsx$',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
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
});
