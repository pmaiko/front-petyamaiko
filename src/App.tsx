import router from '~/plugins/router'

import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'

import { useActions } from '~/hooks/useActions'
// @ts-ignore
import { NotificationContainer } from 'react-notifications'

// const OtherComponent = React.lazy(() => import('./OtherComponent'))

import Modals from '~/components/modals'

const App = () => {
  const { fetchGlobalData, checkToken, fetchUser } = useActions()

  const init = async () : Promise<any> => {
    await checkToken()

    await Promise.all([
      fetchGlobalData(),
      fetchUser()
    ])
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
