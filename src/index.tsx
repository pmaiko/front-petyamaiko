import './assets/styles/index.scss'

import ReactDOM from 'react-dom/client'

import App from './App'

import React from 'react'

import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from '~/store/reducers'
import thunk from 'redux-thunk'

const store = createStore(reducers, applyMiddleware(thunk))

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

// import reportWebVitals from './reportWebVitals'
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
