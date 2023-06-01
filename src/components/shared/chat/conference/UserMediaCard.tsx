import '~/assets/styles/shared/chat/UserMediaCard.scss'

interface Props {
  pid: string
  name: string
  nodeRef: (element: HTMLVideoElement) => void
}

const UserMediaCard = (props: Props) => {
  return (
    <div className='user-media-card'>
      <video
        playsInline={true}
        ref={(element) => {
          if (element) {
            props.nodeRef(element)
          }
        }}
        className='user-media-card__video'
      />
    </div>
  )
}
export default UserMediaCard
