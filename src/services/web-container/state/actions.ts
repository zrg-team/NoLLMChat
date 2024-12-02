import { WebContainer, FileSystemTree } from '@webcontainer/api'
import { SetState, GetState } from 'src/utils/zustand'

import { WebContainerState } from './state'

export interface WebContainerStateActions {
  init: () => Promise<void>
  mounts: (files: FileSystemTree) => Promise<void>
}

export const getWebContainerStateActions = (
  set: SetState<WebContainerState>,
  get: GetState<WebContainerState>,
): WebContainerStateActions => {
  return {
    init: async () => {
      try {
        if (get().webcontainerInstance) {
          return
        }
        const webcontainerInstance = await WebContainer.boot()
        set({ webcontainerInstance })
      } catch (error) {
        console.warn('Failed init:', error)
      } finally {
        set({ ready: true })
      }
    },
    mounts: async (files) => {
      try {
        const webcontainerInstance = get().webcontainerInstance
        if (!webcontainerInstance) {
          throw new Error('WebContainer instance is not ready')
        }
        await webcontainerInstance.mount(files)
      } catch (error) {
        console.warn('Failed startContainer:', error)
      }
    },
  }
}
