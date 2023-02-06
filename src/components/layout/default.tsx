import { lazy } from 'react'

const TheHeader = lazy(() => import('~/components/shared/TheHeader'))
const TheFooter = lazy(() => import('~/components/shared/TheFooter'))

const Default = (props: any) => {
  return (
    <div className='layout layout_default'>
      <TheHeader />
      <div className='page-content'>
        {props.children}
      </div>
      <TheFooter />
    </div>
  )
}

export default Default
