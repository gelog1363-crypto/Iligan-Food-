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
      // Explicitly includes the offline page and standard assets
      includeAssets: ['favicon.ico', 'robots.txt', 'offline.html', 'logo.png'], 
      workbox: {
        // Caches common assets (js, css, html, images)
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'], 
        navigateFallback: '/offline.html',
        // --- REMOVED: navigateFallbackDeny property to fix the build error. ---
        runtimeCaching: [
          {
            // Caches specific API calls (e.g., Supabase or GraphQL)
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
            src: '/logo.png', 
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