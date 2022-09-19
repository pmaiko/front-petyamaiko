import { createBrowserRouter} from 'react-router-dom'

import Home from '../components/pages/Home'
import About from '../components/pages/About'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/about',
    element: <About />
  }
])

export default router
