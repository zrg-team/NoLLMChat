import { BaseChatModel } from '@langchain/core/language_models/chat_models'
import {
  AIMessagePromptTemplate,
  ChatPromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts'
import { SystemMessage } from '@langchain/core/messages'

import { getTools } from './tools'
import { createToolCallingAgent } from 'src/lib/langchain/agent'

export const getAgent = ({
  prompt,
  chatLLM,
  tools,
}: {
  prompt: string
  chatLLM: BaseChatModel
  tools: Awaited<ReturnType<typeof getTools>>
}) => {
  const agentPrompt = new ChatPromptTemplate({
    inputVariables: ['messages', 'agent_scratchpad'],
    partialVariables: {
      thoughts: '',
    },
    promptMessages: [
      new SystemMessage(prompt),
      new MessagesPlaceholder('messages'),
      AIMessagePromptTemplate.fromTemplate('{agent_scratchpad}'),
      new MessagesPlaceholder('thoughts'),
    ],
  })
  return createToolCallingAgent({
    llm: chatLLM,
    tools,
    prompt: agentPrompt,
  })
}
