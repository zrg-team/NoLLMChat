import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { getChatActions, ChatActions } from './actions'
import { ChatState, defaultChatState } from './state'

export const useChatState = create<ChatState & ChatActions>()(
  devtools((set, get) => ({
    ...defaultChatState,
    ...getChatActions(set, get),
  })),
)
