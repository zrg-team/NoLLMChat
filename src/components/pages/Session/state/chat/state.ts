import { Message } from 'src/services/database/types'
import { SimpleGraph } from 'src/services/agent/agents/simple/graph'
import { MCPGraph } from 'src/services/agent/agents/mcp/graph'

export interface ChatState {
  messages: Message[]
  graph?: SimpleGraph | MCPGraph
  inProgressMessage?: Pick<Message, 'role' | 'content' | 'status' | 'metadata'>
}

export const defaultChatState: ChatState = {
  messages: [],
  graph: undefined,
  inProgressMessage: undefined,
}
