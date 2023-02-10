import { cloneDeep } from 'lodash'
import { useState, createContext, useContext, useEffect } from 'react'
import io from 'socket.io-client'

const SocketContext = createContext({} as TData)
const socket = io(process.env.REACT_APP_NODE_API_URL as string)

export const SocketProvider = ({ children }: any) => {
  const [state, setState] = useState({
    users: [] as Partial<[TUser]>
  })
  useEffect(() => {
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
  }, [])

  const addNewUser = (name: string) => {
    return new Promise((resolve: any, reject: any) => {
      socket.emit('add-new:user', { name }, (_users: [TUser]) => {
        if (!_users.length) {
          reject('User name error')
        }
        setState((prev) => ({
          ...cloneDeep(prev),
          users: _users || []
        }))
        resolve(_users)
      })
    })
  }

  return (
    <SocketContext.Provider value={{
      socket,
      ...state,
      addNewUser
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
  socket: TSocket,
  users: [TUser]
  addNewUser: (name: string) => void | Promise<any>
}

type TUser = {
  socketId: string,
  name: string
}



