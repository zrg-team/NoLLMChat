import path from 'path'
import react from '@vitejs/plugin-react'
import wasm from 'vite-plugin-wasm'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [wasm(), react()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
})
