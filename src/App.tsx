import router from '~/plugins/router'

import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'

import { useStoreActions } from '~/store'
// @ts-ignore
import { NotificationContainer } from 'react-notifications'

// const OtherComponent = React.lazy(() => import('./OtherComponent'))

import ModalProvider from '~/providers/ModalProvider'
import BreakpointProvider from '~/providers/BreakpointProvider'

const App = () => {
  const { fetchAndSetGlobalData, checkToken, fetchUser } = useStoreActions()

  const init = async () : Promise<any> => {
    await checkToken()

    await Promise.all([
      fetchAndSetGlobalData(),
      fetchUser()
    ])
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <>
      <BreakpointProvider>
        <ModalProvider>
          <RouterProvider router={router} />
          <NotificationContainer />
        </ModalProvider>
      </BreakpointProvider>
    </>
  )
}

export default App
