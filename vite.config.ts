import path from 'path'
import react from '@vitejs/plugin-react'
import wasm from 'vite-plugin-wasm'
import svgr from 'vite-plugin-svgr'
import topLevelAwait from 'vite-plugin-top-level-await'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    wasm(),
    topLevelAwait(),
    react(),
    svgr(),
    nodePolyfills({
      include: ['buffer'],
      globals: {
        Buffer: true, // can also be 'build', 'dev', or false
        global: true,
      },
    }),
  ],
  build: {
    chunkSizeWarningLimit: 2000,
    sourcemap: false,
    minify: true,
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['@electric-sql/pglite'],
  },
  worker: {
    format: 'es',
  },
  base: process.env.VITE_BASE_URL || '/NoLLMChat/',
  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  },
})
