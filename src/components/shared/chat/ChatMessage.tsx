import '~/assets/styles/shared/chat/ChatMessage.scss'

const ChatMessage = ({ isMyMessage, message, name }: {
  message: string
  name: string,
  isMyMessage: boolean
}) => {
  return (
    <div className={`chat-message ${isMyMessage ? 'chat-message_is-my-message' : ''}`}>
      <div className='chat-message__info'>
        <div className='chat-message__image'>
          <i className='fa-solid fa-circle-user' />
        </div>
        <div className='chat-message__name'>
          {isMyMessage ? 'You' : name}
        </div>
        <p className='chat-message__date small'>
          09.36 PM
        </p>
      </div>
      <div className='chat-message__text'>
        {message}
      </div>
    </div>
  )
}
export default ChatMessage
