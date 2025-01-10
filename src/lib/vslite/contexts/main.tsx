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
import { Message } from 'ai/react'
import { LLM } from 'src/services/database/types'
import { FileSystemTreeChange } from 'src/services/web-container/utils/file-tree'

type FileTreeState = {
  fileSystemTree?: FileSystemTree
  refresh: (...args: unknown[]) => void
  treeEnv: Ref<TreeEnvironmentRef<unknown, never>>
}

export type MainVSLiteContextType = {
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
  onUpdateFileContent: (changes: FileSystemTreeChange[]) => void
  ternimalElementRef: React.MutableRefObject<HTMLDivElement | null>
  previewElementRef: React.MutableRefObject<HTMLIFrameElement | null>
  setLayoutReady?: Dispatch<SetStateAction<boolean>>
  sendMessage?: (
    message: string,
    messages: Message[],
    onMessage: (chunk: string) => void,
  ) => Promise<string | undefined>
  layoutReady?: boolean
  llm?: LLM
}

const MainVSLiteContext = createContext<MainVSLiteContextType | null>(null)

export const MainVSLiteAppProvider = ({
  llm,
  children,
  sendMessage,
  fileSystemTree,
  onUpdateFileContent,
}: PropsWithChildren & {
  llm?: LLM
  fileSystemTree?: FileSystemTree
  sendMessage?: MainVSLiteContextType['sendMessage']
  onUpdateFileContent: (changes: FileSystemTreeChange[]) => void
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
      sendMessage,
      llm,
    }),
    [
      container,
      terminal,
      process,
      containerInfo,
      clearSession,
      onUpdateFileContent,
      layoutReady,
      sendMessage,
      llm,
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
