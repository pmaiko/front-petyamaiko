import '~/assets/styles/shared/chat/ChatUserCard.scss'
import { TUser } from '~/providers/SocketProvider'

interface IProps extends TUser {
  onUserCardClick: T_onUserCardClick
}

const ChatUserCard = ({ socketId, name, date, onUserCardClick }: IProps) => {
  const _onUserCardClick = () => {
    onUserCardClick({
      socketId,
      name
    })
  }
  return (
    <div
      className='chat-user-card'
      onClick={_onUserCardClick}
    >
      <div className='chat-user-card__image'>
        <div className='chat-user-card__image-icon icon icon_user-alt-6' />
      </div>
      <div className='chat-user-card__info'>
        <p className='chat-user-card__name'>
          { name }
        </p>
        <p className='chat-user-card__date small'>
          03/03/2023
        </p>
      </div>
    </div>
  )
}
export default ChatUserCard
export type T_onUserCardClick = (data: TUser) => void
