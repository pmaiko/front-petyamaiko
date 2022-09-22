import './TheMenu.scss'

import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { RootState } from '~/store/reducers'

const TheMenu = () => {
  const items = useSelector((state: RootState) => state.globalData.result.header?.menu.items)
  return (
    <div className='menu'>
      <ul className='menu__list'>
        { items?.map((item, index) => (
          <li
            key={ index }
            className='menu__list-item'
          >
            <Link
              to={ item.link }
              className='menu__list-item-link'
            >
              { item.label }
            </Link>
          </li>
        )) }
      </ul>
    </div>
  )
}

export default TheMenu
