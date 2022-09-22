import api from '~/api/api'
import { IReducerAction } from '~/types'
import { types, TTypes } from '~/store/types/globalDataTypes'

export const fetchGlobalData = () => {
  return async (dispatch: (action: IReducerAction<TTypes>) => void) => {
    dispatch({
      type: types.GLOBAL_DATA_LOADING,
      payload: true
    })
    try {
      const data = await api.fetchGlobalData()
      dispatch({
        type: types.GLOBAL_DATA_RESULT,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: types.GLOBAL_DATA_RESULT,
        payload: error
      })
    } finally {
      dispatch({
        type: types.GLOBAL_DATA_LOADING,
        payload: false
      })
    }
  }
}
