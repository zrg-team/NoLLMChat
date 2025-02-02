import { LLMProviderEnum } from 'src/services/database/types'

export const SUPPORTED_PROVIDERS = [
  LLMProviderEnum.WebLLM,
  LLMProviderEnum.OpenAI,
  LLMProviderEnum.Groq,
]

export const OPEN_AI_MODELS = ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-4', 'gpt-3.5-turbo']
export const GROQ_MODELS = [
  'deepseek-r1-distill-llama-70b',
  'llama-3.2-90b-vision-preview',
  'llama-3.3-70b-versatile',
  'llama-3.3-70b-specdec',
  'llama3-70b-8192',
  'gemma2-9b-it',
  'llama3-8b-8192',
  'mixtral-8x7b-32768',
]
export const GROQ_VISION_MODELS = ['llama-3.2-90b-vision-preview']
