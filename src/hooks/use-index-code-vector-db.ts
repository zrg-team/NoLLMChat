import { VectorStore } from '@langchain/core/vectorstores'
import { Document } from '@langchain/core/documents'
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters'
import { emptyExtensions, extensions } from 'src/utils/load-source-file'
import { logDebug } from 'src/utils/logger'

const MAX_CONTENT_LENGTH = 200_000
export const useIndexCodeVectorDB = () => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 0,
    separators: ['\n'],
  })

  const handleIndexVectorDB = async ({
    input,
    deleteFilter,
    vectorStore,
  }: {
    input: { content: string; file: string; metadata?: Record<string, unknown> }[]
    vectorStore: VectorStore
    deleteFilter?: Record<string, unknown>
  }) => {
    const start = Date.now()
    if (Object.keys(deleteFilter || {}).length) {
      const deleteUpdated = await vectorStore?.delete({
        filter: deleteFilter,
      })
      logDebug('[UpdateCodeContainerData] Deleted info', deleteUpdated)
    }
    const documents = input
      .map((doc) => {
        const ext = doc.file.split('.').pop()
        if (!ext || doc.content?.length > MAX_CONTENT_LENGTH) {
          return
        }
        if (extensions.includes(`.${ext}`)) {
          return new Document({
            pageContent: doc.content,
            metadata: {
              ...doc.metadata,
              source: doc.file.replace(/\/\//g, ''),
              type: doc.metadata?.type || 'code',
            },
          })
        } else if (emptyExtensions[`.${ext}`]) {
          return new Document({
            pageContent: 'CONTENT IS HIDEN',
            metadata: {
              ...doc.metadata,
              source: doc.file.replace(/\/\//g, ''),
              type: doc.metadata?.type || 'empty',
            },
          })
        }
        return undefined
      })
      .filter(Boolean) as Document[]
    const splitedDocuments = await splitter.splitDocuments(documents)
    await vectorStore?.addDocuments(splitedDocuments)
    logDebug(`[UpdateCodeContainerData] Update vector store took ${Date.now() - start}ms`)
  }

  return {
    indexVectorDB: handleIndexVectorDB,
  }
}
