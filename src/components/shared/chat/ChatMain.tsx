import '~/assets/styles/shared/chat/ChatMain.scss'
import { TUser, IPrivateMessages, IPrivateMessage } from '~/providers/SocketProvider'
import React, { useMemo, useState } from 'react'

const createHash = (value1: string, value2: string) => {
  if (value1 && value2 && typeof value1 === 'string' && typeof value2 === 'string') {
    const hash = [value1, value2].sort()
    return hash.join('')
  }
}

interface TProps {
  activeChatMain: boolean
  onHide: () => void
  users: [TUser]
  mySocketId: string
  socketId: string
  name: string
  privateMessages: IPrivateMessages
  onSendMessage: (message: string) => void
}

const ChatMain = ({ activeChatMain, onHide, users, mySocketId, socketId, name, privateMessages, onSendMessage }: TProps) => {
  const [message, setMessage] = useState('')

  const hash: string = useMemo<any>(() => {
    return createHash(mySocketId, socketId)
  }, [socketId])

  const isActiveUser = useMemo(() => {
    return !!users.find(user => user.socketId === socketId)
  }, [users])

  const onMessageChange = (event: React.ChangeEvent<any>) => {
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
      {isActiveUser ?
        <>
          <div className='chat-main-panel shadow-down'>
            <button
              className='chat-main-panel__back icon icon_arrow-left icon_opacity-5 cursor-pointer'
              onClick={onHide}
            />
            <div className='chat-main-panel__name h4'>
              Send message: <span className='bold'>{name}</span>
            </div>
            <div className='chat-main-panel__call icon icon_ui-call icon_opacity-5 icon_w-25 cursor-pointer' />
          </div>
          <div className='chat-main-chat'>
            <ul className='chat-main-chat__messages'>
              {privateMessages[hash]?.map((item: IPrivateMessage, index: number) => (
                <li
                  key={index}
                  className='chat-main-chat__messages-item'
                >
                  <div
                    className={`chat-main-chat__message ${item.from === mySocketId ? 'chat-main-chat__message_primary' : ''}`}
                  >
                    <div className='chat-main-chat__message-text'>
                      {item.message}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className='chat-main-chat__field shadow-up'>
              <textarea
                value={message}
                placeholder='Your message here! Sey Hello!'
                className='chat-main-chat__input'
                onKeyDown={_onSendMessage}
                onChange={onMessageChange}
              />
              <div className='chat-main-chat__actions'>
                <button className='chat-main-panel__send icon icon_nerd-smile icon_opacity-5 icon_w-20 cursor-pointer' />
                <button className='chat-main-panel__send icon icon_send-mail icon_w-40 cursor-pointer' />
              </div>
            </div>
          </div>
        </> : <div>{name} leave!</div>
      }
    </div>
  )
}
export default ChatMain
