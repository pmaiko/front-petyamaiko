import router from '~/plugins/router'

import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'

import { useActions } from '~/hooks/useActions'
// @ts-ignore
import { NotificationContainer } from 'react-notifications'

// const OtherComponent = React.lazy(() => import('./OtherComponent'))

import Modals from '~/components/modals'

const App = () => {
  const { fetchGlobalData, checkToken } = useActions()

  const init = async () : Promise<any> => {
    await checkToken()
    await fetchGlobalData()
  }
  useEffect(() => {
    init()
  }, [])

  return (
    <>
      <RouterProvider router={router} />
      <Modals />
      <NotificationContainer />
    </>
  )
}

export default App
