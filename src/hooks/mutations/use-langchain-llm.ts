import { useCallback } from 'react'
import { BaseMessage, BaseMessageChunk } from '@langchain/core/messages'
import { BaseChatModel } from '@langchain/core/language_models/chat_models'
import { ChatOpenAI } from '@langchain/openai'
import { ChatGroq } from '@langchain/groq'
import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import { LLM, LLMProviderEnum, Schema, SchemaItem } from 'src/services/database/types'
import secureSession from 'src/utils/secure-session'
import SessionPassphraseDialog from 'src/components/dialogs/SessionPassphraseDialog'
import { useSessionState } from 'src/states/session'
import { decryptSymmetric } from 'src/utils/aes'
import { convertToZodSchema } from 'src/utils/schema-format'
import { useToast } from 'src/lib/hooks/use-toast'
import { useTranslation } from 'react-i18next'
import { useModalRef } from 'src/hooks/use-modal-ref'

const llmInvoke = async (
  model: BaseChatModel,
  messages: BaseMessage[],
  {
    schemas,
    onMessageUpdate,
  }: {
    schemas?: Schema[]
    onMessageUpdate?: (data: { content: string; chunk?: BaseMessageChunk }) => void
  },
) => {
  let content = ''
  let lastChunk: BaseMessageChunk | undefined
  if (schemas?.length) {
    const schemaItems = schemas
      .filter((item) => item.schema_items?.length)
      .flatMap((schema) => schema.schema_items) as SchemaItem[]
    const structuredLLM = model.withStructuredOutput(convertToZodSchema(schemaItems))

    const streamResponse = await structuredLLM.stream(messages)

    for await (const data of streamResponse) {
      content = JSON.stringify(data)
      onMessageUpdate?.({ content: content })
    }
  } else {
    const streamResponse = await model.stream(messages)

    for await (const data of streamResponse) {
      content += `${data.content}`
      lastChunk = data
      onMessageUpdate?.({ content, chunk: data })
    }
  }
  return {
    lastChunk,
    content,
  }
}

export const useLangchainLLM = () => {
  const { toast } = useToast()
  const { t } = useTranslation('errors')
  const currentSession = useSessionState((state) => state.currentSession)
  const { modalRef: sessionPassphraseDialogRef } = useModalRef(SessionPassphraseDialog)

  const stream = useCallback(
    async (
      messages: BaseMessage[],
      info?: {
        schemas?: Schema[]
        tools?: {
          name: string
          description: string
          schemaItems: SchemaItem[]
        }[]
        onMessageUpdate?: (data: { content: string; chunk?: BaseMessageChunk }) => void
        onMessageFinish?: (data: { content: string; lastChunk?: BaseMessageChunk }) => void
        provider?: `${LLMProviderEnum}`
        llm?: LLM
      },
    ) => {
      const { schemas, onMessageUpdate, onMessageFinish } = info || {}
      if (!currentSession?.passphrase) {
        throw new Error('Session is not found')
      }
      const passphraseExisted = await secureSession.exists('passphrase')
      if (!passphraseExisted) {
        await new Promise<void>((resolve, reject) => {
          sessionPassphraseDialogRef.current.show({
            onConfirm: async (passkey) => {
              try {
                const result = await decryptSymmetric(currentSession.passphrase!, passkey)
                await secureSession.set('passphrase', result)
                resolve()
              } catch (error) {
                toast({
                  content: t('invalid_passphrase'),
                  variant: 'destructive',
                })
                reject(error)
              } finally {
                sessionPassphraseDialogRef.current.hide()
              }
            },
            onCancel: () => {
              reject()
            },
          })
        })
      }
      const parameters = info?.llm?.parameters
      const options = info?.llm?.options || ({} as Record<string, unknown>)
      if (!parameters?.key || typeof parameters.key !== 'string') {
        throw new Error('API Key is not found')
      }
      const passphrase = await secureSession.get('passphrase')
      if (!passphrase) {
        throw new Error('Passphrase is not found')
      }
      const apiKey = await decryptSymmetric(parameters.key, passphrase!)
      if (!apiKey) {
        throw new Error('API Key is not found')
      }

      let content = ''
      let lastChunk: BaseMessageChunk | undefined

      switch (info?.provider) {
        case LLMProviderEnum.GoogleGenerativeAI:
          {
            const model = new ChatGoogleGenerativeAI({
              apiKey,
              model: info?.llm?.name,
              temperature: options?.temperature ? +options.temperature : undefined,
              topK: options?.topK ? +options.topK : undefined,
              topP: options?.topP ? +options.topP : undefined,
              stopSequences: options?.stop ? (options.stop as string[]) : undefined,
              maxOutputTokens: options?.maxTokens ? +options.maxTokens : undefined,
            })
            if (parameters?.enabled_google_search_retrieval) {
              const searchRetrievalTool = {
                googleSearchRetrieval: {
                  dynamicRetrievalConfig: {
                    mode: 'MODE_DYNAMIC', // Use Dynamic Retrieval
                    dynamicThreshold: 0.7, // Default for Dynamic Retrieval threshold
                  },
                },
              }
              model.bindTools([searchRetrievalTool])
            }
            const result = await llmInvoke(model, messages, {
              schemas,
              onMessageUpdate,
            })
            content = result.content
            lastChunk = result.lastChunk
          }
          break
        case LLMProviderEnum.Groq:
          {
            const model = new ChatGroq({
              apiKey,
              model: info?.llm?.name,
              temperature: options?.temperature ? +options.temperature : undefined,
              stopSequences: options?.stop ? (options.stop as string[]) : undefined,
              maxTokens: options?.maxTokens ? +options.maxTokens : undefined,
            })
            const result = await llmInvoke(model, messages, {
              schemas,
              onMessageUpdate,
            })
            content = result.content
            lastChunk = result.lastChunk
          }
          break
        case LLMProviderEnum.OpenAI:
          {
            const model = new ChatOpenAI({
              apiKey,
              model: info?.llm?.name,
              temperature: options?.temperature ? +options.temperature : undefined,
              topP: options?.topP ? +options.topP : undefined,
              stopSequences: options?.stop ? (options.stop as string[]) : undefined,
              maxTokens: options?.maxTokens ? +options.maxTokens : undefined,
            })
            const result = await llmInvoke(model, messages, {
              schemas,
              onMessageUpdate,
            })
            content = result.content
            lastChunk = result.lastChunk
          }
          break
        default:
          throw new Error('Provider is not supported')
      }
      onMessageFinish?.({
        content,
        lastChunk,
      })
      return {
        lastChunk,
        content,
      }
    },
    [currentSession, sessionPassphraseDialogRef, t, toast],
  )

  return {
    stream,
  }
}
