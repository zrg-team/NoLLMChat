import { useCallback } from 'react'
import { Node, useInternalNode } from '@xyflow/react'
import { useCreateThread } from 'src/hooks/flows/mutations/use-create-thread'

import { BasicAgentNodeProps } from '../type'

export const useActions = (id: string, data: BasicAgentNodeProps['data']) => {
  const node = useInternalNode(id) as Node<BasicAgentNodeProps['data']>
  const { createThread, loading: creatingThread } = useCreateThread()

  const handleCreateThread = useCallback(async () => {
    if (data?.entity && node) {
      await createThread(node)
    }
  }, [data?.entity, node, createThread])

  return {
    creatingThread,
    createThread: handleCreateThread,
  }
}
