import { IGlobal } from '~/types/types'

const initialState = {
  loading: false,
  data: {},
  error: null
}

const global = (state = initialState, action: any) => {
  switch (action.type) {
    case 'GLOBAL_DATA':
      return {
        ...state,
        data: action.payload
      }
    case 'GLOBAL_LOADING':
      return {
        ...state,
        loading: action.payload
      }
    case 'GLOBAL_ERROR':
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}

export default global
