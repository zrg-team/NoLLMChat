import type { BaseChatModel } from '@langchain/core/language_models/chat_models'
import type { BaseMessageChunk } from '@langchain/core/messages'

export const handleStream = async (
  streamResponse:
    | Awaited<ReturnType<BaseChatModel['stream']>>
    | AsyncGenerator<Awaited<ReturnType<BaseChatModel['stream']>>>,
  onMessageUpdate?: (data: { content: string; chunk: BaseMessageChunk }) => void,
) => {
  let content = ''
  let response = ''
  let lastChunk
  const chunks: string[] = []
  await streamResponse
  for await (const chunk of streamResponse) {
    if (!chunk) {
      continue
    }
    if (Array.isArray(chunk)) {
      chunks.push(...chunk.map((c) => c.content))
      if (chunks?.length) {
        response = chunks.join('')
        onMessageUpdate?.({
          chunk: chunk as BaseMessageChunk,
          content: response,
        })
      }
    } else {
      content = typeof chunk === 'object' && 'content' in chunk ? `${chunk.content}` : `${chunk}`

      onMessageUpdate?.({
        chunk: chunk as BaseMessageChunk,
        content,
      })
    }
    lastChunk = chunk as BaseMessageChunk
  }
  return {
    lastChunk,
    content,
  }
}
