import '~/assets/styles/shared/chat/ChatMessages.scss'

import { User, Message, GeneralMessage } from '~/types/chatTypes'
import { memo } from 'react'

import ChatMessage from '~/components/shared/chat/dialog/ChatMessage'

interface Props {
  sender: User
  messages: Message[] | GeneralMessage[] | null,
  onWatchedMessage?: (id: string) => void
}
const ChatMessages = (props: Props) => {
  return (
    <ul className='chat-messages'>
      {
        !!props.messages?.length &&
          props.messages.map(message => (
            <li
              key={message.id}
              className='chat-messages__item'
            >
              {
                <ChatMessage
                  message={message}
                  name={'sender' in message ? message.sender.name : props.sender.name}
                  highlight={'sender' in message ? props.sender.socketId === message.sender.socketId : props.sender.socketId === message.senderId}
                  onWatched={props.onWatchedMessage}
                />
              }
            </li>
          ))
      }
    </ul>
  )
}

export default memo(ChatMessages)
