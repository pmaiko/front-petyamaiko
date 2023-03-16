import { RefObject, useState } from 'react'
import { Range } from 'react-range'

const ChatCallSpeakingCamera = ({ name, hasCamera, refObject, onToggleCamera, isVideo, onToggleAudio, isAudio }: {
  name: string,
  hasCamera: boolean,
  refObject: RefObject<HTMLVideoElement>,
  onToggleCamera?: () => void,
  isVideo?: boolean,
  onToggleAudio?: () => void,
  isAudio?: boolean
}) => {
  const [volume, volumeSet] = useState([1])

  const onChangeVolume = (values: number[]) =>  {
    volumeSet(values)
    if (refObject?.current) {
      refObject.current.volume = values?.[0]
    }
  }

  const renderTrack = ({ props, children }: { props: any, children: any }) => (
    <div
      {...props}
      style={{
        ...props.style,
        height: '3px',
        width: '100px',
        backgroundColor: '#ccc'
      }}
    >
      {children}
    </div>
  )

  const renderThumb = ({ props }: { props: any }) => (
    <div
      {...props}
      style={{
        ...props.style,
        height: '10px',
        width: '10px',
        backgroundColor: '#999',
        borderRadius: '100%'
      }}
    />
  )
  const onPlay = () => {
    refObject.current?.play()
  }
  return (
    <div className='chat-call-speaking-camera'>
      {/*<div className='chat-call-speaking-camera__name h5'>*/}
      {/*  { name }*/}
      {/*</div>*/}
      <div className='chat-call-speaking-camera__video'>
        <div className='chat-call-speaking-camera__video-inner'>
          { !hasCamera ?
            <div
              className='chat-call-speaking-camera__video-empty'
            >
              <div className='chat-call-speaking-camera__video-empty-icon'>
                <i className='fa-solid fa-video' />
              </div>
              <p className='chat-call-speaking-camera__video-empty-error'>
                Camera error...
              </p>
            </div>
            : ''
          }
          <video
            ref={refObject}
            playsInline={true}
            className='chat-call-speaking-camera__video-tag'
            onClick={onPlay}
          />
          <div
            className='chat-call-speaking-camera__video-controls'
          >
            {
              onToggleCamera && onToggleAudio ?
              <>
                <button
                  onClick={onToggleCamera}
                  className={isVideo ? 'active' : ''}
                >
                  {isVideo ? <i className='fa-solid fa-video'/> : <i className='fa-solid fa-video-slash'/>}
                </button>
                <button
                  onClick={onToggleAudio}
                  className={isAudio ? 'active' : ''}
                >
                  {isAudio ? <i className='fa-solid fa-microphone'/> : <i className='fa-solid fa-microphone-slash'/>}
                </button>
              </>
              :
                <Range
                  step={0.1}
                  min={0}
                  max={1}
                  values={volume}
                  onChange={onChangeVolume}
                  renderTrack={renderTrack}
                  renderThumb={renderThumb}
                />
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatCallSpeakingCamera
