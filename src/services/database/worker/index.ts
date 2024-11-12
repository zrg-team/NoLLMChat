export const worker = new Worker(new URL('./database.worker.ts', import.meta.url), {
  type: 'module',
})
