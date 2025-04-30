import type { WebContainer, WebContainerProcess } from '@webcontainer/api'
import type { Terminal } from 'xterm'
import { SetState, GetState } from 'src/utils/zustand'

import { defaultVSLiteApplicationState, FileTreeState, VSLiteApplicationState } from './state'

export interface VSLiteApplicationActions {
  setContainer?: (container?: WebContainer) => void
  setTerminal?: (terminal?: Terminal) => void
  setFileTreeState?: (fileSystemTreeState?: FileTreeState) => void
  setContainerPreviewInfo?: (info: { url?: string; port?: number }) => void
  setTerminalProcess?: (process?: WebContainerProcess) => void
  setTerminalProcessWriter?: (writer?: WritableStreamDefaultWriter<string>) => void
  setPreviewElementRef?: (ref: React.MutableRefObject<HTMLIFrameElement | null>) => void

  setReady?: (ready: boolean) => void
  initState?: (data: Partial<VSLiteApplicationState>) => void
  reset: () => void
}

export const getVSLiteApplicationActions = (
  set: SetState<VSLiteApplicationState>,
  get: GetState<VSLiteApplicationState & VSLiteApplicationActions>,
): VSLiteApplicationActions => {
  return {
    setContainer: (container) => {
      set({ container })
    },
    setTerminal: (terminal) => {
      set({ terminal })
    },
    setTerminalProcess: (process) => {
      set({ terminalProcess: process })
    },
    setContainerPreviewInfo: (info: { url?: string; port?: number }) => {
      set({ containerPreviewInfo: info })
    },
    setReady: (ready: boolean) => {
      set({ ready: ready })
    },
    setPreviewElementRef: (ref: React.MutableRefObject<HTMLIFrameElement | null>) => {
      set({ previewElementRef: ref })
    },
    initState: (info) => {
      const currentInfo = get()
      set({ ...currentInfo, ...info })
    },
    reset: () => {
      set(JSON.parse(JSON.stringify(defaultVSLiteApplicationState)))
    },
    setFileTreeState: (fileSystemTree) => {
      set({ fileTreeState: fileSystemTree })
    },
    setTerminalProcessWriter: (writer) => {
      set({ terminalProcessWriter: writer })
    },
  }
}
