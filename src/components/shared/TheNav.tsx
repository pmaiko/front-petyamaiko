import '../../assets/styles/shared/TheNav.scss'

import { Link } from 'react-router-dom'
import { useStoreState } from '~/store'

import TheMenu from '~/components/shared/TheMenu'

const TheNav = () => {
  const logo = useStoreState(state => state.globalData.header?.menu.logo) || ''

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
