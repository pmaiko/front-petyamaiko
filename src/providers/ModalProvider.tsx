import Modals from '~/components/modals'

import React, { useReducer, useContext } from 'react'

const ModalContext = React.createContext({} as IProvider)

const reducer = <T extends { type: string, payload: IState }>(state: IState, action: T) => {
  if (action.type === 'SHOW_MODAL') {
    return {
      ...state,
      name: action.payload.name,
      props: action.payload.props || {}
    }
  }

  if (action.type === 'HIDE_MODAL') {
    return {
      ...state,
      name: action.payload.name,
      props: action.payload.props || {}
    }
  }
  return state
}

const ModalProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, {
    name: '' as names,
    props: {}
  })

  const show = (options: IState) => {
    dispatch({
      type: 'SHOW_MODAL',
      payload: options
    })
  }

  const hide = () => {
    dispatch({
      type: 'HIDE_MODAL',
      payload: {
        name: '' as names,
        props: {}
      }
    })
  }

  return (
    <ModalContext.Provider value={{
      state,
      show,
      hide
    }}>
      { children }
      <Modals />
    </ModalContext.Provider>
  )
}

interface IState {
  name: names,
  props?: object
}

interface IProvider {
  state: IState,
  show: (options: IState) => void,
  hide: () => void,
}


export enum names {
  AuthModal = 'AuthModal',
  ConfirmLogoutModal = 'ConfirmLogoutModal',
  ConfirmProjectDeleteModal = 'ConfirmProjectDeleteModal',
  CreateProjectModal = 'CreateProjectModal'
}


export default ModalProvider
export const useModal = () => {
  return useContext(ModalContext)
}
