import io from 'socket.io-client'
import any = jasmine.any
export type Socket = ReturnType<typeof io> | null

export type SocketResponse<T = any> = {
  status: 'success' | 'error'
  data: T,
  message: string
}

export type Authorization = {
  userName: string
}
export type SocketID = string

export type User = {
  socketId: string,
  name: string,
  timestamp?: number,
  typing?: boolean
}

export type Message = {
  id?: string,
  senderId: SocketID,
  recipientId: SocketID,
  text: string,
  timestamp?: number,
  watched?: boolean
}

export type Messages = Partial<{
  [conversationId: string]: Message[]
}>

export type AlertMessage = {
  sender?: User,
  text?: string
}

export type GeneralMessage = {
  id?: string,
  sender: User,
  text: string,
  timestamp?: number
}
