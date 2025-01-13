import { useCallback } from 'react'
import { BaseMessage, BaseMessageChunk } from '@langchain/core/messages'
import { ChatOpenAI } from '@langchain/openai'
import { LLM, LLMProviderEnum, Schema, SchemaItem } from 'src/services/database/types'
import secureSession from 'src/utils/secure-session'
import SessionPassphraseDialog from 'src/components/molecules/dialogs/SessionPassphraseDialog'
import { useSessionState } from 'src/states/session'
import { decryptSymmetric } from 'src/utils/aes'
import { convertToZodSchema } from 'src/utils/schema-format'
import { useToast } from 'src/lib/hooks/use-toast'
import { useTranslation } from 'react-i18next'
import { useModalRef } from 'src/hooks/use-modal-ref'

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
      switch (info?.provider) {
        case LLMProviderEnum.OpenAI:
          {
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
            const model = new ChatOpenAI({
              apiKey,
              model: info?.llm?.name,
            })
            let content = ''
            let lastChunk: BaseMessageChunk | undefined
            if (schemas?.length) {
              const schemaItems = schemas
                .filter((item) => item.schema_items?.length)
                .flatMap((schema) => schema.schema_items) as SchemaItem[]
              const zodSchema = convertToZodSchema(schemaItems)
              const structuredLLM = model.withStructuredOutput(zodSchema)

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

            onMessageFinish?.({
              content,
              lastChunk,
            })
            return {
              lastChunk,
              content,
            }
          }
          break
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
