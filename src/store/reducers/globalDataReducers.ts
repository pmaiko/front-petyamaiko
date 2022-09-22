import { IGlobalData, IReducerAction } from '~/types'
import { types, TTypes } from '~/store/types/globalDataTypes'

// https://github.com/jherr/ts-todo-redux
// https://github.com/vladilenm/typescript-advanced
// https://github.com/utimur/react-redux-typescript-course
// export interface Dispatch<A extends Action = AnyAction> {
//   <T extends A>(action: T): T
// }

type InitialState = {
  loading: boolean,
  result: Partial<IGlobalData>,
  error: any
}

const initialState: InitialState = {
  loading: false,
  result: {},
  error: null
}

const globalDataReducers = <T extends IReducerAction<TTypes>>(state = initialState, action: T): InitialState => {
  switch (action.type) {
    case types.GLOBAL_DATA_RESULT:
      return {
        ...state,
        result: action.payload
      }
    case types.GLOBAL_DATA_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    case types.GLOBAL_DATA_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}

export default globalDataReducers
