import './ProjectCard.scss'

import api from '~/api'

import { IProject } from '~/types'
import { useCallback, useState } from 'react'

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

const ProjectCard = (props: any) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
  const { confirmProjectDeleteModalToggle, createProjectModalToggle } = useActions()

  const [liked, setLiked] = useState(false)
  const onLiked = useCallback(() => {
    setLiked(!liked)
  }, [liked])

  const onEdit = () => {
    createProjectModalToggle({
      'title': 'Edit project',
      'handler': edit,
      'fields': props
    })
  }

  const edit = async (fields: any) => {
    try {
      const response: any = await api.editProject({
        id: props.id,
        ...fields
      })
      props?.updateProjectHandler(response?.project)
      NotificationManager.success('UPDATED')
      return Promise.resolve(response)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const onDelete = () => {
    confirmProjectDeleteModalToggle({ 'onConfirm': confirmedDelete })
  }

  const confirmedDelete = async () => {
    try {
      await api.removeProject({
        id: props.id
      })
      props?.removeProjectHandler(props.id)
      NotificationManager.success('DELETED')
    } catch (error) {
      NotificationManager.error('ERROR')
    }
  }

  return (
    <article className='projects-card'>
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
