import { createBrowserRouter } from 'react-router-dom'

import Home from '../components/pages/Home/Home'
import About from '../components/pages/About/About'
import Project from '../components/pages/Project/Project'

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
