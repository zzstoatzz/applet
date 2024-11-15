import { defineConfig } from 'vite';
import preactPlugin from '@preact/preset-vite';

export default defineConfig({
  plugins: [preactPlugin()],
  build: {
    target: 'esnext',
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  },
  base: './'
});
