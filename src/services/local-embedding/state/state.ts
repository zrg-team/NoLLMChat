import type { Embeddings } from '@langchain/core/embeddings'

export interface LocalEmbeddingState {
  ready: boolean
  localEmbedding?: Embeddings
  worker?: Worker
}

export const defaultLocalEmbeddingState: LocalEmbeddingState = {
  ready: false,
  localEmbedding: undefined,
  worker: undefined,
}
