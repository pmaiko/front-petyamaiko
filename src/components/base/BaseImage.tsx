import { useState } from 'react'
import { Image } from '~/types'

// @ts-ignore
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/opacity.css'
import 'react-lazy-load-image-component/src/effects/blur.css'
// https://www.npmjs.com/package/react-lazy-load-image-component
// https://www.svgrepo.com/vectors/view/

const BaseImage = (props: Image) => {
  const [classes, setClasses] = useState(`base-image base-image_object-fit-${props.image.objectFit || 'cover'}`)

  return (
    <div className={classes}>
      <LazyLoadImage
        alt={props.image.alt}
        src={props.image.src}
        placeholderSrc='/favicon.ico'
        // useIntersectionObserver={false}
        effect='blur'
        threshold={0}
      />
    </div>
  )
}

export default BaseImage
