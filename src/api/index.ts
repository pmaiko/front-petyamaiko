import api from 'axios'

import { IGlobalData, IProject } from '~/types'

const axios = api.create({
  baseURL: process.env.REACT_APP_API_URL
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

  async fetchProjects () {
    try {
      const { data } = await axios.get<IProject[]>('/projects')

      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
