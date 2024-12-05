import { DockviewReact, GridviewReact, PaneviewReact } from 'dockview'
import { FunctionComponent, useRef } from 'react'
import { useAppState } from 'src/states/app'

import { Editor } from './Editor'
import { FileTree } from './FileTree'
import { Terminal } from './Terminal'
import { Watermark } from './Watermark'
import { useStartup } from '../hooks/useStartup'
import * as panels from '../modules/panels'

import type {
  DockviewApi,
  GridviewApi,
  PaneviewApi,
  IGridviewPanelProps,
  IPaneviewPanelProps,
  IDockviewPanelProps,
} from 'dockview'
import type { FileSystemAPI } from '@webcontainer/api'
import type { ShellInstance } from '../hooks/useShell'

export function Dock() {
  const grid = useRef<GridviewApi>()
  const dock = useRef<DockviewApi>()
  const panes = useRef<PaneviewApi>()
  const isDarkTheme = useAppState((state) => state.theme === 'dark')

  useStartup(grid, dock, panes)

  return (
    <GridviewReact
      className={isDarkTheme ? 'dockview-theme-dark' : 'dockview-theme-light'}
      components={gridComponents}
      proportionalLayout={false}
      onReady={(event) => {
        grid.current = event.api
        panels.openDock(event.api, dock)
        panels.openPanes(event.api, panes)
      }}
    />
  )
}

const dockComponents: Record<string, FunctionComponent<IDockviewPanelProps>> = {
  editor: (props: IDockviewPanelProps<{ fs: FileSystemAPI; path: string; isDark: boolean }>) => (
    <Editor fs={props.params.fs} path={props.params.path} />
  ),
  preview: (props: IDockviewPanelProps<{ url: string }>) => (
    <iframe
      src={props.params.url}
      allow="cross-origin-isolated"
      // @ts-expect-error no sure why this is not working
      credentialless
    />
  ),
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
      components={paneComponents}
      onReady={(event) => {
        props.params.api.current = event.api
      }}
    />
  ),
  terminal: (props: IGridviewPanelProps<{ dock: DockviewApi; shell: ShellInstance }>) => (
    <Terminal
      shell={props.params.shell}
      panelApi={props.api}
      onServerReady={panels.createPreviewOpener(props.params.dock)}
    />
  ),
}

const paneComponents: Record<string, FunctionComponent<IPaneviewPanelProps>> = {
  filetree: (props: IPaneviewPanelProps<{ dock: DockviewApi; fs: FileSystemAPI }>) => (
    <FileTree
      fs={props.params.fs}
      onRenameItem={panels.createFileRenameHandler(props.params.dock, props.params.fs)}
      onTriggerItem={panels.createFileOpener(props.params.dock, props.params.fs)}
    />
  ),
}
