import '~/assets/styles/shared/TheHeader.scss'

import { ReactComponent as UserIcon } from '~/assets/svg/user-icon.svg'
import { ReactComponent as LogoutIcon } from '~/assets/svg/logout-icon.svg'

import TheNav from '~/components/shared/TheNav'
import { useStoreState } from '~/store'
import { useModal, ModalNames } from '~/providers/ModalProvider'

const TheHeader = () => {
  const { show } = useModal()
  const showAuthModal = () => {
    show({
      name: ModalNames.AuthModal
    })
  }
  const showConfirmLogoutModal = () => {
    show({
      name: ModalNames.ConfirmLogoutModal
    })
  }

  const isLoggedIn  = useStoreState(state => state.auth.isLoggedIn)
  const user = useStoreState(state => state.user.user)

  return (
    <header className='header'>
      <div className='container'>
        <div className='header__inner'>
          <TheNav />

          {!isLoggedIn
            ?
            <div
              className='header__login'
              onClick={showAuthModal}
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
                onClick={showConfirmLogoutModal}
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

