import '~/assets/styles/shared/chat/ChatSidebar.scss'
import { useMemo } from 'react'
import { useSocket, TUser } from '~/providers/SocketProvider'

import ChatUserCard, { T_onUserCardClick } from '~/components/shared/chat/ChatUserCard'

const ChatSidebar = ({ mySocketId, privateChatData, onUserCardClick }: {
  mySocketId: string,
  privateChatData: TUser
  onUserCardClick: T_onUserCardClick
}) => {
  const { users } = useSocket()

  const _users = useMemo(() => {
    return users.filter(user => user.socketId !== mySocketId)
  }, [users])

  const profile = useMemo(() => {
    return users.find(user => user.socketId === mySocketId)
  }, [users])
  return (
    <div
      className='chat-sidebar'
    >
      <div className='chat-sidebar__head'>
        <h2 className='chat-sidebar__head-title'>
          Messages
        </h2>
        <div className='chat-sidebar__head-count badge'>
          12
        </div>
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
          _users?.length ?
            <ul className='chat-sidebar__users-list'>
              {
                _users.map((user, index) => (
                  <li
                    key={index}
                    className='chat-sidebar__users-list-item'
                  >
                    <ChatUserCard
                      {...user}
                      isActive={privateChatData.socketId === user.socketId}
                      onUserCardClick={onUserCardClick}
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
export default ChatSidebar
