export const worker = new Worker(new URL('./embedding.worker.ts', import.meta.url), {
  type: 'module',
})
