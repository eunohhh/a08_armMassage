import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            { find: '@', replacement: '/src' },
            { find: '@components', replacement: '/src/components' },
            { find: '@data', replacement: '/src/data' },
            { find: '@pages', replacement: '/src/pages' },
            { find: '@shared', replacement: '/src/shared' }
        ]
    }
});
