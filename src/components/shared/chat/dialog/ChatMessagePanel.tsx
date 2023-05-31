import '~/assets/styles/shared/chat/ChatMessagePanel.scss'

import { EmojiClickData } from 'emoji-picker-react'
import React, { useCallback, useState, memo } from 'react'

import ChatEmojiPicker from '~/components/shared/chat/dialog/ChatEmojiPicker'

interface Props {
  onSendMessage: (text: string) => void
  onTyping?: () => void
}

const ChatMessagePanel = (props: Props) => {
  const [state, setState] = useState({
    text: ''
  })

  const sendMessage = () => {
    setState((prevState) => {
      return {
        ...prevState,
        text: ''
      }
    })
    props.onSendMessage(state.text)
  }

  const onKeyPress = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13) {
      event.preventDefault()
      sendMessage()
    }
  }

  const onChange = (event: React.ChangeEvent<any>) => {
    if (props.onTyping) {
      props.onTyping()
    }

    setState((prevState) => {
      return {
        ...prevState,
        text: event.target.value
      }
    })
  }

  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    sendMessage()
  }

  const onClickEmoji = useCallback((event: EmojiClickData) => {
    setState(prevState => {
      return {
        ...prevState,
        text: `${prevState.text} ${event.emoji}`
      }
    })
  }, [])

  return (
    <div className='chat-message-panel shadow-up'>
      <div className='chat-message-panel__field'>
        <ChatEmojiPicker
          onClickEmoji={onClickEmoji}
        />
        <textarea
          value={state.text}
          placeholder='Your messages...'
          className='chat-message-panel__field-input'
          onKeyDown={onKeyPress}
          onChange={onChange}
        />
        <button
          className='chat-message-panel__field-button chat-message-panel__field-button_send'
          onClick={onClick}
        >
          <i className='fa-solid fa-paper-plane' />
        </button>
      </div>
    </div>
  )
}

export default memo(ChatMessagePanel)
