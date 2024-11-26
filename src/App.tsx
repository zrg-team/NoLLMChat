import { FC, PropsWithChildren, Suspense, lazy, memo, useEffect } from 'react'

import 'src/i18n'
import 'src/css/global.css'
import '@xyflow/react/dist/style.css'

import * as dayjs from 'dayjs'
import relatedTime from 'dayjs/plugin/relativeTime'
import { ErrorBoundary } from 'react-error-boundary'
import { Toaster } from 'src/lib/shadcn/ui/toaster'
import Modal from '@ebay/nice-modal-react'

import { FileSystemProvider } from 'src/services/file-system/provider'
import { useSessionState } from 'src/states/session'
import { DefaultError } from 'src/components/atoms/DefaultError'
import { DefaultLoader } from 'src/components/atoms/DefaultLoader'
import { useLocalLLMState } from './services/local-llm'
import { useLocalEmbeddingState } from './services/local-embedding/state'
import { ThemeProvider } from './components/layout/ThemeProvider'

const AppRoute = lazy(() => import('src/routes'))

dayjs.extend(relatedTime)

const logError = (error: Error, info: { componentStack?: string | null }) => {
  console.error(error, info)
}

const MainApp = memo(() => {
  const initSessionState = useSessionState((state) => state.getLatestSessions)
  const initLocalLLMState = useLocalLLMState((state) => state.init)
  const initLocalEmbeddingState = useLocalEmbeddingState((state) => state.init)
  const ready = useSessionState((state) => state.ready)
  const error = useSessionState((state) => state.error)

  useEffect(() => {
    initSessionState()
    initLocalLLMState()
    initLocalEmbeddingState()
  }, [initLocalEmbeddingState, initLocalLLMState, initSessionState])

  if (error) {
    return <DefaultError error={error} />
  } else if (!ready) {
    return <DefaultLoader />
  }

  return (
    <ThemeProvider>
      <Modal.Provider>
        <ErrorBoundary fallback={<DefaultError />} onError={logError}>
          <Suspense fallback={<DefaultLoader />}>
            <AppRoute />
          </Suspense>
        </ErrorBoundary>
      </Modal.Provider>
    </ThemeProvider>
  )
})
export const App: FC<PropsWithChildren> = memo(() => {
  return (
    <FileSystemProvider>
      <MainApp />
      <Toaster />
    </FileSystemProvider>
  )
})
