import { LLMProviderEnum } from 'src/services/database/types'

export const SUPPORTED_PROVIDERS = [
  LLMProviderEnum.WebLLM,
  LLMProviderEnum.Wllama,
  LLMProviderEnum.OpenAI,
  LLMProviderEnum.GoogleGenerativeAI,
  LLMProviderEnum.Groq,
]
