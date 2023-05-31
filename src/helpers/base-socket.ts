import { Socket, SocketResponse } from '~/types/chatTypes'

export const baseSocket = <T>(socket: Socket, event: string, sendData: object): Promise<SocketResponse<T>> => {
  return new Promise((resolve, reject) => {
    socket?.emit(event, sendData, (response: SocketResponse) => {
      response.status !== 'error' ? resolve(response) : reject(response)
    })
  })
}
