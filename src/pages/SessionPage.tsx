import { lazy, Suspense } from 'react'
import { DefaultLoader } from 'src/components/atoms/DefaultLoader'
import { withSessionLocalServiceProvider } from 'src/components/molecules/SessionLocalServiceProvider'

const Session = lazy(() => import('src/components/pages/Session/Session'))

const SessionPage = () => {
  return (
    <Suspense fallback={<DefaultLoader className="w-full h-full" morphing />}>
      <Session />
    </Suspense>
  )
}
const SessionPageWithLocalServices = withSessionLocalServiceProvider(SessionPage)

export default SessionPageWithLocalServices
