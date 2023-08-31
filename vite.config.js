import eslint from 'vite-plugin-eslint';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  // root: path.resolve(__dirname, 'src'),
  base: '/AuctionHouse/',
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
    emptyOutDir: true,
    outDir: path.resolve(__dirname, './dist'),
    rollupOptions: {
      index: path.resolve(__dirname, '../index.html'),
      login: path.resolve(__dirname, 'src/pages/login/index.html'),
    },
  },
  server: {
    hot: true,
    port: 5555,
    host: '127.0.0.1',
  },
});
