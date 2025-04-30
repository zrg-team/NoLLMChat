import { lazy, Suspense } from 'react'
import { DefaultLoader } from 'src/components/atoms/DefaultLoader'

const CreateSession = lazy(() => import('src/components/pages/CreateSession/CreateSession'))

const CreateSessionPage = () => {
  return (
    <Suspense fallback={<DefaultLoader className="w-full h-full" morphing />}>
      <CreateSession />
    </Suspense>
  )
}

export default CreateSessionPage
