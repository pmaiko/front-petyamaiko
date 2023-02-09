import { useEffect } from 'react'
import { Link, useRouteError } from 'react-router-dom'
import { useAppLoaded } from '~/hooks/useAppLoaded'

import BaseButton from '~/components/base/BaseButton'

const Error = () => {
  const { setLoadedPage } = useAppLoaded()
  useEffect(() => {
    setLoadedPage(true)
  }, [])

  const { status, statusText }: any = useRouteError()

  return (
    <div className='error'>
      <div className='container'>
        <div className='error__inner'>
          <h1 className='error__status'>{status}</h1>
          <p className='error__status-text'>{statusText}</p>
          <Link to='/' className='error__button'>
            <BaseButton>
              Main Page
            </BaseButton>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Error
