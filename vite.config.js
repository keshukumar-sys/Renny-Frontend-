import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr'; 

export default defineConfig({
  server: {
    headers: {
      'X-Frame-Options': 'SAMEORIGIN'
    },
    proxy: {
      '/documents': {
        target: 'https://renny-assets-storage.s3.ap-south-1.amazonaws.com',
        changeOrigin: true,
      },
      '/document/': {
        target: 'https://renny-assets-storage.s3.ap-south-1.amazonaws.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/document\//, '/documents/'),
      },
      '^/ec$': {
        target: 'https://renny-assets-storage.s3.ap-south-1.amazonaws.com',
        changeOrigin: true,
        rewrite: () => '/documents/RENNY-EC-1-MERGER-APPROVAL.pdf',
      },
      '^/green-steel$': {
        target: 'https://renny-assets-storage.s3.ap-south-1.amazonaws.com',
        changeOrigin: true,
        rewrite: () => '/documents/RENNY+STRIPS+LIMITED%2C+LUDHIANA%2C+PUNJAB.pdf',
      },
    }
  },
  build: {
    target: 'es2019'
  },
  plugins: [
    react(),
    tailwindcss(),
    svgr({
      svgrOptions: {
        exportType: "default"
      }
    })
  ],
});