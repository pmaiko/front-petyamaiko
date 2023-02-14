import '~/assets/styles/shared/chat/ChatUserCard.scss'
import { TUser } from '~/providers/SocketProvider'
import { convertTimestamp } from '~/helpers/convert-timestamp'
import { useMemo } from 'react'

interface IProps extends TUser {
  isActive: boolean
  onUserCardClick: T_onUserCardClick
}

const ChatUserCard = ({ socketId, name, timestamp, isTyping, isActive, onUserCardClick }: IProps) => {
  const _onUserCardClick = () => {
    onUserCardClick({
      socketId,
      name
    })
  }

  const date = useMemo(() => {
    return convertTimestamp(timestamp)
  }, [timestamp])

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
            {isTyping ? <span className='chat-user-card__status-typing'>...typing</span> : '-'}
          </p>
          <div className='chat-user-card__badge badge'>
            1
          </div>
        </div>
      </div>
    </div>
  )
}
export default ChatUserCard
export type T_onUserCardClick = (data: TUser) => void
