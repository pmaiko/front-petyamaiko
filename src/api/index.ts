import api from 'axios'

import { IGlobalData, ILogin, IProject, IProjectsComments, ISuccess, IUser } from '~/types'

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

  async fetchUser () {
    try {
      const { data } = await axios.post<IUser>('/user')
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

  async fetchProject (id: any) {
    try {
      const { data } = await axios.get<IProject>(`/project/${id}`)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  },

  async addProject (sendData: any) {
    try {
      const { data } = await axios.post<IProject>('/project', sendData)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  },

  async editProject (sendData: any) {
    try {
      const { data } = await axios.put<IProject>('/project', sendData)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  },

  async removeProject (sendData: any) {
    try {
      const { data } = await axios.delete<ISuccess>('/project', {
        data: sendData
      })
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  },

  async viewProject (sendData: {id: number, view: boolean}) {
    try {
      const { data } = await axios.put<ISuccess>('/project-view', sendData)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  },

  async likeProject (sendData: {id: number, like: boolean}) {
    try {
      const { data } = await axios.put<ISuccess>('/project-like', sendData)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  },

  async fetchProjectsComments (sendData: {project_id: number}) {
    try {
      const { data } = await axios.get<IProjectsComments[]>('/projects-comments', {
        params: sendData
      })
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  },

  async addProjectsComments (sendData: {project_id: number, name: string, comment: string}) {
    try {
      const { data } = await axios.post<IProjectsComments>('/projects-comments', sendData)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
