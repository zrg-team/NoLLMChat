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
}

const MainVSLiteContext = createContext<MainVSLiteContextType | null>(null)

const MainVSLiteAppProvider = ({
  children,
  fileSystemTree,
}: PropsWithChildren & { fileSystemTree?: FileSystemTree }) => {
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
    }),
    [container, terminal, process, containerInfo],
  )

  return <MainVSLiteContext.Provider value={value}>{children}</MainVSLiteContext.Provider>
}

const useMainVSLiteAppContext = () => {
  const context = useContext(MainVSLiteContext)
  if (!context) {
    throw new Error('useMainVSLiteAppContext must be used within a MainVSLiteAppProvider')
  }
  return context
}

export { MainVSLiteAppProvider, useMainVSLiteAppContext }
