import { create } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import { FlowStateActions, getFlowStateActions } from './actions'
import { FlowState, defaultFlowState } from './state'

export const useFlowState = create<FlowState & FlowStateActions>()(
  subscribeWithSelector(
    devtools((set, get) => ({
      ...defaultFlowState,
      ...getFlowStateActions(set, get),
    })),
  ),
)
