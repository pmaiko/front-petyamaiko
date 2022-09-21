import api from '~/api/api'

import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

export const getGlobal = () => {
  return async (dispatch: any) => {
    dispatch({
      type: 'GLOBAL_LOADING',
      payload: true
    })
    try {
      const data = await api.getGlobal()
      dispatch({
        type: 'GLOBAL_DATA',
        payload: data
      })
    } catch (error) {
      dispatch({
        type: 'GLOBAL_ERROR',
        payload: error
      })
    } finally {
      dispatch({
        type: 'GLOBAL_LOADING',
        payload: false
      })
    }
  }
}
