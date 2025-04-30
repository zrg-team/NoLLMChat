import type { GridviewPanelApi } from 'dockview'

import { useMainVSLiteAppContext } from '../contexts/main'
import type { ContainerInstance, ServerReadyHandler } from '../hooks/use-container'

interface TerminalProps {
  container: ContainerInstance
  panelApi: GridviewPanelApi
  onServerReady?: ServerReadyHandler
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Terminal(_props: TerminalProps) {
  const { ternimalElementRef } = useMainVSLiteAppContext()

  return (
    <div ref={ternimalElementRef} className="w-full h-full vslite-xterm-wrapper nodrag nowheel" />
  )
}
