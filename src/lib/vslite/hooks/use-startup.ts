/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect } from 'react'
import { useMonaco } from '@monaco-editor/react'

import { useLaunch } from './use-launch'
import { useContainer } from './use-container'
import { openFolder } from '../modules/webcontainer'
import * as panels from '../modules/panels'
import { useMainVSLiteAppContext } from '../contexts/main'

export function useStartup(
  layoutReady: boolean | undefined,
  options?: {
    hideAppName?: boolean
  },
) {
  const containerInstance = useContainer()
  const monaco = useMonaco()
  const launch = useLaunch()

  const { container, grid, dock, panes } = useMainVSLiteAppContext()

  const initTerm = useRef(false)
  const initLaunch = useRef(false)
  const initFileTree = useRef(false)

  // Open terminal when shell is ready
  useEffect(() => {
    if (initTerm.current || !layoutReady) return

    if (grid.current && dock.current) {
      initTerm.current = true
      panels.openTerminal(containerInstance, grid.current, dock.current)
    }
  }, [layoutReady, containerInstance])

  // Open file tree when FS is ready
  useEffect(() => {
    if (initFileTree.current) return

    if (container?.fs && panes.current && dock.current) {
      initFileTree.current = true
      panels.openFileTree(container.fs, panes.current, dock.current, options?.hideAppName)
    }
  }, [container?.fs, panes.current, dock.current])

  // PWA launch queue
  useEffect(() => {
    if (initLaunch.current) return
    const fs = container?.fs
    const api = dock.current
    if (!fs || !api || !monaco) return
    // Open files
    if (launch.files.length > 0) {
      // TODO: ask for containing folder access
      launch.files.forEach((file) => panels.openStartFile(file, fs, api))
      // Execute action
    } else if (launch.action) {
      switch (launch.action) {
        case 'open_folder': {
          // TODO: trigger via a dialog due to security
          openFolder(fs, api)
          break
        }
      }
      // Open blank file (if no URL)
    } else if (location.pathname === '/') {
      panels.openUntitledFile(fs, api)
    }
    initLaunch.current = true
  }, [monaco, launch, containerInstance])

  return { containerInstance }
}
