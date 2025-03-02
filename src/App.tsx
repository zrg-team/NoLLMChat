import { FC, PropsWithChildren, Suspense, lazy, memo } from 'react'

import 'src/i18n'
import 'src/css/global.css'
import '@xyflow/react/dist/style.css'
import 'src/services/filesystem'

import * as dayjs from 'dayjs'
import relatedTime from 'dayjs/plugin/relativeTime'
import { ErrorBoundary } from 'react-error-boundary'
import { Toaster } from 'src/lib/shadcn/ui/toaster'
import Modal from '@ebay/nice-modal-react'

import { DefaultError } from 'src/components/atoms/DefaultError'
import { DefaultLoader } from 'src/components/atoms/DefaultLoader'
import { ThemeProvider } from 'src/components/layout/ThemeProvider'

import { TextToSpeech } from 'src/utils/text-to-speech'
import { useAppHydration } from 'src/hooks/handlers/use-app-hydration'
import { logError } from 'src/utils/logger'

const AppRoute = lazy(() => import('src/routes'))

dayjs.extend(relatedTime)
TextToSpeech.init()

const logErrorHook = (error: Error, info: { componentStack?: string | null }) => {
  logError('Main Error Boundary', error, info)
}

const MainApp = memo(() => {
  const hydrated = useAppHydration()

  if (!hydrated) {
    return <DefaultLoader className="w-screen h-screen" enableLogo typing />
  }

  return (
    <ErrorBoundary fallback={<DefaultError />} onError={logErrorHook}>
      <Suspense fallback={<DefaultLoader className="w-screen h-screen" enableLogo typing />}>
        <AppRoute />
      </Suspense>
    </ErrorBoundary>
  )
})
export const App: FC<PropsWithChildren> = memo(() => {
  return (
    <ThemeProvider>
      <Modal.Provider>
        <MainApp />
      </Modal.Provider>
      <Toaster />
    </ThemeProvider>
  )
})
