import '~/assets/styles/shared/chat/ChatUserCard.scss'

const ChatUserCard = ({ socketId, name, date }: {
  socketId: string,
  name: string,
  date?: string
}) => {
  return (
    <div className='chat-user-card'>
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
