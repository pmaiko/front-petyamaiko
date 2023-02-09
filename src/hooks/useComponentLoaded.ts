import { useEffect } from 'react'

export const useComponentLoaded = (props?: any) => {
  useEffect(() => {
    if (props?.onLoaded) {
      props.onLoaded()
    }
  }, [])
}
