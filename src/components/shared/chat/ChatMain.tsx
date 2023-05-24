import { Socket, User, Messages, Message, AlertMessage } from '~/types/chatTypes'

import api from '~/api'
import NotificationManager from '~/plugins/notification'

import { debounce, cloneDeep } from 'lodash'
import { getConversationId } from '~/helpers/get-сonversation-id'

import { useEffect, useState, useMemo, useRef, useCallback, memo } from 'react'
import { CSSTransition } from 'react-transition-group'


import ChatSidebar from '~/components/shared/chat/ChatSidebar'
import ChatDialog from '~/components/shared/chat/dialog/ChatDialog'
import AlertMessageComponent from '~/components/shared/chat/AlertMessageComponent'

interface Props {
  socket: Socket,
  sender: User
}

const ChatMain = (props: Props) => {
  // ref
  const watchedIds = useRef([] as string[])
  const alertMessageComponent = useRef(null)
  const setTimeoutAlertId = useRef<undefined | ReturnType<typeof setTimeout>>()
  const setTimeoutTypingId = useRef<undefined | ReturnType<typeof setTimeout>>()

  // state
  const [state, setState] = useState({
    users: [] as User[],
    recipient: null as User | null,
    messages: {} as Messages,
    alertMessage: null as AlertMessage | null
  })

  // computed
  const sender = useMemo<User | null>(() => {
    return state.users?.find((item: User) => item.socketId === props.socket?.id) || null
  }, [props.socket, state.users])

  const messages = useMemo(() => {
    return state.messages
  }, [state.messages])

  const currentMessages = useMemo(() => {
    if (sender && state.recipient?.socketId) {
      const conversationId = getConversationId(sender.socketId, state.recipient.socketId)
      return (state.messages[conversationId] || []).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
    }
    return []
  }, [state.recipient?.socketId, state.messages])

  // methods
  const openChat = useCallback((recipient: User) => {
    setState(prevState => ({
      ...prevState,
      recipient
    }))
  }, [])

  const hideChat = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      recipient: {} as User
    }))
  }, [])

  const sendMessage = useCallback((text: string) => {
    if (sender) {
      api.chat.sendMessage(props.socket, {
        senderId: sender.socketId,
        recipientId: state.recipient?.socketId || '',
        text
      })
    }
  }, [props.socket, sender, state.recipient])

  const onWatchedMessageDeb = debounce(async () => {
    await api.chat.sendMessagesWatchedIds(props.socket, {
      senderId: sender?.socketId,
      recipientId: state.recipient?.socketId,
      ids: watchedIds.current
    })

    watchedIds.current = []
  }, 500)

  const onWatchedMessage = useCallback((id: string) => {
    watchedIds.current.push(id)
    onWatchedMessageDeb()
  }, [props.socket, sender?.socketId, state.recipient?.socketId])

  const onTyping = useCallback(() => {
    if (state.recipient) {
      api.chat.typingMessage(props.socket, {
        senderId: props.sender.socketId,
        recipientId: state.recipient.socketId
      })
    }
  }, [props.socket, sender?.socketId, state.recipient?.socketId])

  const hideAlertMessage = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      alertMessage: null
    }))
  }, [])

  // watch
  useEffect(() => {
    if (props.socket) {
      props.socket.on('users:update', (users) => {
        setState(prevState => {
          return {
            ...prevState,
            users
          }
        })
      })

      props.socket.on('messages:update', (data: {conversationId: string, messages: Message[]}) => {
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

      props.socket.on('message:alert', (alertMessage: AlertMessage) => {
        setState(prevState => {
          if (prevState.recipient?.socketId !== alertMessage.sender?.socketId) {
            return {
              ...prevState,
              alertMessage
            }
          } else {
            return prevState
          }
        })

        clearTimeout(setTimeoutAlertId.current)
        setTimeoutAlertId.current = setTimeout(() => {
          setState(prevState => {
            return {
              ...prevState,
              alertMessage: null
            }
          })
        }, 4000)
      })

      props.socket.on('message:typing', (data: {senderId: string}) => {
        const handler = (typing: boolean) => {
          setState(prevState => {
            const users = prevState.users.map((user) => {
              if (user.socketId === data.senderId) {
                const object = cloneDeep(user)
                object.typing = typing
                return object
              }
              return user
            })

            const recipient = cloneDeep(prevState.recipient)
            if (recipient?.socketId === data.senderId) {
              recipient.typing = typing
            }

            return {
              ...prevState,
              users,
              recipient
            }
          })
        }

        handler(true)

        clearTimeout(setTimeoutTypingId.current)
        setTimeoutTypingId.current = setTimeout(() => {
          handler(false)
        }, 1000)
      })

      props.socket.on('user:connect', (user: User) => {
        NotificationManager.success(`Connected: ${user.name}`)
      })

      props.socket.on('user:disconnect', (user: User) => {
        NotificationManager.error(`Disconnected: ${user.name}`)

        setState((prevState) => {
          if (prevState.recipient?.socketId === user.socketId) {
            return {
              ...prevState,
              recipient: null
            }
          } else {
            return prevState
          }
        })
      })
    }
  }, [props.socket])

  return (
    <div className='chat-main pt-321'>
      <div className='chat-main__holder'>
        <ChatSidebar
          users={state.users}
          sender={props.sender}
          recipient={state.recipient}
          messages={messages}
          onClickRecipientCard={openChat}
        />
        {
          !!state.recipient?.socketId &&
          <ChatDialog
            sender={props.sender}
            recipient={state.recipient}
            messages={currentMessages}
            onHide={hideChat}
            onSendMessage={sendMessage}
            onWatchedMessage={onWatchedMessage}
            onTyping={onTyping}
          />
        }
        {
          !state.recipient?.socketId &&
          <div className='chat-main__empty'>
            <div className='chat-main__empty-text h4 bold!'>
              Select who you would like to write to!
            </div>
          </div>
        }
      </div>

      <CSSTransition
        nodeRef={alertMessageComponent}
        in={!!state.alertMessage}
        timeout={500}
        classNames='fade-right'
        unmountOnExit={true}
      >
        {
          !!state.alertMessage ?
          <AlertMessageComponent
            _ref={alertMessageComponent}
            {...state.alertMessage}
            onClose={hideAlertMessage}
            onSenderClick={openChat}
          /> : <div />
        }
      </CSSTransition>
    </div>
  )
}

export default memo(ChatMain)
