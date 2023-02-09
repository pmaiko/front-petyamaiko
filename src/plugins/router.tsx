import api from '~/api'
import { createBrowserRouter } from 'react-router-dom'

import { lazy, Suspense } from 'react'

import Default from '~/components/layout/default'
import Spinner from '~/components/shared/Spinner'
import Error from '~/components/pages/Error'

// tslint:disable-next-line:no-empty
// const Home = lazy(() => new Promise(() => {}))
const Home = lazy(() => import('~/components/pages/Home'))
const About = lazy(() => import('~/components/pages/About'))
const Project = lazy(() => import('~/components/pages/Project'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Default />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        loader: async ({ request, params }) => {
          return await api.fetchPageData('/home')
        },
        element:
          <Suspense fallback={<Spinner />}>
            <Home />
          </Suspense>
      },
      {
        path: '/about',
        element:
          <Suspense fallback={<Spinner />}>
            <About />
          </Suspense>
      },
      {
        path: '/project/:id',
        element:
          <Suspense fallback={<Spinner />}>
            <Project />
          </Suspense>
      }
    ]
  }
])

export default router
