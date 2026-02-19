/// <reference types="vite/client" />

import path from 'node:path';
import { cloudflare } from '@cloudflare/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/**
 * @constant {boolean} To notify if whether we want to deploy to cloudflare
 *
 * This enables the cloudflare specific packages that are not applicable to other environments
 * (e.g. AWS S3 Bucket like our current setup)
 */
const DEPLOY_TO_CLOUDFLARE = process.env.DEPLOY_TO_CLOUDFLARE === 'true';
const basePlugins = [
  react({
    babel: {
      plugins: [['babel-plugin-react-compiler']],
    },
  }),
  tailwindcss(),
  tanstackRouter({
    routeFileIgnorePattern: '.*\\.test\\.tsx$',
  }),
];
const cloudflarePlugins = [cloudflare()];
const plugins = DEPLOY_TO_CLOUDFLARE ? [...basePlugins, ...cloudflarePlugins] : basePlugins;

// https://vitejs.dev/config/
export default defineConfig({
  plugins,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
