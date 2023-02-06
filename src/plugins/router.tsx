import { createBrowserRouter } from 'react-router-dom'

import { lazy, Suspense } from 'react'

import Default from '~/components/layout/default'

const Home = lazy(() => import('~/components/pages/Home'))
const About = lazy(() => import('~/components/pages/About'))
const Project = lazy(() => import('~/components/pages/Project'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Default />,
    children: [
      {
        index: true,
        element:
          <Suspense fallback={''}>
            <Home />
          </Suspense>
      },
      {
        path: '/about',
        element:
          <Suspense fallback={''}>
            <About />
          </Suspense>
      },
      {
        path: '/project/:id',
        element:
          <Suspense fallback={''}>
            <Project />
          </Suspense>
      }
    ]
  }
])

export default router
