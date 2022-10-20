import '../../assets/styles/shared/CommentAdd.scss'

import api from '~/api'

import { IProjectsComments } from '~/types'

import { useForm } from 'react-hook-form'
// @ts-ignore
import { NotificationManager } from 'react-notifications'

import BaseButton from '~/components/base/BaseButton'
import BaseTextarea from '~/components/base/BaseTextarea'
import BaseTextField from '~/components/base/BaseTextField'

const CommentAdd = ({ project_id, updateComments }: {
  project_id: number,
  updateComments: (newComment: IProjectsComments) => void
}) => {
  type Fields = {
    name: string
    comment: string
  }

  const { register, handleSubmit, setError, reset, formState: { errors } } = useForm<Fields>({
    defaultValues: {
      name: '',
      comment: ''
    }
  })

  const onSubmit = async (fields: Fields) => {
    try {
      const response: IProjectsComments = await api.addProjectsComments({
        project_id,
        ...fields
      })

      updateComments(response)
      reset()
      NotificationManager.success('ADDED')
    } catch (error: any) {
      Object.entries(error.response?.data?.errors || {}).forEach(([key, value]: any) => {
        setError(key, {
          message: value?.[0]
        })
      })
    }
  }

  return (
    <form
      className='comment-add'
      noValidate={true}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='comment-add__title h6'>
        Add Comment
      </div>

      <div className='comment-add__fields'>
        <BaseTextField
          label='Name'
          {...register('name')}
          error={errors.name?.message}
          className='comment-add__field'
        />
        <BaseTextarea
          label='Comment'
          {...register('comment')}
          error={errors.comment?.message}
          className='comment-add__field'
        />
      </div>

      <BaseButton
        className='comment-add__submit'
      >
        Add
      </BaseButton>
    </form>
  )
}
export default CommentAdd
