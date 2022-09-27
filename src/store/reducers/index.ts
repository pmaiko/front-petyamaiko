import { combineReducers } from 'redux'

import globalDataReducers from './globalDataReducers'
import modalsReducers from './modalsReducers'
import authReducers from './authReducers'
import userReducers from './userReducers'

export const rootReducer = combineReducers({
  globalData: globalDataReducers,
  modals: modalsReducers,
  auth: authReducers,
  user: userReducers
})

export type RootState = ReturnType<typeof rootReducer>
