import { lazy, memo } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { MainLayout } from 'src/components/layout/MainLayout'

const HomePage = lazy(() => import('src/pages/home'))

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route Component={MainLayout}>
      <Route path="*" element={<HomePage />} />
    </Route>,
  ),
)

const AppRoute = memo(() => {
  return <RouterProvider router={router} />
})

export default AppRoute
