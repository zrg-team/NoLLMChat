import { WebContainer, FileSystemTree } from '@webcontainer/api'
import { SetState, GetState } from 'src/utils/zustand'
import { logWarn } from 'src/utils/logger'

import { WebContainerState } from './state'

export interface WebContainerStateActions {
  init: (func: () => void) => Promise<WebContainer | undefined>
  mounts: (files: FileSystemTree) => Promise<void>
  teardown: () => Promise<void>
}

export const getWebContainerStateActions = (
  set: SetState<WebContainerState>,
  get: GetState<WebContainerState>,
): WebContainerStateActions => {
  return {
    init: async (onWebContainerTeardown) => {
      try {
        let currentWebcontainerInstance = get().webcontainerInstance
        if (currentWebcontainerInstance) {
          const currentOnWebContainerTeardown = get().onWebContainerTeardown
          currentWebcontainerInstance.teardown()
          currentOnWebContainerTeardown?.()
          currentWebcontainerInstance = undefined
          await new Promise((resolve) => setTimeout(resolve, 250))
        }
        const webcontainerInstance = await WebContainer.boot({ coep: 'credentialless' })
        set({ webcontainerInstance, onWebContainerTeardown })
        return webcontainerInstance
      } catch (error) {
        logWarn('Failed init:', error)
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
        logWarn('Failed startContainer:', error)
      }
    },
  }
}
