import { useState, memo, useMemo, useEffect, useCallback } from 'react'

interface Props {
  video: boolean,
  audio: boolean,
  toggleVideo: () => void
  toggleAudio: () => void
}
const Panel = (props: Props) => {
  return (
    <div className='panel'>
      <div className='panel__item panel__item_left'>
        -
      </div>
      <div className='panel__item panel__item_center'>
        <button
          onClick={props.toggleVideo}
          className={!props.video ? 'disabled' : ''}
        >
          {props.video ? <i className='fa-solid fa-video'/> : <i className='fa-solid fa-video-slash'/>}
        </button>
        <button
          onClick={props.toggleAudio}
          className={!props.audio ? 'disabled' : ''}
        >
          {props.audio ? <i className='fa-solid fa-microphone'/> : <i className='fa-solid fa-microphone-slash'/>}
        </button>
      </div>
      <div className='panel__item panel__item_right'>
        <button>
          EXIT
        </button>
      </div>
    </div>
  )
}

export default Panel
