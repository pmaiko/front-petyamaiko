import './TheNav.scss'

import { useSelector } from 'react-redux'
import { RootState } from '~/store/reducers'

import TheMenu from '~/components/shared/TheMenu/TheMenu'

const TheNav = () => {
  const logo = useSelector((state: RootState) => state.globalData.result.header?.menu.logo) || ''

  return (
    <nav className='nav'>
      <div className='logo' dangerouslySetInnerHTML={{ __html: logo }} />
      <TheMenu />
    </nav>
  )
}

export default TheNav
