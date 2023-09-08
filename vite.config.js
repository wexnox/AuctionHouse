import eslint from 'vite-plugin-eslint';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: resolve(__dirname, './src'),
  base: '/',
  plugin: [
    // default settings on build (i.e. fail on error)
    {
      ...eslint(),
      apply: 'build',
    },
    {
      ...eslint({
        failOnWarning: false,
        failOnError: false,
      }),
      apply: 'serve',
      enforce: 'post',
    },
  ],

  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, './src/index.html'),
        login: resolve(__dirname, './src/pages/login/index.html'),
        register: resolve(__dirname, './src/pages/register/index.html'),
        profile: resolve(__dirname, './src/pages/profile/index.html'),
      },
    },

    emptyOutDir: true,
    outDir: resolve(__dirname, './docs'),
  },
  server: {
    hot: true,
    port: 5555,
    host: '127.0.0.1',
  },
});
