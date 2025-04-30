import { Message } from 'src/services/database/types'
import { SimpleGraph } from 'src/services/agent/agents/simple/graph'

export interface ChatState {
  messages: Message[]
  graph?: SimpleGraph
  inProgressMessage?: Pick<Message, 'role' | 'content' | 'status' | 'metadata'>
}

export const defaultChatState: ChatState = {
  messages: [],
  graph: undefined,
  inProgressMessage: undefined,
}
