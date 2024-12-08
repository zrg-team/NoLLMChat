import type { GridviewPanelApi } from 'dockview'
import { usePreventPitchZoom } from 'src/hooks/use-prevent-pitch-zoom'

import { useMainVSLiteAppContext } from '../contexts/main'
import type { ShellInstance, ServerReadyHandler } from '../hooks/useShell'

interface TerminalProps {
  shell: ShellInstance
  panelApi: GridviewPanelApi
  onServerReady?: ServerReadyHandler
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Terminal(_props: TerminalProps) {
  const { ternimalElementRef } = useMainVSLiteAppContext()
  usePreventPitchZoom(ternimalElementRef)

  return (
    <div
      ref={ternimalElementRef}
      className="w-full h-full vslite-xterm-wrapper nodrag nowheel"
    ></div>
  )
}
