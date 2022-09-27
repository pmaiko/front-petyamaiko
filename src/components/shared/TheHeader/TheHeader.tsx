import './TheHeader.scss'

import { ReactComponent as UserIcon } from '~/assets/svg/user-icon.svg'
import { ReactComponent as LogoutIcon } from '~/assets/svg/logout-icon.svg'

import TheNav from '~/components/shared/TheNav/TheNav'
import { useActions } from '~/hooks/useActions'
import { useSelector } from 'react-redux'
import { RootState } from '~/store/reducers'

const TheHeader = () => {
  const { authModalToggle } = useActions()
  const isLoggedIn  = useSelector((state: RootState) => state.auth.isLoggedIn)
  const user = useSelector((state: RootState) => state.user.user)
  const { confirmLogoutModalToggle } = useActions()

  return (
    <header className='header'>
      <div className='container'>
        <div className='header__inner'>
          <TheNav />

          {!isLoggedIn
            ?
            <div
              className='header__login'
              onClick={authModalToggle}
            >
              <UserIcon />
            </div>
            :
            <div className='header__user'>
              <div className='header__user-name'>
                {user.name || '-'}
              </div>
              <div
                className='header__user-logout'
                onClick={confirmLogoutModalToggle}
              >
                <LogoutIcon />
              </div>
            </div>
          }
        </div>
      </div>
    </header>
  )
}

export default TheHeader

