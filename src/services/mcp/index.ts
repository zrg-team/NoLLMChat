/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod'
import { JsonSchema, jsonSchemaToZod } from 'json-schema-to-zod'
import { DynamicStructuredTool } from '@langchain/core/tools'
import { MultiServerMCPClient } from '@langchain/mcp-adapters'
import type { Mcp } from 'src/services/database/types'

const PROTOCOL = 'sse' as 'sse' | 'stdio'
const urlToProtocol = (url: string) => {
  let response = url
  switch (PROTOCOL) {
    case 'sse':
      response = url.endsWith('/') ? `${url}sse` : `${url}/sse`
      break
    case 'stdio':
      response = url.endsWith('/') ? `${url}` : `${url}`
      break
  }
  return response.replace(/\/\//g, '/')
}
export const getMCPClientTools = async (
  mpcs: Mcp[],
  options?: {
    globalThrowOnLoadError?: boolean
    throwOnLoadError?: boolean
    prefixToolNameWithServerName?: boolean
    additionalToolNamePrefix?: string
  },
): Promise<DynamicStructuredTool[]> => {
  try {
    const client = new MultiServerMCPClient({
      // Global tool configuration options
      // Whether to throw on errors if a tool fails to load (optional, default: true)
      throwOnLoadError: options?.throwOnLoadError ?? true,
      // Whether to prefix tool names with the server name (optional, default: true)
      prefixToolNameWithServerName: options?.prefixToolNameWithServerName ?? true,
      // Optional additional prefix for tool names (optional, default: "mcp")
      additionalToolNamePrefix: options?.additionalToolNamePrefix ?? 'mcp',
      // Server configuration
      mcpServers: {
        // SSE transport example with reconnection configuration
        ...mpcs.reduce((acc: Record<string, any>, mcp) => {
          acc[mcp.key] = {
            transport: PROTOCOL,
            url: urlToProtocol(mcp.url),
            type: PROTOCOL,
            headers: {},
            useNodeEventSource: false,
            reconnect: {
              enabled: false,
              maxAttempts: 5,
              delayMs: 2000,
            },
          }
          return acc
        }, {}),
      },
    })

    const tools = await client.getTools()
    for (const index in tools) {
      const tool = tools[index]
      const zodObject = new Function(
        'z',
        `return (${jsonSchemaToZod(tool.schema as JsonSchema)});`,
      )(z)
      tool.schema = zodObject
    }

    return tools as DynamicStructuredTool[]
  } catch (error) {
    if (options?.globalThrowOnLoadError) {
      throw error
    }
    // Log the error and return an empty array if globalThrowOnLoadError is false
    console.error('Error creating MCP client tools:', error)
    return []
  }
}
