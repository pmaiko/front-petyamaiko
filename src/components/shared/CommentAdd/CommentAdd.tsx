import './CommentAdd.scss'
import BaseButton from '~/components/base/BaseButton'
import BaseTextarea from '~/components/base/BaseTextarea'
import { useForm } from 'react-hook-form'

const CommentAdd = ({ }: any) => {
  type Fields = {
    comment: string
  }

  const { register, handleSubmit, setError, formState: { errors } } = useForm<Fields>({
    defaultValues: {
      comment: ''
    }
  })

  const onSubmit = async (fields: Fields) => {
    console.log('onSubmit')
    try {
      // const response: any = await login(fields)
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
      <BaseTextarea
        label='Comment'
        className='comment-add__field'
      />
      <BaseButton
        className='comment-add__submit'
      >
        Add
      </BaseButton>
    </form>
  )
}
export default CommentAdd
