import { useSessionState } from 'src/states/session'
import { useShallow } from 'zustand/react/shallow'
import { useCallback, useState } from 'react'
import { getRepository } from 'src/services/database'
import { Mcp } from 'src/services/database/types'

import { useWorkspaceState } from '../state/workspace'
import { useChatState } from '../state/chat'

export const useCreateOrUpdateMCP = () => {
  const [loading, setLoading] = useState(false)
  const [param, setParam] = useState<{
    key: string
    url: string
  }>({
    key: '',
    url: '',
  })
  const currentSessionId = useSessionState(useShallow((state) => state.currentSession?.id))

  const createOrUpdate = useWorkspaceState((state) => state.createOrUpdateMCP)
  const clearGraph = useChatState((state) => state.clearGraph)
  const mcps = useWorkspaceState(useShallow((state) => state.mcps))

  const createOrUpdateMCP = useCallback(
    async (mcp: Pick<Mcp, 'key' | 'url'>) => {
      try {
        if (!currentSessionId) {
          return
        }
        setLoading(true)
        const existingMCP = mcps.find((item) => item.key === mcp.key)
        if (existingMCP) {
          const updated = await getRepository('Mcp').update(existingMCP.id, {
            ...existingMCP,
            ...mcp,
          })
          if (updated?.affected) {
            createOrUpdate({ ...existingMCP, ...mcp })
            setParam({
              key: '',
              url: '',
            })
            clearGraph()
          }
        } else {
          const result = await getRepository('Mcp').save({
            ...mcp,
            session_id: currentSessionId,
          })
          if (result) {
            createOrUpdate(result)
            setParam({
              key: '',
              url: '',
            })
            clearGraph()
          }
        }
      } finally {
        setLoading(false)
      }
    },
    [currentSessionId, mcps, setParam],
  )

  return {
    loading,
    param,
    setParam,
    createOrUpdateMCP,
  }
}
