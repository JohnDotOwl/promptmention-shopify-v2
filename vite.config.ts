import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { cloudflare } from '@cloudflare/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';

const sharedShopifyCertDir = path.resolve(__dirname, '../promptmention/shopify');
const sharedKeyPath = path.join(sharedShopifyCertDir, 'localhost-key.pem');
const sharedCertPath = path.join(sharedShopifyCertDir, 'localhost.pem');

const httpsConfig = fs.existsSync(sharedKeyPath) && fs.existsSync(sharedCertPath)
  ? {
      key: fs.readFileSync(sharedKeyPath),
      cert: fs.readFileSync(sharedCertPath),
    }
  : undefined;

export default defineConfig({
  plugins: [react(), cloudflare(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5176,
    strictPort: true,
    https: httpsConfig,
    proxy: {
      '/api': {
        target: 'http://localhost:37123',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
