import { useSocket } from '~/providers/SocketProvider'
import { useMemo } from 'react'

const ChatCallCalling = () => {
  const {
    mySocketId,
    callInfo,
    onCancelCall,
    onSpeaking
  } = useSocket()
  const ICalling = useMemo(() => {
    return callInfo?.from === mySocketId
  }, [callInfo])

  const CallingMe = useMemo(() => {
    return callInfo?.to === mySocketId
  }, [callInfo])

  return (
    <div className='chat-call-calling'>
      <div className='chat-call-calling__name h4'>
        { ICalling ? `Calling ${callInfo?.toUser?.name}` : CallingMe ? `${callInfo?.fromUser?.name} is calling you!` : '' }
      </div>
      <div className='chat-call-calling__image'>
        <i className='fa-solid fa-circle-user' />
      </div>
      <div className='chat-call-calling__buttons'>
        <button
          className='chat-call__button chat-call__button_cansel'
          onClick={onCancelCall}
        >
          <i className='fa-solid fa-xmark' />
        </button>
        {
          CallingMe ?
            <button
              className='chat-call__button chat-call__button_confirm'
              onClick={onSpeaking}
            >
              <i className='fa-solid fa-phone-volume' />
            </button>
          : ''
        }
      </div>
    </div>
  )
}

export default ChatCallCalling
