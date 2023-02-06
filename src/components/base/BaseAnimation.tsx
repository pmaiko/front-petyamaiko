import gsap from 'gsap'
import Observer from '~/plugins/observer'

import React, { useEffect, useRef } from 'react'

const BaseAnimation = ({ children, delay, className, animation, }: any) => {
  const root: any = useRef()

  useEffect(() => {
    const childrenElement = root.current?.getElementsByClassName('base-animation-children')

    const init = () => {
      if (animation === 'from-opacity') {
        gsap.set(childrenElement, {
          opacity: 0
        })
      } else {
        gsap.set(childrenElement, {
          y: '100%'
        })
      }
    }

    const onInView = () => {
      gsap.to(childrenElement, {
        y: 0,
        opacity: 1,
        delay,
        duration: 1,
        ease: 'power4.out'
      })
    }

    const observer = new Observer({ root: null, rootMargin: `0px 0px -${(document.body.clientHeight / 4) || 0}px 0px` })
    observer.observe(root.current)

    init()

    root.current?.addEventListener('inview', onInView)
    return () => {
      // root.current?.removeEventListener('inview', onInView)
    }
  }, [])
  return (
    <div
      ref={root}
      className={`base-animation ${className || ''}`}
    >
      {React.Children.map(children, (element, index) => {
        return React.cloneElement(element, {
          ...element.props,
          className: `${element.props.className || ''} base-animation-children`
        })
      })}
    </div>
  )
}
export default BaseAnimation
