import { useRef, useState, useCallback } from 'react'

import type { GridviewPanelApi } from 'dockview'
import { usePreventPitchZoom } from 'src/hooks/use-prevent-pitch-zoom'
import LoadingButton from 'src/components/atoms/LoadingButton'

import { useMainVSLiteAppContext } from '../contexts/main'
import type { ShellInstance, ServerReadyHandler } from '../hooks/useShell'
import { useTranslation } from 'react-i18next'

interface TerminalProps {
  shell: ShellInstance
  panelApi: GridviewPanelApi
  onServerReady: ServerReadyHandler
}

export function Terminal(props: TerminalProps) {
  const { t } = useTranslation('components')
  const { shell } = props
  const { container } = useMainVSLiteAppContext()
  const [loading, seLoading] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  usePreventPitchZoom(rootRef)

  const startShell = useCallback(async () => {
    seLoading(true)
    shell.start(rootRef.current!, props.panelApi, props.onServerReady, () => {
      seLoading(false)
    })
  }, [props.onServerReady, props.panelApi, shell])

  return (
    <>
      {!container ? (
        <div className="w-full h-full flex justify-center items-center">
          <LoadingButton loading={loading} onClick={startShell}>
            {t('vslite.load_app_container')}
          </LoadingButton>
        </div>
      ) : undefined}
      <div ref={rootRef} className="w-full h-full vslite-xterm-wrapper nodrag nowheel"></div>
    </>
  )
}
