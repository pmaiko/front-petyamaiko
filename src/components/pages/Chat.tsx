import '~/assets/styles/pages/Chat.scss'
import '~/assets/libs/fontawesome-free-6.3.0-web/css/all.css'
import api from '~/api'
import io from 'socket.io-client'

import { Socket, User } from '~/types/chatTypes'

import { useEffect, useState } from 'react'
import { useAppLoaded } from '~/hooks/useAppLoaded'

// components
import ChatAuthorization from '~/components/shared/chat/ChatAuthorization'
import ChatMain from '~/components/shared/chat/ChatMain'

import ChatCall from '~/components/shared/chat/call/ChatCall'

const Chat = () => {
  const { setLoadedPage } = useAppLoaded()
  useEffect(() => {
    setLoadedPage(true)
  }, [])

  // state
  const [state, setState] = useState({
    socket: null as Socket,
    sender: null as User | null
  })

  // methods
  const connectUser = async (userName: string) => {
    const socket = io(process.env.REACT_APP_NODE_API_URL as string)

    const handlerConnect = async (): Promise<string> => {
      return new Promise((resolve) => {
        socket.on('connect', () => {
          resolve('connected')
        })
      })
    }
    await handlerConnect()

    setState(prevState => {
      return {
        ...prevState,
        socket
      }
    })

    return api.chat.addUser(socket, {
      userName
    })
  }

  const connectSuccess = (user: User) => {
    setState(prevState => {
      return {
        ...prevState,
        sender: user
      }
    })
  }

  return (
    <div className='chat'>
      <div className='chat__container'>
        {
          !state.sender &&
          <ChatAuthorization
            submit={connectUser}
            success={connectSuccess}
          />
        }
        {
          !!state.sender &&
          <ChatMain
            socket={state.socket}
            sender={state.sender}
          />
        }
      </div>

      {/*{*/}
      {/*  callType ?*/}
      {/*    <ChatCall />*/}
      {/*  : ''*/}
      {/*}*/}
    </div>
  )
}

export default Chat
