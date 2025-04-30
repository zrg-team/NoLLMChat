import type { BaseChatModel } from '@langchain/core/language_models/chat_models'
import type { WebContainer, WebContainerProcess } from '@webcontainer/api'
import type { PGLiteVectorStore } from 'src/lib/langchain-pglite-vector-store'
import type { Mcp, Prompt } from 'src/services/database/types'
import type { Terminal } from 'xterm'

export type ContextInfoTypes = {
  chatLLM: BaseChatModel
  contextVectorStore?: PGLiteVectorStore
  codeVectorStore?: PGLiteVectorStore
  container?: WebContainer
  terminal?: Terminal
  terminalProcess?: WebContainerProcess
  terminalProcessWriter?: WritableStreamDefaultWriter<string>
  prompts?: Record<string, Prompt>
  mpcs?: Mcp[]
  preview: {
    elementRef?: React.MutableRefObject<HTMLIFrameElement | null>
    sendMessage?: (action: string, selector?: string) => Promise<unknown>
  }
}
