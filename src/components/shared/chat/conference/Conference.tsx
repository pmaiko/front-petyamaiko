import '~/assets/styles/shared/chat/Conference.scss'

import UserMediaCard from '~/components/shared/chat/conference/UserMediaCard'
import Panel from '~/components/shared/chat/conference/Panel'

import { useState, memo, useMemo, useEffect, useCallback } from 'react'
import { useMatches } from 'react-router-dom'
import { Peer } from 'peerjs'
import { Socket } from '~/types/chatTypes'


const host = process.env.NODE_ENV === 'development' ? 'localhost' : process.env.REACT_APP_NODE_API_URL?.substring(0, process.env.REACT_APP_NODE_API_URL.length - 1).replace('https://', '')
const path = '/peerjs'
const port = process.env.NODE_ENV === 'development' ? 3002 : undefined

const options = {
  host,
  path,
  port
}

let myPeer: Peer | null
let myPid: string
let myStream: MediaStream
const mediaDevicesOptions = {
  video: true,
  audio: true
}
// const peers = {} as {
//   [userPid: string]: any
// }
interface Users {
  [pid: string]: User
}

interface User {
  pid?: string
  stream: null | MediaStream
}

interface Props {
  socket: Socket
}
const Conference = (props: Props) => {
  const [route] = useMatches()
  const [state, setState] = useState({
    video: mediaDevicesOptions.video,
    audio: mediaDevicesOptions.audio,
    users: {} as Users
  })
  const users = useMemo(() => {
    return Object.entries(state.users).map(([key, value]) => {
      return {
        pid: key,
        stream: value.stream
      }
    })
  }, [state.users])
  const addUser = (pid: string, stream: MediaStream | null = null) => {
    setState(prevState => {
      return {
        ...prevState,
        users: { ...prevState.users, [pid]: { stream } }
      }
    })
  }
  const removeUser = (pid: string) => {
    setState(prevState => {
      const newUsers = { ...prevState.users }
      if (newUsers[pid]) {
        newUsers[pid].stream?.getTracks().forEach((track) => {
          track.stop()
        })
      }
      delete newUsers[pid]
      return {
        ...prevState,
        users: newUsers
      }
    })
  }

  const removeUsers = () => {
    setState(prevState => {
      const newUsers = { ...prevState.users }
      Object.keys(prevState.users).forEach(key => {
        if (newUsers[key]) {
          newUsers[key].stream?.getTracks().forEach((track) => {
            track.stop()
          })
        }
        delete newUsers[key]
      })

      return {
        ...prevState,
        users: newUsers
      }
    })
  }

  const userMediaCardRef = (element: HTMLVideoElement, user: User) => {
    element.srcObject = user.stream
    element.addEventListener('loadedmetadata', () => {
      element.play()
    })

    if (user.pid === myPid) {
      element.volume = 0
    }
  }

  const connectMediaDevices = () => {
    return navigator.mediaDevices.getUserMedia(mediaDevicesOptions)
  }

  const onToggleVideo = () => {
    const videoTrack = myStream.getVideoTracks()[0]
    videoTrack.enabled = !videoTrack.enabled
    mediaDevicesOptions.video = videoTrack.enabled
    setState((prevState) => {
      return {
        ...prevState,
        video: videoTrack.enabled
      }
    })

    if (!mediaDevicesOptions.video && !mediaDevicesOptions.audio) {
      console.log(mediaDevicesOptions)
      myStream.getTracks().forEach((track) => {
        track.stop()
      })
    }
  }

  const onToggleAudio = () => {
    const audioTrack = myStream.getAudioTracks()[0]
    audioTrack.enabled = !audioTrack.enabled
    mediaDevicesOptions.audio = audioTrack.enabled

    setState((prevState) => {
      return {
        ...prevState,
        audio: audioTrack.enabled
      }
    })

    if (!mediaDevicesOptions.video && !mediaDevicesOptions.audio) {
      myStream.getTracks().forEach((track) => {
        track.stop()
      })
    }
  }

  const connect = async () => {
    try {
      myStream = await connectMediaDevices()
      addUser(myPid, myStream)
      myPeer?.on('call', call => {
        console.log(`МНЕ ЗВОНЯТ pid-${call.peer}`)

        call.answer(myStream)
        call.on('stream', userVideoStream => {
          addUser(call.peer, userVideoStream)
        })
      })

      props.socket?.emit('connected-device', route.params.id, myPid)
    } catch (error) {
      console.log(error)
    }
  }
  const connectToNewUser = useCallback((userPid: string, stream: MediaStream) => {
    console.log('Я ЗВОНЮ')
    const call = myPeer?.call(userPid, stream)
    call?.on('stream', userVideoStream => {
      addUser(call.peer, userVideoStream)
    })
    call?.on('close', () => {
      removeUser(userPid)
    })
  }, [])

  useEffect(() => {
    myPeer = new Peer(options)

    myPeer.on('open', (pid) => {
      myPid = pid
      props.socket?.emit('join-room', route.params.id, myPid)

      connect()
    })

    props.socket?.on('user-connected', (pid) => {
      addUser(pid)
    })

    props.socket?.on('user-connected-device', (pid) => {
      connectToNewUser(pid, myStream)
    })

    props.socket?.on('user-disconnected', (pid) => {
      removeUser(pid)
      console.log('socket-disconnected', pid)
    })

    myPeer.on('disconnected', (pid) => {
      myPeer = null
      removeUsers()
      console.log('peer-disconnected', pid)
    })

    return () => {
      removeUser(myPid)
      myPeer?.disconnect()
      myPeer?.destroy()
    }
  }, [])

  return (
    <div className='conference'>
      <div className='conference__grid'>
        {
          users.map((user, index) => {
            const handleNodeRef = (element: HTMLVideoElement) => userMediaCardRef(element, user)

            return (
              <div
                key={user.pid}
                className='conference__grid-item'
              >
                <UserMediaCard
                  pid={user.pid}
                  name={'user'}
                  nodeRef={handleNodeRef}
                />
              </div>
            )
          })
        }
      </div>

      <Panel
        toggleVideo={onToggleVideo}
        toggleAudio={onToggleAudio}
        audio={state.audio}
        video={state.video}
      />

      {/*<div onClick={connect}>*/}
      {/*  ENABLE DEVICES*/}
      {/*</div>*/}
    </div>
  )
}

export default memo(Conference)
