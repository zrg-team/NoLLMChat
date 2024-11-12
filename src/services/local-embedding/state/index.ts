import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { LocalEmbeddingStateActions, getLocalEmbeddingStateActions } from './actions'
import { defaultLocalEmbeddingState, LocalEmbeddingState } from './state'

export const useLocalEmbeddingState = create<LocalEmbeddingState & LocalEmbeddingStateActions>()(
  devtools((set, get) => ({
    ...defaultLocalEmbeddingState,
    ...getLocalEmbeddingStateActions(set, get),
  })),
)
