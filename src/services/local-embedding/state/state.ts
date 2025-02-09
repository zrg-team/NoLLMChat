import type { Embeddings } from '@langchain/core/embeddings'
import localforage from 'localforage'

export interface LocalEmbeddingState {
  ready: boolean
  localEmbedding?: Embeddings
  embeddingStorage?: typeof localforage
}

export const defaultLocalEmbeddingState: LocalEmbeddingState = {
  ready: false,
  localEmbedding: undefined,
  embeddingStorage: undefined,
}
