import '../../assets/styles/blocks/ProjectDetail.scss'

import Like from '~/components/shared/Like'
import BaseImage from '~/components/base/BaseImage'
import View from '~/components/shared/View'

import { IProject } from '~/types'
import React, { useMemo } from 'react'
import { useProjectLikes } from '~/hooks/project/useProjectLikes'
import { useProjectView } from '~/hooks/project/useProjectView'
import { convertDate } from '~/helpers'

const ProjectDetail = ({ id, image, label, description, views, likes, created_at }: IProject) => {
  const { likes: likesCount, isLiked, onLikeToggle } = useProjectLikes({
    projectLikes: likes,
    projectId: id
  })

  const { root } = useProjectView({
    projectId: id
  })

  const created = useMemo(() => {
    return convertDate(created_at)
  }, [created_at])

  return (
    <div
      ref={root as React.RefObject<HTMLDivElement>}
      className='project-detail'
    >
      <div className='container'>
        <div className='project-detail__created description'>
          <span className='project-detail__created-label'>created: </span><time className='project-detail__created-value'>{created}</time>
        </div>
        <div className='project-detail__image'>
          <BaseImage image={{ src: image || '' }} />
        </div>

        <div className='project-detail__info'>
          <div className='project-detail__info-inner'>
            <div className='project-detail__info-col'>
              <div className='project-detail__author description'>
                <span className='project-detail__author-label'>author: </span><span className='project-detail__author-value'>Petya</span>
              </div>
              <div className='project-detail__site description'>
                <span className='project-detail__site-label'>site: </span><a href='/' className='project-detail__site-value'>https://novus.online</a>
              </div>
            </div>
            <div className='project-detail__info-col'>
              <div className='project-detail__info-activity'>
                <View
                  value={views}
                  className='project-detail__view'
                />
                <Like
                  active={isLiked}
                  value={likesCount}
                  onClick={onLikeToggle}
                  className='project-detail__like'
                />
              </div>
            </div>
          </div>
        </div>
        <h1 className='project-detail__label'>
          {label}
        </h1>
        <p className='project-detail__description'>
          {description}
        </p>
      </div>
    </div>
  )
}

export default ProjectDetail
