import './ConfirmProjectDeleteModal.scss'

import { RootState } from '~/store/reducers'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { useActions } from '~/hooks/useActions'
// @ts-ignore
import { NotificationManager } from 'react-notifications'

import BaseModal from '~/components/base/BaseModal'
import BaseButton from '~/components/base/BaseButton'

const ConfirmProjectDeleteModal = (props: any) => {
  const confirmProjectDeleteModal = useSelector((state: RootState) => state.modals.confirmProjectDeleteModal)
  const { confirmProjectDeleteModalHide, logout } = useActions()

  const closeModal: any = useRef()

  const onConfirm = async () => {
    props?.onConfirm()
    closeModal?.current()
  }

  const onCansel = () => {
    closeModal?.current()
  }
  return (
    <BaseModal
      isOpen={confirmProjectDeleteModal}
      ref={closeModal}
      closeModal={confirmProjectDeleteModalHide}
    >
      <div className='confirm-project-delete-modal'>
        <h3 className='confirm-project-delete-modal__title'>
          delete project?
        </h3>

        <div className='confirm-project-delete-modal__buttons'>
          <div className='confirm-project-delete-modal__buttons-inner'>
            <div className='confirm-project-delete-modal__buttons-col'>
              <BaseButton
                onClick={onConfirm}
              >
                Confirm
              </BaseButton>
            </div>
            <div className='confirm-project-delete-modal__buttons-col'>
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

export default ConfirmProjectDeleteModal
