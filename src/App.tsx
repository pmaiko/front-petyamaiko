import router from '~/plugins/router'

import { createEvent } from '~/helpers/create-event'
import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'

import globalStore from '~/globalStore'
import { useStoreActions, useStoreState } from '~/store'

// @ts-ignore
import { NotificationContainer } from 'react-notifications'

import ModalProvider from '~/providers/ModalProvider'
import BreakpointProvider from '~/providers/BreakpointProvider'

const appLoadedEvent = createEvent('app:loaded')
const appProgressEvent = createEvent('app:progress')

const App = () => {
  const { loaded, loadedPage } = useStoreState(state => ({
    loaded: state.global.loaded,
    loadedPage: state.global.loadedPage
  }))
  const {
    fetchAndSetGlobalData,
    setPreloaderDone,
    setLoaded,
    checkToken,
    fetchUser
  } = useStoreActions()

  const init = async () : Promise<any> => {
    await checkToken()

    await Promise.all([
      fetchAndSetGlobalData(),
      fetchUser()
    ])
  }

  useEffect(() => {
    init().finally(() => {
      setLoaded(true)
      document.documentElement.dispatchEvent(appProgressEvent)
    })

    const onPreloaderDone = () => {
      setPreloaderDone(true)
    }

    document.documentElement.addEventListener('preloader:done', onPreloaderDone)
    return () => {
      document.documentElement.removeEventListener('preloader:done', onPreloaderDone)
    }
  }, [])

  useEffect(() => {
    if (loaded && loadedPage) {
      document.documentElement.dispatchEvent(appLoadedEvent)
    }
  }, [loaded, loadedPage])

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
