import '~/assets/styles/shared/chat/ChatUserCard.scss'
import { IPrivateMessage, TUser, useSocket } from '~/providers/SocketProvider'
import { convertTimestamp } from '~/helpers/convert-timestamp'
import { useMemo } from 'react'
import { cloneDeep } from 'lodash'

interface IProps extends TUser {
  isActive: boolean
  onUserCardClick: T_onUserCardClick
}

const ChatUserCard = ({ socketId, name, timestamp, isTyping, isActive, onUserCardClick }: IProps) => {
  const {
    mySocketId,
    privateMessages,
    createHash,
    notifications
  } = useSocket()

  const _onUserCardClick = () => {
    onUserCardClick({
      socketId,
      name
    })
  }

  const hash: string = useMemo<any>(() => {
    return createHash(mySocketId, socketId)
  }, [socketId])

  const date = useMemo(() => {
    return convertTimestamp(timestamp)
  }, [timestamp])

  const notification = useMemo(() => {
    return notifications.find(item => item.from === socketId)
  }, [notifications])

  const lastMessage = useMemo(() => {
    if (privateMessages[hash]) {
      let messages = cloneDeep(privateMessages[hash])
      messages = messages.reverse() as [IPrivateMessage]
      return messages.find(item => item.to === mySocketId)?.message || ''
    }
  }, [privateMessages[hash], socketId])

  return (
    <div
      className={`chat-user-card ${isActive ? 'chat-user-card_active' : ''}`}
      onClick={_onUserCardClick}
    >
      <div className='chat-user-card__image'>
        <i className='fa-solid fa-circle-user' />
      </div>
      <div className='chat-user-card__inner'>
        <div className='chat-user-card__head'>
          <p className='chat-user-card__name'>
            { name }
          </p>
          <div className='chat-user-card__date small'>
            {date} PM
          </div>
        </div>
        <div className='chat-user-card__body'>
          <p className='chat-user-card__status'>
            {isTyping ? <span className='chat-user-card__status-typing'>...typing</span> : lastMessage ? lastMessage : '-'}
          </p>
          {
            notification ?
              <div className='chat-user-card__badge badge badge_br'>
                new
              </div>
            : ''
          }
        </div>
      </div>
    </div>
  )
}
export default ChatUserCard
export type T_onUserCardClick = (data: TUser) => void
