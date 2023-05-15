import { Socket, SocketResponse, User, Messages, Message } from '~/types/chat'
import '~/assets/styles/pages/Chat.scss'
import '~/assets/libs/fontawesome-free-6.3.0-web/css/all.css'
import api from '~/api'
import io from 'socket.io-client'
import { debounce } from 'lodash'
import { getConversationId } from '~/helpers/get-сonversation-id'

import { useEffect, useState, useMemo, useRef } from 'react'
import { useAppLoaded } from '~/hooks/useAppLoaded'

// components
import ChatStartForm from '~/components/shared/chat/ChatStartForm'
import ChatSidebar from '~/components/shared/chat/ChatSidebar'
import ChatMain from '~/components/shared/chat/ChatMain'
import ChatCall from '~/components/shared/chat/ChatCall'

// export interface Methods {
//   connectUser: (userName: string) => Promise<SocketResponse>,
//   openChat: (user: User) => void,
//   hideChat: () => void,
//   sendMessage: (user: User) => void
// }

const Chat = () => {
  const { setLoadedPage } = useAppLoaded()
  useEffect(() => {
    setLoadedPage(true)
  }, [])

  // ref
  const watchedIds = useRef([] as string[])

  // state
  const [state, setState] = useState({
    socket: null as Socket,
    users: [] as User[],
    recipient: {} as User,
    messages: {} as Messages
  })

  // computed
  const sender = useMemo<User | null>(() => {
    return state.users?.find((item: User) => item.socketId === state.socket?.id) || null
  }, [state.socket, state.users])

  const messages = useMemo(() => {
    if (sender && state.recipient.socketId) {
      const conversationId = getConversationId(sender.socketId, state.recipient.socketId)
      return (state.messages[conversationId] || []).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
    }
    return []
  }, [state.recipient.socketId, state.messages])

  // methods
  const methods = {
    async connectUser (userName: string) {
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
    },

    openChat (recipient: User) {
      setState(prevState => ({
        ...prevState,
        recipient
      }))
    },

    hideChat () {
      setState(prevState => ({
        ...prevState,
        recipient: {} as User
      }))
    },

    sendMessage (text: string) {
      if (sender) {
        api.chat.sendMessage(state.socket, {
          senderId: sender.socketId,
          recipientId: state.recipient.socketId,
          text
        })
      }
    },

    onWatchedMessageDeb: debounce(async () => {
      await api.chat.sendMessagesWatchedIds(state.socket, {
        senderId: sender?.socketId,
        recipientId: state.recipient.socketId,
        ids: watchedIds.current
      })

      watchedIds.current = []
    }, 500),

    onWatchedMessage (id: string) {
      watchedIds.current.push(id)
      methods.onWatchedMessageDeb()
    }
  }

  // watch
  useEffect(() => {
    if (state.socket) {
      state.socket.on('users:update', (users) => {
        setState(prevState => {
          return {
            ...prevState,
            users
          }
        })
      })
      state.socket.on('messages:update', (data: {conversationId: string, messages: Message[]}) => {
        setState(prevState => {
          return {
            ...prevState,
            messages: {
              ...prevState.messages,
              [data.conversationId]: data.messages
            }
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

  return (
    <div className='chat'>
      <div className='chat__container'>
        {
          !sender &&
          <ChatStartForm
            submit={methods.connectUser}
          />
        }
        {
          !!sender &&
            <div className='chat__wrapper pt-321'>
              <div className='chat__holder'>
                <ChatSidebar
                  users={state.users}
                  sender={sender}
                  recipient={state.recipient}
                  messages={state.messages}
                  onClickUserCard={methods.openChat}
                />
                {
                  !!state.recipient.socketId &&
                    <ChatMain
                      sender={sender}
                      recipient={state.recipient}
                      messages={messages}
                      onHide={methods.hideChat}
                      onSendMessage={methods.sendMessage}
                      onWatchedMessage={methods.onWatchedMessage}
                    />
                    // <div className='chat__empty'>
                    //   <div className='chat__empty-text h4 bold!'>
                    //     Select who you would like to write to!
                    //   </div>
                    // </div>
                    // <div className='chat__empty'>
                    //   <div className='chat__empty-text h4 bold!'>
                    //     The user "{privateChatData.name}" left the chat!
                    //   </div>
                    // </div>
                }
              </div>
            </div>
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
