import { WebContainer, FileSystemTree } from '@webcontainer/api'
import { SetState, GetState } from 'src/utils/zustand'

import { WebContainerState } from './state'

export interface WebContainerStateActions {
  init: () => Promise<WebContainer | undefined>
  mounts: (files: FileSystemTree) => Promise<void>
  teardown: () => Promise<void>
}

export const getWebContainerStateActions = (
  set: SetState<WebContainerState>,
  get: GetState<WebContainerState>,
): WebContainerStateActions => {
  return {
    init: async () => {
      try {
        const currentWebcontainerInstance = get().webcontainerInstance
        console.log('currentWebcontainerInstance', currentWebcontainerInstance)
        if (currentWebcontainerInstance) {
          return currentWebcontainerInstance
        }
        const webcontainerInstance = await WebContainer.boot({ coep: 'credentialless' })
        set({ webcontainerInstance })
        return webcontainerInstance
      } catch (error) {
        console.warn('Failed init:', error)
      } finally {
        set({ ready: true })
      }
    },
    teardown: async () => {
      const webcontainerInstance = get().webcontainerInstance
      if (webcontainerInstance) {
        webcontainerInstance.teardown()
      }
      set({ webcontainerInstance: undefined })
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
