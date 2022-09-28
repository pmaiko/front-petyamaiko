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


// confirmProjectDeleteModal

export const confirmProjectDeleteModalShow = () => {
  return async (dispatch: (action: IReducerAction<TTypes>) => void) => {
    dispatch({
      type: types.CONFIRM_PROJECT_DELETE_MODAL,
      payload: true
    })
  }
}

export const confirmProjectDeleteModalHide = () => {
  return async (dispatch: (action: IReducerAction<TTypes>) => void) => {
    dispatch({
      type: types.CONFIRM_PROJECT_DELETE_MODAL,
      payload: false
    })

    dispatch({
      type: types.CONFIRM_PROJECT_DELETE_MODAL_PROPS,
      payload: {}
    })
  }
}

export const confirmProjectDeleteModalToggle = (props: any) => {
  return async (dispatch: (action: IReducerAction<TTypes>) => void, getState: () => RootState) => {
    const confirmProjectDeleteModal = !getState().modals.confirmProjectDeleteModal

    dispatch({
      type: types.CONFIRM_PROJECT_DELETE_MODAL,
      payload: confirmProjectDeleteModal
    })

    dispatch({
      type: types.CONFIRM_PROJECT_DELETE_MODAL_PROPS,
      payload: confirmProjectDeleteModal ? props : {}
    })
  }
}


// confirmProjectDeleteModal

export const createProjectModalHide = () => {
  return async (dispatch: (action: IReducerAction<TTypes>) => void) => {
    dispatch({
      type: types.CREATE_PROJECT_MODAL,
      payload: false
    })

    dispatch({
      type: types.CREATE_PROJECT_MODAL_PROPS,
      payload: {}
    })
  }
}

export const createProjectModalToggle = (props: any) => {
  return async (dispatch: (action: IReducerAction<TTypes>) => void, getState: () => RootState) => {
    const createProjectModal = !getState().modals.createProjectModal

    dispatch({
      type: types.CREATE_PROJECT_MODAL,
      payload: createProjectModal
    })

    dispatch({
      type: types.CREATE_PROJECT_MODAL_PROPS,
      payload: createProjectModal ? props : {}
    })
  }
}


