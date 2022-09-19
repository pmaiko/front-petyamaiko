import './assets/styles/index.scss'

import {RouterProvider} from 'react-router-dom'

import React from 'react'
import ReactDOM from 'react-dom/client'
// import Default from './components/layout/default'
import router from './plugins/router'
// import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <RouterProvider router={router} />
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();