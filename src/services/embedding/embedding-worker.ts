import { Voy as VoyClient } from 'voy-search'
import { Document } from '@langchain/core/documents'

import { HuggingFaceTransformersEmbeddings } from '@langchain/community/embeddings/hf_transformers'
import { VoyVectorStore } from '@langchain/community/vectorstores/voy'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'

import { init, listenForMessages, type BaseMessagePayload } from 'src/utils/worker-base'

const embeddings = new HuggingFaceTransformersEmbeddings({
  modelName: 'nomic-ai/nomic-embed-text-v1', // Xenova/all-MiniLM-L6-v2 | nomic-ai/nomic-embed-text-v1
})

const voyClient = new VoyClient()
const vectorstore = new VoyVectorStore(voyClient, embeddings)

type MessagePayload = (
  | {
      type: 'index'
      payload: {
        parameters: Parameters<VoyVectorStore['addDocuments']>
        split?: boolean
        chunkSize?: number
        chunkOverlap?: number
      }
    }
  | {
      type: 'remove'
    }
  | {
      type: 'search'
      payload: Parameters<VoyVectorStore['similaritySearch']>
    }
  | {
      type: 'search-with-score'
      payload: Parameters<VoyVectorStore['similaritySearchWithScore']>
    }
) &
  BaseMessagePayload

async function handlePayload(data: MessagePayload) {
  switch (data.type) {
    case 'index': {
      if (!data.payload.parameters?.length || data.payload.parameters[0].length === 0) {
        throw new Error('No documents provided to index')
      }
      const [input] = data.payload.parameters
      let documents: Document[] = input
      if (data.payload.split) {
        const splitter = new RecursiveCharacterTextSplitter({
          chunkSize: data.payload.chunkSize || 500,
          chunkOverlap: data.payload.chunkOverlap || 50,
        })
        documents = await splitter.splitDocuments(documents)
      }
      return vectorstore.addDocuments(documents)
    }
    case 'remove':
      await vectorstore.delete({ deleteAll: true })
      break
    case 'search': {
      return vectorstore.similaritySearch(...data.payload)
    }
    case 'search-with-score': {
      return vectorstore.similaritySearchWithScore(...data.payload)
    }
    default:
      throw new Error('Invalid operation')
  }
}

// Listen for messages from the main thread
listenForMessages<MessagePayload>(handlePayload)

init()
