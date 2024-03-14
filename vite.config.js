import {resolve} from 'path';
import {defineConfig} from 'vite';
import eslintPlugin from "vite-plugin-eslint";

export default defineConfig({
    root: resolve(__dirname, 'src'),
    base: '/AuctionHouse/',

    plugins: [
        eslintPlugin()
    ],

    build: {
        assetsPublicPath: '/AuctionHouse/',
        rollupOptions: {
            input: {
                index: resolve(__dirname, './src/index.html'),
                login: resolve(__dirname, './src/auth/login.html'),
                register: resolve(__dirname, './src/auth/register.html'),
                profile: resolve(__dirname, './src/profile/index.html'),
                createListing: resolve(__dirname, './src/listings/create.html'),
                listingsDetails: resolve(__dirname, './src/listings/details.html'),
                // search: resolve(__dirname, './src/search.html')

            },
        },

        emptyOutDir: true,
        outDir: resolve(__dirname, './docs'),
    },
});