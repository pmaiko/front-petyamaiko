import './ProjectCard.scss'

import api from '~/api'

import { Link } from 'react-router-dom'
import { IProject } from '~/types'
import React from 'react'

import BaseImage from '~/components/base/BaseImage'
import Like from '~/components/shared/Like/Like'
import View from '~/components/shared/View/View'

import { useSelector } from 'react-redux'
import { RootState } from '~/store/reducers'

// @ts-ignore
import { NotificationManager } from 'react-notifications'

import { ReactComponent as TrashIcon } from '~/assets/svg/trash-icon.svg'
import { ReactComponent as EditIcon } from '~/assets/svg/edit-icon.svg'
import { useActions } from '~/hooks/useActions'
import { useProjectLikes } from '~/hooks/project/useProjectLikes'
import { useProjectView } from '~/hooks/project/useProjectView'

interface Props extends IProject {
  updateProjectHandler?: (response: IProject) => void
  removeProjectHandler?: (id: number) => void
}

const ProjectCard = (props: Props) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
  const { confirmProjectDeleteModalToggle, createProjectModalToggle } = useActions()

  const { likes, isLiked, onLikeToggle } = useProjectLikes({
    projectLikes: props.likes,
    projectId: props.id
  })

  const { root } = useProjectView({
    projectId: props.id
  })

  const onEdit = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()

    createProjectModalToggle({
      'title': 'Edit project',
      'handler': edit,
      'fields': props
    })
  }

  const onDelete = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    confirmProjectDeleteModalToggle({ 'onConfirm': confirmedDelete })
  }

  const edit = async (fields: any) => {
    try {
      const response = await api.editProject({
        id: props.id,
        ...fields
      })
      if (props.updateProjectHandler) {
        props.updateProjectHandler(response)
      }
      NotificationManager.success('UPDATED')
      return Promise.resolve(response)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const confirmedDelete = async () => {
    try {
      await api.removeProject({
        id: props.id
      })
      if (props.removeProjectHandler) {
        props.removeProjectHandler(props.id)
      }
      NotificationManager.success('DELETED')
    } catch (error) {
      NotificationManager.error('ERROR')
    }
  }

  return (
    <Link
      className='projects-card'
      to={`/project/${props.id}`}
    >
      {isLoggedIn &&
        <div className='projects-card__controls'>
          <div
            ref={root as React.RefObject<HTMLDivElement>}
            className='projects-card__remove'
            onClick={onDelete}
          >
            <TrashIcon />
          </div>

          <div
            className='projects-card__edit'
            onClick={onEdit}
          >
            <EditIcon />
          </div>
        </div>
      }
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
              active={isLiked}
              value={likes}
              onClick={onLikeToggle}
              className='projects-card__like'
            />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProjectCard
