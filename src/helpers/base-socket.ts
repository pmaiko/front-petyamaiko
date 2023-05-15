import { Socket, SocketResponse } from '~/types/chat'

export const baseSocket = (socket: Socket, event: string, sendData: object): Promise<SocketResponse> => {
  return new Promise((resolve, reject) => {
    socket?.emit(event, sendData, (response: SocketResponse) => {
      response.status !== 'error' ? resolve(response) : reject(response)
    })
  })
}
