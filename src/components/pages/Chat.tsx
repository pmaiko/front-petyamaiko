import '~/assets/styles/pages/Chat.scss'

import { useEffect, useState } from 'react'
import { useAppLoaded } from '~/hooks/useAppLoaded'

import { useSocket, TUser } from '~/providers/SocketProvider'

import ChatStartForm from '~/components/shared/chat/ChatStartForm'
import ChatSidebar from '~/components/shared/chat/ChatSidebar'
import ChatMain from '~/components/shared/chat/ChatMain'

const Chat = (props: any) => {
  const { setLoadedPage } = useAppLoaded()
  useEffect(() => {
    setLoadedPage(true)
  }, [])

  const {
    socket,
    mySocketId,
    users,
    privateMessages,
    sendPrivateMessage,
    getPrivateMessages
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

  const [privateChatData, setPrivateChatData] = useState<TUser>({} as TUser)
  const [activeChatMain, setActiveChatMain] = useState(false)

  const openPrivateChat = (data: TUser) => {
    getPrivateMessages({
      from: mySocketId,
      to: data.socketId
    })
    setPrivateChatData(_ => data)
    setActiveChatMain(true)
  }

  const privateChatSendMessage = async (message: string) => {
    try {
      const { data } = await sendPrivateMessage({ to: privateChatData.socketId, message })
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  const onHideChatMain = () => {
    setActiveChatMain(false)
  }

  return (
    <div className='chat h-100'>
      <div className='container h-100'>
        {
          !state.isAddNewUser &&
          <ChatStartForm onSuccess={onAddNewUser} />
        }
        {
          (state.isAddNewUser && users.length) ?
          <div className='chat__wrapper pt-32'>
            <div className='chat__holder'>
              <ChatSidebar
                mySocketId={mySocketId}
                onUserCardClick={openPrivateChat}
              />
              {
                privateChatData.socketId ?
                <ChatMain
                  activeChatMain={activeChatMain}
                  onHide={onHideChatMain}
                  {...privateChatData}
                  users={users}
                  mySocketId={mySocketId}
                  privateMessages={privateMessages}
                  onSendMessage={privateChatSendMessage}
                /> : <div className='chat__empty h4 bold!'>Choose your interlocutor!</div>
              }
            </div>
          </div> : <div className='pt-32'>Error refresh page!</div>
        }
      </div>
    </div>
  )
}

export default Chat
