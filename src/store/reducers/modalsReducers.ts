import { IReducerAction } from '~/types'
import { TTypes, types } from '~/store/types/modalsTypes'


type InitialState = {
  authModal: boolean
  confirmLogoutModal: boolean,

  confirmProjectDeleteModal: boolean,
  confirmProjectDeleteModalProps: object

  createProjectModal: boolean,
  createProjectModalProps: object
}
const initialState = {
  authModal: false,
  confirmLogoutModal: false,

  confirmProjectDeleteModal: false,
  confirmProjectDeleteModalProps: {},

  createProjectModal: false,
  createProjectModalProps: {}
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
    case types.CONFIRM_PROJECT_DELETE_MODAL:
      return {
        ...state,
        confirmProjectDeleteModal: action.payload
      }
    case types.CONFIRM_PROJECT_DELETE_MODAL_PROPS:
      return {
        ...state,
        confirmProjectDeleteModalProps: action.payload
      }
    case types.CREATE_PROJECT_MODAL:
      return {
        ...state,
        createProjectModal: action.payload
      }
    case types.CREATE_PROJECT_MODAL_PROPS:
      return {
        ...state,
        createProjectModalProps: action.payload
      }
    default:
      return state
  }
}

export default modalsReducers
