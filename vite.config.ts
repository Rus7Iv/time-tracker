import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

import svgr from '@svgr/rollup'
import react from '@vitejs/plugin-react'
import { defineConfig, type PluginOption } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: [
        'timer_icon.svg',
        'manifest.webmanifest',
        'manifest-dark.webmanifest',
        'icons/icon-64.png',
        'icons/icon-192.png',
        'icons/icon-512.png',
        'icons/apple-touch-icon.png',
      ],
      manifest: false,
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff,woff2,ttf,webmanifest}'],
        navigateFallback: '/index.html',
        cleanupOutdatedCaches: true,
      },
    }) as PluginOption,
  ] as PluginOption[],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
