import { cloneDeep } from 'lodash'
import { useState, createContext, useContext, useEffect } from 'react'
import io from 'socket.io-client'

const SocketContext = createContext({} as TData)
let socket: TSocket = {} as TSocket

let typingTimer: any

export const SocketProvider = ({ children }: any) => {
  const [state, setState] = useState({
    users: [] as Partial<[TUser]>,
    privateMessages: {} as Partial<IPrivateMessages>
  })
  useEffect(() => {
    socket = io(process.env.REACT_APP_NODE_API_URL as string)

    socket.on('connect', () => {
      console.log('connect')
    })

    socket.on('disconnect', () => {
      console.log('disconnect')
      setState((prev) => ({
        ...cloneDeep(prev),
        users: []
      }))
    })

    socket.on('users:update', (_users) => {
      setState((prev) => ({
        ...cloneDeep(prev),
        users: _users || []
      }))
    })

    socket.on('private_message:send', ({ hash, privateMessages }: { hash: string, privateMessages: [IPrivateMessage]}) => {
      setState((prev) => ({
        ...cloneDeep(prev),
        privateMessages: {
          ...prev.privateMessages,
          [hash]: privateMessages
        }
      }))
    })

    socket.on('private_message:remove', (removedKeysPrivateMessages: []) => {
      setState((prev) => {
        const newPrivateMessages = cloneDeep(prev.privateMessages)

        removedKeysPrivateMessages.forEach(key => {
          delete newPrivateMessages[key]
        })

        return {
          ...cloneDeep(prev),
          privateMessages: newPrivateMessages
        }
      })
    })

    socket.on('notification:typing', ({ from }: {from: string}) => {
      const handler = (isTyping: boolean) => {
        setState((prev) => {
          const newUsers = cloneDeep(prev.users) || []

          const _users = newUsers.map(user => {
            if (user?.socketId === from) {
              user.isTyping = isTyping
            }
            return user
          })

          return {
            ...cloneDeep(prev),
            users: _users as [TUser] || []
          }
        })
      }
      if (from) {
        clearTimeout(typingTimer)
        handler(true)
        typingTimer = setTimeout(() => {
          handler(false)
        }, 2000)
      }
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  const addNewUser = (name: string) => {
    return new Promise((resolve: any, reject: any) => {
      socket.emit('user:add_new', { name }, (data: ISocketAfterEmit<[IPrivateMessage]>) => {
        if (data.status !== 'error') {
          setState((prev) => ({
            ...cloneDeep(prev),
            users: data.data || []
          }))
          resolve(data)
        } else {
          reject(data.message)
          reject('User name error')
        }
      })
    })
  }

  const onTyping = (to: string) => {
    socket.emit('notification:typing', {
      to
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

  const getPrivateMessages = ({ from, to } : { from: string, to: string }) => {
    return new Promise((resolve: any, reject: any) => {
      // socket.emit('private_message:send', { from, to }, (data: ISocketAfterEmit<[IPrivateMessage]>) => {
      //   if (data.status !== 'error') {
      //     setState((prev) => ({
      //       ...cloneDeep(prev),
      //       privateMessages: data.data || []
      //     }))
      //     resolve(data)
      //   } else {
      //     reject(data)
      //   }
      // })
    })
  }

  return (
    <SocketContext.Provider value={{
      socket,
      mySocketId: socket.id,
      ...state,
      addNewUser,
      sendPrivateMessage,
      getPrivateMessages,
      onTyping
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
  privateMessages: IPrivateMessages,
  addNewUser: (name: string) => void | Promise<ISocketAfterEmit<[TUser]>>
  sendPrivateMessage: (data: TSendPrivateMessageData) => Promise<ISocketAfterEmit<[IPrivateMessage]>>
  getPrivateMessages: (data: { from: string, to: string }) => void | Promise<ISocketAfterEmit<[IPrivateMessage]>>
  onTyping: (to: string) => void
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
  timestamp?: number
}
