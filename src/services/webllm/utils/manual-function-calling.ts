import { AIMessage, BaseMessage } from '@langchain/core/messages'
import { ChatCompletionMessageParam, ChatCompletionTool, MLCEngine } from '@mlc-ai/web-llm'
import { SchemaItem } from 'src/services/database/types'
import { safeParseJSON } from 'src/utils/json'

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

interface Property {
  type: string
  description?: string
  properties?: Record<string, Property>
  required?: string[]
}

export const convertToChatCompletionTool = (
  functionName: string,
  functionDescription: string,
  data: SchemaItem[],
): ChatCompletionTool => {
  const generateProperties = (
    parentId: string | null,
  ): { properties: Record<string, Property>; required: string[] } => {
    const properties: Record<string, Property> = {}
    const required: string[] = []

    const items = data.filter((item) => item.parent_id === parentId)

    items.forEach((item) => {
      if (item.type === 'object') {
        const nestedResult = generateProperties(item.id)
        properties[item.name] = {
          type: 'object',
          properties: nestedResult.properties,
          required: nestedResult.required.length > 0 ? nestedResult.required : undefined,
        }
      } else {
        properties[item.name] = {
          type: item.type,
          description: item.description || '',
        }
      }

      if (item.required) {
        required.push(item.name)
      }
    })

    return { properties, required }
  }

  const rootItems = data.filter((item) => item.parent_id === null)
  if (rootItems.length === 0) {
    throw new Error('No root items found in the data.')
  }

  const { properties, required } = generateProperties(null)

  return {
    type: 'function',
    function: {
      name: functionName,
      description: functionDescription,
      parameters: {
        type: 'object',
        properties,
        required,
      },
    },
  }
}

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
    content: TOOL_CALL_SYSTEM_PROMPT.replace(
      '{{tools}}',
      tools.map((item) => JSON.stringify(item, null, 2)).join('\n'),
    ),
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
