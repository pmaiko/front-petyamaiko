import '~/assets/styles/pages/Chat.scss'
import '~/assets/libs/fontawesome-free-6.3.0-web/css/all.css'
import api from '~/api'
import io from 'socket.io-client'

import { Socket, User } from '~/types/chatTypes'

import { useEffect, useState, useCallback } from 'react'
import { useMatches, useNavigate } from 'react-router-dom'
import { useAppLoaded } from '~/hooks/useAppLoaded'

// components
import ChatAuthorization from '~/components/shared/chat/ChatAuthorization'
import ChatMain from '~/components/shared/chat/ChatMain'
import Conference from '~/components/shared/chat/conference/Conference'
import { createConference } from '~/api/chat'

// import ChatCall from '~/components/shared/chat/call/ChatCall'

const Chat = () => {
  const { setLoadedPage } = useAppLoaded()
  useEffect(() => {
    setLoadedPage(true)
  }, [])

  // state
  const [state, setState] = useState({
    socket: null as Socket,
    sender: null as User | null,
    conference: false
  })
  const navigate = useNavigate()
  const [route] = useMatches()

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

  const createNewConference = useCallback(async () => {
    const { data } = await api.chat.createConference<string>(state.socket)
    navigate(`/chat/conference/${data}`)
  }, [state.socket])

  // watch
  useEffect(() => {
    if (state.socket) {
      state.socket.on('disconnect', () => {
        setState(prevState => {
          return {
            ...prevState,
            sender: null
          }
        })
      })
    }

    return () => {
      if (state.socket) {
        state.socket.disconnect()
      }
    }
  }, [state.socket])

  useEffect(() => {
    if (!state.sender) {
      state.socket?.disconnect()
    }
  }, [state.sender])

  useEffect(() => {
    if (route.params.id) {
      setState(prevState => {
        return {
          ...prevState,
          conference: true
        }
      })
    }
  }, [route])

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
          !!state.sender && !state.conference &&
          <ChatMain
            socket={state.socket}
            sender={state.sender}
            createNewConference={createNewConference}
          />
        }
        {
          !!state.sender && state.conference &&
          <Conference
            socket={state.socket}
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
