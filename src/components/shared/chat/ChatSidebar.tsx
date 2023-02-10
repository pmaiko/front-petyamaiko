import '~/assets/styles/shared/chat/ChatSidebar.scss'
import { useSocket } from '~/providers/SocketProvider'

import ChatUserCard from '~/components/shared/chat/ChatUserCard'

const ChatSidebar = () => {
  const { users } = useSocket()
  return (
    <div
      className='chat-sidebar'
    >
      <div className='d-flex align-items-center'>
        <span className='icon icon_address-book mr-8' />
        <span className='uppercase h5 bold'>Online</span>
      </div>
      <ul className='chat-sidebar__users'>
        {users.map((user, index) => (
          <li
            key={index}
            className='chat-user-card'
          >
            <ChatUserCard
              {...user}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
export default ChatSidebar
