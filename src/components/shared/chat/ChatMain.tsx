import '~/assets/styles/shared/chat/ChatMain.scss'
import { cloneDeep } from 'lodash'
import { TUser, IPrivateMessages, IPrivateMessage, useSocket } from '~/providers/SocketProvider'
import React, { useEffect, useMemo, useState, useCallback } from 'react'
import EmojiPicker, { Theme, EmojiClickData } from 'emoji-picker-react'

import ChatMessage from '~/components/shared/chat/ChatMessage'

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
    createHash,
    notifications,
    onCall,
    onTyping,
    removeNotification,
    updatePrivateMessage
  } = useSocket()
  const [message, setMessage] = useState('')
  const [visibleEmojiPicker, setVisibleEmojiPicker] = useState(false)

  const hash: string = useMemo<any>(() => {
    return createHash(mySocketId, socketId)
  }, [socketId])

  const messages = useMemo(() => {
    const tmp = cloneDeep(privateMessages[hash])
    return tmp?.reverse() || []
  }, [privateMessages[hash]])

  useEffect(() => {
    if (messages.length && socketId) {
      setTimeout(() => {
        updatePrivateMessage(mySocketId, socketId)
      }, 500)
    }
  }, [messages.length, socketId])

  const newNotification = useMemo(() => {
    return notifications.find(item => item.from === socketId)
  }, [notifications, socketId])

  const hasNewNotification = useMemo(() => {
    return !!newNotification
  }, [notifications, socketId])

  useEffect(() => {
    if (hasNewNotification) {
      setTimeout(() => {
        removeNotification(newNotification?.from)
      }, 500)
    }
  }, [notifications, socketId])

  const onMessageChange = (event: React.ChangeEvent<any>) => {
    onTyping(socketId)
    setMessage(_ => event.target.value || '')
  }

  const submit = () => {
    onSendMessage(message)
    setMessage(_ => '')
  }

  const onKeyPress = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13) {
      event.preventDefault()
      submit()
    }
  }

  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    onSendMessage(message)
    setMessage(_ => '')
  }

  const toggleEmojiPicker = (event: React.MouseEvent<HTMLElement>) => {
    setVisibleEmojiPicker(prev => !prev)
  }

  const onEmojiClick = useCallback((event: EmojiClickData) => {
    setMessage(prev => prev ? `${prev} ${event.emoji}` : event.emoji)
    setVisibleEmojiPicker(false)
  }, [])

  const onClickCall = () => {
    onCall(mySocketId, socketId)
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
        <div
          className='chat-main-panel__actions'
          onClick={onClickCall}
        >
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
            messages.length ?
              messages.map((item: IPrivateMessage, index: number) => (
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
            <button
              className='chat-main-chat__field-button chat-main-chat__field-button_smile'
              onClick={toggleEmojiPicker}
            >
              <i className='fa-regular fa-face-smile' />
            </button>
            {
              visibleEmojiPicker ?
              <div style={{
                visibility: visibleEmojiPicker ? 'visible' : 'hidden',
                opacity: visibleEmojiPicker ? 1 : 0
              }}>
                <EmojiPicker
                  theme={Theme.DARK}
                  onEmojiClick={onEmojiClick}
                />
              </div>
              : ''
            }
            <textarea
              value={message}
              placeholder='Your messages...'
              className='chat-main-chat__field-input'
              onKeyDown={onKeyPress}
              onChange={onMessageChange}
            />
            <button
              className='chat-main-chat__field-button chat-main-chat__field-button_send'
              onClick={onClick}
            >
              <i className='fa-solid fa-paper-plane' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ChatMain
