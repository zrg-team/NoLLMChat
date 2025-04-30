import { tool } from '@langchain/core/tools'
import { TOOL_DESCRIPTION, TOOL_NAME } from './constant'
import { z } from 'zod'
import { PGLiteVectorStore } from 'src/lib/langchain-pglite-vector-store'
import { filePathsToTree, treeToString } from 'file-paths-to-tree'
import { logError } from 'src/utils/logger'

export const getSourceStructureTool = ({
  contextVectorStore,
  codeVectorStore,
}: {
  codeVectorStore: PGLiteVectorStore
  contextVectorStore: PGLiteVectorStore
}) => {
  return tool(
    async ({ query, type }) => {
      try {
        let response = ''
        if (type === 'all') {
          const result = await contextVectorStore.searchPostgres([], 10000, {
            type: 'PATH',
          })
          const paths = [
            ...new Set(
              result
                .flatMap(([doc]) => {
                  return doc.pageContent.split('\n').map((line) => line.trim())
                })
                .filter(Boolean),
            ),
          ]
          response = paths?.length ? treeToString(filePathsToTree(paths)) : ''
        } else if (type === 'similarity') {
          const result = await contextVectorStore.similaritySearchWithScore(query || '', 20, {
            type: 'PATH',
          })
          const paths = [
            ...new Set(
              result.flatMap(([doc]) => {
                return doc.metadata.source
              }),
            ),
          ].filter(Boolean)
          response = paths?.length ? treeToString(filePathsToTree(paths)) : ''
        } else if (type === 'path') {
          const result = await codeVectorStore.searchPostgres([], 100, {
            source: {
              like: `%${query}%`,
            },
          })
          const paths = [...new Set(result.map(([doc]) => doc.metadata.source))].filter(Boolean)
          response = paths?.length ? treeToString(filePathsToTree(paths)) : ''
        }
        if (!response) {
          return 'No result found'
        }
        return ['```', response, '```'].join('\n')
      } catch (error) {
        logError(`[GetSourceStructureTool] Error`, error)
        return `Get source structure failed with error ${error}`
      }
    },
    {
      name: TOOL_NAME,
      description: TOOL_DESCRIPTION,
      schema: z.object({
        query: z.string().optional().describe('The query to search for in the codebase.'),
        type: z.enum(['all', 'similarity', 'path']).describe(`
  * "all": List tree structure of this project. It will be cut off if the number of files is too large. Leave the query empty to get all files.
  * "similarity": similarity query using multiple information, example: "components product-detail-data", "controller user", "model todo", etc.
  * "path": full path of file or exact file name or folders name, etc`),
      }),
    },
  )
}

export * from './constant'
