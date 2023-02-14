import '~/assets/styles/shared/chat/ChatMessage.scss'
import { convertTimestamp } from '~/helpers/convert-timestamp'
import { useMemo } from 'react'
import { IPrivateMessage } from '~/providers/SocketProvider'


interface IProps extends IPrivateMessage {
  isMyMessage: boolean
  name: string
}

const ChatMessage = ({ message, timestamp, isMyMessage, name }: IProps) => {
  const date = useMemo(() => {
    return convertTimestamp(timestamp, '*hour*:*minutes*:*seconds*')
  }, [timestamp])

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
          {date} PM
        </p>
      </div>
      <div className='chat-message__text'>
        {message}
      </div>
    </div>
  )
}
export default ChatMessage