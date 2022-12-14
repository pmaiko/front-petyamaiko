import { applyMiddleware, compose, createStore } from 'redux'
import { rootReducer } from '~/store/reducers'
import thunk from 'redux-thunk'

export const store = createStore(
  rootReducer,
  {},
  compose(
    applyMiddleware(thunk),
    // @ts-ignore
    process.env.NODE_ENV === 'development' && window && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : compose
  )
)
