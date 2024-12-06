import type { FileSystemTree, WebContainer, WebContainerProcess } from '@webcontainer/api'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useXTerm } from 'react-xtermjs'
import { usePreventPitchZoom } from 'src/hooks/use-prevent-pitch-zoom'
import { useWebContainerState } from 'src/services/web-container/state'
// import { useAppState } from 'src/states/app'
// import ANSIToHTMLConvert from 'ansi-to-html'
import { FitAddon } from '@xterm/addon-fit'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { logError } from 'src/utils/logger'

const DEFAULT_PROMPT_ICON = '❯'
const DEFAULT_PROMPT = `${DEFAULT_PROMPT_ICON} `
const DEFAULT_PROMPT_COL = 2

const ContainerTernimal = memo(({ fileSystemTree }: { fileSystemTree?: FileSystemTree }) => {
  // const theme = useAppState((s) => s.theme)
  const [terminal, setTernimal] = useState<{
    loading: boolean
    prompt: string
    containerReady: boolean
    shellReady: boolean
  }>({
    containerReady: false,
    shellReady: false,
    loading: false,
    prompt: '',
  })
  const isProcessing = useRef(false)
  const runningWebContainerProcess = useRef<WebContainerProcess>()
  const webContainerShellRef = useRef<WebContainerProcess>()
  const webContainerRef = useRef<WebContainer | null>()
  const webContainerInit = useWebContainerState((state) => state.init)
  const webContainerTeardown = useWebContainerState((state) => state.teardown)
  const editorRef = useRef<HTMLDivElement | null>(null)
  const { instance, ref } = useXTerm()

  usePreventPitchZoom(editorRef)

  const getTerminalInformation = useCallback(() => {
    if (!instance) {
      return {
        raw: '',
        currentPage: 0,
        totalLines: 0,
        currentPageLines: 0,
      }
    }
    const totalActiveline = instance.buffer.active.length
    const viewportRows = instance.rows

    const raw = Array.from(
      { length: instance.buffer.active.length },
      (_, i) => instance.buffer.active.getLine(i)?.translateToString() || '',
    )
      .join('\n')
      .trim()
    const totalLines = raw.split('\n').length
    const currentPage = Math.floor(totalActiveline / viewportRows)
    return {
      raw,
      totalLines,
      currentPage,
    }
  }, [instance])

  useEffect(() => {
    return () => {
      webContainerShellRef.current?.kill()
      webContainerShellRef.current = undefined
      webContainerTeardown()
      webContainerRef.current = null
    }
  }, [webContainerTeardown])

  useEffect(() => {
    if (!webContainerShellRef.current || !instance) {
      return
    }
    webContainerShellRef.current.resize({ rows: instance.rows, cols: instance.cols })
    webContainerShellRef.current.output.pipeTo(
      new WritableStream({
        write(data) {
          instance.write(data)
        },
      }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instance, webContainerShellRef.current])

  const writeLines = useCallback(
    (...args: string[]) => {
      if (!instance) {
        return
      }
      args.forEach((line) => {
        instance.writeln(line)
      })
    },
    [instance],
  )

  const updateLine = useCallback(
    (line: string) => {
      if (!instance) {
        return
      }
      instance.write('\r\x1b[K')
      instance.write(line)
    },
    [instance],
  )

  const handleKillCurrentProcess = useCallback(() => {
    if (runningWebContainerProcess.current) {
      runningWebContainerProcess.current.kill()
    }
  }, [])

  const handleActions = useCallback(async () => {
    const currentLine = instance?.buffer.active.getLine(instance?.buffer.active.cursorY)
    let command = currentLine?.translateToString()
    // replace the first > of line. Remember only first
    command = command?.startsWith(DEFAULT_PROMPT_ICON)
      ? command.substring(1).trim()
      : command?.trim()
    if (!command) {
      return
    }
    setTernimal((pre) => ({ ...pre, loading: true, prompt: command }))
    try {
      isProcessing.current = true
      updateLine(`${DEFAULT_PROMPT}${command}`)
      if (command.startsWith('init')) {
        writeLines('')
        updateLine('🚀  Initializing container...')
        try {
          if (!fileSystemTree) {
            updateLine('🛑  No file system tree')
            return
          }
          setTernimal((pre) => ({ ...pre, shellReady: true, containerReady: true }))
          if (webContainerShellRef.current) {
            webContainerShellRef.current.kill()
            webContainerShellRef.current = undefined
          }
          if (webContainerRef.current) {
            webContainerRef.current.teardown()
            webContainerRef.current = undefined
          }
          const containerInstance = await webContainerInit(() => {
            webContainerRef.current = null
            webContainerShellRef.current = undefined
            setTernimal((pre) => ({ ...pre, shellReady: false, containerReady: false }))
          })
          setTernimal((pre) => ({ ...pre, containerReady: true }))
          if (!containerInstance) {
            updateLine('🛑  Failed to init container')
            return
          }
          webContainerRef.current = containerInstance
          await containerInstance.mount(fileSystemTree)
          webContainerShellRef.current = await webContainerRef.current.spawn('jsh')
          setTernimal((pre) => ({ ...pre, shellReady: true }))
          updateLine('🚀  Container initialized')
          writeLines('')
        } catch {
          updateLine('🛑  Failed to init container')
        }
      } else if (command.trim().startsWith('npm')) {
        try {
          writeLines('')
          if (!webContainerRef.current) {
            updateLine('🛑  Container is not initialized yet.')
            writeLines('  ')
            return
          }
          const [lib, ...args] = command.split(' ')
          const process = await webContainerRef.current.spawn(lib, args)
          runningWebContainerProcess.current = process

          process.output.pipeTo(
            new WritableStream({
              write(data) {
                instance?.write(data)
              },
            }),
          )
          // Wait for install command to exit
          await process.exit
        } finally {
          runningWebContainerProcess.current = undefined
        }
      } else {
        writeLines('')
        if (!webContainerRef.current) {
          updateLine('🛑  Container is not initialized yet.')
          writeLines('')
          return
        }
        let writer: WritableStreamDefaultWriter<string> | undefined
        try {
          writer = await webContainerShellRef.current?.input.getWriter()
          if (writer && webContainerShellRef.current && (await writer.ready)) {
            // Write command to shell
            await writer.write(`${command}\n`)
            await writer.releaseLock()
          }
        } catch (error) {
          logError(error)
          updateLine('🛑  Failed to run command')
        } finally {
          await writer?.close()
        }
      }
    } finally {
      updateLine(`${DEFAULT_PROMPT}`)
      isProcessing.current = false
      setTernimal((pre) => ({ ...pre, loading: false, prompt: command }))
    }
  }, [fileSystemTree, instance, updateLine, webContainerInit, writeLines])

  useEffect(() => {
    if (!instance) {
      return
    }
    isProcessing.current = false
    const fitAddon = new FitAddon()
    instance?.loadAddon(fitAddon)

    const handleResize = () => {
      fitAddon.fit()
      if (webContainerShellRef.current) {
        webContainerShellRef.current.resize({ rows: instance.rows, cols: instance.cols })
      }
    }
    instance?.writeln('Please type "init" to start!')
    updateLine(`${DEFAULT_PROMPT}`)
    const removeListener = instance?.onData((data) => {
      try {
        if (isProcessing.current) {
          return
        }
        // get all content of all ternimal from xterm instace
        const isCursorMoving = ['\u001b[D', '\u001b[C', '\u001b[A', '\u001b[B'].includes(data)
        const currentLine = instance?.buffer.active.cursorY
        const currentCol = instance?.buffer.active.cursorX

        // check if currentLine is the last line. next 50 lines is undefined or empty
        const isSuffixValue = !!Array.from(
          {
            length:
              instance.rows +
              instance?.buffer.active.viewportY -
              (instance?.buffer.active.viewportY + currentLine + 1),
          },
          (_, i) => {
            const line = instance?.buffer.active.getLine(
              instance?.buffer.active.viewportY + currentLine + i + 1,
            )
            return line?.translateToString(true, 0, instance.cols)
          },
        ).filter(Boolean).length

        const boxContent = instance.buffer.active
          .getLine(currentLine)
          ?.translateToString(true, 0, 4)
        // Prompt icon ignore
        if (
          currentCol < DEFAULT_PROMPT_COL &&
          !isCursorMoving &&
          boxContent?.startsWith(DEFAULT_PROMPT)
        ) {
          return
        }
        // If it is the completed lines
        if ((isSuffixValue || !boxContent?.startsWith(DEFAULT_PROMPT)) && !isCursorMoving) {
          return
        }

        instance?.write(data)
      } catch (error) {
        logError(error)
      }
    })
    const removeKeyListenter = instance?.onKey((e) => {
      if (e.domEvent.code === 'Backspace') {
        const currentLine = instance?.buffer.active.cursorY
        const currentCol = instance?.buffer.active.cursorX
        if (currentCol <= DEFAULT_PROMPT_COL) {
          const boxContent = instance.buffer.active
            .getLine(currentLine)
            ?.translateToString(true, 0, 4)
          if (boxContent?.startsWith(DEFAULT_PROMPT)) {
            return e.domEvent.preventDefault()
          }
        }
        instance.write('\b \b')
      } else if (e.domEvent.code === 'Enter') {
        handleActions()
      }
      // Check if command + C or control + C then kill the current process
      if (e.domEvent.ctrlKey && e.domEvent.key === 'c') {
        handleKillCurrentProcess()
      }
    })
    window.addEventListener('resize', handleResize)
    return () => {
      removeListener?.dispose()
      removeKeyListenter?.dispose()
      window.removeEventListener('resize', handleResize)
    }
  }, [getTerminalInformation, handleActions, handleKillCurrentProcess, instance, updateLine])

  return (
    <div ref={editorRef} className="w-full flex-1 overflow-y-auto nowheel nodrag">
      <div className="flex h-full w-full flex-col">
        <div ref={ref} className="w-full flex-1 overflow-y-auto" />
        {terminal.loading && terminal.prompt ? (
          <div className="bg-neutral-200 flex gap-2 max-h-16 w-full p-2">
            <LazyIcon name="loader" className="animate-spin" />
            <div
              className="overflow-auto flex-1 max-h-full break-words flex-wrap"
              dangerouslySetInnerHTML={{ __html: terminal.prompt }}
            />
            {runningWebContainerProcess.current ? (
              <LazyIcon
                className="cursor-pointer"
                name="circle-pause"
                onClick={handleKillCurrentProcess}
              />
            ) : undefined}
          </div>
        ) : undefined}
      </div>
    </div>
  )
})

export default ContainerTernimal
