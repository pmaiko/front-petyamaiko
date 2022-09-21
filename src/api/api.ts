import api from 'axios'

import { IGlobal } from '~/types/types'

const axios = api.create({
  baseURL: process.env.REACT_APP_API_URL
})

export default {
  async getGlobal () {
    try {
      const { data } = await axios.get<IGlobal>('global.json')

      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
