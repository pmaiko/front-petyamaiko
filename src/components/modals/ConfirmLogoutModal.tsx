import '../../assets/styles/modals/ConfirmLogoutModal.scss'

import { useRef } from 'react'
import { useActions } from '~/hooks/useActions'
// @ts-ignore
import { NotificationManager } from 'react-notifications'

import BaseModal from '~/components/base/BaseModal'
import BaseButton from '~/components/base/BaseButton'

import { useModal } from '~/providers/ModalProvider'

const ConfirmLogoutModal = () => {
  const { hide } = useModal()
  const { logout } = useActions()

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
      isOpen={true}
      ref={closeModal}
      closeModal={hide}
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
