import { ConnectUser, Authorization } from '~/types/chat'
import '~/assets/styles/shared/chat/ChatStartForm.scss'

import { useForm } from 'react-hook-form'

import BaseTextField from '~/components/base/BaseTextField'
import BaseButton from '~/components/base/BaseButton'

const ChatStartForm = ({ submit }: {submit: ConnectUser}) => {
  const { register, handleSubmit, setError, reset, formState: { errors } } = useForm<Authorization>({
    defaultValues: {
      userName: ''
    }
  })

  const onSubmit = async (fields: Authorization) => {
    try {
      reset()
      await submit(fields.userName)
    } catch (error: any) {
      setError('userName', {
        message: error?.message
      })
    }
  }

  return (
    <div className='chat-start-form pt-32'>
      <form
        noValidate={true}
        onSubmit={handleSubmit(onSubmit)}
        className='chat-start-form__form'
      >
        <legend className='chat-start-form__title h3' >Enter you name!</legend>
        <BaseTextField
          label='Name'
          {...register('userName')}
          error={errors.userName?.message}
          className='chat-start-form__field'
        />
        <BaseButton
          type='submit'
          className='chat-start-form__submit'
        >
          Enter
        </BaseButton>
      </form>
    </div>
  )
}
export default ChatStartForm
