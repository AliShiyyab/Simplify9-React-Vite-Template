import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
    plugins: [react()], // Call the react function
    server: {
        open: true,
    },
    build: {
        outDir: 'dist',
    },
    define: {
        'process.env': {},
    },
});
