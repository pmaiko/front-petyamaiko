import api from '~/api'
import { IReducerAction, IUser } from '~/types'

// state
interface IState {
  user: Partial<IUser>,
  loading: boolean
}

const state: IState = {
  user: {},
  loading: false
}


// mutations types
enum MUTATIONS_TYPES {
  USER = 'USER',
  LOADING = 'LOADING'
}

export const reducer = <T extends IReducerAction<MUTATIONS_TYPES>>(_state = state, action: T): IState => {
  if (action.type === MUTATIONS_TYPES.USER) {
    return {
      ..._state,
      user: action.payload
    }
  }

  if (action.type === MUTATIONS_TYPES.LOADING) {
    return {
      ..._state,
      loading: action.payload
    }
  }

  return _state
}


// actions
const fetchUser = () => {
  return async (dispatch: (action: IReducerAction<MUTATIONS_TYPES>) => void) => {
    dispatch({
      type: MUTATIONS_TYPES.LOADING,
      payload: true
    })
    try {
      const data = await api.fetchUser()
      dispatch({
        type: MUTATIONS_TYPES.USER,
        payload: data
      })

      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    } finally {
      dispatch({
        type: MUTATIONS_TYPES.LOADING,
        payload: false
      })
    }
  }
}

const setUser = (user: IUser) => {
  return async (dispatch: (action: IReducerAction<MUTATIONS_TYPES>) => void) => {
    dispatch({
      type: MUTATIONS_TYPES.USER,
      payload: user
    })
  }
}


export const actions = {
  fetchUser,
  setUser
}

