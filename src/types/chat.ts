import io from 'socket.io-client'
export type Socket = ReturnType<typeof io> | null

export type SocketResponse = {
  status: 'success' | 'error'
  data: any,
  message: string
}

export type ConnectUser = (userName: string) => Promise<SocketResponse>

export type Authorization = {
  userName: string
}

export type SocketID = string

export type onClickUserCard = (user: User) => void

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