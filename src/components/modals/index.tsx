import { RootState } from '~/store/reducers'
import { useSelector } from 'react-redux'

import AuthModal from '~/components/modals/AuthModal/AuthModal'
import ConfirmLogoutModal from '~/components/modals/ConfirmLogoutModal/ConfirmLogoutModal'
import ConfirmProjectDeleteModal from '~/components/modals/ConfirmProjectDeleteModal/ConfirmProjectDeleteModal'
import CreateProjectModal from '~/components/modals/CreateProjectModal/CreateProjectModal'

const Modals = () => {
  const authModal = useSelector((state: RootState) => state.modals.authModal)
  const confirmLogoutModal = useSelector((state: RootState) => state.modals.confirmLogoutModal)

  const confirmProjectDeleteModal = useSelector((state: RootState) => state.modals.confirmProjectDeleteModal)
  const confirmProjectDeleteModalProps = useSelector((state: RootState) => state.modals.confirmProjectDeleteModalProps)

  const createProjectModal = useSelector((state: RootState) => state.modals.createProjectModal)
  const createProjectModalProps = useSelector((state: RootState) => state.modals.createProjectModalProps)

  return (
    <>
      {authModal && <AuthModal />}
      {confirmLogoutModal && <ConfirmLogoutModal />}
      {confirmProjectDeleteModal && <ConfirmProjectDeleteModal {...confirmProjectDeleteModalProps} />}
      {createProjectModal && <CreateProjectModal {...createProjectModalProps} />}
    </>
  )
}
export default Modals
