import '~/assets/styles/shared/chat/ChatMessages.scss'

import { User, Message } from '~/types/chatTypes'
import { memo } from 'react'

import ChatMessage from '~/components/shared/chat/dialog/ChatMessage'

interface Props {
  sender: User
  messages: Message[],
  onWatchedMessage?: (id: string) => void
}
const ChatMessages = (props: Props) => {
  return (
    <ul className='chat-messages'>
      {
        !!props.messages.length &&
          props.messages.map(message => (
            <li
              key={message.id}
              className='chat-messages__item'
            >
              <ChatMessage
                {...message}
                name={props.sender.name}
                highlight={props.sender.socketId === message.senderId}
                onWatched={props.onWatchedMessage}
              />
            </li>
          ))
      }
    </ul>
  )
}

export default memo(ChatMessages)
