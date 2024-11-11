import { ChatWebLLM } from '@langchain/community/chat_models/webllm'
import { BaseMessageChunk } from '@langchain/core/messages'
import { InitProgressReport } from '@mlc-ai/web-llm'

type ProcessResolveType =
  | ((value: BaseMessageChunk | PromiseLike<BaseMessageChunk>) => void)
  | ((value: Awaited<ReturnType<ChatWebLLM['stream']>>) => void)

export interface LocalLLMState {
  ready: boolean
  initializing: { worker: boolean; init: boolean; loading: boolean }
  cachedLLMURLs: string[]
  selectedModel: string
  worker?: Worker
  refProcesses: Map<
    string,
    [
      ProcessResolveType,
      (reason?: unknown) => void,
      { type: string; data: unknown[]; lastIndex: number },
    ]
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
  worker: undefined,
  refProcesses: new Map(),
  currentLoadModelMessageId: undefined,
  handler: undefined,
  initProgressCallbacks: [],
}
