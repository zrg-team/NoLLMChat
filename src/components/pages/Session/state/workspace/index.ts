import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { WorkspaceActions, getWorkspaceActions } from './actions'
import { WorkspaceState, defaultWorkspaceState } from './state'

export const useWorkspaceState = create<WorkspaceState & WorkspaceActions>()(
  devtools((set, get) => ({
    ...defaultWorkspaceState,
    ...getWorkspaceActions(set, get),
  })),
)
