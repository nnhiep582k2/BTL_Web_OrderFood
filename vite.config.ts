import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            inferno: 'inferno/dist/index.dev.esm.js',
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});
