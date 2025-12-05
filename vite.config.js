import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // <--- It must be inside the array, separated by a comma
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'generateSW',
      includeAssets: ['logo.png', 'favicon.ico', 'robots.txt', 'offline.html'],
      workbox: {
        navigateFallback: '/offline.html',
      },
      manifest: {
        name: 'Iligan Food',
        short_name: 'Iligan',
        start_url: '/',
        display: 'standalone',
        theme_color: '#ffffff',
        background_color: '#ffffff'
      }
    }),
  ],
})