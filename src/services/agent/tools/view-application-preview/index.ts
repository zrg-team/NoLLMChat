import { tool } from '@langchain/core/tools'
import { TOOL_DESCRIPTION, TOOL_NAME } from './constant'
import { z } from 'zod'
import type { WebContainer } from '@webcontainer/api'
import { logError } from 'src/utils/logger'

export const getViewApplicationPreview = ({
  container,
  preview,
}: {
  container?: WebContainer
  preview?: {
    sendMessage?: (action: string, selector?: string) => Promise<unknown>
  }
}) => {
  return tool(
    async () => {
      try {
        if (!container) {
          return 'Not exist. It might because the application is not yet start.'
        }
        const eventResponse = (await preview?.sendMessage?.('GET_CURRENT_HTML')) as {
          html?: string
        }

        if (!eventResponse?.html) {
          return 'Not exist. It might because the application is not yet start.'
        }
        return ['```html', eventResponse?.html, '```'].join('\n')
      } catch (e) {
        logError('[GetViewApplicationPreview] Error when get HTML content', e)
        return 'Error when get HTML content. Might because the application is not yet start.'
      }
    },
    {
      name: TOOL_NAME,
      description: TOOL_DESCRIPTION,
      schema: z.object({}),
    },
  )
}

export * from './constant'
