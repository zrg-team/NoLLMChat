import { useCallback, useRef } from 'react'
import { HumanMessage, type BaseMessage } from '@langchain/core/messages'
import { Connection, useInternalNode, useReactFlow } from '@xyflow/react'
import { getRepository } from 'src/services/database/database'
import { useToast } from 'src/lib/hooks/use-toast'
import { FlowNodeTypeEnum, LLM, LLMStatusEnum } from 'src/services/database/types'
import { useTranslation } from 'react-i18next'
import { DefaultNode } from 'src/utils/flow-node'
import { llmHandler } from 'src/handlers'
import { useConfirmPassphrase } from 'src/hooks/mutations/use-confirm-passphrase'

export const useActions = (id: string) => {
  const node = useInternalNode(id)
  const { t } = useTranslation('flows')
  const refDebounce = useRef<number | null>(null)
  const { toast } = useToast()
  const { getNode, getHandleConnections } = useReactFlow()
  const { confirmPassphrase } = useConfirmPassphrase()

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
        const llm = llmNode?.data?.entity as LLM
        if (!llmNode || !llm) {
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
          await confirmPassphrase()
          const streamResponse = await llmHandler.stream(
            llm.provider,
            typeof input === 'string' ? [new HumanMessage(input)] : input,
            {
              onMessageUpdate: (data) => {
                onMessageUpdate?.(data.content)
              },
              llm,
            },
          )
          return streamResponse?.content
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
    [node, getHandleConnections, id, getNode, toast, t],
  )

  const getLinkedConnections = useCallback(
    (id: string) => {
      const currentNode = getNode(id)
      if (!currentNode) {
        return []
      }
      const linkedConnections: {
        node: DefaultNode
        connections: Connection[]
        connectedNodes?: DefaultNode[]
      }[] = []
      const connections = getHandleConnections({
        nodeId: id,
        type: 'target',
      })
      connections.forEach((connection) => {
        const node = getNode(connection.source)
        if (!node || node.type !== FlowNodeTypeEnum.LLM) {
          return
        }
        linkedConnections.push({
          node: node as DefaultNode,
          connections: [connection],
        })
      })
      return linkedConnections
    },
    [getHandleConnections, getNode],
  )

  return {
    createMessage,
    updateEditorContent,
    getLinkedConnections,
  }
}
