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
    async ({ query, type }) => {
      try {
        let response = ''
        if (type === 'content') {
          const result = await contextVectorStore.searchPostgres([], 100, {
            _text: {
              like: `%${query}%`,
            },
            type: 'CONTEXT',
          })
          response = result
            .map(([doc]) => {
              return `<nhanh_knowledge>${doc.pageContent}</nhanh_knowledge>`
            })
            .join('\n')
        } else if (type === 'similarity') {
          const result = await contextVectorStore.similaritySearchWithScore(query, 20, {
            type: 'CONTEXT',
          })
          response = result
            .map(([doc, score]) => {
              return `<nhanh_knowledge score={${score}}>${doc.pageContent}</nhanh_knowledge>`
            })
            .join('\n')
        }
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
        query: z.string().describe('The query to search for in the codebase.'),
        type: z.enum(['content', 'similarity']).describe(`
  * "content": Search specific content in the codebase, example: "components", "controller", "model", etc. Using Postgres like search.
  * "similarity": semantic search, example: "How to use useState in React?", "How to use useEffect in React?", etc. Using vector search.`),
      }),
    },
  )
}

export * from './constant'
