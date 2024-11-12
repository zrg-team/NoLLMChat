import { useCallback } from 'react'

import { useBaseConnectionToHandler } from 'src/hooks/handlers/use-base-connection-to-handler'

export const useConnectionToHandler = (id: string) => {
  const handleConnectionTo = useCallback(async () => {
    return undefined
  }, [])
  useBaseConnectionToHandler(id, handleConnectionTo)
}
