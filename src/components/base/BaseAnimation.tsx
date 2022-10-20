import gsap from 'gsap'
import Observer from '~/plugins/observer'

import { useEffect, useRef } from 'react'

const BaseAnimation = ({ children, delay }: any) => {
  const root: any = useRef()

  useEffect(() => {
    const childrenElement = root.current?.getElementsByClassName(children.props?.className)

    const init = () => {
      gsap.set(childrenElement, {
        y: '100%'
      })
    }

    const onInView = () => {
      gsap.to(childrenElement, {
        y: 0,
        delay,
        duration: 1,
        ease: 'power4.out'
      })
    }

    const observer = new Observer({ root: null, rootMargin: '0px', threshold: 0 })
    observer.observe(root.current)

    init()

    root.current?.addEventListener('inview', onInView)
    return () => {
      root.current?.removeEventListener('inview', onInView)
    }
  }, [])
  return (
    <div
      ref={root}
      className='base-animation'
    >
      {children}
    </div>
  )
}
export default BaseAnimation
