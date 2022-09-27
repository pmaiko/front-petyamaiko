import './TheHeader.scss'

import { ReactComponent as UserIcon } from '~/assets/svg/user-icon.svg'

import TheNav from '~/components/shared/TheNav/TheNav'
import { useActions } from '~/hooks/useActions'

const TheHeader = () => {
  const { authModalToggle } = useActions()
  return (
    <header className='header'>
      <div className='container'>
        <div className='header__inner'>
          <TheNav />

          <div
            className='header__login'
            onClick={authModalToggle}
          >
            <UserIcon />
          </div>
        </div>
      </div>
    </header>
  )
}

export default TheHeader

