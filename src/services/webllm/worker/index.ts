export const getWebLLMWorker = () => {
  return new Worker(new URL('./webllm.worker.ts', import.meta.url), {
    type: 'module',
  })
}
