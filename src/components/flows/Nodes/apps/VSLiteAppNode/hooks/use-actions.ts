import { useCallback } from 'react'
import { Connection, useReactFlow } from '@xyflow/react'
import { getRepository } from 'src/services/database'
import type { FileSystemTree } from '@webcontainer/api'
import { parseFileSystemTreeToJSONL } from 'src/services/web-container/utils/file-tree'
import { DefaultNode } from 'src/utils/flow-node'
import { FlowNodeTypeEnum, LLMProviderEnum } from 'src/services/database/types'
import { AIMessage, HumanMessage, SystemMessage } from '@langchain/core/messages'
import { Message } from 'ai/react'
import { MessageNodeProps } from 'src/components/flows/Nodes/MessageNode/type'
import { llmHandler } from 'src/handlers'
import { useConfirmPassphrase } from 'src/hooks/mutations/use-confirm-passphrase'

type CreateMessageOption = {
  onMessageUpdate?: (info: { id?: string; nodeData: Partial<MessageNodeProps['data']> }) => void
  onResponseMessageCreate?: (message?: string) => void
}
export const useActions = () => {
  const { getNode, getHandleConnections } = useReactFlow()
  const { confirmPassphrase } = useConfirmPassphrase()

  const updateCodeContainerData = useCallback(async (id: string, data: FileSystemTree) => {
    await getRepository('FlowNode').update(id, {
      raw: parseFileSystemTreeToJSONL(data),
    })
  }, [])

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

  const sendMessage = useCallback(
    async (
      message: string,
      messages: Message[],
      { onMessageUpdate, onResponseMessageCreate }: CreateMessageOption = {},
    ) => {
      const formatedMessages = messages.map((message) => {
        if (message.role === 'system') {
          return new SystemMessage(message.content)
        }
        if (message.role === 'user') {
          return new HumanMessage(message.content)
        }
        return new AIMessage(message.content)
      })

      onResponseMessageCreate?.()

      await confirmPassphrase()
      const response = await llmHandler.stream(
        LLMProviderEnum.WebLLM,
        [...formatedMessages, new HumanMessage(message)],
        {
          onMessageUpdate: ({ content }) => {
            onMessageUpdate?.({
              nodeData: {
                loading: true,
                content: content,
              },
            })
          },
          llm: undefined,
        },
      )

      onMessageUpdate?.({
        nodeData: {
          loading: false,
          content: response?.content,
        },
      })
      return response?.content
    },
    [stream],
  )

  return {
    sendMessage,
    getLinkedConnections,
    updateCodeContainerData,
  }
}
