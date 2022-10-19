import './CreateProjectModal.scss'

import { RootState } from '~/store/reducers'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { useActions } from '~/hooks/useActions'
// @ts-ignore
import { NotificationManager } from 'react-notifications'

import BaseModal from '~/components/base/BaseModal'
import BaseButton from '~/components/base/BaseButton'
import BaseTextField from '~/components/base/BaseTextField'

import { useForm } from 'react-hook-form'
import { useModal } from '~/providers/ModalProvider'

const CreateProjectModal = (props: any) => {
  const closeModal: any = useRef()
  const { hide } = useModal()

  // const onCansel = () => {
  //   closeModal?.current()
  // }

  type Fields = {
    image: string,
    label: string,
    description: string
  }

  const { register, handleSubmit, setError, formState: { errors } } = useForm<Fields>({
    defaultValues: {
      image: props.fields?.image || '',
      label: props.fields?.label || '',
      description: props.fields?.description || ''
    }
  })

  const onSubmit = async (fields: Fields) => {
    try {
      await props?.handler(fields)
      closeModal?.current()
    } catch (error: any) {
      Object.entries(error.response?.data?.errors || {}).forEach(([key, value]: any) => {
        setError(key, {
          message: value?.[0]
        })
      })
    }
  }

  return (
    <BaseModal
      isOpen={true}
      ref={closeModal}
      closeModal={hide}
    >

      <form
        className='create-project-modal'
        noValidate={true}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className='create-project-modal__title'>
          {props.title}
        </h3>

        <div className='create-project-modal__fields'>
          <BaseTextField
            label='Image link'
            {...register('image')}
            error={errors.image?.message}
            className='create-project-modal__field'
          />

          <BaseTextField
            label='Label'
            {...register('label')}
            error={errors.label?.message}
            className='create-project-modal__field'
          />

          <BaseTextField
            label='Description'
            {...register('description')}
            error={errors.description?.message}
            className='create-project-modal__field'
          />
        </div>

        <BaseButton
          className='auth-modal__submit'
          type='submit'
        >
          Login
        </BaseButton>
      </form>
    </BaseModal>
  )
}

export default CreateProjectModal
