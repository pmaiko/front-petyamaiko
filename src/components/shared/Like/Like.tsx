import './Like.scss'

import { ReactComponent as LikeIcon } from '~/assets/svg/like-icon.svg'
import { ReactComponent as LikeActiveIcon } from '~/assets/svg/like-active-icon.svg'

const Like = (props: any) => {
  console.log(props.likes)
  return (
    <div
      className={`like ${props.className}`}
      onClick={props.onClick}
    >
      {props.active ? <LikeActiveIcon /> : <LikeIcon />} {props.value}
    </div>
  )
}

export default Like
