import { lazy, Suspense } from 'react'
import { DefaultLoader } from 'src/components/atoms/DefaultLoader'

const SessionList = lazy(() => import('src/components/pages/SessionList/SessionList'))

const SessionListPage = () => {
  return (
    <Suspense fallback={<DefaultLoader className="w-full h-full" morphing />}>
      <SessionList />
    </Suspense>
  )
}

export default SessionListPage
