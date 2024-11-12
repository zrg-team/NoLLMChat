import path from 'path'
import react from '@vitejs/plugin-react'
import wasm from 'vite-plugin-wasm'
import svgr from 'vite-plugin-svgr'
import topLevelAwait from 'vite-plugin-top-level-await'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [wasm(), topLevelAwait(), react(), svgr()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
})
