import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    minify: 'esbuild',
    rollupOptions: {
      input: {
        main: './index.html',
        projectDetail: './project-detail.html',
      },
    },
  },
  server: {
    port: 3001,
    host: true,
    allowedHosts: true,
  },
  preview: {
    port: 3001,
    host: true,
    allowedHosts: true,
  },
});
