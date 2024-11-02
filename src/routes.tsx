import { lazy, memo } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  RouterProvider,
} from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'

const HomePage = lazy(() => import('src/pages/home'))

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </>,
  ),
)

const logError = (error: Error, info: { componentStack?: string | null }) => {
  // Do something with the error, e.g. log to an external API
  console.error(error, info)
}

export const AppRoute = memo(() => {
  return (
    <ErrorBoundary fallback={null} onError={logError}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  )
})
