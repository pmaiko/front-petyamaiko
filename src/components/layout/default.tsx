import { lazy } from 'react'
import { Outlet } from 'react-router-dom'
import SuspenseLoader from '~/components/shared/SuspenseLoader'

const TheHeader = lazy(() => import('~/components/shared/TheHeader'))
const TheFooter = lazy(() => import('~/components/shared/TheFooter'))

const Default = () => {
  return (
    <div className='layout layout_default'>
      <SuspenseLoader>
        <TheHeader />
      </SuspenseLoader>
      <div className='page-content'>
        <Outlet />
      </div>
      <SuspenseLoader>
        <TheFooter />
      </SuspenseLoader>
    </div>
  )
}

export default Default
