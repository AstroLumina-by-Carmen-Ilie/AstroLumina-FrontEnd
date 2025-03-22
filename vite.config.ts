import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [react()],
  // server: {
  //   port: 5173,
  //   host: true,
  // },
  // build: {
  //   target: ['es2022', 'chrome92', 'edge92', 'firefox91', 'safari15'],
  //   rollupOptions: {
  //     output: {
  //       manualChunks: {
  //         'vendor': ['react', 'react-dom', 'react-router-dom'],
  //         'i18n': ['i18next', 'react-i18next'],
  //         'utils': ['axios', 'moment']
  //       }
  //     }
  //   },
  //   minify: 'esbuild',
  //   sourcemap: true
  // },
  // optimizeDeps: {
  //   exclude: ['lucide-react']
  // }
});