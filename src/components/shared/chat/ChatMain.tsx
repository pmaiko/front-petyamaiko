import '~/assets/styles/shared/chat/ChatMain.scss'
import { TUser, IPrivateMessages, IPrivateMessage, useSocket } from '~/providers/SocketProvider'
import React, { useMemo, useState } from 'react'
import ChatMessage from '~/components/shared/chat/ChatMessage'

const createHash = (value1: string, value2: string) => {
  if (value1 && value2 && typeof value1 === 'string' && typeof value2 === 'string') {
    const hash = [value1, value2].sort()
    return hash.join('')
  }
}

interface TProps extends TUser {
  activeChatMain: boolean
  onHide: () => void
  users: [TUser]
  mySocketId: string
  privateMessages: IPrivateMessages
  onSendMessage: (message: string) => void
}

const ChatMain = ({ activeChatMain, onHide, users, mySocketId, socketId, name, isTyping, privateMessages, onSendMessage }: TProps) => {
  const {
    onTyping
  } = useSocket()
  const [message, setMessage] = useState('')

  const hash: string = useMemo<any>(() => {
    return createHash(mySocketId, socketId)
  }, [socketId])

  const onMessageChange = (event: React.ChangeEvent<any>) => {
    onTyping(socketId)
    setMessage(_ => event.target.value || '')
  }

  const _onSendMessage = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13) {
      event.preventDefault()
      onSendMessage(message)
      setMessage(_ => '')
    }
  }
  return (
    <div className={`chat-main ${activeChatMain ? 'chat-main_active' : ''}`}>
      <div className='chat-main-panel shadow-down'>
        <button
          className='chat-main-panel__back'
          onClick={onHide}
        >
          <i className='fa-solid fa-chevron-left' />
        </button>
        <div className='chat-main-panel__recipient'>
          <div className='chat-main-panel__recipient-image'>
            <i className='fa-solid fa-circle-user' />
          </div>
          <div className='chat-main-panel__recipient-info'>
            <p className='chat-main-panel__recipient-name bold'>
              {name}
            </p>
            <p className='chat-main-panel__recipient-status small'>
              {isTyping ? <span className='chat-main-panel__recipient-status-typing'>...typing</span> : 'Online'}
            </p>
          </div>
        </div>
        <div className='chat-main-panel__actions'>
          <button>
            <i className='fa-solid fa-phone' />
          </button>
          <button>
            <i className='fa-solid fa-video' />
          </button>
        </div>
      </div>
      <div className='chat-main-chat'>
        <ul className='chat-main-chat__messages'>
          {
            privateMessages[hash]?.length ?
              privateMessages[hash]?.reverse().map((item: IPrivateMessage, index: number) => (
                <li
                  key={index}
                  className='chat-main-chat__messages-item'
                >
                  <ChatMessage
                    {...item}
                    name={name}
                    isMyMessage={item.from === mySocketId}
                  />
                </li>
              ))
              :
                <li className='chat-main-chat__messages-empty'>
                  There is nothing here yet...
                </li>
          }
        </ul>
        <div className='chat-main-chat__new-message shadow-up'>
          <div className='chat-main-chat__field'>
            <button className='chat-main-chat__field-button chat-main-chat__field-button_smile'>
              <i className='fa-regular fa-face-smile' />
            </button>
            <textarea
              value={message}
              placeholder='Your messages...'
              className='chat-main-chat__field-input'
              onKeyDown={_onSendMessage}
              onChange={onMessageChange}
            />
            <button className='chat-main-chat__field-button chat-main-chat__field-button_send'>
              <i className='fa-solid fa-paper-plane' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ChatMain
