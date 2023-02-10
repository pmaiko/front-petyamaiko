import '~/assets/styles/shared/chat/ChatStartForm.scss'

import { useForm } from 'react-hook-form'
import { useSocket } from '~/providers/SocketProvider'

import BaseTextField from '~/components/base/BaseTextField'
import BaseButton from '~/components/base/BaseButton'


const ChatStartForm = ({ onSuccess }: {
  onSuccess: () => any
}) => {
  const { addNewUser } = useSocket()

  type Fields = { name: string }
  const { register, handleSubmit, setError, reset, formState: { errors } } = useForm<Fields>({
    defaultValues: {
      name: ''
    }
  })

  const onSubmit = async (fields: Fields) => {
    try {
      await addNewUser(fields.name)
      reset()
      onSuccess()
    } catch (error: any) {
      setError('name', {
        message: error
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
          {...register('name')}
          error={errors.name?.message}
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
