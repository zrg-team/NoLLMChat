import { AIMessage, BaseMessage, SystemMessage } from '@langchain/core/messages'
import { safeParseJSON } from 'src/utils/json'
import type { OpenAPITool } from 'src/types/openai'

import wllamaAPI from '../api'

const TOOL_CALL_SYSTEM_PROMPT = `Cutting Knowledge Date: December 2023
Today Date: 23 Jul 2024
# Tool Instructions
- When looking for real time information use relevant functions if available
You have access to the following functions:

{{tools}}

If a you choose to call a function ONLY reply in the following format:
    <function>{"name": function name, "parameters": { dictionary of argument name and its value }}</function>
Here is an example,
    <function>{"name": "example_function_name", "parameters": {"example_name": "example_value"}}</function>
Reminder:
- Function calls MUST follow the specified format and use BOTH <function> and </function>
- Required parameters MUST be specified
- Only call one function at a time
- When calling a function, do NOT add any other words, ONLY the function calling
- Put the entire function call reply on one line
- Always add your sources when using search results to answer the user query
You are a helpful Assistant.`

export async function manualFunctionCalling({
  tools,
  stream,
  onChunk,
  messages,
}: {
  messages: BaseMessage[]
  tools: OpenAPITool[]
  stream?: boolean
  onChunk?: (chunk: BaseMessage) => void
}) {
  // Add system prompt with tools
  const toolsString = tools
    .map((tool) =>
      JSON.stringify(
        {
          type: 'function',
          function: {
            name: tool.function.name,
            description: tool.function.description,
            parameters: tool.function.parameters,
          },
        },
        null,
        2,
      ),
    )
    .join('\n')

  const messagesWithTools = [
    new SystemMessage(TOOL_CALL_SYSTEM_PROMPT.replace('{{tools}}', toolsString)),
    ...messages,
  ]

  let content = ''

  if (stream) {
    const streamResponse = await wllamaAPI.chatCompletion(messagesWithTools, { stream: true })

    if (streamResponse && Symbol.asyncIterator in streamResponse) {
      for await (const chunk of streamResponse as AsyncIterable<{
        content?: string
        chunk?: unknown
      }>) {
        const chunkContent = chunk.content || ''
        content += chunkContent
        if (chunkContent) {
          onChunk?.(new AIMessage(chunkContent))
        }
      }
    }
  } else {
    const response = await wllamaAPI.chatCompletion(messagesWithTools, { stream: false })
    if (typeof response === 'object' && response && 'content' in response) {
      content = (response.content as string) || ''
    }
  }

  // Extract function call from <function> tags
  const matched = content?.match(/<function>(.*)<\/function>/)
  if (!matched?.length) {
    return new AIMessage({
      content: content,
    })
  }

  const messageContent = content.replace(matched[0], '')
  const toolCalls = []
  if (matched[1]) {
    const functionCall = safeParseJSON(matched[1], ['retryWithMissingBracket'])
    if (functionCall) {
      toolCalls.push({
        name: functionCall.name,
        args: functionCall.parameters,
      })
    }
  }

  return new AIMessage({
    content: toolCalls?.length ? messageContent : content,
    tool_calls: toolCalls,
  })
}
