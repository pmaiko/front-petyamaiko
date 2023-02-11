import '~/assets/styles/shared/chat/ChatSidebar.scss'
import { useMemo } from 'react'
import { useSocket, TUser } from '~/providers/SocketProvider'

import ChatUserCard, { T_onUserCardClick } from '~/components/shared/chat/ChatUserCard'

const ChatSidebar = ({ mySocketId, onUserCardClick }: {
  mySocketId: string,
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
      <div className='d-flex align-items-center'>
        <span className='icon icon_user-alt-6 mr-8' />
        <span className='uppercase h5 bold'>Profile</span>
      </div>

      <div className='chat-sidebar__profile'>
        <div className='chat-sidebar__profile-name h4'>Hi! <span className='bold'>{ profile?.name }</span></div>
        <button className='icon icon_notification icon_opacity-5 ml-8' />
      </div>
      <div className='d-flex align-items-center'>
        <span className='icon icon_address-book mr-8' />
        <span className='uppercase h5 bold'>Online users</span>
      </div>
      <ul className='chat-sidebar__users'>
        {_users?.length ?
          _users.map((user, index) => (
            <li
              key={index}
              className='chat-user-card'
            >
              <ChatUserCard
                {...user}
                onUserCardClick={onUserCardClick}
              />
            </li>
          )) :
          <div>There's no one here yet!</div>
        }
      </ul>
    </div>
  )
}
export default ChatSidebar
