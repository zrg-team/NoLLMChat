import { BaseNodeHandler, FlowExecutionContext } from 'src/services/flow-machine/types'
import { FlowNode, Message, FlowNodeTypeEnum } from 'src/services/database/types'
import { BaseMessage, HumanMessage, AIMessage } from '@langchain/core/messages'

interface MessageNodeData {
  entity: Message
  content?: string
  role?: string
}

interface MessageInfo {
  message: Message
  content: string
  role: string
  baseMessage: BaseMessage
}

export class MessageNodeHandler extends BaseNodeHandler<MessageInfo, void> {
  nodeType = FlowNodeTypeEnum.Message

  /**
   * Prepare phase - collect message history chain from connected nodes
   * Following prepareThreadHistory logic to build message chain
   */
  async prepare(node: FlowNode, context: FlowExecutionContext): Promise<MessageInfo> {
    const nodeData = node.data as MessageNodeData
    const messageEntity = nodeData.entity

    if (!messageEntity) {
      throw new Error(`No Message entity found for node: ${node.id}`)
    }

    // Get all nodes connected to this message node in graph order
    // Order: ancestors -> self -> descendants based on edges
    const connectedNodes = context.getConnectedNodes(node.id)

    // Filter to get message nodes (all levels)
    const messageNodes = connectedNodes
      .filter((n) => n.node_type === FlowNodeTypeEnum.Message)
      .map((n) => ({ node: n, connectedNodes: [] as FlowNode[] }))

    // Build message history strictly following the graph order (no timestamp sorting)
    const historyMessages: BaseMessage[] = []
    messageNodes.forEach(({ node: msgNode }) => {
      const msgData = msgNode.data as MessageNodeData
      if (msgData?.entity) {
        const msg = msgData.entity as Message
        switch (msg.role) {
          case 'human':
            historyMessages.push(new HumanMessage(msg.content))
            break
          case 'ai':
            historyMessages.push(new AIMessage(msg.content))
            break
        }
      }
    })

    const messageInfo: MessageInfo = {
      message: messageEntity,
      content: messageEntity.content || nodeData.content || '',
      role: messageEntity.role || nodeData.role || 'user',
      baseMessage: (() => {
        switch (messageEntity.role) {
          case 'human':
            return new HumanMessage(messageEntity.content)
          case 'ai':
            return new AIMessage(messageEntity.content)
          default:
            return new HumanMessage(messageEntity.content)
        }
      })(),
    }

    // Store message history in state
    const existingMessages = (context.getState('messages') as BaseMessage[]) || []
    const updatedMessages = [...existingMessages, ...historyMessages]
    context.setState('messages', updatedMessages)

    return messageInfo
  }

  /**
   * Execute phase - no action needed for message nodes
   */
  async execute(_node: FlowNode, _context: FlowExecutionContext): Promise<void> {
    // Message nodes don't need to execute anything, they just prepare message history
  }

  validate(node: FlowNode): boolean {
    const nodeData = node.data as MessageNodeData
    const isValid = Boolean(nodeData?.entity?.id)

    return isValid
  }

  async onBeforeExecute(_node: FlowNode, _context: FlowExecutionContext): Promise<void> {}

  async onAfterExecute(
    _node: FlowNode,
    _result: MessageInfo,
    _context: FlowExecutionContext,
  ): Promise<void> {}
}
