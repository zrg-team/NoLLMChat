import { lazy, memo, Suspense } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { MainLayout } from 'src/components/layout/MainLayout'
import { DefaultLoader } from 'src/components/atoms/DefaultLoader'
import { APP_ROUTES, getRouteURL } from './utils/routes'

const HomePage = lazy(() => import('src/pages/HomePage'))
const ApplicationPage = lazy(() => import('src/pages/ApplicationPage'))

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route Component={MainLayout}>
      <Route
        path={APP_ROUTES.application}
        element={
          <Suspense fallback={<DefaultLoader flickeringGrid typing={false} />}>
            <ApplicationPage />
          </Suspense>
        }
      />
      <Route
        path={APP_ROUTES.whiteboard}
        element={
          <Suspense fallback={<DefaultLoader flickeringGrid typing={false} />}>
            <HomePage />
          </Suspense>
        }
      />
      <Route path="*" element={<Navigate to={getRouteURL('whiteboard')} />} />
    </Route>,
  ),
  {
    basename: import.meta.env.BASE_URL,
  },
)

const AppRoute = memo(() => {
  return <RouterProvider router={router} />
})

export default AppRoute
