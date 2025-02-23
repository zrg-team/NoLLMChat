export const getLocalEmbeddingWorker = () => {
  return new Worker(new URL('./embedding.worker.ts', import.meta.url), {
    type: 'module',
  })
}
