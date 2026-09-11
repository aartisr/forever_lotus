import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        'next/navigation': path.resolve(__dirname, './src/lib/next-navigation.ts'),
        'next/link': path.resolve(__dirname, './src/lib/next-link.tsx'),
        'next/image': path.resolve(__dirname, './src/lib/next-image.tsx'),
        'next/dynamic': path.resolve(__dirname, './src/lib/next-dynamic.tsx'),
        'next/script': path.resolve(__dirname, './src/lib/next-script.tsx'),
      },
    },
    build: {
      target: 'es2022',
      cssMinify: true,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('node_modules/motion')) {
              return 'vendor-motion';
            }
            if (id.includes('node_modules/lucide-react')) {
              return 'vendor-lucide';
            }
            if (id.includes('node_modules/canvas-confetti')) {
              return 'vendor-confetti';
            }
            if (id.includes('/data/evaluationData') || id.includes('/data/prototypeData')) {
              return 'data-evaluation';
            }
            if (id.includes('/content/insights')) {
              return 'content-insights';
            }
            if (id.includes('/content/aligned-websites') || id.includes('/content/awaricon')) {
              return 'content-ecosystem';
            }
          },
        },
      },
      chunkSizeWarningLimit: 600,
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
