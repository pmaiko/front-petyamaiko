import '~/assets/styles/blocks/ProjectDetail.scss'

import { IProject } from '~/types'
import { convertDate } from '~/helpers'
import React, { lazy, useMemo } from 'react'
import { useProjectLikes } from '~/hooks/project/useProjectLikes'
import { useProjectView } from '~/hooks/project/useProjectView'
import { useComponentLoaded } from '~/hooks/useComponentLoaded'

import BaseImage from '~/components/base/BaseImage'

const Like = lazy(() => import('~/components/shared/Like'))
const View = lazy(() => import('~/components/shared/View'))

const ProjectDetail = (props: IProject) => {
  const { id, image, label, description, url, views, likes, created_at } = props

  useComponentLoaded(props)

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
    <section
      ref={root as React.RefObject<HTMLDivElement>}
      className='project-detail'
    >
      <div className='container container_md'>
        <div className='project-detail__created description'>
          <span className='project-detail__created-label'>created: </span><time className='project-detail__created-value'>{created}</time>
        </div>
        <div className='project-detail__image'>
          <BaseImage image={{ src: image || '' }} />
        </div>

        <div className='project-detail__info'>
          <div className='project-detail__info-inner'>
            <div className='project-detail__info-col'>
              {/*<div className='project-detail__author description'>*/}
              {/*  <span className='project-detail__author-label'>author: </span><span className='project-detail__author-value'>Petya</span>*/}
              {/*</div>*/}
              <div className='project-detail__site'>
                <span className='project-detail__site-label'>site: </span><a href={url} target='_blank' rel='noreferrer' className='project-detail__site-value link-2'>{url}</a>
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
        <h1 className='project-detail__label h2'>
          {label}
        </h1>
        <p className='project-detail__description'>
          {description}
        </p>
      </div>
    </section>
  )
}

export default ProjectDetail
