import { FC, PropsWithChildren, Suspense, lazy, memo } from 'react'

import 'src/i18n'
import 'src/css/global.css'
import 'src/services/filesystem'

import * as dayjs from 'dayjs'
import relatedTime from 'dayjs/plugin/relativeTime'
import { Toaster } from 'src/lib/shadcn/ui/toaster'
import Modal from '@ebay/nice-modal-react'

import { DefaultLoader } from 'src/components/atoms/DefaultLoader'
import { ThemeProvider } from 'src/components/layout/ThemeProvider'

import { TextToSpeech } from 'src/utils/text-to-speech'
import { useAppHydration } from 'src/hooks/handlers/use-app-hydration'

const AppRoute = lazy(() => import('src/routes'))

dayjs.extend(relatedTime)
TextToSpeech.init()

const MainApp = memo(() => {
  const hydrated = useAppHydration()

  if (!hydrated) {
    return <DefaultLoader className="w-screen h-screen" enableLogo morphing noText />
  }

  return (
    <Suspense fallback={<DefaultLoader className="w-screen h-screen" enableLogo morphing noText />}>
      <AppRoute />
    </Suspense>
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
