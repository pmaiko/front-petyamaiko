import './Like.scss'

import React from 'react'
import { ReactComponent as LikeIcon } from '~/assets/svg/like-icon.svg'
import { ReactComponent as LikeActiveIcon } from '~/assets/svg/like-active-icon.svg'

const Like = (props: {
  value: number,
  active: boolean,
  className?: string,
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
}) => {
  return (
    <div
      className={`like ${props.className}`}
      onClick={props.onClick}
    >
      {props.active ? <LikeActiveIcon /> : <LikeIcon />} {props.value ? props.value : ''}
    </div>
  )
}

export default Like
