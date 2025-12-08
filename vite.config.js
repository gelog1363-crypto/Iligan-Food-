import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'generateSW',
      // ✅ ADD 'offline.html' HERE:
      includeAssets: ['favicon.ico', 'robots.txt', 'offline.html'], 
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'], // Ensures all standard assets are cached
        navigateFallback: '/offline.html', // Falls back to this page if no internet
        navigateFallbackDeny: [/^\/api/], // Don't try to show offline page for API calls
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\.(json|graphql)/,
            handler: 'NetworkFirst',
            options: { 
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 // 1 day
              }
            }
          }
        ]
      },
      manifest: {
        name: 'Iligan Food Hub',
        short_name: 'IliganFood',
        start_url: '/',
        display: 'standalone',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        icons: [
          {
            src: '/logo.png', // Ensure you have a logo.png in public folder
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/logo.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }),
  ],
})