import { lazy, useMemo, useState } from 'react'
import { Image } from '~/types'

// @ts-ignore
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/opacity.css'
import 'react-lazy-load-image-component/src/effects/blur.css'
// https://www.npmjs.com/package/react-lazy-load-image-component
// https://www.svgrepo.com/vectors/view/

import { replaceUrl } from '~/helpers/replace-url'

const BaseImage = (props: Image) => {
  const [classes, setClasses] = useState(`base-image base-image_object-fit-${props.image.objectFit || 'cover'}`)

  const src = useMemo(() => {
    return replaceUrl(props.image.src)
  }, [props.image.src])

  return (
    <div className={classes}>
      <LazyLoadImage
        alt={props.image.alt}
        src={src}
        placeholderSrc='/favicon.ico'
        useIntersectionObserver={false}
        effect='blur'
        threshold={0}
        visibleByDefault={props.image.lazy === false}
      />
    </div>
  )
}

export default BaseImage
