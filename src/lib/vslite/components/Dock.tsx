/* eslint-disable @typescript-eslint/no-unused-vars */
import { DockviewReact, GridviewReact, PaneviewReact } from 'dockview'
import {
  FunctionComponent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import type { FileSystemAPI } from '@webcontainer/api'
import type {
  DockviewApi,
  PaneviewApi,
  IGridviewPanelProps,
  IPaneviewPanelProps,
  IDockviewPanelProps,
  GridviewReadyEvent,
} from 'dockview'

import { useAppState } from 'src/states/app'
import LoadingButton from 'src/components/atoms/LoadingButton'

import { Editor } from './Editor'
import { FileTree } from './FileTree'
import { Terminal } from './Terminal'
import { CustomPanel } from './CustomPanel'
import { useStartup } from '../hooks/use-startup'
import * as panels from '../modules/panels'
import type { ContainerInstance } from '../hooks/use-container'
import { Preview } from './Preview'
import { useMainVSLiteAppContext } from '../contexts/main'

export function Dock({ autoLoad, hideAppName }: { autoLoad?: boolean; hideAppName?: boolean }) {
  const { t } = useTranslation('components')
  const [loading, setLoading] = useState(false)
  const loadingRef = useRef(loading)

  const isDarkTheme = useAppState((state) => state.theme === 'dark')
  const { grid, dock, panes, container, ternimalElementRef, layoutReady, setLayoutReady } =
    useMainVSLiteAppContext()

  loadingRef.current = loading

  const { containerInstance } = useStartup(layoutReady, { hideAppName })
  const startContainer = useCallback(async () => {
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
    panels.createPreviewOpener(dock.current)('file://', 8080)
    containerInstance.start(
      ternimalElementRef.current!,
      terminalPanel,
      panels.createPreviewOpener(dock.current),
      () => {
        setLoading(false)
      },
    )
  }, [dock, panes, grid, containerInstance, ternimalElementRef])

  const handleReady = useCallback((event: GridviewReadyEvent) => {
    grid.current = event.api
    panels.openDock(event.api, dock)
    panels.openPanes(event.api, panes)
    setLayoutReady?.(true)
  }, [])

  useEffect(() => {
    if (grid.current && dock.current && !grid.current.getPanel('copilot')) {
      panels.openCopilot(containerInstance, grid.current, dock.current)
    }
  }, [containerInstance])

  useLayoutEffect(() => {
    if (autoLoad) {
      startContainer()
    }
  }, [autoLoad, startContainer])

  const mainDock = useMemo(() => {
    return (
      <GridviewReact
        className={isDarkTheme ? 'dockview-theme-dark' : 'dockview-theme-light'}
        components={gridComponents}
        proportionalLayout={false}
        onReady={handleReady}
      />
    )
  }, [isDarkTheme, setLayoutReady])

  return (
    <>
      {mainDock}
      {!container && !autoLoad ? (
        <div className="absolute w-full h-full flex justify-center items-center z-40 bg-background top-0 left-0">
          <LoadingButton onClick={startContainer} loading={loading}>
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
    _props: IGridviewPanelProps<{
      api: React.MutableRefObject<PaneviewApi>
      container: ContainerInstance
    }>,
  ) => {
    return <CustomPanel />
  },
  terminal: (props: IGridviewPanelProps<{ dock: DockviewApi; container: ContainerInstance }>) => (
    <Terminal container={props.params.container} panelApi={props.api} />
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
