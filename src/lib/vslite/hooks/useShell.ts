import { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { WebContainer } from '@webcontainer/api'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import type { FileSystemAPI, WebContainerProcess } from '@webcontainer/api'
import type { GridviewPanelApi } from 'dockview'

import { useAppState } from 'src/states/app'
import { useWebContainerState } from 'src/services/web-container/state'
import { logDebug, logInfo, logWarn } from 'src/utils/logger'
import { FileSystemTreeChange } from 'src/services/web-container/utils/file-tree'
import ignore from 'ignore'

import { useMainVSLiteAppContext } from '../contexts/main'
import { startFiles, jshRC } from '../modules/webcontainer'

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
  const updatePoolRef = useRef<FileSystemTreeChange[]>([])
  const updateDebounceInstanceRef = useRef<number>()
  const ignoreInstanceRef = useRef<ReturnType<typeof ignore>>()
  const isDarkTheme = useAppState((state) => state.theme === 'dark')
  const webContainerInit = useWebContainerState((state) => state.init)
  const webContainerTeardown = useWebContainerState((state) => state.teardown)
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
    onUpdateFileContent,
  } = useMainVSLiteAppContext()

  const theme = useMemo(
    () =>
      isDarkTheme
        ? { background: '#181818' }
        : { background: '#f3f3f3', foreground: '#000', cursor: '#666' },
    [isDarkTheme],
  )

  useLayoutEffect(() => {
    ignoreInstanceRef.current = ignore()
    ignoreInstanceRef.current.add(['.git', 'node_modules', 'dist', 'build', 'coverage', '_tmp_'])

    return () => {
      ignoreInstanceRef.current = undefined
    }
  }, [])

  useEffect(() => {
    if (terminal) {
      terminal.options.theme = theme
      terminal.refresh(0, terminal.rows - 1)
    }
  }, [isDarkTheme, terminal, theme])

  useEffect(() => {
    return () => {
      webContainerTeardown()
      ignoreInstanceRef.current = undefined
    }
  }, [webContainerTeardown])

  const debounceUpdate = useCallback(
    (update: FileSystemTreeChange) => {
      updatePoolRef.current.push(update)
      clearTimeout(updateDebounceInstanceRef.current)
      updateDebounceInstanceRef.current = setTimeout(() => {
        const filtered = updatePoolRef.current.filter((change) => {
          return !ignoreInstanceRef.current?.ignores(change.path)
        })
        if (filtered?.length) {
          onUpdateFileContent?.(filtered)
        }
        updatePoolRef.current = []
      }, 500)
    },
    [onUpdateFileContent],
  )

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

        await shell.fs
          .readFile('.gitignore', 'utf-8')
          .then((content) => {
            logInfo('Adding gitignore to ignore list', content)
            ignoreInstanceRef.current?.add(content.split('\n'))
          })
          .catch((err) => {
            logWarn('err', err)
          })

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
          '"(**/(node_modules|.git|_tmp_|.vite|dist|build|coverage)**)"',
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
                terminal.clear()
              } else {
                terminal.write(data)
              }
              switch (type) {
                case 'change':
                  break
                case 'add':
                  {
                    fileTreeStateRef.current?.refresh(data)
                    try {
                      const path = data.replace('add:', '').trim()
                      const content = await shell.fs.readFile(path, 'utf-8')
                      debounceUpdate({ path, content })
                      break
                    } catch (error) {
                      logWarn('Error reading file: ', error)
                    }
                  }
                  break
                case 'unlink':
                  {
                    fileTreeStateRef.current?.refresh(data)
                    debounceUpdate({
                      path: data.replace('unlink:', '').trim(),
                      content: '',
                      type: 'delete',
                    })
                  }
                  break
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
      debounceUpdate,
      webContainerInit,
    ],
  )

  return { terminal, container, process, start }
}
