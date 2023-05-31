import { Socket, Authorization, Message, SocketID } from '~/types/chatTypes'
import { baseSocket } from '~/helpers/base-socket'

export const addUser = (socket: Socket, sendData: Authorization) => {
  return baseSocket(socket, 'user:add', sendData)
}

export const sendMessage = (socket: Socket, sendData: Message) => {
  return baseSocket(socket, 'message:send', sendData)
}

export const typingMessage = (socket: Socket, sendData: object) => {
  return baseSocket(socket, 'message:typing', sendData)
}

export const sendMessagesWatchedIds = (socket: Socket, sendData: object) => {
  return baseSocket(socket, 'messages:watchedIds', sendData)
}

export const sendGeneralMessage = (socket: Socket, sendData: { senderId: SocketID, text: string }) => {
  return baseSocket(socket, 'general-message:send', sendData)
}

export const getGeneralMessage = <T>(socket: Socket) => {
  return baseSocket<T>(socket, 'general-message:get', {})
}
