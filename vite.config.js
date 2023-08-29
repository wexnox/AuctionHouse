import eslint from 'vite-plugin-eslint';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
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
    outDir: '../dist',
    rollupOptions: {
      index: path.resolve(__dirname, 'src/index.html'),
    },
  },
  server: {
    hot: true,
    port: 5555,
    host: '127.0.0.1',
  },
});
