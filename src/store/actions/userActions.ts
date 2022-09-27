import api from '~/api'
import { IReducerAction, IUser } from '~/types'
import { types, TTypes } from '~/store/types/userTypes'

export const fetchUser = () => {
  return async (dispatch: (action: IReducerAction<TTypes>) => void) => {
    dispatch({
      type: types.LOADING,
      payload: true
    })
    try {
      const data = await api.fetchUser()
      dispatch({
        type: types.USER,
        payload: data
      })

      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    } finally {
      dispatch({
        type: types.LOADING,
        payload: false
      })
    }
  }
}

export const setUser = (user: IUser) => {
  return async (dispatch: (action: IReducerAction<TTypes>) => void) => {
    dispatch({
      type: types.USER,
      payload: user
    })
  }
}
