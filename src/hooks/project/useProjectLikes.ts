import api from '~/api'

import React, { useState } from 'react'

export const useProjectLikes = (props: {
  projectLikes: number,
  projectId: number
}) => {
  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(props.projectLikes)

  return {
    isLiked,
    likes,
    onLikeToggle: (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault()

      setIsLiked((prev: boolean) => !prev)

      !isLiked ? setLikes(likes + 1) : setLikes(likes - 1)

      api.likeProject({
        id: props.projectId,
        like: !isLiked
      })
    }
  }
}
