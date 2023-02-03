import { lazy, useMemo, useState } from 'react'
import { Image } from '~/types'

// @ts-ignore
import { LazyLoadImage } from 'react-lazy-load-image-component'
// import 'react-lazy-load-image-component/src/effects/opacity.css'
// import 'react-lazy-load-image-component/src/effects/blur.css'
// https://www.npmjs.com/package/react-lazy-load-image-component

import { replaceUrl } from '~/helpers/replace-url'

const BaseImage = (props: Image) => {
  const classes = [
    'base-image',
    `base-image_object-fit-${props.image.objectFit || 'cover'}`,
    `base-image_effect-${props.image.effect || 'blur'}`
  ].join(' ')

  const [load, setLoad] = useState(false)

  const src = useMemo(() => {
    return replaceUrl(props.image.src)
  }, [props.image.src])

  const visibleByDefault = useMemo(() => {
    return props.image.lazy === false
  }, [props.image.lazy])

  const onLoad = () => {
    const time = props.image.effect === 'move' ? 1000 : 0

    setTimeout(() => {
      setLoad(true)
    }, time)
  }

  return (
    <div className={classes}>
      {!visibleByDefault &&
        <div className={`base-image__placeholder ${load ? 'base-image__placeholder_load' : ''}`}>
          <img src='/logo512.png' alt=''/>
        </div>
      }
      <LazyLoadImage
        alt={props.image.alt}
        src={src}
        useIntersectionObserver={false}
        threshold={0}
        visibleByDefault={visibleByDefault}
        afterLoad={onLoad}
      />
    </div>
  )
}

export default BaseImage
