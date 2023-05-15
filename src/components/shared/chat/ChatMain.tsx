import '~/assets/styles/shared/chat/ChatMain.scss'
import { cloneDeep } from 'lodash'

import { SocketID, User, Message } from '~/types/chat'

import React, { useEffect, useMemo, useState, useCallback } from 'react'
import EmojiPicker, { Theme, EmojiClickData } from 'emoji-picker-react'

import ChatMessage from '~/components/shared/chat/ChatMessage'

interface Props {
  sender: User
  recipient: User
  messages: Message[]
  onHide: () => void
  onSendMessage: (text: string) => void,
  onWatchedMessage?: (id: string) => void
}

const ChatMain = (props: Props) => {
  const [state, setState] = useState({
    text: ''
  })

  const methods = {
    sendMessage () {
      setState((prevState) => {
        return {
          ...prevState,
          text: ''
        }
      })
      props.onSendMessage(state.text)
    },

    onKeyPress (event: React.KeyboardEvent) {
      if (event.keyCode === 13) {
        event.preventDefault()
        methods.sendMessage()
      }
    },

    onChange (event: React.ChangeEvent<any>) {
      setState((prevState) => {
        return {
          ...prevState,
          text: event.target.value
        }
      })
    },

    onClick (event: React.MouseEvent<HTMLElement>) {
      methods.sendMessage()
    }
  }
  // const [message, setMessage] = useState('')
  // const [visibleEmojiPicker, setVisibleEmojiPicker] = useState(false)
  //
  // const messages = useMemo(() => {
  //   const tmp = cloneDeep(privateMessages[hash])
  //   return tmp?.reverse() || []
  // }, [privateMessages[hash]])
  //
  // useEffect(() => {
  //   if (messages.length && socketId) {
  //     setTimeout(() => {
  //       updatePrivateMessage(mySocketId, socketId)
  //     }, 500)
  //   }
  // }, [messages.length, socketId])
  //
  // const newNotification = useMemo(() => {
  //   return notifications.find(item => item.from === socketId)
  // }, [notifications, socketId])
  //
  // const hasNewNotification = useMemo(() => {
  //   return !!newNotification
  // }, [notifications, socketId])

  // useEffect(() => {
  //   if (hasNewNotification) {
  //     setTimeout(() => {
  //       removeNotification(newNotification?.from)
  //     }, 500)
  //   }
  // }, [notifications, socketId])

  // const onMessageChange = (event: React.ChangeEvent<any>) => {
  //   onTyping(socketId)
  //   setMessage(_ => event.target.value || '')
  // }

  // const submit = () => {
  //   onSendMessage(message)
  //   setMessage(_ => '')
  // }

  // const onKeyPress = (event: React.KeyboardEvent) => {
  //   if (event.keyCode === 13) {
  //     event.preventDefault()
  //     submit()
  //   }
  // }

  // const onClick = (event: React.MouseEvent<HTMLElement>) => {
  //   onSendMessage(message)
  //   setMessage(_ => '')
  // }

  // const toggleEmojiPicker = (event: React.MouseEvent<HTMLElement>) => {
  //   setVisibleEmojiPicker(prev => !prev)
  // }

  // const onEmojiClick = useCallback((event: EmojiClickData) => {
  //   setMessage(prev => prev ? `${prev} ${event.emoji}` : event.emoji)
  //   setVisibleEmojiPicker(false)
  // }, [])

  // const onClickCall = () => {
  //   onCall(mySocketId, socketId)
  // }

  return (
    <div className='chat-main'>
      <div className='chat-main-panel shadow-down'>
        <button
          className='chat-main-panel__back'
          onClick={props.onHide}
        >
          <i className='fa-solid fa-chevron-left' />
        </button>
        <div className='chat-main-panel__recipient'>
          <div className='chat-main-panel__recipient-image'>
            <i className='fa-solid fa-circle-user' />
          </div>
          <div className='chat-main-panel__recipient-info'>
            <p className='chat-main-panel__recipient-name bold'>
              {props.recipient.name}
            </p>
            <p className='chat-main-panel__recipient-status small'>
              {props.recipient.typing ? <span className='chat-main-panel__recipient-status-typing'>...typing</span> : 'Online'}
            </p>
          </div>
        </div>
        {/*<div*/}
        {/*  className='chat-main-panel__actions'*/}
        {/*  onClick={onClickCall}*/}
        {/*>*/}
        {/*  <button>*/}
        {/*    <i className='fa-solid fa-phone' />*/}
        {/*  </button>*/}
        {/*  <button>*/}
        {/*    <i className='fa-solid fa-video' />*/}
        {/*  </button>*/}
        {/*</div>*/}
      </div>
      <div className='chat-main-chat'>
        <ul className='chat-main-chat__messages'>
          {
            !!props.messages.length ?
              props.messages.map((message, index) => (
                <li
                  key={message.id || index}
                  className='chat-main-chat__messages-item'
                >
                  <ChatMessage
                    {...message}
                    name={props.sender.name}
                    highlight={props.sender.socketId === message.senderId}
                    onWatched={props.onWatchedMessage}
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
            {/*<button*/}
            {/*  className='chat-main-chat__field-button chat-main-chat__field-button_smile'*/}
            {/*  onClick={toggleEmojiPicker}*/}
            {/*>*/}
            {/*  <i className='fa-regular fa-face-smile' />*/}
            {/*</button>*/}
            {/*{*/}
            {/*  visibleEmojiPicker ?*/}
            {/*  <div style={{*/}
            {/*    visibility: visibleEmojiPicker ? 'visible' : 'hidden',*/}
            {/*    opacity: visibleEmojiPicker ? 1 : 0*/}
            {/*  }}>*/}
            {/*    <EmojiPicker*/}
            {/*      theme={Theme.DARK}*/}
            {/*      onEmojiClick={onEmojiClick}*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*  : ''*/}
            {/*}*/}
            <textarea
              value={state.text}
              placeholder='Your messages...'
              className='chat-main-chat__field-input'
              onKeyDown={methods.onKeyPress}
              onChange={methods.onChange}
            />
            <button
              className='chat-main-chat__field-button chat-main-chat__field-button_send'
              onClick={methods.onClick}
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
