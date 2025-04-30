import { SetState, GetState } from 'src/utils/zustand'
import { Message } from 'src/services/database/types'

import { ChatState, defaultChatState } from './state'

export interface ChatActions {
  appendMessages: (messages: Message[]) => void
  setMessages: (messages: Message[]) => void
  setInProgressMessage: (message: ChatState['inProgressMessage']) => void
  setInProgressMessageMetadata: (content: Record<string, unknown>) => void
  setGraph: (graph: ChatState['graph']) => void
  clearGraph: () => void
  reset: () => void
}

export const getChatActions = (
  set: SetState<ChatState>,
  get: GetState<ChatState & ChatActions>,
): ChatActions => {
  return {
    appendMessages: (newMessages) => {
      const messages = get().messages
      set({ messages: [...messages, ...newMessages] })
    },
    setMessages: (messages) => {
      set({ messages })
    },
    setInProgressMessage: (message) => {
      set({ inProgressMessage: message })
    },
    setInProgressMessageMetadata: (content) => {
      const inProgressMessage = get().inProgressMessage
      if (!inProgressMessage) {
        return
      }
      const updatedMessage = {
        ...inProgressMessage,
        metadata: {
          ...inProgressMessage.metadata,
          ...content,
        },
      }
      set({ inProgressMessage: updatedMessage })
    },
    setGraph: (graph) => {
      set({ graph })
    },
    clearGraph: () => {
      set({ graph: undefined })
    },
    reset: () => {
      set(JSON.parse(JSON.stringify(defaultChatState)))
    },
  }
}
