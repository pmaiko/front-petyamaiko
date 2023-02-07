import '~/assets/styles/index.critical.scss'

import ReactDOM from 'react-dom/client'

import App from './App'

import React from 'react'

import { Provider } from 'react-redux'

import { store } from '~/store'

// <React.StrictMode>
//
// </React.StrictMode>

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)

// import reportWebVitals from './reportWebVitals'
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
