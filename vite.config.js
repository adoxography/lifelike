import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/lifelike/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'tailwind.config.cjs': path.resolve(__dirname, 'tailwind.config.cjs')
    }
  },
  optimizeDeps: {
    include: [
      'tailwind.config.cjs'
    ]
  },
  build: {
    commonjsOptions: {
      include: ['tailwind.config.js', 'node_modules/**']
    }
  }
});
