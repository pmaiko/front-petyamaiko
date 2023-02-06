import '~/assets/styles/modals/ConfirmProjectDeleteModal.scss'

import { useRef } from 'react'
import { useModal } from '~/providers/ModalProvider'

import BaseModal from '~/components/base/BaseModal'
import BaseButton from '~/components/base/BaseButton'

const ConfirmProjectDeleteModal = (props: any) => {
  const { hide } = useModal()
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
      isOpen={true}
      ref={closeModal}
      closeModal={hide}
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
