import '~/assets/styles/shared/chat/AlertMessageComponent.scss'

import { AlertMessage, User } from '~/types/chatTypes'
import { memo, forwardRef, RefObject, useEffect } from 'react'
import alertSoundSrc from '~/assets/audio/alert-sound1.mp3'

const audio = new Audio(alertSoundSrc)
audio.volume = 0.4

interface Props extends AlertMessage {
  _ref: any
  onClose: () => void
  onSenderClick: (recipient: User) => void
}

const AlertMessageComponent = forwardRef((props: Props) => {
  const onSenderClick = () => {
    props.onClose()
    if (props.sender) {
      props.onSenderClick(props.sender)
    }
  }

  useEffect(() => {
    audio.play()
  }, [props.text])

  return (
    <div
      ref={props._ref}
      className='alert-message-component'
    >
      <div className='alert-message-component__wrapper'>
        <button
          className='alert-message-component__close'
          onClick={props.onClose}
        >
          <i className='fa-solid fa-xmark' />
        </button>
        <p className='alert-message-component__title'>
          New message!
        </p>

        <div className='alert-message-component__inner'>
          <div className='alert-message-component__image'>
            <i className='fa-solid fa-circle-user' />
          </div>
          <div className='alert-message-component__content'>
            <button
              className='alert-message-component__name'
              onClick={onSenderClick}
            >
              {props?.sender?.name}
            </button>
            <p className='alert-message-component__text'>
              {props.text}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
})

export default memo(AlertMessageComponent)
