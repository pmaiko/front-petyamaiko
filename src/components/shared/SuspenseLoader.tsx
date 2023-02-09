import { Suspense, Children, cloneElement } from 'react'
import Spinner from '~/components/shared/Spinner'

const SuspenseLoader = ({ children, onLoaded }: {
  children: any,
  onLoaded?: () => void
}) => {
  return (
    <Suspense fallback={ <Spinner /> }>
      {Children.map(children, (child) => {
        return cloneElement(child, {
          onLoaded
        })
      })}
    </Suspense>
  )
}

export default SuspenseLoader
