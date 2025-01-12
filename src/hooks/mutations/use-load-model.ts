import { LLMProviderEnum } from 'src/services/database/types'
import { useLocalLLMState } from 'src/services/local-llm'

export const useLoadModel = () => {
  const loadModel = useLocalLLMState((state) => state.loadModel)

  const handleLoadModel = async (
    provider: `${LLMProviderEnum}`,
    ...args: Parameters<typeof loadModel>
  ) => {
    switch (provider) {
      case LLMProviderEnum.WebLLM:
        return loadModel(...args)
      case LLMProviderEnum.OpenAI:
        // handle OpenAI model loading
        break
      default:
        throw new Error('Unsupported provider')
    }
  }

  return {
    loadModel: handleLoadModel,
  }
}
