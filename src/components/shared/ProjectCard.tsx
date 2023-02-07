import '../../assets/styles/shared/ProjectCard.scss'

import api from '~/api'

import { IProject } from '~/types'

import React from 'react'
import { Link } from 'react-router-dom'

import BaseImage from '~/components/base/BaseImage'
import Like from '~/components/shared/Like'
import View from '~/components/shared/View'

import NotificationManager from '~/plugins/notification'

import { ReactComponent as TrashIcon } from '~/assets/svg/trash-icon.svg'
import { ReactComponent as EditIcon } from '~/assets/svg/edit-icon.svg'

import { useProjectLikes } from '~/hooks/project/useProjectLikes'

import { useStoreState } from '~/store'
import { useModal, ModalNames } from '~/providers/ModalProvider'

interface Props extends IProject {
  updateProjectHandler?: (response: IProject) => void
  removeProjectHandler?: (id: number) => void
}

const ProjectCard = (props: Props) => {
  const isLoggedIn = useStoreState(state => state.auth.isLoggedIn)

  const { show } = useModal()
  const showConfirmProjectDeleteModal = (data: any) => {
    show({
      name: ModalNames.ConfirmProjectDeleteModal,
      props: data
    })
  }

  const showCreateProjectModal = (data: any) => {
    show({
      name: ModalNames.CreateProjectModal,
      props: data
    })
  }

  const { likes, isLiked, onLikeToggle } = useProjectLikes({
    projectLikes: props.likes,
    projectId: props.id
  })

  const onEdit = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()

    showCreateProjectModal({
      'title': 'Edit project',
      'handler': edit,
      'fields': props
    })
  }

  const onDelete = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    showConfirmProjectDeleteModal({ 'onConfirm': confirmedDelete })
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
          src: props.image,
          effect: 'move'
        }}/>
      </div>

      <div className='projects-card__body'>
        <p className='projects-card__label'>
          { props.label }
        </p>

        <p className='projects-card__description'>
          { props.description }
        </p>

        <div
          data-href={props.url}
          data-target='_blank'
          className='projects-card__url link-2'
        >
          { props.url }
        </div>
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
