import { SystemMessage } from '@langchain/core/messages'
import { z } from 'zod'

export const PREPARING_SYSTEM_PROMPT = new SystemMessage(
  `You are a helpful assistant. Your task is to decide if you need to retrieve codebase to solve the user's conversation.
Below are the conversation:
`,
)

export const preparingAnswerSchema = z.object({
  shouldRetrieve: z.boolean().describe('Should the agent retrieve codebase?'),
})
