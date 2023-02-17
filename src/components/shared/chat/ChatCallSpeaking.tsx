import { useEffect, useRef, useState } from 'react'
import { Peer } from 'peerjs'
import { useSocket } from '~/providers/SocketProvider'

const ChatCallSpeaking = () => {
  const { socket, mySocketId, callInfo } = useSocket()
  const myVideo = useRef<HTMLVideoElement>(null)
  const partnerVideo = useRef<HTMLVideoElement>(null)
  const [hasMyVideo, setHasMyVideo] = useState(false)
  const [hasPartnerVideo, setHasPartnerVideo] = useState(false)

  let options
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
  const peer = new Peer(options)

  peer.on('open', (peerId) => {
    console.log(mySocketId, 'mySocketId')
    console.log(callInfo.to === mySocketId ? callInfo.from : callInfo.to, 'callInfo.to')
    console.log(peerId, 'fromPeerId')

    socket.emit('peer', {
      from: mySocketId,
      fromPeerId: peerId,
      to: callInfo.to === mySocketId ? callInfo.from : callInfo.to
    })
  })

  socket.on('peer', ({ from, fromPeerId, to }) => {
    console.log('socket.on peer')
    navigator.mediaDevices.getUserMedia({
      // audio: true,
      video: true
    }).then((stream: MediaStream) => {
      setHasMyVideo(true)
      addVideoStream(myVideo.current, stream)

      peer.on('call', (call2) => {
        console.log(call2, '----------------------')
        call2.answer(stream) // Answer the call with an A/V stream.
        // @ts-ignore
        call2.on(stream, (remoteStream) => {
          console.log(1)
          setHasPartnerVideo(true)
          addVideoStream(partnerVideo.current, remoteStream)
        })
      })

      const call = peer.call(fromPeerId, stream)
      call.on('stream', (remoteStream) => {
        console.log(2)
        setHasPartnerVideo(true)
        addVideoStream(partnerVideo.current, remoteStream)
      })
    })
  })

  const addVideoStream = (video: any, stream: any) => {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
      video.play()
    })
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
        <button className='chat-call__button chat-call__button_cansel'>
          <i className='fa-solid fa-xmark' />
        </button>
      </div>
    </div>
  )
}

export default ChatCallSpeaking
