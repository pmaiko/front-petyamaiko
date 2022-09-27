import './ConfirmLogoutModal.scss'

import { RootState } from '~/store/reducers'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { useActions } from '~/hooks/useActions'
// @ts-ignore
import { NotificationManager } from 'react-notifications'

import BaseModal from '~/components/base/BaseModal'
import BaseButton from '~/components/base/BaseButton'

const ConfirmLogoutModal = () => {
  const confirmLogoutModal = useSelector((state: RootState) => state.modals.confirmLogoutModal)
  const { confirmLogoutModalHide, logout } = useActions()

  const closeModal: any = useRef()

  const onConfirm = async () => {
    try {
      const response: any = await logout()
      NotificationManager.success(response?.message)
      closeModal?.current()
    } catch (error) {
      NotificationManager.success('ERROR')
    }
  }

  const onCansel = () => {
    closeModal?.current()
  }
  return (
    <BaseModal
      isOpen={confirmLogoutModal}
      ref={closeModal}
      closeModal={confirmLogoutModalHide}
    >
      <div className='confirm-logout-modal'>
        <h3 className='confirm-logout-modal__title'>
          Are you sure you want to leave?
        </h3>

        <div className='confirm-logout-modal__buttons'>
          <div className='confirm-logout-modal__buttons-inner'>
            <div className='confirm-logout-modal__buttons-col'>
              <BaseButton
                onClick={onConfirm}
              >
                Confirm
              </BaseButton>
            </div>
            <div className='confirm-logout-modal__buttons-col'>
              <BaseButton
                theme='secondary'
                onClick={onCansel}
              >
                Cansel
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  )
}

export default ConfirmLogoutModal
