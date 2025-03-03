import { useCallback } from 'react'
import { LLMProviderEnum } from 'src/services/database/types'
import { useLocalLLMState } from 'src/services/local-llm'
import { loadModelFromHF } from 'src/services/local-llm/wllama'

export const useLoadModel = () => {
  const loadModel = useLocalLLMState((state) => state.loadModel)

  const handleLoadModel = useCallback(
    async (provider: `${LLMProviderEnum}`, ...args: Parameters<typeof loadModel>) => {
      switch (provider) {
        case LLMProviderEnum.Wllama:
          return loadModelFromHF(...args)
        case LLMProviderEnum.WebLLM:
          return loadModel(...args)
        default:
          // No need to load
          return
      }
    },
    [loadModel],
  )

  return {
    loadModel: handleLoadModel,
  }
}
