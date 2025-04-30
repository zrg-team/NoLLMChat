import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { VSLiteApplicationActions, getVSLiteApplicationActions } from './actions'
import { VSLiteApplicationState, defaultVSLiteApplicationState } from './state'

export const useVSLiteApplicationState = create<
  VSLiteApplicationState & VSLiteApplicationActions
>()(
  devtools((set, get) => ({
    ...defaultVSLiteApplicationState,
    ...getVSLiteApplicationActions(set, get),
  })),
)
