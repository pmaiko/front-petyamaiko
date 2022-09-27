import { RootState } from '~/store/reducers'
import { useSelector } from 'react-redux'

import AuthModal from '~/components/modals/AuthModal/AuthModal'
import ConfirmLogoutModal from '~/components/modals/ConfirmLogoutModal/ConfirmLogoutModal'

const Modals = () => {
  const authModal = useSelector((state: RootState) => state.modals.authModal)
  const confirmLogoutModal = useSelector((state: RootState) => state.modals.confirmLogoutModal)

  return (
    <>
      {authModal && <AuthModal />}
      {confirmLogoutModal && <ConfirmLogoutModal />}
    </>
  )
}
export default Modals
