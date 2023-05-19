import { Socket, User, Messages, Message, Notification } from '~/types/chatTypes'

import api from '~/api'
import { debounce } from 'lodash'
import { getConversationId } from '~/helpers/get-сonversation-id'

import { useEffect, useState, useMemo, useRef, useCallback, memo } from 'react'

import ChatSidebar from '~/components/shared/chat/ChatSidebar'
import ChatDialog from '~/components/shared/chat/dialog/ChatDialog'

interface Props {
  socket: Socket,
  sender: User
}

const ChatMain = (props: Props) => {

  // ref
  const watchedIds = useRef([] as string[])

  // state
  const [state, setState] = useState({
    users: [] as User[],
    recipient: {} as User,
    messages: {} as Messages
  })

  // computed
  const sender = useMemo<User | null>(() => {
    return state.users?.find((item: User) => item.socketId === props.socket?.id) || null
  }, [props.socket, state.users])

  const messages = useMemo(() => {
    return state.messages
  }, [state.messages])

  const currentMessages = useMemo(() => {
    if (sender && state.recipient.socketId) {
      const conversationId = getConversationId(sender.socketId, state.recipient.socketId)
      return (state.messages[conversationId] || []).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
    }
    return []
  }, [state.recipient.socketId, state.messages])

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
        recipientId: state.recipient.socketId,
        text
      })
    }
  }, [props.socket, sender, state.recipient])

  const onWatchedMessageDeb = debounce(async () => {
    await api.chat.sendMessagesWatchedIds(props.socket, {
      senderId: sender?.socketId,
      recipientId: state.recipient.socketId,
      ids: watchedIds.current
    })

    watchedIds.current = []
  }, 500)

  const onWatchedMessage = useCallback((id: string) => {
    watchedIds.current.push(id)
    onWatchedMessageDeb()
  }, [props.socket, sender?.socketId, state.recipient.socketId])

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

      props.socket.on('message:notification', (data: Notification) => {
        //
      })
    }

    return () => {
      if (props.socket) {
        props.socket.disconnect()
      }
    }
  }, [props.socket])

  return (
    <div className='chat__wrapper pt-321'>
      <div className='chat__holder'>
        <ChatSidebar
          users={state.users}
          sender={props.sender}
          recipient={state.recipient}
          messages={messages}
          onClickUserCard={openChat}
        />
        {
          !!state.recipient.socketId &&
          <ChatDialog
            sender={props.sender}
            recipient={state.recipient}
            messages={currentMessages}
            onHide={hideChat}
            onSendMessage={sendMessage}
            onWatchedMessage={onWatchedMessage}
          />
        }
        {
          !state.recipient.socketId &&
          <div className='chat__empty'>
            <div className='chat__empty-text h4 bold!'>
              Select who you would like to write to!
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default memo(ChatMain)
