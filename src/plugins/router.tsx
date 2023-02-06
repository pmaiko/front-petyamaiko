import { createBrowserRouter } from 'react-router-dom'

import { lazy } from 'react'

const Home = lazy(() => import('~/components/pages/Home'))
const About = lazy(() => import('~/components/pages/About'))
const Project = lazy(() => import('~/components/pages/Project'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/project/:id',
    element: <Project />
  }
])

export default router
