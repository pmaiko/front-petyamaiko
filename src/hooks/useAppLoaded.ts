import { createEvent } from '~/helpers/create-event'
import SuspenseLoader from '~/components/shared/SuspenseLoader'

import { useStoreActions } from '~/store'

const appProgressEvent = createEvent('app:progress')

export const useAppLoaded = () =>{
  const { setLoadedPage } = useStoreActions()
  const dispatchAppProgressEvent = () => {
    document.documentElement.dispatchEvent(appProgressEvent)
  }

  return {
    setLoadedPage,
    dispatchAppProgressEvent,
    SuspenseLoader
  }
}
