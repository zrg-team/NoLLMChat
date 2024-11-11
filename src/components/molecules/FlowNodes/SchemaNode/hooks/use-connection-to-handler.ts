import { useCallback } from 'react'
import { Node } from '@xyflow/react'
import { useBaseConnectionToHandler } from 'src/hooks/handlers/use-base-connection-to-handler'

export const useConnectionToHandler = (id: string) => {
  const connectionHandler = useCallback(
    async ({ edgeId }: { edgeId: string; source: Node; target: Node }) => {
      try {
        return {
          deleteEdgeId: edgeId,
        }
      } catch {
        return {
          deleteEdgeId: edgeId,
        }
      }
    },
    [],
  )

  useBaseConnectionToHandler(id, connectionHandler)
}
