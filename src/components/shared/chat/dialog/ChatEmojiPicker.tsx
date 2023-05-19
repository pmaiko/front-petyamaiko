import EmojiPicker, { Theme, EmojiClickData } from 'emoji-picker-react'

import React, { useState, memo } from 'react'

interface Props {
  onClickEmoji: (event: EmojiClickData) => void
}

const ChatEmojiPicker = (props: Props) => {
  const [state, setState] = useState({
    visibleEmojiPicker: false
  })

  const onClickEmojiPicker = (event: React.MouseEvent<HTMLElement>) => {
    setState(prevState => {
      return {
        ...prevState,
        visibleEmojiPicker: !prevState.visibleEmojiPicker
      }
    })
  }

  const onClickEmoji = (event: EmojiClickData) => {
    props.onClickEmoji(event)
    setState(prevState => {
      return {
        ...prevState,
        visibleEmojiPicker: false
      }
    })
  }

  return (
    <>
      <button
        className='chat-message-panel__field-button chat-message-panel__field-button_smile'
        onClick={onClickEmojiPicker}
      >
        <i className='fa-regular fa-face-smile' />
      </button>
      {
        state.visibleEmojiPicker &&
        <div style={{
          visibility: state.visibleEmojiPicker ? 'visible' : 'hidden',
          opacity: state.visibleEmojiPicker ? 1 : 0
        }}>
          <EmojiPicker
            theme={Theme.DARK}
            onEmojiClick={onClickEmoji}
          />
        </div>
      }
    </>
  )
}


export default memo(ChatEmojiPicker)
