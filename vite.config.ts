import { defineConfig, loadEnv, type UserConfig } from 'vite';

import { sentrySvelteKit } from '@sentry/sveltekit';
import { sveltekit } from '@sveltejs/kit/vite';

export default ({ mode }: UserConfig) => {
  process.env = { ...process.env, ...loadEnv(mode || 'test', process.cwd()) };

  return defineConfig({
    build: {
      sourcemap: true,
      target: 'esnext',
    },
    plugins: [
      sveltekit(),
      sentrySvelteKit({
        sourceMapsUploadOptions: {
          org: process.env.PUBLIC_SENTRY_ORG,
          project: process.env.PUBLIC_SENTRY_PROJECT,
          cleanArtifacts: true,
          rewrite: false,
        },
      }),
    ],
    optimizeDeps: { exclude: ['bytemd'], include: ['debug', 'is-buffer', 'extend'] },
  });
};
