import { tool } from '@langchain/core/tools'
import { z } from 'zod'
import { PGLiteVectorStore } from 'src/lib/langchain-pglite-vector-store'

import { TOOL_DESCRIPTION, TOOL_NAME } from './constant'

export const getCodeSearchTool = ({ codeVectorStore }: { codeVectorStore: PGLiteVectorStore }) => {
  return tool(
    async ({ query, type }) => {
      let response = ''
      if (type === 'content') {
        const result = await codeVectorStore.searchPostgres([], 100, {
          _text: {
            like: `%${query}%`,
          },
        })
        response = [
          result.map(([doc]) => {
            return `<nhanh_code><nhanh_path>${doc.metadata.source}</nhanh_path><nhanh_content>\n${doc.pageContent}\n</nhanh_content></nhanh_code>`
          }),
        ].join('\n')
      } else if (type === 'path') {
        const result = await codeVectorStore.searchPostgres([], 100, {
          source: {
            like: `%${query}%`,
          },
        })
        response = [
          result.map(([doc]) => {
            return `<nhanh_code><nhanh_path>${doc.metadata.source}</nhanh_path><nhanh_content>\n${doc.pageContent}\n</nhanh_content></nhanh_code>`
          }),
        ].join('\n')
      } else {
        return 'Invalid type. Please use "content" or "similarity" or "path".'
      }

      if (!response?.trim()) {
        return 'No results found.'
      }
      return response
    },
    {
      name: TOOL_NAME,
      description: TOOL_DESCRIPTION,
      schema: z.object({
        query: z.string().describe('The query to search for in the codebase.'),
        type: z
          .enum(['content', 'path'])
          .describe('Type of search to perform. Content search will search for the exact content.'),
      }),
    },
  )
}

export * from './constant'
