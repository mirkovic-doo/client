import { defineConfig, loadEnv, type UserConfig } from 'vite';

import { sveltekit } from '@sveltejs/kit/vite';

export default ({ mode }: UserConfig) => {
  process.env = { ...process.env, ...loadEnv(mode || 'test', process.cwd()) };

  return defineConfig({
    build: {
      sourcemap: true,
      target: 'esnext',
    },
    plugins: [sveltekit()],
    optimizeDeps: { exclude: ['bytemd'], include: ['debug', 'is-buffer', 'extend'] },
  });
};
