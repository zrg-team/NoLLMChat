export const getLocalLLMWorker = () => {
  return new Worker(new URL('./local-llm.worker.ts', import.meta.url), {
    type: 'module',
  })
}
