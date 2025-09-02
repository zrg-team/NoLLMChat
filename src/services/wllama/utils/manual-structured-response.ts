import { BaseMessage, SystemMessage } from '@langchain/core/messages'
import wllamaAPI from '../api'

const STRUCTURED_RESPONSE_SYSTEM_PROMPT = `
# Response Instructions
You must respond in the following format:
{{format}}
You must reply in the following format:
  <response>{"field_name_1": "data extract from based on explain", "field_name_2": "data extract from based on explain"}</response>
Here is an example:
  Format: {"city": { "required": true, "explain": "City name. Example: Ha Noi, London, etc. Only one city name", "type": "string" }}
  Human: Ho Chi Minh is the largest city in Vietnam and has a population of 8.4 million.
  AI: <response>{"city": "Ho Chi Minh"}</response>
Reminder:
- Response MUST follow the specified format and use BOTH <response> and </response>
- Required fields MUST be specified
- Put the entire response reply on one line
You are a helpful Assistant.`

export async function manualStructuredResponse({
  format,
  stream,
  onChunk,
  messages,
}: {
  messages: BaseMessage[]
  format: unknown
  stream?: boolean
  onChunk?: (chunk: { content: string; chunk?: unknown }) => void
}) {
  // Add structured response system prompt
  const structuredMessages = [
    new SystemMessage(
      STRUCTURED_RESPONSE_SYSTEM_PROMPT.replace('{{format}}', JSON.stringify(format)),
    ),
    ...messages,
  ]

  let content = ''

  if (stream) {
    const streamResponse = await wllamaAPI.chatCompletion(structuredMessages, { stream: true })

    if (streamResponse && Symbol.asyncIterator in streamResponse) {
      for await (const chunk of streamResponse as AsyncIterable<{
        content?: string
        chunk?: unknown
      }>) {
        const chunkContent = chunk.content || ''
        content += chunkContent
        onChunk?.({
          content: chunkContent, // Send only the chunk content, not accumulated
          chunk: chunk.chunk || chunk,
        })
      }
    }
  } else {
    const response = await wllamaAPI.chatCompletion(structuredMessages, { stream: false })
    if (typeof response === 'string') {
      content = response
    }
  }

  // Extract structured response from <response> tags
  const matched = content?.match(/<response>(.*)<\/response>/)
  if (!matched) {
    return {
      content: content || '',
      isStructured: false,
    }
  }

  return {
    content: matched[1] || content || '',
    isStructured: true,
  }
}
