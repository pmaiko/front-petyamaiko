import './ProjectCard.scss'

import { IProject } from '~/types'
import { useCallback, useState } from 'react'

import BaseImage from '~/components/base/BaseImage'
import Like from '~/components/shared/Like/Like'
import View from '~/components/shared/View/View'

const ProjectCard = (props: IProject) => {
  const [liked, setLiked] = useState(false)
  const onLiked = useCallback(() => {
    setLiked(!liked)
  }, [liked])

  return (
    <article className='projects-card'>
      <div className='projects-card__image'>
        <BaseImage image={{
          src: props.image
        }}/>
      </div>

      <div className='projects-card__body'>
        <p className='projects-card__label label'>
          { props.label }
        </p>

        <p className='projects-card__description description'>
          { props.description }
        </p>
      </div>

      <div className='projects-card__foot'>
        <div className='projects-card__foot-inner'>
          <div className='projects-card__foot-col'>
            <View
              value={props.views}
              className='projects-card__view'
            />
          </div>

          <div className='projects-card__foot-col'>
            <Like
              active={liked}
              value={props.likes}
              onClick={onLiked}
              className='projects-card__like'
            />
          </div>
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
