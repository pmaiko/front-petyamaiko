import { IReducerAction } from '~/types'
import { TTypes, types } from '~/store/types/modalsTypes'


type InitialState = {
  authModal: boolean
  confirmLogoutModal: boolean
}
const initialState = {
  authModal: false,
  confirmLogoutModal: false
}

const modalsReducers = <T extends IReducerAction<TTypes>>(state = initialState, action: T): InitialState => {
  switch (action.type) {
    case types.AUTH_MODAL:
      return {
        ...state,
        authModal: action.payload
      }
    case types.CONFIRM_LOGOUT_MODAL:
      return {
        ...state,
        confirmLogoutModal: action.payload
      }
    default:
      return state
  }
}

export default modalsReducers
