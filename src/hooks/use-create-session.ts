import { useCallback, useState } from 'react'
import { getRepository } from 'src/services/database'
import {
  EmbeddingProviderEnum,
  LLMModelTypeEnum,
  LLMProviderEnum,
  Session,
  VectorDatabaseProviderEnum,
  VectorDatabaseStorageEnum,
  VectorDatabaseTypeEnum,
} from 'src/services/database/types'
import fs, { MOUNT_INFO } from 'src/services/filesystem'
import { useSessionState } from 'src/states/session'
import { logDebug, logWarn } from 'src/utils/logger'
import { encryptData } from 'src/utils/passphrase'
import { encryptSymmetric, generatePassphrase } from 'src/utils/aes'
import { Document } from '@langchain/core/documents'

import { useEmbedding } from './mutations/use-embedding'
import { useIndexCodeVectorDB } from './use-index-code-vector-db'

export const useCreateSession = () => {
  const [loading, setLoading] = useState(false)
  const createSessionFuncion = useSessionState((state) => state.createSession)
  const { getVectorDatabase } = useEmbedding()
  const { indexVectorDB } = useIndexCodeVectorDB()

  const createSession = useCallback(
    async (
      data: Partial<Session>,
      info: {
        files?: { file: string; content: string }[]
        passkey?: string
        llm?: {
          name: string
          model_type: LLMModelTypeEnum
          function_calling: boolean
          encryptedInfo: Record<string, unknown>
          provider: `${LLMProviderEnum}`
        }
        embedding?: {
          provider?: `${EmbeddingProviderEnum}`
          options?: Record<string, unknown>
          encrypted?: Record<string, unknown>
        }
        graph?: {
          name?: string
        }
        prompts?: Record<string, string>
      },
    ) => {
      try {
        setLoading(true)
        const { files, passkey, llm, embedding, prompts } = info
        if (!llm?.provider || !passkey) {
          throw new Error('LLM provider is not found')
        }
        const passphrase = await generatePassphrase()
        const encryptedPassphrase = await encryptSymmetric(passphrase, passkey)
        const session = await createSessionFuncion({
          ...data,
          passphrase: encryptedPassphrase,
        })
        const llmEncrypted = await encryptData(llm?.encryptedInfo || {}, passphrase)
        await getRepository('LLM').save({
          model_type: llm?.model_type || LLMModelTypeEnum.LLM,
          name: llm?.name || 'DEFAULT',
          status: 'started',
          encrypted: llmEncrypted,
          provider: llm?.provider,
          session_id: session.id,
        })
        const embeddingEncrypted = await encryptData(embedding?.encrypted || {}, passphrase)
        const embeddingEntity = await getRepository('Embedding').save({
          key: 'DEFAULT',
          provider: embedding?.provider || EmbeddingProviderEnum.Local,
          encrypted: embeddingEncrypted,
          data: embedding?.options,
          session_id: session.id,
        })
        const contextVectorDatabaseEntity = await getRepository('VectorDatabase').save({
          key: 'CONTEXT',
          type: VectorDatabaseTypeEnum.Local,
          provider: VectorDatabaseProviderEnum.PGVector,
          storage: VectorDatabaseStorageEnum.Database,
          session_id: session.id,
        })
        const codeVectorDatabaseEntity = await getRepository('VectorDatabase').save({
          key: 'CODE',
          type: VectorDatabaseTypeEnum.Local,
          provider: VectorDatabaseProviderEnum.PGVector,
          storage: VectorDatabaseStorageEnum.Database,
          session_id: session.id,
        })
        if (files?.length) {
          const basePath = `${MOUNT_INFO.home}/${session.id}`
          await fs.promises.mkdir(basePath, { recursive: true }).catch((err) => {
            logWarn(`[createSession] create folder for session: ${session.id}`, err)
          })
          for (const file of files) {
            const pathOnly = file.file.split('/').slice(0, -1).join('/')
            logDebug(`[createSession] create path: ${`${basePath}/${pathOnly}/`} for ${file.file}.`)
            await fs.promises
              .mkdir(`${basePath}/${pathOnly}/`.replace(/\/\//g, ''), { recursive: true })
              .catch((err) => {
                logWarn(`[createSession] create path ${pathOnly} for ${file.file}`, err)
              })
            await fs.promises
              .writeFile(`${basePath}/${file.file}`.replace(/\/\//g, ''), file.content)
              .catch((err) => {
                logWarn(`[createSession] write file error: ${file.file}`, err)
              })
          }

          const codeVectorStore = await getVectorDatabase(
            {
              ...embeddingEntity,
              provider: embeddingEntity.provider,
              encrypted: embeddingEntity.encrypted,
              passphrase,
            },
            {
              database: {
                databaseId: codeVectorDatabaseEntity.id,
              },
            },
          )
          await indexVectorDB({
            vectorStore: codeVectorStore,
            input:
              files?.map((file) => ({
                content: file.content,
                file: file.file,
                metadata: {
                  session_id: session.id,
                },
              })) || [],
          })

          const pathDocuments = files.map((item) => {
            return new Document({
              pageContent: item.file,
              metadata: {
                type: 'PATH',
                session_id: session.id,
                source: item.file,
              },
            })
          })
          const contextVectorStore = await getVectorDatabase(
            {
              ...embeddingEntity,
              provider: embeddingEntity.provider,
              encrypted: embeddingEntity.encrypted,
              passphrase,
            },
            {
              database: {
                databaseId: contextVectorDatabaseEntity.id,
              },
            },
          )
          await contextVectorStore.addDocuments(pathDocuments)
        }
        if (Object.keys(prompts || {}).length) {
          await getRepository('Prompt').save(
            Object.keys(prompts || {}).map((key) => {
              return {
                key,
                type: 'chat',
                role: 'system',
                status: 'started',
                content:
                  prompts?.[key] ||
                  'You are a helpful assistant. Who can help users to generate code for current project. You can access many tools.',
                session_id: session.id,
              }
            }),
          )
        }
        if (info.graph?.name) {
          await getRepository('Graph').save({
            name: info.graph.name,
            session_id: session.id,
          })
        }
        return session
      } finally {
        setLoading(false)
      }
    },
    [createSessionFuncion, getVectorDatabase, indexVectorDB],
  )

  return {
    loading,
    createSession,
  }
}
