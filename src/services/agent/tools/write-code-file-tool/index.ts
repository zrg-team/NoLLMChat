import { tool } from '@langchain/core/tools'
import { Document } from '@langchain/core/documents'
import { TOOL_DESCRIPTION, TOOL_NAME } from './constant'
import { z } from 'zod'
import { PGLiteVectorStore } from 'src/lib/langchain-pglite-vector-store'
import { BaseChatModel } from '@langchain/core/language_models/chat_models'
import {
  AIMessage,
  HumanMessage,
  MessageContentComplex,
  SystemMessage,
} from '@langchain/core/messages'
import { logDebug, logError } from 'src/utils/logger'
import { FileSystemTreeChange } from 'src/services/web-container/utils/file-tree'

import { SYSTEM_PROMPT } from './prompt'
import { WebContainer } from '@webcontainer/api'

const formatPath = (path: string) => {
  if (!path) {
    return ''
  }
  return !path?.startsWith('./') ? `./${path}` : path?.startsWith('/') ? `.${path}` : path
}
export const getWriteCodeFileTool = ({
  chatLLM,
  container,
  codeVectorStore,
}: {
  chatLLM: BaseChatModel
  container?: WebContainer
  codeVectorStore: PGLiteVectorStore
}) => {
  return tool(
    async ({ notice, requirement, filePath, referenceFiles, imageURL, detail }) => {
      const fileDocuments = await codeVectorStore.searchPostgres([], 10, {
        source: {
          like: `%${filePath}%`,
        },
      })
      let fileToWrite: Document | undefined
      if (fileDocuments?.length) {
        fileToWrite = new Document({
          pageContent: '',
          metadata: {
            source: filePath,
          },
        })
        fileDocuments
          .sort((a, b) => {
            return a[0].metadata.loc.lines.from - b[0].metadata.loc.lines.from
          })
          .forEach(([item]) => {
            if (item.metadata.source.includes(filePath) && fileToWrite) {
              fileToWrite.pageContent += item.pageContent
            }
          })
      }

      const references: Document[] = []
      await Promise.all(
        referenceFiles.map(async (file) => {
          const result = await codeVectorStore.searchPostgres([], 10, {
            source: {
              like: `%${file}%`,
            },
          })
          if (!result?.length) {
            return
          }
          const doc = new Document({
            pageContent: '',
            metadata: {
              source: file,
            },
          })
          result
            .sort((a, b) => {
              return a[0].metadata.loc.lines.from - b[0].metadata.loc.lines.from
            })
            .forEach(([item]) => {
              if (item.metadata.source.includes(file)) {
                doc.pageContent += item.pageContent
              }
            })
          references.push(doc)
        }),
      )
      const input = [new SystemMessage(SYSTEM_PROMPT)]
      if (references?.length) {
        input.push(
          new AIMessage(
            [
              'Below is the files that might related to the requiment or can use as a reference.',
              ...references.map((doc) => {
                return `<nhanh_code><nhanh_path>${doc.metadata.source}</nhanh_path><nhanh_content>\n${doc.pageContent}\n</nhanh_content></nhanh_code>`
              }),
            ].join('\n'),
          ),
        )
      }
      const messageContent: MessageContentComplex[] = [
        {
          type: 'text',
          text: [
            `Please write the code for the file ${filePath} with the below requirement:`,
            requirement,
            imageURL ? `Image to implement attached` : '',
            ...(notice || detail
              ? ['Notice or Detail information:', notice || '', detail || '']
              : []),
            ...(fileToWrite
              ? [
                  'Below is the file that you need to write code for.',
                  `<nhanh_code><nhanh_path>${fileToWrite.metadata.source}</nhanh_path><nhanh_content>\n${fileToWrite.pageContent}\n</nhanh_content></nhanh_code>`,
                ]
              : []),
          ].join('\n'),
        },
      ]
      if (imageURL) {
        messageContent.push({
          type: 'image_url',
          image_url: {
            url: imageURL,
            detail: 'auto',
          },
        })
      }
      input.push(
        new HumanMessage({
          content: messageContent,
        }),
      )
      const response = await chatLLM.invoke(input)
      const codeBlockRegex = /<nhanh_code>([\s\S]*?)<\/nhanh_code>/g
      const codeBlocks = `${response.content}`.match(codeBlockRegex)
      if (codeBlocks?.length) {
        const changes: FileSystemTreeChange[] = []
        for (const codeBlock of codeBlocks) {
          const contentRegex = /<nhanh_content>([\s\S]*?)<\/nhanh_content>/g
          const pathRegex = /<nhanh_path>([\s\S]*?)<\/nhanh_path>/g
          const pathMatch = pathRegex.exec(codeBlock)
          const contentMatch = contentRegex.exec(codeBlock)
          if (pathMatch?.length && contentMatch?.length) {
            const path = pathMatch[1]
            const content = contentMatch[1]
            changes.push({
              type: 'create_or_update',
              path: formatPath(path),
              content: content.trimStart(),
            })
            await container?.fs.writeFile(formatPath(path), content.trimStart()).catch((e) => {
              logError('[WriteCodeFileTool] Error when write file', e)
            })
          }
        }
        if (changes?.length) {
          logDebug(
            `[WriteCodeFileTool] Changes ${changes.map((c) => `${c.type || 'create_or_update'}:${c.path}`).join(', ')}`,
            changes,
          )
        }
      }
      return `${response.content}`
    },
    {
      name: TOOL_NAME,
      description: TOOL_DESCRIPTION,
      schema: z.object({
        requirement: z.string().describe('Specific requirements to write code of a file.'),
        notice: z.string().optional().describe('Notice to write code of a file.'),
        detail: z
          .string()
          .optional()
          .describe(
            'Detail information to write code. Example: model name, color, text size, background color, size, etc.',
          ),
        filePath: z.string().describe('Path to the file to write.'),
        imageURL: z
          .string()
          .optional()
          .describe(
            'URL of the image to write code. To access or implement UI from image, Figma you must provide this.',
          ),
        referenceFiles: z
          .array(z.string())
          .describe(
            'List of reference files needed to read before writing the code or can use as a reference. Please always provide file to reference coding style, convention, and other information that can help to write code.',
          ),
      }),
    },
  )
}

export * from './constant'
