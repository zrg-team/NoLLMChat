import { useCallback } from 'react'
import { OpenAIEmbeddings } from '@langchain/openai'
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai'
import { LLMProviderEnum } from 'src/services/database/types'
import secureSession from 'src/utils/secure-session'
import { decryptSymmetric } from 'src/utils/aes'
import { useConfirmPassphrase } from './use-confirm-passphrase'

export const useLangchainEmbedding = () => {
  const { confirmPassphrase } = useConfirmPassphrase()

  const getEmbedding = useCallback(
    async (embeddingNode: {
      encrypted?: Record<string, unknown>
      provider?: string
      passphrase?: string
    }) => {
      const encrypted = embeddingNode?.encrypted
      const provider = embeddingNode?.provider

      if (!embeddingNode?.passphrase) {
        await confirmPassphrase()
      }
      if (!encrypted?.provider && !encrypted?.key) {
        throw new Error('API Key is not found.')
      }
      const passphrase = embeddingNode?.passphrase || (await secureSession.get('passphrase'))
      if (!passphrase) {
        throw new Error('Passphrase is not found')
      }
      const apiKey = await decryptSymmetric(`${encrypted.key}`, passphrase!)
      if (!apiKey || !provider) {
        throw new Error('API Key or provider is not found.')
      }

      switch (provider) {
        case LLMProviderEnum.OpenAI:
          return new OpenAIEmbeddings({
            apiKey,
            model: 'text-embedding-3-small',
          })
        case LLMProviderEnum.GoogleGenerativeAI:
          return new GoogleGenerativeAIEmbeddings({
            apiKey,
            model: 'text-embedding-004',
          })
        default:
          throw new Error('Provider is not supported')
      }
    },
    [confirmPassphrase],
  )

  return {
    getEmbedding,
  }
}
