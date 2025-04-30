import { useCallback } from 'react'
import { LLM, LLMProviderEnum } from 'src/services/database/types'
import { useLangchainLLM } from './mutations/use-langchain-llm'
import { useLocalLLM } from 'src/services/local-llm'
import { BaseChatModelParams } from '@langchain/core/language_models/chat_models'

export const useLLM = () => {
  const { getLLM: getLocalLLM } = useLocalLLM()
  const { getLLM: getRemoteLLM } = useLangchainLLM()

  const getLLM = useCallback(
    (provider: `${LLMProviderEnum}`, llm?: LLM, config?: BaseChatModelParams) => {
      switch (provider) {
        case LLMProviderEnum.WebLLM:
        case LLMProviderEnum.Wllama:
          // No instance use RAG
          return undefined
        case LLMProviderEnum.GoogleGenerativeAI:
        case LLMProviderEnum.Groq:
        case LLMProviderEnum.OpenAI:
          return getRemoteLLM(provider, llm, config)
        default:
          throw new Error('Provider is not supported')
      }
    },
    [getRemoteLLM, getLocalLLM],
  )

  return {
    getLLM,
  }
}
