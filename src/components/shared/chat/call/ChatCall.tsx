import '~/assets/styles/shared/chat/ChatCall.scss'

import ChatCallCalling from '~/components/shared/chat/call/ChatCallCalling'
import ChatCallSpeaking from '~/components/shared/chat/call/ChatCallSpeaking'
import ChatCallCompleted from '~/components/shared/chat/call/ChatCallCompleted'
import { callTypes, useSocket } from '~/providers/SocketProvider'
import { useEffect, useState } from 'react'

const ChatCall = () => {
  const { callType } = useSocket()
  const [enableMediaStream, enableMediaStreamSet] = useState(false)

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
        {
          callType === callTypes.COMPLETED ? <ChatCallCompleted /> : ''
        }
      </div>
    </div>
  )
}

export default ChatCall
