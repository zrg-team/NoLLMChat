export const worker = new Worker(new URL('./local-llm.worker.ts', import.meta.url), {
  type: 'module',
})
