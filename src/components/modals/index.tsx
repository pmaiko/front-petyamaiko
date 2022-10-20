import AuthModal from '~/components/modals/AuthModal'
import ConfirmLogoutModal from '~/components/modals/ConfirmLogoutModal'
import ConfirmProjectDeleteModal from '~/components/modals/ConfirmProjectDeleteModal'
import CreateProjectModal from '~/components/modals/CreateProjectModal'

import { useModal, names } from '~/providers/ModalProvider'

const Modals = () => {
  const { state } = useModal()

  return (
    <>
      {state.name === names.AuthModal && <AuthModal {...state.props} />}
      {state.name === names.ConfirmLogoutModal && <ConfirmLogoutModal {...state.props} />}
      {state.name === names.ConfirmProjectDeleteModal && <ConfirmProjectDeleteModal {...state.props} />}
      {state.name === names.CreateProjectModal && <CreateProjectModal {...state.props} />}
    </>
  )
}
export default Modals
