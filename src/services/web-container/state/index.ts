import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { WebContainerStateActions, getWebContainerStateActions } from './actions'
import { defaultWebContainerState, WebContainerState } from './state'

export const useWebContainerState = create<WebContainerState & WebContainerStateActions>()(
  devtools((set, get) => ({
    ...defaultWebContainerState,
    ...getWebContainerStateActions(set, get),
  })),
)
