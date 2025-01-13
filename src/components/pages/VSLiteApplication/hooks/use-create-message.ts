import { useCallback, useEffect, useState } from 'react'
import { AIMessage, HumanMessage, SystemMessage } from '@langchain/core/messages'
import { useToast } from 'src/lib/hooks/use-toast'
import { FlowNodeTypeEnum, LLM, LLMStatusEnum } from 'src/services/database/types'
import { useTranslation } from 'react-i18next'
import { getRepository } from 'src/services/database'
import { useSessionState } from 'src/states/session'
import { In } from 'src/services/database/typeorm-wrapper'
import { Message } from 'ai/react'
import { useLLM } from 'src/hooks/mutations/use-llm'
import { useLoadModel } from 'src/hooks/mutations/use-load-model'
import { passphraseConfirm } from 'src/utils/passphrase'
import SessionPassphraseDialog from 'src/components/molecules/dialogs/SessionPassphraseDialog'
import { useModalRef } from 'src/hooks/use-modal-ref'

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
  const { loadModel } = useLoadModel()
  const { stream } = useLLM()
  const { modalRef: sessionPassphraseDialogRef } = useModalRef(SessionPassphraseDialog)

  const createMessage = useCallback(
    async (input: string, messages: Message[], onMessageUpdate?: (chunk: string) => void) => {
      if (currentSession?.main_node_id) {
        if (!mainLLMInfo?.llm) {
          toast({
            variant: 'destructive',
            description: t('editor_node.errors.llm_not_found'),
          })
          return
        }

        if (mainLLMInfo?.status !== LLMStatusEnum.Loaded) {
          await loadModel(mainLLMInfo.llm.provider, mainLLMInfo.llm.name, (data) => {
            setLLMInfo((pre) => (pre ? { ...pre, progress: data.text } : pre))
          })
          setLLMInfo((pre) => (pre ? { ...pre, status: LLMStatusEnum.Loaded, progress: '' } : pre))
        }
        try {
          const history = messages.map((message) => {
            if (message.role === 'system') {
              return new SystemMessage(message.content)
            }
            if (message.role === 'assistant') {
              return new AIMessage(message.content)
            }
            return new HumanMessage(message.content)
          })
          const { content } = await stream(
            mainLLMInfo.llm.provider,
            [...history, new HumanMessage(input)],
            {
              onMessageUpdate: ({ content }) => {
                onMessageUpdate?.(content)
              },
              llm: mainLLMInfo.llm,
            },
          )
          onMessageUpdate?.(content)
          return content
        } catch (error) {
          if (error instanceof Error && error.message.includes('LLM_NOT_LOADED_YET')) {
            toast({
              title: t('editor_node.errors.llm_not_loaded_yet'),
            })
            return
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
      if (currentSession.passphrase) {
        await passphraseConfirm(currentSession.passphrase!, sessionPassphraseDialogRef.current)
      }
      await loadModel(llm.provider, llm.name, (data) => {
        setLLMInfo((pre) => (pre ? { ...pre, llm, progress: data.text } : pre))
      })
      setLLMInfo({
        llm,
        status: LLMStatusEnum.Loaded,
      })
    } finally {
      setLoading(false)
    }
  }, [
    currentSession?.main_node_id,
    currentSession?.passphrase,
    loadModel,
    sessionPassphraseDialogRef,
  ])

  const loadCurrentModel = useCallback(async () => {
    try {
      setLoading(true)
      if (!mainLLMInfo?.llm) {
        return
      }
      await loadModel(mainLLMInfo.llm.provider, mainLLMInfo.llm.name, (data) => {
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
