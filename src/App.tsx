import { FC, PropsWithChildren, Suspense, lazy, memo, useEffect } from 'react'

import 'src/i18n'
import 'src/css/global.css'
import '@xyflow/react/dist/style.css'

import * as dayjs from 'dayjs'
import relatedTime from 'dayjs/plugin/relativeTime'
import { ErrorBoundary } from 'react-error-boundary'
import { Toaster } from 'src/lib/shadcn/ui/toaster'

import { FileSystemProvider } from 'src/services/file-system/provider'
import { LocalLLMProvider } from 'src/services/llm/provider'
import { LocalEmbeddingMProvider } from 'src/services/embedding/provider'
import { DatabaseProvider } from 'src/services/database/provider'
import { useSessionState } from 'src/states/session'
import { DefaultError } from 'src/components/atoms/DefaultError'
import { DefaultLoader } from 'src/components/atoms/DefaultLoader'

const AppRoute = lazy(() => import('src/routes'))

dayjs.extend(relatedTime)

const logError = (error: Error, info: { componentStack?: string | null }) => {
  console.error(error, info)
}

const MainApp = memo(() => {
  const initSessionState = useSessionState((state) => state.init)
  const ready = useSessionState((state) => state.ready)
  const error = useSessionState((state) => state.error)

  useEffect(() => {
    initSessionState()
  }, [initSessionState])

  if (error) {
    return <DefaultError error={error} />
  } else if (!ready) {
    return <DefaultLoader />
  }

  return (
    <ErrorBoundary fallback={<DefaultError />} onError={logError}>
      <Suspense fallback={<DefaultLoader />}>
        <AppRoute />
      </Suspense>
    </ErrorBoundary>
  )
})
export const App: FC<PropsWithChildren> = memo(() => {
  return (
    <FileSystemProvider>
      <DatabaseProvider>
        <LocalEmbeddingMProvider>
          <LocalLLMProvider>
            <MainApp />
            <Toaster />
          </LocalLLMProvider>
        </LocalEmbeddingMProvider>
      </DatabaseProvider>
    </FileSystemProvider>
  )
})
