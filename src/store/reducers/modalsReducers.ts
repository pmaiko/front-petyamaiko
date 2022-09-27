import { IReducerAction } from '~/types'
import { TTypes, types } from '~/store/types/modalsTypes'


type InitialState = {
  authModal: boolean
}
const initialState = {
  authModal: false
}

const modalsReducers = <T extends IReducerAction<TTypes>>(state = initialState, action: T): InitialState => {
  switch (action.type) {
    case types.AUTH_MODAL:
      return {
        ...state,
        authModal: action.payload
      }
    default:
      return state
  }
}

export default modalsReducers
