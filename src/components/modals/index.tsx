import AuthModal from '~/components/modals/AuthModal'
import ConfirmLogoutModal from '~/components/modals/ConfirmLogoutModal'
import ConfirmProjectDeleteModal from '~/components/modals/ConfirmProjectDeleteModal'
import CreateProjectModal from '~/components/modals/CreateProjectModal'

import { useModal, ModalNames } from '~/providers/ModalProvider'

const Modals = () => {
  const { state } = useModal()

  return (
    <>
      {state.name === ModalNames.AuthModal && <AuthModal {...state.props} />}
      {state.name === ModalNames.ConfirmLogoutModal && <ConfirmLogoutModal {...state.props} />}
      {state.name === ModalNames.ConfirmProjectDeleteModal && <ConfirmProjectDeleteModal {...state.props} />}
      {state.name === ModalNames.CreateProjectModal && <CreateProjectModal {...state.props} />}
    </>
  )
}
export default Modals
