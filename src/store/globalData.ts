import api from '~/api'
import { IGlobalData, TReducerAction } from '~/types'

// state
const state:Partial<IGlobalData> = {}


// mutations
export const globalDataReducers = (_state = state, action: TReducerAction): IGlobalData => {
  if (action.type === 'SET_GLOBAL_DATA') {
    return {
      ...action.payload
    }
  }

  return _state as IGlobalData
}


// actions
const fetchAndSetGlobalData = () => {
  return async (dispatch: (action: TReducerAction) => void) => {
    try {
      const data = await api.fetchGlobalData()
      dispatch({
        type: 'SET_GLOBAL_DATA',
        payload: data
      })
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export const actions = {
  fetchAndSetGlobalData
}
