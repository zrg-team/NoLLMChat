import { useCallback, useEffect, useMemo } from 'react'
import { WebContainer } from '@webcontainer/api'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { useAppState } from 'src/states/app'

import { startFiles, jshRC } from '../modules/webcontainer'

import type { FileSystemAPI, WebContainerProcess } from '@webcontainer/api'
import type { GridviewPanelApi } from 'dockview'
import { useWebContainerState } from 'src/services/web-container/state'
import { useMainVSLiteAppContext } from '../contexts/main'
import { logDebug, logWarn } from 'src/utils/logger'

export interface ShellInstance {
  container: WebContainer | null
  terminal: Terminal | null
  process: WebContainerProcess | null
  start: (
    root: HTMLElement,
    panel: GridviewPanelApi,
    onServerReady: ServerReadyHandler,
    onFinish: () => void,
  ) => void
}

export type ServerReadyHandler = (url: string, port: number, fs: FileSystemAPI) => void

export function useShell(): ShellInstance {
  const isDarkTheme = useAppState((state) => state.theme === 'dark')
  const webContainerInit = useWebContainerState((state) => state.init)
  const {
    process,
    fileTreeStateRef,
    terminal,
    container,
    setContainer,
    setTerminal,
    setProcess,
    setContainerInfo,
    containerInfo,
    clearSession,
  } = useMainVSLiteAppContext()
  const theme = useMemo(
    () =>
      isDarkTheme
        ? { background: '#181818' }
        : { background: '#f3f3f3', foreground: '#000', cursor: '#666' },
    [isDarkTheme],
  )

  useEffect(() => {
    if (terminal) {
      terminal.options.theme = theme
      terminal.refresh(0, terminal.rows - 1)
    }
  }, [isDarkTheme, terminal, theme])

  const start = useCallback(
    async (
      root: HTMLElement,
      panel: GridviewPanelApi,
      onServerReady: ServerReadyHandler,
      onFinish: () => void,
    ) => {
      try {
        if (container) return
        logDebug('Booting...')

        // Setup shell
        const shell = await webContainerInit(() => {
          clearSession?.()
          fileTreeStateRef.current?.refresh([])
        })
        if (!shell) return

        await shell.mount({ ...(fileTreeStateRef.current.fileSystemTree || {}), ...startFiles })

        await shell.fs.writeFile('.jshrc', jshRC)
        await shell.spawn('mv', ['.jshrc', '/home/.jshrc'])

        // Setup terminal
        const terminal = new Terminal({ convertEol: true, theme })
        const addon = new FitAddon()
        const { cols, rows } = terminal
        terminal.loadAddon(addon)

        // Start file watcher
        let watchReady = false
        const watch = await shell.spawn('npx', [
          '-y',
          'chokidar-cli',
          '.',
          '-i',
          '"(**/(node_modules|.git|_tmp_)**)"',
        ])
        watch.output.pipeTo(
          new WritableStream({
            async write(data) {
              const type: string = data.split(':')[0] || ''
              if (watchReady) {
                // logDebug('Change detected: ', data)
              } else if (data.includes('Watching "."')) {
                logDebug('File watcher ready.')
                watchReady = true
              } else {
                logDebug('chokidar: ', data)
              }
              switch (type) {
                case 'change':
                  break
                case 'add':
                case 'unlink':
                case 'addDir':
                case 'unlinkDir':
                default:
                  fileTreeStateRef.current?.refresh(data)
              }
            },
          }),
        )

        // Start shell
        const jsh = await shell.spawn('jsh', { env: {}, terminal: { cols, rows } })

        // Setup git alias
        const init = jsh.output.getReader()
        const input = jsh.input.getWriter()
        await init.read()
        init.releaseLock()

        // Pipe terminal to shell and vice versa
        terminal.onData((data) => {
          try {
            input.write(data)
          } catch (error) {
            logWarn('Error writing to shell: ', error)
          }
        })
        jsh.output.pipeTo(
          new WritableStream({
            write(data) {
              terminal.write(data)
              if (containerInfo.url && data.includes('On your network:')) {
                onServerReady(containerInfo.url, containerInfo.port || -1, shell.fs)
              }
            },
          }),
        )

        // Subscribe to events
        panel.onDidDimensionsChange(() => addon.fit())
        shell.on('server-ready', async (port, url) => {
          logDebug('Server ready: ', port, url)
          setContainerInfo?.({ url, port })
          if (port === 6006) {
            // Storybook
          } else {
            onServerReady(url, port, shell.fs)
          }
        })
        shell.on('error', (error) => {
          logDebug('Error: ', error)
          clearSession?.()
        })

        // Set state
        setContainer?.(shell)
        setTerminal?.(terminal)
        setProcess?.(jsh)

        // Git repo (clone repo and install)
        if (location.pathname.startsWith('/~/')) {
          const repo = location.pathname.replace('/~/', '')
          const init = new URLSearchParams(window.location.search)?.get('init')
          const cmd = init ? `ni && ${decodeURIComponent(init)}` : 'ni'
          await input.write(`git clone '${repo}' './' && ${cmd}\n`)
        }

        // Clear terminal and display
        terminal.clear()
        terminal.open(root)
        addon.fit()

        logDebug('Done.')
      } finally {
        onFinish()
      }
    },
    [
      clearSession,
      container,
      containerInfo.port,
      containerInfo.url,
      fileTreeStateRef,
      setContainer,
      setContainerInfo,
      setProcess,
      setTerminal,
      theme,
      webContainerInit,
    ],
  )

  return { terminal, container, process, start }
}
