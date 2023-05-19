import { Socket, Authorization, Message } from '~/types/chatTypes'
import { baseSocket } from '~/helpers/base-socket'

export const addUser = (socket: Socket, sendData: Authorization) => {
  return baseSocket(socket, 'user:add', sendData)
}

export const sendMessage = (socket: Socket, sendData: Message) => {
  return baseSocket(socket, 'message:send', sendData)
}

export const sendMessagesWatchedIds = (socket: Socket, sendData: object) => {
  return baseSocket(socket, 'messages:watchedIds', sendData)
}
