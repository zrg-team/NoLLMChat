import { tool } from '@langchain/core/tools'
import { z } from 'zod'
import type { Terminal } from 'xterm'
import type { WebContainer, WebContainerProcess } from '@webcontainer/api'

import { TOOL_DESCRIPTION, TOOL_NAME } from './constant'
import { logError } from 'src/utils/logger'

const MAX_LINE_LENGTH = 1000
const MAX_WAIT_TIME = 2 * 60 * 1000 // 3 minutes
function getLatestTerminalContent(terminal: Terminal, numberOfLines: number): string {
  if (!terminal || !terminal.buffer) {
    throw new Error('Terminal or buffer is not available')
  }
  const buffer = terminal.buffer.active
  let content = ''

  // Determine the starting line index
  // Start from the maximum of 0 and (total lines - number of lines requested)
  const startLine = Math.max(0, buffer.length - numberOfLines)

  // Iterate through the last 'numberOfLines' or fewer lines
  for (let i = startLine; i < buffer.length; i++) {
    const line = buffer.getLine(i)
    if (line) {
      content += line.translateToString().substring(0, MAX_LINE_LENGTH)
      if (i < buffer.length - 1) {
        // Add a newline character between lines
        content += '\n'
      }
    }
  }

  return content
}

export const getTernimalTool = ({
  terminal,
  terminalProcessWriter,
  container,
}: {
  terminal: Terminal
  terminalProcessWriter?: WritableStreamDefaultWriter<string>
  container: WebContainer
}) => {
  return tool(
    async ({ command, action, args, async }) => {
      switch (action) {
        case 'read': {
          const result = await getLatestTerminalContent(terminal, 50)
          return ['```', result, '```'].join('\n')
        }
        case 'execute': {
          let process: WebContainerProcess | undefined
          let timeout: NodeJS.Timeout | undefined
          try {
            if (async) {
              const commandString = [command, ...(args || [])].join(' ')
              if (terminalProcessWriter) {
                terminalProcessWriter.write(commandString)
              }
              return 'Because this command is a long-running process so added to terminal please run in manually.'
            }
            let log = ''
            const process = await container.spawn(command, args || [])

            process.output.pipeTo(
              new WritableStream({
                async write(data) {
                  const type: string = data.split(':')[0] || ''
                  if (type === 'stdout') {
                    log += data.split(':')[1] || ''
                  } else if (type === 'stderr') {
                    log += data.split(':')[1] || ''
                  }
                  terminal.write(data)
                },
              }),
            )

            let existCode = 0
            await Promise.race([
              process.exit.then((code) => {
                existCode = code
                terminal.writeln(`\nProcess exited with code ${code}`)
              }),
              new Promise((_, reject) => {
                timeout = setTimeout(() => {
                  reject(new Error('TIMEOUT'))
                }, MAX_WAIT_TIME)
              }),
            ])

            return [`Exit code: ${existCode}`, `\`\`\``, log, `\`\`\``].join('\n')
          } catch (error) {
            logError(`[TerminalTool] Error:`, error)
            if (error instanceof Error && error.message === 'TIMEOUT') {
              return 'Command timed out after 3 minutes.'
            } else if (error instanceof Error && error.message === 'CANCELED') {
              return 'Command canceled.'
            } else if (error instanceof Error) {
              return `Command failed: ${error.message}`
            }
            throw error
          } finally {
            if (timeout) {
              clearTimeout(timeout)
            }
            // Cleanup
            if (process) {
              await process.kill()
            }
          }
        }
      }
    },
    {
      name: TOOL_NAME,
      description: TOOL_DESCRIPTION,
      schema: z.object({
        action: z.enum(['read', 'execute']).describe('Action to perform.'),
        command: z.string().describe('Command to execute. if action is execute. Example: "npm"'),
        args: z
          .array(z.string())
          .optional()
          .describe(
            'Arguments to pass to the command. Noted: please try to add automatically confirm argument as much as possible (Like: -y, --yes, etc based on command). Example: ["-y", "chokidar-cli", "."]',
          ),
        async: z
          .boolean()
          .optional()
          .describe('Always true if it long running command, like "npm run dev", etc'),
      }),
    },
  )
}

export * from './constant'
