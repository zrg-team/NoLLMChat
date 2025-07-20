import path from 'path'
import react from '@vitejs/plugin-react-swc'
import wasm from 'vite-plugin-wasm'
import svgr from 'vite-plugin-svgr'
import topLevelAwait from 'vite-plugin-top-level-await'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { defineConfig } from 'vite'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'

export default defineConfig({
  plugins: [
    wasm(),
    topLevelAwait(),
    mdx({
      remarkPlugins: [remarkGfm],
    }),
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
    sourcemap: true,
    minify: 'esbuild',
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
      'node:stream': 'stream-browserify',
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
