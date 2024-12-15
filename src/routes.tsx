import { memo, useLayoutEffect } from 'react'
import {
  createHashRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
  useRouteError,
  RouteObject,
} from 'react-router-dom'
import { MainLayout } from 'src/components/layout/MainLayout'
import { APP_ROUTES, getRouteURL } from 'src/utils/routes'
import { logDebug, logError } from 'src//utils/logger'
import { DefaultError } from 'src/components/atoms/DefaultError'
import ApplicationPage from 'src/pages/ApplicationPage'
import HomePage from 'src/pages/HomePage'
import { DefaultLoader } from './components/atoms/DefaultLoader'

import { ROUTE_MODE } from './constants/route'

function ErrorBoundary() {
  const error = useRouteError()
  logError(error)
  return <DefaultError />
}

const routes = createRoutesFromElements(
  <Route Component={MainLayout} errorElement={<ErrorBoundary />}>
    <Route path={APP_ROUTES.whiteboard} Component={HomePage} errorElement={<ErrorBoundary />} />
    <Route
      path={APP_ROUTES.application}
      errorElement={<ErrorBoundary />}
      Component={ApplicationPage}
    />
    <Route path="*" element={<Navigate to={getRouteURL('whiteboard')} />} />
  </Route>,
)

const getRouter = (routes: RouteObject[], opts?: { basename?: string }) => {
  switch (ROUTE_MODE) {
    case 'browser':
      return createBrowserRouter(routes, opts)
    case 'hash':
      return createHashRouter(routes)
    default:
      return createBrowserRouter(routes, opts)
  }
}
const router = getRouter(routes, { basename: import.meta.env.VITE_BASE_URL })

logDebug('[BASE_URL]', import.meta.env.VITE_BASE_URL)
const AppRoute = memo(
  () => {
    const invalidBaseURL = !window.location.pathname.includes(import.meta.env.VITE_BASE_URL)
    useLayoutEffect(() => {
      if (invalidBaseURL) {
        window.location.href = `${import.meta.env.VITE_BASE_URL}`.replace('//', '/')
      }
    }, [invalidBaseURL])

    if (invalidBaseURL) {
      return <DefaultLoader className="w-screen h-screen" enableLogo typing />
    }

    return <RouterProvider router={router} />
  },
  () => true,
)

export default AppRoute
