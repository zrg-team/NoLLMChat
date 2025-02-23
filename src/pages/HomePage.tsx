import { lazy, Suspense } from 'react'
import { DefaultLoader } from 'src/components/atoms/DefaultLoader'
import { withSessionLocalServiceProvider } from 'src/components/molecules/SessionLocalServiceProvider'

const HomeInner = lazy(() => import('src/components/pages/Home/Home'))

const HomePage = () => {
  return (
    <Suspense fallback={<DefaultLoader flickeringGrid className="w-full h-full" />}>
      <HomeInner />
    </Suspense>
  )
}
const HomePageWithLocalServices = withSessionLocalServiceProvider(HomePage)

export default HomePageWithLocalServices
