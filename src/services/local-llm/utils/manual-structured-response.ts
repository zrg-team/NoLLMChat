import { AIMessage, BaseMessage } from '@langchain/core/messages'
import type { ChatCompletionMessageParam, MLCEngine } from '@mlc-ai/web-llm'

const STRUCTURED_RESPONSE_SYSTEM_PROMPT = `
# Response Instructions
You must respond in the following format:
{{format}}
You must reply in the following format:
  <response>{"field_1": "data extract from based on explain", "field_2": "data extract from based on explain"}</response>
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
  engine,
  stream,
  onChunk,
  messages,
}: {
  engine: MLCEngine
  messages: ChatCompletionMessageParam[]
  format: unknown
  stream?: boolean
  onChunk?: (chunk: BaseMessage) => void
}) {
  const seed = 0
  messages.unshift({
    role: 'system',
    content: STRUCTURED_RESPONSE_SYSTEM_PROMPT.replace('{{format}}', JSON.stringify(format)),
  })

  let content: string = ''
  if (stream) {
    const asyncChunkGenerator = await engine.chat.completions.create({
      messages: messages,
      seed: seed,
      stream: true,
    })
    for await (const chunk of asyncChunkGenerator) {
      const message = chunk.choices[0]?.delta?.content || ''
      content += message
      onChunk?.(new AIMessage({ content: message }))
    }
  } else {
    const reply = await engine.chat.completions.create({
      messages: messages,
      seed: seed,
      stream: false,
    })
    content = reply.choices[0].message.content || ''
  }

  const matched = content?.match(/<response>(.*)<\/response>/)
  if (!matched) {
    return new AIMessage({ content: content || '' })
  }

  return new AIMessage({
    content: matched[1] || content || '',
  })
}
