import { useSocket } from '~/providers/SocketProvider'

const ChatCallCompleted = () => {
  const {
    onCancelCall
  } = useSocket()

  return (
    <div className='chat-call-completed'>
      Conversation ended

      <button
        style={{
          marginTop: '1rem'
        }}
        className='chat-call__button chat-call__button_cansel'
        onClick={onCancelCall}
      >
        <i className='fa-solid fa-xmark' />
      </button>
    </div>
  )
}

export default ChatCallCompleted
