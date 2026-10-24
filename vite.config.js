import { resolve } from 'path';
import path from 'path';
import.meta.dirname;
import eslintPlugin from 'vite-plugin-eslint';
import { defineConfig } from 'vite';
import { readFileSync } from 'fs';

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Hent versjon fra package.json
const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  server: {
    // open: true,
    port: 3000,
    cors: true,
  },
  // root: path.resolve(__dirname, 'src'),
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true, // Suppresses warnings from node_modules like Bootstrap
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },

  plugins: [
    eslintPlugin({
      // overrideConfigFile: './.eslint.config.js',
      include: ['src/**/*.js'], // Adjust if using TypeScript or other file types
      exclude: ['node_modules', 'dist'], // Exclude generated files and dependencies
      emitWarning: true, // Enable warnings
      emitError: true, // Enable errors
    }),
  ],
  build: {
    // target: 'es2015', // oldest
    // target: 'modules', // balanced
    target: 'esnext', // Newest

    cssCodeSplit: true,

    minify: 'terser',
    terserOptions: {
      compress: {
        dead_code: true,
        drop_console: true,
      },
      mangle: {
        toplevel: true,
        // reserved: ['importantVar'],
      },
      format: {
        beautify: false,
        comments: false,
      },
      ecma: 2015,
    },
    outDir: path.resolve('./dist'),
    sourcemap: true,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve('index.html'),
        login: resolve('pages/auth/login.html'),
        register: resolve('pages/auth/register.html'),
        profile: resolve('pages/profile/index.html'),
        createListing: resolve('pages/listings/create.html'),
        listingsDetails: resolve('pages/listings/details.html'),
        browseListings: resolve('pages/listings/browse.html'),
        search: resolve('search.html'),
      },
    },
  },
});
