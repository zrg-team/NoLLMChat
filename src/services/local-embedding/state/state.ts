import type { Embeddings } from '@langchain/core/embeddings'
import localforage from 'localforage'

export interface LocalEmbeddingState {
  ready: boolean
  localEmbedding?: Embeddings
  embeddingStorage?: typeof localforage
  worker?: Worker
}

export const defaultLocalEmbeddingState: LocalEmbeddingState = {
  ready: false,
  localEmbedding: undefined,
  embeddingStorage: undefined,
  worker: undefined,
}
