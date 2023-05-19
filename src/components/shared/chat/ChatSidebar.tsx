import '~/assets/styles/shared/chat/ChatSidebar.scss'
import { User, Messages } from '~/types/chatTypes'
import { getConversationId } from '~/helpers/get-сonversation-id'

import { useMemo, useCallback, memo } from 'react'

import ChatUserCard from '~/components/shared/chat/ChatUserCard'

interface Props {
  users: User[],
  sender: User,
  recipient: User,
  messages: Messages,
  onClickUserCard: (user: User) => void
}

const ChatSidebar = (props: Props) => {
  const formattedUsers = useMemo(() => {
    return props.users.filter(user => user.socketId !== props.sender.socketId)
  }, [props.users])

  const notifications = useMemo(() => {
    return Object.entries(props.messages).reduce((acc, [key, messages]) => {
      acc[key as string] = messages?.filter(message => !message.watched && message.recipientId === props.sender.socketId).map(message => message.text)
      return acc
    }, {} as Partial<{ [key: string]: string[] }>)
  }, [props.messages])

  const notificationsQuantity = useMemo(() => {
    const arr = Object.values(notifications).flatMap((messages) => messages)
    return arr.length
  }, [notifications])

  const getLastMessage = useCallback((user: User) => {
    const messages = props.messages[getConversationId(user.socketId, props.sender.socketId)]
      ?.filter(message => message.recipientId === props.sender.socketId)
      ?.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0)) || []

    return messages[messages.length - 1] || null
  }, [props.messages])
  return (
    <div
      className='chat-sidebar'
    >
      <div className='chat-sidebar__head'>
        <h2 className='chat-sidebar__head-title'>
          Messages
        </h2>
        {
          !!notificationsQuantity &&
          <div className='chat-sidebar__head-count badge'>
            {notificationsQuantity}
          </div>
        }
      </div>

      <div className='chat-sidebar__users'>
        <div className='chat-sidebar__users-head'>
          <p className='chat-sidebar__users-head-title'>
            Users:
          </p>
          <div className='chat-sidebar__users-head-icon'>
            <i className='fa-solid fa-chevron-down' />
          </div>
        </div>
        {
          !!formattedUsers?.length ?
            <ul className='chat-sidebar__users-list'>
              {
                formattedUsers.map(user => (
                  <li
                    key={user.socketId}
                    className='chat-sidebar__users-list-item'
                  >
                    <ChatUserCard
                      user={user}
                      notificationsQuantity={notifications[getConversationId(user.socketId, props.sender.socketId)]?.length || 0}
                      lastMessage={getLastMessage(user)}
                      active={user.socketId === props.recipient.socketId}
                      onClickUserCard={props.onClickUserCard}
                    />
                  </li>
                ))
              }
            </ul>
          :
            <div className='chat-sidebar__users-empty'>
              <div className='chat-sidebar__users-empty-icon'>
                <i className='fa-solid fa-magnifying-glass' />
              </div>
              <p className='chat-sidebar__users-empty-text'>
                There's no one here yet!
              </p>
            </div>
        }
      </div>
    </div>
  )
}
export default memo(ChatSidebar)
