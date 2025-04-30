import { LLMProviderEnum } from './llm'

export enum EmbeddingProviderEnum {
  Local = 'LOCAL_TRANSFORMERS',
  OpenAI = LLMProviderEnum.OpenAI,
  GoogleGenerativeAI = LLMProviderEnum.GoogleGenerativeAI,
}
