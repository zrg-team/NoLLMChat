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
import { DefaultError } from 'src/components/atoms/DefaultError'
import { DefaultLoader } from 'src/components/atoms/DefaultLoader'
import { ThemeProvider } from 'src/components/layout/ThemeProvider'

import { TextToSpeech } from 'src/utils/text-to-speech'
import { useSessionState } from 'src/states/session'
import { useLocalLLMState } from 'src/services/local-llm'
import { useLocalEmbeddingState } from 'src/services/local-embedding/state'
import { useAppHydration } from 'src/hooks/handlers/use-app-hydration'
import { logError } from 'src/utils/logger'

const AppRoute = lazy(() => import('src/routes'))

dayjs.extend(relatedTime)
TextToSpeech.init()

const logErrorHook = (error: Error, info: { componentStack?: string | null }) => {
  logError(error, info)
}

const MainApp = memo(() => {
  const initSessionState = useSessionState((state) => state.init)
  const initLocalLLMState = useLocalLLMState((state) => state.init)
  const initLocalEmbeddingState = useLocalEmbeddingState((state) => state.init)
  const ready = useSessionState((state) => state.ready)
  const error = useSessionState((state) => state.error)
  const hydrated = useAppHydration()

  useEffect(() => {
    initSessionState()
    initLocalLLMState()
    initLocalEmbeddingState()
  }, [initLocalEmbeddingState, initLocalLLMState, initSessionState])

  if (error) {
    return <DefaultError error={error} />
  } else if (!ready || !hydrated) {
    return <DefaultLoader className="w-screen h-screen" />
  }

  return (
    <Modal.Provider>
      <ErrorBoundary fallback={<DefaultError />} onError={logErrorHook}>
        <Suspense fallback={<DefaultLoader className="w-screen h-screen" />}>
          <AppRoute />
        </Suspense>
      </ErrorBoundary>
    </Modal.Provider>
  )
})
export const App: FC<PropsWithChildren> = memo(() => {
  return (
    <ThemeProvider>
      <FileSystemProvider>
        <MainApp />
        <Toaster />
      </FileSystemProvider>
    </ThemeProvider>
  )
})
