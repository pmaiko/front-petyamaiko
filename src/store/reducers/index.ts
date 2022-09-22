import { combineReducers } from 'redux'

import globalDataReducers from './globalDataReducers'

export const rootReducer = combineReducers({
  globalData: globalDataReducers
})

export type RootState = ReturnType<typeof rootReducer>
