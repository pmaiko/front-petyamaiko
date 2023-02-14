import { cloneDeep } from 'lodash'
import { useState, createContext, useContext, useEffect } from 'react'
import io from 'socket.io-client'

const SocketContext = createContext({} as TData)
let socket: TSocket = {} as TSocket

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

    socket.on('update:users', (_users) => {
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

    return () => {
      socket.disconnect()
    }
  }, [])

  const addNewUser = (name: string) => {
    return new Promise((resolve: any, reject: any) => {
      socket.emit('add_new:user', { name }, (data: ISocketAfterEmit<[IPrivateMessage]>) => {
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
      getPrivateMessages
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
}

export type TUser = {
  socketId: string,
  name: string,
  date?: string
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
  message: string
}
