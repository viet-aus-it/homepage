/// <reference types="vite/client" />

import path from 'node:path';

import { cloudflare } from '@cloudflare/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      routeFileIgnorePattern: '.*\\.test\\.tsx$',
      autoCodeSplitting: true,
      target: 'react',
    }),
    react({
      compiler: true,
    }),
    tailwindcss(),
    cloudflare(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
