import { FlowNode } from 'src/services/database/types'
import { FlowNodeTypeEnum, LLMProviderEnum } from 'src/services/database/types'
import { BaseNodeHandler, FlowExecutionContext } from 'src/services/flow-machine/types'
import { BaseMessage, HumanMessage, SystemMessage } from '@langchain/core/messages'
import type { LLM, Schema } from 'src/services/database/types'
import { llmHandler } from 'src/handlers'

interface LLMInfo {
  isLoaded: boolean
  isReady: boolean
  status: string
  llm: LLM
}

interface ThreadNodeData {
  entity: {
    id: string
  }
}

/**
 * Thread execution state for FlowMachine
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ThreadExecutionState {}

/**
 * ThreadNode handler result - contains final state for LLM execution
 */
interface ThreadNodeResult {
  finalState: ThreadExecutionState
  readyForExecution: boolean
}

/**
 * ThreadNode handler for FlowMachine
 */
export class ThreadNodeHandler extends BaseNodeHandler<ThreadNodeResult, string> {
  nodeType = FlowNodeTypeEnum.Thread

  /**
   * Prepare phase - check if LLM is connected and validate important state
   */
  async prepare(_node: FlowNode, _context: FlowExecutionContext): Promise<ThreadNodeResult> {
    return {
      finalState: {},
      readyForExecution: false,
    }
  }

  /**
   * Execute phase
   */
  async execute(_node: FlowNode, context: FlowExecutionContext): Promise<string> {
    // Get LLM info directly from state
    const llmInfo = context.getState('llm') as LLMInfo | undefined
    if (!llmInfo?.isLoaded) {
      throw new Error('LLM_NOT_LOADED_YET')
    }

    // Collect data from state (set by other handlers)
    const messages = (context.getState('messages') as BaseMessage[]) || []
    const promptResults = (context.getState('prompts') as BaseMessage[]) || []
    const injectedMessages = (context.getState('injectedMessages') as BaseMessage[]) || []
    const userInput = context.getState('userInput') as string | undefined
    const schemas = (context.getState('schemas') as Schema[]) || []

    // Build the message chain including injected messages from PlaceholderNode
    const messageChain = [...messages, ...promptResults, ...injectedMessages]

    // Add user input as human message
    if (userInput) {
      messageChain.push(new HumanMessage(userInput))
    }

    // Reorder messages all system message must be merged and on top
    const reorderedMessages = this.reorderMessages(messageChain)

    // Execute LLM chat with collected state
    const response = await this.executeLLMChat(llmInfo, reorderedMessages, schemas, context)
    context.setState('final_response', response)
    return response
  }

  /**
   * Execute LLM chat - completely self-contained with actual streaming
   */
  private async executeLLMChat(
    llmInfo: LLMInfo,
    messages: BaseMessage[],
    schemas: Schema[],
    context: FlowExecutionContext,
  ): Promise<string> {
    // Get streaming callback from context if available
    const onMessageUpdate = context.getState('onMessageUpdate') as
      | ((info: { nodeData: { content: string; loading: boolean } }) => void)
      | undefined

    let fullResponse = ''

    // Execute LLM streaming with proper callbacks
    await this.streamLLM(llmInfo.llm.provider as string, messages, llmInfo.llm, schemas, {
      onMessageUpdate: (data: { content: string }) => {
        fullResponse = data.content
        if (onMessageUpdate) {
          onMessageUpdate({
            nodeData: {
              content: data.content,
              loading: true,
            },
          })
        }
      },
      onMessageFinish: (data: { content: string }) => {
        fullResponse = data.content
        if (onMessageUpdate) {
          onMessageUpdate({
            nodeData: {
              content: data.content,
              loading: false,
            },
          })
        }
      },
    })
    return fullResponse
  }

  /**
   * Execute LLM streaming using new LLM handlers
   */
  private async streamLLM(
    provider: string,
    messages: BaseMessage[],
    llm: LLM,
    schemas: Schema[],
    callbacks: {
      onMessageUpdate: (data: { content: string }) => void
      onMessageFinish: (data: { content: string }) => void
    },
  ): Promise<void> {
    await llmHandler.stream(provider as LLMProviderEnum, messages, {
      llm,
      schemas,
      onMessageUpdate: (data: { content: string }) => callbacks.onMessageUpdate(data),
      onMessageFinish: (data: { content: string }) => callbacks.onMessageFinish(data),
    })
  }

  validate(node: FlowNode): boolean {
    const nodeData = node.data as ThreadNodeData | undefined
    return Boolean(nodeData?.entity?.id)
  }

  async onBeforeExecute(_node: FlowNode, _context: FlowExecutionContext): Promise<void> {}

  async onAfterExecute(
    _node: FlowNode,
    _result: ThreadNodeResult,
    _context: FlowExecutionContext,
  ): Promise<void> {}

  async onError(_node: FlowNode, _error: Error, _context: FlowExecutionContext): Promise<void> {}

  /**
   * Reorder messages so all system messages are merged and placed at the top
   */
  private reorderMessages(messages: BaseMessage[]): BaseMessage[] {
    const systemMessages: SystemMessage[] = []
    const otherMessages: BaseMessage[] = []

    // Separate system messages from other messages
    messages.forEach((message) => {
      if (message instanceof SystemMessage) {
        systemMessages.push(message)
      } else {
        otherMessages.push(message)
      }
    })

    // Merge all system messages into one if there are multiple
    if (systemMessages.length === 0) {
      return otherMessages
    } else if (systemMessages.length === 1) {
      return [systemMessages[0], ...otherMessages]
    } else {
      // Merge multiple system messages into one
      const mergedContent = systemMessages
        .map((msg) => msg.content)
        .filter((content) => content && content.toString().trim())
        .join('\n\n')

      const mergedSystemMessage = new SystemMessage(mergedContent)
      return [mergedSystemMessage, ...otherMessages]
    }
  }
}
