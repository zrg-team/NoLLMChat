import { useCallback } from 'react'
import { LLMProviderEnum } from 'src/services/database/types'
import { useLocalLLMState } from 'src/services/local-llm'

export const useUnloadLocalLLM = () => {
  const unLoadModel = useLocalLLMState((state) => state.unLoadModel)

  const handleUnLoadModel = useCallback(
    async (provider: `${LLMProviderEnum}`) => {
      switch (provider) {
        case LLMProviderEnum.WebLLM:
          return unLoadModel()
        default:
          // No need to get info
          return
      }
    },
    [unLoadModel],
  )

  return {
    unLoadModel: handleUnLoadModel,
  }
}
