import { useEffect, useRef, createRef, useState } from 'react'
import { Peer, MediaConnection } from 'peerjs'
import { useSocket } from '~/providers/SocketProvider'
import ChatCallSpeakingCamera from '~/components/shared/chat/ChatCallSpeakingCamera'

let options: object

if (process.env.NODE_ENV === 'development') {
  options = {
    host: 'localhost',
    path: '/peerjs',
    port: 3002
  }
} else {
  const host = process.env.REACT_APP_NODE_API_URL?.substring(0, process.env.REACT_APP_NODE_API_URL.length - 1).replace('https://', '')
  options = {
    host,
    path: '/peerjs'
  }
}

let peer: Peer

const ChatCallSpeaking = () => {
  const {
    socket,
    mySocketId,
    callInfo,
    peerId,
    setPeerId,
    onCompletedCall
  } = useSocket()
  const myStream = useRef<MediaStream>()
  const myVideo = useRef<HTMLVideoElement>(null)
  const partnerVideo = useRef<HTMLVideoElement>(null)
  const [hasMyVideo, hasMyVideoSet] = useState(false)
  const [hasPartnerVideo, hasPartnerVideoSet] = useState(false)
  const [isVideo, isVideoSet] = useState(true)
  const [isAudio, isAudioSet] = useState(false)

  function stopStreamedVideo () {
    const stream = myStream.current
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop()
      })
    }
  }

  useEffect(() => {
    // onStream()
    peer = new Peer(options)

    peer.on('open', (id) => {
      console.log(mySocketId, 'mySocketId')
      console.log(callInfo.to === mySocketId ? callInfo.from : callInfo.to, 'callInfo.to')
      console.log(peerId, 'fromPeerId')

      socket.emit('peer', {
        peerId: id,
        to: callInfo.to === mySocketId ? callInfo.from : callInfo.to
      })
    })

    return () => {
      peer.disconnect()
      peer.destroy()
      setPeerId('')
      stopStreamedVideo()
    }
  }, [])

  const usersCommunication = (_stream: MediaStream = new MediaStream()) => {
    const call = peer.call(peerId, _stream)

    call.on('stream', (remoteStream) => {
      hasPartnerVideoSet(true)
      addVideoStream(partnerVideo.current, remoteStream)
    })

    peer.on('call', (answer) => {
      answer.answer(_stream)
      answer.on('stream', (remoteStream) => {
        hasPartnerVideoSet(true)
        addVideoStream(partnerVideo.current, remoteStream)
      })
    })
  }

  const onStream = async (video = isVideo, audio = isAudio) => {
    if (!video && !audio) {
      hasMyVideoSet(false)
      stopStreamedVideo()
      return
    }
    try {
      stopStreamedVideo()
      const stream = await navigator.mediaDevices.getUserMedia({
        video,
        audio
      })
      myStream.current = stream
      hasMyVideoSet(true)
      addVideoStream(myVideo.current, stream, true)
      usersCommunication(stream)
    } catch (error) {
      stopStreamedVideo()
      console.log(error)
    }
  }

  useEffect(() => {
    if (peerId) {
      onStream()
      // usersCommunication()
    }
  }, [peerId])

  const addVideoStream = (video: any, _stream: MediaStream, offVolume?: boolean) => {
    video.srcObject = _stream
    if (offVolume) {
      video.volume = 0
    }
    video.addEventListener('loadedmetadata', () => {
      video.play()
    })
  }

  const toggleCamera = () => {
    // getVideoTracks
    const value = !isVideo
    isVideoSet(value)
    onStream(value)
  }

  const toggleAudio = () => {
    // getAudioTracks
    const value = !isAudio
    isAudioSet(value)
    onStream(undefined, value)
  }

  return (
    <div className='chat-call-speaking'>
      <div className='chat-call-speaking__body'>
        <div className='chat-call-speaking__video-partner'>
          <ChatCallSpeakingCamera
            name='Partner name'
            hasCamera={hasPartnerVideo}
            refObject={partnerVideo}
          />
        </div>
        <div className='chat-call-speaking__video-my'>
          <ChatCallSpeakingCamera
            name='You'
            hasCamera={hasMyVideo}
            refObject={myVideo}
            onToggleCamera={toggleCamera}
            isVideo={isVideo}
            onToggleAudio={toggleAudio}
            isAudio={isAudio}
          />
        </div>
      </div>
      <div className='chat-call-speaking__foot'>
        <button
          className='chat-call__button chat-call__button_cansel'
          onClick={onCompletedCall}
        >
          <i className='fa-solid fa-xmark' />
        </button>
      </div>
    </div>
  )
}

export default ChatCallSpeaking
