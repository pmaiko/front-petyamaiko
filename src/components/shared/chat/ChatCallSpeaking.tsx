import { useEffect, useRef, useState } from 'react'
import { Peer, MediaConnection } from 'peerjs'
import { useSocket } from '~/providers/SocketProvider'

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
    onCancelCall
  } = useSocket()
  const myVideo = useRef<HTMLVideoElement>(null)
  const partnerVideo = useRef<HTMLVideoElement>(null)
  const [hasMyVideo, setHasMyVideo] = useState(false)
  const [hasPartnerVideo, setHasPartnerVideo] = useState(false)
  const [isVideo, setIsVideo] = useState(true)
  const [isAudio, setIsAudio] = useState(false)

  function stopStreamedVideo (nodeMyVideo?: HTMLVideoElement, nodePartnerVideo?: HTMLVideoElement) {
    const el1 = nodeMyVideo || myVideo?.current
    const el2 = nodePartnerVideo || partnerVideo?.current

    const stream1 = el1?.srcObject as MediaStream
    const stream2 = el2?.srcObject as MediaStream

    if (stream1) {
      stream1.getTracks().forEach((track) => {
        track.stop()
      })
    }

    if (stream2) {
      stream2.getTracks().forEach((track) => {
        track.stop()
      })
    }

    // @ts-ignore
    el1.srcObject = null
    // @ts-ignore
    el2.srcObject = null
  }

  useEffect(() => {
    const nodeMyVideo = myVideo.current as HTMLVideoElement
    const nodePartnerVideo = partnerVideo.current as HTMLVideoElement
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
      stopStreamedVideo(nodeMyVideo, nodePartnerVideo)
    }
  }, [])

  const usersCommunication = (_stream: MediaStream = new MediaStream()) => {
    const call = peer.call(peerId, _stream)

    call.on('stream', (remoteStream) => {
      setHasPartnerVideo(true)
      addVideoStream(partnerVideo.current, remoteStream)
    })

    peer.on('call', (answer) => {
      answer.answer(_stream)
      answer.on('stream', (remoteStream) => {
        setHasPartnerVideo(true)
        addVideoStream(partnerVideo.current, remoteStream)
      })
    })
  }

  const onStream = async (video = true, audio = false) => {
    setIsVideo(video)
    setIsAudio(audio)

    if (!isVideo && !isAudio) {
      return
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: isVideo,
        audio: isAudio
      })

      setHasMyVideo(true)
      addVideoStream(myVideo.current, stream)

      usersCommunication(stream)

    } catch (error) {
      stopStreamedVideo()
      console.log(error)
    }
  }

  useEffect(() => {
    if (peerId) {
      onStream()
      usersCommunication()
    }
  }, [peerId])

  const addVideoStream = (video: any, _stream: MediaStream) => {
    video.srcObject = _stream
    video.addEventListener('loadedmetadata', () => {
      video.play()
    })
  }

  const toggleCamera = () => {
    onStream(!isVideo)
  }

  const toggleAudio = () => {
    onStream(isVideo, !isAudio)
  }

  return (
    <div className='chat-call-speaking'>
      <div className='chat-call-speaking__body'>
        <div className='chat-call-speaking__body-inner'>
          <div className='chat-call-speaking__body-col'>
            <div className='chat-call-speaking__name h5'>
              Partner name
            </div>
            <div className='chat-call-speaking__video'>
              <div className='chat-call-speaking__video-inner'>
                { !hasPartnerVideo ?
                  <div
                    className='chat-call-speaking__video-empty'
                  >
                    <div className='chat-call-speaking__video-empty-icon'>
                      <i className='fa-solid fa-video' />
                    </div>
                    <p className='chat-call-speaking__video-empty-error'>
                      Camera error...
                    </p>
                  </div>
                  : ''
                }
                <video
                  ref={partnerVideo}
                  className='chat-call-speaking__video-tag'
                />
              </div>
            </div>
          </div>
          <div className='chat-call-speaking__body-col'>
            <div className='chat-call-speaking__name h5'>
              You
            </div>
            <div className='chat-call-speaking__video'>
              <div className='chat-call-speaking__video-inner'>
                { !hasMyVideo ?
                  <div
                    className='chat-call-speaking__video-empty'
                  >
                    <div className='chat-call-speaking__video-empty-icon'>
                      <i className='fa-solid fa-video' />
                    </div>
                    <p className='chat-call-speaking__video-empty-error'>
                      Camera error...
                    </p>
                  </div>
                  : ''
                }
                <video
                  ref={myVideo}
                  className='chat-call-speaking__video-tag'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='chat-call-speaking__foot'>
        <button onClick={toggleCamera}>
          Toggle camera
        </button>
        <button onClick={toggleAudio}>
          Toggle Audio
        </button>
        <button
          className='chat-call__button chat-call__button_cansel'
          onClick={onCancelCall}
        >
          <i className='fa-solid fa-xmark' />
        </button>
      </div>
    </div>
  )
}

export default ChatCallSpeaking
