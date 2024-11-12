import { lazy, memo } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  RouterProvider,
} from 'react-router-dom'

const HomePage = lazy(() => import('src/pages/home'))

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </>,
  ),
)

const AppRoute = memo(() => {
  return <RouterProvider router={router} />
})

export default AppRoute
