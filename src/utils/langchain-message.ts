import { AIMessage, HumanMessage, SystemMessage } from '@langchain/core/messages'

export const formatLangChainMessage = (message: { role?: string; content: string }) => {
  if (message.role === 'system') {
    return new SystemMessage(`${message.content}`)
  }
  if (message.role === 'assistant' || message.role === 'ai') {
    return new AIMessage(`${message.content}`)
  }
  return new HumanMessage(`${message.content}`)
}
