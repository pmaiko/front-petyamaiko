import { IReducerAction } from '~/types'
import { TTypes, types } from '~/store/types/authTypes'


type InitialState = {
  isLoggedIn: boolean,
  token: string
}
const initialState = {
  isLoggedIn: false,
  token: ''
}

const modalsReducers = <T extends IReducerAction<TTypes>>(state = initialState, action: T): InitialState => {
  switch (action.type) {
    case types.IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload
      }
    case types.TOKEN:
      return {
        ...state,
        token: action.payload
      }
    default:
      return state
  }
}

export default modalsReducers
