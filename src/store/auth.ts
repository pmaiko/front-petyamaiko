import api, { axios } from '~/api'
import { IReducerAction, ILogin } from '~/types'

// state
interface IState {
  isLoggedIn: boolean,
  token: string
}

const state: IState = {
  isLoggedIn: false,
  token: ''
}


// mutations types
enum MUTATIONS_TYPES {
  IS_LOGGED_IN = 'IS_LOGGED_IN',
  TOKEN = 'TOKEN'
}

export const reducer = <T extends IReducerAction<MUTATIONS_TYPES>>(_state = state, action: T): IState => {
  if (action.type === MUTATIONS_TYPES.IS_LOGGED_IN) {
    return {
      ..._state,
      isLoggedIn: action.payload
    }
  }

  if (action.type === MUTATIONS_TYPES.TOKEN) {
    return {
      ..._state,
      token: action.payload
    }
  }

  return _state
}


// actions
const login = (fields: any) => {
  return async (dispatch: (action: IReducerAction<MUTATIONS_TYPES>) => void): Promise<ILogin> => {
    try {
      const data: ILogin = await api.login(fields)

      const token = data.token
      dispatch({
        type: MUTATIONS_TYPES.IS_LOGGED_IN,
        payload: true
      })

      dispatch({
        type: MUTATIONS_TYPES.TOKEN,
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

const logout = () => {
  return async (dispatch: (action: IReducerAction<MUTATIONS_TYPES>) => void): Promise<ILogin> => {
    try {
      const data = await api.logout()

      dispatch({
        type: MUTATIONS_TYPES.IS_LOGGED_IN,
        payload: false
      })

      dispatch({
        type: MUTATIONS_TYPES.TOKEN,
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

const checkToken = () => {
  return async (dispatch: (action: IReducerAction<MUTATIONS_TYPES>) => void) => {
    const token: string = window.localStorage.getItem('token') || ''
    if (token) {
      dispatch({
        type: MUTATIONS_TYPES.IS_LOGGED_IN,
        payload: true
      })

      dispatch({
        type: MUTATIONS_TYPES.TOKEN,
        payload: token
      })

      axios.defaults.headers.common = {
        Authorization: `Bearer ${token}`
      }
    }
  }
}

const setIsLoggedIn = (payload: boolean) => {
  return async (dispatch: (action: IReducerAction<MUTATIONS_TYPES>) => void) => {
    dispatch({
      type: MUTATIONS_TYPES.IS_LOGGED_IN,
      payload
    })
  }
}

const setToken = (payload: string) => {
  return async (dispatch: (action: IReducerAction<MUTATIONS_TYPES>) => void) => {
    dispatch({
      type: MUTATIONS_TYPES.TOKEN,
      payload
    })
  }
}


export const actions = {
  login,
  logout,
  checkToken,
  setIsLoggedIn,
  setToken
}

