import { createContext, useContext, useRef, PropsWithChildren, Ref, useMemo } from 'react'
import type { TreeEnvironmentRef } from 'react-complex-tree'

type FileTreeState = {
  refresh: (...args: unknown[]) => void
  treeEnv: Ref<TreeEnvironmentRef<unknown, never>>
}

type MainVSLiteContextType = {
  fileTreeStateRef: React.MutableRefObject<FileTreeState>
}

const MainVSLiteContext = createContext<MainVSLiteContextType | null>(null)

const MainVSLiteAppProvider = ({ children }: PropsWithChildren) => {
  const fileTreeStateRef = useRef<FileTreeState>({
    refresh: () => {},
    treeEnv: null as Ref<TreeEnvironmentRef<unknown, never>>,
  })

  const value = useMemo(() => ({ fileTreeStateRef }), [fileTreeStateRef])

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
