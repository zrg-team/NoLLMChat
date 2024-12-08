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
} from 'react'
import type { TreeEnvironmentRef } from 'react-complex-tree'
import type { FileSystemTree, WebContainer, WebContainerProcess } from '@webcontainer/api'
import type { Terminal } from 'xterm'

type FileTreeState = {
  fileSystemTree?: FileSystemTree
  refresh: (...args: unknown[]) => void
  treeEnv: Ref<TreeEnvironmentRef<unknown, never>>
}

type MainVSLiteContextType = {
  containerInfo: { url?: string; port?: number }
  container: WebContainer | null
  terminal: Terminal | null
  process: WebContainerProcess | null
  fileTreeStateRef: React.MutableRefObject<FileTreeState>
  setContainer?: Dispatch<SetStateAction<WebContainer | null>>
  setTerminal?: Dispatch<SetStateAction<Terminal | null>>
  setProcess?: Dispatch<SetStateAction<WebContainerProcess | null>>
  setContainerInfo?: Dispatch<SetStateAction<{ url?: string; port?: number }>>
  clearSession?: () => void
  onUpdateFileContent: (path: string, content: string) => void
  ternimalElementRef: React.MutableRefObject<HTMLDivElement | null>
  previewElementRef: React.MutableRefObject<HTMLIFrameElement | null>
  setLayoutReady?: Dispatch<SetStateAction<boolean>>
  layoutReady?: boolean
}

const MainVSLiteContext = createContext<MainVSLiteContextType | null>(null)

export const MainVSLiteAppProvider = ({
  children,
  fileSystemTree,
  onUpdateFileContent,
}: PropsWithChildren & {
  fileSystemTree?: FileSystemTree
  onUpdateFileContent: (path: string, content: string) => void
}) => {
  const [layoutReady, setLayoutReady] = useState(false)
  const previewElementRef = useRef<HTMLIFrameElement>(null)
  const ternimalElementRef = useRef<HTMLDivElement>(null)
  const [container, setContainer] = useState<WebContainer | null>(null)
  const [terminal, setTerminal] = useState<Terminal | null>(null)
  const [containerInfo, setContainerInfo] = useState<{ url?: string; port?: number }>({
    url: undefined,
    port: undefined,
  })
  const [process, setProcess] = useState<WebContainerProcess | null>(null)
  const fileTreeStateRef = useRef<FileTreeState>({
    fileSystemTree,
    refresh: () => {},
    treeEnv: null as Ref<TreeEnvironmentRef<unknown, never>>,
  })
  const clearSession = useCallback(() => {
    fileSystemTree = undefined
    setContainer(null)
    setTerminal(null)
    setProcess(null)
    setContainerInfo({ url: undefined, port: undefined })
  }, [])

  const value = useMemo(
    () => ({
      setContainer,
      setTerminal,
      setProcess,
      fileTreeStateRef,
      container,
      terminal,
      process,
      containerInfo,
      setContainerInfo,
      clearSession,
      onUpdateFileContent,
      ternimalElementRef,
      previewElementRef,
      layoutReady,
      setLayoutReady,
    }),
    [container, terminal, process, containerInfo, clearSession, onUpdateFileContent, layoutReady],
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
