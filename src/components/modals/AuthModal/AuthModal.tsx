import './AuthModal.scss'

import { RootState } from '~/store/reducers'
import { ILogin } from '~/types'

import BaseModal from '~/components/base/BaseModal'

import { useSelector } from 'react-redux'
import { useActions } from '~/hooks/useActions'
import { useForm } from 'react-hook-form'
// @ts-ignore
import { NotificationManager } from 'react-notifications'

import BaseTextField from '~/components/base/BaseTextField'
import BaseButton from '~/components/base/BaseButton'
import { useRef } from 'react'
import { setUser } from '~/store/actions/userActions'

const AuthModal = (props: any) => {
  const authModal = useSelector((state: RootState) => state.modals.authModal)
  const { authModalHide } = useActions()
  const { login, setUser } = useActions()

  type Fields = {
    email: string,
    password: string
  }

  const { register, handleSubmit, setError, formState: { errors } } = useForm<Fields>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const closeModal: any = useRef()

  // @ts-ignore
  const onSubmit = async (fields: Fields) => {
    try {
      const response: any = await login(fields)
      setUser(response?.user)
      NotificationManager.success(response?.message)
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
      isOpen={authModal}
      ref={closeModal}
      closeModal={authModalHide}
    >
      <form
        className='auth-modal'
        noValidate={true}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className='auth-modal__title'>
          Login
        </h3>

        <div className='auth-modal__fields'>
          <BaseTextField
            label='Email'
            {...register('email')}
            error={errors.email?.message}
            className='auth-modal__field'
          />

          <BaseTextField
            label='Password'
            {...register('password')}
            type='password'
            error={errors.password?.message}
            className='auth-modal__field'
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

export default AuthModal
