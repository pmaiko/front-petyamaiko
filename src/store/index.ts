import { applyMiddleware, compose, createStore, combineReducers, bindActionCreators } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import thunk from 'redux-thunk'

// modules
import { reducer as globalReducer, actions as globalActions } from './global'
import { reducer as authReducer, actions as authActions } from './auth'
import { reducer as userReducer, actions as userActions } from './user'

const rootReducer = combineReducers({
  global: globalReducer,
  auth: authReducer,
  user: userReducer
})

// types
export type TStoreState = ReturnType<typeof rootReducer>

// store
export const store = createStore(
  rootReducer,
  {},
  compose(
    applyMiddleware(thunk),
    // @ts-ignore
    process.env.NODE_ENV === 'development' && window && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : compose
  )
)

// actions
const actions = {
  ...globalActions,
  ...authActions,
  ...userActions
}

export const useStoreActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}

export const useStoreState = useSelector<TStoreState, any>
