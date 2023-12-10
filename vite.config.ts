import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/food-order-planner",
  plugins: [
    react(),
    VitePWA({
      workbox: {
        globPatterns: ['**/*'],
      },
      includeAssets: [
        '**/*',
      ],
      registerType: 'autoUpdate',
      manifest: {
        display: 'standalone',
        scope: '/',
        start_url: '/',
        short_name: 'food order',
        description: 'app for planning food orders',
        name: 'food order',
        icons: [
          {
            'src': './src/assets/react.svg',
            'type': 'image/svg'
          }
        ]
      }
    })
  ],
})
