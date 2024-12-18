import { useEffect, useLayoutEffect } from 'react'
import { useFlowManager } from 'src/hooks/flows/handlers/use-flow-manager'
import { useFlowState } from 'src/states/flow'
import { useSessionState } from 'src/states/session'

export const useAutomaticallyRenderFlows = (flowManager: ReturnType<typeof useFlowManager>) => {
  const currentSessionId = useSessionState((state) => state.currentSession?.id)
  const { loadingState, prepareFlowInfo, syncEdges, initialFlow, currentSessionIdRef } = flowManager

  const flowStateReady = useFlowState((state) => state.ready)
  const removeSyncNodeQueue = useFlowState((state) => state.removeSyncNodeQueue)
  const removeSyncEdgeQueue = useFlowState((state) => state.removeSyncEdgeQueue)

  useLayoutEffect(() => {}, [currentSessionId])

  useEffect(() => {
    if (
      loadingState.loading ||
      !flowStateReady ||
      !currentSessionId ||
      currentSessionIdRef.current === currentSessionId
    ) {
      return
    }
    initialFlow(currentSessionId, async () => {
      await prepareFlowInfo({
        where: {
          session_id: currentSessionId,
        },
      })
    })
  }, [
    initialFlow,
    prepareFlowInfo,
    loadingState.loading,
    currentSessionIdRef,
    flowStateReady,
    currentSessionId,
  ])

  useEffect(() => {
    const unsubNodeHandler = useFlowState.subscribe(
      (state) => state.syncNodeQueue,
      async (syncNodeQueue, previousSyncNodeQueue) => {
        const lastTimestamps = previousSyncNodeQueue.map((node) => node.timestamp)
        const handlingQueueItems = syncNodeQueue.filter(
          (item) => !lastTimestamps.includes(item.timestamp),
        )
        if (handlingQueueItems.length) {
          removeSyncNodeQueue(handlingQueueItems.map((item) => item.timestamp))
        }
      },
    )
    const unsubEdgeHandler = useFlowState.subscribe(
      (state) => state.syncEdgeQueue,
      async (syncEdgeQueue, previousSyncEdgeQueue) => {
        const lastTimestamps = previousSyncEdgeQueue.map((node) => node.timestamp)
        const handlingQueueItems = syncEdgeQueue.filter(
          (item) => !lastTimestamps.includes(item.timestamp),
        )
        if (handlingQueueItems.length) {
          removeSyncEdgeQueue(handlingQueueItems.map((item) => item.timestamp))
          syncEdges()
        }
      },
    )

    return () => {
      unsubNodeHandler()
      unsubEdgeHandler()
    }
  }, [prepareFlowInfo, removeSyncEdgeQueue, removeSyncNodeQueue, syncEdges])
}
