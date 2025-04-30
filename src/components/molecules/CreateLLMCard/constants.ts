import { LLMProviderEnum } from 'src/services/database/types'

export const SUPPORTED_PROVIDERS = [
  LLMProviderEnum.OpenAI,
  LLMProviderEnum.GoogleGenerativeAI,
  LLMProviderEnum.Groq,
  LLMProviderEnum.WebLLM,
  LLMProviderEnum.Wllama,
]

export const DISABLED_PROVIDERS = [
  LLMProviderEnum.GoogleGenerativeAI,
  LLMProviderEnum.Groq,
  LLMProviderEnum.WebLLM,
  LLMProviderEnum.Wllama,
]
