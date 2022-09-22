import router from '~/plugins/router'

import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'

import { useActions } from '~/components/hooks/useActions'

const App = () => {
  const { fetchGlobalData } = useActions()

  useEffect(() => {
    fetchGlobalData()
  }, [])

  return (
    <RouterProvider router={router} />
  )
}

export default App
