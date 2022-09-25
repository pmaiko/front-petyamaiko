export type Image = {
  image: {
    alt?: string,
    src: string,
    objectFit?: string
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
