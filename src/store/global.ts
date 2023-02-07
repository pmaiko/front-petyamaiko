import api from '~/api'
import { IGlobalData, IReducerAction } from '~/types'

// state
interface IState {
  globalData: IGlobalData,
  preloaderDone: boolean,
  loaded: boolean,
  loadedPage: boolean
}

const state: IState = {
  globalData: {} as IGlobalData,
  preloaderDone: false,
  loaded: false,
  loadedPage: false
}


// mutations types
enum MUTATIONS_TYPES {
  SET_GLOBAL_DATA = 'SET_GLOBAL_DATA',
  SET_PRELOADER_DONE = 'SET_PRELOADER_DONE',
  SET_LOADED = 'SET_LOADED',
  SET_LOADED_PAGE_DATA = 'SET_LOADED_PAGE_DATA'
}

// reducers
export const globalReducers = <T extends IReducerAction<MUTATIONS_TYPES>>(_state = state, action: T): IState => {
  if (action.type === MUTATIONS_TYPES.SET_GLOBAL_DATA) {
    return {
      ..._state,
      globalData: action.payload
    }
  }

  if (action.type === MUTATIONS_TYPES.SET_PRELOADER_DONE) {
    return {
      ..._state,
      preloaderDone: action.payload
    }
  }

  if (action.type === MUTATIONS_TYPES.SET_LOADED) {
    return {
      ..._state,
      loaded: action.payload
    }
  }

  if (action.type === MUTATIONS_TYPES.SET_LOADED_PAGE_DATA) {
    return {
      ..._state,
      loadedPage: action.payload
    }
  }

  return _state
}


// actions
const fetchAndSetGlobalData = () => {
  return async (dispatch: (action: IReducerAction<MUTATIONS_TYPES>) => void) => {
    try {
      const data = await api.fetchGlobalData()
      dispatch({
        type: MUTATIONS_TYPES.SET_GLOBAL_DATA,
        payload: data
      })
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

const setPreloaderDone = (payload: boolean) => {
  return async (dispatch: (action: IReducerAction<MUTATIONS_TYPES>) => void) => {
    dispatch({
      type: MUTATIONS_TYPES.SET_PRELOADER_DONE,
      payload
    })
  }
}

const setLoaded = (payload: boolean) => {
  return async (dispatch: (action: IReducerAction<MUTATIONS_TYPES>) => void) => {
    dispatch({
      type: MUTATIONS_TYPES.SET_LOADED,
      payload
    })
  }
}

const setLoadedPage = (payload: boolean) => {
  return async (dispatch: (action: IReducerAction<MUTATIONS_TYPES>) => void) => {
    dispatch({
      type: MUTATIONS_TYPES.SET_LOADED_PAGE_DATA,
      payload
    })
  }
}

export const actions = {
  fetchAndSetGlobalData,
  setPreloaderDone,
  setLoaded,
  setLoadedPage
}

