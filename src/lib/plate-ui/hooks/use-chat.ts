'use client'

import { AIMessage, BaseMessage, HumanMessage, SystemMessage } from '@langchain/core/messages'
import { useChat as useBaseChat } from 'ai/react'

export const useChat = ({
  copilotStream,
}: {
  copilotStream?: (
    message: string | BaseMessage[],
    onMessageUpdate: (chunk: string) => void,
  ) => void
}) => {
  return useBaseChat({
    fetch: async (_, init) => {
      const data = (init?.body ? JSON.parse(init.body as string) : {}) as {
        messages: { role: string; content: string }[]
        system?: string
      }
      const messages = data.messages.map((message) => {
        if (message.role === 'user') {
          return new HumanMessage(message.content)
        }
        return new AIMessage(message.content)
      })
      if (data.system) {
        messages.unshift(new SystemMessage(data.system))
      }

      const stream = createStreamResponse({
        messages,
        copilotStream,
      })
      return new Response(stream, {
        headers: {
          Connection: 'keep-alive',
          'Content-Type': 'text/plain',
        },
      })
    },
  })
}

const createStreamResponse = ({
  messages,
  copilotStream,
  streamProtocol = 'data',
}: {
  messages: BaseMessage[]
  copilotStream?: (
    message: string | BaseMessage[],
    onMessageUpdate: (chunk: string) => void,
  ) => void
  chunkCount?: number
  streamProtocol?: 'data' | 'text'
}) => {
  const encoder = new TextEncoder()

  return new ReadableStream({
    async start(controller) {
      try {
        let count = 0
        let lastChunk = ''
        await copilotStream?.(messages, (chunk) => {
          count += 1
          const chunkData = chunk.replace(lastChunk, '')
          lastChunk = chunk
          if (streamProtocol === 'text') {
            controller.enqueue(encoder.encode(chunkData))
          } else {
            controller.enqueue(encoder.encode(`0:${JSON.stringify(chunkData)}\n`))
          }
        })

        if (streamProtocol === 'data') {
          controller.enqueue(
            `d:{"finishReason":"stop","usage":{"promptTokens":0,"completionTokens":${count}}}\n`,
          )
        }
      } finally {
        controller.close()
      }
    },
  })
}
