import { DockviewReact, GridviewReact, PaneviewReact } from 'dockview'
import { FunctionComponent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useAppState } from 'src/states/app'
import LoadingButton from 'src/components/atoms/LoadingButton'
import { useTranslation } from 'react-i18next'
import { DefaultLoader } from 'src/components/atoms/DefaultLoader'
import type { FileSystemAPI } from '@webcontainer/api'
import type {
  DockviewApi,
  GridviewApi,
  PaneviewApi,
  IGridviewPanelProps,
  IPaneviewPanelProps,
  IDockviewPanelProps,
} from 'dockview'

import { Editor } from './Editor'
import { FileTree } from './FileTree'
import { Terminal } from './Terminal'
import { Watermark } from './Watermark'
import { useStartup } from '../hooks/useStartup'
import * as panels from '../modules/panels'
import type { ShellInstance } from '../hooks/useShell'
import { Preview } from './Preview'
import { useMainVSLiteAppContext } from '../contexts/main'
import Copilot from './Copilot'

export function Dock({ autoLoad, hideAppName }: { autoLoad?: boolean; hideAppName?: boolean }) {
  const { t } = useTranslation('components')
  const [loading, setLoading] = useState(false)
  const loadingRef = useRef(loading)
  const grid = useRef<GridviewApi>()
  const dock = useRef<DockviewApi>()
  const panes = useRef<PaneviewApi>()
  const isDarkTheme = useAppState((state) => state.theme === 'dark')
  const { container, ternimalElementRef, layoutReady, setLayoutReady, llm } =
    useMainVSLiteAppContext()

  loadingRef.current = loading

  const { shell } = useStartup(layoutReady, grid, dock, panes, { hideAppName })
  const startShell = useCallback(async () => {
    const terminalPanel = grid?.current?.getPanel('terminal')?.api
    if (
      !dock.current ||
      !panes.current ||
      !grid.current ||
      !ternimalElementRef.current ||
      !terminalPanel ||
      loadingRef.current
    ) {
      return
    }
    setLoading(true)
    shell.start(
      ternimalElementRef.current!,
      terminalPanel,
      panels.createPreviewOpener(dock.current),
      () => {
        setLoading(false)
      },
    )
  }, [dock, panes, grid, shell, ternimalElementRef])

  useEffect(() => {
    if (grid.current && dock.current && !grid.current.getPanel('copilot') && llm) {
      panels.openCopilot(shell, grid.current, dock.current)
    }
  }, [llm, shell])

  useEffect(() => {
    if (autoLoad) {
      startShell()
    }
  }, [autoLoad, startShell])

  const mainDock = useMemo(() => {
    return (
      <GridviewReact
        className={isDarkTheme ? 'dockview-theme-dark' : 'dockview-theme-light'}
        components={gridComponents}
        proportionalLayout={false}
        onReady={(event) => {
          grid.current = event.api
          panels.openDock(event.api, dock)
          panels.openPanes(event.api, panes)
          setLayoutReady?.(true)
        }}
      />
    )
  }, [isDarkTheme, setLayoutReady])

  return (
    <>
      {mainDock}
      {loading ? (
        <DefaultLoader
          simple
          className="!absolute !w-full !h-full !z-40 top-0 left-0 !bg-transparent"
        />
      ) : undefined}
      {!container && !autoLoad ? (
        <div className="absolute w-full h-full flex justify-center items-center z-40 bg-background top-0 left-0">
          <LoadingButton onClick={startShell} loading={loading}>
            {t('vslite.load_app_container')}
          </LoadingButton>
        </div>
      ) : undefined}
    </>
  )
}

const dockComponents: Record<string, FunctionComponent<IDockviewPanelProps>> = {
  editor: (props: IDockviewPanelProps<{ fs: FileSystemAPI; path: string }>) => (
    <Editor fs={props.params.fs} path={props.params.path} />
  ),
  preview: (props: IDockviewPanelProps<{ url: string }>) => {
    return <Preview {...props} />
  },
}

const gridComponents: Record<string, FunctionComponent<IGridviewPanelProps>> = {
  dock: (props: IGridviewPanelProps<{ api: React.MutableRefObject<DockviewApi> }>) => (
    <DockviewReact
      watermarkComponent={Watermark}
      components={dockComponents}
      onReady={(event) => {
        props.params.api.current = event.api
      }}
    />
  ),
  panes: (props: IGridviewPanelProps<{ api: React.MutableRefObject<PaneviewApi> }>) => (
    <PaneviewReact
      components={terminalComponents}
      onReady={(event) => {
        props.params.api.current = event.api
      }}
    />
  ),
  copilot: (
    props: IGridviewPanelProps<{ api: React.MutableRefObject<PaneviewApi>; shell: ShellInstance }>,
  ) => {
    return <Copilot shell={props.params.shell} />
  },
  terminal: (props: IGridviewPanelProps<{ dock: DockviewApi; shell: ShellInstance }>) => (
    <Terminal shell={props.params.shell} panelApi={props.api} />
  ),
}

const terminalComponents: Record<string, FunctionComponent<IPaneviewPanelProps>> = {
  filetree: (
    props: IPaneviewPanelProps<{ dock: DockviewApi; fs: FileSystemAPI; hideAppName?: boolean }>,
  ) => (
    <FileTree
      fs={props.params.fs}
      hideAppName={props.params.hideAppName}
      onRenameItem={panels.createFileRenameHandler(props.params.dock, props.params.fs)}
      onTriggerItem={panels.createFileOpener(props.params.dock, props.params.fs)}
      onAddFile={panels.createFileAdder(props.params.dock, props.params.fs)}
      onDeleteFile={panels.createFileDeleter(props.params.dock, props.params.fs)}
      onAddFolder={panels.createFolderAdder(props.params.dock, props.params.fs)}
      onRenameFolder={panels.createFolderRenameHandler(props.params.dock, props.params.fs)}
    />
  ),
}
