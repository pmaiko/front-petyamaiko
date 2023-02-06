import api from '~/api'
import React, { createRef, useEffect } from 'react'
import Observer from '~/plugins/observer'

export const useProjectView = (props: { projectId: number }) => {
  const root: React.RefObject<HTMLElement> = createRef()

  useEffect(() => {
    const onInView = () => {
      api.viewProject({
        id: props.projectId,
        view: true
      })
    }

    setTimeout(() => {
      const observer = new Observer({ root: null, rootMargin: '0px', threshold: 0 })
      observer.observe(root.current)
      root.current?.addEventListener('inview', onInView)
    })

    return () => {
      // root.current?.removeEventListener('inview', onInView)
    }
  }, [])

  return {
    root
  }
}
