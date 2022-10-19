import { combineReducers } from 'redux'

import globalDataReducers from './globalDataReducers'
import authReducers from './authReducers'
import userReducers from './userReducers'

export const rootReducer = combineReducers({
  globalData: globalDataReducers,
  auth: authReducers,
  user: userReducers
})

export type RootState = ReturnType<typeof rootReducer>
