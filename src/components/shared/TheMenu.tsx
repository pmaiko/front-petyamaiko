import '../../assets/styles/shared/TheMenu.scss'

import { Link } from 'react-router-dom'

import { useStoreState } from '~/store'

const TheMenu = () => {
  const items = useStoreState(state => state.globalData.header?.menu.items)

  return (
    <div className='menu'>
      <ul className='menu__list'>
        { items?.map((item: any, index: any) => (
          <li
            key={ index }
            className='menu__list-item'
          >
            <Link
              to={ item.link }
              className='menu__list-item-link link'
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
