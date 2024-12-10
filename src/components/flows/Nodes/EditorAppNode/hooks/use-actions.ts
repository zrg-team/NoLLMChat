import { useCallback, useRef } from 'react'
import type { BaseMessage } from '@langchain/core/messages'
import { useLocalLLMState } from 'src/services/local-llm'
import { useInternalNode, useReactFlow } from '@xyflow/react'
import { getRepository } from 'src/services/database'
import { useToast } from 'src/lib/hooks/use-toast'
import { FlowNodeTypeEnum, LLMStatusEnum } from 'src/services/database/types'
import { useTranslation } from 'react-i18next'

export const useActions = (id: string) => {
  const node = useInternalNode(id)
  const { t } = useTranslation('flows')
  const refDebounce = useRef<number | null>(null)
  const { toast } = useToast()
  const { getNode, getHandleConnections } = useReactFlow()
  const stream = useLocalLLMState((state) => state.stream)

  const updateEditorContent = useCallback(
    async (value: unknown[]) => {
      if (!node) return
      clearTimeout(refDebounce.current!)
      refDebounce.current = setTimeout(async () => {
        await getRepository('FlowNode').update(node.id, {
          data: value,
        })
      }, 150) as unknown as number
    },
    [node],
  )

  const createMessage = useCallback(
    async (input: string | BaseMessage[], onMessageUpdate: (chunk: string) => void) => {
      if (node) {
        const connections = getHandleConnections({
          nodeId: id,
          type: 'target',
        })
        const llmConnection = connections.find((connection) => {
          const currentNode = getNode(connection.source)
          return currentNode?.type === FlowNodeTypeEnum.LLM
        })
        const llmNode = llmConnection ? getNode(llmConnection?.source as string) : undefined
        if (!llmNode) {
          return toast({
            variant: 'destructive',
            description: t('editor_node.errors.llm_not_found'),
          })
        } else if (llmNode.data.status !== LLMStatusEnum.Loaded) {
          return toast({
            variant: 'destructive',
            description: t('editor_node.errors.llm_not_loaded_yet'),
          })
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
    [node, getHandleConnections, id, getNode, toast, t, stream],
  )

  return {
    createMessage,
    updateEditorContent,
  }
}
