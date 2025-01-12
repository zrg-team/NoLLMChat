import { LLMProviderEnum } from 'src/services/database/types'

export const SUPPORTED_PROVIDERS = [LLMProviderEnum.WebLLM, LLMProviderEnum.OpenAI]

export const OPEN_AI_MODELS = ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-4', 'gpt-3.5-turbo']
