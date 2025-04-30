import { BaseChatModel } from '@langchain/core/language_models/chat_models'
import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts'
import { SystemMessage } from '@langchain/core/messages'
import { createToolCallingAgent } from 'langchain/agents'

import { getTools } from './tools'

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
    partialVariables: {},
    promptMessages: [
      new SystemMessage(prompt),
      new MessagesPlaceholder('messages'),
      new MessagesPlaceholder('agent_scratchpad'),
    ],
  })
  return createToolCallingAgent({
    llm: chatLLM,
    tools,
    prompt: agentPrompt,
  })
}
