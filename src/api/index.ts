import api from 'axios'

import { IGlobalData, ILogin, IProject, IUser } from '~/types'

export const axios = api.create({
  baseURL: process.env.REACT_APP_API_URL
})

// axios.defaults.withCredentials = true

axios.interceptors.request.use((config) => {
  return config
}, (error) => {
  // Do something with request error
  return Promise.reject(error)
})

export default {
  async fetchGlobalData () {
    try {
      const { data } = await axios.get<IGlobalData>('/global-data')

      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  },

  async login (sendData: any) {
    try {
      const { data } = await axios.post<ILogin>('/login', sendData)

      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  },

  async logout () {
    try {
      const { data } = await axios.post('/logout')
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  },

  async fetchProjects () {
    try {
      const { data } = await axios.get<IProject[]>('/projects')
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  },

  async fetchUser () {
    try {
      const { data } = await axios.post<IUser>('/user')
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
