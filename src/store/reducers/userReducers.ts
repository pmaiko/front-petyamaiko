import { IReducerAction, IUser } from '~/types'
import { TTypes, types } from '~/store/types/userTypes'


type InitialState = {
  user: Partial<IUser>,
  loading: boolean
}
const initialState = {
  user: {},
  loading: false
}

const modalsReducers = <T extends IReducerAction<TTypes>>(state = initialState, action: T): InitialState => {
  switch (action.type) {
    case types.USER:
      return {
        ...state,
        user: action.payload
      }
    case types.LOADING:
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state
  }
}

export default modalsReducers
