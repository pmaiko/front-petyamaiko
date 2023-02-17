import '~/assets/styles/shared/chat/ChatCall.scss'

import ChatCallCalling from '~/components/shared/chat/ChatCallCalling'
import ChatCallSpeaking from '~/components/shared/chat/ChatCallSpeaking'
import { callTypes, useSocket } from '~/providers/SocketProvider'

const ChatCall = () => {
  const {
    callType
  } = useSocket()
  return (
    <div className='chat-call'>
      <div className='chat-call__overlay'>
        {/*<ChatCallSpeaking />*/}
        {
          callType === callTypes.CALLING ? <ChatCallCalling /> : ''
        }
        {
          callType === callTypes.SPEAKING ? <ChatCallSpeaking /> : ''
        }
      </div>
    </div>
  )
}

export default ChatCall
