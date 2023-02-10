import '~/assets/styles/pages/Chat.scss'

import { useEffect, useState } from 'react'
import { useAppLoaded } from '~/hooks/useAppLoaded'

import { useSocket } from '~/providers/SocketProvider'

import ChatStartForm from '~/components/shared/chat/ChatStartForm'
import ChatSidebar from '~/components/shared/chat/ChatSidebar'

const Chat = (props: any) => {
  const { setLoadedPage } = useAppLoaded()
  useEffect(() => {
    setLoadedPage(true)
  }, [])

  const {
    socket,
    users
  } = useSocket()
  useEffect(() => {
    return () => {
      socket.disconnect()
    }
  }, [])

  const [state, setState] = useState({
    isAddNewUser: false
  })

  const onAddNewUser = () => {
    setState((prev) => ({
      ...prev,
      isAddNewUser: true
    }))
  }

  return (
    <div className='chat h-100'>
      <div className='container h-100'>
        {
          !state.isAddNewUser &&
          <ChatStartForm onSuccess={onAddNewUser}/>
        }
        {
          state.isAddNewUser && users.length &&
          <div className='chat__wrapper pt-32'>
            <ChatSidebar />
          </div>
        }
      </div>
    </div>
  )
}

export default Chat
