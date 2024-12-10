import { ChatWebLLM } from '@langchain/community/chat_models/webllm'
import type { BaseMessageChunk } from '@langchain/core/messages'
import type { InitProgressReport } from '@mlc-ai/web-llm'

type ProcessResolveType =
  | ((value: BaseMessageChunk | PromiseLike<BaseMessageChunk>) => void)
  | ((value: Awaited<ReturnType<ChatWebLLM['stream']>>) => void)

export interface LocalLLMState {
  ready: boolean
  initializing: { worker: boolean; init: boolean; loading: boolean }
  cachedLLMURLs: string[]
  selectedModel: string
  refProcesses: Map<
    string,
    {
      promise: Promise<unknown>
      resolve: ProcessResolveType
      reject: (reason?: unknown) => void
      processInfo: { type: string; data: unknown[]; lastIndex: number }
    }
  >
  currentLoadModelMessageId?: string
  handler?: (
    event: MessageEvent<{
      messageId: string
      type: string
      payload: unknown
    }>,
  ) => void
  initProgressCallbacks: ((initProgress: InitProgressReport) => void)[]
}

export const defaultLocalLLMState: LocalLLMState = {
  cachedLLMURLs: [],
  ready: false,
  initializing: { worker: true, init: true, loading: false },
  selectedModel: '',
  refProcesses: new Map(),
  currentLoadModelMessageId: undefined,
  handler: undefined,
  initProgressCallbacks: [],
}
