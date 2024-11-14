import { useEffect, useRef } from 'react'
import { useSessionState } from 'src/states/session'
import HomeInner from './HomeInner'
import { useFlowState } from 'src/states/flow'

export default function HomeComponent() {
  const currentSession = useSessionState((state) => state.currentSession)
  const resetFlows = useFlowState((state) => state.reset)
  const currentSessionIdRef = useRef(currentSession?.id)
  useEffect(() => {
    if (!currentSession?.id || currentSessionIdRef.current === currentSession?.id) {
      return
    }
    currentSessionIdRef.current = currentSession.id
    resetFlows()
  }, [currentSession?.id, resetFlows])
  return (
    <div className="tw-h-full">
      <HomeInner />
    </div>
  )
}
