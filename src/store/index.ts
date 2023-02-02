import { applyMiddleware, compose, createStore, combineReducers, bindActionCreators } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import thunk from 'redux-thunk'

// modules
import { globalDataReducers, actions as globalDataActions } from './globalData'
import authReducers from './reducers/authReducers'
import userReducers from './reducers/userReducers'
import * as authActions from '~/store/actions/authActions'
import * as userActions from '~/store/actions/userActions'


const rootReducer = combineReducers({
  globalData: globalDataReducers,
  auth: authReducers,
  user: userReducers
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
  ...globalDataActions,
  ...authActions,
  ...userActions
}

export const useStoreActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}

export const useStoreState = useSelector<TStoreState, any>
