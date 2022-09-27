// @ts-ignore
import Modal from 'react-modal'

// https://reactcommunity.org/react-modal/

import { ReactComponent as CloseIcon } from '~/assets/svg/close-icon.svg'
import { forwardRef, useEffect, useState } from 'react'

Modal.setAppElement('#root')

const CLOSE_TIMEOUT_MS: number = 300

const BaseModal = forwardRef((props: any, ref: any) => {
  const [isOpen, setIsOpen] = useState(props.isOpen)

  const closeModal = () => {
    setIsOpen(false)

    setTimeout(() => {
      props.closeModal()
    }, CLOSE_TIMEOUT_MS)
  }

  useEffect(() => {
    if (ref) {
      ref.current = closeModal
    }
  }, [])

  return (
    <Modal
      isOpen={isOpen}
      className='base-modal'
      overlayClassName='base-modal-overlay'
      onRequestClose={closeModal}
      closeTimeoutMS={CLOSE_TIMEOUT_MS}
    >
      <div
        className='base-modal__close'
        onClick={closeModal}
      >
        <CloseIcon />
      </div>
      {props.children}
    </Modal>
  )
})

export default BaseModal
