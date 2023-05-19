import { SocketResponse, Authorization, User } from '~/types/chatTypes'
import '~/assets/styles/shared/chat/ChatAuthorization.scss'

import { memo } from 'react'
import { useForm } from 'react-hook-form'

import BaseTextField from '~/components/base/BaseTextField'
import BaseButton from '~/components/base/BaseButton'

interface Props {
  submit: (userName: string) => Promise<SocketResponse>
  success: (user: User) => void
}
const ChatAuthorization = (props: Props) => {
  const { register, handleSubmit, setError, reset, formState: { errors } } = useForm<Authorization>({
    defaultValues: {
      userName: ''
    }
  })

  const onSubmit = async (fields: Authorization) => {
    try {
      reset()
      const { data } = await props.submit(fields.userName)
      props.success(data)
    } catch (error: any) {
      setError('userName', {
        message: error?.message
      })
    }
  }

  return (
    <div className='chat-authorization pt-32'>
      <form
        noValidate={true}
        onSubmit={handleSubmit(onSubmit)}
        className='chat-authorization__form'
      >
        <legend className='chat-authorization__title h3' >Enter you name!</legend>
        <BaseTextField
          label='Name'
          {...register('userName')}
          error={errors.userName?.message}
          className='chat-authorization__field'
        />
        <BaseButton
          type='submit'
          className='chat-authorization__submit'
        >
          Enter
        </BaseButton>
      </form>
    </div>
  )
}
export default memo(ChatAuthorization)
