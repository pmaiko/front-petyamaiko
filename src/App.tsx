import api from '~/api/api'
import router from '~/plugins/router'

import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { getGlobal } from '~/store/thunk/getGlobal'


const App = () => {
  const dispatch = useDispatch<any>()
  const global = useSelector((state: any) => state.global)

  console.log(global)
  useEffect(() => {
    dispatch(getGlobal())
  }, [])

  return (
    <RouterProvider router={router} />
  )
}

export default App
