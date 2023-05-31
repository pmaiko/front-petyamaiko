import '~/assets/styles/shared/chat/ChatMessage.scss'
import { Message, GeneralMessage } from '~/types/chatTypes'

import Observer from '~/plugins/observer'
import { convertTimestamp } from '~/helpers/convert-timestamp'
import { useEffect, useMemo, useRef, memo } from 'react'

interface Props {
  message: Message | GeneralMessage
  highlight: boolean
  name: string,
  onWatched?: (id: string) => void
}

const ChatMessage = (props: Props) => {
  const root: any = useRef()

  const date = useMemo(() => {
    return convertTimestamp(props.message.timestamp, '*hour*:*minutes*:*seconds*')
  }, [props.message.timestamp])

  useEffect(() => {
    const onInView = () => {
      if (props.onWatched) {
        props.onWatched(props.message.id || '')
      }
    }

    const observer = new Observer()
    observer.observe(root.current)

    root.current?.addEventListener('inview', onInView)
    return () => {
      root.current?.removeEventListener('inview', onInView)
    }
  }, [])
  return (
    <div
      ref={root}
      className={`chat-message ${props.highlight ? 'chat-message_highlight' : ''}`}
    >
      <div className='chat-message__info'>
        <div className='chat-message__image'>
          <i className='fa-solid fa-circle-user' />
        </div>
        <div className='chat-message__name'>
          {props.highlight ? 'You' : props.name}
        </div>
        <p className='chat-message__date small'>
          {date} PM
        </p>
      </div>
      <div className='chat-message__message'>
        <div className='chat-message__message-text'>
          {props.message.text}
        </div>
        <div className='chat-message__message-icons'>
          {
            'watched' in props.message && (
            !props.message.watched ?
              <i className='fa-solid fa-check' />
            :
              <i className='fa-solid fa-check-double' />)
          }
        </div>
      </div>
    </div>
  )
}
export default memo(ChatMessage)
