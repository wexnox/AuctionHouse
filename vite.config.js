import eslint from 'vite-plugin-eslint';
import {resolve} from 'path';
import {defineConfig} from 'vite';

export default defineConfig({
    root: resolve(__dirname, './src'),
    base: '/',

    resolve: {
        alias: {
            '~bootstrap': resolve(__dirname, 'node_modules/bootstrap'),
        },
    },

    plugin: [
        {
            ...eslint(),
            apply: 'build',
        }, {
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
                login: resolve(__dirname, './src/auth/login/login.html'),
                register: resolve(__dirname, './src/auth/register/index.html'),
                profile: resolve(__dirname, './src/profile/index.html'),
            },
        },

        emptyOutDir: true,
        outDir: resolve(__dirname, './docs'),
    },
});
