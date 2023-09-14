import eslint from 'vite-plugin-eslint';
import {resolve} from 'path';
import {defineConfig} from 'vite';

export default defineConfig({
    root: resolve(__dirname, './src'),
    base: '/',

    resolve: {
        alias: {
            '~bootstrap': resolve(__dirname, 'node_modules/bootstrap'),
        }
    },


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
                login: resolve(__dirname, './src/auth/login/login.html'),
                register: resolve(__dirname, './src/auth/register/login.html'),
                profile: resolve(__dirname, './src/profile/login.html'),
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
