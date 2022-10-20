import '../../assets/styles/shared/TheNav.scss'

import { useSelector } from 'react-redux'
import { RootState } from '~/store/reducers'

import TheMenu from '~/components/shared/TheMenu'
import { Link } from 'react-router-dom'

const TheNav = () => {
  const logo = useSelector((state: RootState) => state.globalData.result.header?.menu.logo) || ''

  return (
    <nav className='nav'>
      <Link
        to='/'
        className='logo'
        dangerouslySetInnerHTML={{ __html: logo }}
      />
      <TheMenu />
    </nav>
  )
}

export default TheNav
