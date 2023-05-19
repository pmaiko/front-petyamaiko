import { useEffect, useRef, createRef, useState } from 'react'
import { Peer, MediaConnection } from 'peerjs'
import { useSocket } from '~/providers/SocketProvider'
import ChatCallSpeakingCamera from '~/components/shared/chat/call/ChatCallSpeakingCamera'

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
  const $myStream = useRef<MediaStream>()
  const myVideo = useRef<HTMLVideoElement>(null)
  const partnerVideo = useRef<HTMLVideoElement>(null)
  const [hasMyVideo, hasMyVideoSet] = useState(false)
  const [hasPartnerVideo, hasPartnerVideoSet] = useState(false)
  const [isVideo, isVideoSet] = useState(true)
  const [isAudio, isAudioSet] = useState(false)
  const [myPeerId, myPeerIdSet] = useState('')
  const [networkStatus, networkStatusSet] = useState('')

  function stopStreamedVideo () {
    const stream = $myStream.current
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop()
      })
    }
  }

  useEffect(() => {
    peer = new Peer(options)

    const toSOCKET = callInfo.to === mySocketId ? callInfo.from : callInfo.to
    peer.on('open', (pid) => {
      // console.log(mySocketId, 'mySocketId')
      // console.log(callInfo.to === mySocketId ? callInfo.from : callInfo.to, 'callInfo.to')
      // console.log(peerId, 'fromPeerId')

      myPeerIdSet(pid)
      socket.emit('peer:open', {
        peerId: pid,
        to: toSOCKET
      })
    })

    peer.on('disconnected', (pid) => {
      socket.emit('peer:disconnected', {
        peerId: pid,
        to: toSOCKET
      })
    })

    return () => {
      peer.disconnect()
      peer.destroy()
      setPeerId('')
      stopStreamedVideo()
    }
  }, [])

  const usersCommunication = (myStream: MediaStream = new MediaStream()) => {
    const call = peer.call(peerId, myStream)

    // console.log('call', call)
    setInterval(() => {
      console.log(call.peerConnection.iceConnectionState)
      call.peerConnection.getStats().then(stats => {
        stats.forEach((report) => {
          console.log('Ping to peer ' + peerId + ': ' +
            (report.currentRoundTripTime || 0) * 1000 + 'ms')
        })
      })
    }, 1000)
    call.on('stream', (remoteStream) => {
      hasPartnerVideoSet(true)
      addVideoStream(partnerVideo.current, remoteStream)
    })

    peer.on('call', (_call) => {
      // console.log('_call', _call)
      _call.answer(myStream)
      _call.on('stream', (remoteStream) => {
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
      const myStream = await navigator.mediaDevices.getUserMedia({
        video,
        audio
      })
      $myStream.current = myStream
      hasMyVideoSet(true)
      addVideoStream(myVideo.current, myStream, true)
      usersCommunication(myStream)
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

  // useEffect(() => {
  //   if (myPeerId && peerId) {
  //     setInterval(() => {
  //       // @ts-ignore
  //       // console.log(peer._socket._wsPingTimer)
  //       // console.log(peerId, ' ---- ', pid)
  //       console.log(myPeerId, ' ', peerId)
  //       console.log(peer.getConnection(peerId, myPeerId))
  //       // @ts-ignore
  //       // window.peer = peer
  //       // const pc = peer.peerConnection
  //       // if (pc && pc.iceConnectionState === 'connected') {
  //       //   console.log('Network connection is active.');
  //       // } else {
  //       //   console.log('Network connection is lost.');
  //       // }
  //     }, 1000)
  //   }
  // }, [myPeerId, peerId])

  const addVideoStream = (video: any, stream: MediaStream, offVolume?: boolean) => {
    video.srcObject = stream
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
