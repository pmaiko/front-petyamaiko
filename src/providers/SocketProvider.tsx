import { cloneDeep, isEmpty } from 'lodash'
import { useState, createContext, useContext, useEffect } from 'react'
import io from 'socket.io-client'

const createHash = (value1: string, value2: string): string => {
  if (value1 && value2) {
    const hash = [value1, value2].sort()
    return hash.join('')
  }

  return ''
}

const SocketContext = createContext({} as TData)
let socket: TSocket = {} as TSocket

let typingTimer: any
const audio = new Audio()
audio.volume = 0.5

export const SocketProvider = ({ children }: any) => {
  const [users, setUsers] = useState<TUser[]>([])
  const [privateMessages, setPrivateMessages] = useState<IPrivateMessages>({})
  const [notifications, setNotifications] = useState<INotification[]>([])

  const [callType, setCallType] = useState<callTypes>('' as callTypes)
  const [callInfo, setCallInfo] = useState<ICallInfo>({} as ICallInfo)
  const [peerId, setPeerId] = useState('')

  const addNewUser = (name: string) => {
    return new Promise((resolve: any, reject: any) => {
      socket.emit('user:add_new', { name }, (data: ISocketAfterEmit<[IPrivateMessage]>) => {
        if (data.status !== 'error') {
          setUsers(data.data)
          resolve(data)
        } else {
          reject(data.message)
          reject('User name error')
        }
      })
    })
  }

  const sendPrivateMessage = ({ to, message } : TSendPrivateMessageData) => {
    return new Promise((resolve: any, reject: any) => {
      socket.emit('private_message:send', { to, message }, (data: ISocketAfterEmit<[IPrivateMessage]>) => {
        if (data.status !== 'error') {
          resolve(data)
        } else {
          reject(data)
        }
      })
    })
  }

  const updatePrivateMessage = (from: string, to: string) => {
    socket.emit('private_message:update', {
      from,
      to
    })
  }

  const onTyping = (to: string) => {
    socket.emit('notification:typing', {
      to
    })
  }

  const removeNotification = (from: string) => {
    if (from) {
      const newNotifications = notifications.filter(item => item?.from !== from) as [INotification]
      setNotifications(newNotifications)
    }
  }

  const onCancelCall = () => {
    socket.emit(callTypes.CANSEL, {
      from: callInfo.from,
      to: callInfo.to
    })

    setCallType('' as callTypes)
    setCallInfo({} as ICallInfo)
  }

  const onCall = (from: string, to: string) => {
    setCallType(callTypes.CALLING)
    setCallInfo({
      from,
      to,
      fromUser: users.find(item => item?.socketId === from),
      toUser: users.find(item => item?.socketId === to)
    })

    socket.emit(callTypes.CALLING, {
      from,
      to
    })
  }

  const onSpeaking = () => {
    setCallType(callTypes.SPEAKING)

    socket.emit(callTypes.SPEAKING, {
      from: callInfo.from,
      to: callInfo.to
    })
  }

  const onCompletedCall = () => {
    socket.emit(callTypes.COMPLETED, {
      from: callInfo.from,
      to: callInfo.to
    })

    setCallType(callTypes.COMPLETED)
  }

  const socketConnect = () => {
    socket = io(process.env.REACT_APP_NODE_API_URL as string)
  }

  useEffect(() => {
    socketConnect()

    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!users.length) {
      socketConnect()
    }
  }, [users])



  if (!isEmpty(socket)) {
    socket.on('connect', () => {
      console.log('connect')
    })

    socket.on('disconnect', () => {
      console.log('disconnect')
      setUsers([])
    })

    socket.on('users:update', (_users) => {
      setUsers(_users || [])
    })

    socket.on('private_message:send', (data: { hash: string, privateMessages: [IPrivateMessage]}) => {
      setPrivateMessages({
        ...privateMessages,
        [data.hash]: data.privateMessages
      })
    })

    socket.on('private_message:remove', (removedKeysPrivateMessages: []) => {
      const newPrivateMessages = cloneDeep(privateMessages)
      removedKeysPrivateMessages.forEach(key => {
        delete newPrivateMessages[key]
      })
      setPrivateMessages(newPrivateMessages)
    })

    socket.on('notification:typing', ({ from }: {from: string}) => {
      const handler = (isTyping: boolean) => {
        const _users = users?.map(item => {
          if (item?.socketId === from) {
            item.isTyping = isTyping
          }
          return item
        }) || []

        setUsers(_users as [TUser])
      }
      if (from) {
        clearTimeout(typingTimer)
        handler(true)
        typingTimer = setTimeout(() => {
          handler(false)
        }, 2000)
      }
    })

    socket.on('private_message:update', ({ hash }) => {
      const newPrivateMessages = cloneDeep(privateMessages)
      if (newPrivateMessages[hash]) {
        newPrivateMessages[hash] = newPrivateMessages[hash]?.map((item) => {
          item.isWatched = true
          return item
        }) as [IPrivateMessage]
      }

      setPrivateMessages(newPrivateMessages)
    })

    socket.on('notification:send-message', (data: INotification) => {
      if (data) {
        audio.play()
        setNotifications([
          ...notifications as [],
          data
        ])
      }
    })

    // WebRTC
    socket.on('peer:open', (data: {peerId: string}) => {
      setPeerId(data.peerId)
    })

    socket.on('peer:disconnected', (data: {peerId: string}) => {
      setPeerId('')
      setCallType(callTypes.COMPLETED)
    })

    socket.on(callTypes.CANSEL, ({ from, to }: {from: string, to: string}) => {
      setCallType('' as callTypes)
      setCallInfo({} as ICallInfo)
    })

    socket.on(callTypes.COMPLETED, ({ from, to }: {from: string, to: string}) => {
      setCallType(callTypes.COMPLETED)
    })

    socket.on(callTypes.CALLING, ({ from, to }: {from: string, to: string}) => {
      setCallType(callTypes.CALLING)
      setCallInfo({
        from,
        to,
        fromUser: users.find(item => item?.socketId === from),
        toUser: users.find(item => item?.socketId === to)
      })
    })

    socket.on(callTypes.SPEAKING, ({ from, to }: {from: string, to: string}) => {
      setCallType(callTypes.SPEAKING)
    })
  }

  return (
    <SocketContext.Provider value={{
      socket,
      mySocketId: socket.id,
      users,
      privateMessages,
      notifications,
      callType,
      callInfo,
      onCancelCall,
      onCompletedCall,
      onCall,
      onSpeaking,
      peerId,
      setPeerId,
      createHash,
      addNewUser,
      sendPrivateMessage,
      onTyping,
      removeNotification,
      updatePrivateMessage
    } as TData}>
      { children }
    </SocketContext.Provider>
  )
}

export const useSocket = () => {
  return useContext(SocketContext)
}

type TSocket = ReturnType<typeof io>
type TData = {
  socket: TSocket
  mySocketId: string
  users: [TUser]
  callType: callTypes
  callInfo: ICallInfo
  onCancelCall: () => void
  onCompletedCall: () => void
  onCall: (from: string, to: string) => void
  onSpeaking: () => void
  peerId: string
  setPeerId: (id: string) => void,
  createHash: typeof createHash
  privateMessages: IPrivateMessages
  notifications: [INotification]
  addNewUser: (name: string) => void | Promise<ISocketAfterEmit<[TUser]>>
  sendPrivateMessage: (data: TSendPrivateMessageData) => Promise<ISocketAfterEmit<[IPrivateMessage]>>
  onTyping: (to: string) => void,
  removeNotification: (from: string | undefined) => void,
  updatePrivateMessage: (from: string, to: string) => void
}

export type TUser = {
  socketId: string,
  name: string,
  timestamp?: number,
  isTyping?: boolean
}

export type TSendPrivateMessageData = {
  to: string,
  message: string
}

export interface ISocketAfterEmit<T> {
  status: 'success' | 'error'
  data: T | any,
  message: string
}

export interface IPrivateMessages {
  [key: string]: [IPrivateMessage]
}

export interface IPrivateMessage {
  from: string,
  to: string,
  message: string,
  timestamp?: number,
  isWatched: boolean
}

export interface INotification {
  from: string,
  name: string,
  message: string
}

export enum callTypes {
  CALLING = 'CALLING',
  SPEAKING = 'SPEAKING',
  CANSEL = 'CANSEL',
  COMPLETED = 'COMPLETED'
}

export interface ICallInfo {
  from: string
  to: string
  fromUser?: TUser
  toUser?: TUser
}
