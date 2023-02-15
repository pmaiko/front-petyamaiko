import '~/assets/styles/pages/Chat.scss'
import '~/assets/libs/fontawesome-free-6.3.0-web/css/all.css'

import { useEffect, useState, useMemo } from 'react'
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
    mySocketId,
    users,
    privateMessages,
    sendPrivateMessage,
    getPrivateMessages
  } = useSocket()

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

  const hasUser = useMemo(() => {
    return !!users.find(user => user.socketId === privateChatData.socketId)
  }, [users, privateChatData])

  useEffect(() => {
    if (users.length && privateChatData.socketId) {
      const user = users.find(item => item.socketId === privateChatData.socketId)
      if (user) {
        setPrivateChatData(user)
      }
    }
  }, [users])

  const openPrivateChat = (data: TUser) => {
    getPrivateMessages({
      from: mySocketId,
      to: data.socketId
    })
    setPrivateChatData(_ => data)

    setTimeout(() => {
      setActiveChatMain(true)
    })
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

    setTimeout(() => {
      setPrivateChatData({} as TUser)
    }, 300)
  }

  return (
    <div className='chat'>
      <div className='chat__container'>
        {
          !state.isAddNewUser &&
          <ChatStartForm onSuccess={onAddNewUser} />
        }
        {
          (state.isAddNewUser && users.length) ?
            <div className='chat__wrapper pt-321'>
              <div className='chat__holder'>
                <ChatSidebar
                  mySocketId={mySocketId}
                  privateChatData={privateChatData}
                  onUserCardClick={openPrivateChat}
                />
                {
                  privateChatData.socketId && hasUser ?
                    <ChatMain
                      activeChatMain={activeChatMain}
                      onHide={onHideChatMain}
                      {...privateChatData}
                      users={users}
                      mySocketId={mySocketId}
                      privateMessages={privateMessages}
                      onSendMessage={privateChatSendMessage}
                    />
                  : !privateChatData.socketId ?
                    <div className='chat__empty'>
                      <div className='chat__empty-text h4 bold!'>
                        Select who you would like to write to!
                      </div>
                    </div>
                  : !hasUser &&
                    <div className='chat__empty'>
                      <div className='chat__empty-text h4 bold!'>
                        The user "{privateChatData.name}" left the chat!
                      </div>
                    </div>
                }
              </div>
            </div> : state.isAddNewUser && <div className='pt-32'>Error refresh page!</div>
        }
      </div>
    </div>
  )
}

export default Chat
