import { lazy } from 'react'

export type Image = {
  image: {
    alt?: string,
    src: string,
    objectFit?: string
    lazy?: boolean
  }
}

export interface IReducerAction<T> {
  type: T,
  payload: any
}

export interface IGlobalData {
  header: {
    menu: {
      logo: string,
      items: {
        label: string,
        link: string
      }[]
    }
  }
}

export interface ILogin {
  success: true,
  message: string,
  token: string,
  user: IUser
}

export interface IUser {
  id: number,
  email: string,
  name: string
}

export interface IProject {
  id: number,
  image: string,
  label: string,
  description: string,
  likes: number,
  views: number,
  created_at: string,
  updated_at: string
}

export interface ISuccess {
  success: boolean,
  message?: string
}

export interface IProjectsComments {
  id: number,
  name: string,
  comment: string,
  project_id: string,
  created_at: string,
  updated_at: string
}

export const BLOCKS: any = {
  'section_main_banner': lazy(() => import('~/components/blocks/MainBanner')),
  'section_projects': lazy(() => import('~/components/blocks/Projects')),
  'section_services': 'div'
}
