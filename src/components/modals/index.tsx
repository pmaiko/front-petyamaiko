import { RootState } from '~/store/reducers'
import { useSelector } from 'react-redux'

import AuthModal from '~/components/modals/AuthModal/AuthModal'

const Modals = () => {
  const authModal = useSelector((state: RootState) => state.modals.authModal)

  return (
    <>
      {authModal && <AuthModal />}
    </>
  )
}
export default Modals
