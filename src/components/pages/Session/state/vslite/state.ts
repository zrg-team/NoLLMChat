import type { FileSystemTree, WebContainer, WebContainerProcess } from '@webcontainer/api'
import { Ref } from 'react'
import type { TreeEnvironmentRef } from 'react-complex-tree'
import type { Terminal } from 'xterm'

export type FileTreeState = {
  fileSystemTree?: FileSystemTree
  refresh: (...args: unknown[]) => void
  treeEnv: Ref<TreeEnvironmentRef<unknown, never>>
}

export interface VSLiteApplicationState {
  containerPreviewInfo?: { url?: string; port?: number }
  container?: WebContainer
  terminal?: Terminal
  terminalProcess?: WebContainerProcess
  terminalProcessWriter?: WritableStreamDefaultWriter<string>
  ready?: boolean
  fileTreeState?: FileTreeState
  previewElementRef?: React.MutableRefObject<HTMLIFrameElement | null>
}

export const defaultVSLiteApplicationState: VSLiteApplicationState = {}
