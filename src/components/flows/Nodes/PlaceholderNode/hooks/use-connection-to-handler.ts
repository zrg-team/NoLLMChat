import { useCallback } from 'react'
import { Node, Connection } from '@xyflow/react'
import { useBaseConnectionToHandler } from 'src/hooks/flows/handlers/use-base-connection-to-handler'

export const useConnectionToHandler = (id: string) => {
  const connectionHandler = useCallback(
    async ({ edgeId }: { edgeId: string; source: Node; target: Node; connection: Connection }) => {
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
