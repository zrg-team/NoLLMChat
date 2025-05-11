import { tool } from '@langchain/core/tools'
import { TOOL_DESCRIPTION, TOOL_NAME } from './constant'
import { z } from 'zod'
import { logDebug, logError } from 'src/utils/logger'
import { FileSystemTreeChange } from 'src/services/web-container/utils/file-tree'

import { WebContainer } from '@webcontainer/api'

const formatPath = (path: string) => {
  if (!path) {
    return ''
  }
  return !path?.startsWith('./') ? `./${path}` : path?.startsWith('/') ? `.${path}` : path
}
export const getWriteCodeFileToEditorTool = ({ container }: { container?: WebContainer }) => {
  return tool(
    async ({ code, filePath }) => {
      try {
        if (code && filePath) {
          const changes: FileSystemTreeChange[] = []
          await container?.fs.writeFile(formatPath(filePath), code.trimStart()).catch((e) => {
            logError('[WriteCodeFileTool] Error when write file', e)
          })
          if (changes?.length) {
            logDebug(
              `[WriteCodeFileTool] Changes ${changes.map((c) => `${c.type || 'create_or_update'}:${c.path}`).join(', ')}`,
              changes,
            )
          }
        }
        return 'Done!'
      } catch (error) {
        logError('[WriteCodeFileTool] Error', error)
        return `Write code file failed with error ${String(error)}`
      }
    },
    {
      name: TOOL_NAME,
      description: TOOL_DESCRIPTION,
      schema: z.object({
        code: z
          .string()
          .describe(
            'Code to write in the file. Important: only code nothing else, no codeblock, quote, etc.',
          ),
        filePath: z.string().describe('Path to the file to write.'),
      }),
    },
  )
}

export * from './constant'
