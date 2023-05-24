import '~/assets/styles/shared/chat/ChatDialog.scss'

import { User, Message } from '~/types/chatTypes'

import { memo } from 'react'

import ChatMessages from '~/components/shared/chat/dialog/ChatMessages'
import ChatMessagePanel from '~/components/shared/chat/dialog/ChatMessagePanel'

interface Props {
  sender: User
  recipient: User
  messages: Message[]
  onHide: () => void
  onSendMessage: (text: string) => void,
  onWatchedMessage?: (id: string) => void,
  onTyping: () => void
}

const ChatDialog = (props: Props) => {
  const methods = {
    onClickCall () {
      //
    }
  }

  // const onClickCall = () => {
  //   onCall(mySocketId, socketId)
  // }

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
          <div className='chat-dialog-panel__recipient-image'>
            <i className='fa-solid fa-circle-user' />
          </div>
          <div className='chat-dialog-panel__recipient-info'>
            <p className='chat-dialog-panel__recipient-name bold'>
              {props.recipient.name}
            </p>
            <p className='chat-dialog-panel__recipient-status small'>
              {props.recipient.typing ? <span className='chat-dialog-panel__recipient-status-typing'>...typing</span> : 'Online'}
            </p>
          </div>
        </div>
        <div
          className='chat-dialog-panel__actions'
          onClick={methods.onClickCall}
        >
          <button>
            <i className='fa-solid fa-phone' />
          </button>
          <button>
            <i className='fa-solid fa-video' />
          </button>
        </div>
      </div>
      <div className='chat-dialog-chat'>
        <ChatMessages
          sender={props.sender}
          messages={props.messages}
          onWatchedMessage={props.onWatchedMessage}
        />
        <ChatMessagePanel
          onSendMessage={props.onSendMessage}
          onTyping={props.onTyping}
        />
      </div>
    </div>
  )
}
export default memo(ChatDialog)
