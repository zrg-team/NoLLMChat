import { useRef, useState, useCallback } from 'react'

import type { GridviewPanelApi } from 'dockview'
import type { ShellInstance, ServerReadyHandler } from '../hooks/useShell'
import { Button } from 'src/lib/shadcn/ui/button'

interface TerminalProps {
  shell: ShellInstance
  panelApi: GridviewPanelApi
  onServerReady: ServerReadyHandler
}

export function Terminal(props: TerminalProps) {
  const { shell } = props
  const [init, setInit] = useState(false)
  const root = useRef<HTMLDivElement>(null)

  const startShell = useCallback(async () => {
    shell.start(root.current!, props.panelApi, props.onServerReady)
    setInit(true)
  }, [props.onServerReady, props.panelApi, shell])

  return (
    <>
      {!init ? (
        <div className="w-full h-full flex justify-center items-center">
          <Button onClick={startShell}>Start</Button>
        </div>
      ) : undefined}
      <div ref={root} className="w-full h-full"></div>
    </>
  )
}
