import type { Embeddings } from '@langchain/core/embeddings'
import localforage from 'localforage'

export interface LocalEmbeddingState {
  ready: boolean
  embedding?: Embeddings
  embeddingStorage?: typeof localforage
}

export const defaultLocalEmbeddingState: LocalEmbeddingState = {
  ready: false,
  embedding: undefined,
  embeddingStorage: undefined,
}
