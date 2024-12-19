import { useCallback, useEffect, useState } from 'react'
import type { BaseMessage } from '@langchain/core/messages'
import { useLocalLLMState } from 'src/services/local-llm'
import { useToast } from 'src/lib/hooks/use-toast'
import { FlowNodeTypeEnum, LLM, LLMStatusEnum } from 'src/services/database/types'
import { useTranslation } from 'react-i18next'
import { getRepository } from 'src/services/database'
import { useSessionState } from 'src/states/session'
import { In } from 'src/services/database/typeorm-wrapper'

export const useCreateMessage = () => {
  const [loading, setLoading] = useState(false)
  const [mainLLMInfo, setLLMInfo] = useState<{
    llm: LLM
    status: LLMStatusEnum
    progress?: string
  }>()
  const currentSession = useSessionState((state) => state.currentSession)
  const { t } = useTranslation('flows')
  const { toast } = useToast()
  const stream = useLocalLLMState((state) => state.stream)
  const loadModel = useLocalLLMState((state) => state.loadModel)

  const createMessage = useCallback(
    async (input: string | BaseMessage[], onMessageUpdate: (chunk: string) => void) => {
      if (currentSession?.main_node_id) {
        if (!mainLLMInfo?.llm) {
          return toast({
            variant: 'destructive',
            description: t('editor_node.errors.llm_not_found'),
          })
        }

        if (mainLLMInfo?.status !== LLMStatusEnum.Loaded) {
          await loadModel(mainLLMInfo.llm.name, (data) => {
            setLLMInfo((pre) => (pre ? { ...pre, progress: data.text } : pre))
          })
          setLLMInfo((pre) => (pre ? { ...pre, status: LLMStatusEnum.Loaded, progress: '' } : pre))
        }
        try {
          const streamResponse = stream(input)
          if (!streamResponse) {
            throw new Error('Stream is not supported')
          }
          const chunks: string[] = []
          for await (const chunk of streamResponse) {
            if (!chunk) {
              continue
            }
            if (Array.isArray(chunk)) {
              chunks.push(...chunk.map((c) => c.content))
              if (chunk?.length) {
                onMessageUpdate?.(chunk.map((c) => c.content).join(''))
              }
            }
          }
          return chunks.join('')
        } catch (error) {
          if (error instanceof Error && error.message.includes('LLM_NOT_LOADED_YET')) {
            return toast({
              title: t('editor_node.errors.llm_not_loaded_yet'),
            })
          }
          toast({
            variant: 'destructive',
            title: t('editor_node.errors.stream_message_failed'),
          })
        }
      }
    },
    [
      currentSession?.main_node_id,
      mainLLMInfo?.llm,
      mainLLMInfo?.status,
      toast,
      t,
      loadModel,
      stream,
    ],
  )

  const init = useCallback(async () => {
    try {
      setLoading(true)
      if (!currentSession?.main_node_id) {
        return
      }

      const connections = await getRepository('FlowEdge').find({
        where: {
          target: currentSession.main_node_id,
        },
      })
      const connectedNodes = await getRepository('FlowNode').find({
        where: {
          id: In(connections.map((connection) => connection.source)),
        },
      })
      const llmNode = connectedNodes.find((node) => node.source_type === FlowNodeTypeEnum.LLM)
      if (!llmNode) {
        return
      }
      const llm = await getRepository('LLM').findOne({
        where: {
          id: llmNode.source_id,
        },
      })
      if (!llm) {
        return
      }
      await loadModel(llm.name, (data) => {
        setLLMInfo((pre) => (pre ? { ...pre, llm, progress: data.text } : pre))
      })
      setLLMInfo({
        llm,
        status: LLMStatusEnum.Loaded,
      })
    } finally {
      setLoading(false)
    }
  }, [currentSession?.main_node_id, loadModel])

  const loadCurrentModel = useCallback(async () => {
    try {
      setLoading(true)
      if (!mainLLMInfo?.llm) {
        return
      }
      await loadModel(mainLLMInfo.llm.name, (data) => {
        setLLMInfo((pre) => (pre ? { ...pre, progress: data.text } : pre))
      })
      setLLMInfo((pre) => (pre ? { ...pre, status: LLMStatusEnum.Loaded, progress: '' } : pre))
    } finally {
      setLoading(false)
    }
  }, [loadModel, mainLLMInfo?.llm])

  useEffect(() => {
    if (!currentSession?.main_node_id) {
      return
    }
    init()
  }, [currentSession?.main_node_id, init])

  return {
    loading,
    mainLLMInfo,
    createMessage,
    loadCurrentModel,
  }
}
