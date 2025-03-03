import { useCallback } from 'react'
import { LLMProviderEnum } from 'src/services/database/types'
import { useLocalLLMState } from 'src/services/local-llm'

export const useLocalLLMInfo = () => {
  const getCurrentModelInfo = useLocalLLMState((state) => state.getCurrentModelInfo)

  const handleGetCurrentModelInfo = useCallback(
    async (provider: `${LLMProviderEnum}`) => {
      switch (provider) {
        case LLMProviderEnum.WebLLM:
          return getCurrentModelInfo()
        default:
          // No need to get info
          return
      }
    },
    [getCurrentModelInfo],
  )

  return {
    getCurrentModelInfo: handleGetCurrentModelInfo,
  }
}
