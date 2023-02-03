import { lazy } from 'react'

export type Image = {
  image: {
    alt?: string,
    src: string,
    objectFit?: 'contain' | 'cover'
    lazy?: boolean,
    effect?: 'blur' | 'move'
  }
}

export interface IReducerAction<T> {
  type: T,
  payload: any
}

export type TReducerAction = {
  type: any,
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
  },
  footer: {
    text: string,
    copyright: string
  },
  socials: {
    instagram: string,
    telegram: string,
    skype: string
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
  url: string,
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


export interface PageData {
  title: string,
  description: string,
  blocks: [{
    name: string,
    attributes: object
  }]
}

export const BLOCKS: any = {
  'block_main_banner': lazy(() => import('~/components/blocks/MainBanner')),
  'block_services': lazy(() => import('~/components/blocks/Services')),
  'block_projects': lazy(() => import('~/components/blocks/Projects')),
  'block_about': lazy(() => import('~/components/blocks/About')),
  'block_contacts': lazy(() => import('~/components/blocks/Contacts'))
}
