import { AIMessage, BaseMessage } from '@langchain/core/messages'
import { ChatCompletionMessageParam, ChatCompletionTool, MLCEngine } from '@mlc-ai/web-llm'

const TOOL_CALL_SYSTEM_PROMPT = `Cutting Knowledge Date: December 2023
Today Date: 23 Jul 2024
# Tool Instructions
- When looking for real time information use relevant functions if available
You have access to the following functions:
{{tools}}
If a you choose to call a function ONLY reply in the following format:
  <function>{"name": function name, "parameters": dictionary of argument name and its value}</function>
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
  engine,
  stream,
  onChunk,
  messages,
}: {
  engine: MLCEngine
  messages: ChatCompletionMessageParam[]
  tools: ChatCompletionTool[]
  stream?: boolean
  onChunk?: (chunk: BaseMessage) => void
}) {
  // Follows example, but tweaks the formatting with <function>
  const seed = 0
  messages.unshift({
    role: 'system',
    content: TOOL_CALL_SYSTEM_PROMPT.replace('{{tools}}', JSON.stringify(tools)),
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

  return content?.replace(/<function>(.*)<\/function>/, '$1')
}
