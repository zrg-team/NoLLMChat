import {
  createContext,
  useContext,
  useRef,
  PropsWithChildren,
  Ref,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  MutableRefObject,
} from 'react'
import type { TreeEnvironmentRef } from 'react-complex-tree'
import type { FileSystemTree, WebContainer, WebContainerProcess } from '@webcontainer/api'
import type { Terminal } from 'xterm'
import type { FileSystemTreeChange } from 'src/services/web-container/utils/file-tree'
import type { DockviewApi, GridviewApi, PaneviewApi } from 'dockview'

type FileTreeState = {
  fileSystemTree?: FileSystemTree
  refresh: (...args: unknown[]) => void
  treeEnv: Ref<TreeEnvironmentRef<unknown, never>>
}

export type MainVSLiteContextSetInfoType = {
  setReady?: (ready: boolean) => void
  setContainer?: (data?: WebContainer) => void
  setTerminal?: (data?: Terminal) => void
  setTerminalProcess?: (data?: WebContainerProcess) => void
  setFileTreeState?: (data: FileTreeState) => void
  setContainerPreviewInfo?: (data: { url?: string; port?: number }) => void
  setTerminalProcessWriter?: (data?: WritableStreamDefaultWriter<string>) => void
}

export type MainVSLiteContextType = {
  containerPreviewInfo: { url?: string; port?: number }
  container: WebContainer | undefined
  terminal: Terminal | undefined
  terminalProcess: WebContainerProcess | undefined
  layoutReady?: boolean
  fileTreeStateRef: React.MutableRefObject<FileTreeState>
  ternimalElementRef: React.MutableRefObject<HTMLDivElement | null>
  previewElementRef: React.MutableRefObject<HTMLIFrameElement | null>
  grid: React.MutableRefObject<GridviewApi | null>
  dock: React.MutableRefObject<DockviewApi | null>
  panes: React.MutableRefObject<PaneviewApi | null>
  ready?: boolean

  clearSession?: () => void
  onUpdateFileContent: (changes: FileSystemTreeChange[]) => void
  setLayoutReady?: Dispatch<SetStateAction<boolean>>

  renderCustomPanel?: (rest: MainVSLiteContextType) => JSX.Element
} & MainVSLiteContextSetInfoType

const MainVSLiteContext = createContext<MainVSLiteContextType | undefined>(undefined)

export type MainVSLiteAppProviderType = {
  fileSystemTree?: FileSystemTree
  renderCustomPanel?: (rest: MainVSLiteContextType) => JSX.Element
  onUpdateFileContent: (changes: FileSystemTreeChange[]) => void
  setState?: MainVSLiteContextSetInfoType & {
    setPreviewElementRef?: (ref: MutableRefObject<HTMLIFrameElement | null>) => void
  }
  initState?: (
    data: Partial<{ terminal?: Terminal; container?: WebContainer; process?: WebContainerProcess }>,
  ) => void
}

export const MainVSLiteAppProvider = ({
  children,
  initState,
  fileSystemTree,
  renderCustomPanel,
  onUpdateFileContent,
  setState,
}: PropsWithChildren & MainVSLiteAppProviderType) => {
  const [ready, setReady] = useState(false)
  const [layoutReady, setLayoutReady] = useState(false)
  // Components
  const grid = useRef<GridviewApi | null>(null)
  const dock = useRef<DockviewApi | null>(null)
  const panes = useRef<PaneviewApi | null>(null)
  const previewElementRef = useRef<HTMLIFrameElement | null>(null)
  const ternimalElementRef = useRef<HTMLDivElement | null>(null)

  const [container, setContainer] = useState<WebContainer>()
  const [terminal, setTerminal] = useState<Terminal>()
  const [process, setProcess] = useState<WebContainerProcess>()
  const [, setTerminalProcessWriter] = useState<WritableStreamDefaultWriter<string>>()

  const [containerPreviewInfo, setContainerPreviewInfo] = useState<{ url?: string; port?: number }>(
    {
      url: undefined,
      port: undefined,
    },
  )
  const fileTreeStateRef = useRef<FileTreeState>({
    fileSystemTree,
    refresh: () => {},
    treeEnv: null as Ref<TreeEnvironmentRef<unknown, never>>,
  })
  fileTreeStateRef.current.fileSystemTree = fileSystemTree

  const renderCustomPanelRef = useRef(renderCustomPanel)
  const ternmialRef = useRef(terminal)
  const containerRef = useRef(container)
  const terminalProcessRef = useRef(process)

  terminalProcessRef.current = process
  containerRef.current = container
  ternmialRef.current = terminal
  renderCustomPanelRef.current = renderCustomPanel

  const handleAllProcessReady = useCallback(() => {
    setState?.setPreviewElementRef?.(previewElementRef)
    if (ternmialRef.current && terminalProcessRef.current && containerRef.current) {
      setState?.setReady?.(true)
      setReady(true)
    }
  }, [])

  const clearSession = useCallback(() => {
    if (ternmialRef.current) {
      ternmialRef.current.dispose()
    }
    if (terminalProcessRef.current) {
      terminalProcessRef.current.kill()
    }
    if (containerRef.current) {
      containerRef.current.teardown()
    }
    fileSystemTree = undefined
    setContainer(undefined)
    setTerminal(undefined)
    setProcess(undefined)
    setContainerPreviewInfo({ url: undefined, port: undefined })
  }, [])

  const handleSetTerminal = useCallback((terminal: Terminal | undefined) => {
    setTerminal(terminal)
    initState?.({ terminal })
    ternmialRef.current = terminal
    setState?.setTerminal?.(terminal)
    handleAllProcessReady()
  }, [])

  const handleSetContainer = useCallback((container: WebContainer | undefined) => {
    setContainer(container)
    initState?.({ container })
    containerRef.current = container
    setState?.setContainer?.(container)
    handleAllProcessReady()
  }, [])

  const handleSetFileTreeState = useCallback((fileTreeState: FileTreeState) => {
    setState?.setFileTreeState?.(fileTreeState)
    handleAllProcessReady()
  }, [])

  const handleSetTerminalProcess = useCallback((process: WebContainerProcess | undefined) => {
    setProcess(process)
    initState?.({ process })
    terminalProcessRef.current = process
    setState?.setTerminalProcess?.(process)
    handleAllProcessReady()
  }, [])

  const handleSetTerminalProcessWriter = useCallback(
    (writer: WritableStreamDefaultWriter<string> | undefined) => {
      setTerminalProcessWriter(writer)
      setState?.setTerminalProcessWriter?.(writer)
      handleAllProcessReady()
    },
    [],
  )

  const handleSetContainerPreviewInfo = useCallback((info: { url?: string; port?: number }) => {
    setContainerPreviewInfo(info)
    setState?.setContainerPreviewInfo?.(info)
  }, [])

  useEffect(() => {
    if (previewElementRef?.current) {
      setState?.setPreviewElementRef?.(previewElementRef)
    }
  }, [previewElementRef?.current])

  const value = useMemo(
    () => ({
      clearSession,
      setLayoutReady,
      onUpdateFileContent,
      setTerminal: handleSetTerminal,
      setContainer: handleSetContainer,
      setFileTreeState: handleSetFileTreeState,
      setTerminalProcess: handleSetTerminalProcess,
      setContainerPreviewInfo: handleSetContainerPreviewInfo,
      setTerminalProcessWriter: handleSetTerminalProcessWriter,
      renderCustomPanel: renderCustomPanelRef.current,
      terminalProcess: terminalProcessRef.current,
      container: containerRef.current,
      terminal: ternmialRef.current,
      containerPreviewInfo,
      ternimalElementRef,
      previewElementRef,
      fileTreeStateRef,
      layoutReady,
      grid,
      dock,
      panes,
      ready,
    }),
    [
      ready,
      grid,
      dock,
      panes,
      container,
      terminal,
      process,
      layoutReady,
      containerPreviewInfo,
      clearSession,
      onUpdateFileContent,
      handleSetContainer,
      handleSetTerminal,
      handleSetTerminalProcess,
      handleSetFileTreeState,
      handleSetContainerPreviewInfo,
      handleSetTerminalProcessWriter,
      renderCustomPanelRef.current,
    ],
  )

  return <MainVSLiteContext.Provider value={value}>{children}</MainVSLiteContext.Provider>
}

export const useMainVSLiteAppContext = () => {
  const context = useContext(MainVSLiteContext)
  if (!context) {
    throw new Error('useMainVSLiteAppContext must be used within a MainVSLiteAppProvider')
  }
  return context
}
