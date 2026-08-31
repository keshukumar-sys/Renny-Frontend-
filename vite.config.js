import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr'; 

export default defineConfig({
  server: {
    headers: {
      'X-Frame-Options': 'SAMEORIGIN'
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