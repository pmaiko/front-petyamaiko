import { RootState } from '~/store/reducers'
import { IReducerAction } from '~/types'
import { types, TTypes } from '~/store/types/modalsTypes'

export const authModalShow = () => {
  return async (dispatch: (action: IReducerAction<TTypes>) => void) => {
    dispatch({
      type: types.AUTH_MODAL,
      payload: true
    })
  }
}

export const authModalHide = () => {
  return async (dispatch: (action: IReducerAction<TTypes>) => void) => {
    dispatch({
      type: types.AUTH_MODAL,
      payload: false
    })
  }
}

export const authModalToggle = () => {
  return async (dispatch: (action: IReducerAction<TTypes>) => void, getState: () => RootState) => {
    dispatch({
      type: types.AUTH_MODAL,
      payload: !getState().modals.authModal
    })
  }
}


// confirmLogoutModalShow

export const confirmLogoutModalShow = () => {
  return async (dispatch: (action: IReducerAction<TTypes>) => void) => {
    dispatch({
      type: types.CONFIRM_LOGOUT_MODAL,
      payload: true
    })
  }
}

export const confirmLogoutModalHide = () => {
  return async (dispatch: (action: IReducerAction<TTypes>) => void) => {
    dispatch({
      type: types.CONFIRM_LOGOUT_MODAL,
      payload: false
    })
  }
}

export const confirmLogoutModalToggle = () => {
  return async (dispatch: (action: IReducerAction<TTypes>) => void, getState: () => RootState) => {
    dispatch({
      type: types.CONFIRM_LOGOUT_MODAL,
      payload: !getState().modals.confirmLogoutModal
    })
  }
}

