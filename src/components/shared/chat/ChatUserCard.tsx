import '~/assets/styles/shared/chat/ChatUserCard.scss'
import { User, onClickUserCard, Message } from '~/types/chat'
import { convertTimestamp } from '~/helpers/convert-timestamp'

import { useMemo } from 'react'
// import { cloneDeep } from 'lodash'

interface IProps {
  user: User
  notificationsQuantity: number,
  lastMessage: Message,
  active: boolean,
  onClickUserCard: onClickUserCard
}

const ChatUserCard = (props: IProps) => {
  const onClick = () => {
    props.onClickUserCard(props.user)
  }

  // const hash: string = useMemo<any>(() => {
  //   return createHash(mySocketId, socketId)
  // }, [socketId])
  //
  const date = useMemo(() => {
    return convertTimestamp(props.user.timestamp)
  }, [props.user.timestamp])
  //
  // const notification = useMemo(() => {
  //   return notifications.find(item => item.from === socketId)
  // }, [notifications])
  //
  // const lastMessage = useMemo(() => {
  //   if (privateMessages[hash]) {
  //     let messages = cloneDeep(privateMessages[hash])
  //     messages = messages.reverse() as [IPrivateMessage]
  //     return messages.find(item => item.to === mySocketId)?.message || ''
  //   }
  // }, [privateMessages[hash], socketId])

  return (
    <div
      className={`chat-user-card ${props.active ? 'chat-user-card_active' : ''}`}
      onClick={onClick}
    >
      <div className='chat-user-card__image'>
        <i className='fa-solid fa-circle-user' />
      </div>
      <div className='chat-user-card__inner'>
        <div className='chat-user-card__head'>
          <p className='chat-user-card__name'>
            {props.user.name}
          </p>
          <div className='chat-user-card__date small'>
            {date} PM
          </div>
        </div>
        <div className='chat-user-card__body'>
          <p className='chat-user-card__status'>
            {props.user.typing ? <span className='chat-user-card__status-typing'>...typing</span> : props.lastMessage.text ? props.lastMessage.text : '-'}
          </p>
          {
            !!props.notificationsQuantity &&
            <div className='chat-user-card__badge badge badge_br'>
              {props.notificationsQuantity}
            </div>
          }
        </div>
      </div>
    </div>
  )
}
export default ChatUserCard
