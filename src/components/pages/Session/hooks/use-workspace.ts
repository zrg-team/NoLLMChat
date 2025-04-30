import { useCallback, useRef } from 'react'
import {
  Embedding,
  EmbeddingProviderEnum,
  LLM,
  LLMStatusEnum,
  Prompt,
  VectorDatabase,
  VectorDatabaseProviderEnum,
  VectorDatabaseStorageEnum,
  VectorDatabaseTypeEnum,
} from 'src/services/database/types'
import { getRepository } from 'src/services/database'
import { useSessionState } from 'src/states/session'
import { useLoadModel } from 'src/hooks/mutations/use-load-model'
import { passphraseConfirm } from 'src/utils/passphrase'
import SessionPassphraseDialog from 'src/components/dialogs/SessionPassphraseDialog'
import { useModalRef } from 'src/hooks/use-modal-ref'
import { useWorkspaceState } from 'src/components/pages/Session/state/workspace'
import { useShallow } from 'zustand/react/shallow'
import { logError, logInfo } from 'src/utils/logger'
import type { InitProgressReport } from '@mlc-ai/web-llm/lib/types'
import { useEmbedding } from 'src/hooks/mutations/use-embedding'
import { PGLiteVectorStore } from 'src/lib/langchain-pglite-vector-store'
import { msToTime } from 'src/utils/time-format'

export const useWorkspace = () => {
  const setLoading = useWorkspaceState((state) => state.setLoading)
  const currentLLM = useWorkspaceState(useShallow((state) => state.llm))
  const resetWorkspace = useWorkspaceState((state) => state.reset)
  const resetChatState = useWorkspaceState((state) => state.reset)
  const setMainLLMInfo = useWorkspaceState((state) => state.setMainLLMInfo)
  const setLLMInfo = useWorkspaceState((state) => state.setLLMInfo)
  const updateLLMStatus = useWorkspaceState((state) => state.updateLLMStatus)
  const updateLLMProgress = useWorkspaceState((state) => state.updateLLMProgress)
  const setEmbedding = useWorkspaceState((state) => state.setEmbedding)
  const setCodeVectorDatabase = useWorkspaceState((state) => state.setCodeVectorDatabase)
  const setCodeVectorDatabaseInstance = useWorkspaceState(
    (state) => state.setCodeVectorDatabaseInstance,
  )
  const setContextVectorDatabase = useWorkspaceState((state) => state.setContextVectorDatabase)
  const setContextVectorDatabaseInstance = useWorkspaceState(
    (state) => state.setContextVectorDatabaseInstance,
  )
  const currentSession = useSessionState(useShallow((state) => state.currentSession))
  const setPrompts = useWorkspaceState((state) => state.setPrompts)
  const setMCP = useWorkspaceState((state) => state.setMCP)

  const currentSessionRef = useRef(currentSession)
  const currentLLMRef = useRef(currentLLM)
  const { loadModel } = useLoadModel()
  const { getVectorDatabase } = useEmbedding()
  const { modalRef: sessionPassphraseDialogRef } = useModalRef(SessionPassphraseDialog)

  currentSessionRef.current = currentSession
  currentLLMRef.current = currentLLM

  const init = useCallback(async () => {
    try {
      if (!currentSessionRef.current) {
        return
      }
      setLoading(true)
      const start = Date.now()
      if (currentSessionRef.current?.passphrase) {
        const result = await passphraseConfirm(
          currentSessionRef.current.passphrase!,
          sessionPassphraseDialogRef.current,
        )
          .catch(() => {
            return false
          })
          .then(() => {
            return true
          })
        if (!result) {
          return init()
        }
      }
      const sessionId = currentSessionRef.current.id
      let contextVectorDatabaseEntity: VectorDatabase | undefined
      let codeVectorDatabaseEntity: VectorDatabase | undefined
      let embedingEntity: Embedding | undefined
      await Promise.all([
        getRepository('VectorDatabase')
          .findOne({
            where: { session_id: sessionId, key: 'CONTEXT' },
          })
          .then(async (entity) => {
            if (!entity) {
              return getRepository('VectorDatabase').save({
                session_id: sessionId,
                key: 'CONTEXT',
                type: VectorDatabaseTypeEnum.Local,
                provider: VectorDatabaseProviderEnum.PGVector,
                storage: VectorDatabaseStorageEnum.Database,
              })
            }
            return entity
          })
          .then((entity) => {
            setContextVectorDatabase(entity)
            contextVectorDatabaseEntity = entity
          }),
        getRepository('VectorDatabase')
          .findOne({
            where: { session_id: sessionId, key: 'CODE' },
          })
          .then(async (entity) => {
            if (!entity) {
              return getRepository('VectorDatabase').save({
                session_id: sessionId,
                key: 'CODE',
                type: VectorDatabaseTypeEnum.Local,
                provider: VectorDatabaseProviderEnum.PGVector,
                storage: VectorDatabaseStorageEnum.Database,
              })
            }
            return entity
          })
          .then((entity) => {
            setCodeVectorDatabase(entity)
            codeVectorDatabaseEntity = entity
          }),
        getRepository('Embedding')
          .findOne({
            where: { session_id: sessionId },
          })
          .then(async (entity) => {
            if (!entity) {
              return getRepository('Embedding').save({
                session_id: sessionId,
                key: 'DEFAULT',
                provider: EmbeddingProviderEnum.Local,
              })
            }
            return entity
          })
          .then((entity) => {
            setEmbedding(entity)
            embedingEntity = entity
          }),
        getRepository('LLM')
          .findOne({
            where: {
              session_id: sessionId,
            },
          })
          .then(async (llm) => {
            if (!llm) {
              return
            }
            setMainLLMInfo({
              llm,
              status: LLMStatusEnum.Started,
            })
          }),
        getRepository('Prompt')
          .find({
            where: {
              session_id: sessionId,
            },
          })
          .then((prompts) => {
            const promptMap: Record<string, Prompt> = {}
            prompts.forEach((prompt) => {
              if (prompt) {
                promptMap[prompt.key!] = prompt
              }
            })
            setPrompts(promptMap)
          }),
        getRepository('Mcp')
          .find({
            where: {
              session_id: sessionId,
            },
          })
          .then((mcps) => {
            setMCP(mcps || [])
          }),
      ])
      if (embedingEntity && codeVectorDatabaseEntity) {
        const codeVectorStore = await getVectorDatabase(embedingEntity, {
          database: {
            databaseId: codeVectorDatabaseEntity.id,
          },
        })
        setCodeVectorDatabaseInstance(codeVectorStore as PGLiteVectorStore)
      }
      if (embedingEntity && contextVectorDatabaseEntity) {
        const contextVectorStore = await getVectorDatabase(embedingEntity, {
          database: {
            databaseId: contextVectorDatabaseEntity.id,
          },
        })
        setContextVectorDatabaseInstance(contextVectorStore as PGLiteVectorStore)
      }
      logInfo(`[Workspace] init workspace took ${msToTime(Date.now() - start)}`)
    } catch (error) {
      logError('Failed to init workspace', error)
    } finally {
      setLoading(false)
    }
  }, [loadModel])

  const loadCurrentModel = useCallback(
    async (inputLLM?: LLM, onLoad?: (data: InitProgressReport) => void) => {
      try {
        setLoading(true)
        const llm = inputLLM || currentLLM || currentLLMRef.current
        if (!llm) {
          return
        }
        updateLLMStatus(LLMStatusEnum.Loading)
        await loadModel(llm.provider, llm.name, {
          provider: llm.provider,
          callback: (data) => {
            updateLLMProgress(data.text)
            onLoad?.(data)
          },
        })
        updateLLMStatus(LLMStatusEnum.Loaded)
      } catch (error) {
        logError('[LoadCurrentModel] error', error)
      } finally {
        setLoading(false)
      }
    },
    [loadModel, currentLLM, updateLLMProgress],
  )

  const createOrUpdateLLM = useCallback(async (llm?: LLM) => {
    try {
      setLoading(true)
      const sessionId = currentSessionRef.current?.id
      if (!sessionId) {
        return
      }
      if (llm) {
        setLLMInfo(llm)
      }
    } catch (error) {
      logError('Failed to create or update LLM', error)
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    loadCurrentModel,
    createOrUpdateLLM,
    resetWorkspace,
    resetChatState,
    init,
  }
}
