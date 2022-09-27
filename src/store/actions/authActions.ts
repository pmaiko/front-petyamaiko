import api, { axios } from '~/api'
import { IReducerAction, ILogin } from '~/types'
import { types, TTypes } from '~/store/types/authTypes'

export const login = (fields: any) => {
  return async (dispatch: (action: IReducerAction<TTypes>) => void): Promise<ILogin> => {
    try {
      const data: ILogin = await api.login(fields)

      const token = data.token
      dispatch({
        type: types.IS_LOGGED_IN,
        payload: true
      })

      dispatch({
        type: types.TOKEN,
        payload: token
      })

      window.localStorage.setItem('token', token)
      axios.defaults.headers.common = {
        Authorization: `Bearer ${token}`
      }

      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export const logout = () => {
  return async (dispatch: (action: IReducerAction<TTypes>) => void): Promise<ILogin> => {
    try {
      const data = await api.logout()

      dispatch({
        type: types.IS_LOGGED_IN,
        payload: false
      })

      dispatch({
        type: types.TOKEN,
        payload: ''
      })

      window.localStorage.removeItem('token')
      axios.defaults.headers.common = {
        Authorization: ''
      }

      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export const checkToken = () => {
  return async (dispatch: (action: IReducerAction<TTypes>) => void) => {
    const token: string = window.localStorage.getItem('token') || ''
    if (token) {
      dispatch({
        type: types.IS_LOGGED_IN,
        payload: true
      })

      dispatch({
        type: types.TOKEN,
        payload: token
      })

      axios.defaults.headers.common = {
        Authorization: `Bearer ${token}`
      }
    }
  }
}

export const setIsLoggedIn = (payload: boolean) => {
  return async (dispatch: (action: IReducerAction<TTypes>) => void) => {
    dispatch({
      type: types.IS_LOGGED_IN,
      payload
    })
  }
}

export const setToken = (payload: string) => {
  return async (dispatch: (action: IReducerAction<TTypes>) => void) => {
    dispatch({
      type: types.TOKEN,
      payload
    })
  }
}
