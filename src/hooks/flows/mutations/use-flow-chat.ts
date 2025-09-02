import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlowMachine } from 'src/services/flow-machine/flow-machine'
import { FlowDataService } from 'src/services/flow-machine/flow-data-service'
import { FlowRunState } from 'src/services/flow-machine/types'
import { ThreadNodeHandler } from 'src/components/flows/Nodes/chat/ThreadNode/handler'
import { LLMNodeHandler, type LLMInfo } from 'src/components/flows/Nodes/llm/LLMNode/handler'
import { PromptNodeHandler } from 'src/components/flows/Nodes/llm/PromptNode/handler'
import { MessageNodeHandler } from 'src/components/flows/Nodes/chat/MessageNode/handler'
import { PlaceholderNodeHandler } from 'src/components/flows/Nodes/PlaceholderNode/handler'
import { DefaultNodeData } from 'src/utils/flow-node'
import { logError } from 'src/utils/logger'
import type { MessageNodeProps } from 'src/components/flows/Nodes/chat/MessageNode/type'
import type { Edge, Node, ReactFlowInstance } from '@xyflow/react'
import { SchemaNodeHandler } from 'src/components/flows/Nodes/llm/SchemaNode/handler'
import { useConfirmPassphrase } from 'src/hooks/mutations/use-confirm-passphrase'
import { getRepository } from 'src/services/database/database'
import {
  FlowNodeTypeEnum,
  MessageRoleEnum,
  MessageStatusEnum,
  Thread,
} from 'src/services/database/types'
import { useSessionState } from 'src/states/session'
import { useFlowState } from 'src/states/flow'

type CreateMessageFlowMachineOption = {
  onMessageUpdate: (info: { id?: string; nodeData: Partial<MessageNodeProps['data']> }) => void
  initialState?: Record<string, unknown>
  sourceId?: string
  initialX?: number
  initialY?: number
}

/**
 * FlowMachine-based message creation hook
 *
 * It provides the same interface but uses FlowMachine for execution
 */
export const useFlowChat = (reactFlowInstance?: ReactFlowInstance<Node<DefaultNodeData>, Edge>) => {
  const [loading, setLoading] = useState(false)
  const { confirmPassphrase } = useConfirmPassphrase()
  const { t } = useTranslation('create_new_message')
  const currentSession = useSessionState((state) => state.currentSession)
  const createOrUpdateFlowNode = useFlowState((state) => state.createOrUpdateFlowNode)
  const createOrUpdateFlowEdge = useFlowState((state) => state.createOrUpdateFlowEdge)
  // No longer need LLM stream - handled by ThreadNodeHandler

  const insertMessages = useCallback(
    async ({
      content,
      threadId,
      sourceId,
      initialX,
      initialY,
      initialLLMId,
    }: {
      content: string
      threadId: string
      sourceId: string
      initialX: number
      initialY: number
      initialLLMId: string
    }) => {
      if (!currentSession) {
        throw new Error('Session is not found')
      }
      const humanMessage = await getRepository('Message').save({
        thread_id: threadId,
        content,
        role: MessageRoleEnum.Human,
        status: MessageStatusEnum.Started,
        llm_id: initialLLMId,
        session_id: currentSession.id,
      })
      if (!humanMessage) {
        throw new Error('Failed to save message')
      }

      const humanMessageNode = await createOrUpdateFlowNode({
        source_id: humanMessage.id,
        source_type: 'Message',
        node_type: FlowNodeTypeEnum.Message,
        x: initialX,
        y: initialY + 80,
      })
      if (!humanMessageNode) {
        throw new Error('Failed to save human message node')
      }
      await createOrUpdateFlowEdge({
        source: sourceId,
        target: humanMessageNode.id,
      })
      const aiMessage = await getRepository('Message').save({
        thread_id: threadId,
        content: t('initial_ai_message'),
        role: MessageRoleEnum.AI,
        status: MessageStatusEnum.Inprogress,
        llm_id: initialLLMId,
        parent_message_id: humanMessage.id,
        session_id: currentSession.id,
      })
      if (!aiMessage) {
        throw new Error('Failed to save message')
      }
      const aiMessageNode = await createOrUpdateFlowNode({
        source_id: aiMessage.id,
        source_type: 'Message',
        node_type: FlowNodeTypeEnum.Message,
        x: initialX,
        y: initialY + 250,
      })
      if (!aiMessageNode) {
        throw new Error('Failed to save ai message node')
      }
      await createOrUpdateFlowEdge({
        source: humanMessageNode.id,
        target: aiMessageNode.id,
      })

      return {
        aiMessage,
        humanMessage,
        aiMessageNode,
        humanMessageNode,
      }
    },
    [createOrUpdateFlowEdge, createOrUpdateFlowNode, currentSession, t],
  )

  const createMessage = useCallback(
    async (
      threadNode: Node<DefaultNodeData>,
      userInput: string,
      options: CreateMessageFlowMachineOption,
    ) => {
      if (!threadNode.data?.entity) {
        throw new Error('Thread node missing entity data')
      }

      const thread = threadNode.data.entity as Thread
      if (!thread) {
        throw new Error('Thread entity is not found')
      }

      let messagesInfo: Awaited<ReturnType<typeof insertMessages>> | undefined
      try {
        setLoading(true)

        // Initialize FlowMachine for this execution (avoid shared state)
        const flowDataService = reactFlowInstance
          ? FlowDataService.forSession(reactFlowInstance as unknown as ReactFlowInstance)
          : FlowDataService.forDatabase()
        const flowMachine = new FlowMachine(flowDataService)

        // Register handlers
        flowMachine.registerNodeHandler(new ThreadNodeHandler())
        flowMachine.registerNodeHandler(new LLMNodeHandler())
        flowMachine.registerNodeHandler(new PromptNodeHandler())
        flowMachine.registerNodeHandler(new SchemaNodeHandler())
        // SchemaNodeHandler removed - not implemented yet
        flowMachine.registerNodeHandler(new MessageNodeHandler())
        flowMachine.registerNodeHandler(new PlaceholderNodeHandler())

        const initialState = {
          userInput,
          messages: options?.initialState?.messages || [],
        }

        await flowMachine.prepare(threadNode.id, initialState)

        // Validation phase (outside FlowMachine scope)
        const llmInfo = flowMachine.getSessionState('llm') as LLMInfo | undefined
        if (!llmInfo?.isLoaded) {
          throw new Error('LLM_NOT_LOADED_YET')
        }

        await confirmPassphrase()

        // Create message nodes after validation passes
        const initialX = options?.initialX || threadNode.position?.x || 0
        const initialY =
          options?.initialY || (threadNode.position?.y || 0) + (threadNode.measured?.height || 0)

        messagesInfo = await insertMessages({
          content: userInput,
          initialX,
          initialY,
          sourceId: options?.sourceId || threadNode.id,
          threadId: thread.id,
          initialLLMId: thread.initial_llm_id,
        })

        flowMachine.setSessionState(
          'onMessageUpdate',
          (data: { nodeData: { content: string; loading: boolean } }) => {
            options.onMessageUpdate({
              id: messagesInfo!.aiMessageNode.id,
              nodeData: {
                entity: {
                  ...messagesInfo!.aiMessage,
                  content: data.nodeData.content,
                  status: data.nodeData.loading
                    ? MessageStatusEnum.Inprogress
                    : MessageStatusEnum.Success,
                },
                loading: data.nodeData.loading,
              },
            })
          },
        )

        const finalRunState: FlowRunState = await flowMachine.execute()

        // Update AI message in database with final content
        const finalContent =
          (finalRunState.sessionState.get('final_response') as string) || 'No response generated'
        await getRepository('Message').update(`${messagesInfo.aiMessage.id}`, {
          status: MessageStatusEnum.Success,
          content: finalContent,
        })
        messagesInfo.aiMessage.status = MessageStatusEnum.Success
        messagesInfo.aiMessage.content = finalContent

        // Final UI update
        options.onMessageUpdate({
          id: messagesInfo.aiMessageNode.id,
          nodeData: {
            entity: messagesInfo.aiMessage,
            loading: false,
          },
        })
        return true
      } catch (error) {
        logError('FlowMachine message creation failed:', error)

        // Handle error case - update AI message with failed status
        if (messagesInfo?.aiMessage) {
          await getRepository('Message').update(`${messagesInfo.aiMessage.id}`, {
            status: MessageStatusEnum.Failed,
            content: t('errors.ai_message_content_failed'),
          })
        }
        if (messagesInfo?.aiMessageNode.id) {
          options?.onMessageUpdate({
            id: messagesInfo.aiMessageNode.id,
            nodeData: {
              content: t('errors.ai_message_content_failed'),
              entity: {
                ...messagesInfo.aiMessage,
                status: MessageStatusEnum.Failed,
                content: t('errors.ai_message_content_failed'),
              },
              loading: false,
            },
          })
        }
        throw error
      } finally {
        setLoading(false)
      }
    },
    [confirmPassphrase, insertMessages, t],
  )

  // Removed executeLLMChat - now handled by ThreadNodeHandler

  return {
    createMessage,
    loading,
  }
}
