import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      external: ['electron'],
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  // Add this to handle process reference in renderer
  define: {
    'process.env': {}
  }
});