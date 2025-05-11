import { tool } from '@langchain/core/tools'
import { TOOL_DESCRIPTION, TOOL_NAME } from './constant'
import { z } from 'zod'
import { PGLiteVectorStore } from 'src/lib/langchain-pglite-vector-store'
import { logError } from 'src/utils/logger'

export const getKnowledgeRetrievalTool = ({
  contextVectorStore,
}: {
  contextVectorStore: PGLiteVectorStore
}) => {
  return tool(
    async ({ query }) => {
      try {
        const result = await contextVectorStore.similaritySearchWithScore(query, 20, {
          type: 'CONTEXT',
        })
        const response = result
          .map(([doc, score]) => {
            return `<nhanh_knowledge score={${score}}>${doc.pageContent}</nhanh_knowledge>`
          })
          .join('\n')
        if (!response) {
          return 'No result found'
        }
        return [response].join('\n')
      } catch (error) {
        logError(`[GetKnowledgeRetrievalTool] Error`, error)
        return `Get knowledge failed with error ${error}`
      }
    },
    {
      name: TOOL_NAME,
      description: TOOL_DESCRIPTION,
      schema: z.object({
        query: z.string().describe('The query to search for in the knowledge base.'),
      }),
    },
  )
}

export * from './constant'
