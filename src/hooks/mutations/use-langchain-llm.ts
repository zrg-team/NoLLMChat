import { useCallback } from 'react'
import { BaseMessage, BaseMessageChunk } from '@langchain/core/messages'
import { BaseChatModel } from '@langchain/core/language_models/chat_models'
import { ChatOpenAI } from '@langchain/openai'
import { ChatGroq } from '@langchain/groq'
import { LLM, LLMProviderEnum, Schema, SchemaItem } from 'src/services/database/types'
import secureSession from 'src/utils/secure-session'
import SessionPassphraseDialog from 'src/components/dialogs/SessionPassphraseDialog'
import { useSessionState } from 'src/states/session'
import { decryptSymmetric } from 'src/utils/aes'
import { convertToZodSchema } from 'src/utils/schema-format'
import { useToast } from 'src/lib/hooks/use-toast'
import { useTranslation } from 'react-i18next'
import { useModalRef } from 'src/hooks/use-modal-ref'

const getModelByProvider = (provider: `${LLMProviderEnum}`) => {
  switch (provider) {
    case LLMProviderEnum.Groq:
      return ChatGroq
    case LLMProviderEnum.OpenAI:
      return ChatOpenAI
    default:
      throw new Error('Provider is not supported')
  }
}

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
      switch (info?.provider) {
        case LLMProviderEnum.Groq:
        case LLMProviderEnum.OpenAI: {
          const model = new (getModelByProvider(info.provider))({
            apiKey,
            model: info?.llm?.name,
          })

          const { content, lastChunk } = await llmInvoke(model, messages, {
            schemas,
            onMessageUpdate,
          })

          onMessageFinish?.({
            content,
            lastChunk,
          })
          return {
            lastChunk,
            content,
          }
        }
        default:
          throw new Error('Provider is not supported')
      }
    },
    [currentSession?.passphrase, sessionPassphraseDialogRef, t, toast],
  )

  return {
    stream,
  }
}
