import '~/assets/styles/pages/About.scss'

import { useEffect } from 'react'
import { useAppLoaded } from '~/hooks/useAppLoaded'

const About = () => {
  const { setLoadedPage } = useAppLoaded()
  useEffect(() => {
    setLoadedPage(true)
  }, [])

  return (
    <>
      <div className='body'>
        body
      </div>
      <div className='about'>
        <h1>
          H1
        </h1>
        <h2>
          H2
        </h2>
        <h3>
          H3
        </h3>
        <h4>
          H4
        </h4>
        <h5>
          H5
        </h5>
        <h6>
          H6
        </h6>

        <p>
          p
        </p>
      </div>
    </>
  )
}

export default About
