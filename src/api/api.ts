import api from 'axios'

import { IGlobalData } from '~/types'

const axios = api.create({
  baseURL: process.env.REACT_APP_API_URL
})

export default {
  async fetchGlobalData () {
    try {
      const { data } = await axios.get<IGlobalData>('global.json')

      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
