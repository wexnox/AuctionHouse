import eslint from 'vite-plugin-eslint';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  base: './dist',
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
    rollupOptions: {},
  },
  server: {
    hot: true,
    port: 5555,
    host: '127.0.0.1',
  },
});
