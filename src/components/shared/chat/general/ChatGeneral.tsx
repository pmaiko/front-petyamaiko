import { memo } from 'react'
import { GeneralMessage, User } from '~/types/chatTypes'
import ChatMessages from '~/components/shared/chat/dialog/ChatMessages'
import ChatMessagePanel from '~/components/shared/chat/dialog/ChatMessagePanel'

interface Props {
  sender: User
  messages: GeneralMessage[] | null
  onHide: () => void
  onSendMessage: (text: string) => void,
}

const ChatGeneral = (props: Props) => {
  return (
    <div className='chat-dialog'>
      <div className='chat-dialog-panel shadow-down'>
        <button
          className='chat-dialog-panel__back'
          onClick={props.onHide}
        >
          <i className='fa-solid fa-chevron-left' />
        </button>
        <div className='chat-dialog-panel__recipient'>
          <div className='chat-dialog-panel__recipient-info'>
            GENERAL CHAT
          </div>
        </div>
      </div>
      <div className='chat-dialog-chat'>
        <ChatMessages
          sender={props.sender}
          messages={props.messages}
        />
        <ChatMessagePanel
          onSendMessage={props.onSendMessage}
        />
      </div>
    </div>
  )
}

export default memo(ChatGeneral)
